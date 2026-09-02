/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  CalendarDays,
  CircleDot,
  Database,
  Dumbbell,
  Eye,
  Gauge,
  MapPin,
  Medal,
  Network,
  Play,
  ScanLine,
  ShieldCheck,
  Trophy,
  Users,
} from "lucide-react";
import { PageShell, Reveal, StatusChip, VerificationLine } from "./brand";

const testimonials = [
  {
    quote: "Sapar has the potential to improve the efficiency of gyms and the industry of Jiu-Jitsu in general.",
    name: "Robert Goodloe",
    role: "Entrepreneur · Gracie Barra Centennial Colorado",
    image: "/brand/testimonials/real-1.png",
  },
  {
    quote: "I'm very excited to see so many of my students finally competing who would never do it otherwise without a platform like Sapar.",
    name: "Juliano Prado",
    role: "6th Degree Black Belt",
    image: "/brand/testimonials/real-2.png",
  },
  {
    quote: "We've been playing ‘Sapar’ for so many years without realizing it. Open mats, in-house competitions—now finally someone will structure it for us.",
    name: "Adriano Nasal",
    role: "Black belt · Entrepreneur",
    image: "/brand/testimonials/real-4.png",
  },
] as const;

function HeroProductStage() {
  const reduce = useReducedMotion();
  return (
    <div className="hero-product-stage" aria-label="SAPAR app product concept">
      <div className="stage-grid" aria-hidden="true" />
      <motion.div
        className="hero-phone-glow"
        animate={reduce ? undefined : { opacity: [0.45, 0.75, 0.45], scale: [0.98, 1.02, 0.98] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        className="hero-phones"
        src="/brand/original-site/phones.png"
        alt="SAPAR fighter, discovery, and training application screens"
        initial={false}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      />
      <motion.div
        className="broadcast-card rating-float"
        initial={false}
        animate={{ opacity: 1, x: 0 }}
      >
        <span className="broadcast-label">NO-GI RATING</span>
        <strong>1,548</strong>
        <span className="positive">+22 verified</span>
      </motion.div>
      <motion.div
        className="broadcast-card mat-float"
        initial={false}
        animate={{ opacity: 1, x: 0 }}
      >
        <span className="live-dot" />
        <span>
          <strong>Open mat</strong>
          <small>6:30 PM · 1.2 mi</small>
        </span>
      </motion.div>
      <div className="stage-caption">
        <StatusChip tone="blue">Interactive prototype</StatusChip>
        <span>Synthetic demonstration data</span>
      </div>
    </div>
  );
}

function ProductLoop() {
  return (
    <div className="product-loop" aria-label="SAPAR connected product loop">
      {([
        [Users, "Fighter joins", "Identity"],
        [MapPin, "Finds mat time", "Discovery"],
        [CalendarDays, "Trains or competes", "Activity"],
        [ShieldCheck, "Result is confirmed", "Trust"],
        [Activity, "Progress updates", "Return"],
      ] as const).map(([LoopIcon, title, label], index) => {
        return (
          <Reveal className="loop-step" delay={index * 0.07} key={String(title)}>
            <span className="loop-index">0{index + 1}</span>
            <LoopIcon aria-hidden="true" />
            <strong>{title}</strong>
            <small>{label}</small>
            {index < 4 && <ArrowDownRight className="loop-arrow" aria-hidden="true" />}
          </Reveal>
        );
      })}
    </div>
  );
}

function AppWindow() {
  return (
    <div className="app-window">
      <div className="app-window-top">
        <div className="mini-brand">
          <img src="/brand/sapar-mark.svg" alt="" />
          <strong>SAPAR</strong>
        </div>
        <span className="window-pill"><span /> Private beta</span>
      </div>
      <div className="app-window-grid">
        <aside className="app-mini-rail" aria-hidden="true">
          <span className="active"><Activity /></span>
          <span><Trophy /></span>
          <span><BarChart3 /></span>
          <span><Building2 /></span>
        </aside>
        <div className="app-window-body">
          <div className="app-window-head">
            <div>
              <small>MONDAY · DENVER</small>
              <h3>Your mat is moving.</h3>
            </div>
            <div className="rating-tile">
              <span>No-Gi</span><strong>1,548</strong><em>+22</em>
            </div>
          </div>
          <div className="feature-match">
            <div className="match-time"><span>UP NEXT</span><strong>18:42</strong></div>
            <div>
              <small>SAPAR OPEN · LIGHTWEIGHT</small>
              <h4>Maya Torres <span>vs</span> Lena Park</h4>
              <VerificationLine>Human-confirmed results</VerificationLine>
            </div>
            <Link href="/app/arena" aria-label="Open the bout arena"><Play fill="currentColor" /></Link>
          </div>
          <div className="mini-list">
            <div><span className="list-icon"><MapPin /></span><p><strong>Find a roll</strong><small>4 sessions near you</small></p><Chevron /></div>
            <div><span className="list-icon"><Medal /></span><p><strong>Milestone in reach</strong><small>2 verified sessions to Pathfinder</small></p><Chevron /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Chevron() {
  return <ArrowRight size={18} aria-hidden="true" />;
}

export function HomeExperience() {
  const reduce = useReducedMotion();
  return (
    <PageShell>
      <main id="main-content">
        <section className="home-hero section-dark">
          <div className="hero-noise" aria-hidden="true" />
          <div className="home-hero-copy">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.45 }}
              className="eyebrow-row"
            >
              <StatusChip tone="green">Private beta</StatusChip>
            </motion.div>
            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.65, delay: 0.08 }}
            >
              Train. Connect.
              <span>Compete.</span>
            </motion.h1>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.55, delay: 0.18 }}
              className="hero-lede"
            >
              SAPAR is the digital layer for Jiu-Jitsu—connecting fighter identity,
              mat time, gym communities, competition records, and visible progress.
            </motion.p>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.5, delay: 0.28 }}
              className="hero-actions"
            >
              <Link href="/app" className="button button-primary button-large">
                Enter the product <ArrowRight aria-hidden="true" />
              </Link>
              <Link href="/demo" className="button button-light button-large">
                <Play size={17} fill="currentColor" aria-hidden="true" /> Investor tour
              </Link>
            </motion.div>
            <motion.div
              initial={false}
              animate={{ opacity: 1 }}
              className="hero-trust"
            >
              <VerificationLine>Human-led authority</VerificationLine>
              <VerificationLine>Transparent ratings</VerificationLine>
              <VerificationLine>AI behind proof gates</VerificationLine>
            </motion.div>
          </div>
          <HeroProductStage />
          <div className="hero-chapter">01 / THE CONNECTED MAT</div>
        </section>

        <section className="proof-rail" aria-label="Product status">
          <div><span>PRODUCT</span><strong>Interactive concept</strong></div>
          <div><span>CORE PLATFORM</span><strong>Feasible in stages</strong></div>
          <div><span>AI SCORING</span><strong>Research · requires validation</strong></div>
          <div><span>DATA</span><strong>Synthetic in this demo</strong></div>
        </section>

        <section className="section section-light split-intro">
          <Reveal className="section-number">02</Reveal>
          <Reveal className="split-heading">
            <span className="kicker">THE OPPORTUNITY</span>
            <h2>One identity.<br />Every mat.</h2>
          </Reveal>
          <Reveal className="split-copy" delay={0.08}>
            <p className="lead-copy">
              Today, the Jiu-Jitsu journey is fragmented across group chats, gym software,
              social feeds, spreadsheets, and event tools. SAPAR turns that into one connected loop.
            </p>
            <Link className="text-link" href="/fighters">
              Explore the fighter experience <ArrowRight aria-hidden="true" />
            </Link>
          </Reveal>
        </section>

        <section className="section section-light loop-section">
          <ProductLoop />
        </section>

        <section className="section section-blue path-section">
          <div className="path-heading">
            <Reveal>
              <span className="kicker kicker-light">BUILT FOR BOTH SIDES OF THE MAT</span>
              <h2>Choose your path.</h2>
            </Reveal>
          </div>
          <div className="path-panels">
            <Reveal className="path-panel path-fighter">
              <div className="path-index">01</div>
              <Dumbbell aria-hidden="true" />
              <div>
                <h3>For fighters</h3>
                <p>Find mat time, build a credible record, understand progress, and belong to the community.</p>
                <Link href="/fighters">Enter fighter mode <ArrowRight aria-hidden="true" /></Link>
              </div>
            </Reveal>
            <Reveal className="path-panel path-gym" delay={0.08}>
              <div className="path-index">02</div>
              <Building2 aria-hidden="true" />
              <div>
                <h3>For gyms</h3>
                <p>Publish mat time, host activity, deepen member participation, and become a trusted network node.</p>
                <Link href="/gyms">Enter gym mode <ArrowRight aria-hidden="true" /></Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section section-dark product-section">
          <div className="product-copy">
            <Reveal>
              <span className="kicker kicker-blue">INTERACTIVE PRODUCT CONCEPT</span>
              <h2>Don’t just hear the pitch.<br />Step inside it.</h2>
              <p>
                Follow a synthetic fighter from discovery to a human-confirmed result,
                a transparent rating update, and the next gym session.
              </p>
              <div className="product-statuses">
                <StatusChip tone="green">Frontend prototype</StatusChip>
                <StatusChip tone="neutral">No live backend</StatusChip>
                <StatusChip tone="amber">AI insights experimental</StatusChip>
              </div>
              <Link className="button button-primary button-large" href="/app">
                Open Mat Pulse <ArrowRight aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <Reveal className="product-window-wrap" delay={0.08}>
            <AppWindow />
          </Reveal>
        </section>

        <section className="section section-paper build-section">
          <div className="build-title">
            <Reveal>
              <span className="kicker">BUILD THE TRUTH ENGINE FIRST</span>
              <h2>Ambition moves forward only when evidence opens the gate.</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p>
                The community, gym, event, and result foundation is achievable now. Body tracking and autonomous scoring remain staged research—not an early product promise.
              </p>
              <Link className="text-link" href="/vision">See the technology roadmap <ArrowRight aria-hidden="true" /></Link>
            </Reveal>
          </div>
          <div className="build-ladder">
            {[
              ["01", "Foundation", "Identity, rights, rules, gyms, events, and result ledger.", "Build now", "green"],
              ["02", "Controlled pilot", "Prove workflows, data quality, and human review in selected gyms.", "Prove", "blue"],
              ["03", "AI assist", "Test bounded analysis tools against defined evaluation gates.", "Validate", "amber"],
              ["04", "Body tracking", "Evaluate camera, venue, ruleset, occlusion, and generalization limits.", "Research", "amber"],
              ["05", "Scale or defer", "Expand only when reliability, trust, operations, and economics are proven.", "Decision gate", "neutral"],
            ].map(([n, title, text, status, tone], index) => (
              <Reveal className="build-step" delay={index * 0.06} key={n}>
                <div className="step-top"><span>{n}</span><StatusChip tone={tone as "green" | "blue" | "amber" | "neutral"}>{status}</StatusChip></div>
                <h3>{title}</h3>
                <p>{text}</p>
                {index < 4 && <ArrowRight className="build-arrow" aria-hidden="true" />}
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section section-light endorsement-section">
          <Reveal className="endorsement-head">
            <span className="kicker">FROM THE COMMUNITY</span>
            <h2>Built around the way Jiu-Jitsu already moves.</h2>
            <p>Existing public testimonials from the current SAPAR site. Confirm current titles and permissions before external reuse.</p>
          </Reveal>
          <div className="testimonial-strip">
            {testimonials.map((item, index) => (
              <Reveal className="testimonial" delay={index * 0.07} key={item.name}>
                <p>“{item.quote}”</p>
                <div>
                  <img src={item.image} alt="" />
                  <span><strong>{item.name}</strong><small>{item.role}</small></span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="closing-cta section-blue">
          <div className="closing-grid" aria-hidden="true" />
          <Reveal>
            <span className="kicker kicker-light">THE NEXT ROUND STARTS HERE</span>
            <h2>Turn a fragmented sport into a connected community.</h2>
          </Reveal>
          <Reveal className="closing-actions" delay={0.08}>
            <Link className="button button-light button-large" href="/demo">
              Start the investor tour <ArrowRight aria-hidden="true" />
            </Link>
            <a className="button button-blue-outline button-large" href="https://saparsport.com/#join-us">
              Join the waitlist
            </a>
          </Reveal>
        </section>
      </main>
    </PageShell>
  );
}

type Audience = "fighters" | "gyms";

const audienceCopy = {
  fighters: {
    eyebrow: "SAPAR FOR FIGHTERS",
    title: "Your Jiu-Jitsu life, in one fighter card.",
    lede: "Find mat time, connect with practitioners, document activity, and see progress develop without confusing belt, rating, record, XP, or status.",
    cta: "Open the fighter prototype",
    href: "/app/profile",
    icon: Dumbbell,
    steps: [
      ["Discover", "Find open mats, people, and events matched to the context you choose."],
      ["Participate", "Book a fictional session or register for a prototype event with clear expectations."],
      ["Verify", "Keep official results tied to a human-confirmed record and visible source."],
      ["Progress", "Understand Gi and No-Gi rating lanes, record, milestones, and media separately."],
    ],
  },
  gyms: {
    eyebrow: "SAPAR FOR GYMS",
    title: "Turn mat time into a connected community.",
    lede: "Publish availability, help people participate, host structured activity, and become a trusted node in the wider Jiu-Jitsu network.",
    cta: "Open the gym prototype",
    href: "/app/gyms",
    icon: Building2,
    steps: [
      ["Be discovered", "Give practitioners a clear view of your mat, culture, hosts, and expectations."],
      ["Publish mat time", "Show open mats, capacity, skill context, accessibility, and event schedules."],
      ["Host the record", "Support human-confirmed sessions and results with transparent authority."],
      ["Learn responsibly", "Use participation signals and feedback before layering on advanced automation."],
    ],
  },
} as const;

export function AudienceExperience({ audience }: { audience: Audience }) {
  const copy = audienceCopy[audience];
  const Icon = copy.icon;
  return (
    <PageShell>
      <main id="main-content">
        <section className="subpage-hero section-dark">
          <div className="subpage-grid" aria-hidden="true" />
          <div>
            <span className="kicker kicker-blue">{copy.eyebrow}</span>
            <h1>{copy.title}</h1>
            <p>{copy.lede}</p>
            <div className="hero-actions">
              <Link className="button button-primary button-large" href={copy.href}>{copy.cta} <ArrowRight /></Link>
              <a className="button button-light button-large" href="https://saparsport.com/#join-us">Join private beta</a>
            </div>
          </div>
          <div className="subpage-emblem"><Icon aria-hidden="true" /><span>01</span></div>
        </section>
        <section className="section section-light audience-steps">
          <div className="audience-step-head">
            <span className="kicker">THE EXPERIENCE</span>
            <h2>One journey, four clear moments.</h2>
          </div>
          <div className="audience-step-list">
            {copy.steps.map(([title, text], index) => (
              <Reveal className="audience-step" delay={index * 0.06} key={title}>
                <span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div><ArrowDownRight />
              </Reveal>
            ))}
          </div>
        </section>
        <section className="section section-blue detail-feature">
          <Reveal>
            <span className="kicker kicker-light">INTERACTIVE CONCEPT</span>
            <h2>{audience === "fighters" ? "A fighter card that explains itself." : "A gym hub that earns trust."}</h2>
            <p>{audience === "fighters" ? "Every number carries its lane, eligibility, confidence, and source. Progress feels exciting without pretending uncertainty does not exist." : "Availability, coaches, rules, amenities, events, and data status travel together—so digital discovery leads to safer real-world participation."}</p>
          </Reveal>
          <Reveal className="detail-console" delay={0.08}>
            <div className="console-top"><StatusChip tone="green">Synthetic demo</StatusChip><span>SAPAR / {audience.toUpperCase()}</span></div>
            <div className="console-score"><strong>{audience === "fighters" ? "1,548" : "18:30"}</strong><small>{audience === "fighters" ? "NO-GI · PROVISIONAL" : "NEXT OPEN MAT"}</small></div>
            <div className="console-lines"><span /><span /><span /></div>
            <Link href={copy.href}>Explore this screen <ArrowRight /></Link>
          </Reveal>
        </section>
      </main>
    </PageShell>
  );
}

export function VisionExperience() {
  const phases = [
    [Database, "Foundation", "Build identities, gyms, rights, rules, events, and the result ledger.", "Feasible now", "green"],
    [Network, "Data flywheel", "Capture consented, labeled, reviewable activity through useful workflows.", "Build with core", "blue"],
    [Bot, "Assistive intelligence", "Pilot bounded summaries, quality checks, and review support under human control.", "Conditional", "amber"],
    [ScanLine, "Body tracking", "Test pose and action signals across camera, venue, body, and ruleset variation.", "Research-heavy", "amber"],
    [Gauge, "Autonomous scoring", "Consider only after accuracy, fairness, reliability, authority, and appeal gates hold.", "Do not promise yet", "red"],
  ] as const;
  return (
    <PageShell>
      <main id="main-content">
        <section className="subpage-hero vision-hero section-dark">
          <div>
            <span className="kicker kicker-blue">RESPONSIBLE TECHNOLOGY ROADMAP</span>
            <h1>Build trust before automation.</h1>
            <p>The core platform is feasible. Advanced computer vision becomes credible only after dependable data, controlled pilots, representative evaluation, and human governance.</p>
            <Link className="button button-primary button-large" href="/demo">See the guided build story <ArrowRight /></Link>
          </div>
          <div className="vision-orbit" aria-hidden="true"><Bot /><span className="orbit-one" /><span className="orbit-two" /></div>
        </section>
        <section className="section section-paper vision-phases">
          <div className="vision-intro"><span className="kicker">FIVE PROOF GATES</span><h2>Each layer earns the right to unlock the next.</h2></div>
          <div className="vision-phase-list">
            {phases.map(([Icon, title, text, status, tone], index) => (
              <Reveal className="vision-phase" delay={index * 0.05} key={title}>
                <span className="phase-index">0{index + 1}</span><Icon aria-hidden="true" />
                <div><h3>{title}</h3><p>{text}</p></div>
                <StatusChip tone={tone}>{status}</StatusChip>
              </Reveal>
            ))}
          </div>
        </section>
        <section className="section section-dark drift-section">
          <div><span className="kicker kicker-blue">POTENTIAL ACCELERATOR</span><h2>Inference stability may help—but it does not skip the body-tracking gates.</h2></div>
          <div className="drift-grid">
            <div><CircleDot /><h3>Team-reported capability</h3><p>Another internal project reports progress on inference drift. Reuse could reduce instability in bounded model workflows.</p><StatusChip tone="amber">Transfer test required</StatusChip></div>
            <div><Eye /><h3>Different failure surface</h3><p>LLM inference consistency is not proof of computer-vision temporal tracking, occlusion handling, or venue generalization.</p><StatusChip tone="neutral">Separate evaluation</StatusChip></div>
            <div><ShieldCheck /><h3>Evidence closes the gap</h3><p>Reproduce the result, define the interface, run a SAPAR-specific benchmark, and promote only what passes.</p><StatusChip tone="green">Clear next experiment</StatusChip></div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}

export function DemoExperience() {
  const stops = [
    ["01", "Mat Pulse", "See the community, next session, and rating context.", "/app"],
    ["02", "Bout Arena", "Watch a synthetic replay with human-confirmed authority.", "/app/arena"],
    ["03", "Victory Replay", "Understand the verified result and separate progress updates.", "/app/replay"],
    ["04", "Rating Lanes", "Open the explanation behind a chess-style demo rating.", "/app/ratings"],
    ["05", "Smart Gym", "Finish where digital discovery turns into real-world participation.", "/app/gyms"],
    ["06", "Build phases", "See what ships first—and why autonomous scoring must wait.", "/vision"],
  ] as const;
  return (
    <PageShell>
      <main id="main-content">
        <section className="demo-hero section-dark">
          <div>
            <StatusChip tone="blue">Five-minute investor tour</StatusChip>
            <h1>The operating layer for connected Jiu-Jitsu.</h1>
            <p>Walk the product loop, see the core platform, and finish on the proof-gated path to responsible AI.</p>
          </div>
          <Link className="demo-start" href="/app"><Play fill="currentColor" /><span><small>START HERE</small><strong>Open Mat Pulse</strong></span><ArrowRight /></Link>
        </section>
        <section className="section section-light demo-route">
          <div className="demo-route-head"><span className="kicker">GUIDED ROUTE</span><h2>Six stops. One coherent story.</h2></div>
          <div className="demo-stops">
            {stops.map(([n, title, text, href], index) => (
              <Reveal className="demo-stop" delay={index * 0.04} key={n}>
                <span>{n}</span><div><h3>{title}</h3><p>{text}</p></div><Link href={href} aria-label={`Open ${title}`}><ArrowRight /></Link>
              </Reveal>
            ))}
          </div>
        </section>
        <section className="demo-downloads section-blue">
          <div>
            <span className="kicker kicker-light">PUBLIC TEAM PACKAGE</span>
            <h2>Take the story into the room.</h2>
            <p>Fourteen slides covering the product, correct build order, data flywheel, body-tracking validation ladder, scale architecture, and decision gates.</p>
          </div>
          <div>
            <a className="button button-light button-large" href="/downloads/SAPAR_INVESTOR_PITCH_DECK.pdf" download>
              Download PDF <ArrowDownRight />
            </a>
            <a className="button button-blue-outline button-large" href="/downloads/SAPAR_INVESTOR_PITCH_DECK.pptx" download>
              Download PowerPoint <ArrowDownRight />
            </a>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
