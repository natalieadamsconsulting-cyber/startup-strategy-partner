import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Save a single message to conversations table
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

    if (error) {
      console.error('Error saving message:', error);
    }
  } catch (err) {
    console.error('Supabase error:', err);
  }
}

// Save or update user record
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

    if (error) {
      console.error('Error saving user:', error);
    }
  } catch (err) {
    console.error('Supabase error:', err);
  }
}
