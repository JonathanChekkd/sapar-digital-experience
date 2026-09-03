"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  CalendarDays,
  Check,
  Copy,
  Flag,
  LockKeyhole,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  UserRoundX,
  X,
} from "lucide-react";
import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  athlete,
  events,
  gyms,
  posts,
  proofThreads,
  type GymFixture,
  type GymSessionFixture,
} from "@/lib/sapar-prototype";
import { communityArt, profileArtByFixtureId, type AvatarArt } from "./profile-art";
import {
  usePrototypeDispatch,
  usePrototypeState,
  type PrototypeDraftKind,
  type PrototypeReportReason,
} from "./state";

export type UiTone = "cobalt" | "verified" | "earned" | "social" | "neutral" | "critical";

export type FighterMetaTone = "location" | "gym" | "belt" | "division";

export interface FighterMetaItem {
  readonly label: string;
  readonly tone: FighterMetaTone;
}

export function SyntheticLabel({ compact = false }: { readonly compact?: boolean }): ReactNode {
  return (
    <span className={`sa-synthetic ${compact ? "is-compact" : ""}`}>
      <span aria-hidden="true" />
      {compact ? "Synthetic" : "Synthetic prototype data"}
    </span>
  );
}

export function StatusTag({ children, tone = "neutral" }: { readonly children: ReactNode; readonly tone?: UiTone }): ReactNode {
  return <span className={`sa-status sa-status-${tone}`}>{children}</span>;
}

export function FighterMetaChips({ items, label = "Fighter details", compact = false }: { readonly items: readonly FighterMetaItem[]; readonly label?: string; readonly compact?: boolean }): ReactNode {
  return (
    <ul className={`sa-fighter-meta ${compact ? "is-compact" : ""}`} aria-label={label}>
      {items.map((item) => <li data-tone={item.tone} key={`${item.tone}-${item.label}`}>{item.label}</li>)}
    </ul>
  );
}

export function Avatar({ initials, tone = "cobalt", label, art }: { readonly initials: string; readonly tone?: UiTone; readonly label: string; readonly art?: AvatarArt }): ReactNode {
  const atlasStyle: CSSProperties | undefined = art?.atlasPosition
    ? {
        backgroundImage: `url("${art.src}")`,
        backgroundPosition: art.atlasPosition,
      }
    : undefined;
  return (
    <span className={`sa-avatar sa-avatar-${tone} ${art ? `has-art is-${art.kind}` : "has-mark"}`} role="img" aria-label={label}>
      {art?.atlasPosition ? <span className="sa-avatar-atlas-cell" aria-hidden="true" style={atlasStyle} /> : null}
      {art && !art.atlasPosition ? <img src={art.src} alt="" width="96" height="96" loading="lazy" decoding="async" style={{ objectPosition: art.objectPosition }} /> : null}
      {!art ? initials : null}
    </span>
  );
}

export function SectionHeading({ title, detail, action }: { readonly title: string; readonly detail?: string; readonly action?: ReactNode }): ReactNode {
  return (
    <header className="sa-section-heading">
      <div>
        <h2>{title}</h2>
        {detail ? <p>{detail}</p> : null}
      </div>
      {action}
    </header>
  );
}

export function SwitchRow({
  label,
  description,
  checked,
  onChange,
}: {
  readonly label: string;
  readonly description: string;
  readonly checked: boolean;
  readonly onChange: (checked: boolean) => void;
}): ReactNode {
  const descriptionId = useId();
  return (
    <label className="sa-switch-row">
      <span>
        <strong>{label}</strong>
        <small id={descriptionId}>{description}</small>
      </span>
      <input
        type="checkbox"
        checked={checked}
        aria-describedby={descriptionId}
        onChange={(event) => onChange(event.currentTarget.checked)}
      />
      <i aria-hidden="true" />
    </label>
  );
}

function CreateSheet(): ReactNode {
  const state = usePrototypeState();
  const dispatch = usePrototypeDispatch();
  const actions = [
    {
      kind: "mat-note",
      title: "Share a mat note",
      detail: "A post for your chosen audience.",
      review: "Review audience, training context, and consent before publishing is ever possible.",
      icon: Sparkles,
    },
    {
      kind: "session",
      title: "Host a session",
      detail: "Draft capacity, level, time, and consent.",
      review: "Review capacity, level, schedule, accessibility, and consent as one session draft.",
      icon: CalendarDays,
    },
    {
      kind: "challenge",
      title: "Start a challenge",
      detail: "Deterministic team progress with clear rules.",
      review: "Review the goal, rules, audience, and proof requirements before sharing a challenge.",
      icon: Flag,
    },
  ] as const;
  const [selectedKind, setSelectedKind] = useState<PrototypeDraftKind | null>(null);
  const selectedAction = actions.find(({ kind }) => kind === selectedKind);
  const savedActions = actions.filter(({ kind }) => state.sessionDraftKinds.includes(kind));

  if (selectedAction) {
    const alreadySaved = state.sessionDraftKinds.includes(selectedAction.kind);
    const Icon = selectedAction.icon;
    return (
      <div className="sa-sheet-body">
        <div className="sa-honesty-note">
          <Icon aria-hidden="true" />
          <p>
            <strong>{selectedAction.title} preview</strong>
            <span>{selectedAction.review}</span>
          </p>
        </div>
        <p className="sa-sheet-intro">This stores only a type-specific scaffold for the current open prototype session. Nothing is published or sent.</p>
        <button
          className="sa-button sa-button-primary"
          type="button"
          autoFocus
          onClick={() => dispatch({ type: "save-session-draft", kind: selectedAction.kind })}
        >
          <Check aria-hidden="true" />
          {alreadySaved ? "Keep this open-session draft" : "Save for this open session"}
        </button>
        <button className="sa-button sa-button-secondary" type="button" onClick={() => setSelectedKind(null)}>
          Choose another draft type
        </button>
      </div>
    );
  }

  return (
    <div className="sa-sheet-body">
      <p className="sa-sheet-intro">Choose a draft scaffold to review. Saved previews last only for this open prototype session; nothing is published or sent.</p>
      {savedActions.length > 0 ? (
        <div className="sa-summary-stack" role="status">
          <p><span>Open-session drafts</span><strong>{savedActions.map(({ title }) => title).join(", ")}</strong></p>
        </div>
      ) : null}
      <div className="sa-create-options">
        {actions.map(({ kind, title, detail, icon: Icon }) => {
          const saved = state.sessionDraftKinds.includes(kind);
          return (
            <button
              type="button"
              key={title}
              onClick={() => setSelectedKind(kind)}
            >
              <span><Icon aria-hidden="true" /></span>
              <strong>{title}</strong>
              <small>{saved ? "Saved for this open session · select to review." : detail}</small>
              <ArrowRight aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface SearchableAthlete {
  readonly id: string;
  readonly name: string;
  readonly handle: string;
  readonly initials: string;
  readonly detail: string;
  readonly href: "/app/profile" | "/app/network";
  readonly art?: AvatarArt;
}

const postAthletes = new Map(
  posts.map((post) => [
    post.author.id,
    {
      id: post.author.id,
      name: post.author.displayName,
      handle: post.author.handle,
      initials: post.author.initials,
      detail: `Athlete · ${post.author.verification}`,
      href: "/app/network" as const,
      art: profileArtByFixtureId[post.author.id],
    },
  ]),
);
postAthletes.delete(athlete.id);

const searchableAthletes: readonly SearchableAthlete[] = [
  {
    id: athlete.id,
    name: athlete.displayName,
    handle: athlete.handle,
    initials: athlete.initials,
    detail: `Athlete · ${athlete.belt.rank} belt · ${athlete.location.city}`,
    href: "/app/profile",
    art: profileArtByFixtureId[athlete.id],
  },
  ...postAthletes.values(),
];

function matchesSearch(values: readonly string[], query: string): boolean {
  return query.length === 0 || values.some((value) => value.toLocaleLowerCase().includes(query));
}

function SearchSheet(): ReactNode {
  const [query, setQuery] = useState("");
  const dispatch = usePrototypeDispatch();
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredAthletes = searchableAthletes.filter((item) =>
    matchesSearch([item.name, item.handle, item.detail], normalizedQuery),
  );
  const filteredGyms = gyms.filter((gym) =>
    matchesSearch([gym.name, gym.location.city, gym.location.region, gym.verification], normalizedQuery),
  );
  const filteredEvents = events.filter((event) =>
    matchesSearch([
      event.name,
      event.organizer,
      event.venue.name,
      event.venue.city,
      event.status,
      ...event.formats,
    ], normalizedQuery),
  );
  const resultCount = filteredAthletes.length + filteredGyms.length + filteredEvents.length;

  return (
    <div className="sa-sheet-body">
      <label className="sa-search-field">
        <Search aria-hidden="true" />
        <span className="sr-only">Search synthetic athletes, gyms, and events</span>
        <input
          autoFocus
          data-sheet-autofocus
          type="search"
          placeholder="Athletes, gyms, or events"
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
        />
      </label>
      <p className="sa-search-note">This prototype searches deterministic local fixtures. No query leaves the browser.</p>
      {resultCount > 0 ? (
        <div className="sa-search-groups" aria-label={`${resultCount} synthetic fixture results`}>
          {filteredAthletes.map((item) => (
            <Link href={item.href} key={item.id} onClick={() => dispatch({ type: "close-sheet" })}>
              <Avatar initials={item.initials} label={`Synthetic athlete ${item.name}`} art={item.art} />
              <span><strong>{item.name}</strong><small>{item.detail}</small></span>
              <ArrowRight aria-hidden="true" />
            </Link>
          ))}
          {filteredGyms.map((gym) => (
            <Link href={`/app/gyms?gym=${encodeURIComponent(gym.id)}`} key={gym.id} onClick={() => dispatch({ type: "close-sheet" })}>
              <Avatar initials={gym.name.split(" ").map((word) => word[0]).join("").slice(0, 2)} tone={gym.verification === "gym-confirmed" ? "verified" : "cobalt"} label={`Synthetic gym ${gym.name}`} art={gym.id === "gym_northline_jiu_jitsu" ? communityArt.northline : communityArt.eastbank} />
              <span><strong>{gym.name}</strong><small>Gym · {gym.location.city} · {gym.location.distanceMiles} miles</small></span>
              <ArrowRight aria-hidden="true" />
            </Link>
          ))}
          {filteredEvents.map((event) => (
            <Link href={`/app/compete?event=${encodeURIComponent(event.id)}`} key={event.id} onClick={() => dispatch({ type: "close-sheet" })}>
              <Avatar initials={event.name.split(" ").map((word) => word[0]).join("").slice(0, 2)} tone="earned" label={`Synthetic event ${event.name}`} art={communityArt.saparOpen} />
              <span><strong>{event.name}</strong><small>Event · {event.venue.city} · {event.status}</small></span>
              <ArrowRight aria-hidden="true" />
            </Link>
          ))}
        </div>
      ) : (
        <div className="sa-search-empty" role="status">
          <Search aria-hidden="true" />
          <strong>No synthetic fixture matches “{query.trim()}”</strong>
          <p>Try an athlete name, gym, city, event, or format.</p>
        </div>
      )}
    </div>
  );
}

function ProofSheet(): ReactNode {
  const { selectedProofId } = usePrototypeState();
  const thread = proofThreads.find((item) => item.resultId === selectedProofId) ?? proofThreads[0];
  return (
    <div className="sa-sheet-body">
      <p className="sa-sheet-intro">{thread.summary}</p>
      <ol className="sa-proof-list">
        {thread.steps.map((step) => (
          <li key={step.id}>
            <span><Check aria-hidden="true" /></span>
            <div><strong>{step.label}</strong><p>{step.detail}</p><small>{step.sourceLabel}</small></div>
          </li>
        ))}
      </ol>
      <div className="sa-honesty-note"><ShieldCheck aria-hidden="true" /><p><strong>Prototype presentation</strong><span>This evidence chain is synthetic and demonstrates a proposed workflow, not federation approval.</span></p></div>
    </div>
  );
}

function RegistrationSheet(): ReactNode {
  const state = usePrototypeState();
  const dispatch = usePrototypeDispatch();
  const event = events[0];
  const registered = state.registeredEventIds.includes(event.id);
  return (
    <div className="sa-sheet-body">
      <div className="sa-summary-stack">
        <p><span>Event</span><strong>{event.name}</strong></p>
        <p><span>Authority</span><strong>{event.authority.label}</strong></p>
        <p><span>Eligibility</span><strong>{event.registration.eligibility}</strong></p>
        <p><span>Illustrative fee</span><strong>${(event.registration.priceCents / 100).toFixed(2)} {event.registration.currency}</strong></p>
      </div>
      <p className="sa-search-note">No waiver, eligibility verification, registration, or payment will be submitted.</p>
      <button className="sa-button sa-button-primary" type="button" disabled={registered} onClick={() => dispatch({ type: "register-event", id: event.id })}>
        {registered ? <Check aria-hidden="true" /> : <CalendarDays aria-hidden="true" />}
        {registered ? "Preview already saved" : "Save registration preview"}
      </button>
    </div>
  );
}

function BookingSheet(): ReactNode {
  const state = usePrototypeState();
  const dispatch = usePrototypeDispatch();
  const sessionTitleId = useId();
  const disclosureId = useId();
  const bookingOptions: readonly { readonly gym: GymFixture; readonly session: GymSessionFixture }[] = gyms
    .flatMap((gym) => gym.schedule.map((session) => ({ gym, session })));
  const selectedBooking = bookingOptions.find(({ session }) => session.id === state.selectedGymSessionId);
  if (!selectedBooking) {
    return (
      <div className="sa-sheet-body sa-booking-preview">
        <div className="sa-booking-unavailable" role="status">
          <CalendarDays aria-hidden="true" />
          <h3>Session unavailable</h3>
          <p>Close this preview and choose a current session from the gym schedule.</p>
        </div>
      </div>
    );
  }
  const { gym, session } = selectedBooking;
  const booked = state.bookedSessionIds.includes(session.id);
  const formatLabel = session.format === "no-gi" ? "No-Gi" : session.format === "gi" ? "Gi" : "Mixed";
  const levelLabel = session.level === "all-levels" ? "All levels" : session.level === "beginner" ? "Beginner" : "Advanced";
  const availabilityLabel = session.bookingState === "available"
    ? `${session.spotsRemaining} spots open`
    : session.bookingState === "waitlist"
      ? "Waitlist"
      : "Session full";
  const availabilityDetail = session.bookingState === "available"
    ? "synthetic spots open"
    : session.bookingState === "waitlist"
      ? "waitlist only"
      : "no spots open";
  const actionLabel = booked
    ? "Preview already saved"
    : session.bookingState === "waitlist"
      ? "Save waitlist preview"
      : session.bookingState === "full"
        ? "Session full"
        : "Save booking preview";
  const actionHint = booked
    ? "Stored in this open prototype session"
    : session.bookingState === "full"
      ? "Choose another session from the schedule"
      : "Saves only to this open prototype";
  const bookingVisual = session.format === "no-gi"
    ? {
        src: "/generated/sapar-world/calibration/hybrid-training-replay.webp",
        alt: "Hybrid stylized view of fictional adult No-Gi athletes training on a blue mat",
        width: 1672,
        height: 941,
      }
    : {
        src: "/generated/sapar-world/calibration/community-open-mat.webp",
        alt: "Hybrid stylized view of fictional adult Brazilian Jiu-Jitsu teammates at a community open mat",
        width: 1448,
        height: 1086,
      };
  return (
    <div className="sa-sheet-body sa-booking-preview">
      <div className="sa-booking-scroll">
        <section className="sa-booking-pass" aria-labelledby={sessionTitleId}>
          <div className="sa-booking-visual">
            <img
              src={bookingVisual.src}
              alt={bookingVisual.alt}
              width={bookingVisual.width}
              height={bookingVisual.height}
              loading="eager"
              decoding="async"
            />
            <div className="sa-booking-flags">
              <StatusTag tone={session.bookingState === "available" ? "verified" : session.bookingState === "waitlist" ? "earned" : "neutral"}>{availabilityLabel}</StatusTag>
              <span>{formatLabel} · {levelLabel}</span>
            </div>
            <div className="sa-booking-session-copy">
              <span><MapPin aria-hidden="true" /> {gym.name}</span>
              <h3 id={sessionTitleId}>{session.title}</h3>
              <p>{gym.location.city}, {gym.location.region} · {gym.location.distanceMiles} mi</p>
              <p className="sa-booking-session-meta">{session.dayOfWeek} · {session.startsAtLocal} · {session.durationMinutes} min</p>
            </div>
          </div>
          <div className="sa-booking-pass-details">
            <time className="sa-booking-time-block" dateTime={session.startsAtLocal}>
              <CalendarDays aria-hidden="true" />
              <span>{session.dayOfWeek.slice(0, 3)}</span>
              <strong>{session.startsAtLocal}</strong>
              <small>{session.dayOfWeek}</small>
            </time>
            <dl className="sa-booking-facts">
              <div className="is-info"><dt>Duration</dt><dd><strong>{session.durationMinutes}</strong><span>minutes</span></dd></div>
              <div className={`is-${session.bookingState}`}><dt>Availability</dt><dd><strong>{session.spotsRemaining}/{session.capacity}</strong><span>{availabilityDetail}</span></dd></div>
              <div className={gym.verification === "gym-confirmed" ? "is-confirmed" : "is-listed"}><dt>Gym &amp; access</dt><dd><strong>{gym.verification === "gym-confirmed" ? "Confirmed" : "Listed"}</strong><span>{gym.accessibility.stepFreeEntry ? "Step-free entry" : "Contact about access"}</span></dd></div>
            </dl>
          </div>
        </section>
      </div>
      <div className="sa-booking-commit">
        <div className="sa-booking-disclosure" id={disclosureId}>
          <LockKeyhole aria-hidden="true" />
          <p><strong>Local preview only</strong><span>No reservation, payment, or message will be sent.</span></p>
        </div>
        <button
          className={`sa-booking-action ${booked ? "is-saved" : ""}`}
          type="button"
          disabled={booked || session.bookingState === "full"}
          aria-describedby={disclosureId}
          onClick={() => dispatch({ type: "book-session", id: session.id, bookingState: session.bookingState === "waitlist" ? "waitlist" : "available" })}
        >
          <span>{booked ? <Check aria-hidden="true" /> : <CalendarDays aria-hidden="true" />}</span>
          <span><strong>{actionLabel}</strong><small>{actionHint}</small></span>
          {!booked && session.bookingState !== "full" ? <ArrowRight aria-hidden="true" /> : null}
        </button>
      </div>
    </div>
  );
}

function ShareSheet(): ReactNode {
  const dispatch = usePrototypeDispatch();

  async function copyPreviewLink(): Promise<void> {
    let copied = false;
    try {
      if (
        typeof window === "undefined" ||
        typeof navigator === "undefined" ||
        typeof navigator.clipboard?.writeText !== "function"
      ) {
        throw new Error("Clipboard API unavailable");
      }
      const currentUrl = new URL(window.location.href);
      currentUrl.search = "";
      currentUrl.hash = "";
      await navigator.clipboard.writeText(currentUrl.toString());
      copied = true;
    } catch {
      copied = false;
    }
    dispatch({ type: "close-sheet" });
    dispatch({
      type: "toast",
      message: copied
        ? "Current synthetic preview link copied."
        : "Preview link could not be copied. Your clipboard may be unavailable.",
    });
  }

  return (
    <div className="sa-sheet-body">
      <div className="sa-honesty-note"><LockKeyhole aria-hidden="true" /><p><strong>Nothing leaves this prototype</strong><span>Copy a synthetic preview label without sharing private training or schedule data.</span></p></div>
      <button
        className="sa-button sa-button-primary"
        type="button"
        onClick={() => { void copyPreviewLink(); }}
      >
        <Copy aria-hidden="true" /> Copy preview link
      </button>
    </div>
  );
}

function ReportSheet(): ReactNode {
  const state = usePrototypeState();
  const dispatch = usePrototypeDispatch();
  const reasons = [
    { value: "unsafe-conduct", label: "Harassment or unsafe conduct", detail: "Review a concern about behavior or community safety." },
    { value: "private-information", label: "Private or identifying information", detail: "Review a concern about consent, privacy, or personal data." },
    { value: "result-integrity", label: "Misleading result or authority claim", detail: "Review a concern about proof, verification, or official status." },
  ] as const satisfies readonly {
    readonly value: PrototypeReportReason;
    readonly label: string;
    readonly detail: string;
  }[];
  const [selectedReason, setSelectedReason] = useState<PrototypeReportReason | null>(state.sessionReportReason);
  return (
    <div className="sa-sheet-body">
      <p className="sa-sheet-intro">Choose a reason before saving a report preview. It lasts only for this open prototype session and is never submitted.</p>
      <div className="sa-create-options">
        {reasons.map(({ value, label, detail }) => (
          <button type="button" key={value} aria-pressed={selectedReason === value} onClick={() => setSelectedReason(value)}>
            <span><Flag aria-hidden="true" /></span><strong>{label}</strong><small>{detail}</small>{selectedReason === value ? <Check aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}
          </button>
        ))}
        <button type="button" onClick={() => dispatch({ type: "block-athlete", id: "athlete_nia_brooks" })}>
          <span><UserRoundX aria-hidden="true" /></span><strong>Block synthetic profile</strong><small>Hide posts and prevent future fixture interactions.</small><ArrowRight />
        </button>
      </div>
      <button
        className="sa-button sa-button-primary"
        type="button"
        disabled={!selectedReason}
        onClick={() => {
          if (selectedReason) dispatch({ type: "save-session-report", reason: selectedReason });
        }}
      >
        <Flag aria-hidden="true" />
        {state.sessionReportReason ? "Update report preview" : "Save report preview for this session"}
      </button>
    </div>
  );
}

function ScopeSheet(): ReactNode {
  const dispatch = usePrototypeDispatch();
  return (
    <div className="sa-sheet-body">
      <div className="sa-honesty-note">
        <MapPin aria-hidden="true" />
        <p>
          <strong>Denver, CO · city-level only</strong>
          <span>This prototype never requests precise location or background GPS access.</span>
        </p>
      </div>
      <p className="sa-sheet-intro">Your mat scope controls which synthetic gyms, athletes, and events appear nearby.</p>
      <div className="sa-create-options">
        <button
          type="button"
          onClick={() => {
            dispatch({ type: "close-sheet" });
            dispatch({ type: "toast", message: "Denver, CO remains your local prototype scope." });
          }}
        >
          <span><MapPin aria-hidden="true" /></span>
          <strong>Use Denver mat scope</strong>
          <small>Keep the current city-level synthetic fixture set.</small>
          <Check aria-hidden="true" />
        </button>
        <Link href="/app/discover" onClick={() => dispatch({ type: "close-sheet" })}>
          <span><Search aria-hidden="true" /></span>
          <strong>Browse the mat map</strong>
          <small>Explore gyms and events inside the current scope.</small>
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

function sheetTitle(sheet: Exclude<ReturnType<typeof usePrototypeState>["activeSheet"], null>): string {
  const titles = {
    create: "Create on SAPAR",
    scope: "Mat scope",
    search: "Search your mat network",
    proof: "Proof Thread",
    registration: "Registration preview",
    booking: "Booking preview",
    share: "Share a synthetic result",
    report: "Safety controls",
  } as const;
  return titles[sheet];
}

function SheetContents({ sheet }: { readonly sheet: Exclude<ReturnType<typeof usePrototypeState>["activeSheet"], null> }): ReactNode {
  switch (sheet) {
    case "create": return <CreateSheet />;
    case "scope": return <ScopeSheet />;
    case "search": return <SearchSheet />;
    case "proof": return <ProofSheet />;
    case "registration": return <RegistrationSheet />;
    case "booking": return <BookingSheet />;
    case "share": return <ShareSheet />;
    case "report": return <ReportSheet />;
  }
}

export function GlobalSheet(): ReactNode {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const titleId = useId();
  const state = usePrototypeState();
  const dispatch = usePrototypeDispatch();
  const sheet = state.activeSheet;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (sheet) {
      const previousOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
      if (!dialog.open) {
        dialog.showModal();
        window.requestAnimationFrame(() => {
          const autofocusTarget = dialog.querySelector<HTMLElement>("[data-sheet-autofocus]");
          const fallbackTarget = dialog.querySelector<HTMLElement>("input, button, a[href], select, textarea");
          (autofocusTarget ?? fallbackTarget)?.focus();
        });
      }
      return () => {
        document.documentElement.style.overflow = previousOverflow;
      };
    }
    if (!sheet && dialog.open) dialog.close();
  }, [sheet]);

  return (
    <dialog
      ref={dialogRef}
      className="sa-dialog"
      data-sheet={sheet ?? undefined}
      aria-modal="true"
      aria-labelledby={titleId}
      onCancel={(event) => { event.preventDefault(); dispatch({ type: "close-sheet" }); }}
      onClose={() => { if (state.activeSheet) dispatch({ type: "close-sheet" }); }}
    >
      {sheet ? (
        <div className="sa-sheet" data-sheet={sheet}>
          <header>
            <div><SyntheticLabel compact /><h2 id={titleId}>{sheetTitle(sheet)}</h2></div>
            <button type="button" className="sa-icon-button" onClick={() => dispatch({ type: "close-sheet" })} aria-label={`Close ${sheetTitle(sheet)}`}><X aria-hidden="true" /></button>
          </header>
          <SheetContents sheet={sheet} />
        </div>
      ) : null}
    </dialog>
  );
}

export function ToastRegion(): ReactNode {
  const state = usePrototypeState();
  return (
    <div className={`sa-toast ${state.toast ? "is-visible" : ""}`} role="status" aria-live="polite">
      <BellRing aria-hidden="true" />
      <span>{state.toast ?? ""}</span>
    </div>
  );
}
