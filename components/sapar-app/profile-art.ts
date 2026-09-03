export interface AvatarArt {
  readonly src: string;
  readonly kind: "person" | "entity";
  readonly objectPosition?: string;
  readonly atlasPosition?: string;
}

const socialAvatarAtlas = "/generated/sapar-world/social-avatar-atlas-v1.webp";

function atlasPortrait(column: 0 | 1 | 2 | 3, row: 0 | 1 | 2): AvatarArt {
  const horizontal = ["0%", "33.333333%", "66.666667%", "100%"][column];
  const vertical = ["0%", "50%", "100%"][row];
  return {
    src: socialAvatarAtlas,
    kind: "person",
    atlasPosition: `${horizontal} ${vertical}`,
  };
}

export const profileArt = {
  mayaTorres: {
    src: "/generated/sapar-world/calibration/athlete-maya-passport.webp",
    kind: "person",
    objectPosition: "50% 22%",
  },
  niaBrooks: {
    src: "/generated/sapar-world/calibration/cartoon-nia-avatar.webp",
    kind: "person",
    objectPosition: "50% 42%",
  },
  rafaelAlmeida: {
    src: "/generated/sapar-world/calibration/cartoon-rafael-avatar.webp",
    kind: "person",
    objectPosition: "50% 42%",
  },
  sofiaReyes: atlasPortrait(1, 1),
  lenaPark: atlasPortrait(3, 0),
  keiraAllen: atlasPortrait(0, 0),
  rafaelKim: atlasPortrait(0, 2),
  jonahPrice: atlasPortrait(2, 2),
  omarSingh: atlasPortrait(2, 1),
  julesReed: atlasPortrait(3, 1),
} as const satisfies Record<string, AvatarArt>;

export const profileArtByFixtureId: Readonly<Record<string, AvatarArt>> = {
  athlete_maya_torres: profileArt.mayaTorres,
  athlete_nia_brooks: profileArt.niaBrooks,
  athlete_rafael_almeida: profileArt.rafaelAlmeida,
};

export const communityArt = {
  saparOpen: {
    src: "/generated/sapar-world/calibration/arena-regional-championship.png",
    kind: "entity",
    objectPosition: "50% 48%",
  },
  northline: {
    src: "/generated/sapar-world/calibration/hybrid-team-after-training.webp",
    kind: "entity",
    objectPosition: "50% 45%",
  },
  eastbank: {
    src: "/generated/sapar-world/calibration/community-open-mat.webp",
    kind: "entity",
    objectPosition: "50% 45%",
  },
  weeklyQuest: {
    src: "/generated/sapar-world/calibration/achievement-verified-medallion.png",
    kind: "entity",
    objectPosition: "50% 50%",
  },
} as const satisfies Record<string, AvatarArt>;
