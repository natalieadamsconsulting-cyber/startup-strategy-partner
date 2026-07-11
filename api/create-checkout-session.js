const Stripe = require('stripe');

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) return res.status(500).json({ error: "Stripe key not configured" });

  try {
    const stripe = new Stripe(apiKey);
    const { userId, email, plan } = req.body;

    const priceId = plan === "early"
      ? process.env.EARLY_ADOPTER_STRIPE_PRICE_ID
      : process.env.REACT_APP_STRIPE_PRICE_ID;

    const sessionConfig = {
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      success_url: `${req.headers.origin}/?payment=success`,
      cancel_url: `${req.headers.origin}/?payment=cancelled`,
      client_reference_id: userId,
      customer_email: email,
      // Shows a "promo code" field on Stripe's checkout page so beta
      // testers can enter a 100%-off coupon instead of paying.
      allow_promotion_codes: true,
    };

    // Regular plan gets a 7-day trial; early adopter plan charges immediately.
    if (plan !== "early") {
      sessionConfig.subscription_data = { trial_period_days: 7 };
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};
