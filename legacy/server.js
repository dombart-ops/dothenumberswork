/**
 * dothenumberswork.com - API Server
 * 
 * Endpoints:
 * POST /api/analyze         - Analyze a deal, returns results + creates analysis record
 * GET  /api/results/:id     - Get results (teaser or full based on payment status)
 * POST /api/checkout/:id    - Create Stripe checkout session
 * POST /api/webhook/stripe  - Stripe webhook for payment confirmation
 * GET  /api/health          - Health check
 */

const express = require('express');
const Database = require('better-sqlite3');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');
const cors = require('cors');
const path = require('path');
const { calculateDealMetrics, generateMethodologyResults } = require('./analyzer.js');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize database
const db = new Database(path.join(__dirname, 'analyses.db'));

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS analyses (
    id TEXT PRIMARY KEY,
    inputs TEXT NOT NULL,
    results TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    paid INTEGER DEFAULT 0,
    payment_intent_id TEXT,
    email TEXT,
    expires_at DATETIME
  );
  
  CREATE TABLE IF NOT EXISTS payments (
    id TEXT PRIMARY KEY,
    analysis_id TEXT,
    amount INTEGER,
    status TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (analysis_id) REFERENCES analyses(id)
  );
`);

// Generate unique ID
function generateId() {
  return 'analysis_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

// ============================================================================
// API ROUTES
// ============================================================================

/**
 * POST /api/analyze
 * Accept deal inputs, calculate all methodologies, store results
 * Returns: analysis ID + teaser results
 */
app.post('/api/analyze', (req, res) => {
  try {
    const inputs = req.body;
    
    // Validate required fields
    const required = ['purchasePrice', 'monthlyGrossRent', 'downPayment', 'interestRate'];
    const missing = required.filter(field => !inputs[field]);
    
    if (missing.length > 0) {
      return res.status(400).json({
        error: 'Missing required fields',
        missing
      });
    }
    
    // Calculate metrics
    const metrics = calculateDealMetrics(inputs);
    const results = generateMethodologyResults(metrics, inputs);
    
    // Generate ID and store
    const analysisId = generateId();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    const stmt = db.prepare(`
      INSERT INTO analyses (id, inputs, results, paid, expires_at)
      VALUES (?, ?, ?, 0, ?)
    `);
    
    stmt.run(
      analysisId,
      JSON.stringify(inputs),
      JSON.stringify(results),
      expiresAt.toISOString()
    );
    
    // Return teaser (first 3 results full, rest blurred)
    const teaserResults = results.map((r, index) => ({
      ...r,
      unlocked: index < 3, // Unlock first 3
      blurred: index >= 3
    }));
    
    res.json({
      success: true,
      analysisId,
      expiresAt,
      metrics: {
        compositeScore: metrics.compositeScore,
        monthlyCashFlow: Math.round(metrics.monthlyCashFlow),
        cashOnCashReturn: (metrics.cashOnCashReturn * 100).toFixed(2) + '%',
        capRate: (metrics.capRate * 100).toFixed(2) + '%'
      },
      results: teaserResults,
      lockedCount: results.length - 3,
      price: 3000 // $30.00 in cents
    });
    
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze deal' });
  }
});

/**
 * GET /api/results/:id
 * Get results for an analysis (teaser or full based on payment)
 */
app.get('/api/results/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    const stmt = db.prepare('SELECT * FROM analyses WHERE id = ?');
    const analysis = stmt.get(id);
    
    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }
    
    // Check if expired
    if (new Date(analysis.expires_at) < new Date()) {
      return res.status(410).json({ error: 'Analysis expired' });
    }
    
    const inputs = JSON.parse(analysis.inputs);
    const results = JSON.parse(analysis.results);
    const metrics = calculateDealMetrics(inputs);
    
    if (analysis.paid) {
      // Return full results
      res.json({
        success: true,
        paid: true,
        inputs,
        results,
        metrics: {
          compositeScore: metrics.compositeScore,
          monthlyCashFlow: Math.round(metrics.monthlyCashFlow),
          annualCashFlow: Math.round(metrics.annualCashFlow),
          cashOnCashReturn: (metrics.cashOnCashReturn * 100).toFixed(2) + '%',
          capRate: (metrics.capRate * 100).toFixed(2) + '%',
          dscr: metrics.dscr.toFixed(2),
          irr: (metrics.irrProjection.irr * 100).toFixed(2) + '%',
          totalCashInvested: Math.round(metrics.totalCashInvested)
        }
      });
    } else {
      // Return teaser
      const teaserResults = results.map((r, index) => ({
        ...r,
        unlocked: index < 3,
        blurred: index >= 3
      }));
      
      res.json({
        success: true,
        paid: false,
        metrics: {
          compositeScore: metrics.compositeScore
        },
        results: teaserResults,
        lockedCount: results.length - 3,
        price: 3000
      });
    }
    
  } catch (error) {
    console.error('Results error:', error);
    res.status(500).json({ error: 'Failed to retrieve results' });
  }
});

/**
 * POST /api/checkout/:id
 * Create Stripe checkout session for an analysis
 */
app.post('/api/checkout/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    
    const stmt = db.prepare('SELECT * FROM analyses WHERE id = ?');
    const analysis = stmt.get(id);
    
    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }
    
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Real Estate Deal Analysis',
            description: '23-methodology investment analysis report'
          },
          unit_amount: 3000 // $30.00
        },
        quantity: 1
      }],
      mode: 'payment',
      success_url: `${process.env.BASE_URL || 'http://localhost:' + PORT}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL || 'http://localhost:' + PORT}/analyze?id=${id}`,
      client_reference_id: id,
      customer_email: email
    });
    
    // Update analysis with payment intent
    const updateStmt = db.prepare(`
      UPDATE analyses SET payment_intent_id = ?, email = ? WHERE id = ?
    `);
    updateStmt.run(session.payment_intent, email, id);
    
    res.json({
      success: true,
      sessionId: session.id,
      url: session.url
    });
    
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

/**
 * POST /api/webhook/stripe
 * Stripe webhook to confirm payment and unlock results
 */
app.post('/api/webhook/stripe', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const analysisId = session.client_reference_id;
    
    // Mark analysis as paid
    const stmt = db.prepare(`
      UPDATE analyses SET paid = 1, payment_intent_id = ? WHERE id = ?
    `);
    stmt.run(session.payment_intent, analysisId);
    
    // Store payment record
    const paymentStmt = db.prepare(`
      INSERT INTO payments (id, analysis_id, amount, status)
      VALUES (?, ?, ?, ?)
    `);
    paymentStmt.run(
      session.id,
      analysisId,
      session.amount_total,
      'completed'
    );
    
    console.log(`Payment confirmed for analysis ${analysisId}`);
  }
  
  res.json({ received: true });
});

/**
 * GET /api/health
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: 'connected'
  });
});

/**
 * Serve the main app
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/analyze', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/results/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/success', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ============================================================================
// START SERVER
// ============================================================================

app.listen(PORT, () => {
  console.log(`🚀 dothenumberswork.com server running on port ${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
  console.log(`💳 Stripe key configured: ${process.env.STRIPE_SECRET_KEY ? '✅' : '❌ (payments disabled)'}`);
});
