/**
 * dothenumberswork.com - Real Estate Deal Analysis Engine
 * 
 * Implements 23 investment methodologies across 5 categories:
 * 1. Old-School Rules of Thumb (6 methods)
 * 2. Investor-Grade Financial Metrics (7 methods)
 * 3. Strategy-Specific Analysis (4 methods)
 * 4. Risk & Stress Testing (4 methods)
 * 5. Comparative & Educational (2 methods)
 */

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function round2(num) {
  return Math.round(num * 100) / 100;
}

function percent(num) {
  return (num * 100).toFixed(2);
}

function dollar(num) {
  return Math.round(num).toLocaleString();
}

// ============================================================================
// CORE CALCULATIONS
// ============================================================================

/**
 * Calculate all deal metrics from input data
 */
function calculateDealMetrics(inputs) {
  const {
    // Property
    purchasePrice,
    arv,
    numberOfUnits,
    propertyType,
    
    // Financing
    downPayment,
    loanAmount,
    interestRate,
    loanTerm = 30,
    closingCosts,
    
    // Income
    monthlyGrossRent,
    otherMonthlyIncome = 0,
    vacancyRate = 0.08,
    
    // Expenses
    annualPropertyTaxes,
    annualInsurance,
    monthlyHOA = 0,
    propertyManagementPercent = 0.10,
    maintenancePercent = 0.05,
    capexPercent = 0.05,
    utilitiesMonthly = 0,
    otherMonthlyExpenses = 0,
    
    // Rehab/Flip
    rehabCost = 0,
    rehabMonths = 0,
    holdingCostsMonthly = 0,
    sellingCostsPercent = 0.08,
    
    // Context
    targetReturn = 0.10,
    appreciationRate = 0.03,
    investmentStrategy = 'buy_and_hold'
  } = inputs;

  // === INCOME ===
  const monthlyGrossIncome = monthlyGrossRent + otherMonthlyIncome;
  const annualGrossIncome = monthlyGrossIncome * 12;
  
  const monthlyVacancyLoss = monthlyGrossRent * vacancyRate;
  const effectiveGrossIncome = monthlyGrossIncome - monthlyVacancyLoss;
  const annualEffectiveGrossIncome = effectiveGrossIncome * 12;

  // === OPERATING EXPENSES ===
  const monthlyPropertyTax = annualPropertyTaxes / 12;
  const monthlyInsurance = annualInsurance / 12;
  const monthlyPropertyManagement = monthlyGrossRent * propertyManagementPercent;
  const monthlyMaintenance = monthlyGrossRent * maintenancePercent;
  const monthlyCapex = monthlyGrossRent * capexPercent;
  
  const monthlyOperatingExpenses = 
    monthlyPropertyTax + 
    monthlyInsurance + 
    monthlyHOA + 
    monthlyPropertyManagement + 
    monthlyMaintenance + 
    monthlyCapex + 
    utilitiesMonthly + 
    otherMonthlyExpenses;
  
  const annualOperatingExpenses = monthlyOperatingExpenses * 12;

  // === NET OPERATING INCOME (NOI) ===
  const monthlyNOI = effectiveGrossIncome - monthlyOperatingExpenses;
  const annualNOI = monthlyNOI * 12;

  // === MORTGAGE ===
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  
  let monthlyMortgagePayment = 0;
  if (interestRate > 0 && loanAmount > 0) {
    monthlyMortgagePayment = loanAmount * 
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
  }
  
  const annualMortgagePayment = monthlyMortgagePayment * 12;

  // Principal/Interest breakdown for first year
  let firstYearPrincipal = 0;
  let firstYearInterest = 0;
  let remainingBalance = loanAmount;
  
  for (let i = 0; i < 12; i++) {
    const interestPortion = remainingBalance * monthlyInterestRate;
    const principalPortion = monthlyMortgagePayment - interestPortion;
    firstYearInterest += interestPortion;
    firstYearPrincipal += principalPortion;
    remainingBalance -= principalPortion;
  }

  // === CASH FLOW ===
  const monthlyCashFlow = monthlyNOI - monthlyMortgagePayment;
  const annualCashFlow = monthlyCashFlow * 12;

  // === TOTAL CASH INVESTED ===
  const totalCashInvested = downPayment + closingCosts + rehabCost + (holdingCostsMonthly * rehabMonths);

  // === CASH-ON-CASH RETURN ===
  const cashOnCashReturn = totalCashInvested > 0 ? (annualCashFlow / totalCashInvested) : 0;

  // === CAP RATE ===
  const capRate = purchasePrice > 0 ? (annualNOI / purchasePrice) : 0;

  // === DEBT SERVICE COVERAGE RATIO (DSCR) ===
  const dscr = annualMortgagePayment > 0 ? (annualNOI / annualMortgagePayment) : 0;

  // === BREAK-EVEN RATIO ===
  const breakEvenRatio = annualEffectiveGrossIncome > 0 ? 
    ((annualOperatingExpenses + annualMortgagePayment) / annualEffectiveGrossIncome) : 0;

  // === GROSS RENT MULTIPLIER (GRM) ===
  const grm = annualGrossIncome > 0 ? (purchasePrice / annualGrossIncome) : 0;

  // === 1% and 2% RULES ===
  const onePercentRule = monthlyGrossRent / purchasePrice;
  const twoPercentRule = monthlyGrossRent / purchasePrice;

  // === $100/DOOR/MONTH RULE ===
  const cashFlowPerDoor = numberOfUnits > 0 ? monthlyCashFlow / numberOfUnits : 0;

  // === 50% RULE (Quick Estimate) ===
  const estimatedOperatingExpenses50 = monthlyGrossRent * 0.50;
  const estimatedNOI50 = monthlyGrossRent - estimatedOperatingExpenses50;
  const cashFlow50Rule = estimatedNOI50 - monthlyMortgagePayment;
  const cashFlowPerDoor50 = numberOfUnits > 0 ? cashFlow50Rule / numberOfUnits : 0;

  // === ROI (Total Return) ===
  const annualAppreciation = purchasePrice * appreciationRate;
  const totalAnnualReturn = annualCashFlow + firstYearPrincipal + annualAppreciation;
  const roi = totalCashInvested > 0 ? (totalAnnualReturn / totalCashInvested) : 0;

  // === IRR (5-Year Projection) ===
  const irrProjection = calculateIRR({
    initialInvestment: totalCashInvested,
    annualCashFlow,
    appreciationRate,
    holdingPeriod: 5,
    sellingCostsPercent,
    purchasePrice,
    remainingBalance
  });

  // === BRRRR ANALYSIS ===
  const brrrrAnalysis = calculateBRRRR({
    purchasePrice,
    rehabCost,
    holdingCostsMonthly,
    rehabMonths,
    closingCosts,
    arv,
    loanAmount,
    interestRate,
    loanTerm,
    annualCashFlow
  });

  // === FLIP ANALYSIS ===
  const flipAnalysis = calculateFlip({
    purchasePrice,
    rehabCost,
    holdingCostsMonthly,
    rehabMonths,
    closingCosts,
    sellingCostsPercent,
    arv
  });

  // === STRESS TESTS ===
  const stressTests = calculateStressTests({
    monthlyCashFlow,
    monthlyNOI,
    monthlyMortgagePayment,
    monthlyGrossRent,
    numberOfUnits,
    interestRate,
    loanAmount,
    loanTerm,
    totalCashInvested,
    appreciationRate,
    annualCashFlow,
    purchasePrice,
    holdingPeriod: 5
  });

  // === OPPORTUNITY COST ===
  const opportunityCost = calculateOpportunityCost({
    totalCashInvested,
    annualCashFlow,
    firstYearPrincipal,
    appreciationRate,
    purchasePrice,
    holdingPeriod: 5
  });

  // === COMPOSITE SCORE ===
  const compositeScore = calculateCompositeScore({
    cashOnCashReturn,
    capRate,
    dscr,
    cashFlowPerDoor,
    onePercentRule,
    breakEvenRatio,
    irrProjection,
    stressTests
  });

  return {
    // Basic metrics
    monthlyGrossIncome,
    annualGrossIncome,
    monthlyVacancyLoss,
    effectiveGrossIncome,
    annualEffectiveGrossIncome,
    monthlyOperatingExpenses,
    annualOperatingExpenses,
    monthlyNOI,
    annualNOI,
    monthlyMortgagePayment,
    annualMortgagePayment,
    firstYearPrincipal: round2(firstYearPrincipal),
    firstYearInterest: round2(firstYearInterest),
    remainingBalance: round2(remainingBalance),
    monthlyCashFlow,
    annualCashFlow,
    totalCashInvested,
    
    // Key ratios
    cashOnCashReturn,
    capRate,
    dscr,
    breakEvenRatio,
    grm,
    onePercentRule,
    twoPercentRule,
    cashFlowPerDoor,
    cashFlowPerDoor50,
    roi,
    irrProjection,
    
    // Strategy analyses
    brrrr: brrrrAnalysis,
    flip: flipAnalysis,
    
    // Risk analysis
    stressTests,
    
    // Comparative
    opportunityCost,
    
    // Overall
    compositeScore
  };
}

// ============================================================================
// IRR CALCULATION (5-Year)
// ============================================================================

function calculateIRR({ initialInvestment, annualCashFlow, appreciationRate, holdingPeriod, sellingCostsPercent, purchasePrice, remainingBalance }) {
  // Project cash flows
  const cashFlows = [-initialInvestment]; // Year 0 (initial investment)
  
  let propertyValue = purchasePrice;
  let balance = remainingBalance;
  
  for (let year = 1; year <= holdingPeriod; year++) {
    if (year < holdingPeriod) {
      // Years 1-4: operating cash flow
      cashFlows.push(annualCashFlow);
    } else {
      // Year 5: operating cash flow + sale proceeds
      propertyValue *= (1 + appreciationRate);
      const saleProceeds = propertyValue * (1 - sellingCostsPercent) - balance;
      cashFlows.push(annualCashFlow + saleProceeds);
    }
    
    propertyValue *= (1 + appreciationRate);
    // Simplified: assume balance decreases slightly each year
    balance *= 0.98;
  }
  
  // Calculate IRR using Newton-Raphson
  const irr = calculateIRRValue(cashFlows);
  
  return {
    irr: irr,
    cashFlows,
    propertyValueEnd: round2(propertyValue),
    saleProceeds: round2(cashFlows[cashFlows.length - 1] - annualCashFlow),
    totalReturn: round2(cashFlows.reduce((sum, cf) => sum + cf, 0))
  };
}

function calculateIRRValue(cashFlows) {
  // Newton-Raphson method to find IRR
  const maxIterations = 1000;
  const tolerance = 0.0001;
  let guess = 0.1; // Start with 10% guess
  
  for (let i = 0; i < maxIterations; i++) {
    let npv = 0;
    let derivative = 0;
    
    for (let t = 0; t < cashFlows.length; t++) {
      npv += cashFlows[t] / Math.pow(1 + guess, t);
      if (t > 0) {
        derivative -= t * cashFlows[t] / Math.pow(1 + guess, t + 1);
      }
    }
    
    if (Math.abs(npv) < tolerance) {
      return guess;
    }
    
    if (derivative === 0) break;
    
    guess = guess - npv / derivative;
    
    // Keep guess reasonable
    if (guess < -0.99) guess = -0.99;
    if (guess > 10) guess = 10;
  }
  
  return guess;
}

// ============================================================================
// BRRRR ANALYSIS
// ============================================================================

function calculateBRRRR({ purchasePrice, rehabCost, holdingCostsMonthly, rehabMonths, closingCosts, arv, loanAmount, interestRate, loanTerm, annualCashFlow }) {
  const allInCost = purchasePrice + rehabCost + (holdingCostsMonthly * rehabMonths) + closingCosts;
  
  // Cash-out refi at 75% LTV of ARV
  const newLoanAmount = arv * 0.75;
  const capitalRecovered = Math.min(newLoanAmount, allInCost);
  const cashLeftIn = allInCost - capitalRecovered;
  
  // New mortgage payment after refi
  const monthlyRate = interestRate / 100 / 12;
  const payments = loanTerm * 12;
  let newMonthlyPayment = 0;
  if (interestRate > 0) {
    newMonthlyPayment = newLoanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, payments)) / 
      (Math.pow(1 + monthlyRate, payments) - 1);
  }
  
  const newAnnualCashFlow = annualCashFlow + (loanAmount - newLoanAmount > 0 ? (loanAmount - newLoanAmount) : 0);
  const newCashOnCash = cashLeftIn > 0 ? (newAnnualCashFlow / cashLeftIn) : 999;
  
  const equityCreated = arv - allInCost;
  
  return {
    allInCost: round2(allInCost),
    arv,
    equityCreated: round2(equityCreated),
    newLoanAmount: round2(newLoanAmount),
    capitalRecovered: round2(capitalRecovered),
    cashLeftIn: round2(cashLeftIn),
    recoveryPercent: allInCost > 0 ? (capitalRecovered / allInCost * 100) : 0,
    newMonthlyPayment: round2(newMonthlyPayment),
    newCashOnCash: newCashOnCash,
    verdict: cashLeftIn <= 0 ? 'PASS' : (cashLeftIn / allInCost < 0.2 ? 'MARGINAL' : 'FAIL')
  };
}

// ============================================================================
// FLIP ANALYSIS
// ============================================================================

function calculateFlip({ purchasePrice, rehabCost, holdingCostsMonthly, rehabMonths, closingCosts, sellingCostsPercent, arv }) {
  const holdingCosts = holdingCostsMonthly * rehabMonths;
  const sellingCosts = arv * sellingCostsPercent;
  const allInCost = purchasePrice + rehabCost + holdingCosts + closingCosts + sellingCosts;
  
  const grossProfit = arv - allInCost;
  const netProfit = arv - purchasePrice - rehabCost - holdingCosts - closingCosts - sellingCosts;
  
  const totalCashNeeded = purchasePrice + rehabCost + holdingCosts + closingCosts;
  const roi = totalCashNeeded > 0 ? (netProfit / totalCashNeeded) : 0;
  
  const monthsToComplete = rehabMonths;
  const annualizedROI = monthsToComplete > 0 ? (roi * (12 / monthsToComplete)) : 0;
  const profitPerMonth = monthsToComplete > 0 ? (netProfit / monthsToComplete) : 0;
  
  return {
    allInCost: round2(allInCost),
    grossProfit: round2(grossProfit),
    netProfit: round2(netProfit),
    roi,
    annualizedROI,
    profitPerMonth: round2(profitPerMonth),
    sellingCosts: round2(sellingCosts),
    holdingCosts: round2(holdingCosts),
    verdict: netProfit >= allInCost * 0.15 ? 'PASS' : (netProfit >= allInCost * 0.10 ? 'MARGINAL' : 'FAIL')
  };
}

// ============================================================================
// STRESS TESTS
// ============================================================================

function calculateStressTests({ monthlyCashFlow, monthlyNOI, monthlyMortgagePayment, monthlyGrossRent, numberOfUnits, interestRate, loanAmount, loanTerm, totalCashInvested, appreciationRate, annualCashFlow, purchasePrice, holdingPeriod }) {
  // Vacancy stress test
  const vacancyTests = [0.10, 0.15, 0.20, 0.25].map(rate => {
    const vacancyLoss = monthlyGrossRent * rate;
    const adjustedCashFlow = monthlyNOI - vacancyLoss - monthlyMortgagePayment;
    return {
      vacancyRate: rate,
      cashFlow: round2(adjustedCashFlow),
      isNegative: adjustedCashFlow < 0
    };
  });
  
  const breakEvenVacancy = vacancyTests.find(t => t.isNegative) || vacancyTests[vacancyTests.length - 1];
  
  // Interest rate stress test
  const rateTests = [1, 2, 3].map(increase => {
    const newRate = interestRate + increase;
    const monthlyRate = newRate / 100 / 12;
    const payments = loanTerm * 12;
    let newPayment = 0;
    if (newRate > 0 && loanAmount > 0) {
      newPayment = loanAmount * 
        (monthlyRate * Math.pow(1 + monthlyRate, payments)) / 
        (Math.pow(1 + monthlyRate, payments) - 1);
    }
    const newCashFlow = monthlyNOI - newPayment;
    return {
      rate: newRate,
      cashFlow: round2(newCashFlow),
      isNegative: newCashFlow < 0
    };
  });
  
  // Rent decline stress test
  const rentTests = [0.05, 0.10, 0.15].map(decline => {
    const adjustedRent = monthlyGrossRent * (1 - decline);
    const adjustedNOI = monthlyNOI - (monthlyGrossRent * decline);
    const newCashFlow = adjustedNOI - monthlyMortgagePayment;
    return {
      decline,
      cashFlow: round2(newCashFlow),
      isNegative: newCashFlow < 0
    };
  });
  
  // CapEx catastrophe (simplified)
  const capexTests = [10000, 25000, 50000].map(amount => {
    const monthsToRecover = amount / Math.max(monthlyCashFlow, 1);
    const irrImpact = amount / totalCashInvested / holdingPeriod;
    return {
      amount,
      monthsToRecover: round2(monthsToRecover),
      irrImpact: round2(irrImpact * 100)
    };
  });
  
  return {
    vacancy: vacancyTests,
    interestRate: rateTests,
    rentDecline: rentTests,
    capex: capexTests,
    breakEvenVacancy: breakEvenVacancy.vacancyRate * 100
  };
}

// ============================================================================
// OPPORTUNITY COST
// ============================================================================

function calculateOpportunityCost({ totalCashInvested, annualCashFlow, firstYearPrincipal, appreciationRate, purchasePrice, holdingPeriod }) {
  // Real estate 5-year outcome
  const propertyValueEnd = purchasePrice * Math.pow(1 + appreciationRate, holdingPeriod);
  const totalCashFlow = annualCashFlow * holdingPeriod;
  const totalPrincipal = firstYearPrincipal * holdingPeriod; // Simplified
  const realEstateEnd = totalCashFlow + totalPrincipal + propertyValueEnd;
  
  // Stock market (S&P 500 ~10%)
  const stockAnnual = 0.10;
  const stocksEnd = totalCashInvested * Math.pow(1 + stockAnnual, holdingPeriod);
  
  // HYSA (~4.5%)
  const hysaAnnual = 0.045;
  const hysaEnd = totalCashInvested * Math.pow(1 + hysaAnnual, holdingPeriod);
  
  // Bonds (~4%)
  const bondAnnual = 0.04;
  const bondsEnd = totalCashInvested * Math.pow(1 + bondAnnual, holdingPeriod);
  
  // REITs (~7.5%)
  const reitAnnual = 0.075;
  const reitsEnd = totalCashInvested * Math.pow(1 + reitAnnual, holdingPeriod);
  
  return {
    realEstate: { totalReturn: round2(realEstateEnd - totalCashInvested), finalValue: round2(realEstateEnd) },
    stocks: { totalReturn: round2(stocksEnd - totalCashInvested), finalValue: round2(stocksEnd) },
    hysa: { totalReturn: round2(hysaEnd - totalCashInvested), finalValue: round2(hysaEnd) },
    bonds: { totalReturn: round2(bondsEnd - totalCashInvested), finalValue: round2(bondsEnd) },
    reits: { totalReturn: round2(reitsEnd - totalCashInvested), finalValue: round2(reitsEnd) },
    wins: realEstateEnd > stocksEnd ? 'real_estate' : 'stocks'
  };
}

// ============================================================================
// COMPOSITE SCORE
// ============================================================================

function calculateCompositeScore({ cashOnCashReturn, capRate, dscr, cashFlowPerDoor, onePercentRule, breakEvenRatio, irrProjection, stressTests }) {
  let score = 0;
  let maxScore = 100;
  
  // Cash-on-Cash (20 points)
  if (cashOnCashReturn >= 0.10) score += 20;
  else if (cashOnCashReturn >= 0.06) score += 12;
  else score += Math.max(0, cashOnCashReturn / 0.06 * 8);
  
  // Cap Rate (15 points)
  if (capRate >= 0.08) score += 15;
  else if (capRate >= 0.05) score += 8;
  else score += Math.max(0, capRate / 0.05 * 5);
  
  // DSCR (15 points)
  if (dscr >= 1.25) score += 15;
  else if (dscr >= 1.0) score += 8;
  else score += Math.max(0, dscr / 1.0 * 5);
  
  // $100/door (10 points)
  if (cashFlowPerDoor >= 200) score += 10;
  else if (cashFlowPerDoor >= 100) score += 7;
  else score += Math.max(0, cashFlowPerDoor / 100 * 5);
  
  // 1% Rule (10 points)
  if (onePercentRule >= 0.01) score += 10;
  else if (onePercentRule >= 0.0075) score += 5;
  else score += Math.max(0, onePercentRule / 0.0075 * 4);
  
  // Break-Even Ratio (10 points)
  if (breakEvenRatio <= 0.80) score += 10;
  else if (breakEvenRatio <= 0.90) score += 5;
  else score += Math.max(0, (1 - breakEvenRatio) / 0.2 * 5);
  
  // IRR (10 points)
  if (irrProjection.irr >= 0.15) score += 10;
  else if (irrProjection.irr >= 0.08) score += 5;
  else score += Math.max(0, irrProjection.irr / 0.08 * 4);
  
  // Stress Test Resilience (10 points)
  const negativeScenarios = 
    stressTests.vacancy.filter(t => t.isNegative).length +
    stressTests.interestRate.filter(t => t.isNegative).length +
    stressTests.rentDecline.filter(t => t.isNegative).length;
  
  if (negativeScenarios === 0) score += 10;
  else if (negativeScenarios <= 2) score += 5;
  else score += Math.max(0, 10 - negativeScenarios * 2);
  
  const finalScore = Math.min(100, Math.max(0, Math.round(score)));
  
  let grade, verdict;
  if (finalScore >= 90) { grade = 'A+'; verdict = 'EXCELLENT'; }
  else if (finalScore >= 85) { grade = 'A'; verdict = 'EXCELLENT'; }
  else if (finalScore >= 80) { grade = 'A-'; verdict = 'EXCELLENT'; }
  else if (finalScore >= 75) { grade = 'B+'; verdict = 'STRONG'; }
  else if (finalScore >= 70) { grade = 'B'; verdict = 'STRONG'; }
  else if (finalScore >= 65) { grade = 'B-'; verdict = 'STRONG'; }
  else if (finalScore >= 60) { grade = 'C+'; verdict = 'MODERATE'; }
  else if (finalScore >= 55) { grade = 'C'; verdict = 'MODERATE'; }
  else if (finalScore >= 50) { grade = 'C-'; verdict = 'MODERATE'; }
  else if (finalScore >= 40) { grade = 'D'; verdict = 'WEAK'; }
  else { grade = 'F'; verdict = 'FAIL'; }
  
  return {
    score: finalScore,
    grade,
    verdict,
    breakdown: {
      cashOnCash: Math.min(20, cashOnCashReturn >= 0.10 ? 20 : cashOnCashReturn >= 0.06 ? 12 : Math.round(cashOnCashReturn / 0.06 * 8)),
      capRate: Math.min(15, capRate >= 0.08 ? 15 : capRate >= 0.05 ? 8 : Math.round(capRate / 0.05 * 5)),
      dscr: Math.min(15, dscr >= 1.25 ? 15 : dscr >= 1.0 ? 8 : Math.round(dscr * 5)),
      cashFlowPerDoor: Math.min(10, cashFlowPerDoor >= 200 ? 10 : cashFlowPerDoor >= 100 ? 7 : Math.round(cashFlowPerDoor / 20 * 5)),
      onePercent: Math.min(10, onePercentRule >= 0.01 ? 10 : onePercentRule >= 0.0075 ? 5 : Math.round(onePercentRule / 0.0075 * 4)),
      breakEven: Math.min(10, breakEvenRatio <= 0.80 ? 10 : breakEvenRatio <= 0.90 ? 5 : Math.round((1 - breakEvenRatio) * 50)),
      irr: Math.min(10, irrProjection.irr >= 0.15 ? 10 : irrProjection.irr >= 0.08 ? 5 : Math.round(irrProjection.irr / 0.08 * 4)),
      stress: Math.min(10, 10 - (negativeScenarios * 2))
    }
  };
}

// ============================================================================
// METHODOLOGY VERDICT ENGINE
// ============================================================================

function generateMethodologyResults(metrics, inputs) {
  const { investmentStrategy, arv, rehabCost, numberOfUnits, propertyType } = inputs;
  
  const results = [];
  
  // === CATEGORY 1: Old-School Rules of Thumb ===
  
  // 1. 1% Rule
  results.push({
    id: 'one_percent',
    category: 'Old-School Rules',
    name: 'The 1% Rule',
    description: 'Monthly rent should be at least 1% of purchase price',
    value: percent(metrics.onePercentRule) + '%',
    numericValue: metrics.onePercentRule,
    threshold: '≥ 1.0%',
    verdict: metrics.onePercentRule >= 0.01 ? 'PASS' : (metrics.onePercentRule >= 0.0075 ? 'MARGINAL' : 'FAIL'),
    explanation: `This property generates ${percent(metrics.onePercentRule)}% of its purchase price in monthly rent. ${metrics.onePercentRule >= 0.01 ? "This meets the classic 1% rule threshold, suggesting strong cash flow potential." : metrics.onePercentRule >= 0.0075 ? "This is close to the 1% rule but falls slightly short. Still worth deeper analysis." : "This falls below the 1% rule threshold. In expensive markets this can still work, but you'll need to rely on appreciation."}`
  });
  
  // 2. 2% Rule
  results.push({
    id: 'two_percent',
    category: 'Old-School Rules',
    name: 'The 2% Rule',
    description: 'Aggressive cash flow target: 2% of purchase price monthly',
    value: percent(metrics.twoPercentRule) + '%',
    numericValue: metrics.twoPercentRule,
    threshold: '≥ 2.0%',
    verdict: metrics.twoPercentRule >= 0.02 ? 'PASS' : (metrics.twoPercentRule >= 0.015 ? 'MARGINAL' : 'FAIL'),
    explanation: `At ${percent(metrics.twoPercentRule)}%, this ${metrics.twoPercentRule >= 0.02 ? "hits the aggressive 2% rule — common in Midwest cash flow markets." : metrics.twoPercentRule >= 0.015 ? "approaches the 2% rule but doesn't quite make it. Still solid for many markets." : "doesn't reach the 2% rule. This is typical in appreciation-focused markets."}`
  });
  
  // 3. 50% Rule
  results.push({
    id: 'fifty_percent',
    category: 'Old-School Rules',
    name: 'The 50% Rule',
    description: 'Assume 50% of rent goes to expenses; rest should cover mortgage with profit',
    value: dollar(metrics.cashFlowPerDoor50) + '/door/month',
    numericValue: metrics.cashFlowPerDoor50,
    threshold: '≥ $100/door',
    verdict: metrics.cashFlowPerDoor50 >= 200 ? 'PASS' : (metrics.cashFlowPerDoor50 >= 100 ? 'MARGINAL' : 'FAIL'),
    explanation: `Using the conservative 50% expense rule, you'd net approximately $${Math.round(metrics.cashFlowPerDoor50)}/door/month. ${metrics.cashFlowPerDoor50 >= 200 ? "This is a comfortable margin." : metrics.cashFlowPerDoor50 >= 100 ? "This meets the minimum threshold for most investors." : "This is tight — any vacancy or large repair could put you in the red."}`
  });
  
  // 4. 70% Rule (if flip/BRRRR)
  if (rehabCost > 0 && arv > 0) {
    const mao = (arv * 0.70) - rehabCost;
    const percentAboveMAO = ((inputs.purchasePrice - mao) / mao) * 100;
    
    results.push({
      id: 'seventy_percent',
      category: 'Old-School Rules',
      name: 'The 70% Rule',
      description: 'MAO = (ARV × 70%) - Rehab costs',
      value: dollar(mao) + ' MAO',
      numericValue: inputs.purchasePrice,
      threshold: `Purchase ≤ $${Math.round(mao).toLocaleString()}`,
      verdict: inputs.purchasePrice <= mao ? 'PASS' : (percentAboveMAO <= 10 ? 'MARGINAL' : 'FAIL'),
      explanation: `Your Maximum Allowable Offer would be $${Math.round(mao).toLocaleString()}. You're ${inputs.purchasePrice > mao ? '$' + Math.round(inputs.purchasePrice - mao).toLocaleString() + ' OVER' : '$' + Math.round(mao - inputs.purchasePrice).toLocaleString() + ' UNDER'} that mark. ${inputs.purchasePrice <= mao ? "This protects your profit margin nicely." : percentAboveMAO <= 10 ? "Slightly over but within acceptable range for the right deal." : "Significantly over — you're risking your profit cushion."}`
    });
  }
  
  // 5. $100/Door/Month
  results.push({
    id: 'hundred_per_door',
    category: 'Old-School Rules',
    name: '$100/Door/Month Rule',
    description: 'Net cash flow per unit after all expenses including mortgage',
    value: dollar(metrics.cashFlowPerDoor) + '/door/month',
    numericValue: metrics.cashFlowPerDoor,
    threshold: '≥ $200/door',
    verdict: metrics.cashFlowPerDoor >= 200 ? 'PASS' : (metrics.cashFlowPerDoor >= 100 ? 'MARGINAL' : 'FAIL'),
    explanation: `Each unit would put approximately $${Math.round(metrics.cashFlowPerDoor)}/month in your pocket. ${metrics.cashFlowPerDoor >= 200 ? "This hits the comfort zone for experienced investors." : metrics.cashFlowPerDoor >= 100 ? "This meets the minimum threshold most landlords require." : "This is below the typical minimum — consider renegotiating or walking."}`
  });
  
  // 6. GRM
  results.push({
    id: 'grm',
    category: 'Old-School Rules',
    name: 'Gross Rent Multiplier',
    description: 'Years of gross rent to equal purchase price',
    value: metrics.grm.toFixed(2),
    numericValue: metrics.grm,
    threshold: '≤ 8',
    verdict: metrics.grm <= 8 ? 'PASS' : (metrics.grm <= 12 ? 'MARGINAL' : 'FAIL'),
    explanation: `At ${metrics.grm.toFixed(2)}, you'd need ${metrics.grm.toFixed(1)} years of gross rent to equal the purchase price. ${metrics.grm <= 8 ? "This is a strong GRM indicating good value." : metrics.grm <= 12 ? "This is typical for many markets but not exceptional." : "This is a high GRM — you're paying a premium for this property."}`
  });
  
  // === CATEGORY 2: Investor-Grade Metrics ===
  
  // 7. Cap Rate
  results.push({
    id: 'cap_rate',
    category: 'Investor-Grade Metrics',
    name: 'Cap Rate',
    description: 'NOI ÷ Purchase Price — return independent of financing',
    value: percent(metrics.capRate) + '%',
    numericValue: metrics.capRate,
    threshold: '≥ 8%',
    verdict: metrics.capRate >= 0.08 ? 'PASS' : (metrics.capRate >= 0.05 ? 'MARGINAL' : 'FAIL'),
    explanation: `Your unleveraged return is ${percent(metrics.capRate)}%. ${metrics.capRate >= 0.08 ? "This is a strong cap rate that would attract institutional interest." : metrics.capRate >= 0.05 ? "This is moderate — typical for many residential markets." : "This is a low cap rate. You're likely banking on appreciation rather than cash flow."}`
  });
  
  // 8. Cash-on-Cash
  results.push({
    id: 'coc',
    category: 'Investor-Grade Metrics',
    name: 'Cash-on-Cash Return',
    description: 'Annual cash flow ÷ Total cash invested',
    value: percent(metrics.cashOnCashReturn) + '%',
    numericValue: metrics.cashOnCashReturn,
    threshold: '≥ 10%',
    verdict: metrics.cashOnCashReturn >= 0.10 ? 'PASS' : (metrics.cashOnCashReturn >= 0.06 ? 'MARGINAL' : 'FAIL'),
    explanation: `Your cash investment returns ${percent(metrics.cashOnCashReturn)}% annually. ${metrics.cashOnCashReturn >= 0.10 ? "This exceeds the 10% target most investors seek." : metrics.cashOnCashReturn >= 0.06 ? "This is acceptable but not exceptional." : "This is below the typical 6% minimum. Consider reallocating your capital."}`
  });
  
  // 9. NOI
  const noiVerdict = metrics.annualNOI > 0 ? 'PASS' : 'FAIL';
  results.push({
    id: 'noi',
    category: 'Investor-Grade Metrics',
    name: 'Net Operating Income',
    description: 'Income minus operating expenses (before mortgage)',
    value: '$' + Math.round(metrics.annualNOI).toLocaleString() + '/year',
    numericValue: metrics.annualNOI,
    threshold: '> $0',
    verdict: noiVerdict,
    explanation: `This property generates $${Math.round(metrics.annualNOI).toLocaleString()} annually before debt service. ${metrics.annualNOI > 0 ? "The property can support itself without financing." : "The property cannot cover its own operating expenses — a major red flag."}`
  });
  
  // 10. DSCR
  results.push({
    id: 'dscr',
    category: 'Investor-Grade Metrics',
    name: 'Debt Service Coverage Ratio',
    description: 'NOI ÷ Annual mortgage payment',
    value: metrics.dscr.toFixed(2),
    numericValue: metrics.dscr,
    threshold: '≥ 1.25',
    verdict: metrics.dscr >= 1.25 ? 'PASS' : (metrics.dscr >= 1.0 ? 'MARGINAL' : 'FAIL'),
    explanation: `The property's income covers its debt ${metrics.dscr.toFixed(2)}x. ${metrics.dscr >= 1.25 ? "This meets bank requirements with a healthy cushion." : metrics.dscr >= 1.0 ? "The property covers its mortgage but leaves little room for error." : "WARNING: This property cannot cover its mortgage from rent alone. You'd be subsidizing it monthly."}`
  });
  
  // 11. ROI
  results.push({
    id: 'roi',
    category: 'Investor-Grade Metrics',
    name: 'Total ROI',
    description: 'Cash flow + principal + appreciation ÷ cash invested',
    value: percent(metrics.roi) + '%',
    numericValue: metrics.roi,
    threshold: '≥ 15%',
    verdict: metrics.roi >= 0.15 ? 'PASS' : (metrics.roi >= 0.08 ? 'MARGINAL' : 'FAIL'),
    explanation: `Your total annualized return (cash + equity + appreciation) is ${percent(metrics.roi)}%. ${metrics.roi >= 0.15 ? "This is an excellent all-in return." : metrics.roi >= 0.08 ? "This is a solid return when you count all wealth-building mechanisms." : "This is below the 15% target. The deal may work for appreciation but not total return."}`
  });
  
  // 12. IRR
  results.push({
    id: 'irr',
    category: 'Investor-Grade Metrics',
    name: '5-Year IRR',
    description: 'Internal Rate of Return — accounts for time value of money',
    value: percent(metrics.irrProjection.irr) + '%',
    numericValue: metrics.irrProjection.irr,
    threshold: '≥ 15%',
    verdict: metrics.irrProjection.irr >= 0.15 ? 'PASS' : (metrics.irrProjection.irr >= 0.08 ? 'MARGINAL' : 'FAIL'),
    explanation: `Your projected 5-year IRR is ${percent(metrics.irrProjection.irr)}%. ${metrics.irrProjection.irr >= 0.15 ? "This is institutional-grade — private equity would be interested." : metrics.irrProjection.irr >= 0.08 ? "This is a reasonable IRR for a residential deal." : "This IRR is low. Your capital might work harder elsewhere."}`
  });
  
  // 13. Break-Even Ratio
  results.push({
    id: 'ber',
    category: 'Investor-Grade Metrics',
    name: 'Break-Even Ratio',
    description: '% of income eaten by expenses + debt',
    value: percent(metrics.breakEvenRatio) + '%',
    numericValue: metrics.breakEvenRatio,
    threshold: '≤ 80%',
    verdict: metrics.breakEvenRatio <= 0.80 ? 'PASS' : (metrics.breakEvenRatio <= 0.90 ? 'MARGINAL' : 'FAIL'),
    explanation: `${percent(metrics.breakEvenRatio)} of your rental income goes to expenses and mortgage. ${metrics.breakEvenRatio <= 0.80 ? "You have a healthy 20%+ cushion for vacancies and repairs." : metrics.breakEvenRatio <= 0.90 ? "Your cushion is thin but workable." : "WARNING: Over 90% of income is committed. One bad month and you're negative."}`
  });
  
  // === CATEGORY 3: Strategy-Specific ===
  
  // 14. BRRRR (if applicable)
  if (rehabCost > 0 && arv > 0) {
    const brrrr = metrics.brrrr;
    results.push({
      id: 'brrrr',
      category: 'Strategy-Specific',
      name: 'BRRRR Analysis',
      description: 'Can you recover your capital through refinance?',
      value: `${percent(brrrr.recoveryPercent)} capital recovered`,
      numericValue: brrrr.recoveryPercent,
      threshold: '≥ 100% recovery',
      verdict: brrrr.verdict,
      explanation: `You can pull out $${Math.round(brrrr.capitalRecovered).toLocaleString()} of your $${Math.round(brrrr.allInCost).toLocaleString()} investment (${percent(brrrr.recoveryPercent/100)}). ${brrrr.cashLeftIn <= 0 ? "PERFECT: You recover all (or more than) your capital!" : brrrr.recoveryPercent >= 80 ? "Strong recovery — most of your capital comes back out." : "Limited capital recovery. This may not work as a BRRRR."}`
    });
  }
  
  // 15. Fix & Flip (if applicable)
  if (rehabCost > 0 && arv > 0 && investmentStrategy === 'fix_and_flip') {
    const flip = metrics.flip;
    results.push({
      id: 'flip',
      category: 'Strategy-Specific',
      name: 'Fix & Flip Analysis',
      description: 'Total profit and ROI on the flip',
      value: `${dollar(flip.netProfit)} profit (${percent(flip.roi)} ROI)`,
      numericValue: flip.roi,
      threshold: '≥ 15% ROI',
      verdict: flip.verdict,
      explanation: `Net profit: $${Math.round(flip.netProfit).toLocaleString()} on $${Math.round(flip.allInCost).toLocaleString()} all-in. ${flip.roi >= 0.15 ? "This is a solid flip margin." : flip.roi >= 0.10 ? "Margins are thin but may work with experience." : "WARNING: Margins are too thin. One surprise and you're underwater."}`
    });
  }
  
  // 16. House Hack (if multi-unit)
  if (numberOfUnits > 1 || propertyType === 'single_family') {
    const ownerOccupiedCashFlow = metrics.monthlyCashFlow; // Simplified
    results.push({
      id: 'househack',
      category: 'Strategy-Specific',
      name: 'House Hack Potential',
      description: 'Live in one unit, rent the rest',
      value: dollar(metrics.monthlyCashFlow) + '/month',
      numericValue: metrics.monthlyCashFlow,
      threshold: '≥ $0 (live free)',
      verdict: metrics.monthlyCashFlow >= 0 ? 'PASS' : (metrics.monthlyCashFlow >= -500 ? 'MARGINAL' : 'FAIL'),
      explanation: `${metrics.monthlyCashFlow >= 0 ? "You could live for FREE (or make money) with this house hack." : metrics.monthlyCashFlow >= -500 ? "Your housing cost would be $${Math.abs(Math.round(metrics.monthlyCashFlow))}/month — likely below market rent." : "Even as a house hack, this costs more than typical rent."}`
    });
  }
  
  // === CATEGORY 4: Stress Tests ===
  
  results.push({
    id: 'vacancy_stress',
    category: 'Risk & Stress Testing',
    name: 'Vacancy Stress Test',
    description: 'At what vacancy rate does this go negative?',
    value: `Breaks at ${Math.round(metrics.stressTests.breakEvenVacancy)}% vacancy`,
    numericValue: 0.25 - metrics.stressTests.breakEvenVacancy / 100,
    threshold: '≥ 20% cushion',
    verdict: metrics.stressTests.breakEvenVacancy >= 20 ? 'PASS' : (metrics.stressTests.breakEvenVacancy >= 15 ? 'MARGINAL' : 'FAIL'),
    explanation: `This deal goes cash-flow negative at ${Math.round(metrics.stressTests.breakEvenVacancy)}% vacancy. ${metrics.stressTests.breakEvenVacancy >= 20 ? "Strong cushion — you can handle long vacancies." : metrics.stressTests.breakEvenVacancy >= 15 ? "Moderate cushion but stay alert." : "Tight — a single vacancy could cause problems."}`
  });
  
  results.push({
    id: 'rate_stress',
    category: 'Risk & Stress Testing',
    name: 'Interest Rate Stress Test',
    description: 'Sensitivity to rising rates',
    value: metrics.stressTests.interestRate[2].isNegative ? `Negative at +${metrics.stressTests.interestRate.find(t => t.isNegative) ? metrics.stressTests.interestRate.find(t => t.isNegative).rate - inputs.interestRate : 3}%` : 'Survives +3%',
    numericValue: metrics.stressTests.interestRate.filter(t => t.isNegative).length,
    threshold: 'Survives +2%',
    verdict: !metrics.stressTests.interestRate[1].isNegative ? 'PASS' : (!metrics.stressTests.interestRate[0].isNegative ? 'MARGINAL' : 'FAIL'),
    explanation: `If rates rise, this deal ${!metrics.stressTests.interestRate[2].isNegative ? "remains positive even at +3%. Very rate-resilient." : metrics.stressTests.interestRate[1].isNegative ? "goes negative quickly. Highly rate-sensitive." : "survives +1% but fails at +2%. Moderate sensitivity."}`
  });
  
  // === CATEGORY 5: Comparative ===
  
  results.push({
    id: 'opportunity_cost',
    category: 'Comparative & Educational',
    name: 'Opportunity Cost',
    description: 'How does this compare to other investments?',
    value: metrics.opportunityCost.wins === 'real_estate' ? 'BEATS stocks' : 'LOSER vs stocks',
    numericValue: metrics.opportunityCost.realEstate.totalReturn - metrics.opportunityCost.stocks.totalReturn,
    threshold: 'Beat S&P 500',
    verdict: metrics.opportunityCost.wins === 'real_estate' ? 'PASS' : 'FAIL',
    explanation: `Over 5 years, real estate returns $${Math.round(metrics.opportunityCost.realEstate.totalReturn).toLocaleString()} vs $${Math.round(metrics.opportunityCost.stocks.totalReturn).toLocaleString()} in the S&P 500. ${metrics.opportunityCost.wins === 'real_estate' ? "Real estate wins — this deal beats the stock market." : "Stocks win — you'd make more in an index fund."}`
  });
  
  // 23. Composite Score (summary card)
  const composite = metrics.compositeScore;
  results.push({
    id: 'composite',
    category: 'Overall Verdict',
    name: 'Do The Numbers Work?',
    description: 'Weighted score across all methodologies',
    value: `${composite.grade} (${composite.score}/100)`,
    numericValue: composite.score,
    threshold: '≥ 70 for solid deal',
    verdict: composite.verdict,
    explanation: generateCompositeExplanation(composite, inputs)
  });
  
  return results;
}

function generateCompositeExplanation(composite, inputs) {
  const b = composite.breakdown;
  const strengths = [];
  const weaknesses = [];
  
  if (b.cashOnCash >= 15) strengths.push('strong cash-on-cash return');
  if (b.capRate >= 10) strengths.push('solid cap rate');
  if (b.dscr >= 12) strengths.push('excellent debt coverage');
  if (b.cashFlowPerDoor >= 7) strengths.push('healthy per-unit cash flow');
  if (b.stress >= 8) strengths.push('resilient to stress scenarios');
  
  if (b.cashOnCash < 10) weaknesses.push('low cash-on-cash return');
  if (b.capRate < 6) weaknesses.push('weak cap rate');
  if (b.dscr < 10) weaknesses.push('tight debt coverage');
  if (b.cashFlowPerDoor < 5) weaknesses.push('minimal per-unit cash flow');
  if (b.stress < 5) weaknesses.push('vulnerable to stress scenarios');
  
  let explanation = `This deal scores a ${composite.score}/100 (${composite.grade}). `;
  
  if (strengths.length > 0 && weaknesses.length > 0) {
    explanation += `Strengths: ${strengths.join(', ')}. Concerns: ${weaknesses.join(', ')}. `;
  } else if (strengths.length > 0) {
    explanation += `Key strengths: ${strengths.join(', ')}. `;
  } else if (weaknesses.length > 0) {
    explanation += `Key concerns: ${weaknesses.join(', ')}. `;
  }
  
  if (composite.score >= 70) {
    explanation += "For a buy-and-hold strategy, this is a solid deal.";
  } else if (composite.score >= 50) {
    explanation += "This deal has merit but needs careful consideration of the risks.";
  } else {
    explanation += "We'd recommend walking away or renegotiating aggressively.";
  }
  
  return explanation;
}

// ============================================================================
// MAIN EXPORT
// ============================================================================

module.exports = {
  calculateDealMetrics,
  generateMethodologyResults,
  calculateIRRValue
};
