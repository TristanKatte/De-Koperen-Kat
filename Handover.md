# Handover - Stadsbrouwerij De Koperen Kat Website

## 1. Current Project Status
- Modern, responsive SvelteKit website is functionally complete.
- Hero section with crossfade images and scroll-triggered animations works.
- About section with zigzag layout of text and images is implemented.
- Beer, events, tasting sections have overview and detail pages.
- Webshop layout exists, but checkout is **not yet implemented**.
- Navigation and mobile hamburger menu are in place; responsive across most devices.
- Forms are for layout and design, but people can contact the brewery with emailaddresses at the footer.

## 2. Key Features Already Working
- Hero text and image animations using GSAP (ScrollTrigger & SplitText).
- Zigzag About section (text-image alternation).
- Beer & event grids with responsive cards.
- Tasting/visit section layout.
- Responsive navigation (sticky header, fixed mobile hamburger menu).
- Container queries for responsive layouts.
- Image optimization using `<picture>` and lazy-loading.

## 3. Major Challenges / Attention Points
- **Webshop checkout**: Currently redirects to contact page; needs Stripe or Mollie integration.
- **Responsive issues**: Breakpoints for very small devices (Samsung S20–25, 360px width) require container/media queries in rem units.
- **Hamburger menu z-index**: Can fall behind hero images on some pages.
- **Horizontal scroll**: Needs `overflow-x: hidden` fixes on `<body>` and careful sizing of containers/cards.
- **Animations**: SplitText should animate **words only**, respect `prefers-reduced-motion`.
- **Forms**: Forms still need an APi, like EmailJS or Resend to work properly.

## 4. Recommended Next Steps
1. Implement webshop checkout with Stripe or Mollie.
2. Fix small-device responsiveness, test container queries (especially for 22.5rem / 360px width).
3. Ensure hamburger menu is always visible above hero and other content.
4. Review horizontal overflow issues on all pages.
5. Prepare image assets with correct dimensions for hero, about, beer, and event sections.
6. Integrating an API, like EmailJS or Resend to let the forms work with Supabase.

