window.CalcBasePageTemplate = {
  init(config) {
    const state = {
      currency: window.CalcBaseCalculator.detectCurrency(),
      config,
    };

    const activeCurrencyClass =
      "rounded-lg bg-white px-4 py-2 text-xs font-bold text-indigo-600 shadow-sm transition dark:bg-slate-700 dark:text-white";
    const inactiveCurrencyClass =
      "rounded-lg px-4 py-2 text-xs font-bold text-slate-500 transition hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400";

    const ids = {
      amount: "calc-amount",
      rate: "calc-rate",
      tenure: "calc-tenure",
      monthly: "result-monthly",
      interest: "result-interest",
      total: "result-total",
      chart: "result-chart",
      message: "calc-validation-message",
      symbol: "currency-symbol",
    };

    const format = (value) =>
      window.CalcBaseCalculator.formatMoney(value, state.currency);

    const setCurrency = (nextCurrency, shouldPersist = true) => {
      state.currency = shouldPersist
        ? window.CalcBaseCalculator.setCurrencyPreference(nextCurrency)
        : nextCurrency;
      const c = window.CalcBaseCalculator.getCurrencyConfig(state.currency);
      const symbol = document.getElementById(ids.symbol);
      if (symbol) symbol.textContent = c.symbol;

      window.CalcBaseCalculator.applyButtonState(
        ["btn-usd", "btn-gbp", "btn-inr"],
        `btn-${state.currency.toLowerCase()}`,
        activeCurrencyClass,
        inactiveCurrencyClass
      );
      recalculate();
    };

    const recalculate = () => {
      const v = window.CalcBaseValidation;
      const amount = v.readField(ids.amount, { min: 1, max: 1000000000 });
      const rate = v.readField(ids.rate, { min: 0, max: 40, allowZero: true });
      const tenure = v.readField(ids.tenure, { min: 1, max: 600 });

      if (!amount.valid || !rate.valid || !tenure.valid) {
        v.setMessage(
          ids.message,
          "Enter valid inputs: amount > 0, rate between 0% and 40%, tenure between 1 and 600 months."
        );
      } else {
        v.setMessage(ids.message, "");
      }

      const output = state.config.calculate({
        amount: amount.value,
        annualRate: rate.value,
        tenureMonths: tenure.value,
      });

      document.getElementById(ids.monthly).textContent = format(output.monthlyPayment);
      document.getElementById(ids.interest).textContent = format(output.totalInterest);
      document.getElementById(ids.total).textContent = format(output.totalPayment);

      const share = output.totalPayment > 0 ? (output.totalInterest / output.totalPayment) * 100 : 0;
      const chart = document.getElementById(ids.chart);
      if (chart) {
        chart.style.background = `conic-gradient(#ffffff ${share}%, rgba(255,255,255,0.3) ${share}% 100%)`;
      }
    };

    window.CalcBaseCalculator.bindAutoUpdate(
      [`#${ids.amount}`, `#${ids.rate}`, `#${ids.tenure}`],
      recalculate
    );

    document.getElementById("btn-usd")?.addEventListener("click", () => setCurrency("USD"));
    document.getElementById("btn-gbp")?.addEventListener("click", () => setCurrency("GBP"));
    document.getElementById("btn-inr")?.addEventListener("click", () => setCurrency("INR"));
    document.addEventListener("calcbase:currencychange", (event) => {
      const selected = event?.detail?.currency;
      if (selected) {
        state.currency = selected;
        setCurrency(selected, false);
      }
    });

    setCurrency(state.currency);
  },
};
