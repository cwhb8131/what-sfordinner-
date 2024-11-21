import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
// export const supabase = createClient(
//   process.env.VITE_SUPABASE_URL!,
//   process.env.VITE_SUPABASE_ANON_KEY!
// );
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;  
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = 'https://gywckybtwhkmudyzawaj.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5d2NreWJ0d2hrbXVkeXphd2FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5MzIyNzUsImV4cCI6MjA0NzUwODI3NX0.TCe0jye8KKyR6G9CX2ZhhCq3-P0CAgZ-nOf8Mo-VauY'; 

// Supabase クライアントを作成
const supabase = createClient(supabaseUrl, supabaseAnonKey);



export { supabase };

