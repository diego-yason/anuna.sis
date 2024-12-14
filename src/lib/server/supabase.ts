import { createClient } from "@supabase/supabase-js";
import { SUPABASE_SERVICE_KEY } from "$env/static/private";
import { PUBLIC_SUPABASE_URL } from "$env/static/public";

import type { Database } from "$types/database";

export const admin = createClient<Database>(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY);
