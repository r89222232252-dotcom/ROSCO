import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = 'sb_publishable_yrK1E-o_JFkMtoALyak5Uw_89fM3TAx';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
