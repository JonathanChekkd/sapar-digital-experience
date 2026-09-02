import { readFile } from "node:fs/promises";

const manifestUrl = new URL("../data/asset-manifest.json", import.meta.url);
const manifest = JSON.parse(await readFile(manifestUrl, "utf8"));

const expectedGroupCounts = Object.freeze({
  athlete_archetype: 12,
  gym_environment: 10,
  competition_arena: 10,
  social_template: 8,
  league_squad_identity: 8,
  achievement_medallion: 12,
  quest_progression: 10,
  rating_analysis: 8,
  onboarding_empty_state: 8,
  safety_trust: 6,
  promotional_key_art: 8,
});

const requiredStringFields = Object.freeze([
  "id",
  "group",
  "productSurface",
  "userStory",
  "subject",
  "composition",
  "aspectRatio",
  "lighting",
  "prompt",
  "negativePrompt",
  "altText",
  "provenanceStatus",
  "productionStatus",
  "filename",
]);

const requiredStringArrayFields = Object.freeze([
  "artStyleTokens",
  "palette",
  "characterWardrobeConstraints",
  "motionLayeredExportNeeds",
]);

const allowedProvenanceStatuses = new Set([
  "SAPAR-owned",
  "licensed",
  "public reference only",
  "unknown / do not reuse",
]);

const allowedProductionStatuses = new Set([
  "planned",
  "calibration",
  "generated",
  "optimized",
]);

function invariant(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

invariant(Array.isArray(manifest), "Manifest must be a JSON array.");
invariant(manifest.length === 100, `Expected 100 assets; found ${manifest.length}.`);

const ids = new Set();
const filenames = new Set();
const groupCounts = new Map();

manifest.forEach((asset, index) => {
  invariant(
    typeof asset === "object" && asset !== null && !Array.isArray(asset),
    `Asset at index ${index} must be an object.`,
  );

  requiredStringFields.forEach((field) => {
    invariant(
      isNonEmptyString(asset[field]),
      `Asset at index ${index} has an invalid ${field}.`,
    );
  });

  requiredStringArrayFields.forEach((field) => {
    invariant(
      Array.isArray(asset[field]) &&
        asset[field].length > 0 &&
        asset[field].every(isNonEmptyString),
      `Asset ${asset.id} has an invalid ${field}.`,
    );
  });

  invariant(
    Object.hasOwn(expectedGroupCounts, asset.group),
    `Asset ${asset.id} has an unknown group ${asset.group}.`,
  );
  invariant(!ids.has(asset.id), `Duplicate asset ID: ${asset.id}.`);
  invariant(
    !filenames.has(asset.filename),
    `Duplicate asset filename: ${asset.filename}.`,
  );
  invariant(
    asset.filename.startsWith("/generated/sapar-world/") &&
      asset.filename.endsWith(".webp"),
    `Asset ${asset.id} must use a WebP path under /generated/sapar-world/.`,
  );
  invariant(
    typeof asset.pixelTarget === "object" && asset.pixelTarget !== null,
    `Asset ${asset.id} has no pixel target.`,
  );
  invariant(
    Number.isInteger(asset.pixelTarget.width) && asset.pixelTarget.width > 0,
    `Asset ${asset.id} has an invalid pixel width.`,
  );
  invariant(
    Number.isInteger(asset.pixelTarget.height) && asset.pixelTarget.height > 0,
    `Asset ${asset.id} has an invalid pixel height.`,
  );
  invariant(
    typeof asset.cropBehavior === "object" && asset.cropBehavior !== null,
    `Asset ${asset.id} has no crop behavior.`,
  );
  invariant(
    ["mobile", "desktop", "focalPoint"].every((field) =>
      isNonEmptyString(asset.cropBehavior[field]),
    ),
    `Asset ${asset.id} has incomplete crop behavior.`,
  );
  invariant(
    allowedProvenanceStatuses.has(asset.provenanceStatus),
    `Asset ${asset.id} has an invalid provenance status.`,
  );
  invariant(
    allowedProductionStatuses.has(asset.productionStatus),
    `Asset ${asset.id} has an invalid production status.`,
  );

  ids.add(asset.id);
  filenames.add(asset.filename);
  groupCounts.set(asset.group, (groupCounts.get(asset.group) ?? 0) + 1);
});

Object.entries(expectedGroupCounts).forEach(([group, expectedCount]) => {
  const actualCount = groupCounts.get(group) ?? 0;
  invariant(
    actualCount === expectedCount,
    `Expected ${expectedCount} ${group} assets; found ${actualCount}.`,
  );
});

const orderedCounts = Object.fromEntries(
  Object.keys(expectedGroupCounts).map((group) => [group, groupCounts.get(group)]),
);

console.log(
  `Validated ${manifest.length} SAPAR asset records with unique IDs and filenames.`,
);
console.log(JSON.stringify(orderedCounts, null, 2));
