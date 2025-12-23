document.addEventListener("DOMContentLoaded", () => {
  const footerContainer = document.getElementById("site-footer");
  if (!footerContainer) return;

  fetch("/footer.html")
    .then((res) => {
      if (!res.ok) throw new Error("Footer load failed");
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
      console.error("Footer error:", err);
    });
});
