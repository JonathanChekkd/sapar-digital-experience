"use client";

import { useReducedMotion } from "motion/react";
import { usePrototypeState } from "./state";

export function useLowMotion(): boolean {
  const prefersReducedMotion = useReducedMotion();
  const state = usePrototypeState();
  return Boolean(prefersReducedMotion || state.preferences.lowStimulation);
}
