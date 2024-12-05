import containerQueries from "@tailwindcss/container-queries";
import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";
import type { Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{html,js,svelte,ts}"],

    theme: {
        extend: {},
    },

    plugins: [typography, containerQueries, forms],
} satisfies Config;
