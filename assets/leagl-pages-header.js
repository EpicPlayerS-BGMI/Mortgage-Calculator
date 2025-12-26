document.addEventListener("DOMContentLoaded", () => {
  const footerContainer = document.getElementById("site-legal-pages-header");
  if (!footerContainer) return;

  fetch("/components/legal-pages-header.html")
    .then((res) => {
      if (!res.ok) throw new Error("legal header load failed");
      return res.text();
    })
    .then((html) => {
      footerContainer.innerHTML = html;

      // Auto update copyright year
      const yearEl = document.getElementById("year");
      if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
      }
    })
    .catch((err) => {
      console.error("legal header error:", err);
    });
});
