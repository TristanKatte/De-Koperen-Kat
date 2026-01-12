# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

# Website Redesign – De Koperen Kat Brewery

This project is a complete redesign of the website for **De Koperen Kat**, a local craft brewery.  
The goal of the redesign was to improve the visual identity, usability, accessibility, and performance of the website, while keeping the authentic character of the brewery.

## Client

**De Koperen Kat**  
Independent craft brewery focused on traditional and experimental beers.  
The website is used to:

- Present their beer assortment
- Promote events and tastings
- Share the story and identity of the brewery
- Provide practical information for visitors

## Project Goals

- Create a modern, professional visual appearance
- Improve readability and accessibility (WCAG-focused)
- Make the content easier to maintain through a CMS (Supabase)
- Optimize performance (image optimization, Lighthouse, Core Web Vitals)
- Improve mobile experience
- Use a scalable component-based architecture

## Key Features

- Homepage with hero, beer carousel, and clear calls-to-action
- Beer overview and detail pages
- Events overview
- Responsive layout using container queries
- Accessible navigation and focus states
- Animated transitions using GSAP (with reduced-motion support)
- Optimized images served via CDN
- Modular SvelteKit component structure

## Design & UX Decisions

- Color palette and typography are based on the brewery’s brand identity
- Section backgrounds are used to create visual rhythm and hierarchy
- Large imagery to emphasize craftsmanship and atmosphere
- Clear contrast and readable font sizes for accessibility
- Mobile-first layout with progressive enhancement

## Target Audience

- Craft beer enthusiasts
- Visitors of the brewery
- Event attendees
- Potential distributors or partners

## Technologies Used

- SvelteKit
- Supabase (content & media)
- GSAP (animations)
- Netlify (deployment)


