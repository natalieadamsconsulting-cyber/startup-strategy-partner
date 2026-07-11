const { createClient } = require('@supabase/supabase-js');

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { userId, email, name } = req.body;
    if (!userId) return res.status(400).json({ error: "userId is required" });

    const supabase = createClient(
      process.env.REACT_APP_SUPABASE_URL,
      process.env.SUPABASE_SECRET_KEY
    );

    const { error } = await supabase
      .from('users')
      .upsert({
        id: userId,
        email: email || '',
        name: name || '',
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error saving user:', error.message);
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Save-user error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
