export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

export const settings = {
  cors: {
    origin: ['http://localhost:5173'], // hier jouw Svelte dev URL
    headers: ['Content-Type', 'Authorization'],
  },
};