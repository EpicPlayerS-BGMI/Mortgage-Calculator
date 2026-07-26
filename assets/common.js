const ThemeManager = {
  key: "theme",
  mediaQuery: window.matchMedia("(prefers-color-scheme: dark)"),

  getSavedTheme() {
    try {
      const value = localStorage.getItem(this.key);
      if (value === "light" || value === "dark") return value;
      return null;
    } catch (_) {
      return null;
    }
  },

  applyTheme(theme) {
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
    return isDark;
  },

  init() {
    const saved = this.getSavedTheme();
    const resolvedTheme = saved || (this.mediaQuery.matches ? "dark" : "light");
    this.applyTheme(resolvedTheme);
    this.updateIcons();

    if (!this.mediaListenerAdded) {
      this.mediaQuery.addEventListener("change", (event) => {
        // Follow system only when user has not explicitly chosen.
        if (this.getSavedTheme()) return;
        this.applyTheme(event.matches ? "dark" : "light");
        this.updateIcons();
      });
      this.mediaListenerAdded = true;
    }
  },

  updateIcons() {
    const iconLight = document.getElementById("theme-icon-light");
    const iconDark = document.getElementById("theme-icon-dark");
    const toggle = document.getElementById("theme-toggle");
    if (!iconLight || !iconDark) return;

    const isDark = document.documentElement.classList.contains("dark");
    iconLight.classList.toggle("hidden", isDark);
    iconDark.classList.toggle("hidden", !isDark);
    if (toggle) {
      toggle.setAttribute("aria-pressed", isDark ? "true" : "false");
      toggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );
    }
  },

  toggle() {
    const nextTheme = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";
    const isDark = this.applyTheme(nextTheme);
    try {
      localStorage.setItem(this.key, nextTheme);
    } catch (_) {
      // Ignore storage errors and keep runtime theme.
    }
    this.updateIcons();
    return isDark;
  },
};

const ConsentManager = {
  key: "calcbase_cookie_consent_v1",
  analyticsLoaded: false,
  state: null,

  init() {
    this.state = localStorage.getItem(this.key);

    if (this.state === "accepted") {
      this.loadAnalytics();
    }

    this.renderBanner();
  },

  renderBanner(forceOpen = false) {
    if (!document.body) return;

    const existing = document.getElementById("consent-banner");
    if (existing) existing.remove();

    if (this.state && !forceOpen) return;

    const wrapper = document.createElement("div");
    wrapper.id = "consent-banner";
    wrapper.className =
      "fixed inset-x-0 bottom-0 z-[70] px-4 pb-4 sm:px-6 lg:px-8";
    wrapper.innerHTML = `
      <div class="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div class="max-w-3xl">
            <p class="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
              Cookie Preferences
            </p>
            <h2 class="mt-1 text-lg font-bold text-slate-900 dark:text-white">
              Privacy choices for CalcBase
            </h2>
            <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              CalcBase stores theme, currency, and consent preferences on your device.
              Calculator inputs stay in your browser. We use Google AdSense to keep
              tools free, and with your permission we also load Google Analytics to
              improve content. You can continue with essential preferences only, or
              allow analytics as well.
            </p>
            <p class="mt-2 text-xs text-slate-500 dark:text-slate-400">
              See our
              <a href="/privacy/" class="font-semibold text-indigo-600 hover:underline dark:text-indigo-400">Privacy Policy</a>
              for AdSense, cookies, and opt-out options. Manage ads at
              <a href="https://www.google.com/settings/ads" class="font-semibold text-indigo-600 hover:underline dark:text-indigo-400" rel="noopener noreferrer" target="_blank">Google Ads Settings</a>.
            </p>
          </div>
          <div class="flex flex-col gap-2 sm:flex-row">
            <button
              id="consent-essential"
              type="button"
              class="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Essential Only
            </button>
            <button
              id="consent-accept"
              type="button"
              class="rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Allow Analytics
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(wrapper);

    document
      .getElementById("consent-essential")
      ?.addEventListener("click", () => this.reject());
    document
      .getElementById("consent-accept")
      ?.addEventListener("click", () => this.accept());
  },

  closeBanner() {
    document.getElementById("consent-banner")?.remove();
  },

  accept() {
    this.state = "accepted";
    localStorage.setItem(this.key, this.state);
    this.closeBanner();
    this.loadAnalytics();
  },

  reject() {
    this.state = "rejected";
    localStorage.setItem(this.key, this.state);
    this.closeBanner();
  },

  openPreferences() {
    this.renderBanner(true);
  },

  loadAnalytics() {
    if (this.analyticsLoaded || window.gtag) return;

    const gaScript = document.createElement("script");
    gaScript.async = true;
    gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-SXPYPJYBB2";
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", "G-SXPYPJYBB2");
    this.analyticsLoaded = true;
  },
};

const CalcBaseCalculator = {
  currencyMap: {
    USD: { code: "USD", locale: "en-US", symbol: "$" },
    GBP: { code: "GBP", locale: "en-GB", symbol: "£" },
    INR: { code: "INR", locale: "en-IN", symbol: "₹" },
  },

  detectCurrency() {
    const saved = localStorage.getItem("calcbase_currency");
    if (saved && this.currencyMap[saved]) {
      return saved;
    }

    const lang = (navigator.language || "").toLowerCase();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";

    if (
      lang.includes("in") ||
      timezone === "Asia/Kolkata" ||
      timezone === "Asia/Calcutta"
    ) {
      return "INR";
    }

    if (lang.includes("gb") || timezone === "Europe/London") {
      return "GBP";
    }

    return "USD";
  },

  setCurrencyPreference(type) {
    const selected = this.currencyMap[type] ? type : "USD";
    const previous = localStorage.getItem("calcbase_currency");
    localStorage.setItem("calcbase_currency", selected);
    if (previous !== selected) {
      document.dispatchEvent(
        new CustomEvent("calcbase:currencychange", {
          detail: { currency: selected },
        })
      );
    }
    return selected;
  },

  getCurrencyConfig(type) {
    return this.currencyMap[type] || this.currencyMap.USD;
  },

  formatMoney(value, type, maximumFractionDigits = 0) {
    const config = this.getCurrencyConfig(type);
    return new Intl.NumberFormat(config.locale, {
      style: "currency",
      currency: config.code,
      maximumFractionDigits,
    }).format(Number.isFinite(value) ? value : 0);
  },

  applyButtonState(buttonIds, activeId, activeClass, inactiveClass) {
    buttonIds.forEach((id) => {
      const button = document.getElementById(id);
      if (!button) return;
      button.className = id === activeId ? activeClass : inactiveClass;
    });
  },

  updateText(selector, value) {
    document.querySelectorAll(selector).forEach((node) => {
      node.innerText = value;
    });
  },

  bindAutoUpdate(selectors, callback) {
    selectors.forEach((selector) => {
      const element =
        typeof selector === "string"
          ? document.querySelector(selector)
          : selector;

      if (!element) return;
      element.addEventListener("input", callback);
      element.addEventListener("change", callback);
    });
  },
};

async function loadComponent(id, path, callback) {
  const container = document.getElementById(id);
  if (!container) return;

  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to load ${path}`);
    container.innerHTML = await response.text();
    if (callback) callback();
  } catch (err) {
    console.error(`Component Error [${id}]:`, err);
  }
}

function initApp() {
  loadComponent("calcpages-header", "/components/calcpages-header.html", () => {
    ThemeManager.updateIcons();
    HeaderManager.init();
  });

  loadComponent("site-footer", "/components/footer.html", () => {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
}

window.toggleTheme = () => ThemeManager.toggle();
window.openConsentPreferences = () => ConsentManager.openPreferences();
window.CalcBaseCalculator = CalcBaseCalculator;

ThemeManager.init();

const ScrollReveal = {
  observer: null,

  init() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          // Optionally unobserve after animating once
          // this.observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll(".reveal").forEach((el) => {
      this.observer.observe(el);
    });
  },

  refresh() {
    document.querySelectorAll(".reveal").forEach((el) => {
      this.observer.observe(el);
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initApp();
  ScrollReveal.init();
  ConsentManager.init();
});

if (window.tailwind) {
  tailwind.config = { darkMode: "class" };
}

function initMobileMenu() {
  const hamMenu = document.getElementById("hamMenu");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileOverlay = document.getElementById("mobileOverlay");

  if (!hamMenu || !mobileMenu || !mobileOverlay) return;

  hamMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("-translate-x-full");
    mobileOverlay.classList.remove("hidden");
    hamMenu.setAttribute("aria-expanded", "true");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      window.closeMobileMenu();
    }
  });
}

window.closeMobileMenu = function () {
  document.getElementById("mobileMenu")?.classList.add("-translate-x-full");
  document.getElementById("mobileOverlay")?.classList.add("hidden");
  document.getElementById("hamMenu")?.setAttribute("aria-expanded", "false");
};

const HeaderManager = {
  init() {
    this.initActiveLinks();
    this.initCurrencySelector();
    this.initDesktopDropdown();
    initMobileMenu();
  },

  initActiveLinks() {
    const path = window.location.pathname;
    const links = document.querySelectorAll("[data-nav-link]");
    links.forEach((link) => {
      const href = link.getAttribute("href") || "/";
      const isHomeLink = href === "/";
      const active = isHomeLink
        ? path === "/" || path === "/index.html"
        : path.startsWith(href);
      if (active) {
        link.classList.add(
          "bg-indigo-50",
          "text-indigo-700",
          "dark:bg-slate-800",
          "dark:text-indigo-300"
        );
        link.setAttribute("aria-current", "page");
      }
    });
  },

  initCurrencySelector() {
    const desktop = document.getElementById("header-currency");
    const mobile = document.getElementById("header-currency-mobile");
    const initial = CalcBaseCalculator.detectCurrency();
    const applyValue = (value) => {
      if (desktop) desktop.value = value;
      if (mobile) mobile.value = value;
    };

    applyValue(initial);

    const onChange = (event) => {
      const selected = CalcBaseCalculator.setCurrencyPreference(event.target.value);
      applyValue(selected);
    };

    desktop?.addEventListener("change", onChange);
    mobile?.addEventListener("change", onChange);

    document.addEventListener("calcbase:currencychange", (event) => {
      const selected = event?.detail?.currency || CalcBaseCalculator.detectCurrency();
      applyValue(selected);
    });
  },

  initDesktopDropdown() {
    const trigger = document.getElementById("desktop-calculators-trigger");
    const menu = document.getElementById("desktop-calculators-menu");
    const wrapper = trigger?.closest('[data-dropdown="calculators"]');
    if (!trigger || !menu || !wrapper) return;

    const openMenu = () => {
      trigger.setAttribute("aria-expanded", "true");
      menu.classList.remove("invisible", "opacity-0", "pointer-events-none");
      menu.classList.add("visible", "opacity-100", "pointer-events-auto");
    };

    const closeMenu = () => {
      trigger.setAttribute("aria-expanded", "false");
      menu.classList.add("invisible", "opacity-0", "pointer-events-none");
      menu.classList.remove("visible", "opacity-100", "pointer-events-auto");
    };

    trigger.addEventListener("click", () => {
      const expanded = trigger.getAttribute("aria-expanded") === "true";
      if (expanded) closeMenu();
      else openMenu();
    });

    wrapper.addEventListener("mouseenter", openMenu);
    wrapper.addEventListener("mouseleave", closeMenu);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (!wrapper.contains(event.target)) {
        closeMenu();
      }
    });
  },
};

const FaqManager = {
  init() {
    const faqSections = document.querySelectorAll("#faq, [data-faq-section]");
    faqSections.forEach((section) => {
      section.classList.add("faq-unified");
      const container =
        section.querySelector(".space-y-4, .space-y-3, .space-y-5, .space-y-6") ||
        section;
      container.classList.add("faq-list");
      container
        .querySelectorAll("details")
        .forEach((item) => item.classList.add("faq-item"));
    });
  },
};

const CurrencyUiSync = {
  selectors: [".currencySymbol", ".sym", "#currencySymbol", "#currency-symbol"],

  apply(currency) {
    const selected = CalcBaseCalculator.getCurrencyConfig(currency).code;
    const symbol = CalcBaseCalculator.getCurrencyConfig(selected).symbol;
    this.selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((node) => {
        node.textContent = symbol;
      });
    });
  },

  init() {
    this.apply(CalcBaseCalculator.detectCurrency());
    document.addEventListener("calcbase:currencychange", (event) => {
      const selected = event?.detail?.currency || CalcBaseCalculator.detectCurrency();
      this.apply(selected);
    });
  },
};

/* ContentQualityManager removed: AdSense reviewers need unique static HTML content,
   not identical JavaScript-injected filler across calculator and blog pages. */

const CalculatorUiManager = {
  shouldApply(pathname) {
    return pathname.includes("-calculator/");
  },

  getLayout(main) {
    return (
      main.querySelector(".grid.lg\\:grid-cols-2") ||
      main.querySelector(".grid.lg\\:grid-cols-12") ||
      main.querySelector(".grid.xl\\:grid-cols-12")
    );
  },

  getCardChildren(layout) {
    return Array.from(layout.children).filter(
      (node) => node.tagName === "SECTION" || node.tagName === "ASIDE" || node.tagName === "DIV" || node.tagName === "ARTICLE"
    );
  },

  standardizeLayout(main) {
    const layout = this.getLayout(main);
    if (!layout) return;

    layout.classList.add("calc-layout", "calculator-grid");

    const [inputCard, resultCard] = this.getCardChildren(layout);
    if (inputCard) inputCard.classList.add("calc-input-card", "calculator-card");
    if (resultCard) resultCard.classList.add("calc-result-card", "calculator-card");
  },

  standardizeCurrencyInputs(main) {
    // Only normalize true input prefixes (symbol inside .absolute next to an input).
    // Do not touch decorative/result .currencySymbol text nodes — that breaks layouts.
    main.querySelectorAll(".sym, .currencySymbol, #currency-symbol").forEach((symbolEl) => {
      const absoluteWrap = symbolEl.closest(".absolute");
      if (!absoluteWrap) return;

      const container = absoluteWrap.parentElement;
      if (!container || !container.classList.contains("relative")) return;

      const input = container.querySelector(
        "input[type='number'], input[type='text'], input:not([type])"
      );
      if (!input) return;

      container.classList.add("input-group");
      symbolEl.classList.add("currency-symbol");
      input.classList.add("currency-input");
      input.setAttribute("inputmode", "decimal");
    });
  },

  init() {
    const pathname = (window.location.pathname || "").replace(/\/index\.html$/, "/");
    if (!this.shouldApply(pathname)) return;

    document.body.classList.add("calculator-page");
    const main = document.querySelector("main");
    if (!main) return;
    this.standardizeLayout(main);
    this.standardizeCurrencyInputs(main);
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const path = (window.location.pathname || "").replace(/\/index\.html$/, "/");
  if (path.startsWith("/blogs/")) {
    document.body.classList.add("blog-page");
  }
  FaqManager.init();
  CurrencyUiSync.init();
  CalculatorUiManager.init();
});
