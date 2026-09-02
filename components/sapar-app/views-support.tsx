"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  CircleAlert,
  CloudOff,
  Flag,
  Gift,
  ImagePlus,
  LockKeyhole,
  MapPin,
  Medal,
  MessageSquareText,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Trophy,
  UserRoundX,
  Users,
  Wifi,
} from "lucide-react";
import { Suspense, useState, type ReactNode } from "react";
import {
  achievements,
  gyms,
  initialPreferences,
  notifications,
  quests,
  type AchievementFixture,
  type GymSessionFixture,
  type GymSessionId,
  type QuestFixture,
} from "@/lib/sapar-prototype";
import { SectionHeading, StatusTag, SwitchRow, SyntheticLabel } from "./primitives";
import { usePrototypeDispatch, usePrototypeState, type Connectivity } from "./state";

type GymFixtureItem = (typeof gyms)[number];

function GymDetail({ gym }: { readonly gym: GymFixtureItem }): ReactNode {
  const dispatch = usePrototypeDispatch();
  const state = usePrototypeState();
  const [selectedSessionId, setSelectedSessionId] = useState<GymSessionId>(gym.schedule[0].id);
  const selected: GymSessionFixture = gym.schedule.find((session) => session.id === selectedSessionId) ?? gym.schedule[0];
  const booked = state.bookedSessionIds.includes(selected.id);
  return (
    <div className="sa-view sa-gym-view">
      <section className="sa-gym-hero">
        <img src="/generated/sapar-world/calibration/northside-gym.webp" alt="Fictional adult community training in a bright gym inside an illustrated cobalt SAPAR frame" width="1672" height="941" loading="eager" decoding="async" />
        <div><SyntheticLabel compact /><StatusTag tone={gym.verification === "gym-confirmed" ? "verified" : "neutral"}>{gym.verification} fixture</StatusTag><h1>{gym.name}</h1><p><MapPin /> {gym.location.city}, {gym.location.region} · {gym.location.distanceMiles} mi</p><span>{gym.memberCount} synthetic members · {gym.accessibility.stepFreeEntry ? "Step-free entry" : "Contact gym about step-free access"}</span></div>
      </section>
      <div className="sa-gym-grid">
        <section className="sa-surface">
          <SectionHeading title="Mat schedule" detail="Choose a row to update the booking preview." />
          <div className="sa-schedule-list">{gym.schedule.map((session) => <button type="button" key={session.id} className={selected.id === session.id ? "is-active" : ""} aria-pressed={selected.id === session.id} onClick={() => setSelectedSessionId(session.id)}><span>{session.dayOfWeek.slice(0, 3)}</span><strong>{session.startsAtLocal}</strong><span><b>{session.title}</b><small>{session.level} · {session.durationMinutes} min</small></span><StatusTag tone={session.bookingState === "available" ? "verified" : "earned"}>{session.bookingState === "available" ? `${session.spotsRemaining} spots` : session.bookingState}</StatusTag><ChevronRight /></button>)}</div>
        </section>
        <aside className="sa-booking-card">
          <StatusTag tone={selected.bookingState === "available" ? "verified" : "earned"}>{selected.bookingState}</StatusTag>
          <span>Selected session</span><h2>{selected.startsAtLocal}</h2><p>{selected.title}</p><small>{selected.dayOfWeek} · {selected.durationMinutes} minutes · {selected.format}</small>
          <button type="button" className={`sa-button ${booked ? "sa-button-success" : "sa-button-primary"}`} disabled={booked || selected.bookingState === "full"} onClick={() => dispatch({ type: "open-sheet", sheet: "booking", gymSessionId: selected.id })}>{booked ? <Check /> : <CalendarDays />}{booked ? "Preview saved" : selected.bookingState === "full" ? "Session full" : "Review booking"}</button>
          <em>No real booking or payment is submitted.</em>
        </aside>
      </div>
      <section className="sa-surface">
        <SectionHeading title="Capability status" detail="Product reality before spectacle." />
        <div className="sa-capability-grid"><div><ShieldCheck /><p><strong>Session publishing</strong><small>Typed fixture prototype</small></p><StatusTag tone="cobalt">Prototype</StatusTag></div><div><Users /><p><strong>Human result confirmation</strong><small>Reviewable authority and correction states</small></p><StatusTag tone="cobalt">Prototype</StatusTag></div><div><ImagePlus /><p><strong>Camera-based assistance</strong><small>Consent and reliability gates required</small></p><StatusTag tone="earned">Research</StatusTag></div><div><CircleAlert /><p><strong>Autonomous scoring</strong><small>Not a shipped or approved capability</small></p><StatusTag tone="critical">Not promised</StatusTag></div></div>
      </section>
    </div>
  );
}

function GymRouteSelection(): ReactNode {
  const searchParams = useSearchParams();
  const requestedGymId = searchParams.get("gym");
  const gym = gyms.find((fixture) => fixture.id === requestedGymId) ?? gyms[0];
  return <GymDetail key={gym.id} gym={gym} />;
}

export function GymsView(): ReactNode {
  return (
    <Suspense
      fallback={(
        <div className="sa-view sa-gym-view" aria-busy="true">
          <section className="sa-surface"><p>Loading synthetic gym fixture…</p></section>
        </div>
      )}
    >
      <GymRouteSelection />
    </Suspense>
  );
}

function AchievementCard({ achievement }: { readonly achievement: AchievementFixture }): ReactNode {
  const dispatch = usePrototypeDispatch();
  const reduce = useReducedMotion();
  const progress = achievement.progress.target > 0
    ? Math.min(100, Math.max(0, Math.round((achievement.progress.current / achievement.progress.target) * 100)))
    : 0;
  return (
    <motion.button type="button" className="sa-achievement-card" whileHover={reduce ? undefined : { y: -3 }} onClick={() => dispatch({ type: "toast", message: `${achievement.title}: ${achievement.description}` })}>
      <span className={`sa-achievement-medal is-${achievement.category}`}>{achievement.category === "trust" ? <ShieldCheck /> : achievement.category === "training" ? <Sparkles /> : achievement.category === "competition" ? <Trophy /> : <Users />}</span>
      <StatusTag tone={achievement.state === "earned" ? "verified" : "earned"}>{achievement.state}</StatusTag>
      <strong className="sa-achievement-title">{achievement.title}</strong><span className="sa-achievement-description">{achievement.description}</span>
      <span
        className="sa-achievement-progress"
        role="progressbar"
        aria-label={`${achievement.title} progress`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        aria-valuetext={`${achievement.progress.current} of ${achievement.progress.target} ${achievement.progress.unit}`}
      ><i style={{ width: `${progress}%` }} /></span>
      <small className="sa-achievement-meta">{achievement.progress.current} / {achievement.progress.target} {achievement.progress.unit} · {achievement.reward.xp} XP</small>
    </motion.button>
  );
}

export function RewardsView(): ReactNode {
  return (
    <div className="sa-view">
      <div className="sa-view-intro"><div><h1>Celebrate what was earned.</h1><p>Deterministic criteria. No random drops, streak loss, fake scarcity, or pay-to-win status.</p></div><StatusTag tone="verified"><ShieldCheck /> Evidence attached</StatusTag></div>
      <section className="sa-level-banner"><div><span>Private journey level</span><strong>18</strong></div><div><p><strong>4,220 XP</strong><span>4,500 to level 19</span></p><div><i style={{ width: "74%" }} /></div><small>XP recognizes participation. It cannot determine belt, rating, or eligibility.</small></div><Gift /></section>
      <section><SectionHeading title="Milestone cabinet" detail="Activate a card to read its exact evidence requirement." /><div className="sa-achievement-grid">{achievements.map((achievement) => <AchievementCard achievement={achievement} key={achievement.id} />)}</div></section>
      <div className="sa-view-footer-action"><Link className="sa-button sa-button-primary" href="/app/quests">Open active quests <ArrowRight /></Link></div>
    </div>
  );
}

export function QuestsView(): ReactNode {
  return (
    <div className="sa-view">
      <div className="sa-view-intro"><div><h1>Progress with a finish line.</h1><p>Every quest names the action, evidence, reward, and expiration before you start.</p></div><StatusTag tone="earned">Deterministic</StatusTag></div>
      <div className="sa-quest-list">{quests.map((quest: QuestFixture) => { const completed = quest.steps.filter((step) => step.completed).length; return <article key={quest.id}><header><span><Flag /></span><div><StatusTag tone={quest.state === "completed" ? "verified" : "cobalt"}>{quest.state}</StatusTag><h2>{quest.title}</h2><p>{quest.description}</p></div></header><ol>{quest.steps.map((step) => <li key={step.label} className={step.completed ? "is-complete" : ""}><span>{step.completed ? <Check /> : null}</span>{step.label}</li>)}</ol><footer><span>{completed} / {quest.steps.length} steps</span><strong>+{quest.reward.xp} private XP</strong><details className="sa-quest-evidence"><summary>View evidence <ArrowRight /></summary><p>{completed} completed local fixture step{completed === 1 ? "" : "s"} of {quest.steps.length}. Only the checklist above can unlock this deterministic reward.</p></details></footer></article>; })}</div>
      <div className="sa-honesty-note"><LockKeyhole /><p><strong>No streak punishment</strong><span>Missing a quest never removes earned progress, changes competitive rating, or exposes inactivity publicly.</span></p></div>
    </div>
  );
}

export function NotificationsView(): ReactNode {
  const state = usePrototypeState();
  const dispatch = usePrototypeDispatch();
  const unreadCount = notifications.filter((notification) => !notification.read && !state.readNotificationIds.includes(notification.id)).length;
  return (
    <div className="sa-view">
      <div className="sa-view-intro"><div><h1>Activity, without the pressure.</h1><p>{unreadCount} unread synthetic updates. No urgency theater or fake scarcity.</p></div><Link className="sa-button sa-button-secondary" href="/app/settings"><Bell /> Preferences</Link></div>
      <section className="sa-surface"><SectionHeading title="Notification center" detail="Reading a row updates only local reducer state." /><div className="sa-notification-list">{notifications.map((notification) => { const read = notification.read || state.readNotificationIds.includes(notification.id); return <article className={read ? "is-read" : ""} key={notification.id}><span>{notification.category === "rating" ? <Medal /> : notification.category === "competition" ? <Trophy /> : notification.category === "gym" ? <CalendarDays /> : <LockKeyhole />}</span><div><StatusTag tone={notification.tone === "positive" ? "verified" : notification.tone === "attention" ? "earned" : "neutral"}>{notification.category}</StatusTag><h2>{notification.title}</h2><p>{notification.body}</p><small>{notification.createdAt.slice(0, 10)}</small></div><div>{notification.action ? <Link href={notification.action.href}>{notification.action.label} <ArrowRight /></Link> : null}{!read ? <button type="button" onClick={() => dispatch({ type: "read-notification", id: notification.id })}>Mark read</button> : <span><Check /> Read</span>}</div></article>; })}</div></section>
    </div>
  );
}

function ConnectionTester(): ReactNode {
  const state = usePrototypeState();
  const dispatch = usePrototypeDispatch();
  const options: readonly { readonly value: Connectivity; readonly label: string; readonly detail: string }[] = [
    { value: "online", label: "Online", detail: "Fixture service ready" },
    { value: "offline", label: "Offline", detail: "Retain local state" },
    { value: "error", label: "Error", detail: "Show recoverable failure" },
  ];
  return <div className="sa-connection-tester">{options.map((option) => <button type="button" aria-pressed={state.connectivity === option.value} onClick={() => dispatch({ type: "set-connectivity", connectivity: option.value })} key={option.value}>{option.value === "online" ? <Wifi /> : option.value === "offline" ? <CloudOff /> : <CircleAlert />}<span><strong>{option.label}</strong><small>{option.detail}</small></span></button>)}</div>;
}

export function SettingsView(): ReactNode {
  const state = usePrototypeState();
  const dispatch = usePrototypeDispatch();
  return (
    <div className="sa-view">
      <div className="sa-view-intro"><div><h1>Consent stays visible.</h1><p>Private data is calm and neutral—not green, alarming, or performative.</p></div><StatusTag tone="neutral"><LockKeyhole /> {initialPreferences.statusPresentation.label}</StatusTag></div>
      <div className="sa-settings-grid">
        <section className="sa-surface"><SectionHeading title="Privacy" detail={`${initialPreferences.statusPresentation.description} These controls save local previews; they do not enforce production visibility.`} /><SwitchRow label="Keep journey progress private" description="Saved local preview only; XP, quests, and schedules are not access-controlled." checked={state.preferences.privateJourney} onChange={(value) => dispatch({ type: "set-preference", key: "privateJourney", value })} /><SwitchRow label="Show public activity" description="Saved local preview only; the deterministic fixture feed does not change." checked={state.preferences.activityVisible} onChange={(value) => dispatch({ type: "set-preference", key: "activityVisible", value })} /><div className="sa-setting-fact"><MapPin /><p><strong>Location sharing: city only</strong><span>Precise location is unavailable in this prototype.</span></p></div><button type="button" className="sa-button sa-button-secondary" onClick={() => dispatch({ type: "open-sheet", sheet: "report" })}><UserRoundX /> Open safety controls</button></section>
        <section className="sa-surface"><SectionHeading title="Experience" detail="Preferences are stored in this browser when local storage is available." /><SwitchRow label="Low-stimulation mode" description="Changes this prototype’s decorative movement and effects, then saves the choice locally." checked={state.preferences.lowStimulation} onChange={(value) => dispatch({ type: "set-preference", key: "lowStimulation", value })} /><SwitchRow label="Keep interface sound muted" description="Saved local preview only; this prototype does not emit interface sound." checked={state.preferences.reducedSound} onChange={(value) => dispatch({ type: "set-preference", key: "reducedSound", value })} /><SwitchRow label="Prototype notifications" description="Saved local preview only; no push service or notification filter is connected." checked={state.preferences.notificationsEnabled} onChange={(value) => dispatch({ type: "set-preference", key: "notificationsEnabled", value })} /></section>
      </div>
      <section className="sa-surface"><SectionHeading title="State laboratory" detail="Exercise online, offline, and recoverable-error UI without a network request." /><ConnectionTester />{state.connectivity !== "online" ? <button type="button" className="sa-button sa-button-primary" onClick={() => dispatch({ type: "set-connectivity", connectivity: "online" })}><RotateCcw /> Retry local fixture boundary</button> : null}</section>
      <div className="sa-honesty-note"><ShieldCheck /><p><strong>No production account exists</strong><span>These controls modify deterministic local fixture state and browser storage only.</span></p></div>
    </div>
  );
}

export function CreateView(): ReactNode {
  const dispatch = usePrototypeDispatch();
  const creationTypes = [
    { title: "Mat note", detail: "Share training context with your chosen audience.", icon: MessageSquareText },
    { title: "Session", detail: "Draft a gym session with capacity and accessibility.", icon: CalendarDays },
    { title: "Event challenge", detail: "Set deterministic goals, rules, and proof.", icon: Flag },
  ] as const;
  return (
    <div className="sa-view sa-create-view">
      <section className="sa-create-hero"><SyntheticLabel /><h1>Create something your community can trust.</h1><p>Audience, authority, consent, and prototype status are visible before publishing.</p><button className="sa-tactile-create" type="button" onClick={() => dispatch({ type: "open-sheet", sheet: "create" })}><span><Sparkles /></span><strong>Start a local draft</strong><small>Nothing will be published</small></button></section>
      <div className="sa-create-grid">{creationTypes.map(({ title, detail, icon: Icon }) => <button type="button" key={title} onClick={() => dispatch({ type: "open-sheet", sheet: "create" })}><span><Icon /></span><strong>{title}</strong><small>{detail}</small><ArrowRight /></button>)}</div>
      <section className="sa-surface"><SectionHeading title="Before you share" detail="The product should make these decisions impossible to miss." /><div className="sa-create-checklist"><p><Check /><span><strong>Audience</strong><small>Public, followers, or approved connections</small></span></p><p><Check /><span><strong>Consent</strong><small>Every person and media item has an explicit state</small></span></p><p><Check /><span><strong>Authority</strong><small>Posts cannot masquerade as verified results</small></span></p><p><Check /><span><strong>Recovery</strong><small>Edit, remove, report, and appeal paths remain visible</small></span></p></div></section>
    </div>
  );
}
