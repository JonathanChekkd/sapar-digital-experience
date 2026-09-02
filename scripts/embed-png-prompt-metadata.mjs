import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const assetIds = process.argv.slice(2);
const keyword = "impeccable:prompt";
const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

if (assetIds.length === 0) {
  throw new Error("Pass at least one calibration asset ID.");
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const typeBuffer = Buffer.from(type, "ascii");
  const chunk = Buffer.alloc(12 + data.length);
  chunk.writeUInt32BE(data.length, 0);
  typeBuffer.copy(chunk, 4);
  data.copy(chunk, 8);
  chunk.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 8 + data.length);
  return chunk;
}

function withPromptTextChunk(png, prompt) {
  if (!png.subarray(0, pngSignature.length).equals(pngSignature)) {
    throw new Error("Input is not a PNG.");
  }

  const chunks = [pngSignature];
  const promptData = Buffer.concat([
    Buffer.from(keyword, "latin1"),
    Buffer.from([0]),
    Buffer.from(prompt.trim(), "utf8"),
  ]);
  let offset = pngSignature.length;
  let inserted = false;

  while (offset + 12 <= png.length) {
    const length = png.readUInt32BE(offset);
    const type = png.toString("ascii", offset + 4, offset + 8);
    const end = offset + 12 + length;
    if (end > png.length) {
      throw new Error(`Malformed PNG chunk: ${type}`);
    }

    const chunk = png.subarray(offset, end);
    const data = png.subarray(offset + 8, offset + 8 + length);
    const isPriorPrompt = type === "tEXt" && data.subarray(0, keyword.length + 1).equals(
      Buffer.concat([Buffer.from(keyword, "latin1"), Buffer.from([0])]),
    );

    if (type === "IEND" && !inserted) {
      chunks.push(makeChunk("tEXt", promptData));
      inserted = true;
    }
    if (!isPriorPrompt) {
      chunks.push(chunk);
    }
    offset = end;
    if (type === "IEND") {
      break;
    }
  }

  if (!inserted) {
    throw new Error("PNG has no IEND chunk.");
  }
  return Buffer.concat(chunks);
}

for (const assetId of assetIds) {
  if (!/^[a-z0-9-]+$/.test(assetId)) {
    throw new Error(`Invalid calibration asset ID: ${assetId}`);
  }
  const assetBase = path.join(
    projectRoot,
    "public/generated/sapar-world/calibration",
    assetId,
  );
  const [png, prompt] = await Promise.all([
    readFile(`${assetBase}.png`),
    readFile(`${assetBase}.prompt.txt`, "utf8"),
  ]);
  await writeFile(`${assetBase}.png`, withPromptTextChunk(png, prompt));
  console.log(`Embedded prompt metadata: ${assetId}.png`);
}
