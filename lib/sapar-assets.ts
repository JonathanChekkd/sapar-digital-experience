import rawAssetManifestJson from "@/data/asset-manifest.json";

export const SAPAR_ASSET_GROUP_COUNTS = {
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
} as const;

export type SaparAssetGroup = keyof typeof SAPAR_ASSET_GROUP_COUNTS;

export const SAPAR_ASSET_PROVENANCE_STATUSES = [
  "SAPAR-owned",
  "licensed",
  "public reference only",
  "unknown / do not reuse",
] as const;

export type SaparAssetProvenanceStatus =
  (typeof SAPAR_ASSET_PROVENANCE_STATUSES)[number];

export const SAPAR_ASSET_PRODUCTION_STATUSES = [
  "planned",
  "calibration",
  "generated",
  "optimized",
] as const;

export type SaparAssetProductionStatus =
  (typeof SAPAR_ASSET_PRODUCTION_STATUSES)[number];

export interface SaparAssetPixelTarget {
  readonly width: number;
  readonly height: number;
}

export interface SaparAssetCropBehavior {
  readonly mobile: string;
  readonly desktop: string;
  readonly focalPoint: string;
}

export interface SaparAssetRecord {
  readonly id: string;
  readonly group: SaparAssetGroup;
  readonly productSurface: string;
  readonly userStory: string;
  readonly subject: string;
  readonly composition: string;
  readonly aspectRatio: string;
  readonly pixelTarget: SaparAssetPixelTarget;
  readonly cropBehavior: SaparAssetCropBehavior;
  readonly artStyleTokens: readonly string[];
  readonly palette: readonly string[];
  readonly lighting: string;
  readonly characterWardrobeConstraints: readonly string[];
  readonly motionLayeredExportNeeds: readonly string[];
  readonly prompt: string;
  readonly negativePrompt: string;
  readonly altText: string;
  readonly provenanceStatus: SaparAssetProvenanceStatus;
  readonly productionStatus: SaparAssetProductionStatus;
  readonly filename: string;
}

const REQUIRED_STRING_FIELDS = [
  "id",
  "productSurface",
  "userStory",
  "subject",
  "composition",
  "aspectRatio",
  "lighting",
  "prompt",
  "negativePrompt",
  "altText",
  "filename",
] as const;

const REQUIRED_STRING_ARRAY_FIELDS = [
  "artStyleTokens",
  "palette",
  "characterWardrobeConstraints",
  "motionLayeredExportNeeds",
] as const;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isNonEmptyStringArray(value: unknown): value is readonly string[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((item: unknown) => isNonEmptyString(item))
  );
}

function isPositiveInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}

function assertRecordShape(
  value: unknown,
  index: number,
): asserts value is SaparAssetRecord {
  if (!isObject(value)) {
    throw new Error(`Asset at index ${index} must be an object.`);
  }

  for (const field of REQUIRED_STRING_FIELDS) {
    if (!isNonEmptyString(value[field])) {
      throw new Error(`Asset at index ${index} has an invalid ${field}.`);
    }
  }

  for (const field of REQUIRED_STRING_ARRAY_FIELDS) {
    if (!isNonEmptyStringArray(value[field])) {
      throw new Error(`Asset ${String(value.id)} has an invalid ${field}.`);
    }
  }

  if (
    !isNonEmptyString(value.group) ||
    !(value.group in SAPAR_ASSET_GROUP_COUNTS)
  ) {
    throw new Error(`Asset ${String(value.id)} has an unknown group.`);
  }

  if (!isObject(value.pixelTarget)) {
    throw new Error(`Asset ${String(value.id)} has an invalid pixelTarget.`);
  }

  if (
    !isPositiveInteger(value.pixelTarget.width) ||
    !isPositiveInteger(value.pixelTarget.height)
  ) {
    throw new Error(`Asset ${String(value.id)} has invalid pixel dimensions.`);
  }

  if (!isObject(value.cropBehavior)) {
    throw new Error(`Asset ${String(value.id)} has an invalid cropBehavior.`);
  }

  if (
    !isNonEmptyString(value.cropBehavior.mobile) ||
    !isNonEmptyString(value.cropBehavior.desktop) ||
    !isNonEmptyString(value.cropBehavior.focalPoint)
  ) {
    throw new Error(`Asset ${String(value.id)} has incomplete crop behavior.`);
  }

  if (
    !SAPAR_ASSET_PROVENANCE_STATUSES.includes(
      value.provenanceStatus as SaparAssetProvenanceStatus,
    )
  ) {
    throw new Error(`Asset ${String(value.id)} has an invalid provenance status.`);
  }

  if (
    !SAPAR_ASSET_PRODUCTION_STATUSES.includes(
      value.productionStatus as SaparAssetProductionStatus,
    )
  ) {
    throw new Error(`Asset ${String(value.id)} has an invalid production status.`);
  }

  if (!String(value.filename).startsWith("/generated/sapar-world/")) {
    throw new Error(`Asset ${String(value.id)} must use the generated asset root.`);
  }

  if (!String(value.filename).endsWith(".webp")) {
    throw new Error(`Asset ${String(value.id)} must use a WebP delivery filename.`);
  }
}

export function validateSaparAssetManifest(
  value: unknown,
): readonly SaparAssetRecord[] {
  if (!Array.isArray(value)) {
    throw new Error("SAPAR asset manifest must be an array.");
  }

  if (value.length !== 100) {
    throw new Error(`SAPAR asset manifest must contain 100 records; found ${value.length}.`);
  }

  const ids = new Set<string>();
  const filenames = new Set<string>();
  const counts = new Map<SaparAssetGroup, number>();

  value.forEach((asset: unknown, index: number) => {
    assertRecordShape(asset, index);

    if (ids.has(asset.id)) {
      throw new Error(`Duplicate SAPAR asset ID: ${asset.id}.`);
    }
    ids.add(asset.id);

    if (filenames.has(asset.filename)) {
      throw new Error(`Duplicate SAPAR asset filename: ${asset.filename}.`);
    }
    filenames.add(asset.filename);

    counts.set(asset.group, (counts.get(asset.group) ?? 0) + 1);
  });

  for (const [group, expectedCount] of Object.entries(
    SAPAR_ASSET_GROUP_COUNTS,
  ) as [SaparAssetGroup, number][]) {
    const actualCount = counts.get(group) ?? 0;
    if (actualCount !== expectedCount) {
      throw new Error(
        `SAPAR asset group ${group} must contain ${expectedCount} records; found ${actualCount}.`,
      );
    }
  }

  return value;
}

const rawAssetManifest: unknown = rawAssetManifestJson;

export const saparAssetManifest = validateSaparAssetManifest(rawAssetManifest);

export function getSaparAssetsByGroup(
  group: SaparAssetGroup,
): readonly SaparAssetRecord[] {
  return saparAssetManifest.filter(
    (asset: SaparAssetRecord): boolean => asset.group === group,
  );
}

export function getSaparAssetById(id: string): SaparAssetRecord | undefined {
  return saparAssetManifest.find(
    (asset: SaparAssetRecord): boolean => asset.id === id,
  );
}
