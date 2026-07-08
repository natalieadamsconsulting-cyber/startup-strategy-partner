const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userId } = req.body;

    const sessions = await stripe.checkout.sessions.list({
      limit: 10,
    });

    const activeSession = sessions.data.find(
      (session) =>
        session.client_reference_id === userId &&
        session.payment_status === "paid"
    );

    if (!activeSession) {
      return res.status(200).json({ hasSubscription: false });
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: activeSession.customer,
      status: "active",
      limit: 1,
    });

    return res.status(200).json({
      hasSubscription: subscriptions.data.length > 0,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
