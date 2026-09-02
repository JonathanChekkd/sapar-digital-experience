"use client";

import type { ReactNode } from "react";
import { SaparAppShell, type AppView } from "./sapar-app/shell";
import {
  DiscoverView,
  NetworkView,
  OnboardingView,
  ProfileView,
  PulseView,
} from "./sapar-app/views-primary";
import {
  ArenaView,
  CompeteView,
  LeaderboardsView,
  RatingsView,
  ReplayView,
} from "./sapar-app/views-competition";
import {
  CreateView,
  GymsView,
  NotificationsView,
  QuestsView,
  RewardsView,
  SettingsView,
} from "./sapar-app/views-support";

export type { AppView } from "./sapar-app/shell";

const views: Record<AppView, ReactNode> = {
  pulse: <PulseView />,
  profile: <ProfileView />,
  competitions: <CompeteView />,
  compete: <CompeteView />,
  arena: <ArenaView />,
  replay: <ReplayView />,
  ratings: <RatingsView />,
  gyms: <GymsView />,
  rewards: <RewardsView />,
  create: <CreateView />,
  discover: <DiscoverView />,
  notifications: <NotificationsView />,
  settings: <SettingsView />,
  onboarding: <OnboardingView />,
  leaderboards: <LeaderboardsView />,
  network: <NetworkView />,
  quests: <QuestsView />,
};

export function AppExperience({ view }: { readonly view: AppView }): ReactNode {
  return <SaparAppShell view={view}>{views[view]}</SaparAppShell>;
}
