"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import {
  Bell,
  ChartNoAxesCombined,
  CircleCheckBig,
  CircleUserRound,
  Compass,
  Dumbbell,
  Gift,
  Home,
  LoaderCircle,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Trophy,
  TriangleAlert,
  Users,
  WifiOff,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { notifications } from "@/lib/sapar-prototype";
import { GlobalSheet, SyntheticLabel, ToastRegion } from "./primitives";
import { usePrototypeDispatch, usePrototypeState } from "./state";

export type AppView =
  | "pulse"
  | "profile"
  | "competitions"
  | "compete"
  | "arena"
  | "replay"
  | "ratings"
  | "gyms"
  | "rewards"
  | "create"
  | "discover"
  | "notifications"
  | "settings"
  | "onboarding"
  | "leaderboards"
  | "network"
  | "quests";

const viewTitles: Readonly<Record<AppView, string>> = {
  pulse: "Pulse",
  profile: "Profile",
  competitions: "Competitions",
  compete: "Compete",
  arena: "Arena",
  replay: "Replay",
  ratings: "Rating lanes",
  gyms: "Gyms & sessions",
  rewards: "Achievements",
  create: "Create",
  discover: "Discover",
  notifications: "Notifications",
  settings: "Settings",
  onboarding: "Onboarding",
  leaderboards: "Leaderboards",
  network: "My network",
  quests: "Quests",
};

const primaryLinks = [
  { href: "/app", label: "Pulse", icon: Home, section: "pulse" },
  { href: "/app/compete", label: "Compete", icon: Trophy, section: "compete" },
  { href: "/app/discover", label: "Discover", icon: Compass, section: "discover" },
  { href: "/app/profile", label: "Profile", icon: CircleUserRound, section: "profile" },
] as const;

const secondaryLinks = [
  { href: "/app/ratings", label: "Rating lanes", icon: ChartNoAxesCombined },
  { href: "/app/gyms", label: "Gyms & sessions", icon: Dumbbell },
  { href: "/app/rewards", label: "Achievements", icon: Gift },
  { href: "/app/quests", label: "Quests", icon: ShieldCheck },
  { href: "/app/network", label: "My network", icon: Users },
  { href: "/app/settings", label: "Settings", icon: Settings },
] as const;

function isCurrent(pathname: string, href: string): boolean {
  if (href === "/app") return pathname === href || pathname === "/app/notifications";
  if (href === "/app/compete") {
    return ["/app/compete", "/app/competitions", "/app/arena", "/app/replay", "/app/leaderboards"].some(
      (route) => pathname === route || pathname.startsWith(`${route}/`),
    );
  }
  if (href === "/app/profile") {
    return pathname === href || pathname.startsWith(`${href}/`) || pathname === "/app/onboarding";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function ariaCurrentFor(pathname: string, href: string): "page" | "location" | undefined {
  if (pathname === href) return "page";
  return isCurrent(pathname, href) ? "location" : undefined;
}

type PrimaryNavigationSection = "pulse" | "compete" | "create" | "discover" | "profile";

function primaryNavigationSection(pathname: string): PrimaryNavigationSection {
  if (pathname === "/app/create" || pathname.startsWith("/app/create/")) return "create";
  if (["/app/compete", "/app/competitions", "/app/arena", "/app/replay", "/app/ratings", "/app/leaderboards"].some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  )) return "compete";
  if (["/app/discover", "/app/gyms"].some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  )) return "discover";
  if (["/app/profile", "/app/network", "/app/rewards", "/app/quests", "/app/settings", "/app/onboarding"].some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  )) return "profile";
  return "pulse";
}

type PrototypeServiceState = "checking" | "available" | "unavailable";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isStringArray(value: unknown): value is readonly string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isNonNegativeInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 0;
}

function isPrototypeHealth(value: unknown): boolean {
  if (!isRecord(value) || !isRecord(value.capabilities)) return false;
  const capabilities = value.capabilities;
  const capabilityKeys = [
    "athleteProfiles",
    "socialFeed",
    "competitionDiscovery",
    "gymDiscovery",
    "ratingsAndProof",
    "clientInteractions",
    "authentication",
    "persistence",
    "payments",
    "externalSync",
  ] as const;
  const validCapabilityStates = new Set([
    "synthetic-fixtures",
    "client-local-only",
    "not-connected",
  ]);
  return (
    value.status === "ok" &&
    value.mode === "local-prototype" &&
    value.dataSource === "typed-synthetic-fixtures" &&
    value.database === "not-connected" &&
    value.externalServices === "not-connected" &&
    typeof value.serverTime === "string" &&
    capabilityKeys.every((key) => {
      const state = capabilities[key];
      return typeof state === "string" && validCapabilityStates.has(state);
    })
  );
}

function isPrototypeCatalog(value: unknown): boolean {
  if (!isRecord(value) || !isRecord(value.fixture) || !isRecord(value.counts) || !isRecord(value.identifiers)) {
    return false;
  }
  const counts = value.counts;
  const identifiers = value.identifiers;
  const countKeys = [
    "athletes",
    "ratingLanes",
    "publicPosts",
    "events",
    "gyms",
    "results",
    "proofThreads",
    "achievements",
    "quests",
  ] as const;
  const identifierKeys = [
    "athletes",
    "ratingLanes",
    "publicPosts",
    "events",
    "gyms",
    "results",
    "proofThreadResultIds",
    "achievements",
    "quests",
  ] as const;
  return (
    value.mode === "local-prototype" &&
    value.dataSource === "typed-synthetic-fixtures" &&
    value.fixture.isSynthetic === true &&
    value.fixture.label === "Synthetic prototype data" &&
    typeof value.fixture.fixtureId === "string" &&
    typeof value.fixture.snapshotAt === "string" &&
    countKeys.every((key) => isNonNegativeInteger(counts[key])) &&
    identifierKeys.every((key) => isStringArray(identifiers[key]))
  );
}

async function readJson(response: Response): Promise<unknown> {
  return response.json() as Promise<unknown>;
}

function isAvailableResponse(
  healthResponse: Response,
  catalogResponse: Response,
  healthPayload: unknown,
  catalogPayload: unknown,
): boolean {
  return (
    healthResponse.ok &&
    catalogResponse.ok &&
    isPrototypeHealth(healthPayload) &&
    isPrototypeCatalog(catalogPayload)
  );
}

function PrototypeServiceStatus(): ReactNode {
  const [serviceState, setServiceState] = useState<PrototypeServiceState>("checking");

  useEffect(() => {
    const controller = new AbortController();
    let didUnmount = false;
    let didTimeout = false;
    const timeout = window.setTimeout(() => {
      didTimeout = true;
      controller.abort();
      if (!didUnmount) setServiceState("unavailable");
    }, 5000);

    async function checkService(): Promise<void> {
      try {
        const [healthResponse, catalogResponse] = await Promise.all([
          fetch("/api/prototype/health", {
            cache: "no-store",
            headers: { Accept: "application/json" },
            signal: controller.signal,
          }),
          fetch("/api/prototype/catalog", {
            cache: "no-store",
            headers: { Accept: "application/json" },
            signal: controller.signal,
          }),
        ]);
        const [healthPayload, catalogPayload] = await Promise.all([
          readJson(healthResponse),
          readJson(catalogResponse),
        ]);
        if (!didUnmount && !didTimeout) {
          setServiceState(
            isAvailableResponse(
              healthResponse,
              catalogResponse,
              healthPayload,
              catalogPayload,
            )
              ? "available"
              : "unavailable",
          );
        }
      } catch {
        if (!didUnmount) setServiceState("unavailable");
      } finally {
        window.clearTimeout(timeout);
      }
    }

    void checkService();
    return () => {
      didUnmount = true;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  return (
    <span className={`sa-service-status is-${serviceState}`} role="status" aria-live="polite">
      {serviceState === "available" ? <CircleCheckBig aria-hidden="true" /> : serviceState === "unavailable" ? <TriangleAlert aria-hidden="true" /> : <LoaderCircle aria-hidden="true" />}
      {serviceState === "available" ? "Typed fixture API ready" : serviceState === "unavailable" ? "Prototype API unavailable" : "Checking fixture API"}
    </span>
  );
}

function Brand(): ReactNode {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className="sa-brand"
      initial={reduce ? false : { opacity: 0.75, y: -4, filter: "blur(2px)" }}
      animate={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.img
        className="sa-brand-mark"
        src="/brand/sapar-mark.svg"
        alt=""
        width="60"
        height="54"
        initial={reduce ? false : { rotate: -8, scale: 0.84 }}
        animate={reduce ? undefined : { rotate: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
      />
      <span>SAPAR</span>
    </motion.span>
  );
}

function DesktopRail(): ReactNode {
  const pathname = usePathname();
  return (
    <aside className="sa-rail">
      <Link href="/" className="sa-rail-brand" aria-label="SAPAR public home"><Brand /></Link>
      <SyntheticLabel compact />
      <nav aria-label="SAPAR prototype sections">
        <p>Core</p>
        {primaryLinks.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} aria-current={ariaCurrentFor(pathname, href)} className={isCurrent(pathname, href) ? "is-active" : ""}>
            <Icon aria-hidden="true" /><span>{label}</span>
          </Link>
        ))}
        <Link href="/app/create" aria-current={pathname === "/app/create" ? "page" : undefined} className={pathname === "/app/create" ? "is-active" : ""}>
          <Plus aria-hidden="true" /><span>Create</span>
        </Link>
        <p>Explore</p>
        {secondaryLinks.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} aria-current={ariaCurrentFor(pathname, href)} className={isCurrent(pathname, href) ? "is-active" : ""}>
            <Icon aria-hidden="true" /><span>{label}</span>
          </Link>
        ))}
      </nav>
      <div className="sa-rail-proof">
        <ShieldCheck aria-hidden="true" />
        <p><strong>Prototype boundary</strong><span>Same-app API · no database</span></p>
      </div>
    </aside>
  );
}

function AppHeader(): ReactNode {
  const pathname = usePathname();
  const state = usePrototypeState();
  const dispatch = usePrototypeDispatch();
  const unread = notifications.filter(
    (notification) => !notification.read && !state.readNotificationIds.includes(notification.id),
  ).length;
  return (
    <header className="sa-header">
      <Link href="/app" className="sa-mobile-brand" aria-label="SAPAR Pulse"><Brand /></Link>
      <button type="button" className="sa-scope" onClick={() => dispatch({ type: "open-sheet", sheet: "scope" })}>
        <span>Mat scope</span><strong>Denver, CO</strong>
      </button>
      <div className="sa-header-actions">
        <button type="button" className="sa-icon-button" onClick={() => dispatch({ type: "open-sheet", sheet: "search" })} aria-label="Search synthetic athletes, gyms, and events"><Search aria-hidden="true" /></button>
        <Link className="sa-icon-button sa-notification-button" href="/app/notifications" aria-label={`${unread} unread prototype notifications`} aria-current={pathname === "/app/notifications" ? "page" : undefined}>
          <Bell aria-hidden="true" /><span>{unread}</span>
        </Link>
        <Link className="sa-header-avatar" href="/app/profile" aria-label="Open Maya Torres synthetic profile" aria-current={pathname === "/app/profile" ? "page" : undefined}>MT</Link>
      </div>
      {state.connectivity !== "online" ? (
        <div className="sa-connectivity" role="status"><WifiOff aria-hidden="true" />{state.connectivity === "offline" ? "Offline preview · saved local state remains available" : "Fixture service error · retry from Settings"}</div>
      ) : null}
    </header>
  );
}

function BottomNavigation(): ReactNode {
  const pathname = usePathname();
  const items = [
    primaryLinks[0],
    primaryLinks[1],
    { href: "/app/create", label: "Create", icon: Plus, section: "create" },
    primaryLinks[2],
    primaryLinks[3],
  ] as const;
  return (
    <nav className="sa-bottom-nav" aria-label="Primary app navigation">
      {items.map(({ href, label, icon: Icon, section }) => {
        const create = href === "/app/create";
        const current = primaryNavigationSection(pathname) === section;
        if (create) {
          return (
            <Link key={href} href={href} className={`sa-create-control ${current ? "is-active" : ""}`} aria-current={pathname === href ? "page" : current ? "location" : undefined}>
              <span><Icon aria-hidden="true" /></span><small>{label}</small>
            </Link>
          );
        }
        return (
          <Link key={href} href={href} className={current ? "is-active" : ""} aria-current={pathname === href ? "page" : current ? "location" : undefined}>
            <Icon aria-hidden="true" /><span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function AppFrame({ children, view }: { readonly children: ReactNode; readonly view: AppView }): ReactNode {
  const state = usePrototypeState();

  return (
    <div className={`sa-app ${state.preferences.lowStimulation ? "is-low-stimulation" : ""}`} data-view={view}>
      <a className="sa-skip-link" href="#sapar-app-content">Skip to app content</a>
      <DesktopRail />
      <div className="sa-stage">
        <div className="sa-prototype-strip"><SyntheticLabel /><span className="sa-prototype-copy">Interactive concept · no official result, rating, booking, or payment</span><PrototypeServiceStatus /></div>
        <AppHeader />
        <main id="sapar-app-content" className="sa-content" tabIndex={-1}>{children}</main>
      </div>
      <BottomNavigation />
      <GlobalSheet />
      <ToastRegion />
    </div>
  );
}

export function SaparAppShell({ children, view }: { readonly children: ReactNode; readonly view: AppView }): ReactNode {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${viewTitles[view]} — SAPAR prototype`;
    return () => { document.title = previousTitle; };
  }, [view]);

  return <AppFrame view={view}>{children}</AppFrame>;
}
