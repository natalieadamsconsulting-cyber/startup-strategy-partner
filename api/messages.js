const { createClient } = require('@supabase/supabase-js');

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
  );

  // GET /api/messages?userId=...&limit=...
  // Returns the most recent `limit` messages for a user, oldest first.
  if (req.method === "GET") {
    try {
      const { userId, limit } = req.query;
      if (!userId) return res.status(400).json({ error: "userId is required" });

      const { data, error } = await supabase
        .from('conversations')
        .select('role, content, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(Number(limit) || 60);

      if (error) {
        console.error('Error loading messages:', error.message);
        return res.status(200).json({ messages: [] });
      }
      return res.status(200).json({ messages: (data || []).reverse() });
    } catch (err) {
      console.error('Messages GET error:', err.message);
      return res.status(200).json({ messages: [] });
    }
  }

  // POST /api/messages  { userId, role, content }
  if (req.method === "POST") {
    try {
      const { userId, role, content } = req.body;
      if (!userId || !role || !content) {
        return res.status(400).json({ error: "userId, role, and content are required" });
      }

      const { error } = await supabase
        .from('conversations')
        .insert({
          user_id: userId,
          role,
          content,
          created_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error saving message:', error.message);
        return res.status(500).json({ error: error.message });
      }
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error('Messages POST error:', err.message);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};
