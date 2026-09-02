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
  Search,
  ShieldCheck,
  Sparkles,
  UserRoundX,
  X,
} from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { athlete, events, gyms, posts, proofThreads } from "@/lib/sapar-prototype";
import { usePrototypeDispatch, usePrototypeState } from "./state";

export type UiTone = "cobalt" | "verified" | "earned" | "social" | "neutral" | "critical";

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

export function Avatar({ initials, tone = "cobalt", label, src }: { readonly initials: string; readonly tone?: UiTone; readonly label: string; readonly src?: string }): ReactNode {
  return (
    <span className={`sa-avatar sa-avatar-${tone}`} role="img" aria-label={label}>
      {src ? <img src={src} alt="" width="96" height="96" loading="lazy" decoding="async" /> : initials}
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
  const dispatch = usePrototypeDispatch();
  const actions = [
    { title: "Share a mat note", detail: "A post for your chosen audience.", icon: Sparkles },
    { title: "Host a session", detail: "Draft capacity, level, time, and consent.", icon: CalendarDays },
    { title: "Start a challenge", detail: "Deterministic team progress with clear rules.", icon: Flag },
  ] as const;
  return (
    <div className="sa-sheet-body">
      <p className="sa-sheet-intro">Choose a local prototype flow. Nothing is published or sent.</p>
      <div className="sa-create-options">
        {actions.map(({ title, detail, icon: Icon }) => (
          <button
            type="button"
            key={title}
            onClick={() => {
              dispatch({ type: "close-sheet" });
              dispatch({ type: "toast", message: `${title} draft opened locally.` });
            }}
          >
            <span><Icon aria-hidden="true" /></span>
            <strong>{title}</strong>
            <small>{detail}</small>
            <ArrowRight aria-hidden="true" />
          </button>
        ))}
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
  },
  ...postAthletes.values(),
];

function matchesSearch(values: readonly string[], query: string): boolean {
  return query.length === 0 || values.some((value) => value.toLocaleLowerCase().includes(query));
}

function SearchSheet(): ReactNode {
  const [query, setQuery] = useState("");
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
            <Link href={item.href} key={item.id}>
              <Avatar initials={item.initials} label={`Synthetic athlete ${item.name}`} />
              <span><strong>{item.name}</strong><small>{item.detail}</small></span>
              <ArrowRight aria-hidden="true" />
            </Link>
          ))}
          {filteredGyms.map((gym) => (
            <Link href="/app/gyms" key={gym.id}>
              <Avatar initials={gym.name.split(" ").map((word) => word[0]).join("").slice(0, 2)} tone="verified" label={`Synthetic gym ${gym.name}`} />
              <span><strong>{gym.name}</strong><small>Gym · {gym.location.city} · {gym.location.distanceMiles} miles</small></span>
              <ArrowRight aria-hidden="true" />
            </Link>
          ))}
          {filteredEvents.map((event) => (
            <Link href="/app/compete" key={event.id}>
              <Avatar initials={event.name.split(" ").map((word) => word[0]).join("").slice(0, 2)} tone="earned" label={`Synthetic event ${event.name}`} />
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
  const selectedBooking = gyms
    .flatMap((gym) => gym.schedule.map((session) => ({ gym, session })))
    .find(({ session }) => session.id === state.selectedGymSessionId);
  const { gym, session } = selectedBooking ?? {
    gym: gyms[0],
    session: gyms[0].schedule[0],
  };
  const booked = state.bookedSessionIds.includes(session.id);
  return (
    <div className="sa-sheet-body">
      <div className="sa-summary-stack">
        <p><span>Gym</span><strong>{gym.name}</strong></p>
        <p><span>Session</span><strong>{session.title}</strong></p>
        <p><span>When</span><strong>{session.dayOfWeek} · {session.startsAtLocal}</strong></p>
        <p><span>Availability</span><strong>{session.spotsRemaining} synthetic spots</strong></p>
      </div>
      <p className="sa-search-note">This saves a local preview only. No reservation or payment is made.</p>
      <button className="sa-button sa-button-primary" type="button" disabled={booked} onClick={() => dispatch({ type: "book-session", id: session.id })}>
        {booked ? <Check aria-hidden="true" /> : <CalendarDays aria-hidden="true" />}
        {booked ? "Preview already saved" : "Save booking preview"}
      </button>
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
  const dispatch = usePrototypeDispatch();
  return (
    <div className="sa-sheet-body">
      <p className="sa-sheet-intro">Safety actions affect only deterministic local fixture state.</p>
      <div className="sa-create-options">
        <button type="button" onClick={() => { dispatch({ type: "close-sheet" }); dispatch({ type: "toast", message: "Synthetic report draft saved locally." }); }}>
          <span><Flag aria-hidden="true" /></span><strong>Report this post</strong><small>Choose a reason in the safe local flow.</small><ArrowRight />
        </button>
        <button type="button" onClick={() => dispatch({ type: "block-athlete", id: "athlete_nia_brooks" })}>
          <span><UserRoundX aria-hidden="true" /></span><strong>Block synthetic profile</strong><small>Hide posts and prevent future fixture interactions.</small><ArrowRight />
        </button>
      </div>
    </div>
  );
}

function sheetTitle(sheet: Exclude<ReturnType<typeof usePrototypeState>["activeSheet"], null>): string {
  const titles = {
    create: "Create on SAPAR",
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
    if (sheet && !dialog.open) dialog.showModal();
    if (!sheet && dialog.open) dialog.close();
  }, [sheet]);

  return (
    <dialog
      ref={dialogRef}
      className="sa-dialog"
      aria-labelledby={titleId}
      onCancel={(event) => { event.preventDefault(); dispatch({ type: "close-sheet" }); }}
      onClose={() => { if (state.activeSheet) dispatch({ type: "close-sheet" }); }}
    >
      {sheet ? (
        <div className="sa-sheet">
          <header>
            <div><SyntheticLabel compact /><h2 id={titleId}>{sheetTitle(sheet)}</h2></div>
            <button type="button" className="sa-icon-button" onClick={() => dispatch({ type: "close-sheet" })} aria-label="Close panel"><X aria-hidden="true" /></button>
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
