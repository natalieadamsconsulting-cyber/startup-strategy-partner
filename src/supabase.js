import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function saveMessage(userId, role, content) {
  try {
    const { error } = await supabase
      .from('conversations')
      .insert({
        user_id: userId,
        role: role,
        content: content,
        created_at: new Date().toISOString()
      });
    if (error) console.error('Error saving message:', error);
  } catch (err) {
    console.error('Supabase error:', err);
  }
}

export async function getMessages(userId, limit = 60) {
  try {
    // Pull only the most recent `limit` messages (cheaper reads, bounded
    // browser memory), then flip back to chronological order for display.
    const { data, error } = await supabase
      .from('conversations')
      .select('role, content, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) {
      console.error('Error loading messages:', error);
      return [];
    }
    return (data || []).reverse();
  } catch (err) {
    console.error('Supabase error:', err);
    return [];
  }
}

export async function saveUser(userId, email, name) {
  try {
    const { error } = await supabase
      .from('users')
      .upsert({
        id: userId,
        email: email,
        name: name || '',
        updated_at: new Date().toISOString()
      });
    if (error) console.error('Error saving user:', error);
  } catch (err) {
    console.error('Supabase error:', err);
  }
}
