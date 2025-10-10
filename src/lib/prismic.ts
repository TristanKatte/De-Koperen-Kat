// src/lib/prismic.ts
import * as prismic from "@prismicio/client";

export const client = prismic.createClient(
  import.meta.env.VITE_PRISMIC_REPO_URL, {
    accessToken: import.meta.env.VITE_PRISMIC_API_TOKEN,
  }
);
