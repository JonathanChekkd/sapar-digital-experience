export type PrototypeCapabilityState =
  | "synthetic-fixtures"
  | "client-local-only"
  | "not-connected";

export interface PrototypeCapabilityStates {
  readonly athleteProfiles: PrototypeCapabilityState;
  readonly socialFeed: PrototypeCapabilityState;
  readonly competitionDiscovery: PrototypeCapabilityState;
  readonly gymDiscovery: PrototypeCapabilityState;
  readonly ratingsAndProof: PrototypeCapabilityState;
  readonly clientInteractions: PrototypeCapabilityState;
  readonly authentication: PrototypeCapabilityState;
  readonly persistence: PrototypeCapabilityState;
  readonly payments: PrototypeCapabilityState;
  readonly externalSync: PrototypeCapabilityState;
}

export interface PrototypeHealthResponse {
  readonly status: "ok";
  readonly mode: "local-prototype";
  readonly dataSource: "typed-synthetic-fixtures";
  readonly database: "not-connected";
  readonly externalServices: "not-connected";
  readonly serverTime: string;
  readonly capabilities: PrototypeCapabilityStates;
}

interface FixtureIdentifier {
  readonly id: string;
}

interface PublicPostIdentifier extends FixtureIdentifier {
  readonly visibility: string;
}

interface ProofThreadIdentifier {
  readonly resultId: string;
}

export interface PrototypeCatalogSource {
  readonly metadata: {
    readonly fixtureId: string;
    readonly isSynthetic: true;
    readonly label: "Synthetic prototype data";
    readonly snapshotAt: string;
  };
  readonly athlete: FixtureIdentifier;
  readonly ratingLanes: readonly FixtureIdentifier[];
  readonly posts: readonly PublicPostIdentifier[];
  readonly events: readonly FixtureIdentifier[];
  readonly gyms: readonly FixtureIdentifier[];
  readonly results: readonly FixtureIdentifier[];
  readonly proofThreads: readonly ProofThreadIdentifier[];
  readonly achievements: readonly FixtureIdentifier[];
  readonly quests: readonly FixtureIdentifier[];
}

export interface PrototypeCatalogCounts {
  readonly athletes: number;
  readonly ratingLanes: number;
  readonly publicPosts: number;
  readonly events: number;
  readonly gyms: number;
  readonly results: number;
  readonly proofThreads: number;
  readonly achievements: number;
  readonly quests: number;
}

export interface PrototypeCatalogIdentifiers {
  readonly athletes: readonly string[];
  readonly ratingLanes: readonly string[];
  readonly publicPosts: readonly string[];
  readonly events: readonly string[];
  readonly gyms: readonly string[];
  readonly results: readonly string[];
  readonly proofThreadResultIds: readonly string[];
  readonly achievements: readonly string[];
  readonly quests: readonly string[];
}

export interface PrototypeCatalogResponse {
  readonly mode: "local-prototype";
  readonly dataSource: "typed-synthetic-fixtures";
  readonly fixture: Readonly<{
    fixtureId: string;
    isSynthetic: true;
    label: "Synthetic prototype data";
    snapshotAt: string;
  }>;
  readonly counts: PrototypeCatalogCounts;
  readonly identifiers: PrototypeCatalogIdentifiers;
}

export interface PrototypeApiErrorResponse {
  readonly status: "error";
  readonly mode: "local-prototype";
  readonly error: Readonly<{
    code: "PROTOTYPE_RESPONSE_FAILED";
    message: "The local prototype response could not be created.";
  }>;
}

export const PROTOTYPE_NO_STORE_HEADERS = Object.freeze({
  "Cache-Control": "no-store, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
  "X-Content-Type-Options": "nosniff",
} as const);

const PROTOTYPE_CAPABILITIES: PrototypeCapabilityStates = Object.freeze({
  athleteProfiles: "synthetic-fixtures",
  socialFeed: "synthetic-fixtures",
  competitionDiscovery: "synthetic-fixtures",
  gymDiscovery: "synthetic-fixtures",
  ratingsAndProof: "synthetic-fixtures",
  clientInteractions: "client-local-only",
  authentication: "not-connected",
  persistence: "not-connected",
  payments: "not-connected",
  externalSync: "not-connected",
});

const freezeIds = (items: readonly FixtureIdentifier[]): readonly string[] =>
  Object.freeze(items.map((item) => item.id));

export const buildPrototypeHealthResponse = (
  serverTime: Date,
): PrototypeHealthResponse => {
  if (Number.isNaN(serverTime.getTime())) {
    throw new TypeError("serverTime must be a valid Date");
  }

  return Object.freeze({
    status: "ok",
    mode: "local-prototype",
    dataSource: "typed-synthetic-fixtures",
    database: "not-connected",
    externalServices: "not-connected",
    serverTime: serverTime.toISOString(),
    capabilities: PROTOTYPE_CAPABILITIES,
  });
};

export const buildPrototypeCatalogResponse = (
  source: PrototypeCatalogSource,
): PrototypeCatalogResponse => {
  const publicPosts = source.posts.filter((post) => post.visibility === "public");

  const counts: PrototypeCatalogCounts = Object.freeze({
    athletes: 1,
    ratingLanes: source.ratingLanes.length,
    publicPosts: publicPosts.length,
    events: source.events.length,
    gyms: source.gyms.length,
    results: source.results.length,
    proofThreads: source.proofThreads.length,
    achievements: source.achievements.length,
    quests: source.quests.length,
  });

  const identifiers: PrototypeCatalogIdentifiers = Object.freeze({
    athletes: Object.freeze([source.athlete.id]),
    ratingLanes: freezeIds(source.ratingLanes),
    publicPosts: freezeIds(publicPosts),
    events: freezeIds(source.events),
    gyms: freezeIds(source.gyms),
    results: freezeIds(source.results),
    proofThreadResultIds: Object.freeze(
      source.proofThreads.map((thread) => thread.resultId),
    ),
    achievements: freezeIds(source.achievements),
    quests: freezeIds(source.quests),
  });

  return Object.freeze({
    mode: "local-prototype",
    dataSource: "typed-synthetic-fixtures",
    fixture: Object.freeze({
      fixtureId: source.metadata.fixtureId,
      isSynthetic: source.metadata.isSynthetic,
      label: source.metadata.label,
      snapshotAt: source.metadata.snapshotAt,
    }),
    counts,
    identifiers,
  });
};

export const buildPrototypeApiErrorResponse = (): PrototypeApiErrorResponse =>
  Object.freeze({
    status: "error",
    mode: "local-prototype",
    error: Object.freeze({
      code: "PROTOTYPE_RESPONSE_FAILED",
      message: "The local prototype response could not be created.",
    }),
  });
