/** Shared HTML builders for CalcBase blog expansion. */

export const bodyClass = "text-lg text-slate-600 dark:text-slate-400 leading-relaxed space-y-6";

export function section(title, innerHtml, { h3 = false } = {}) {
  const Tag = h3 ? "h3" : "h2";
  const titleClass = h3
    ? "text-2xl font-bold mb-4 text-slate-900 dark:text-white"
    : "text-3xl font-bold mb-6 text-slate-900 dark:text-white";
  return `
      <section class="mb-14">
        <${Tag} class="${titleClass}">${title}</${Tag}>
        <div class="${bodyClass}">
${innerHtml}
        </div>
      </section>`;
}

export function paras(...texts) {
  return texts.map((t) => `          <p>${t}</p>`).join("\n");
}

export function ul(items) {
  return `          <ul class="list-disc pl-6 space-y-3">
${items.map((i) => `            <li>${i}</li>`).join("\n")}
          </ul>`;
}

export function calcLinks(links) {
  const items = links.map(
    ([href, label]) =>
      `<a href="${href}" class="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">${label}</a>`
  );
  return paras(
    `For hands-on numbers while you read, try these CalcBase tools: ${items.join(", ")}. Recalculate whenever your income, rates, or goals change so decisions stay grounded in current figures rather than guesswork.`
  );
}

export function mistakes(items) {
  return (
    paras(
      "Even careful planners slip into habits that quietly undo progress. Watch for these common mistakes and correct them early:"
    ) +
    "\n" +
    ul(items)
  );
}

export function faqs(pairs) {
  const blocks = pairs
    .map(
      ([q, a]) => `          <details class="pro-card p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40">
            <summary class="font-bold text-slate-900 dark:text-white cursor-pointer">${q}</summary>
            <p class="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">${a}</p>
          </details>`
    )
    .join("\n");
  return `
      <section class="mb-14">
        <h2 class="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Frequently Asked Questions</h2>
        <div class="space-y-4">
${blocks}
        </div>
      </section>`;
}

export function disclaimer(topicLine) {
  return `
      <section class="mb-14">
        <h2 class="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Educational Disclaimer</h2>
        <div class="${bodyClass}">
          <p>${topicLine} CalcBase provides calculators and educational articles for general learning only. Nothing here is personalized financial, tax, legal, or investment advice. Rules, rates, tax treatment, and product features differ by country and change over time. Confirm figures with a qualified professional and your lender, broker, or adviser before you act.</p>
        </div>
      </section>`;
}

export function assemble({ intro, sections, links, mistakeItems, faqPairs, disclaimerLine }) {
  const parts = [];
  parts.push(section(intro.title, paras(...intro.paras) + (intro.extra || "")));
  for (const s of sections) {
    let inner = paras(...s.paras);
    if (s.list) inner += "\n" + ul(s.list);
    if (s.extra) inner += "\n" + s.extra;
    parts.push(section(s.title, inner, { h3: !!s.h3 }));
  }
  parts.push(section("Useful CalcBase Calculators", calcLinks(links)));
  parts.push(section("Common Mistakes to Avoid", mistakes(mistakeItems)));
  parts.push(faqs(faqPairs));
  parts.push(disclaimer(disclaimerLine));
  return parts.join("\n");
}
