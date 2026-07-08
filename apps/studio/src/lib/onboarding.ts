import { useSyncExternalStore } from "react";

export type OnboardingState = {
  storeName: string;
  sellingStatus: "online" | "past" | "new" | "";
  revenue: "none" | "under10k" | "10k-100k" | "100k+" | "";
  productType: "physical" | "digital" | "services" | "unsure" | "";
  channels: string[];
  email: string;
};

const KEY = "kiln.onboarding.v1";
const empty: OnboardingState = {
  storeName: "",
  sellingStatus: "",
  revenue: "",
  productType: "",
  channels: [],
  email: "",
};

let state: OnboardingState = empty;
const listeners = new Set<() => void>();
let hydrated = false;

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) state = { ...empty, ...JSON.parse(raw) };
  } catch {}
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
}

export function setOnboarding(patch: Partial<OnboardingState>) {
  hydrate();
  state = { ...state, ...patch };
  persist();
  listeners.forEach((l) => l());

  // Sync to backend if authenticated
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("kiln.auth.token");
    if (token) {
      fetch("/api/user/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ onboarding: patch }),
      }).catch((err) => console.error("Failed to sync onboarding state:", err));
    }
  }
}

export function resetOnboarding() {
  state = empty;
  persist();
  listeners.forEach((l) => l());
  
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("kiln.auth.token");
    window.localStorage.removeItem("kiln.auth.user");
  }
}

export async function syncProfileFromServer() {
  if (typeof window === "undefined") return;
  const token = window.localStorage.getItem("kiln.auth.token");
  if (!token) return;

  try {
    const res = await fetch("/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.user?.onboarding) {
        state = { ...state, ...data.user.onboarding };
        persist();
        listeners.forEach((l) => l());
      }
    }
  } catch (err) {
    console.error("Failed to sync profile from server:", err);
  }
}

export function useOnboarding(): OnboardingState {
  hydrate();
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
    () => empty,
  );
}