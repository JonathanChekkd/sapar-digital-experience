/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bell,
  Bookmark,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Flame,
  Heart,
  Home,
  Info,
  MapPin,
  Medal,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Play,
  ScanLine,
  Search,
  Settings,
  Share2,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  UserPlus,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { AudioToggle, PrototypeBanner, SaparMark, StatusChip, VerificationLine } from "./brand";

export type AppView = "pulse" | "profile" | "competitions" | "arena" | "replay" | "ratings" | "gyms" | "rewards";

const nav = [
  ["/app", "Pulse", Home],
  ["/app/competitions", "Explore", Trophy],
  ["/app/arena", "Arena", Play],
  ["/app/ratings", "Ratings", BarChart3],
  ["/app/profile", "Profile", CircleUserRound],
] as const;

const leaderboard = [
  ["01", "Nia Brooks", "1,672", "+14", "12"],
  ["02", "Sofia Reyes", "1,611", "+8", "18"],
  ["03", "Maya Torres", "1,548", "+22", "8"],
  ["04", "Lena Park", "1,516", "-11", "16"],
  ["05", "Keira Allen", "1,489", "+5", "21"],
] as const;

function AppHeader({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="app-header">
      <button className="app-menu" type="button" onClick={onMenu} aria-label="Open app navigation"><Menu /></button>
      <Link href="/app" className="app-mobile-brand"><SaparMark compact /></Link>
      <div className="app-location"><MapPin /><span><small>MAT SCOPE</small><strong>Denver, CO</strong></span><ChevronDown /></div>
      <div className="app-header-actions">
        <AudioToggle />
        <button className="icon-button notification-button" aria-label="Notifications"><Bell /><span /></button>
        <Link className="avatar-button" href="/app/profile" aria-label="Open Maya Torres profile"><span>MT</span></Link>
      </div>
    </header>
  );
}

function AppRail({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  return (
    <>
      <AnimatePresence>
        {open && <motion.button className="rail-scrim" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-label="Close navigation" />}
      </AnimatePresence>
      <aside className={`app-rail ${open ? "open" : ""}`}>
        <div className="rail-brand"><Link href="/"><SaparMark /></Link><button onClick={onClose} aria-label="Close app navigation"><X /></button></div>
        <nav aria-label="Prototype">
          <p>MY SAPAR</p>
          {nav.map(([href, label, Icon]) => (
            <Link key={href} href={href} className={pathname === href ? "active" : ""}><Icon /><span>{label}</span>{pathname === href && <i />}</Link>
          ))}
          <p>COMMUNITY</p>
          <Link href="/app/gyms" className={pathname === "/app/gyms" ? "active" : ""}><Building2 /><span>Gyms</span></Link>
          <Link href="/app/rewards" className={pathname === "/app/rewards" ? "active" : ""}><Medal /><span>Milestones</span></Link>
        </nav>
        <div className="rail-card"><span><Sparkles /></span><p><strong>Prototype mode</strong><small>All data is synthetic.</small></p></div>
        <div className="rail-foot"><button><Settings /> Settings</button><Link href="/"><ArrowLeft /> Exit prototype</Link></div>
      </aside>
    </>
  );
}

function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="bottom-nav" aria-label="Mobile app">
      {nav.map(([href, label, Icon]) => <Link key={href} href={href} className={pathname === href ? "active" : ""}><Icon /><span>{label}</span></Link>)}
    </nav>
  );
}

function PageTitle({ eyebrow, title, detail, action }: { eyebrow: string; title: string; detail?: string; action?: React.ReactNode }) {
  return <div className="app-page-title"><div><span>{eyebrow}</span><h1>{title}</h1>{detail && <p>{detail}</p>}</div>{action}</div>;
}

function RatingSnapshot() {
  return (
    <div className="rating-snapshot">
      <div className="rating-main"><span>NO-GI RATING</span><strong>1,548</strong><em>+22</em></div>
      <div className="rating-meta"><p><span>STATUS</span><strong>Provisional</strong></p><p><span>CONFIDENCE</span><strong>1,492–1,604</strong></p><p><span>RATED RESULTS</span><strong>8</strong></p></div>
      <Link href="/app/ratings">Why it moved <ArrowRight /></Link>
    </div>
  );
}

function PulseView() {
  const [following, setFollowing] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <>
      <PageTitle eyebrow="MONDAY · SEPTEMBER 1" title="Your mat is moving." detail="Pick up where you left off, Maya." action={<button className="button app-primary"><Search /> Find a roll</button>} />
      <div className="pulse-top-grid">
        <RatingSnapshot />
        <div className="next-session">
          <div><span className="live-dot" /><small>NEXT BOOKING</small></div><strong>6:30 <em>PM</em></strong><p>Open Mat · Northline Jiu-Jitsu</p><span><MapPin /> 1.2 mi <Clock3 /> 90 min</span>
          <Link href="/app/gyms">View gym <ArrowRight /></Link>
        </div>
      </div>
      <section className="app-section">
        <div className="app-section-head"><div><span>FEATURED EVENT</span><h2>SAPAR Open · Denver</h2></div><Link href="/app/competitions">Event hub <ArrowRight /></Link></div>
        <div className="feature-bout">
          <div className="bout-visual"><span className="bout-series">SAPAR / 001</span><div className="fighter fighter-a"><span>MT</span><p><strong>Maya</strong><small>TORRES</small></p></div><div className="versus">VS</div><div className="fighter fighter-b"><span>LP</span><p><strong>Lena</strong><small>PARK</small></p></div></div>
          <div className="bout-details"><div><StatusChip tone="blue">Replay ready</StatusChip><span>NO-GI · LIGHTWEIGHT · ROUND 2</span></div><h3>A verified result moves the whole system.</h3><p>Open the arena, inspect the human-confirmed result, then see exactly why the demo rating changed.</p><div className="bout-actions"><Link className="button app-primary" href="/app/arena"><Play fill="currentColor" /> Enter arena</Link><button className={`icon-button ${saved ? "selected" : ""}`} onClick={() => setSaved((v) => !v)} aria-label={saved ? "Remove saved event" : "Save event"} aria-pressed={saved}><Bookmark fill={saved ? "currentColor" : "none"} /></button></div></div>
        </div>
      </section>
      <section className="app-section split-feed">
        <div>
          <div className="app-section-head"><div><span>MAT NEAR YOU</span><h2>Train tonight</h2></div><button>See all</button></div>
          <div className="session-list">
            {["Northline Jiu-Jitsu|Open Mat|6:30 PM|1.2 mi","Forge Academy|Competition class|7:15 PM|3.8 mi","Alto Grappling|All levels|8:00 PM|5.1 mi"].map((item, index) => { const [gym,type,time,distance]=item.split("|"); return <button className="session-row" key={gym}><span className="session-time">{time}</span><span><strong>{gym}</strong><small>{type} · {distance}</small></span><StatusChip tone={index === 0 ? "green" : "neutral"}>{index === 0 ? "8 spots" : "View"}</StatusChip></button>; })}
          </div>
        </div>
        <div className="community-post">
          <div className="post-head"><span className="avatar avatar-blue">NB</span><p><strong>Nia Brooks</strong><small>Northline Jiu-Jitsu · 18m</small></p><button><MoreHorizontal /></button></div>
          <div className="post-art"><span>SAPAR</span><strong>CONSISTENCY<br />COMPOUNDS.</strong><small>24 VERIFIED SESSIONS</small></div>
          <p>Small work, stacked. Hit 24 verified sessions today.</p>
          <div className="post-actions"><button><Heart /> 128</button><button><MessageCircle /> 14</button><button><Share2 /></button><button className={following ? "following" : ""} onClick={() => setFollowing((v) => !v)}>{following ? <Check /> : <UserPlus />}{following ? "Following" : "Follow"}</button></div>
        </div>
      </section>
    </>
  );
}

function ProfileView() {
  const [following, setFollowing] = useState(false);
  return (
    <>
      <div className="profile-hero">
        <div className="profile-signal" aria-hidden="true" />
        <div className="profile-avatar"><span>MT</span><i /></div>
        <div className="profile-identity"><StatusChip tone="green">Adult · profile verified</StatusChip><h1>Maya Torres</h1><p><MapPin /> Denver, CO · Northline Jiu-Jitsu</p><div className="profile-tags"><span>Purple belt</span><span>No-Gi</span><span>Lightweight</span></div></div>
        <div className="profile-actions"><button className={`button ${following ? "button-light" : "app-primary"}`} onClick={() => setFollowing((v) => !v)}>{following ? <Check /> : <UserPlus />}{following ? "Following" : "Follow"}</button><button className="icon-button"><Share2 /></button><button className="icon-button"><MoreHorizontal /></button></div>
      </div>
      <div className="metric-strip">
        <div><span>SAPAR RATING</span><strong>1,548</strong><em>+22</em></div><div><span>COHORT RANK</span><strong>#38</strong><small>of 412</small></div><div><span>VERIFIED RECORD</span><strong>6–2</strong><small>No-Gi</small></div><div><span>JOURNEY LEVEL</span><strong>18</strong><small>4,220 XP</small></div>
      </div>
      <div className="profile-grid">
        <section className="app-panel profile-chart"><div className="panel-head"><div><span>RATING MOVEMENT</span><h2>No-Gi form</h2></div><button>90 days <ChevronDown /></button></div><svg viewBox="0 0 620 220" role="img" aria-label="Illustrative rating trend rising from 1438 to 1548"><defs><linearGradient id="ratingFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0042ea" stopOpacity=".3"/><stop offset="1" stopColor="#0042ea" stopOpacity="0"/></linearGradient></defs><path d="M10 190 C70 180 85 135 145 142 S220 170 280 118 S355 76 410 94 S500 54 610 28 L610 210 L10 210 Z" fill="url(#ratingFill)"/><path d="M10 190 C70 180 85 135 145 142 S220 170 280 118 S355 76 410 94 S500 54 610 28" fill="none" stroke="#0042ea" strokeWidth="5" strokeLinecap="round"/><circle cx="610" cy="28" r="8" fill="#83ff8f" stroke="#101217" strokeWidth="4"/></svg><div className="chart-axis"><span>JUN 04</span><span>JUL 02</span><span>AUG 01</span><span>SEP 01</span></div><Link href="/app/ratings">Open rating explanation <ArrowRight /></Link></section>
        <section className="app-panel recent-results"><div className="panel-head"><div><span>OFFICIAL RECORD</span><h2>Recent results</h2></div><StatusChip tone="green">Human-confirmed</StatusChip></div>{[["W","Lena Park","Points · 7–4","+22"],["W","Keira Allen","Submission · 04:18","+16"],["L","Sofia Reyes","Points · 2–5","-12"]].map(([result,name,detail,delta]) => <div className="result-row" key={name}><span className={result === "W" ? "win" : "loss"}>{result}</span><p><strong>{name}</strong><small>{detail}</small></p><em className={delta.startsWith("+") ? "positive" : "negative"}>{delta}</em><ChevronRight /></div>)}</section>
      </div>
      <section className="app-section"><div className="app-section-head"><div><span>JOURNEY MILESTONES</span><h2>Earned with evidence</h2></div><Link href="/app/rewards">View all <ArrowRight /></Link></div><div className="badge-row">{[["12","Verified bouts",Trophy],["24","Training sessions",Flame],["08","Community assists",Users]].map(([value,label,Icon]) => <div className="badge" key={String(label)}><span><Icon /></span><strong>{value}</strong><small>{label}</small></div>)}</div></section>
    </>
  );
}

function CompetitionsView() {
  const [registered, setRegistered] = useState(false);
  return <><PageTitle eyebrow="COMPETE" title="Find your next proving ground." detail="Events, rules, authority, and eligibility—before you register." action={<button className="button app-primary"><Search /> Search events</button>} /><div className="event-hero"><div className="event-art"><img src="/generated/sapar-event-key-art.png" alt="Synthetic adult grapplers in a SAPAR event concept" /><span>FLAGSHIP EVENT · 001</span><strong>SAPAR<br />OPEN</strong><small>DENVER · OCT 18</small></div><div className="event-copy"><StatusChip tone="blue">Registration concept</StatusChip><h2>A local competition designed to feel clear before it feels intense.</h2><p>Hosted by Northline Jiu-Jitsu · IBJJF-inspired demo rules · Human officials and result confirmation.</p><div className="event-facts"><span><CalendarDays /> Oct 18</span><span><MapPin /> Denver</span><span><Users /> 128 capacity</span></div><button className={`button ${registered ? "button-success" : "app-primary"}`} onClick={() => setRegistered(true)}>{registered ? <Check /> : <Trophy />}{registered ? "Demo registration saved" : "Preview registration"}</button><small className="disclaimer">Prototype only · no eligibility check, waiver, or payment completed.</small></div></div><section className="app-section"><div className="app-section-head"><div><span>UPCOMING</span><h2>Competition calendar</h2></div><button>Filter <ChevronDown /></button></div><div className="event-list">{[["NOV 02","Front Range Roll-Off","Forge Academy","12 divisions"],["NOV 16","Open Mat Trials","Alto Grappling","8 divisions"],["DEC 07","Winter Circuit","Northline Jiu-Jitsu","16 divisions"]].map(([date,name,gym,divisions]) => <Link href="/app/arena" className="event-row" key={name}><span>{date}</span><p><strong>{name}</strong><small>{gym}</small></p><StatusChip tone="neutral">{divisions}</StatusChip><ArrowRight /></Link>)}</div></section></>;
}

function ArenaView() {
  const [timeline, setTimeline] = useState(2);
  return <><div className="arena-head"><Link href="/app/competitions"><ArrowLeft /> Event hub</Link><div><StatusChip tone="blue">Replay</StatusChip><span>SAPAR OPEN · MAT 02</span></div><button><MoreHorizontal /></button></div><div className="scoreboard"><div className="score-fighter"><span className="score-avatar">MT</span><p><strong>Maya Torres</strong><small>Northline · Purple</small></p><b>7</b></div><div className="score-clock"><small>FINAL</small><strong>05:00</strong><span>LIGHTWEIGHT · ROUND 2</span></div><div className="score-fighter opponent"><b>4</b><p><strong>Lena Park</strong><small>Forge · Purple</small></p><span className="score-avatar">LP</span></div></div><div className="arena-authority"><VerificationLine>Official result: human-confirmed</VerificationLine><span>AI insights: experimental replay overlay</span><span>Media consent: demo fixture</span></div><div className="arena-stage"><div className="replay-visual"><div className="mat-lines" /><div className="replay-center"><button aria-label="Play synthetic bout replay"><Play fill="currentColor" /></button><span>SYNTHETIC REPLAY</span></div><div className="camera-label">CAM 02 · 1080P</div><div className="experimental-label"><ScanLine /><span><strong>POSITION SIGNAL</strong><small>Experimental · not scoring authority</small></span></div></div><aside className="bout-timeline"><div className="panel-head"><div><span>EVENT LEDGER</span><h2>Match timeline</h2></div><StatusChip tone="green">Final</StatusChip></div>{[["04:42","TAKEDOWN","Maya · +2"],["03:18","PASS","Maya · +3"],["02:06","SWEEP","Lena · +2"],["00:48","SWEEP","Maya · +2"],["00:14","SWEEP","Lena · +2"]].map(([time,event,detail],index) => <button className={index === timeline ? "active" : ""} onClick={() => setTimeline(index)} key={time}><span>{time}</span><i /><p><strong>{event}</strong><small>{detail}</small></p></button>)}<Link className="button app-primary" href="/app/replay">Open verified result <ArrowRight /></Link></aside></div></>;
}

function ReplayView() {
  const reduce = useReducedMotion();
  return <><div className="victory-stage"><motion.div className="victory-signal" initial={reduce ? false : { scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: .8 }} /><span className="victory-eyebrow">HUMAN-CONFIRMED RESULT · SAPAR OPEN</span><div className="victory-versus"><div><span className="victory-avatar winner">MT</span><strong>MAYA<br />TORRES</strong><small>NORTHLINE JIU-JITSU</small></div><div className="victory-result"><StatusChip tone="green">Verified</StatusChip><strong>7–4</strong><span>POINTS · FINAL</span></div><div><span className="victory-avatar">LP</span><strong>LENA<br />PARK</strong><small>FORGE ACADEMY</small></div></div><motion.div className="victory-word" initial={reduce ? false : { opacity: 0, letterSpacing: "-.08em" }} animate={{ opacity: .08, letterSpacing: "-.04em" }} transition={{ delay: .25 }}>VICTORY</motion.div></div><div className="replay-summary"><section className="rating-change"><span>NO-GI RATING UPDATE</span><div><strong>1,526</strong><ArrowRight /><strong className="new-rating">1,548</strong><em>+22</em></div><p>You defeated a higher-rated opponent in a human-confirmed result. The move is larger because this illustrative rating is still provisional.</p><Link href="/app/ratings">Why it moved <ArrowRight /></Link></section><section className="separate-gains"><span>SEPARATE PROGRESS UPDATES</span><div><p><Trophy /><span><strong>Record</strong><small>6–2 No-Gi</small></span></p><p><Zap /><span><strong>Journey XP</strong><small>+180 deterministic</small></span></p><p><Medal /><span><strong>Milestone</strong><small>First flagship win</small></span></p></div><small>Rating, record, XP, belt, and milestones are separate systems.</small></section></div><div className="replay-actions"><button className="button app-secondary"><Share2 /> Share result</button><Link className="button app-primary" href="/app/profile">Open fighter card <ArrowRight /></Link></div></>;
}

function RatingsView() {
  const [open, setOpen] = useState(false);
  return <><PageTitle eyebrow="RATING LAB" title="A number that explains itself." detail="Illustrative opponent-adjusted rating · not an official federation ranking." action={<div className="segment-control"><button className="active">No-Gi</button><button>Gi</button></div>} /><div className="rating-hero"><div className="rating-current"><span>YOUR RATING</span><strong>1,548</strong><em>+22</em><StatusChip tone="amber">Provisional</StatusChip></div><div className="rating-range"><span>CONFIDENCE RANGE</span><div><i style={{ left: "31%" }} /><i className="user" style={{ left: "58%" }} /></div><p><span>1,420</span><strong>1,492–1,604</strong><span>1,680</span></p></div><div className="rating-context"><p><span>COHORT</span><strong>Purple · Lightweight · Denver</strong></p><p><span>ELIGIBLE RESULTS</span><strong>8 human-confirmed</strong></p><p><span>MODEL</span><strong>Illustrative prototype v0.3</strong></p></div></div><div className="ratings-grid"><section className="leaderboard app-panel"><div className="panel-head"><div><span>COHORT LEADERBOARD</span><h2>Denver · No-Gi</h2></div><button>90 days <ChevronDown /></button></div>{leaderboard.map(([rank,name,rating,delta,results]) => <div className={`leader-row ${name === "Maya Torres" ? "you" : ""}`} key={name}><span>{rank}</span><i>{name.split(" ").map(p => p[0]).join("")}</i><p><strong>{name}</strong><small>{results} verified results</small></p><b>{rating}</b><em className={delta.startsWith("+") ? "positive" : "negative"}>{delta}</em></div>)}</section><section className="app-panel explain-rating"><div className="panel-head"><div><span>TRANSPARENCY</span><h2>Why it moved</h2></div><Info /></div><div className="explain-factor"><strong>01</strong><p><b>Opponent strength</b><small>Lena entered 21 rating points above you.</small></p><StatusChip tone="blue">Up</StatusChip></div><div className="explain-factor"><strong>02</strong><p><b>Provisional status</b><small>Your lane has only eight eligible results.</small></p><StatusChip tone="amber">More movement</StatusChip></div><div className="explain-factor"><strong>03</strong><p><b>Verified authority</b><small>The result is final and human-confirmed.</small></p><StatusChip tone="green">Eligible</StatusChip></div><button className="text-button" onClick={() => setOpen((v) => !v)} aria-expanded={open}>How demo ratings work <ChevronDown /></button><AnimatePresence>{open && <motion.p className="rating-note" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>This prototype demonstrates presentation, not a finalized formula. Gi and No-Gi remain separate. Disputed results are excluded until review.</motion.p>}</AnimatePresence></section></div></>;
}

function GymsView() {
  const [booked, setBooked] = useState(false);
  return <><div className="dojo-hero"><img className="dojo-image" src="/generated/sapar-smart-gym.png" alt="Synthetic modern Jiu-Jitsu gym community concept" /><div className="dojo-pattern" aria-hidden="true" /><div><StatusChip tone="green">Verified host · synthetic</StatusChip><h1>Northline<br />Jiu-Jitsu</h1><p><MapPin /> Denver, Colorado · 1.2 mi</p><div><span>4.9 demo rating</span><span>142 members</span><span>Accessible entry</span></div></div><div className="dojo-next"><span>NEXT OPEN MAT</span><strong>18:30</strong><p>All levels · 90 min · 8 spots</p><button className={`button ${booked ? "button-success" : "app-primary"}`} onClick={() => setBooked(true)}>{booked ? <Check /> : <CalendarDays />}{booked ? "Demo booking saved" : "Preview booking"}</button><small>No payment or real reservation is made.</small></div></div><div className="dojo-grid"><section className="app-panel dojo-schedule"><div className="panel-head"><div><span>THIS WEEK</span><h2>Mat schedule</h2></div><button>Full schedule <ArrowRight /></button></div>{[["MON","18:30","Open Mat","8 spots"],["TUE","07:00","No-Gi Fundamentals","14 spots"],["WED","19:15","Competition Class","Invite"],["THU","18:30","Open Mat","11 spots"]].map(([day,time,title,status]) => <button className="schedule-row" key={day}><span>{day}</span><strong>{time}</strong><p>{title}</p><StatusChip tone={status.includes("spots") ? "green" : "neutral"}>{status}</StatusChip><ChevronRight /></button>)}</section><section className="app-panel gym-status"><div className="panel-head"><div><span>SMART GYM ROADMAP</span><h2>Capability status</h2></div><ShieldCheck /></div><div><p><strong>Session publishing</strong><StatusChip tone="blue">Prototype</StatusChip></p><small>Availability, skill context, capacity, and host details.</small></div><div><p><strong>Human result confirmation</strong><StatusChip tone="blue">Prototype</StatusChip></p><small>Reviewable authority and correction states.</small></div><div><p><strong>Camera-based analysis</strong><StatusChip tone="amber">Research</StatusChip></p><small>Requires consent, venue testing, ground truth, and reliability gates.</small></div><div><p><strong>Autonomous scoring</strong><StatusChip tone="red">Not promised</StatusChip></p><small>Do not ship before accuracy, fairness, authority, and appeals prove out.</small></div></section></div></>;
}

function RewardsView() {
  return <><PageTitle eyebrow="JOURNEY MILESTONES" title="Celebrate what was earned." detail="Deterministic criteria. No random drops, streak loss, or pay-to-win status." /><div className="level-banner"><div><span>JOURNEY LEVEL</span><strong>18</strong></div><div className="level-progress"><p><strong>4,220 XP</strong><span>4,500 to level 19</span></p><div><i style={{ width: "74%" }} /></div><small>XP recognizes participation; it does not determine belt or competitive rating.</small></div><Sparkles /></div><section className="app-section"><div className="app-section-head"><div><span>EARNED</span><h2>Your milestone cabinet</h2></div><StatusChip tone="green">Evidence attached</StatusChip></div><div className="achievement-grid">{[[Trophy,"Flagship first","Win a human-confirmed flagship bout.","Competition"],[Flame,"Mat regular","Complete 24 verified training sessions.","Training"],[Users,"Good corner","Receive 8 community-assist acknowledgements.","Community"],[Target,"Explorer","Train at 5 participating gyms.","Discovery"]].map(([Icon,title,text,type],index) => { const AchievementIcon=Icon as typeof Trophy; return <motion.button className="achievement" whileHover={{ y: -3 }} key={String(title)}><span className={`medallion medal-${index}`}><AchievementIcon /></span><StatusChip tone={index < 3 ? "green" : "amber"}>{index < 3 ? "Earned" : "3 / 5"}</StatusChip><h3>{title}</h3><p>{text}</p><small>{type}</small></motion.button>; })}</div></section></>;
}

export function AppExperience({ view }: { view: AppView }) {
  const [railOpen, setRailOpen] = useState(false);
  const views: Record<AppView, React.ReactNode> = { pulse: <PulseView />, profile: <ProfileView />, competitions: <CompetitionsView />, arena: <ArenaView />, replay: <ReplayView />, ratings: <RatingsView />, gyms: <GymsView />, rewards: <RewardsView /> };
  return <div className="prototype-shell"><PrototypeBanner /><AppRail open={railOpen} onClose={() => setRailOpen(false)} /><div className="app-main"><AppHeader onMenu={() => setRailOpen(true)} /><main className={`app-content app-view-${view}`}>{views[view]}</main></div><BottomNav /></div>;
}
