window.CalcBaseValidation = {
  sanitizeNumber(value, fallback = 0) {
    const num = Number(value);
    return Number.isFinite(num) ? num : fallback;
  },

  clamp(value, min, max) {
    const num = this.sanitizeNumber(value, min);
    return Math.min(Math.max(num, min), max);
  },

  readField(id, options = {}) {
    const {
      min = 0,
      max = Number.MAX_SAFE_INTEGER,
      allowZero = false,
      fallback = 0,
    } = options;
    const element = document.getElementById(id);
    const raw = element ? element.value : fallback;
    const parsed = this.sanitizeNumber(raw, fallback);

    if (!Number.isFinite(parsed)) {
      return { valid: false, value: fallback };
    }

    if (!allowZero && parsed <= 0) {
      return { valid: false, value: fallback };
    }

    if (parsed < min || parsed > max) {
      return { valid: false, value: this.clamp(parsed, min, max) };
    }

    return { valid: true, value: parsed };
  },

  setMessage(id, message) {
    const element = document.getElementById(id);
    if (!element) return;
    element.textContent = message || "";
    element.classList.toggle("hidden", !message);
  },
};
