import { createClient as baseCreateClient, type Route } from '@prismicio/client';
import { type CreateClientConfig, enableAutoPreviews } from '@prismicio/svelte/kit';
import sm from '../../slicemachine.config.json';

/**
 * Repository naam vanuit je .env of slicemachine config
 */
export const repositoryName = sm.repositoryName;

/**
 * Route resolvers voor Prismic-documenten
 * — Voeg hier mappings toe tussen Prismic document types en je SvelteKit routes
 */
const routes: Route[] = [
  { type: 'homepage', path: '/' },
  { type: 'bieren', path: '/bieren' },
  { type: 'evenement', path: '/evenementen/:uid' },
];

/**
 * Client configuratie
 */
export const createClient = ({ cookies, ...config }: CreateClientConfig = {}) => {
  const client = baseCreateClient(import.meta.env.VITE_PRISMIC_REPO_URL || repositoryName, {
    accessToken: import.meta.env.VITE_PRISMIC_ACCESS_TOKEN,
    routes,
    ...config,
  });

  enableAutoPreviews({ client, cookies });

  return client;
};
