"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Bookmark,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  Compass,
  Flag,
  Heart,
  Hexagon,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  Trophy,
  UserPlus,
  Users,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { athlete, achievements, events, gyms, posts, ratingLanes, results } from "@/lib/sapar-prototype";
import { Avatar, SectionHeading, StatusTag, SwitchRow, SyntheticLabel } from "./primitives";
import { usePrototypeDispatch, usePrototypeState } from "./state";

function RatingLane({ lane }: { readonly lane: (typeof ratingLanes)[number] }): ReactNode {
  return (
    <Link className={`sa-rating-lane sa-rating-${lane.lane}`} href="/app/ratings">
      <span>{lane.label}</span>
      <strong>{lane.value.toLocaleString()}</strong>
      <small>{lane.status} · {lane.ratedBoutCount} eligible results</small>
      <em>{lane.delta > 0 ? "+" : ""}{lane.delta}</em>
    </Link>
  );
}

function ProofJourney(): ReactNode {
  const dispatch = usePrototypeDispatch();
  const reduce = useReducedMotion();
  const steps = [
    { label: "Train", detail: "Gym-confirmed", tone: "verified" },
    { label: "Compete", detail: "Event authority", tone: "social" },
    { label: "Result", detail: "Version 1", tone: "cobalt" },
    { label: "Why +22", detail: "Explained", tone: "earned" },
  ] as const;
  return (
    <button
      type="button"
      className="sa-proof-journey"
      onClick={() => dispatch({ type: "open-sheet", sheet: "proof", proofId: results[0].id })}
      aria-label="Open the complete proof thread for the verified result and rating change"
    >
      <motion.span className="sa-proof-line" initial={reduce ? false : { scaleX: 0.2 }} animate={{ scaleX: 1 }} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }} aria-hidden="true" />
      {steps.map((step, index) => (
        <span className={`sa-proof-step sa-proof-${step.tone}`} key={step.label}>
          <i>{index < 3 ? <Check aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}</i>
          <strong>{step.label}</strong><small>{step.detail}</small>
        </span>
      ))}
    </button>
  );
}

const earnedStamps = [
  {
    label: "Mat tested",
    detail: "Verified result",
    src: "/generated/sapar-world/calibration/stamp-mat-tested.webp",
  },
  {
    label: "Identity confirmed",
    detail: "Human reviewed",
    src: "/generated/sapar-world/calibration/stamp-identity-confirmed.webp",
  },
  {
    label: "Community trusted",
    detail: "Gym connected",
    src: "/generated/sapar-world/calibration/stamp-community-trusted.webp",
  },
] as const;

function EarnedStampStrip(): ReactNode {
  return (
    <section className="sa-earned-stamps" aria-labelledby="sa-earned-stamps-title">
      <div className="sa-earned-stamps-heading">
        <span id="sa-earned-stamps-title">Earned stamps</span>
        <Link href="/app/rewards" aria-label="View all earned stamps">View all <ChevronRight aria-hidden="true" /></Link>
      </div>
      <div className="sa-earned-stamp-row">
        {earnedStamps.map((stamp) => (
          <Link href="/app/rewards" key={stamp.label}>
            <img src={stamp.src} alt="" width="320" height="320" loading="eager" decoding="async" />
            <span><strong>{stamp.label}</strong><small>{stamp.detail}</small></span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function PassportHero({ headingLevel = "h1" }: { readonly headingLevel?: "h1" | "h2" }): ReactNode {
  const dispatch = usePrototypeDispatch();
  const reduce = useReducedMotion();
  const Heading = headingLevel;
  return (
    <section className="sa-passport" aria-labelledby="sa-passport-name">
      <div className="sa-passport-top">
        <div><SyntheticLabel compact /><span>Fighter passport</span></div>
        <StatusTag tone="verified"><ShieldCheck aria-hidden="true" /> Verified</StatusTag>
      </div>
      <div className="sa-passport-body">
        <div className="sa-passport-portrait">
          <motion.img
            src="/generated/sapar-world/calibration/passport-maya-fullbleed.webp"
            alt="Cartoon-first portrait of fictional adult athlete Maya Torres in a white gi, integrated into a vibrant cobalt SAPAR passport"
            width="1536"
            height="2048"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            initial={reduce ? false : { opacity: 0, scale: 0.94, x: -12 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <div className="sa-passport-details">
          <div className="sa-passport-copy">
            <Heading id="sa-passport-name">{athlete.displayName}</Heading>
            <span><MapPin aria-hidden="true" /> {athlete.location.city}, {athlete.location.region} · {gyms[0].name}</span>
            <div className="sa-passport-tags"><span>{athlete.belt.rank} belt · self-declared demo</span><span>Adult</span></div>
          </div>
          <div className="sa-passport-ratings">
            {ratingLanes.map((lane) => <RatingLane key={lane.id} lane={lane} />)}
          </div>
          <button className="sa-passport-proof-action" type="button" onClick={() => dispatch({ type: "open-sheet", sheet: "proof", proofId: results[0].id })}>
            <ShieldCheck aria-hidden="true" />
            <span><strong>22 verified results</strong><small>Open record and rating proof</small></span>
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
      <EarnedStampStrip />
    </section>
  );
}

function CompetitiveTier(): ReactNode {
  return (
    <section className="sa-rank-tier" aria-labelledby="sa-rank-tier-title">
      <div className="sa-rank-emblem" aria-hidden="true"><Hexagon /><span>V</span></div>
      <div className="sa-rank-copy">
        <div className="sa-rank-title-row">
          <h2 id="sa-rank-tier-title">Vanguard III</h2>
          <span>Illustrative tier</span>
        </div>
        <p><strong>#3</strong> Denver adult purple No-Gi cohort</p>
      </div>
      <div className="sa-rank-progress">
        <span><strong>68</strong> / 100 rank points</span>
        <progress max="100" value="68" aria-label="Vanguard III competitive rank progress: 68 of 100 rank points">68 percent</progress>
        <small>Derived only from the synthetic No-Gi rating. Belt, XP, followers, and purchases cannot move it.</small>
      </div>
      <Link href="/app/leaderboards">Open standings <ArrowRight aria-hidden="true" /></Link>
    </section>
  );
}

function CommunityBeacons(): ReactNode {
  const beacons = [
    { href: "/app/network", initials: "NB", label: "Nia's open mat", tone: "social" as const },
    { href: "/app/compete", initials: "SO", label: "SAPAR Open", tone: "earned" as const },
    { href: "/app/gyms", initials: "NJ", label: "Northline", tone: "verified" as const },
    { href: "/app/quests", initials: "Q3", label: "Weekly quest", tone: "cobalt" as const },
  ];
  return (
    <nav className="sa-beacons" aria-label="Community shortcuts">
      {beacons.map((beacon) => <Link href={beacon.href} key={beacon.href}><Avatar initials={beacon.initials} tone={beacon.tone} label={beacon.label} /><span>{beacon.label}</span></Link>)}
    </nav>
  );
}

function GymCommunity(): ReactNode {
  const media = [
    {
      src: "/generated/sapar-world/calibration/community-open-mat.webp",
      alt: "Cartoon-first group of fictional adult grapplers gathered after an open mat",
    },
    {
      src: "/generated/sapar-world/calibration/hybrid-team-after-training.webp",
      alt: "Hybrid illustrated group of fictional adult teammates after training",
    },
  ] as const;
  const cards = gyms.map((gym, index) => ({
    name: gym.name,
    detail: `${gym.memberCount} members · ${gym.schedule.length} sessions`,
    href: `/app/gyms?gym=${encodeURIComponent(gym.id)}`,
    ...media[index % media.length],
  }));
  return (
    <section className="sa-gym-community" aria-labelledby="sa-gym-community-title">
      <div className="sa-home-section-heading">
        <div><Users aria-hidden="true" /><h2 id="sa-gym-community-title">Gym community</h2></div>
        <Link href="/app/gyms">See all <ChevronRight aria-hidden="true" /></Link>
      </div>
      <div className="sa-gym-community-track">
        {cards.map((card) => (
          <Link href={card.href} key={card.name}>
            <img src={card.src} alt={card.alt} width="1448" height="1086" loading="lazy" decoding="async" />
            <span><strong>{card.name}</strong><small><i aria-hidden="true" />{card.detail}</small></span>
            <ArrowRight aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}

function FeedPost(): ReactNode {
  const state = usePrototypeState();
  const dispatch = usePrototypeDispatch();
  const [commentsOpen, setCommentsOpen] = useState(false);
  const post = posts[0];
  const liked = state.likedPostIds.includes(post.id);
  const likeCount = post.reactions.support + (liked ? 1 : 0);
  const saved = state.savedPostIds.includes(post.id);
  const following = state.followedAthleteIds.includes(post.author.id);
  const blocked = state.blockedAthleteIds.includes(post.author.id);
  if (blocked) {
    return <div className="sa-empty-inline"><ShieldCheck /><p><strong>Profile hidden</strong><span>This local fixture is blocked. Manage safety choices in Settings.</span></p><Link href="/app/settings">Open settings</Link></div>;
  }
  return (
    <article className="sa-feed-post">
      <header>
        <Avatar initials={post.author.initials} tone="social" label={`Synthetic profile ${post.author.displayName}`} src="/generated/sapar-world/calibration/cartoon-nia-avatar.webp" />
        <p><strong>{post.author.displayName}</strong><small>{post.author.handle} · Northline · 18m</small></p>
        <button type="button" className="sa-icon-button" onClick={() => dispatch({ type: "open-sheet", sheet: "report" })} aria-label="Open post and profile safety controls"><MoreHorizontal /></button>
      </header>
      <div className="sa-feed-media">
        <img src="/generated/sapar-world/calibration/community-open-mat.webp" alt={post.media[0].alt} width="1448" height="1086" loading="lazy" decoding="async" />
        <div><span>Northline sunrise rounds</span><strong>Small work.<br />Stacked together.</strong><StatusTag tone="verified">{post.verificationLabel}</StatusTag></div>
      </div>
      <p>{post.body}</p>
      <div className="sa-feed-actions">
        <button type="button" aria-label={`${liked ? "Unlike" : "Like"} ${post.author.displayName}'s post · ${likeCount} likes`} aria-pressed={liked} className={liked ? "is-active" : ""} onClick={() => dispatch({ type: "toggle-like", id: post.id })}><Heart fill={liked ? "currentColor" : "none"} /><span>{likeCount}</span></button>
        <button
          type="button"
          aria-label={`${commentsOpen ? "Close" : "Open"} ${post.commentCount} comments on ${post.author.displayName}'s post`}
          aria-expanded={commentsOpen}
          aria-controls="sa-comments-preview"
          className={commentsOpen ? "is-active" : ""}
          onClick={() => setCommentsOpen((open) => !open)}
        ><MessageCircle /><span>{post.commentCount}</span></button>
        <button type="button" onClick={() => dispatch({ type: "open-sheet", sheet: "share" })} aria-label="Share synthetic post preview"><Share2 /></button>
        <button type="button" aria-pressed={saved} className={saved ? "is-active" : ""} onClick={() => dispatch({ type: "toggle-save", id: post.id })} aria-label={saved ? "Remove saved post" : "Save post"}><Bookmark fill={saved ? "currentColor" : "none"} /></button>
        <button type="button" aria-pressed={following} className="sa-follow-button" onClick={() => dispatch({ type: "toggle-follow", id: post.author.id })}>{following ? <Check /> : <UserPlus />}{following ? "Following" : "Follow"}</button>
      </div>
      {commentsOpen ? (
        <div className="sa-comments-preview" id="sa-comments-preview">
          <div><Avatar initials="OS" tone="earned" label="Synthetic profile Omar Singh" /><p><strong>Omar Singh</strong><span>Those transition rounds looked sharp. Saving this sequence for Thursday.</span></p></div>
          <div><Avatar initials="JR" tone="cobalt" label="Synthetic profile Jules Reed" /><p><strong>Jules Reed</strong><span>Great room energy. Thanks for keeping the pace welcoming.</span></p></div>
          <small>2 of {post.commentCount} synthetic comments shown · read-only local preview</small>
        </div>
      ) : null}
    </article>
  );
}

export function PulseView(): ReactNode {
  const dispatch = usePrototypeDispatch();
  const session = gyms[0].schedule[0];
  return (
    <div className="sa-view sa-pulse-view">
      <PassportHero />
      <section className="sa-home-proof" aria-labelledby="sa-home-proof-title">
        <div className="sa-home-section-heading">
          <div><ShieldCheck aria-hidden="true" /><h2 id="sa-home-proof-title">Proof thread</h2></div>
          <button type="button" onClick={() => dispatch({ type: "open-sheet", sheet: "proof", proofId: results[0].id })}>Full record <ChevronRight aria-hidden="true" /></button>
        </div>
        <ProofJourney />
      </section>
      <GymCommunity />
      <section className="sa-recent-activity" aria-labelledby="sa-recent-activity-title">
        <div className="sa-home-section-heading">
          <div><Sparkles aria-hidden="true" /><h2 id="sa-recent-activity-title">Recent activity</h2></div>
          <Link href="/app/network">See all <ChevronRight aria-hidden="true" /></Link>
        </div>
        <FeedPost />
      </section>
      <section className="sa-more-mat" aria-labelledby="sa-more-mat-title">
        <div className="sa-home-section-heading">
          <div><Compass aria-hidden="true" /><h2 id="sa-more-mat-title">More from your mat</h2></div>
          <button type="button" onClick={() => dispatch({ type: "open-sheet", sheet: "search" })}><Search aria-hidden="true" /> Find a roll</button>
        </div>
        <CommunityBeacons />
      </section>
      <section className="sa-next-session">
        <div className="sa-next-icon"><CalendarDays /></div>
        <div><span>Open mat tonight</span><strong>{session.startsAtLocal}</strong><small>{gyms[0].name} · {session.spotsRemaining} synthetic spots</small></div>
        <button type="button" className="sa-tactile-arrow" onClick={() => dispatch({ type: "open-sheet", sheet: "booking" })} aria-label="Open local booking preview"><ArrowRight /></button>
      </section>
      <CompetitiveTier />
      <aside className="sa-side-stack">
        <SectionHeading title="Next proving ground" detail="Rules and authority before registration" />
        <Link className="sa-event-teaser" href="/app/compete"><span><Trophy /></span><p><strong>{events[0].name}</strong><small>October 18 · Denver · Adult</small></p><ArrowRight /></Link>
        <SectionHeading title="Your systems stay separate" />
        <div className="sa-system-legend"><span>Competitive rating</span><span>Belt rank</span><span>Private XP</span><span>Social reach</span></div>
      </aside>
    </div>
  );
}

export function ProfileView(): ReactNode {
  const dispatch = usePrototypeDispatch();
  return (
    <div className="sa-view sa-profile-view">
      <PassportHero />
      <div className="sa-profile-actions">
        <Link className="sa-button sa-button-primary" href="/app/settings">Edit visibility</Link>
        <Link className="sa-button sa-button-secondary" href="/app/onboarding">Review onboarding</Link>
        <button className="sa-button sa-button-secondary" type="button" onClick={() => dispatch({ type: "open-sheet", sheet: "share" })}><Share2 /> Share preview</button>
      </div>
      <section className="sa-profile-metrics" aria-label="Synthetic athlete summary">
        <div><span>Verified record</span><strong>6–2</strong><small>No-Gi · synthetic</small></div>
        <div><span>Belt</span><strong>{athlete.belt.rank}</strong><small>{athlete.belt.source}</small></div>
        <div><span>Private journey</span><strong>18</strong><small>4,220 XP</small></div>
        <div><span>Community</span><strong>{athlete.followerCount}</strong><small>followers</small></div>
      </section>
      <div className="sa-two-column">
        <section className="sa-surface">
          <SectionHeading title="Rating lanes" detail="Belt, XP, purchases, and followers cannot move these values." action={<Link href="/app/ratings">Explain <ArrowRight /></Link>} />
          <div className="sa-rating-list">{ratingLanes.map((lane) => <RatingLane key={lane.id} lane={lane} />)}</div>
        </section>
        <section className="sa-surface">
          <SectionHeading title="Earned with evidence" detail="Deterministic criteria, never random drops." action={<Link href="/app/rewards">View all <ArrowRight /></Link>} />
          <div className="sa-achievement-list">{achievements.map((item) => <Link href="/app/rewards" key={item.id}><span><Trophy /></span><p><strong>{item.title}</strong><small>{item.progress.current} / {item.progress.target} {item.progress.unit}</small></p><StatusTag tone={item.state === "earned" ? "verified" : "earned"}>{item.state}</StatusTag></Link>)}</div>
        </section>
      </div>
    </div>
  );
}

type DiscoverScope = "all" | "fighters" | "gyms" | "events";

export function DiscoverView(): ReactNode {
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState<DiscoverScope>("all");
  const normalized = query.trim().toLowerCase();
  const cards = useMemo(() => [
    { kind: "fighters" as const, title: "Maya Torres", detail: "Purple · Adult · Denver", href: "/app/profile", initials: "MT" },
    { kind: "fighters" as const, title: "Nia Brooks", detail: "Blue · Adult · Denver", href: "/app/network", initials: "NB" },
    ...gyms.map((gym) => ({ kind: "gyms" as const, title: gym.name, detail: `${gym.location.distanceMiles} mi · ${gym.verification}`, href: `/app/gyms?gym=${encodeURIComponent(gym.id)}`, initials: gym.name.split(" ").map((word) => word[0]).join("").slice(0, 2) })),
    ...events.map((event) => ({ kind: "events" as const, title: event.name, detail: `${event.venue.city} · ${event.status}`, href: `/app/compete?event=${encodeURIComponent(event.id)}`, initials: "EV" })),
  ].filter((item) => (scope === "all" || item.kind === scope) && (!normalized || `${item.title} ${item.detail}`.toLowerCase().includes(normalized))), [normalized, scope]);
  return (
    <div className="sa-view">
      <div className="sa-view-intro"><div><h1>Discover your next mat.</h1><p>Search only the transparent synthetic fixture set.</p></div></div>
      <Link className="sa-discover-story" href="/app/compete">
        <img src="/generated/sapar-world/calibration/hybrid-matchday-warmup.webp" alt="Two fictional adult teammates sharing a calm matchday warm-up moment inside an illustrated SAPAR frame" width="1003" height="1568" loading="lazy" decoding="async" />
        <span><StatusTag tone="earned">Matchday story</StatusTag><strong>Ready feels better together.</strong><small>Open the synthetic competition preview</small></span>
        <ArrowRight aria-hidden="true" />
      </Link>
      <label className="sa-discover-search"><Search /><span className="sr-only">Search discovery fixtures</span><input value={query} onChange={(event) => setQuery(event.currentTarget.value)} placeholder="Search fighters, gyms, or events" /></label>
      <div className="sa-filter-tabs" role="group" aria-label="Discovery type">
        {(["all", "fighters", "gyms", "events"] as const).map((item) => <button type="button" key={item} aria-pressed={scope === item} onClick={() => setScope(item)}>{item}</button>)}
      </div>
      {cards.length ? <div className="sa-discover-grid">{cards.map((card) => <Link href={card.href} key={`${card.kind}-${card.title}`}><Avatar initials={card.initials} tone={card.kind === "gyms" ? "verified" : card.kind === "events" ? "earned" : "social"} label={`Synthetic ${card.kind.slice(0, -1)} ${card.title}`} /><p><span>{card.kind}</span><strong>{card.title}</strong><small>{card.detail}</small></p><ArrowRight /></Link>)}</div> : <div className="sa-empty-state"><Compass /><h2>No local fixtures match</h2><p>Clear the query or choose another category. A production search service is proposed, not connected.</p><button type="button" className="sa-button sa-button-secondary" onClick={() => { setQuery(""); setScope("all"); }}>Reset search</button></div>}
    </div>
  );
}

export function NetworkView(): ReactNode {
  const state = usePrototypeState();
  const dispatch = usePrototypeDispatch();
  const people: ReadonlyArray<{ readonly id: string; readonly name: string; readonly detail: string; readonly initials: string; readonly image?: string }> = [
    { id: "athlete_nia_brooks", name: "Nia Brooks", detail: "Training partner · Northline", initials: "NB", image: "/generated/sapar-world/calibration/cartoon-nia-avatar.webp" },
    { id: "athlete_lena_park", name: "Lena Park", detail: "Rival · Forge Academy", initials: "LP" },
    { id: "athlete_rafael_almeida", name: "Rafael Almeida", detail: "Coach · Northline", initials: "RA", image: "/generated/sapar-world/calibration/cartoon-rafael-avatar.webp" },
  ];
  return (
    <div className="sa-view">
      <div className="sa-view-intro"><div><h1>Your mat network.</h1><p>Gyms, coaches, teammates, squads, and rivals stay legible.</p></div><Link className="sa-button sa-button-secondary" href="/app/discover"><Search /> Find people</Link></div>
      <section className="sa-network-hero">
        <img src="/generated/sapar-world/calibration/hybrid-team-after-training.webp" alt="Six fictional adult teammates smiling together after training inside an illustrated cobalt SAPAR scene" width="1672" height="941" loading="lazy" decoding="async" />
        <div><SyntheticLabel compact /><strong>The people make the mat.</strong><span>Original fictional adults · synthetic community story</span></div>
      </section>
      <div className="sa-network-summary"><div><Users /><strong>311</strong><span>Following</span></div><div><Building2 /><strong>3</strong><span>Gyms</span></div><div><Trophy /><strong>8</strong><span>Rivals</span></div></div>
      <section className="sa-surface"><SectionHeading title="People in your orbit" detail="Follow state is local to this prototype session." /><div className="sa-network-list">{people.map((person) => { const following = state.followedAthleteIds.includes(person.id); return <div key={person.id}>{person.image ? <img className="sa-network-photo" src={person.image} alt={`Cartoon profile portrait of fictional adult ${person.name}`} width="96" height="96" loading="lazy" decoding="async" /> : <Avatar initials={person.initials} tone="social" label={`Synthetic athlete ${person.name}`} />}<p><strong>{person.name}</strong><small>{person.detail}</small></p><button type="button" aria-pressed={following} className={following ? "is-following" : ""} onClick={() => dispatch({ type: "toggle-follow", id: person.id })}>{following ? <Check /> : <UserPlus />}{following ? "Following" : "Follow"}</button></div>; })}</div></section>
    </div>
  );
}

type OnboardingRole = "athlete" | "coach" | "organizer";

export function OnboardingView(): ReactNode {
  const dispatch = usePrototypeDispatch();
  const [role, setRole] = useState<OnboardingRole>("athlete");
  const [adultConfirmed, setAdultConfirmed] = useState(false);
  const [consent, setConsent] = useState(false);
  return (
    <div className="sa-view sa-onboarding-view">
      <section className="sa-onboarding-hero"><SyntheticLabel /><h1>Build an identity that can travel from mat to mat.</h1><p>This prototype demonstrates role selection, adult eligibility, consent, privacy, and notification defaults before any social or competition flow.</p></section>
      <section className="sa-surface"><SectionHeading title="Choose your role" detail="You can change this local fixture later." /><div className="sa-role-grid">{(["athlete", "coach", "organizer"] as const).map((item) => <button type="button" aria-pressed={role === item} onClick={() => setRole(item)} key={item}><span>{item === "athlete" ? <Trophy /> : item === "coach" ? <Users /> : <Flag />}</span><strong>{item}</strong><small>{item === "athlete" ? "Train, connect, and compete" : item === "coach" ? "Guide athletes and confirm sessions" : "Publish events and govern results"}</small></button>)}</div></section>
      <section className="sa-surface"><SectionHeading title="Consent and privacy" detail="Calm, reversible choices—no pretense that an account was created." /><SwitchRow label="I confirm this prototype represents an adult user" description="Required to continue. This local confirmation does not verify age; minor workflows are excluded." checked={adultConfirmed} onChange={setAdultConfirmed} /><SwitchRow label="Use the local synthetic profile" description="No personal data, media, or precise location is collected." checked={consent} onChange={setConsent} /></section>
      <p id="sa-onboarding-requirements" className="sa-search-note">{adultConfirmed && consent ? "Both local confirmations are complete." : "Confirm adult eligibility and synthetic-profile consent to continue."}</p>
      <button type="button" className="sa-button sa-button-primary sa-wide-button" aria-describedby="sa-onboarding-requirements" disabled={!adultConfirmed || !consent} onClick={() => dispatch({ type: "toast", message: `${role} onboarding preview completed locally.` })}><Check /> Complete local preview</button>
    </div>
  );
}
