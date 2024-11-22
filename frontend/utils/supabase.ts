import { createClient } from '@supabase/supabase-js';


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;  
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;


// Supabase クライアントを作成
const supabase = createClient(supabaseUrl, supabaseAnonKey);



export { supabase };

