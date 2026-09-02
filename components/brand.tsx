"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Menu,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useState } from "react";

export type StatusTone = "blue" | "green" | "amber" | "neutral" | "red";

export function SaparMark({ compact = false }: { compact?: boolean }) {
  const reduce = useReducedMotion();

  return (
    <span className="sapar-wordmark" aria-label="SAPAR">
      <motion.img
        src="/brand/sapar-mark.svg"
        alt=""
        width="42"
        height="42"
        initial={reduce ? false : { opacity: 0, rotate: -7, scale: 0.86 }}
        whileInView={reduce ? undefined : { opacity: 1, rotate: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 210, damping: 18 }}
      />
      {!compact && <span>SAPAR</span>}
    </span>
  );
}

export function StatusChip({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: StatusTone;
}) {
  return <span className={`status-chip status-${tone}`}>{children}</span>;
}

export function SignalRule({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`signal-rule ${className}`}>
      <span />
    </span>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

const navItems = [
  ["/fighters", "Fighters"],
  ["/gyms", "Gyms"],
  ["/vision", "Technology"],
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 150, damping: 28 });

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <motion.div className="scroll-progress" style={{ scaleX: reduce ? 1 : scaleX }} />
        <Link href="/" className="header-logo">
          <SaparMark />
        </Link>
        <nav aria-label="Primary" className="desktop-nav">
          {navItems.map(([href, label]) => (
            <Link key={href} className={pathname === href ? "active" : ""} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link className="button button-ghost desktop-cta" href="/demo">
            Investor tour
          </Link>
          <Link className="button button-primary desktop-cta" href="/app">
            Open prototype <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            className="mobile-nav"
            initial={reduce ? false : { opacity: 0, y: -12 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={reduce ? { duration: 0 } : undefined}
          >
            {navItems.map(([href, label], index) => (
              <Link href={href} key={href} onClick={() => setOpen(false)}>
                <span>0{index + 1}</span>
                {label}
                <ChevronRight aria-hidden="true" />
              </Link>
            ))}
            <Link className="button button-primary" href="/app" onClick={() => setOpen(false)}>
              Open prototype <ArrowRight aria-hidden="true" />
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <SaparMark />
          <p>One identity. Every mat.</p>
        </div>
        <div className="footer-links">
          <div>
            <p className="footer-label">Explore</p>
            <Link href="/fighters">Fighters</Link>
            <Link href="/gyms">Gyms</Link>
            <Link href="/vision">Technology</Link>
          </div>
          <div>
            <p className="footer-label">Experience</p>
            <Link href="/demo">Investor tour</Link>
            <Link href="/app">Prototype</Link>
            <a href="https://www.instagram.com/sapar_sport" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
          <div>
            <p className="footer-label">Company</p>
            <a href="https://saparsport.com/terms-and-policies">Terms & policies</a>
            <a href="mailto:info@saparsport.com">Contact</a>
          </div>
        </div>
      </div>
      <div className="footer-base">
        <span>© {new Date().getFullYear()} Sapar Sport Digital Technologies Inc.</span>
        <span>Interactive prototype · Synthetic data</span>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="marketing-shell">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}

export function PrototypeBanner() {
  return (
    <div className="prototype-banner" role="note">
      <span className="banner-dot" />
      <strong>Interactive concept</strong>
      <span>Synthetic demonstration data</span>
      <span>No live scoring</span>
    </div>
  );
}

export function AudioToggle() {
  const [enabled, setEnabled] = useState(false);
  return (
    <button
      className="icon-button"
      type="button"
      aria-label={enabled ? "Mute prototype sounds" : "Enable prototype sounds"}
      aria-pressed={enabled}
      onClick={() => setEnabled((value) => !value)}
    >
      {enabled ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
    </button>
  );
}

export function VerificationLine({ children }: { children: React.ReactNode }) {
  return (
    <span className="verification-line">
      <Check size={14} strokeWidth={3} aria-hidden="true" />
      {children}
    </span>
  );
}
