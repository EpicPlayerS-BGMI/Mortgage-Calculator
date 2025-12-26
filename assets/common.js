const ThemeManager = {
  init() {
    const theme = localStorage.getItem("theme");
    const isDark =
      theme === "dark" ||
      (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);
  },

  updateIcons() {
    const iconLight = document.getElementById("theme-icon-light");
    const iconDark = document.getElementById("theme-icon-dark");
    if (!iconLight || !iconDark) return;

    const isDark = document.documentElement.classList.contains("dark");
    iconLight.classList.toggle("hidden", isDark);
    iconDark.classList.toggle("hidden", !isDark);
  },

  toggle() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    this.updateIcons();
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
    initMobileMenu();
  });

  loadComponent("site-footer", "/components/footer.html", () => {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
}

window.toggleTheme = () => ThemeManager.toggle();

ThemeManager.init();

document.addEventListener("DOMContentLoaded", initApp);

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
  });
}

window.closeMobileMenu = function () {
  document.getElementById("mobileMenu")?.classList.add("-translate-x-full");
  document.getElementById("mobileOverlay")?.classList.add("hidden");
};
