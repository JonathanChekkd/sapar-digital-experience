"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
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
import { Avatar, SectionHeading, StatusTag, SyntheticLabel, type UiTone } from "./primitives";
import { profileArt, type AvatarArt } from "./profile-art";
import { usePrototypeDispatch, usePrototypeState } from "./state";

type FormatFilter = "all" | "gi" | "no-gi";
type EventFixture = (typeof events)[number];

interface EventArtwork {
  readonly src: string;
  readonly alt: string;
}

interface EventTotals {
  readonly capacity: number;
  readonly registered: number;
  readonly remaining: number;
}

const eventArtwork: Record<EventFixture["id"], EventArtwork> = {
  event_sapar_open_2026: {
    src: "/generated/sapar-world/calibration/arena-regional-championship.webp",
    alt: "Cartoon arena scene with fictional adult grapplers, coaches, and a referee preparing for a regional championship",
  },
  event_sapar_summer_open_2026: {
    src: "/generated/sapar-world/calibration/cartoon-grip-fight.webp",
    alt: "Cartoon scene of two fictional adult athletes safely wrestling in a controlled standing grip fight",
  },
  event_front_range_trials_2026: {
    src: "/generated/sapar-world/calibration/competition-arena.webp",
    alt: "Hybrid illustration of fictional adult competitors listening to a referee inside a competition arena",
  },
};

const filterLabels: Record<FormatFilter, string> = {
  all: "All formats",
  gi: "Gi",
  "no-gi": "No-Gi",
};

const replayDurationSeconds = 300;

function formatReplayTime(position: number): string {
  const boundedPosition = Math.min(100, Math.max(0, position));
  const elapsedSeconds = Math.round((boundedPosition / 100) * replayDurationSeconds);
  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function formatEventMonth(startsAt: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    timeZone: "UTC",
  }).format(new Date(startsAt)).toUpperCase();
}

function formatEventWeekday(startsAt: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    timeZone: "UTC",
  }).format(new Date(startsAt));
}

function formatEventFormat(format: EventFixture["formats"][number]): string {
  return format === "no-gi" ? "No-Gi" : "Gi";
}

function eventSupportsFilter(event: EventFixture, filter: FormatFilter): boolean {
  return filter === "all" || event.formats.some((format) => format === filter);
}

function getEventTotals(event: EventFixture): EventTotals {
  const totals = event.divisions.reduce(
    (current, division) => ({
      capacity: current.capacity + division.capacity,
      registered: current.registered + division.registeredCount,
    }),
    { capacity: 0, registered: 0 },
  );

  return {
    ...totals,
    remaining: Math.max(0, totals.capacity - totals.registered),
  };
}

function getEventStatus(event: EventFixture, registered: boolean): { readonly label: string; readonly tone: UiTone } {
  if (event.status === "completed") {
    return { label: "Result confirmed", tone: "verified" };
  }
  if (registered) {
    return { label: "Preview saved", tone: "earned" };
  }
  if (event.status === "registration-open") {
    return { label: "Registration open", tone: "earned" };
  }
  return { label: "Registration closed", tone: "neutral" };
}

function getEventHref(event: EventFixture, filter: FormatFilter): string {
  if (event.status === "completed") {
    return `/app/arena?event=${encodeURIComponent(event.id)}`;
  }
  const filterQuery = filter === "all" ? "" : `&format=${encodeURIComponent(filter)}`;
  return `/app/compete?event=${encodeURIComponent(event.id)}${filterQuery}`;
}

function EventHero({ event }: { readonly event: EventFixture }): ReactNode {
  const state = usePrototypeState();
  const dispatch = usePrototypeDispatch();
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = Boolean(prefersReducedMotion || state.preferences.lowStimulation);
  const registered = state.registeredEventIds.includes(event.id);
  const completed = event.status === "completed";
  const registrationOpen = event.status === "registration-open";
  const totals = getEventTotals(event);
  const status = getEventStatus(event, registered);
  const artwork = eventArtwork[event.id];
  const eventTitleId = `matchday-title-${event.id}`;

  return (
    <section className="sa-matchday-marquee" aria-labelledby={eventTitleId}>
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          className="sa-matchday-marquee-panel"
          key={event.id}
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="sa-matchday-art">
            <img src={artwork.src} alt={artwork.alt} width="1672" height="941" loading="eager" decoding="async" />
            <div className="sa-matchday-art-topline">
              <SyntheticLabel compact />
              <span><Trophy aria-hidden="true" /> Matchday circuit</span>
            </div>
            <p>Choose the card. Read the rules. Own the result trail.</p>
          </div>

          <div className="sa-matchday-docket">
            <div className="sa-matchday-status-row">
              <StatusTag tone={status.tone}>{status.label}</StatusTag>
              <span>{event.formats.map(formatEventFormat).join(" + ")}</span>
            </div>

            <div className="sa-matchday-identity">
              <time dateTime={event.startsAt}>
                <span>{formatEventMonth(event.startsAt)}</span>
                <strong>{new Date(event.startsAt).getUTCDate()}</strong>
                <small>{formatEventWeekday(event.startsAt)}</small>
              </time>
              <div>
                <p>{event.organizer}</p>
                <h1 id={eventTitleId}>{event.name}</h1>
                <span><MapPin aria-hidden="true" /> {event.venue.name} · {event.venue.city}, {event.venue.region}</span>
              </div>
            </div>

            <dl className="sa-matchday-stat-rail">
              <div><dt>Roster</dt><dd>{totals.registered}/{totals.capacity}</dd></div>
              <div><dt>{completed ? "Card" : "Open"}</dt><dd>{completed ? "Final" : totals.remaining}</dd></div>
              <div><dt>Divisions</dt><dd>{event.divisions.length}</dd></div>
              <div><dt>Formats</dt><dd>{event.formats.length}</dd></div>
            </dl>

            <div className="sa-matchday-registration">
              <div>
                <span>{completed ? "Archived event record" : "Illustrative entry"}</span>
                <strong>{completed ? "Human-confirmed result available" : `$${(event.registration.priceCents / 100).toFixed(0)} ${event.registration.currency}`}</strong>
                <small>{completed ? event.authority.label : event.registration.eligibility}</small>
              </div>
              {completed ? (
                <Link className="sa-matchday-action is-confirmed" href={`/app/arena?event=${encodeURIComponent(event.id)}`}>
                  <ShieldCheck aria-hidden="true" /> View confirmed result
                </Link>
              ) : (
                <button
                  type="button"
                  className={`sa-matchday-action ${registered ? "is-preview-saved" : ""}`}
                  disabled={registered || !registrationOpen}
                  onClick={() => dispatch({ type: "register-event", id: event.id })}
                >
                  {registered ? <Check aria-hidden="true" /> : <Trophy aria-hidden="true" />}
                  {registered ? "Preview saved" : registrationOpen ? "Save entry preview" : "Registration closed"}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function CompetitionPassport(): ReactNode {
  const giLane = ratingLanes.find((lane) => lane.lane === "gi");
  const noGiLane = ratingLanes.find((lane) => lane.lane === "no-gi");
  const lanes = [giLane, noGiLane].filter((lane): lane is NonNullable<typeof lane> => Boolean(lane));

  return (
    <section className="sa-competition-passport" aria-labelledby="competition-passport-title">
      <div className="sa-competition-passport-person">
        <span>Fighter passport · synthetic profile</span>
        <Avatar initials="MT" tone="cobalt" label="Synthetic athlete Maya Torres" art={profileArt.mayaTorres} />
        <div>
          <h2 id="competition-passport-title">Maya Torres</h2>
          <p>Northline · Purple belt · Adult</p>
          <strong><Sparkles aria-hidden="true" /> Vanguard III</strong>
        </div>
      </div>
      <div className="sa-competition-passport-lanes">
        {lanes.map((lane) => (
          <article className={lane.lane === "no-gi" ? "is-no-gi" : "is-gi"} key={lane.id}>
            <span>{lane.label}</span>
            <strong>{lane.value.toLocaleString("en-US")}</strong>
            <p><em>+{lane.delta}</em> · {lane.ratedBoutCount} rated results</p>
            <small>{lane.status === "provisional" ? "Provisional lane" : "Established lane"}</small>
          </article>
        ))}
      </div>
      <div className="sa-competition-passport-footer">
        <p>Profile reference only—rating and tier do not confirm event eligibility.</p>
        <Link href="/app/leaderboards">Open standings <ArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}

function DivisionBoard({ event }: { readonly event: EventFixture }): ReactNode {
  const completed = event.status === "completed";

  return (
    <section className="sa-division-board" id="division-board" aria-labelledby="division-board-title">
      <header>
        <div>
          <span>Selected event</span>
          <h2 id="division-board-title">Division board</h2>
          <p>Capacity, experience band, and format stay separate for every card.</p>
        </div>
        <StatusTag tone="cobalt">{event.divisions.length} {event.divisions.length === 1 ? "division" : "divisions"}</StatusTag>
      </header>
        <div className="sa-division-tickets" role="region" aria-label={`Scrollable division cards for ${event.name}`} tabIndex={0}>
        {event.divisions.map((division) => {
          const remaining = Math.max(0, division.capacity - division.registeredCount);
          return (
            <article key={division.id} className={division.format === "no-gi" ? "is-no-gi" : "is-gi"}>
              <div className="sa-division-ticket-topline">
                <span>{formatEventFormat(division.format)}</span>
                <strong>{completed ? "Final card" : `${remaining} ${remaining === 1 ? "spot" : "spots"} open`}</strong>
              </div>
              <h3>{division.weightLabel}</h3>
              <p>{division.ageClass === "adult" ? "Adult" : division.ageClass} · {division.beltRange}</p>
              <div className="sa-division-meter">
                <progress max={division.capacity} value={division.registeredCount} aria-label={`${division.registeredCount} of ${division.capacity} synthetic roster places filled`} />
                <span><strong>{division.registeredCount}</strong> / {division.capacity} rostered</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function EventCard({ event, filter, selected }: { readonly event: EventFixture; readonly filter: FormatFilter; readonly selected: boolean }): ReactNode {
  const totals = getEventTotals(event);
  const completed = event.status === "completed";
  const artwork = eventArtwork[event.id];

  return (
    <article className="sa-event-cartridge" data-event={event.id} data-selected={selected || undefined}>
      <div className="sa-event-cartridge-art">
        <img src={artwork.src} alt={artwork.alt} width="1672" height="941" loading="lazy" decoding="async" />
        <time dateTime={event.startsAt}><span>{formatEventMonth(event.startsAt)}</span><strong>{new Date(event.startsAt).getUTCDate()}</strong></time>
        <StatusTag tone={completed ? "verified" : "earned"}>{completed ? "Completed" : "Registration open"}</StatusTag>
      </div>
      <div className="sa-event-cartridge-body">
        <span>{event.formats.map(formatEventFormat).join(" + ")}</span>
        <h3>{event.name}</h3>
        <p><MapPin aria-hidden="true" /> {event.venue.name} · {event.venue.city}</p>
        <dl>
          <div><dt>Roster</dt><dd>{totals.registered}/{totals.capacity}</dd></div>
          <div><dt>{completed ? "Record" : "Open"}</dt><dd>{completed ? "Final" : totals.remaining}</dd></div>
          <div><dt>Authority</dt><dd>{event.authority.label}</dd></div>
        </dl>
        <Link href={getEventHref(event, filter)} aria-label={`${completed ? "View confirmed result for" : "Review event details for"} ${event.name}`}>
          {completed ? "View confirmed result" : selected ? "Featured above" : "Review event"}
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

function EventCircuit({
  eventsToShow,
  filter,
  selectedEventId,
  onFilterChange,
}: {
  readonly eventsToShow: readonly EventFixture[];
  readonly filter: FormatFilter;
  readonly selectedEventId: EventFixture["id"];
  readonly onFilterChange: (nextFilter: FormatFilter) => void;
}): ReactNode {
  const upcomingEvents = eventsToShow.filter((event) => event.status !== "completed");
  const completedEvents = eventsToShow.filter((event) => event.status === "completed");

  return (
    <section className="sa-event-circuit" aria-labelledby="event-circuit-title">
      <header>
        <div>
          <span>Matchday circuit</span>
          <h2 id="event-circuit-title">Choose your next card.</h2>
          <p>Chronological synthetic fixtures with explicit destinations and authority.</p>
        </div>
        <Link href="/app/leaderboards"><Medal aria-hidden="true" /> Standings</Link>
      </header>
      <div className="sa-event-filter" role="group" aria-label="Filter competition events by format">
        {(Object.keys(filterLabels) as FormatFilter[]).map((item) => (
          <button type="button" key={item} aria-pressed={filter === item} onClick={() => onFilterChange(item)}>{filterLabels[item]}</button>
        ))}
      </div>
      <p className="sr-only" role="status" aria-live="polite">{eventsToShow.length} synthetic {eventsToShow.length === 1 ? "event" : "events"} shown.</p>
      {upcomingEvents.length > 0 ? (
        <div className="sa-event-circuit-group">
          <h3><span>Next up</span><small>{upcomingEvents.length} open</small></h3>
          <div className="sa-event-circuit-grid">
            {upcomingEvents.map((event) => <EventCard event={event} filter={filter} selected={event.id === selectedEventId} key={event.id} />)}
          </div>
        </div>
      ) : null}
      {completedEvents.length > 0 ? (
        <div className="sa-event-circuit-group is-archive">
          <h3><span>Result archive</span><small>{completedEvents.length} confirmed</small></h3>
          <div className="sa-event-circuit-grid">
            {completedEvents.map((event) => <EventCard event={event} filter={filter} selected={event.id === selectedEventId} key={event.id} />)}
          </div>
        </div>
      ) : null}
      {eventsToShow.length === 0 ? <div className="sa-event-circuit-empty" role="status"><Flag aria-hidden="true" /><h3>No cards in this lane.</h3><p>Choose another format to return to the current synthetic fixture catalog.</p></div> : null}
    </section>
  );
}

function AuthorityDock({ event }: { readonly event: EventFixture }): ReactNode {
  const completed = event.status === "completed";
  return (
    <section className="sa-authority-dock" aria-labelledby="authority-dock-title">
      <div className="sa-authority-dock-art">
        <img src="/generated/sapar-world/calibration/hybrid-matchday-warmup.webp" alt="Hybrid illustration of fictional adult teammates preparing together before competition" width="1003" height="1568" loading="lazy" decoding="async" />
        <span><Users aria-hidden="true" /> Human decisions</span>
      </div>
      <div className="sa-authority-dock-copy">
        <StatusTag tone={completed ? "verified" : "cobalt"}>{completed ? "Result authority confirmed" : "Authority declared"}</StatusTag>
        <h2 id="authority-dock-title">People own the call.</h2>
        <p>{event.authority.label} is the named authority for this synthetic fixture. Assistive analysis can explain a record, but it cannot silently become scoring or federation approval.</p>
        <div>
          <span><ShieldCheck aria-hidden="true" /><strong>Named authority</strong><small>{event.authority.label}</small></span>
          <span><BarChart3 aria-hidden="true" /><strong>Model boundary</strong><small>Experimental assistance only</small></span>
        </div>
        <Link href={completed ? `/app/arena?event=${encodeURIComponent(event.id)}` : "/app/replay"}>{completed ? "Open result proof" : "See the proof model"} <ArrowRight aria-hidden="true" /></Link>
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedEventId = searchParams.get("event");
  const requestedEvent = requestedEventId ? events.find((event) => event.id === requestedEventId) : undefined;
  const requestedFilter = searchParams.get("format");
  const parsedFilter: FormatFilter = requestedFilter === "gi" || requestedFilter === "no-gi" ? requestedFilter : "all";
  const filter = requestedEvent && !eventSupportsFilter(requestedEvent, parsedFilter) ? "all" : parsedFilter;
  const visibleEvents = [...events]
    .filter((event) => eventSupportsFilter(event, filter))
    .sort((left, right) => new Date(left.startsAt).getTime() - new Date(right.startsAt).getTime());
  const selectedEvent = requestedEvent ?? visibleEvents.find((event) => event.status === "registration-open") ?? visibleEvents[0];

  const updateFilter = (nextFilter: FormatFilter): void => {
    const nextParams = new URLSearchParams(searchParams.toString());
    if (nextFilter === "all") {
      nextParams.delete("format");
    } else {
      nextParams.set("format", nextFilter);
    }
    if (requestedEvent && !eventSupportsFilter(requestedEvent, nextFilter)) {
      nextParams.delete("event");
    }
    const nextQuery = nextParams.toString();
    router.replace(nextQuery ? `/app/compete?${nextQuery}` : "/app/compete", { scroll: false });
  };

  if (requestedEventId && !requestedEvent) {
    return (
      <div className="sa-view">
        <div className="sa-view-intro"><div><h1>That event is not in this demo.</h1><p>The shared link points to an unknown synthetic fixture. No unrelated competition was substituted.</p></div><StatusTag tone="neutral">Not found</StatusTag></div>
        <section className="sa-surface"><SectionHeading title="Return to the competition calendar" detail="Choose from the current fixture catalog." /><Link className="sa-button sa-button-primary" href="/app/compete">Open available events <ArrowRight /></Link></section>
      </div>
    );
  }
  if (!selectedEvent) {
    return <div className="sa-view"><section className="sa-surface"><h1>Competition fixtures unavailable.</h1><p>The local synthetic event catalog is empty.</p></section></div>;
  }
  return (
    <div className="sa-view sa-compete-view">
      <EventHero event={selectedEvent} />
      <div className="sa-compete-intelligence-grid">
        <CompetitionPassport />
        <DivisionBoard event={selectedEvent} />
      </div>
      <EventCircuit eventsToShow={visibleEvents} filter={filter} selectedEventId={selectedEvent.id} onFilterChange={updateFilter} />
      <AuthorityDock event={selectedEvent} />
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
        <div><Avatar initials="MT" tone="cobalt" label="Synthetic athlete Maya Torres" art={profileArt.mayaTorres} /><p><strong>Maya Torres</strong><small>Northline · Purple</small></p><b>7</b></div>
        <span><small>Final</small><strong>05:00</strong><em>No-Gi · Lightweight</em></span>
        <div><b>4</b><p><strong>Lena Park</strong><small>Forge · Purple</small></p><Avatar initials="LP" tone="social" label="Synthetic athlete Lena Park" art={profileArt.lenaPark} /></div>
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
      <section className="sa-result-stage">
        <img className="sa-result-replay-art" src="/generated/sapar-world/calibration/hybrid-training-replay.webp" alt="Fictional hybrid illustration of two adult grapplers demonstrating a guard exchange on a blue mat" width="1672" height="941" loading="eager" decoding="async" />
        <motion.div className="sa-result-field" initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }} aria-hidden="true" />
        <div className="sa-result-stage-copy"><SyntheticLabel compact /><span>Illustrative result reconstruction</span><h1>Result reconstruction.</h1><p>Human-confirmed outcome · fictional scene · no uploaded bout video is being analyzed</p></div>
        <div className="sa-result-versus"><div><Avatar initials="MT" tone="cobalt" label="Maya Torres" art={profileArt.mayaTorres} /><strong>Maya<br />Torres</strong><small>Northline</small></div><span><StatusTag tone="verified">Verified</StatusTag><strong>{result.versions[0].score.display}</strong><small>Points · Final</small></span><div><Avatar initials="LP" tone="social" label="Lena Park" art={profileArt.lenaPark} /><strong>Lena<br />Park</strong><small>Forge</small></div></div>
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
  readonly art?: AvatarArt;
  readonly tone?: UiTone;
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
      { rank: 1, name: "Nia Brooks", metric: 1672, delta: 14, context: "18 eligible No-Gi results", initials: "NB", avatarLabel: "Synthetic athlete Nia Brooks", isCurrent: false, art: profileArt.niaBrooks },
      { rank: 2, name: "Sofia Reyes", metric: 1611, delta: 8, context: "21 eligible No-Gi results", initials: "SR", avatarLabel: "Synthetic athlete Sofia Reyes", isCurrent: false, art: profileArt.sofiaReyes },
      { rank: 3, name: "Maya Torres", metric: 1548, delta: 22, context: "12 eligible No-Gi results · Vanguard III", initials: "MT", avatarLabel: "Synthetic athlete Maya Torres", isCurrent: true, art: profileArt.mayaTorres },
      { rank: 4, name: "Lena Park", metric: 1516, delta: -11, context: "16 eligible No-Gi results", initials: "LP", avatarLabel: "Synthetic athlete Lena Park", isCurrent: false, art: profileArt.lenaPark },
      { rank: 5, name: "Keira Allen", metric: 1489, delta: 5, context: "14 eligible No-Gi results", initials: "KA", avatarLabel: "Synthetic athlete Keira Allen", isCurrent: false, art: profileArt.keiraAllen },
    ],
  },
  season: {
    title: "Open Mat League · Season 1",
    detail: "Season points are separate from Gi and No-Gi ratings and Vanguard tier",
    metricLabel: "Season points",
    changeLabel: "Points from latest scored event",
    rows: [
      { rank: 1, name: "Rafael Kim", metric: 940, delta: 90, context: "5 scored events", initials: "RK", avatarLabel: "Synthetic athlete Rafael Kim", isCurrent: false, art: profileArt.rafaelKim },
      { rank: 2, name: "Nia Brooks", metric: 885, delta: 55, context: "5 scored events", initials: "NB", avatarLabel: "Synthetic athlete Nia Brooks", isCurrent: false, art: profileArt.niaBrooks },
      { rank: 3, name: "Lena Park", metric: 842, delta: 72, context: "4 scored events", initials: "LP", avatarLabel: "Synthetic athlete Lena Park", isCurrent: false, art: profileArt.lenaPark },
      { rank: 4, name: "Maya Torres", metric: 810, delta: 110, context: "4 scored events · Vanguard III unchanged", initials: "MT", avatarLabel: "Synthetic athlete Maya Torres", isCurrent: true, art: profileArt.mayaTorres },
      { rank: 5, name: "Jonah Price", metric: 768, delta: 48, context: "5 scored events", initials: "JP", avatarLabel: "Synthetic athlete Jonah Price", isCurrent: false, art: profileArt.jonahPrice },
    ],
  },
  squad: {
    title: "Synthetic squad standing",
    detail: "Squad points never change an athlete's Gi rating, No-Gi rating, or Vanguard tier",
    metricLabel: "Squad points",
    changeLabel: "Points from latest team round",
    rows: [
      { rank: 1, name: "Northline Blue", metric: 286, delta: 24, context: "8 eligible team results", initials: "NB", avatarLabel: "Synthetic squad Northline Blue", isCurrent: true, tone: "cobalt" },
      { rank: 2, name: "Forge Cedar", metric: 261, delta: 18, context: "8 eligible team results", initials: "FC", avatarLabel: "Synthetic squad Forge Cedar", isCurrent: false, tone: "verified" },
      { rank: 3, name: "Mesa Circle", metric: 244, delta: 31, context: "7 eligible team results", initials: "MC", avatarLabel: "Synthetic squad Mesa Circle", isCurrent: false, tone: "earned" },
      { rank: 4, name: "Harbor Atlas", metric: 226, delta: -6, context: "8 eligible team results", initials: "HA", avatarLabel: "Synthetic squad Harbor Atlas", isCurrent: false, tone: "social" },
      { rank: 5, name: "Union Matworks", metric: 210, delta: 12, context: "7 eligible team results", initials: "UM", avatarLabel: "Synthetic squad Union Matworks", isCurrent: false, tone: "neutral" },
    ],
  },
};

export function LeaderboardsView(): ReactNode {
  const [scope, setScope] = useState<LeaderboardScope>("cohort");
  const fixture = leaderboardFixtures[scope];
  return (
    <div className="sa-view">
      <div className="sa-view-intro"><div><h1>Standings with context.</h1><p>Competitive rating, season points, and squad standing remain distinct.</p></div><StatusTag tone="cobalt">Synthetic cohort</StatusTag></div>
      <div className={`sa-filter-tabs sa-leaderboard-tabs is-${scope}`} data-scope={scope} role="group" aria-label="Leaderboard scope">{(["cohort", "season", "squad"] as const).map((item) => <button type="button" data-scope={item} aria-pressed={scope === item} onClick={() => setScope(item)} key={item}>{item}</button>)}</div>
      <section className={`sa-surface sa-leaderboard-surface is-${scope}`}><SectionHeading title={fixture.title} detail={`${fixture.detail} · Illustrative, human-confirmed fixtures only`} /><p className="sa-search-note sa-leaderboard-metric"><strong>{fixture.metricLabel}</strong> · {fixture.changeLabel}</p><div className={`sa-leaderboard is-${scope}`}>{fixture.rows.map((row) => <div className={row.isCurrent ? "is-you" : ""} data-rank={row.rank} key={`${scope}-${row.name}`}><b>{row.rank}</b><Avatar initials={row.initials} tone={row.tone ?? (row.isCurrent ? "cobalt" : "social")} label={row.avatarLabel} art={row.art} /><p><strong>{row.name}{row.isCurrent ? <span>{scope === "squad" ? "Your squad" : "You"}</span> : null}</strong><small>{row.context}</small></p><span aria-label={`${fixture.metricLabel}: ${row.metric.toLocaleString()}`}>{row.metric.toLocaleString()}</span><em aria-label={`${fixture.changeLabel}: ${row.delta >= 0 ? "plus " : "minus "}${Math.abs(row.delta)}`} className={row.delta >= 0 ? "is-positive" : "is-negative"}>{row.delta >= 0 ? "+" : ""}{row.delta}</em></div>)}</div></section>
      <div className="sa-honesty-note"><Info /><p><strong>Popularity is not performance</strong><span>Followers, purchases, XP, gym size, and badges cannot change a competitive rating or cohort position.</span></p></div>
    </div>
  );
}
