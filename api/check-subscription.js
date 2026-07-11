const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { userId, email } = req.body;

    // Comma-separated allowlist for beta testers, managed via the
    // BETA_ACCESS_EMAILS env var in Vercel — no code change needed to
    // add/remove someone, just update the env var and redeploy.
    const betaEmails = (process.env.BETA_ACCESS_EMAILS || "")
      .split(",")
      .map(e => e.trim().toLowerCase())
      .filter(Boolean);

    // Owner + beta-tester bypass
    if (email === "natalie.adams888@gmail.com" ||
        email === "natalieadamsconsulting@gmail.com" ||
        betaEmails.includes((email || "").toLowerCase())) {
      return res.status(200).json({ hasSubscription: true });
    }

    // Check Supabase first — fast
    const supabase = createClient(
      process.env.REACT_APP_SUPABASE_URL,
      process.env.SUPABASE_SECRET_KEY
    );

    const { data: userData } = await supabase
      .from('users')
      .select('subscription_status, stripe_customer_id')
      .eq('id', userId)
      .single();

    if (userData?.subscription_status === 'active' ||
        userData?.subscription_status === 'trialing') {
      return res.status(200).json({ hasSubscription: true });
    }

    // Fallback — check Stripe by email
    if (email) {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      const customers = await stripe.customers.list({ email, limit: 5 });

      for (const customer of customers.data) {
        const [active, trialing] = await Promise.all([
          stripe.subscriptions.list({ customer: customer.id, status: "active", limit: 1 }),
          stripe.subscriptions.list({ customer: customer.id, status: "trialing", limit: 1 })
        ]);

        if (active.data.length > 0 || trialing.data.length > 0) {
          // Save to Supabase for next time
          await supabase
            .from('users')
            .upsert({
              id: userId,
              email: email,
              stripe_customer_id: customer.id,
              subscription_status: active.data.length > 0 ? 'active' : 'trialing',
              updated_at: new Date().toISOString()
            });

          return res.status(200).json({ hasSubscription: true });
        }
      }
    }

    return res.status(200).json({ hasSubscription: false });

  } catch (error) {
    console.error("Subscription check error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};
