import type { PageServerLoad } from "./$types.js";
import { superValidate } from "sveltekit-superforms";
import { schema } from "./(custom section)/customSectionSchema";
import { zod } from "sveltekit-superforms/adapters";

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(schema)),
    };
};
