import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const manifestPath = path.join(projectRoot, "data/calibration-assets.json");
const assetDirectory = path.join(
  projectRoot,
  "public/generated/sapar-world/calibration",
);
const provenance = "OpenAI image generation with embedded prompt";
const allowedPriorities = new Set(["hero", "high", "standard", "low"]);
const requiredFields = Object.freeze([
  "id",
  "category",
  "mediaRole",
  "styleRegister",
  "src",
  "promptFile",
  "jsonSidecar",
  "alt",
  "aspect",
  "dimensions",
  "cropFocus",
  "priority",
  "prototypeUse",
  "fictionalPeople",
  "provenance",
]);

function invariant(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function arraysEqual(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function readPngMetadata(buffer, label) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  invariant(
    buffer.subarray(0, signature.length).equals(signature),
    `${label} is not a valid PNG.`,
  );

  let offset = signature.length;
  let width = null;
  let height = null;
  let embeddedPrompt = null;

  while (offset + 12 <= buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString("ascii", offset + 4, offset + 8);
    const dataStart = offset + 8;
    const dataEnd = dataStart + length;
    const nextOffset = dataEnd + 4;
    invariant(nextOffset <= buffer.length, `${label} has a malformed ${type} chunk.`);

    if (type === "IHDR") {
      invariant(length >= 8, `${label} has an invalid IHDR chunk.`);
      width = buffer.readUInt32BE(dataStart);
      height = buffer.readUInt32BE(dataStart + 4);
    }

    if (type === "tEXt") {
      const data = buffer.subarray(dataStart, dataEnd);
      const separator = data.indexOf(0);
      if (
        separator !== -1 &&
        data.toString("latin1", 0, separator) === "impeccable:prompt"
      ) {
        embeddedPrompt = data.toString("utf8", separator + 1).trim();
      }
    }

    offset = nextOffset;
    if (type === "IEND") {
      break;
    }
  }

  invariant(Number.isInteger(width) && width > 0, `${label} has no valid width.`);
  invariant(Number.isInteger(height) && height > 0, `${label} has no valid height.`);
  invariant(isNonEmptyString(embeddedPrompt), `${label} has no embedded prompt metadata.`);

  return { width, height };
}

function readWebpDimensions(buffer, label) {
  invariant(buffer.length >= 30, `${label} is too small to be a valid WebP.`);
  invariant(
    buffer.toString("ascii", 0, 4) === "RIFF" &&
      buffer.toString("ascii", 8, 12) === "WEBP",
    `${label} is not a valid WebP.`,
  );

  let offset = 12;
  while (offset + 8 <= buffer.length) {
    const type = buffer.toString("ascii", offset, offset + 4);
    const length = buffer.readUInt32LE(offset + 4);
    const dataStart = offset + 8;
    const dataEnd = dataStart + length;
    invariant(dataEnd <= buffer.length, `${label} has a malformed ${type} chunk.`);

    if (type === "VP8X") {
      invariant(length >= 10, `${label} has an invalid VP8X chunk.`);
      return {
        width: buffer.readUIntLE(dataStart + 4, 3) + 1,
        height: buffer.readUIntLE(dataStart + 7, 3) + 1,
      };
    }

    if (type === "VP8 ") {
      invariant(length >= 10, `${label} has an invalid VP8 chunk.`);
      invariant(
        buffer[dataStart + 3] === 0x9d &&
          buffer[dataStart + 4] === 0x01 &&
          buffer[dataStart + 5] === 0x2a,
        `${label} has an invalid VP8 frame header.`,
      );
      return {
        width: buffer.readUInt16LE(dataStart + 6) & 0x3fff,
        height: buffer.readUInt16LE(dataStart + 8) & 0x3fff,
      };
    }

    if (type === "VP8L") {
      invariant(
        length >= 5 && buffer[dataStart] === 0x2f,
        `${label} has an invalid VP8L chunk.`,
      );
      const bits = buffer.readUInt32LE(dataStart + 1);
      return {
        width: (bits & 0x3fff) + 1,
        height: ((bits >>> 14) & 0x3fff) + 1,
      };
    }

    offset = dataEnd + (length % 2);
  }

  throw new Error(`${label} has no supported WebP dimensions.`);
}

async function collectFiles(directory, extension) {
  const files = [];
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(entryPath, extension)));
    } else if (entry.isFile() && entry.name.endsWith(extension)) {
      files.push(entryPath);
    }
  }

  return files;
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function parseAspect(value, id) {
  const match = /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?)$/.exec(value);
  invariant(match !== null, `Asset ${id} has an invalid aspect value.`);
  const width = Number(match[1]);
  const height = Number(match[2]);
  invariant(width > 0 && height > 0, `Asset ${id} has a zero aspect component.`);
  return width / height;
}

function validateCropFocus(value, id) {
  const match = /^(\d{1,3})% (\d{1,3})%$/.exec(value);
  invariant(match !== null, `Asset ${id} has an invalid cropFocus.`);
  invariant(
    Number(match[1]) <= 100 && Number(match[2]) <= 100,
    `Asset ${id} has a cropFocus outside the image.`,
  );
}

function resolveProjectPath(relativePath, id) {
  const resolved = path.resolve(projectRoot, relativePath);
  const relative = path.relative(projectRoot, resolved);
  invariant(
    relative.length > 0 && !relative.startsWith("..") && !path.isAbsolute(relative),
    `Asset ${id} points outside the project root.`,
  );
  return resolved;
}

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
invariant(Array.isArray(manifest), "Calibration asset manifest must be a JSON array.");
invariant(manifest.length > 0, "Calibration asset manifest cannot be empty.");

const ids = new Set();
const sources = new Set();
const expectedFields = [...requiredFields].sort();
const directoryEntries = await readdir(assetDirectory, { withFileTypes: true });
const diskPngs = directoryEntries
  .filter((entry) => entry.isFile() && entry.name.endsWith(".png"))
  .map((entry) => entry.name)
  .sort();
const diskJsons = new Set(
  directoryEntries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => entry.name),
);

for (const [index, asset] of manifest.entries()) {
  invariant(isPlainObject(asset), `Asset at index ${index} must be an object.`);
  invariant(
    arraysEqual(Object.keys(asset).sort(), expectedFields),
    `Asset at index ${index} must contain exactly the required fields.`,
  );

  for (const field of [
    "id",
    "category",
    "mediaRole",
    "styleRegister",
    "src",
    "promptFile",
    "alt",
    "aspect",
    "cropFocus",
    "priority",
    "prototypeUse",
    "provenance",
  ]) {
    invariant(isNonEmptyString(asset[field]), `Asset ${asset.id ?? index} has an invalid ${field}.`);
  }

  invariant(!ids.has(asset.id), `Duplicate calibration asset ID: ${asset.id}.`);
  invariant(!sources.has(asset.src), `Duplicate calibration asset src: ${asset.src}.`);
  invariant(asset.src.startsWith("/generated/sapar-world/calibration/"), `Asset ${asset.id} has an invalid src.`);
  invariant(asset.src.endsWith(".png"), `Asset ${asset.id} must reference a PNG.`);
  invariant(asset.provenance === provenance, `Asset ${asset.id} has an invalid provenance value.`);
  invariant(typeof asset.fictionalPeople === "boolean", `Asset ${asset.id} has an invalid fictionalPeople value.`);
  invariant(allowedPriorities.has(asset.priority), `Asset ${asset.id} has an invalid priority.`);
  invariant(asset.alt.length >= 20, `Asset ${asset.id} has insufficient alt text.`);
  invariant(asset.prototypeUse.length >= 20, `Asset ${asset.id} has an insufficient prototypeUse.`);
  invariant(isPlainObject(asset.dimensions), `Asset ${asset.id} has invalid dimensions.`);
  invariant(
    arraysEqual(Object.keys(asset.dimensions).sort(), ["height", "width"]),
    `Asset ${asset.id} dimensions must contain only width and height.`,
  );
  invariant(
    Number.isInteger(asset.dimensions.width) && asset.dimensions.width > 0,
    `Asset ${asset.id} has an invalid dimension width.`,
  );
  invariant(
    Number.isInteger(asset.dimensions.height) && asset.dimensions.height > 0,
    `Asset ${asset.id} has an invalid dimension height.`,
  );

  validateCropFocus(asset.cropFocus, asset.id);

  const expectedPromptFile = `public${asset.src.replace(/\.png$/, ".prompt.txt")}`;
  invariant(
    asset.promptFile === expectedPromptFile,
    `Asset ${asset.id} promptFile does not match its src.`,
  );

  const pngPath = resolveProjectPath(`public${asset.src}`, asset.id);
  const promptPath = resolveProjectPath(asset.promptFile, asset.id);
  await access(pngPath);
  await access(promptPath);
  invariant(
    isNonEmptyString(await readFile(promptPath, "utf8")),
    `Asset ${asset.id} has an empty prompt file.`,
  );

  const pngMetadata = readPngMetadata(await readFile(pngPath), asset.id);
  invariant(
    pngMetadata.width === asset.dimensions.width &&
      pngMetadata.height === asset.dimensions.height,
    `Asset ${asset.id} dimensions do not match its PNG.`,
  );

  const declaredRatio = parseAspect(asset.aspect, asset.id);
  const actualRatio = pngMetadata.width / pngMetadata.height;
  const aspectDelta = Math.abs(actualRatio - declaredRatio) / declaredRatio;
  invariant(aspectDelta <= 0.07, `Asset ${asset.id} dimensions do not plausibly match ${asset.aspect}.`);

  const pngFilename = path.basename(asset.src);
  const expectedJsonFilename = pngFilename.replace(/\.png$/, ".json");
  const expectedJsonPath = `public/generated/sapar-world/calibration/${expectedJsonFilename}`;
  const hasJsonSidecar = diskJsons.has(expectedJsonFilename);
  invariant(
    asset.jsonSidecar === (hasJsonSidecar ? expectedJsonPath : null),
    `Asset ${asset.id} jsonSidecar does not match the files on disk.`,
  );
  if (asset.jsonSidecar !== null) {
    await access(resolveProjectPath(asset.jsonSidecar, asset.id));
  }

  ids.add(asset.id);
  sources.add(asset.src);
}

const listedPngs = manifest.map((asset) => path.basename(asset.src)).sort();
invariant(
  arraysEqual(listedPngs, diskPngs),
  `Calibration manifest coverage mismatch. Listed: ${listedPngs.join(", ")}. On disk: ${diskPngs.join(", ")}.`,
);

const applicationSourceFiles = [
  ...(await collectFiles(path.join(projectRoot, "app"), ".tsx")),
  ...(await collectFiles(path.join(projectRoot, "app"), ".css")),
  ...(await collectFiles(path.join(projectRoot, "components"), ".tsx")),
];

const shippingWebpReferences = new Set();
const webpReferencePattern = /\/generated\/[^"'()\s]+\.webp/g;
for (const sourceFile of applicationSourceFiles) {
  const source = await readFile(sourceFile, "utf8");
  for (const match of source.matchAll(webpReferencePattern)) {
    shippingWebpReferences.add(match[0]);
  }
}

invariant(
  shippingWebpReferences.size > 0,
  "No shipping WebP references were found in application TSX or CSS.",
);

for (const webpReference of [...shippingWebpReferences].sort()) {
  const webpPath = resolveProjectPath(`public${webpReference}`, webpReference);
  const webp = await readFile(webpPath);
  invariant(webp.length > 0, `${webpReference} is empty.`);
  const webpDimensions = readWebpDimensions(webp, webpReference);
  invariant(
    webpDimensions.width > 0 && webpDimensions.height > 0,
    `${webpReference} has invalid dimensions.`,
  );

  const webpSidecarPath = `${webpPath}.json`;
  await access(webpSidecarPath);
  const webpSidecar = JSON.parse(await readFile(webpSidecarPath, "utf8"));
  invariant(isPlainObject(webpSidecar), `${webpReference}.json must be an object.`);
  invariant(
    isNonEmptyString(
      webpSidecar.prompt ?? webpSidecar.origin ?? webpSidecar.provenance,
    ),
    `${webpReference}.json has no provenance prompt or origin.`,
  );

  const pngPath = webpPath.replace(/\.webp$/, ".png");
  if (await fileExists(pngPath)) {
    const pngDimensions = readPngMetadata(
      await readFile(pngPath),
      webpReference.replace(/\.webp$/, ".png"),
    );
    invariant(
      webpDimensions.width === pngDimensions.width &&
        webpDimensions.height === pngDimensions.height,
      `${webpReference} dimensions do not match its PNG source.`,
    );
  }
}

console.log(
  `Validated ${manifest.length} calibration PNGs with complete coverage, dimensions, sidecars, and embedded prompts.`,
);
console.log(
  `Validated ${shippingWebpReferences.size} shipping WebP references with dimensions and provenance sidecars.`,
);
