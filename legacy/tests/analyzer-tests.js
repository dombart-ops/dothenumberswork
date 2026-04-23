/**
 * Test fixtures and verification for dothenumberswork.com analyzer
 */

const { calculateDealMetrics, generateMethodologyResults } = require('../analyzer.js');

// ============================================================================
// TEST FIXTURES
// ============================================================================

const testFixtures = {
  // A GREAT DEAL - Midwest cash flow property
  greatDeal: {
    purchasePrice: 120000,
    arv: 140000,
    numberOfUnits: 1,
    propertyType: 'single_family',
    downPayment: 30000,
    loanAmount: 90000,
    interestRate: 7.0,
    loanTerm: 30,
    closingCosts: 3600,
    monthlyGrossRent: 1400,
    otherMonthlyIncome: 50,
    vacancyRate: 0.08,
    annualPropertyTaxes: 2400,
    annualInsurance: 800,
    monthlyHOA: 0,
    propertyManagementPercent: 0.10,
    maintenancePercent: 0.05,
    capexPercent: 0.05,
    utilitiesMonthly: 0,
    otherMonthlyExpenses: 0,
    rehabCost: 0,
    rehabMonths: 0,
    holdingCostsMonthly: 0,
    sellingCostsPercent: 0.08,
    targetReturn: 0.10,
    appreciationRate: 0.03,
    investmentStrategy: 'buy_and_hold'
  },
  
  // A MEDIOCRE DEAL - Coastal appreciation play
  mediocreDeal: {
    purchasePrice: 650000,
    arv: 700000,
    numberOfUnits: 1,
    propertyType: 'single_family',
    downPayment: 162500,
    loanAmount: 487500,
    interestRate: 6.5,
    loanTerm: 30,
    closingCosts: 19500,
    monthlyGrossRent: 3900,
    otherMonthlyIncome: 0,
    vacancyRate: 0.05,
    annualPropertyTaxes: 7800,
    annualInsurance: 1500,
    monthlyHOA: 0,
    propertyManagementPercent: 0.08,
    maintenancePercent: 0.05,
    capexPercent: 0.05,
    utilitiesMonthly: 0,
    otherMonthlyExpenses: 0,
    rehabCost: 0,
    rehabMonths: 0,
    holdingCostsMonthly: 0,
    sellingCostsPercent: 0.08,
    targetReturn: 0.10,
    appreciationRate: 0.05,
    investmentStrategy: 'buy_and_hold'
  },
  
  // A TERRIBLE DEAL - Overpriced, negative cash flow
  terribleDeal: {
    purchasePrice: 450000,
    arv: 440000,
    numberOfUnits: 1,
    propertyType: 'single_family',
    downPayment: 90000,
    loanAmount: 360000,
    interestRate: 7.5,
    loanTerm: 30,
    closingCosts: 13500,
    monthlyGrossRent: 2400,
    otherMonthlyIncome: 0,
    vacancyRate: 0.10,
    annualPropertyTaxes: 6000,
    annualInsurance: 1200,
    monthlyHOA: 0,
    propertyManagementPercent: 0.10,
    maintenancePercent: 0.05,
    capexPercent: 0.05,
    utilitiesMonthly: 0,
    otherMonthlyExpenses: 0,
    rehabCost: 0,
    rehabMonths: 0,
    holdingCostsMonthly: 0,
    sellingCostsPercent: 0.08,
    targetReturn: 0.10,
    appreciationRate: 0.02,
    investmentStrategy: 'buy_and_hold'
  },
  
  // A BRRRR DEAL
  brrrrDeal: {
    purchasePrice: 85000,
    arv: 145000,
    numberOfUnits: 1,
    propertyType: 'single_family',
    downPayment: 25500,
    loanAmount: 59500,
    interestRate: 7.0,
    loanTerm: 30,
    closingCosts: 2550,
    monthlyGrossRent: 1495,
    otherMonthlyIncome: 0,
    vacancyRate: 0.08,
    annualPropertyTaxes: 1800,
    annualInsurance: 700,
    monthlyHOA: 0,
    propertyManagementPercent: 0.10,
    maintenancePercent: 0.05,
    capexPercent: 0.05,
    utilitiesMonthly: 0,
    otherMonthlyExpenses: 0,
    rehabCost: 35000,
    rehabMonths: 3,
    holdingCostsMonthly: 800,
    sellingCostsPercent: 0.08,
    targetReturn: 0.15,
    appreciationRate: 0.03,
    investmentStrategy: 'brrrr'
  },
  
  // A FIX & FLIP DEAL
  flipDeal: {
    purchasePrice: 180000,
    arv: 310000,
    numberOfUnits: 1,
    propertyType: 'single_family',
    downPayment: 180000,  // Cash purchase
    loanAmount: 0,
    interestRate: 0,
    loanTerm: 0,
    closingCosts: 5400,
    monthlyGrossRent: 0,
    otherMonthlyIncome: 0,
    vacancyRate: 0,
    annualPropertyTaxes: 2400,
    annualInsurance: 600,
    monthlyHOA: 0,
    propertyManagementPercent: 0,
    maintenancePercent: 0,
    capexPercent: 0,
    utilitiesMonthly: 0,
    otherMonthlyExpenses: 0,
    rehabCost: 55000,
    rehabMonths: 4,
    holdingCostsMonthly: 1200,
    sellingCostsPercent: 0.08,
    targetReturn: 0.20,
    appreciationRate: 0,
    investmentStrategy: 'fix_and_flip'
  }
};

// ============================================================================
// TEST RUNNER
// ============================================================================

function runTest(name, fixture) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`TEST: ${name}`);
  console.log('='.repeat(60));
  
  const metrics = calculateDealMetrics(fixture);
  const results = generateMethodologyResults(metrics, fixture);
  
  console.log(`\n📊 KEY METRICS:`);
  console.log(`   Monthly Cash Flow: $${Math.round(metrics.monthlyCashFlow)}`);
  console.log(`   Cash-on-Cash: ${(metrics.cashOnCashReturn * 100).toFixed(2)}%`);
  console.log(`   Cap Rate: ${(metrics.capRate * 100).toFixed(2)}%`);
  console.log(`   DSCR: ${metrics.dscr.toFixed(2)}`);
  console.log(`   Composite Score: ${metrics.compositeScore.score}/100 (${metrics.compositeScore.grade})`);
  
  console.log(`\n📋 METHODOLOGY RESULTS:`);
  results.forEach(r => {
    const badge = r.verdict === 'PASS' ? '✅' : r.verdict === 'FAIL' ? '❌' : '⚠️';
    console.log(`   ${badge} ${r.name}: ${r.value} — ${r.verdict}`);
  });
  
  // Validation checks
  console.log(`\n✓ VALIDATION:`);
  
  const checks = [];
  
  // Check that cash flow calculations are internally consistent
  checks.push({
    name: 'Cash flow math',
    pass: Math.abs(metrics.monthlyCashFlow - (metrics.monthlyNOI - metrics.monthlyMortgagePayment)) < 0.01
  });
  
  // Check that cap rate is reasonable
  checks.push({
    name: 'Cap rate calculation',
    pass: metrics.capRate === (metrics.annualNOI / fixture.purchasePrice)
  });
  
  // Check that DSCR is calculated correctly
  if (metrics.annualMortgagePayment > 0) {
    checks.push({
      name: 'DSCR calculation',
      pass: Math.abs(metrics.dscr - (metrics.annualNOI / metrics.annualMortgagePayment)) < 0.01
    });
  }
  
  // Check composite score is between 0-100
  checks.push({
    name: 'Composite score range',
    pass: metrics.compositeScore.score >= 0 && metrics.compositeScore.score <= 100
  });
  
  // Check all methodologies have required fields
  const requiredFields = ['id', 'category', 'name', 'description', 'value', 'verdict', 'explanation'];
  const allHaveFields = results.every(r => requiredFields.every(f => r[f] !== undefined));
  checks.push({
    name: 'All methodologies have required fields',
    pass: allHaveFields
  });
  
  let allPassed = true;
  checks.forEach(check => {
    const status = check.pass ? '✅' : '❌';
    console.log(`   ${status} ${check.name}`);
    if (!check.pass) allPassed = false;
  });
  
  return allPassed;
}

// ============================================================================
// RUN ALL TESTS
// ============================================================================

console.log('\n');
console.log('█▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█');
console.log('█  DO THE NUMBERS WORK - ANALYZER TESTS   █');
console.log('█▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█');

let allTestsPassed = true;

Object.entries(testFixtures).forEach(([name, fixture]) => {
  const passed = runTest(name, fixture);
  if (!passed) allTestsPassed = false;
});

console.log('\n');
console.log('='.repeat(60));
if (allTestsPassed) {
  console.log('✅ ALL TESTS PASSED');
} else {
  console.log('❌ SOME TESTS FAILED');
  process.exit(1);
}
console.log('='.repeat(60));
console.log('\n');
