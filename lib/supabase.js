import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Save user chat history
export async function saveUserData(licenseKey, chatHistory) {
  const { data, error } = await supabase
    .from('users')
    .upsert({ 
      license_key: licenseKey, 
      chat_history: chatHistory,
      updated_at: new Date()
    });

  if (error) {
    console.error('Error saving:', error);
    return null;
  }
  return data;
}

// Load user chat history
export async function getUserData(licenseKey) {
  const { data, error } = await supabase
    .from('users')
    .select('chat_history, email')
    .eq('license_key', licenseKey)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error loading:', error);
    return null;
  }
  return data;
}