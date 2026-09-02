"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type Dispatch,
  type ReactNode,
} from "react";
import type { GymSessionId } from "@/lib/sapar-prototype";

export type SheetKind =
  | "create"
  | "scope"
  | "search"
  | "proof"
  | "registration"
  | "booking"
  | "share"
  | "report"
  | null;

export type Connectivity = "online" | "offline" | "error";

export interface PrototypePreferences {
  readonly lowStimulation: boolean;
  readonly reducedSound: boolean;
  readonly privateJourney: boolean;
  readonly activityVisible: boolean;
  readonly notificationsEnabled: boolean;
}

export interface PrototypeState {
  readonly likedPostIds: readonly string[];
  readonly savedPostIds: readonly string[];
  readonly followedAthleteIds: readonly string[];
  readonly registeredEventIds: readonly string[];
  readonly bookedSessionIds: readonly string[];
  readonly readNotificationIds: readonly string[];
  readonly blockedAthleteIds: readonly string[];
  readonly preferences: PrototypePreferences;
  readonly activeSheet: SheetKind;
  readonly selectedProofId: string | null;
  readonly selectedGymSessionId: GymSessionId | null;
  readonly connectivity: Connectivity;
  readonly toast: string | null;
}

export type PrototypeAction =
  | { readonly type: "toggle-like"; readonly id: string }
  | { readonly type: "toggle-save"; readonly id: string }
  | { readonly type: "toggle-follow"; readonly id: string }
  | { readonly type: "register-event"; readonly id: string }
  | { readonly type: "book-session"; readonly id: string }
  | { readonly type: "read-notification"; readonly id: string }
  | { readonly type: "block-athlete"; readonly id: string }
  | { readonly type: "set-preference"; readonly key: keyof PrototypePreferences; readonly value: boolean }
  | {
      readonly type: "open-sheet";
      readonly sheet: Exclude<SheetKind, null>;
      readonly proofId?: string;
      readonly gymSessionId?: GymSessionId;
    }
  | { readonly type: "close-sheet" }
  | { readonly type: "set-connectivity"; readonly connectivity: Connectivity }
  | { readonly type: "toast"; readonly message: string | null }
  | { readonly type: "hydrate-preferences"; readonly preferences: PrototypePreferences };

const defaultPreferences: PrototypePreferences = {
  lowStimulation: false,
  reducedSound: true,
  privateJourney: true,
  activityVisible: true,
  notificationsEnabled: true,
};

const initialState: PrototypeState = {
  likedPostIds: [],
  savedPostIds: [],
  followedAthleteIds: [],
  registeredEventIds: [],
  bookedSessionIds: [],
  readNotificationIds: [],
  blockedAthleteIds: [],
  preferences: defaultPreferences,
  activeSheet: null,
  selectedProofId: null,
  selectedGymSessionId: null,
  connectivity: "online",
  toast: null,
};

function toggleId(values: readonly string[], id: string): readonly string[] {
  return values.includes(id) ? values.filter((value) => value !== id) : [...values, id];
}

function addId(values: readonly string[], id: string): readonly string[] {
  return values.includes(id) ? values : [...values, id];
}

function reducer(state: PrototypeState, action: PrototypeAction): PrototypeState {
  switch (action.type) {
    case "toggle-like":
      return { ...state, likedPostIds: toggleId(state.likedPostIds, action.id) };
    case "toggle-save":
      return { ...state, savedPostIds: toggleId(state.savedPostIds, action.id) };
    case "toggle-follow":
      return { ...state, followedAthleteIds: toggleId(state.followedAthleteIds, action.id) };
    case "register-event":
      return {
        ...state,
        registeredEventIds: addId(state.registeredEventIds, action.id),
        activeSheet: null,
        selectedProofId: null,
        selectedGymSessionId: null,
        toast: "Registration preview saved locally. Nothing was submitted.",
      };
    case "book-session":
      return {
        ...state,
        bookedSessionIds: addId(state.bookedSessionIds, action.id),
        activeSheet: null,
        selectedProofId: null,
        selectedGymSessionId: null,
        toast: "Booking preview saved locally. No reservation or payment was made.",
      };
    case "read-notification":
      return { ...state, readNotificationIds: addId(state.readNotificationIds, action.id) };
    case "block-athlete":
      return {
        ...state,
        blockedAthleteIds: addId(state.blockedAthleteIds, action.id),
        activeSheet: null,
        selectedProofId: null,
        selectedGymSessionId: null,
        toast: "This synthetic profile is now hidden in the local prototype.",
      };
    case "set-preference":
      return { ...state, preferences: { ...state.preferences, [action.key]: action.value } };
    case "open-sheet":
      return {
        ...state,
        activeSheet: action.sheet,
        selectedProofId: action.proofId ?? null,
        selectedGymSessionId: action.gymSessionId ?? null,
      };
    case "close-sheet":
      return {
        ...state,
        activeSheet: null,
        selectedProofId: null,
        selectedGymSessionId: null,
      };
    case "set-connectivity":
      return { ...state, connectivity: action.connectivity };
    case "toast":
      return { ...state, toast: action.message };
    case "hydrate-preferences":
      return { ...state, preferences: action.preferences };
  }
}

const StateContext = createContext<PrototypeState | null>(null);
const DispatchContext = createContext<Dispatch<PrototypeAction> | null>(null);

const storageKey = "sapar-prototype-preferences-v1";

function removeStoredPreferences(): void {
  try {
    window.localStorage.removeItem(storageKey);
  } catch {
    // Browser privacy settings can make local storage unavailable.
  }
}

function isPreferences(value: unknown): value is PrototypePreferences {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.lowStimulation === "boolean" &&
    typeof candidate.reducedSound === "boolean" &&
    typeof candidate.privateJourney === "boolean" &&
    typeof candidate.activityVisible === "boolean" &&
    typeof candidate.notificationsEnabled === "boolean"
  );
}

export function PrototypeProvider({ children }: { readonly children: ReactNode }): ReactNode {
  const [state, dispatch] = useReducer(reducer, initialState);
  const canPersistPreferences = useRef(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return;
      const stored: unknown = JSON.parse(raw);
      if (isPreferences(stored)) {
        dispatch({ type: "hydrate-preferences", preferences: stored });
      }
    } catch {
      removeStoredPreferences();
    }
  }, []);

  useEffect(() => {
    if (!canPersistPreferences.current) {
      canPersistPreferences.current = true;
      return;
    }
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(state.preferences));
    } catch {
      // Preferences remain usable for this session when persistence is blocked.
    }
  }, [state.preferences]);

  useEffect(() => {
    if (!state.toast) return;
    const timeout = window.setTimeout(() => dispatch({ type: "toast", message: null }), 4200);
    return () => window.clearTimeout(timeout);
  }, [state.toast]);

  const stableState = useMemo(() => state, [state]);

  return (
    <StateContext.Provider value={stableState}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export function usePrototypeState(): PrototypeState {
  const context = useContext(StateContext);
  if (!context) throw new Error("usePrototypeState must be used inside PrototypeProvider");
  return context;
}

export function usePrototypeDispatch(): Dispatch<PrototypeAction> {
  const context = useContext(DispatchContext);
  if (!context) throw new Error("usePrototypeDispatch must be used inside PrototypeProvider");
  return context;
}
