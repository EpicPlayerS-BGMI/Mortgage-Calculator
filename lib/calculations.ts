function monthlyRate(annualRate: number) {
  return annualRate / 100 / 12;
}

/** Reducing-balance EMI used by mortgage, EMI, personal loan, and car loan tools. */
export function calculateEmi(principal: number, annualRate: number, months: number) {
  if (principal <= 0 || months <= 0) {
    return { monthlyPayment: 0, totalPayment: 0, totalInterest: 0 };
  }

  const rate = monthlyRate(annualRate);
  const monthlyPayment =
    rate === 0
      ? principal / months
      : (principal * rate * (1 + rate) ** months) / ((1 + rate) ** months - 1);

  const totalPayment = monthlyPayment * months;
  return {
    monthlyPayment,
    totalPayment,
    totalInterest: totalPayment - principal,
  };
}

/** SIP future value: FV = P × [((1+r)^n − 1) / r] × (1+r) */
export function calculateSip(monthlyAmount: number, annualRate: number, years: number) {
  const months = years * 12;
  const rate = monthlyRate(annualRate);

  if (monthlyAmount <= 0 || months <= 0) {
    return { futureValue: 0, invested: 0, returns: 0 };
  }

  const invested = monthlyAmount * months;
  const futureValue =
    rate === 0
      ? invested
      : monthlyAmount * (((1 + rate) ** months - 1) / rate) * (1 + rate);

  return {
    futureValue,
    invested,
    returns: futureValue - invested,
  };
}

/** Quarterly compounded FD: FV = P × (1 + r/n)^(n×t) */
export function calculateFd(principal: number, annualRate: number, years: number) {
  const compounding = 4;

  if (principal <= 0 || years <= 0) {
    return { maturityValue: 0, interest: 0 };
  }

  const maturityValue = principal * (1 + annualRate / 100 / compounding) ** (compounding * years);
  return {
    maturityValue,
    interest: maturityValue - principal,
  };
}

export function calculateInflation(amount: number, annualRate: number, years: number) {
  if (amount <= 0 || years <= 0) {
    return { futureCost: 0, purchasingPower: 0, lossPercent: 0, retainedPercent: 0 };
  }

  const factor = (1 + annualRate / 100) ** years;
  const futureCost = amount * factor;
  const purchasingPower = amount / factor;
  const lossPercent = ((amount - purchasingPower) / amount) * 100;

  return {
    futureCost,
    purchasingPower,
    lossPercent,
    retainedPercent: 100 - lossPercent,
  };
}

/** Lump sum growth plus monthly SIP contributions. */
export function calculateInvestment(
  initial: number,
  monthly: number,
  annualRate: number,
  years: number,
) {
  const rate = monthlyRate(annualRate);
  const months = years * 12;

  const lump = initial > 0 ? initial * (1 + rate) ** months : 0;
  let sip = 0;

  if (monthly > 0 && rate > 0) {
    sip = monthly * (((1 + rate) ** months - 1) / rate) * (1 + rate);
  } else if (monthly > 0) {
    sip = monthly * months;
  }

  const totalValue = lump + sip;
  const invested = initial + monthly * months;

  return {
    totalValue,
    invested,
    interest: totalValue - invested,
  };
}

/** Reverse EMI: max loan from 50% FOIR capacity. */
export function calculateEligibility(
  income: number,
  existingEmi: number,
  annualRate: number,
  years: number,
) {
  const maxCapacity = income * 0.5;

  if (income <= 0) {
    return {
      principal: 0,
      maxEmi: 0,
      totalInterest: 0,
      existingPercent: 0,
      capacityPercent: 0,
      overLimit: false,
    };
  }

  if (existingEmi > maxCapacity) {
    return {
      principal: 0,
      maxEmi: 0,
      totalInterest: 0,
      existingPercent: 100,
      capacityPercent: 0,
      overLimit: true,
    };
  }

  const maxEmi = maxCapacity - existingEmi;
  const existingPercent = Math.min((existingEmi / income) * 100, 100);
  const capacityPercent = Math.min((maxEmi / income) * 100, 50);

  if (maxEmi <= 0 || years <= 0) {
    return {
      principal: 0,
      maxEmi,
      totalInterest: 0,
      existingPercent,
      capacityPercent,
      overLimit: false,
    };
  }

  const rate = monthlyRate(annualRate);
  const months = years * 12;
  const principal =
    annualRate === 0
      ? maxEmi * months
      : maxEmi * (((1 + rate) ** months - 1) / (rate * (1 + rate) ** months));

  return {
    principal,
    maxEmi,
    totalInterest: maxEmi * months - principal,
    existingPercent,
    capacityPercent,
    overLimit: false,
  };
}

/** SIP monthly compounding vs FD lump-sum of the same total invested. */
export function calculateSipVsFd(
  monthly: number,
  years: number,
  sipAnnualRate: number,
  fdAnnualRate: number,
) {
  if (monthly <= 0 || years <= 0) {
    return { invested: 0, sipValue: 0, fdValue: 0, sipWins: false };
  }

  const months = years * 12;
  const invested = monthly * months;
  const sipRate = sipAnnualRate / 100 / 12;
  const sipValue =
    sipRate === 0
      ? invested
      : monthly * (((1 + sipRate) ** months - 1) / sipRate) * (1 + sipRate);
  const fdValue = invested * (1 + fdAnnualRate / 100) ** years;

  return {
    invested,
    sipValue,
    fdValue,
    sipWins: sipValue > fdValue,
  };
}

export function sanitizeNumber(value: number, fallback = 0) {
  return Number.isFinite(value) ? value : fallback;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(sanitizeNumber(value, min), min), max);
}
