export type IsoDate = `${number}-${number}-${number}`;
export type IsoTimestamp = `${IsoDate}T${string}Z`;
export type AthleteId = `athlete_${string}`;
export type RatingId = `rating_${string}`;
export type PostId = `post_${string}`;
export type EventId = `event_${string}`;
export type DivisionId = `division_${string}`;
export type GymId = `gym_${string}`;
export type GymSessionId = `session_${string}`;
export type ResultId = `result_${string}`;
export type ProofStepId = `proof_${string}`;
export type AchievementId = `achievement_${string}`;
export type QuestId = `quest_${string}`;
export type NotificationId = `notification_${string}`;
export type AppRoute = "/app" | `/app/${string}`;

export type GrapplingFormat = "gi" | "no-gi";
export type SemanticTone = "neutral" | "positive" | "attention" | "critical";
export type VerificationState = "self-declared" | "gym-confirmed" | "event-confirmed";

export interface SyntheticFixtureMetadata {
  readonly fixtureId: "sapar-local-prototype-v1";
  readonly isSynthetic: true;
  readonly label: "Synthetic prototype data";
  readonly snapshotAt: IsoTimestamp;
}

export interface AthleteFixture {
  readonly id: AthleteId;
  readonly displayName: string;
  readonly handle: `@${string}`;
  readonly initials: string;
  readonly ageClass: "adult";
  readonly ageConfirmed: true;
  readonly belt: {
    readonly rank: "white" | "blue" | "purple" | "brown" | "black";
    readonly degrees: number;
    readonly source: VerificationState;
    readonly awardedAt: IsoDate;
  };
  readonly primaryGymId: GymId;
  readonly location: {
    readonly city: string;
    readonly region: string;
    readonly precision: "city-only";
  };
  readonly bio: string;
  readonly roles: readonly ("athlete" | "coach" | "organizer")[];
  readonly followerCount: number;
  readonly followingCount: number;
  readonly trust: {
    readonly state: VerificationState;
    readonly label: string;
    readonly verifiedResultCount: number;
    readonly tone: SemanticTone;
  };
}

export type RatingStatus = "provisional" | "established" | "inactive";
export type MatchOutcome = "win" | "loss";

export interface RatingLaneFixture {
  readonly id: RatingId;
  readonly athleteId: AthleteId;
  readonly lane: GrapplingFormat;
  readonly label: "Gi rating" | "No-Gi rating";
  readonly value: number;
  readonly delta: number;
  readonly status: RatingStatus;
  readonly confidence: {
    readonly low: number;
    readonly high: number;
    readonly label: string;
  };
  readonly peak: number;
  readonly ratedBoutCount: number;
  readonly recentForm: readonly MatchOutcome[];
  readonly modelVersion: string;
  readonly lastChangedAt: IsoTimestamp;
  readonly causedByResultId: ResultId | null;
  readonly explanation: string;
}

export interface PostAuthorFixture {
  readonly id: AthleteId;
  readonly displayName: string;
  readonly handle: `@${string}`;
  readonly initials: string;
  readonly verification: VerificationState;
}

export interface PostMediaFixture {
  readonly kind: "image" | "video";
  readonly alt: string;
  readonly aspectRatio: "1/1" | "4/5" | "16/9";
  readonly placeholder: "mat-gradient" | "bracket-grid" | "gym-floor";
}

export interface PostFixture {
  readonly id: PostId;
  readonly author: PostAuthorFixture;
  readonly createdAt: IsoTimestamp;
  readonly body: string;
  readonly visibility: "public" | "followers" | "approved-connections";
  readonly media: readonly PostMediaFixture[];
  readonly tags: readonly string[];
  readonly reactions: {
    readonly support: number;
    readonly respect: number;
  };
  readonly commentCount: number;
  readonly verificationLabel: string | null;
}

export interface EventDivisionFixture {
  readonly id: DivisionId;
  readonly format: GrapplingFormat;
  readonly ageClass: "adult";
  readonly beltRange: string;
  readonly weightLabel: string;
  readonly capacity: number;
  readonly registeredCount: number;
}

export interface EventFixture {
  readonly id: EventId;
  readonly name: string;
  readonly organizer: string;
  readonly startsAt: IsoTimestamp;
  readonly endsAt: IsoTimestamp;
  readonly venue: {
    readonly name: string;
    readonly city: string;
    readonly region: string;
  };
  readonly status: "registration-open" | "registration-closed" | "completed";
  readonly formats: readonly GrapplingFormat[];
  readonly registration: {
    readonly closesAt: IsoTimestamp;
    readonly priceCents: number;
    readonly currency: "USD";
    readonly refundPolicy: string;
    readonly eligibility: string;
  };
  readonly authority: {
    readonly label: string;
    readonly resultVerification: "event-director" | "gym-host";
  };
  readonly divisions: readonly EventDivisionFixture[];
}

export interface GymSessionFixture {
  readonly id: GymSessionId;
  readonly title: string;
  readonly dayOfWeek:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  readonly startsAtLocal: `${number}:${number}`;
  readonly durationMinutes: number;
  readonly format: GrapplingFormat | "mixed";
  readonly level: "all-levels" | "beginner" | "advanced";
  readonly capacity: number;
  readonly spotsRemaining: number;
  readonly bookingState: "available" | "waitlist" | "full";
}

export interface GymFixture {
  readonly id: GymId;
  readonly name: string;
  readonly slug: string;
  readonly location: {
    readonly city: string;
    readonly region: string;
    readonly distanceMiles: number;
  };
  readonly verification: "gym-confirmed" | "community-listed";
  readonly memberCount: number;
  readonly accessibility: {
    readonly stepFreeEntry: boolean;
    readonly accessibleRestroom: boolean;
    readonly contactForAccommodations: boolean;
  };
  readonly schedule: readonly GymSessionFixture[];
}

export interface ResultVersionFixture {
  readonly version: number;
  readonly recordedAt: IsoTimestamp;
  readonly recordedBy: string;
  readonly reason: "initial-submission" | "score-correction";
  readonly winnerId: AthleteId;
  readonly loserId: AthleteId;
  readonly score: {
    readonly winner: number;
    readonly loser: number;
    readonly display: string;
  };
  readonly method: "points" | "submission" | "decision";
}

export interface ResultFixture {
  readonly id: ResultId;
  readonly eventId: EventId;
  readonly divisionId: DivisionId;
  readonly matchLabel: string;
  readonly status: "provisional" | "verified" | "disputed" | "corrected";
  readonly correctionStatus: "window-open" | "window-closed" | "under-review";
  readonly authority: {
    readonly type: "event-director" | "gym-host";
    readonly label: string;
  };
  readonly currentVersion: number;
  readonly versions: readonly ResultVersionFixture[];
  readonly ratingImpact: readonly {
    readonly ratingId: RatingId;
    readonly lane: GrapplingFormat;
    readonly delta: number;
    readonly valueAfter: number;
  }[];
}

export type ProofStepKind =
  | "event-authority"
  | "result-version"
  | "correction-window"
  | "rating-event"
  | "rating-explanation";

export interface ProofStepFixture {
  readonly id: ProofStepId;
  readonly resultId: ResultId;
  readonly order: number;
  readonly kind: ProofStepKind;
  readonly label: string;
  readonly detail: string;
  readonly status: "complete" | "active" | "pending";
  readonly recordedAt: IsoTimestamp;
  readonly sourceLabel: string;
}

export interface ProofThreadFixture {
  readonly resultId: ResultId;
  readonly title: string;
  readonly summary: string;
  readonly steps: readonly ProofStepFixture[];
}

export interface AchievementFixture {
  readonly id: AchievementId;
  readonly title: string;
  readonly description: string;
  readonly category: "training" | "competition" | "trust" | "community";
  readonly state: "earned" | "in-progress" | "locked";
  readonly progress: {
    readonly current: number;
    readonly target: number;
    readonly unit: string;
  };
  readonly earnedAt: IsoTimestamp | null;
  readonly reward: {
    readonly xp: number;
    readonly cosmeticLabel: string | null;
  };
}

export interface QuestStepFixture {
  readonly label: string;
  readonly completed: boolean;
}

export interface QuestFixture {
  readonly id: QuestId;
  readonly title: string;
  readonly description: string;
  readonly state: "active" | "completed" | "locked";
  readonly expiresAt: IsoTimestamp | null;
  readonly steps: readonly QuestStepFixture[];
  readonly reward: {
    readonly xp: number;
    readonly achievementId: AchievementId | null;
  };
}

export interface NotificationFixture {
  readonly id: NotificationId;
  readonly category: "competition" | "rating" | "social" | "gym" | "quest" | "privacy";
  readonly title: string;
  readonly body: string;
  readonly createdAt: IsoTimestamp;
  readonly read: boolean;
  readonly tone: SemanticTone;
  readonly action: {
    readonly label: string;
    readonly href: AppRoute;
  } | null;
}

export interface InitialPreferencesFixture {
  readonly athleteId: AthleteId;
  readonly statusPresentation: {
    readonly label: "Private by default";
    readonly tone: "neutral";
    readonly description: string;
  };
  readonly profileVisibility: "public" | "followers" | "private";
  readonly athleteDiscovery: boolean;
  readonly searchEngineIndexing: boolean;
  readonly locationSharing: "off" | "city-only" | "precise";
  readonly scheduleVisibility: "private" | "approved-connections" | "followers";
  readonly resultHistoryVisibility: "public" | "followers" | "private";
  readonly directMessages: "off" | "approved-connections" | "followers";
  readonly mediaConsent: "never" | "ask-every-time" | "approved-gyms";
  readonly personalizedAnalytics: boolean;
  readonly notificationDelivery: {
    readonly pushEnabled: boolean;
    readonly emailEnabled: boolean;
    readonly competitionUpdates: boolean;
    readonly ratingMovements: boolean;
    readonly socialActivity: boolean;
    readonly gymScheduleChanges: boolean;
    readonly questProgress: boolean;
    readonly productMarketing: boolean;
    readonly quietHours: {
      readonly enabled: boolean;
      readonly startsAtLocal: `${number}:${number}`;
      readonly endsAtLocal: `${number}:${number}`;
    };
  };
  readonly experience: {
    readonly reducedMotion: "system" | "always" | "never";
    readonly lowStimulationMode: boolean;
    readonly interfaceSound: "on" | "off";
  };
}

export const fixtureMetadata = {
  fixtureId: "sapar-local-prototype-v1",
  isSynthetic: true,
  label: "Synthetic prototype data",
  snapshotAt: "2026-09-01T18:00:00Z",
} as const satisfies SyntheticFixtureMetadata;

export const athlete = {
  id: "athlete_maya_torres",
  displayName: "Maya Torres",
  handle: "@mayatorres",
  initials: "MT",
  ageClass: "adult",
  ageConfirmed: true,
  belt: {
    rank: "purple",
    degrees: 1,
    source: "gym-confirmed",
    awardedAt: "2025-03-14",
  },
  primaryGymId: "gym_northline_jiu_jitsu",
  location: {
    city: "Denver",
    region: "CO",
    precision: "city-only",
  },
  bio: "Pressure passer, early-morning rounds, and a permanent notebook habit.",
  roles: ["athlete"],
  followerCount: 842,
  followingCount: 311,
  trust: {
    state: "event-confirmed",
    label: "22 verified results",
    verifiedResultCount: 22,
    tone: "positive",
  },
} as const satisfies AthleteFixture;

export const prototypeProgress = {
  competitiveTier: "Vanguard III",
  cohortRank: 3,
  rankPoints: 68,
  rankPointTarget: 100,
  privateJourneyLevel: 18,
  privateJourneyXp: 4220,
  privateJourneyXpTarget: 4500,
} as const;

export const ratingLanes = [
  {
    id: "rating_maya_gi",
    athleteId: "athlete_maya_torres",
    lane: "gi",
    label: "Gi rating",
    value: 1492,
    delta: 8,
    status: "established",
    confidence: { low: 1451, high: 1533, label: "1,451–1,533" },
    peak: 1520,
    ratedBoutCount: 19,
    recentForm: ["win", "win", "loss", "win", "win"],
    modelVersion: "SAPAR Rating 0.8",
    lastChangedAt: "2026-08-17T21:10:00Z",
    causedByResultId: null,
    explanation: "Eight points added after a verified points win against a similarly rated opponent.",
  },
  {
    id: "rating_maya_no_gi",
    athleteId: "athlete_maya_torres",
    lane: "no-gi",
    label: "No-Gi rating",
    value: 1548,
    delta: 22,
    status: "provisional",
    confidence: { low: 1492, high: 1604, label: "1,492–1,604" },
    peak: 1612,
    ratedBoutCount: 12,
    recentForm: ["win", "win", "win", "loss", "win"],
    modelVersion: "SAPAR Rating 0.8",
    lastChangedAt: "2026-08-30T19:42:00Z",
    causedByResultId: "result_maya_lena_sapar_open",
    explanation: "Twenty-two points added after the event authority confirmed the result and the correction window closed.",
  },
] as const satisfies readonly RatingLaneFixture[];

export const posts = [
  {
    id: "post_nia_open_mat",
    author: {
      id: "athlete_nia_brooks",
      displayName: "Nia Brooks",
      handle: "@niabrooks",
      initials: "NB",
      verification: "gym-confirmed",
    },
    createdAt: "2026-09-01T15:20:00Z",
    body: "Northline's sunrise room was all pace today. Saved one round for proof, kept the rest for the mat.",
    visibility: "public",
    media: [{ kind: "image", alt: "Synthetic open-mat training scene", aspectRatio: "4/5", placeholder: "mat-gradient" }],
    tags: ["open mat", "no-gi", "Denver"],
    reactions: { support: 128, respect: 46 },
    commentCount: 18,
    verificationLabel: "24 verified sessions",
  },
  {
    id: "post_maya_bracket_note",
    author: {
      id: "athlete_maya_torres",
      displayName: "Maya Torres",
      handle: "@mayatorres",
      initials: "MT",
      verification: "event-confirmed",
    },
    createdAt: "2026-08-31T22:05:00Z",
    body: "The bracket tells you who. The proof thread tells you why the result counts.",
    visibility: "followers",
    media: [{ kind: "image", alt: "Synthetic tournament bracket detail", aspectRatio: "16/9", placeholder: "bracket-grid" }],
    tags: ["competition", "proof"],
    reactions: { support: 92, respect: 61 },
    commentCount: 11,
    verificationLabel: "Event-confirmed result",
  },
] as const satisfies readonly PostFixture[];

export const events = [
  {
    id: "event_sapar_open_2026",
    name: "SAPAR Open",
    organizer: "SAPAR Competition Team",
    startsAt: "2026-10-18T15:00:00Z",
    endsAt: "2026-10-18T23:00:00Z",
    venue: { name: "Mile High Fieldhouse", city: "Denver", region: "CO" },
    status: "registration-open",
    formats: ["gi", "no-gi"],
    registration: {
      closesAt: "2026-10-11T05:59:00Z",
      priceCents: 8900,
      currency: "USD",
      refundPolicy: "Full refund through October 4; division transfer available until registration closes.",
      eligibility: "Adults 18+ with a declared belt rank and current gym affiliation.",
    },
    authority: { label: "SAPAR event desk", resultVerification: "event-director" },
    divisions: [
      {
        id: "division_sapar_open_adult_purple_light_no_gi",
        format: "no-gi",
        ageClass: "adult",
        beltRange: "Purple",
        weightLabel: "Lightweight · up to 141.5 lb",
        capacity: 16,
        registeredCount: 11,
      },
      {
        id: "division_sapar_open_adult_purple_light_gi",
        format: "gi",
        ageClass: "adult",
        beltRange: "Purple",
        weightLabel: "Lightweight · up to 141.5 lb",
        capacity: 16,
        registeredCount: 9,
      },
    ],
  },
  {
    id: "event_sapar_summer_open_2026",
    name: "SAPAR Summer Open",
    organizer: "SAPAR Competition Team",
    startsAt: "2026-08-30T15:00:00Z",
    endsAt: "2026-08-30T23:00:00Z",
    venue: { name: "Mile High Fieldhouse", city: "Denver", region: "CO" },
    status: "completed",
    formats: ["gi", "no-gi"],
    registration: {
      closesAt: "2026-08-23T05:59:00Z",
      priceCents: 8500,
      currency: "USD",
      refundPolicy: "Registration closed; the event record is retained for result provenance.",
      eligibility: "Adults 18+ with a declared belt rank and current gym affiliation.",
    },
    authority: { label: "SAPAR event desk", resultVerification: "event-director" },
    divisions: [
      {
        id: "division_sapar_summer_open_adult_purple_light_no_gi",
        format: "no-gi",
        ageClass: "adult",
        beltRange: "Purple",
        weightLabel: "Lightweight · up to 141.5 lb",
        capacity: 16,
        registeredCount: 14,
      },
    ],
  },
  {
    id: "event_front_range_trials_2026",
    name: "Front Range Trials",
    organizer: "Front Range Grappling",
    startsAt: "2026-11-07T16:00:00Z",
    endsAt: "2026-11-07T22:30:00Z",
    venue: { name: "Foothills Sports Center", city: "Lakewood", region: "CO" },
    status: "registration-open",
    formats: ["no-gi"],
    registration: {
      closesAt: "2026-10-31T05:59:00Z",
      priceCents: 7500,
      currency: "USD",
      refundPolicy: "Credit available through October 24; no transfers after bracket publication.",
      eligibility: "Adults 18+; intermediate and advanced experience bands.",
    },
    authority: { label: "Front Range event desk", resultVerification: "event-director" },
    divisions: [
      {
        id: "division_front_range_adult_intermediate_light",
        format: "no-gi",
        ageClass: "adult",
        beltRange: "Intermediate",
        weightLabel: "Lightweight · up to 145 lb",
        capacity: 12,
        registeredCount: 8,
      },
    ],
  },
] as const satisfies readonly EventFixture[];

export const gyms = [
  {
    id: "gym_northline_jiu_jitsu",
    name: "Northline Jiu-Jitsu",
    slug: "northline-jiu-jitsu",
    location: { city: "Denver", region: "CO", distanceMiles: 1.2 },
    verification: "gym-confirmed",
    memberCount: 286,
    accessibility: { stepFreeEntry: true, accessibleRestroom: true, contactForAccommodations: true },
    schedule: [
      {
        id: "session_northline_monday_no_gi",
        title: "No-Gi Competition Rounds",
        dayOfWeek: "Monday",
        startsAtLocal: "18:30",
        durationMinutes: 90,
        format: "no-gi",
        level: "advanced",
        capacity: 24,
        spotsRemaining: 8,
        bookingState: "available",
      },
      {
        id: "session_northline_wednesday_fundamentals",
        title: "Fundamentals Lab",
        dayOfWeek: "Wednesday",
        startsAtLocal: "17:30",
        durationMinutes: 60,
        format: "gi",
        level: "beginner",
        capacity: 20,
        spotsRemaining: 3,
        bookingState: "available",
      },
      {
        id: "session_northline_saturday_open_mat",
        title: "Community Open Mat",
        dayOfWeek: "Saturday",
        startsAtLocal: "10:00",
        durationMinutes: 120,
        format: "mixed",
        level: "all-levels",
        capacity: 36,
        spotsRemaining: 0,
        bookingState: "waitlist",
      },
    ],
  },
  {
    id: "gym_eastbank_grappling",
    name: "Eastbank Grappling",
    slug: "eastbank-grappling",
    location: { city: "Aurora", region: "CO", distanceMiles: 7.8 },
    verification: "community-listed",
    memberCount: 174,
    accessibility: { stepFreeEntry: false, accessibleRestroom: true, contactForAccommodations: true },
    schedule: [
      {
        id: "session_eastbank_tuesday_open_mat",
        title: "No-Gi Open Mat",
        dayOfWeek: "Tuesday",
        startsAtLocal: "19:00",
        durationMinutes: 90,
        format: "no-gi",
        level: "all-levels",
        capacity: 30,
        spotsRemaining: 12,
        bookingState: "available",
      },
    ],
  },
] as const satisfies readonly GymFixture[];

export const results = [
  {
    id: "result_maya_lena_sapar_open",
    eventId: "event_sapar_summer_open_2026",
    divisionId: "division_sapar_summer_open_adult_purple_light_no_gi",
    matchLabel: "Maya Torres vs Lena Park",
    status: "verified",
    correctionStatus: "window-closed",
    authority: { type: "event-director", label: "SAPAR event desk" },
    currentVersion: 1,
    versions: [
      {
        version: 1,
        recordedAt: "2026-08-30T19:20:00Z",
        recordedBy: "SAPAR event desk",
        reason: "initial-submission",
        winnerId: "athlete_maya_torres",
        loserId: "athlete_lena_park",
        score: { winner: 7, loser: 4, display: "7–4" },
        method: "points",
      },
    ],
    ratingImpact: [
      { ratingId: "rating_maya_no_gi", lane: "no-gi", delta: 22, valueAfter: 1548 },
    ],
  },
] as const satisfies readonly ResultFixture[];

export const proofSteps = [
  {
    id: "proof_maya_lena_event_authority",
    resultId: "result_maya_lena_sapar_open",
    order: 1,
    kind: "event-authority",
    label: "Authority attached",
    detail: "The SAPAR event desk is the designated result authority for this division.",
    status: "complete",
    recordedAt: "2026-08-30T19:18:00Z",
    sourceLabel: "Event operations record",
  },
  {
    id: "proof_maya_lena_result_v1",
    resultId: "result_maya_lena_sapar_open",
    order: 2,
    kind: "result-version",
    label: "Result version 1",
    detail: "Maya Torres defeated Lena Park by points, 7–4.",
    status: "complete",
    recordedAt: "2026-08-30T19:20:00Z",
    sourceLabel: "Event-confirmed result",
  },
  {
    id: "proof_maya_lena_correction_window",
    resultId: "result_maya_lena_sapar_open",
    order: 3,
    kind: "correction-window",
    label: "Correction window closed",
    detail: "No correction or dispute was submitted before the published deadline.",
    status: "complete",
    recordedAt: "2026-08-30T19:40:00Z",
    sourceLabel: "Correction log",
  },
  {
    id: "proof_maya_lena_rating_event",
    resultId: "result_maya_lena_sapar_open",
    order: 4,
    kind: "rating-event",
    label: "No-Gi rating updated",
    detail: "The verified result moved Maya's No-Gi rating from 1,526 to 1,548.",
    status: "complete",
    recordedAt: "2026-08-30T19:42:00Z",
    sourceLabel: "SAPAR Rating 0.8",
  },
  {
    id: "proof_maya_lena_explanation",
    resultId: "result_maya_lena_sapar_open",
    order: 5,
    kind: "rating-explanation",
    label: "Why +22",
    detail: "Opponent strength, result confidence, and provisional sample size produced a 22-point movement.",
    status: "complete",
    recordedAt: "2026-08-30T19:42:00Z",
    sourceLabel: "Rating explanation",
  },
] as const satisfies readonly ProofStepFixture[];

export const proofThreads = [
  {
    resultId: "result_maya_lena_sapar_open",
    title: "Proof thread · Maya Torres vs Lena Park",
    summary: "One continuous chain from event authority to result version, correction status, and rating movement.",
    steps: proofSteps,
  },
] as const satisfies readonly ProofThreadFixture[];

export const achievements = [
  {
    id: "achievement_proof_kept",
    title: "Proof Kept",
    description: "Finish a verified result with a complete proof thread.",
    category: "trust",
    state: "earned",
    progress: { current: 1, target: 1, unit: "proof thread" },
    earnedAt: "2026-08-30T19:42:00Z",
    reward: { xp: 250, cosmeticLabel: "Copper proof ring" },
  },
  {
    id: "achievement_mat_regular",
    title: "Mat Regular",
    description: "Attend twelve gym-confirmed sessions in one season.",
    category: "training",
    state: "in-progress",
    progress: { current: 9, target: 12, unit: "sessions" },
    earnedAt: null,
    reward: { xp: 400, cosmeticLabel: "Regular's stripe" },
  },
  {
    id: "achievement_cornerstone",
    title: "Cornerstone",
    description: "Help three teammates prepare for an event.",
    category: "community",
    state: "in-progress",
    progress: { current: 2, target: 3, unit: "teammates" },
    earnedAt: null,
    reward: { xp: 300, cosmeticLabel: null },
  },
] as const satisfies readonly AchievementFixture[];

export const quests = [
  {
    id: "quest_three_session_streak",
    title: "Three-session streak",
    description: "Build a consistent week without turning training into a grind counter.",
    state: "active",
    expiresAt: "2026-09-07T05:59:00Z",
    steps: [
      { label: "Book a session", completed: true },
      { label: "Complete two gym-confirmed sessions", completed: true },
      { label: "Complete a third gym-confirmed session", completed: false },
    ],
    reward: { xp: 180, achievementId: "achievement_mat_regular" },
  },
  {
    id: "quest_complete_profile_proof",
    title: "Make your profile legible",
    description: "Confirm the details that help opponents and organizers understand your competition context.",
    state: "active",
    expiresAt: null,
    steps: [
      { label: "Confirm adult eligibility", completed: true },
      { label: "Confirm gym affiliation", completed: true },
      { label: "Review public profile visibility", completed: false },
    ],
    reward: { xp: 120, achievementId: "achievement_proof_kept" },
  },
] as const satisfies readonly QuestFixture[];

export const notifications = [
  {
    id: "notification_rating_movement",
    category: "rating",
    title: "Your No-Gi rating moved",
    body: "A verified result moved your No-Gi rating to 1,548. The proof thread explains the +22 change.",
    createdAt: "2026-09-01T16:42:00Z",
    read: false,
    tone: "positive",
    action: { label: "See why", href: "/app/ratings" },
  },
  {
    id: "notification_event_registration",
    category: "competition",
    title: "SAPAR Open registration is active",
    body: "Five places remain in Adult Purple Lightweight No-Gi.",
    createdAt: "2026-09-01T14:00:00Z",
    read: false,
    tone: "attention",
    action: { label: "Review division", href: "/app/compete" },
  },
  {
    id: "notification_gym_schedule",
    category: "gym",
    title: "Open mat is now waitlist-only",
    body: "Northline's Saturday Community Open Mat reached capacity.",
    createdAt: "2026-08-31T20:12:00Z",
    read: true,
    tone: "neutral",
    action: { label: "View schedule", href: "/app/gyms" },
  },
  {
    id: "notification_privacy_review",
    category: "privacy",
    title: "Review your public result history",
    body: "Result history is public while schedule visibility remains limited to approved connections.",
    createdAt: "2026-08-30T18:10:00Z",
    read: true,
    tone: "neutral",
    action: { label: "Review privacy", href: "/app/settings" },
  },
] as const satisfies readonly NotificationFixture[];

export const initialPreferences = {
  athleteId: "athlete_maya_torres",
  statusPresentation: {
    label: "Private by default",
    tone: "neutral",
    description: "Privacy is a visibility choice, not an error or warning state.",
  },
  profileVisibility: "followers",
  athleteDiscovery: true,
  searchEngineIndexing: false,
  locationSharing: "city-only",
  scheduleVisibility: "approved-connections",
  resultHistoryVisibility: "public",
  directMessages: "approved-connections",
  mediaConsent: "ask-every-time",
  personalizedAnalytics: false,
  notificationDelivery: {
    pushEnabled: true,
    emailEnabled: false,
    competitionUpdates: true,
    ratingMovements: true,
    socialActivity: true,
    gymScheduleChanges: true,
    questProgress: true,
    productMarketing: false,
    quietHours: {
      enabled: true,
      startsAtLocal: "22:00",
      endsAtLocal: "07:00",
    },
  },
  experience: {
    reducedMotion: "system",
    lowStimulationMode: false,
    interfaceSound: "off",
  },
} as const satisfies InitialPreferencesFixture;

export interface SaparPrototypeFixture {
  readonly metadata: SyntheticFixtureMetadata;
  readonly athlete: AthleteFixture;
  readonly ratingLanes: readonly RatingLaneFixture[];
  readonly posts: readonly PostFixture[];
  readonly events: readonly EventFixture[];
  readonly gyms: readonly GymFixture[];
  readonly results: readonly ResultFixture[];
  readonly proofSteps: readonly ProofStepFixture[];
  readonly proofThreads: readonly ProofThreadFixture[];
  readonly achievements: readonly AchievementFixture[];
  readonly quests: readonly QuestFixture[];
  readonly notifications: readonly NotificationFixture[];
  readonly initialPreferences: InitialPreferencesFixture;
}

export const saparPrototype = {
  metadata: fixtureMetadata,
  athlete,
  ratingLanes,
  posts,
  events,
  gyms,
  results,
  proofSteps,
  proofThreads,
  achievements,
  quests,
  notifications,
  initialPreferences,
} as const satisfies SaparPrototypeFixture;

export type SaparPrototypeData = typeof saparPrototype;
