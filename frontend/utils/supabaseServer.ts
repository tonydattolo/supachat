import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_KEY;

if (!url || !serviceKey) {
  throw new Error("Bloody TypeScript!");
}

const supabaseServer = createClient(url, serviceKey);

export default supabaseServer;
