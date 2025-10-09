"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settings = void 0;
exports.default = [
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
exports.settings = {
    cors: {
        origin: ['http://localhost:5173'], // hier jouw Svelte dev URL
        headers: ['Content-Type', 'Authorization'],
    },
};
