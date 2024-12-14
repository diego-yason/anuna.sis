import { redirect } from "@sveltejs/kit";

import type { Actions } from "./$types";

export const actions: Actions = {
    anon: async ({ locals: { supabase } }) => {
        const { data, error } = await supabase.auth.signInAnonymously();

        if (error) {
            console.error("Error signing in anonymously:", error.message);
            return redirect(303, "/auth");
        }

        console.log("Signed in anonymously", data);
        return redirect(303, "/");
    },
};
