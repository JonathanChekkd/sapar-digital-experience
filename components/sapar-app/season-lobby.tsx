"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import {
  ArrowRight,
  ChartNoAxesCombined,
  Gift,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { achievements, prototypeProgress, quests, ratingLanes } from "@/lib/sapar-prototype";

const noGiRating = ratingLanes.find((lane) => lane.lane === "no-gi") ?? ratingLanes[1];
const activeQuest = quests[0];
const completedQuestSteps = activeQuest.steps.filter((step) => step.completed).length;
const earnedAchievements = achievements.filter((achievement) => achievement.state === "earned").length;
const rankProgressPercent = Math.min(100, Math.max(0, Math.round((prototypeProgress.rankPoints / prototypeProgress.rankPointTarget) * 100)));

export function SeasonHud(): ReactNode {
  return (
    <nav className="sa-season-hud" aria-label="Competitive progress">
      <div className="sa-season-hud-title">
        <Sparkles aria-hidden="true" />
        <span><strong>Season command</strong><small>Synthetic progress · systems stay separate</small></span>
      </div>
      <Link href="/app/leaderboards" data-tone="rank" aria-label={`Open standings. Current position ${prototypeProgress.cohortRank} in the synthetic No-Gi cohort`}>
        <Trophy aria-hidden="true" /><span><small>Standings</small><strong>#{prototypeProgress.cohortRank} cohort</strong></span><ArrowRight aria-hidden="true" />
      </Link>
      <Link href="/app/ratings" data-tone="rating" aria-label={`Open rating lanes. No-Gi rating ${noGiRating.value.toLocaleString()}`}>
        <ChartNoAxesCombined aria-hidden="true" /><span><small>No-Gi rating</small><strong>{noGiRating.value.toLocaleString()}</strong></span><ArrowRight aria-hidden="true" />
      </Link>
      <Link href="/app/quests" data-tone="quest" aria-label={`Open active quests. ${completedQuestSteps} of ${activeQuest.steps.length} steps complete`}>
        <Target aria-hidden="true" /><span><small>Active quest</small><strong>{completedQuestSteps} / {activeQuest.steps.length} steps</strong></span><ArrowRight aria-hidden="true" />
      </Link>
      <Link href="/app/rewards" data-tone="journey" aria-label={`Open private journey rewards. Level ${prototypeProgress.privateJourneyLevel}`}>
        <Gift aria-hidden="true" /><span><small>Private journey</small><strong>Level {prototypeProgress.privateJourneyLevel}</strong></span><ArrowRight aria-hidden="true" />
      </Link>
    </nav>
  );
}

export function SeasonLobby(): ReactNode {
  return (
    <section className="sa-season-lobby" aria-labelledby="sa-season-lobby-title">
      <header className="sa-season-lobby-header">
        <div>
          <h1 id="sa-season-lobby-title">Enter the circuit.</h1>
          <p>See rank, rating, quests, and private progress together—without letting one system impersonate another.</p>
        </div>
        <span><ShieldCheck aria-hidden="true" /> Synthetic season preview</span>
      </header>

      <div className="sa-season-lobby-grid">
        <div className="sa-season-fighter-stage" aria-label="Maya Torres synthetic competitive profile">
          <img
            className="sa-season-fighter"
            src="/generated/sapar-world/calibration/athlete-maya-passport.webp"
            alt="Hybrid illustrated portrait of fictional adult athlete Maya Torres wearing a white gi and purple belt"
            width="996"
            height="1577"
            loading="eager"
            decoding="async"
          />
          <span className="sa-season-fighter-name"><strong>Maya Torres</strong><small>Denver · Adult Purple · No-Gi</small></span>
          <span className="sa-season-rank-crest" aria-hidden="true">
            <img src="/generated/sapar-world/calibration/ui-rank-emblem-vanguard.webp" alt="" width="1254" height="1254" loading="eager" decoding="async" />
          </span>
        </div>

        <article className="sa-season-rank-card">
          <span>Current competitive tier · illustrative</span>
          <h3>{prototypeProgress.competitiveTier}</h3>
          <p><strong>#{prototypeProgress.cohortRank}</strong><span>Denver adult purple No-Gi cohort</span></p>
          <div className="sa-season-progress-copy"><strong>{prototypeProgress.rankPoints}</strong><span>/ {prototypeProgress.rankPointTarget} rank points</span></div>
          <div
            className="sa-season-progress-track"
            role="progressbar"
            aria-label={`${prototypeProgress.competitiveTier} competitive rank progress`}
            aria-valuemin={0}
            aria-valuemax={prototypeProgress.rankPointTarget}
            aria-valuenow={prototypeProgress.rankPoints}
          ><i style={{ "--sa-progress": `${rankProgressPercent}%` } as CSSProperties} /></div>
          <small>Only eligible synthetic No-Gi results can move this tier. Belt, XP, followers, and purchases cannot.</small>
          <Link href="/app/leaderboards">Open full standings <ArrowRight aria-hidden="true" /></Link>
        </article>

        <nav className="sa-season-objectives" aria-label="Season objectives and progress">
          <Link href="/app/ratings" data-objective="rating">
            <ChartNoAxesCombined aria-hidden="true" />
            <span><small>Rating lane</small><strong>{noGiRating.value.toLocaleString()} <em>{noGiRating.delta > 0 ? "+" : ""}{noGiRating.delta}</em></strong><span>Eligible results only</span></span>
            <ArrowRight aria-hidden="true" />
          </Link>
          <Link href="/app/quests" data-objective="quest">
            <Target aria-hidden="true" />
            <span><small>Current quest</small><strong>{activeQuest.title}</strong><span>{completedQuestSteps} / {activeQuest.steps.length} steps · +{activeQuest.reward.xp} private XP</span></span>
            <ArrowRight aria-hidden="true" />
          </Link>
          <Link href="/app/rewards" data-objective="journey">
            <Gift aria-hidden="true" />
            <span><small>Private journey</small><strong>Level {prototypeProgress.privateJourneyLevel}</strong><span>{prototypeProgress.privateJourneyXp.toLocaleString()} / {prototypeProgress.privateJourneyXpTarget.toLocaleString()} XP · {earnedAchievements} of {achievements.length} achievements earned</span></span>
            <ArrowRight aria-hidden="true" />
          </Link>
        </nav>
      </div>

      <footer className="sa-season-boundary">
        <span><Trophy aria-hidden="true" /> Competitive rating</span>
        <span><ShieldCheck aria-hidden="true" /> Belt identity</span>
        <span><Sparkles aria-hidden="true" /> Private journey</span>
        <span><Gift aria-hidden="true" /> Earned rewards</span>
      </footer>
    </section>
  );
}
