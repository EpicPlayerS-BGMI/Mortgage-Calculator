"use client";

import { useEffect, useSyncExternalStore } from "react";
import { CONSENT_STORAGE_KEY, GA_MEASUREMENT_ID } from "@/lib/site";

type ConsentStatus = "accepted" | "rejected" | "unset" | "pending";

type ConsentSnapshot = {
  status: ConsentStatus;
  forceOpen: boolean;
};

const listeners = new Set<() => void>();
const SERVER_SNAPSHOT: ConsentSnapshot = { status: "pending", forceOpen: false };

let forceOpen = false;
let analyticsLoaded = false;
let clientSnapshot: ConsentSnapshot = SERVER_SNAPSHOT;

function emit() {
  listeners.forEach((listener) => listener());
}

function readConsent(): ConsentStatus {
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored === "accepted" || stored === "rejected") return stored;
  } catch {
    // Ignore blocked storage.
  }
  return "unset";
}

function getSnapshot(): ConsentSnapshot {
  const status = readConsent();
  if (clientSnapshot.status === status && clientSnapshot.forceOpen === forceOpen) {
    return clientSnapshot;
  }
  clientSnapshot = { status, forceOpen };
  return clientSnapshot;
}

function getServerSnapshot(): ConsentSnapshot {
  return SERVER_SNAPSHOT;
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  const onStorage = (event: StorageEvent) => {
    if (event.key === CONSENT_STORAGE_KEY) emit();
  };

  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function persistConsent(status: "accepted" | "rejected") {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, status);
  } catch {
    // Ignore blocked storage.
  }
  forceOpen = false;
  emit();
}

export function openConsentPreferences() {
  forceOpen = true;
  emit();
}

function loadAnalytics() {
  if (typeof window === "undefined" || analyticsLoaded) return;
  if (typeof window.gtag === "function") {
    analyticsLoaded = true;
    return;
  }

  const gaScript = document.createElement("script");
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(gaScript);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);
  analyticsLoaded = true;
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function ConsentBanner() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const visible = snapshot.forceOpen || snapshot.status === "unset";

  useEffect(() => {
    if (snapshot.status === "accepted") loadAnalytics();
  }, [snapshot.status]);

  if (!visible) return null;

  return (
    <div
      id="consent-banner"
      className="fixed inset-x-0 bottom-0 z-[70] px-4 pb-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
              Cookie Preferences
            </p>
            <h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
              Privacy choices for CalcBase
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              CalcBase stores theme, currency, and consent preferences on your device.
              Calculator inputs stay in your browser. We use Google AdSense to keep
              tools free, and with your permission we also load Google Analytics to
              improve content. You can continue with essential preferences only, or
              allow analytics as well.
            </p>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              See our{" "}
              <a
                href="/privacy/"
                className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
              >
                Privacy Policy
              </a>{" "}
              for AdSense, cookies, and opt-out options. Manage ads at{" "}
              <a
                href="https://www.google.com/settings/ads"
                className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                rel="noopener noreferrer"
                target="_blank"
              >
                Google Ads Settings
              </a>
              .
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => persistConsent("rejected")}
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Essential Only
            </button>
            <button
              type="button"
              onClick={() => {
                persistConsent("accepted");
                loadAnalytics();
              }}
              className="rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Allow Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
