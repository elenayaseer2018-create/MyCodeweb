# CodeCrab Technologies

A dark-first editorial studio website with static, crawlable HTML and a small vanilla JavaScript layer. Node.js generates the pages; no framework or production dependencies are required. Manrope is self-hosted. All illustrations are lightweight SVG/CSS, rather than stock imagery or client mockups.

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
- `public/`: design tokens, responsive CSS, interactions, font-independent SVG artwork.
- `scripts/build.mjs`: static HTML, metadata, structured data, sitemap and robots generation.
- `scripts/server.mjs`: local server with status codes, traversal checks and security headers.
- `dist/`: generated production output, ignored by Git.

## Contact delivery

By default the form validates a brief and creates a `mailto:` link. The visitor must open their email app and send it. A copy option supports webmail. The interface explicitly states that the website has not sent the email. No brief is stored by this application.

To enable direct submission, set `studio.inquiryEndpoint` in `src/content.mjs` to a verified HTTPS inquiry endpoint that accepts JSON and returns a successful HTTP status only when accepted. Configure provider-side validation, origin restrictions and abuse prevention. A frontend honeypot alone is not server-side spam protection. No existing CodeCrab form provider could be inspected. Do not place secret keys in this file. Rebuild and test actual delivery before publishing. Adjust the privacy language to match the provider’s retention policy.

## Deploy

The repository includes Vercel and Netlify build settings. Import this repository in the selected hosting account: build `npm run build`, publish `dist`. Alternatively upload the contents of `dist` to a static host. A hosting account/authorized deployment connection is required for a public URL; a local running server does not create one. No deployment has been performed.

For previews, keep indexing disabled through the host’s preview settings. Set `studio.url` to the final production domain before a production build. The current canonical domain is `https://codecrab.net`. Configure the host to return a 404 status with `404.html` for missing routes. Social metadata includes a raster PNG exported from the original SVG artwork.

## Existing-site migration

The provided checkout was empty. Requests to `codecrab.net`, `www.codecrab.net`, the WordPress REST endpoint and sitemap were denied by the cloud network proxy. The deployed stack, official logo, current slugs, client projects, testimonials and integrations have not been verified. This standalone build is not an installed WordPress theme and does not modify the live website.

The founder identity, email address and capabilities come from the supplied brief. There are no invented clients, project results, statistics, portraits or testimonials. The abstract bracket mark is a proposed redesign element, not a recovered official logo. The portfolio page has an honest empty state and a project-example inquiry CTA until authentic material is available.

Before replacing the production site, recover its content and assets, inventory existing URLs, preserve or map them with verified redirects, integrate its form delivery, and confirm the current CMS migration requirements. Do not delete the existing website or create guessed redirects. The cloud configuration draft includes domain additions for `codecrab.net` and `www.codecrab.net`; applying them may allow this audit to continue.

## Design and accessibility

Graphite surfaces, mint-cyan accents, variable typography, a branching code motif and deliberately varied editorial layouts. Light mode is separately tokenized. The menu supports Escape and keyboard focus. Forms have labeled fields and inline errors. FAQ uses native details/summary. Focus styles, reduced-motion support and responsive touch targets are included. Automated accessibility checks are useful evidence, not a claim of full manual WCAG certification.
