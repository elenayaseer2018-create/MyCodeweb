# CodeCrab Technologies

A custom studio website with static, crawlable HTML and a small vanilla JavaScript layer. It now uses CodeCrab's original cyan identity, authentic project artwork, official crab icon, client logos and founder portrait. Node.js generates 23 pages; esbuild minifies the combined CSS and browser JavaScript. No production package dependencies are required. Manrope is self-hosted.

## Run

Node.js 22 or newer:

```sh
npm ci
npm run build
npm start
```

The development server listens on port 3000 (`PORT` is configurable). Run `npm run dev` to rebuild and serve. After editing, rebuild and reload; there is no hot reload.

## Check

```sh
npm test
npm run test:browser
```

Browser tests use `/usr/bin/chromium` by default in this cloud environment. Set `CHROMIUM_PATH` to another installed Chromium executable outside this environment. Tests cover all main pages, navigation, email handoff, submission failure/success using a mocked provider, accessibility in both themes, and twelve viewport widths from 320 to 2560px. The tests do not demonstrate delivery by an actual mail provider.

## Structure

- `src/content.mjs`: company identity, services, process, FAQ, editable budget options, optional form endpoint.
- `src/components.mjs`: shared header, footer, buttons, service cards, workflow illustration, process and FAQ.
- `src/pages.mjs`: home, portfolio, services, six service pages, about, contact and 404.
- `src/projects.mjs`: six genuine project entries and five verified client identities.
- `src/showcase.mjs`: sculptural hero, cinematic portfolio, project pages, varied capability compositions and founder portrait.
- `src/legacy.mjs`: retained legacy service, clients and careers pages.
- `public/studio.css`: the revised visual system, merged into the production stylesheet during build.
- `public/_redirects`: relevant permanent redirects for verified legacy navigation URLs, also honored by the local server.
- `public/`: design tokens, responsive CSS, interactions, font-independent SVG artwork.
- `scripts/build.mjs`: static HTML, metadata, structured data, sitemap and robots generation.
- `scripts/server.mjs`: local server with status codes, traversal checks and security headers.
- `dist/`: generated production output, ignored by Git.

## Contact delivery

On Netlify builds (`NETLIFY=true`), the contact page uses Netlify Forms with a statically discoverable form name, hidden `form-name` field and honeypot. Submissions are URL-encoded. Success requires a successful service response; errors preserve the visitor's brief. Enable form detection in the Netlify dashboard if disabled, redeploy and verify an actual submission there. Configure notifications in the dashboard if email delivery is desired. Local tests exercise a mocked service and do not prove inbox delivery.

Outside Netlify, the form validates a brief and creates a `mailto:` link. The visitor must open their email app and send it. A copy option supports webmail. The interface explicitly states that the website has not sent the email.

For a different host, set `studio.inquiryEndpoint` in `src/content.mjs` to a verified HTTPS JSON inquiry endpoint. Configure provider-side validation, origin restrictions and abuse prevention. Do not place secret keys in this file. The existing WordPress site uses Contact Form 7, reCAPTCHA and Akismet; that installation is unchanged. This build does not bypass its captcha or claim cross-origin compatibility with its protected forms.

## Deploy

Connect `elenayaseer2018-create/MyCodeweb`, branch `main`, to Netlify. Build settings are included: Node.js 24, command `npm run build`, publish `dist`. Connected branch pushes trigger builds. If a deploy-template flow created a separate repository, reconnect the Netlify site to this repository to receive updates. A hosting account/authorized connection is required; a local server does not create a public URL. No Netlify deployment has been verified from this cloud machine.

For previews, keep indexing disabled through the host’s preview settings. Set `studio.url` to the final production domain before a production build. The current canonical domain is `https://codecrab.net`. Configure the host to return a 404 status with `404.html` for missing routes. Social metadata includes a raster PNG exported from the original SVG artwork.

## Existing-site migration

The existing site became accessible during the second design revision. It is WordPress using the Startit theme, WPBakery/Visual Composer, Contact Form 7 and Yoast SEO. Public pages, media metadata and the sitemap were audited on October 7, 2026. This standalone Netlify redesign is not an installed WordPress theme and does not replace or delete the current live site.

The official icon, six project images, five client logos and Yasir's portrait were recovered from the original site. There are no invented results, project platforms, dates, statistics or testimonials. The individual project pages on the original site return HTTP 500, so the new project pages use only verified titles, categories and artwork. Inconsistent team biographies and unverified testimonials are omitted. See `CONTENT-SOURCES.md` for provenance. The first design remains recoverable at Git commit `dea9c76` and local branch `archive/initial-design`.

Verified principal navigation URLs have relevant permanent redirects; three legacy service pages, the clients page and careers page retain dedicated content. Before a production domain migration, review the complete original sitemap, including secondary taxonomy archives and duplicate educational/charity project listings, and agree the CMS migration approach. No current hiring openings are inferred from historical job posts.

## Design and accessibility

Graphite surfaces, original-brand cyan, a metallic code sculpture with interactive Design/Build/Connect controls, large genuine project showcases, asymmetrical compositions, visual capability presentations and a contrasting final invitation. Light mode is separately tokenized. Menus support Escape and keyboard focus; forms have labeled fields and inline errors; FAQ uses native details/summary. Focus styles, reduced-motion support and touch targets are included. Automated accessibility checks are useful evidence, not full manual WCAG certification.
