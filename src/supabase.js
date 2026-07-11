// Conversation and user data is read/written through server-side API routes
// (/api/messages, /api/save-user), not directly from the browser. Those routes
// use Supabase's service-role key, which is never exposed to the client.
// Direct table access from the browser's public key is locked down at the
// database level (RLS denies it), so this indirection is required.

export async function saveMessage(userId, role, content) {
  try {
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, role, content })
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      console.error('Error saving message:', data.error || res.statusText);
    }
  } catch (err) {
    console.error('Save message error:', err);
  }
}

export async function getMessages(userId, limit = 60) {
  try {
    const res = await fetch(`/api/messages?userId=${encodeURIComponent(userId)}&limit=${limit}`);
    if (!res.ok) {
      console.error('Error loading messages:', res.statusText);
      return [];
    }
    const data = await res.json();
    return data.messages || [];
  } catch (err) {
    console.error('Get messages error:', err);
    return [];
  }
}

export async function saveUser(userId, email, name) {
  try {
    const res = await fetch('/api/save-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, email, name })
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      console.error('Error saving user:', data.error || res.statusText);
    }
  } catch (err) {
    console.error('Save user error:', err);
  }
}
