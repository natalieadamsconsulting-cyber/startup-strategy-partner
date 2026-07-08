const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    const sig = req.headers['stripe-signature'];
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  // Initialize Supabase
  const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
  );

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const clerkUserId = session.client_reference_id;
        const stripeCustomerId = session.customer;
        const stripeSubscriptionId = session.subscription;

        if (clerkUserId) {
          await supabase
            .from('users')
            .upsert({
              id: clerkUserId,
              stripe_customer_id: stripeCustomerId,
              stripe_subscription_id: stripeSubscriptionId,
              subscription_status: 'active',
              updated_at: new Date().toISOString()
            });
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const stripeCustomerId = subscription.customer;
        const status = subscription.status;

        await supabase
          .from('users')
          .update({
            subscription_status: status,
            updated_at: new Date().toISOString()
          })
          .eq('stripe_customer_id', stripeCustomerId);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const stripeCustomerId = subscription.customer;

        await supabase
          .from('users')
          .update({
            subscription_status: 'cancelled',
            updated_at: new Date().toISOString()
          })
          .eq('stripe_customer_id', stripeCustomerId);
        break;
      }
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('Webhook handler error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};

// Helper to get raw body for Stripe signature verification
function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}
