"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  ChevronDown,
  CirclePause,
  CirclePlay,
  Flag,
  Info,
  MapPin,
  Medal,
  RotateCcw,
  ScanLine,
  Share2,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { Suspense, useEffect, useMemo, useState, type ReactNode } from "react";
import { events, ratingLanes, results } from "@/lib/sapar-prototype";
import { Avatar, SectionHeading, StatusTag, SyntheticLabel } from "./primitives";
import { usePrototypeDispatch, usePrototypeState } from "./state";

type FormatFilter = "all" | "gi" | "no-gi";
type EventFixture = (typeof events)[number];

const replayDurationSeconds = 300;

function formatReplayTime(position: number): string {
  const boundedPosition = Math.min(100, Math.max(0, position));
  const elapsedSeconds = Math.round((boundedPosition / 100) * replayDurationSeconds);
  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function formatEventDate(startsAt: string, month: "long" | "short"): string {
  return new Intl.DateTimeFormat("en-US", {
    month,
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(startsAt));
}

function EventHero({ event }: { readonly event: EventFixture }): ReactNode {
  const state = usePrototypeState();
  const dispatch = usePrototypeDispatch();
  const registered = state.registeredEventIds.includes(event.id);
  const registrationOpen = event.status === "registration-open";
  const completed = event.status === "completed";
  const statusLabel = completed ? "Completed event" : registrationOpen ? registered ? "Registration preview saved" : "Registration open" : "Registration closed";
  return (
    <section className="sa-event-hero">
      <div className="sa-event-art">
        <img src="/generated/sapar-world/calibration/competition-arena.webp" alt="Two fictional adult competitors listening to a referee inside an illustrated SAPAR matchday frame" width="1672" height="941" loading="eager" decoding="async" />
        <div><SyntheticLabel compact /><span>Competition atlas · {event.formats.join(" + ")}</span><strong>{event.name}</strong><small>{event.venue.city} · {formatEventDate(event.startsAt, "long")}</small></div>
      </div>
      <div className="sa-event-details">
        <StatusTag tone={completed ? "verified" : registrationOpen ? "cobalt" : "neutral"}>{statusLabel}</StatusTag>
        <h2>Know the rules, authority, and fit before you step on the mat.</h2>
        <p>{event.organizer} · Human officials · Event-director result confirmation.</p>
        <div className="sa-event-facts"><span><CalendarDays /> {formatEventDate(event.startsAt, "short")}</span><span><MapPin /> {event.venue.city}, {event.venue.region}</span><span><Users /> {event.divisions[0].capacity} division capacity</span></div>
        <div className="sa-event-authority"><ShieldCheck /><p><strong>{event.authority.label}</strong><span>Authority is explicit; illustrative rules are not federation approval.</span></p></div>
        {!completed ? <p>{event.registration.eligibility} · ${(event.registration.priceCents / 100).toFixed(2)} {event.registration.currency} illustrative fee.</p> : null}
        {completed ? <Link className="sa-button sa-button-success" href="/app/arena"><ShieldCheck /> Open verified result</Link> : <button type="button" className={`sa-button ${registered ? "sa-button-success" : "sa-button-primary"}`} disabled={registered || !registrationOpen} onClick={() => dispatch({ type: "register-event", id: event.id })}>{registered ? <Check /> : <Trophy />}{registered ? "Preview saved" : registrationOpen ? "Save registration preview" : "Registration closed"}</button>}
      </div>
    </section>
  );
}

export function CompeteView(): ReactNode {
  return (
    <Suspense fallback={<div className="sa-view"><section className="sa-surface"><p>Loading synthetic competition fixtures…</p></section></div>}>
      <CompeteViewContent />
    </Suspense>
  );
}

function CompeteViewContent(): ReactNode {
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState<FormatFilter>("all");
  const requestedEventId = searchParams.get("event");
  const selectedEvent = events.find((event) => event.id === requestedEventId) ?? events.find((event) => event.status === "registration-open");
  const visibleEvents = events.filter((event) => filter === "all" || event.formats.some((format) => format === filter));
  if (!selectedEvent) {
    return <div className="sa-view"><section className="sa-surface"><h1>Competition fixtures unavailable.</h1><p>The local synthetic event catalog is empty.</p></section></div>;
  }
  return (
    <div className="sa-view">
      <div className="sa-view-intro"><div><h1>Compete with the whole picture.</h1><p>Events, leagues, ladders, rules, authority, eligibility, and proof.</p></div><Link className="sa-button sa-button-secondary" href="/app/leaderboards"><Medal /> Leaderboards</Link></div>
      <EventHero event={selectedEvent} />
      <section className="sa-surface">
        <SectionHeading title="Competition calendar" detail="Every date and capacity is a synthetic demonstration fixture." />
        <div className="sa-filter-tabs" role="group" aria-label="Competition format">
          {(["all", "gi", "no-gi"] as const).map((item) => <button type="button" key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
        <div className="sa-event-list">
          {visibleEvents.map((event) => (
            <Link href={event.status === "completed" ? "/app/arena" : `/app/compete?event=${encodeURIComponent(event.id)}`} aria-current={event.id === selectedEvent.id ? "page" : undefined} key={event.id}>
              <time dateTime={event.startsAt}>{new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" }).format(new Date(event.startsAt)).toUpperCase()}<br /><strong>{new Date(event.startsAt).getUTCDate()}</strong></time>
              <div><StatusTag tone={event.status === "completed" ? "verified" : "earned"}>{event.status}</StatusTag><h3>{event.name}</h3><p>{event.venue.name} · {event.venue.city}</p><small>{event.formats.join(" + ")} · {event.authority.label}</small></div>
              <ArrowRight />
            </Link>
          ))}
        </div>
      </section>
      <section className="sa-compete-guidance"><div><Flag /><h2>Clear contest states</h2><p>Eligibility, registration, bracket publication, result version, correction, dispute, and final status never collapse into one badge.</p></div><div><ShieldCheck /><h2>Human authority first</h2><p>Assistive analysis stays experimental and cannot silently become scoring authority.</p></div></section>
    </div>
  );
}

export function ArenaView(): ReactNode {
  const dispatch = usePrototypeDispatch();
  const [activeStep, setActiveStep] = useState(2);
  const timeline = [
    { time: "04:42", label: "Takedown", detail: "Maya · +2" },
    { time: "03:18", label: "Pass", detail: "Maya · +3" },
    { time: "02:06", label: "Sweep", detail: "Lena · +2" },
    { time: "00:48", label: "Sweep", detail: "Maya · +2" },
    { time: "00:14", label: "Sweep", detail: "Lena · +2" },
  ];
  return (
    <div className="sa-view sa-arena-view">
      <h1 className="sr-only">Synthetic match arena</h1>
      <div className="sa-arena-nav"><Link href="/app/compete"><ArrowLeft /> Event hub</Link><StatusTag tone="verified"><ShieldCheck /> Human-confirmed result</StatusTag><SyntheticLabel compact /></div>
      <section className="sa-scoreboard" aria-label="Synthetic final match score">
        <div><Avatar initials="MT" tone="cobalt" label="Synthetic athlete Maya Torres" /><p><strong>Maya Torres</strong><small>Northline · Purple</small></p><b>7</b></div>
        <span><small>Final</small><strong>05:00</strong><em>No-Gi · Lightweight</em></span>
        <div><b>4</b><p><strong>Lena Park</strong><small>Forge · Purple</small></p><Avatar initials="LP" tone="social" label="Synthetic athlete Lena Park" /></div>
      </section>
      <div className="sa-arena-grid">
        <section className="sa-replay-stage">
          <img src="/generated/sapar-world/calibration/cartoon-grip-fight.webp" alt="Cartoon scene of two fictional adult athletes safely wrestling in a controlled standing grip fight" width="1672" height="941" loading="lazy" decoding="async" />
          <div className="sa-replay-overlay"><SyntheticLabel compact /><StatusTag tone="earned"><ScanLine /> Assistive overlay · experimental</StatusTag><button type="button" onClick={() => dispatch({ type: "toast", message: "Synthetic replay started. No media was loaded or analyzed." })} aria-label="Play synthetic replay"><CirclePlay /></button><span>Camera 02 · fictional footage</span></div>
        </section>
        <aside className="sa-timeline">
          <SectionHeading title="Match timeline" detail="Select a moment to synchronize the local replay state." />
          {timeline.map((item, index) => <button type="button" className={activeStep === index ? "is-active" : ""} aria-pressed={activeStep === index} onClick={() => setActiveStep(index)} key={item.time}><time>{item.time}</time><i /><p><strong>{item.label}</strong><small>{item.detail}</small></p></button>)}
          <Link className="sa-button sa-button-primary" href="/app/replay">Open verified result <ArrowRight /></Link>
        </aside>
      </div>
      <div className="sa-authority-strip"><span><ShieldCheck /> Result authority: SAPAR event desk</span><span><Info /> Correction window: closed</span><span><Flag /> Result version: 1</span></div>
    </div>
  );
}

export function ReplayView(): ReactNode {
  const reduce = useReducedMotion();
  const state = usePrototypeState();
  const dispatch = usePrototypeDispatch();
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(78);
  const result = results[0];
  const lowMotion = Boolean(reduce) || state.preferences.lowStimulation;

  useEffect(() => {
    if (!playing) return;

    const tickDuration = lowMotion ? 1000 : 250;
    const tickStep = lowMotion ? 4 : 1;
    const timer = window.setTimeout(() => {
      const nextPosition = Math.min(100, position + tickStep);
      setPosition(nextPosition);
      if (nextPosition >= 100) setPlaying(false);
    }, tickDuration);

    return () => window.clearTimeout(timer);
  }, [lowMotion, playing, position]);

  function togglePlayback(): void {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (position >= 100) setPosition(0);
    setPlaying(true);
  }

  function updatePosition(nextPosition: number): void {
    const boundedPosition = Math.min(100, Math.max(0, nextPosition));
    setPosition(boundedPosition);
    if (boundedPosition >= 100) setPlaying(false);
  }

  function resetPlayback(): void {
    setPlaying(false);
    setPosition(0);
  }

  return (
    <div className="sa-view sa-result-view">
      <h1 className="sr-only">Verified result replay</h1>
      <section className="sa-result-stage">
        <motion.div className="sa-result-field" initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }} aria-hidden="true" />
        <SyntheticLabel compact />
        <p>Human-confirmed result · SAPAR Summer Open</p>
        <div className="sa-result-versus"><div><Avatar initials="MT" tone="cobalt" label="Maya Torres" /><strong>Maya<br />Torres</strong><small>Northline</small></div><span><StatusTag tone="verified">Verified</StatusTag><strong>{result.versions[0].score.display}</strong><small>Points · Final</small></span><div><Avatar initials="LP" tone="social" label="Lena Park" /><strong>Lena<br />Park</strong><small>Forge</small></div></div>
      </section>
      <section className="sa-player" aria-label="Synthetic replay controls"><button type="button" aria-label={playing ? "Pause synthetic replay" : position >= 100 ? "Replay synthetic result from the beginning" : "Play synthetic replay"} onClick={togglePlayback}>{playing ? <CirclePause /> : <CirclePlay />}</button><label><span className="sr-only">Synthetic replay position</span><input type="range" min="0" max="100" value={position} aria-valuetext={`${formatReplayTime(position)} of 5:00`} onChange={(event) => updatePosition(Number(event.currentTarget.value))} /></label><span>{formatReplayTime(position)} / 5:00</span><button type="button" aria-label="Restart synthetic replay" onClick={resetPlayback}><RotateCcw /></button></section>
      <div className="sa-result-summary">
        <section className="sa-rating-change">
          <span>No-Gi rating update</span>
          <div><strong>1,526</strong><ArrowRight /><strong>1,548</strong></div>
          <p className="sa-delta"><em>+22</em><span>after one verified result</span></p>
          <p>Opponent strength, result confidence, and a provisional sample produced this illustrative movement.</p>
          <button type="button" onClick={() => dispatch({ type: "open-sheet", sheet: "proof", proofId: result.id })}>Open complete Proof Thread <ArrowRight /></button>
        </section>
        <section className="sa-separate-progress">
          <SectionHeading title="Separate progress updates" detail="None of these can substitute for another." />
          <div><p><Trophy /><span><strong>Record</strong><small>6–2 No-Gi</small></span></p><p><Sparkles /><span><strong>Private journey XP</strong><small>+180 deterministic</small></span></p><p><Medal /><span><strong>Achievement</strong><small>Proof Kept</small></span></p></div>
        </section>
      </div>
      <div className="sa-result-actions"><button className="sa-button sa-button-secondary" type="button" onClick={() => dispatch({ type: "open-sheet", sheet: "share" })}><Share2 /> Share preview</button><Link className="sa-button sa-button-primary" href="/app/profile">Open fighter card <ArrowRight /></Link></div>
    </div>
  );
}

type RatingLaneKey = "gi" | "no-gi";
type RatingWindow = "30d" | "90d" | "season";

export function RatingsView(): ReactNode {
  const dispatch = usePrototypeDispatch();
  const reduce = useReducedMotion();
  const [laneKey, setLaneKey] = useState<RatingLaneKey>("no-gi");
  const [window, setWindow] = useState<RatingWindow>("90d");
  const [formulaOpen, setFormulaOpen] = useState(false);
  const lane = ratingLanes.find((item) => item.lane === laneKey) ?? ratingLanes[0];
  const ratingStart = lane.value - lane.delta;
  const ratingDirection = lane.delta > 0 ? "rose" : lane.delta < 0 ? "fell" : "remained level";
  const sourceResult = lane.causedByResultId ? results.find((item) => item.id === lane.causedByResultId) : null;
  const factorRows = useMemo(() => laneKey === "no-gi" ? [
    { title: "Opponent context", detail: "Lena entered 21 points above Maya." },
    { title: "Provisional sample", detail: "Twelve eligible results allow more movement." },
    { title: "Authority and version", detail: "Event-confirmed result version 1; correction window closed." },
  ] : [
    { title: "Opponent context", detail: "Comparable pre-match rating." },
    { title: "Established sample", detail: "Nineteen eligible results reduce volatility." },
    { title: "Lane isolation", detail: "No-Gi activity cannot change this Gi rating." },
  ], [laneKey]);
  return (
    <div className="sa-view sa-ratings-view">
      <div className="sa-view-intro"><div><h1>A rating that explains itself.</h1><p>Illustrative model presentation—not an official federation ranking.</p></div><SyntheticLabel /></div>
      <div className="sa-filter-tabs sa-lane-tabs" role="group" aria-label="Rating lane">
        {(["no-gi", "gi"] as const).map((item) => <button type="button" aria-pressed={laneKey === item} onClick={() => setLaneKey(item)} key={item}>{item}</button>)}
      </div>
      <section className="sa-rating-dashboard">
        <div className="sa-rating-current"><span>{lane.label}</span><strong>{lane.value.toLocaleString()}</strong><div><em>{lane.delta > 0 ? "+" : ""}{lane.delta}</em><StatusTag tone={lane.status === "provisional" ? "earned" : "verified"}>{lane.status}</StatusTag></div><small>Peak {lane.peak.toLocaleString()} · {lane.ratedBoutCount} eligible results</small></div>
        <div className="sa-confidence"><span>Confidence range</span><div><i style={{ left: "34%" }} /><i className="is-rating" style={{ left: "58%" }} /></div><p><small>{lane.confidence.low.toLocaleString()}</small><strong>{lane.confidence.label}</strong><small>{lane.confidence.high.toLocaleString()}</small></p><em>{lane.confidence.label} is uncertainty, not a guaranteed rank.</em></div>
        <div className="sa-rating-context"><p><span>Cohort</span><strong>Adult · Purple · Lightweight · Denver</strong></p><p><span>Recent form</span><strong>{lane.recentForm.map((item) => item === "win" ? "W" : "L").join(" · ")}</strong></p><p><span>Model</span><strong>{lane.modelVersion} · illustrative</strong></p></div>
      </section>
      <div className="sa-two-column">
        <section className="sa-surface sa-why-moved">
          <SectionHeading title="Why it moved" detail={lane.explanation} />
          {factorRows.map((factor, index) => <div key={factor.title}><span>{index + 1}</span><p><strong>{factor.title}</strong><small>{factor.detail}</small></p><StatusTag tone={index === 2 ? "verified" : "cobalt"}>{index === 2 ? "Eligible" : "Context"}</StatusTag></div>)}
          {sourceResult ? <button type="button" className="sa-button sa-button-primary" onClick={() => dispatch({ type: "open-sheet", sheet: "proof", proofId: sourceResult.id })}><ShieldCheck /> Trace source result</button> : <p className="sa-search-note">No source result is attached to this static historical snapshot.</p>}
          <button type="button" className="sa-text-button" aria-expanded={formulaOpen} onClick={() => setFormulaOpen((value) => !value)}>How the demo model is presented <ChevronDown /></button>
          <AnimatePresence initial={!reduce}>{formulaOpen ? <motion.p className="sa-formula-note" initial={reduce ? false : { opacity: 0, height: 0 }} animate={reduce ? undefined : { opacity: 1, height: "auto" }} exit={reduce ? undefined : { opacity: 0, height: 0 }} transition={reduce ? { duration: 0 } : undefined}>SAPAR Rating 0.8 is a presentation fixture, not a finalized formula. Disputed results remain ineligible, and Gi and No-Gi lanes never mix.</motion.p> : null}</AnimatePresence>
        </section>
        <section className="sa-surface">
          <SectionHeading title="Rating history" detail={`${window} · direct text equivalent below`} action={<select aria-label="Rating history window" value={window} onChange={(event) => setWindow(event.currentTarget.value as RatingWindow)}><option value="30d">30 days</option><option value="90d">90 days</option><option value="season">Season</option></select>} />
          <div className="sa-rating-chart" role="img" aria-label={`${lane.label} ${ratingDirection} from ${ratingStart.toLocaleString()} to ${lane.value.toLocaleString()} after the latest eligible result`}><svg viewBox="0 0 500 180"><path d="M8 152 C80 145 102 118 154 124 S248 144 302 94 S390 86 492 28" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" /><circle cx="492" cy="28" r="10" fill="var(--sa-verified)" /></svg></div>
          <ol className="sa-history-list"><li><span>Aug 30</span><p><strong>{lane.value.toLocaleString()}</strong><small>Verified result · {lane.delta > 0 ? "+" : ""}{lane.delta}</small></p></li><li><span>Aug 10</span><p><strong>{(lane.value - lane.delta).toLocaleString()}</strong><small>Pre-result snapshot</small></p></li></ol>
          <Link href="/app/leaderboards" className="sa-button sa-button-secondary"><BarChart3 /> Open cohort leaderboard</Link>
        </section>
      </div>
    </div>
  );
}

type LeaderboardScope = "cohort" | "season" | "squad";

interface LeaderboardRow {
  readonly rank: number;
  readonly name: string;
  readonly metric: number;
  readonly delta: number;
  readonly context: string;
  readonly initials: string;
  readonly avatarLabel: string;
  readonly isCurrent: boolean;
}

interface LeaderboardFixture {
  readonly title: string;
  readonly detail: string;
  readonly metricLabel: string;
  readonly changeLabel: string;
  readonly rows: readonly LeaderboardRow[];
}

const leaderboardFixtures: Readonly<Record<LeaderboardScope, LeaderboardFixture>> = {
  cohort: {
    title: "Denver · Adult Purple · No-Gi",
    detail: "No-Gi rating only · Maya's illustrative tier remains Vanguard III",
    metricLabel: "No-Gi rating",
    changeLabel: "Change after latest eligible result",
    rows: [
      { rank: 1, name: "Nia Brooks", metric: 1672, delta: 14, context: "18 eligible No-Gi results", initials: "NB", avatarLabel: "Synthetic athlete Nia Brooks", isCurrent: false },
      { rank: 2, name: "Sofia Reyes", metric: 1611, delta: 8, context: "21 eligible No-Gi results", initials: "SR", avatarLabel: "Synthetic athlete Sofia Reyes", isCurrent: false },
      { rank: 3, name: "Maya Torres", metric: 1548, delta: 22, context: "12 eligible No-Gi results · Vanguard III", initials: "MT", avatarLabel: "Synthetic athlete Maya Torres", isCurrent: true },
      { rank: 4, name: "Lena Park", metric: 1516, delta: -11, context: "16 eligible No-Gi results", initials: "LP", avatarLabel: "Synthetic athlete Lena Park", isCurrent: false },
      { rank: 5, name: "Keira Allen", metric: 1489, delta: 5, context: "14 eligible No-Gi results", initials: "KA", avatarLabel: "Synthetic athlete Keira Allen", isCurrent: false },
    ],
  },
  season: {
    title: "Open Mat League · Season 1",
    detail: "Season points are separate from Gi and No-Gi ratings and Vanguard tier",
    metricLabel: "Season points",
    changeLabel: "Points from latest scored event",
    rows: [
      { rank: 1, name: "Rafael Kim", metric: 940, delta: 90, context: "5 scored events", initials: "RK", avatarLabel: "Synthetic athlete Rafael Kim", isCurrent: false },
      { rank: 2, name: "Nia Brooks", metric: 885, delta: 55, context: "5 scored events", initials: "NB", avatarLabel: "Synthetic athlete Nia Brooks", isCurrent: false },
      { rank: 3, name: "Lena Park", metric: 842, delta: 72, context: "4 scored events", initials: "LP", avatarLabel: "Synthetic athlete Lena Park", isCurrent: false },
      { rank: 4, name: "Maya Torres", metric: 810, delta: 110, context: "4 scored events · Vanguard III unchanged", initials: "MT", avatarLabel: "Synthetic athlete Maya Torres", isCurrent: true },
      { rank: 5, name: "Jonah Price", metric: 768, delta: 48, context: "5 scored events", initials: "JP", avatarLabel: "Synthetic athlete Jonah Price", isCurrent: false },
    ],
  },
  squad: {
    title: "Synthetic squad standing",
    detail: "Squad points never change an athlete's Gi rating, No-Gi rating, or Vanguard tier",
    metricLabel: "Squad points",
    changeLabel: "Points from latest team round",
    rows: [
      { rank: 1, name: "Northline Blue", metric: 286, delta: 24, context: "8 eligible team results", initials: "NB", avatarLabel: "Synthetic squad Northline Blue", isCurrent: true },
      { rank: 2, name: "Forge Cedar", metric: 261, delta: 18, context: "8 eligible team results", initials: "FC", avatarLabel: "Synthetic squad Forge Cedar", isCurrent: false },
      { rank: 3, name: "Mesa Circle", metric: 244, delta: 31, context: "7 eligible team results", initials: "MC", avatarLabel: "Synthetic squad Mesa Circle", isCurrent: false },
      { rank: 4, name: "Harbor Atlas", metric: 226, delta: -6, context: "8 eligible team results", initials: "HA", avatarLabel: "Synthetic squad Harbor Atlas", isCurrent: false },
      { rank: 5, name: "Union Matworks", metric: 210, delta: 12, context: "7 eligible team results", initials: "UM", avatarLabel: "Synthetic squad Union Matworks", isCurrent: false },
    ],
  },
};

export function LeaderboardsView(): ReactNode {
  const [scope, setScope] = useState<LeaderboardScope>("cohort");
  const fixture = leaderboardFixtures[scope];
  return (
    <div className="sa-view">
      <div className="sa-view-intro"><div><h1>Standings with context.</h1><p>Competitive rating, season points, and squad standing remain distinct.</p></div><StatusTag tone="cobalt">Synthetic cohort</StatusTag></div>
      <div className="sa-filter-tabs" role="group" aria-label="Leaderboard scope">{(["cohort", "season", "squad"] as const).map((item) => <button type="button" aria-pressed={scope === item} onClick={() => setScope(item)} key={item}>{item}</button>)}</div>
      <section className="sa-surface"><SectionHeading title={fixture.title} detail={`${fixture.detail} · Illustrative, human-confirmed fixtures only`} /><p className="sa-search-note"><strong>{fixture.metricLabel}</strong> · {fixture.changeLabel}</p><div className="sa-leaderboard">{fixture.rows.map((row) => <div className={row.isCurrent ? "is-you" : ""} key={`${scope}-${row.name}`}><b>{row.rank}</b><Avatar initials={row.initials} tone={row.isCurrent ? "cobalt" : "neutral"} label={row.avatarLabel} /><p><strong>{row.name}</strong><small>{row.context}</small></p><span aria-label={`${fixture.metricLabel}: ${row.metric.toLocaleString()}`}>{row.metric.toLocaleString()}</span><em aria-label={`${fixture.changeLabel}: ${row.delta >= 0 ? "plus " : "minus "}${Math.abs(row.delta)}`} className={row.delta >= 0 ? "is-positive" : "is-negative"}>{row.delta >= 0 ? "+" : ""}{row.delta}</em></div>)}</div></section>
      <div className="sa-honesty-note"><Info /><p><strong>Popularity is not performance</strong><span>Followers, purchases, XP, gym size, and badges cannot change a competitive rating or cohort position.</span></p></div>
    </div>
  );
}
