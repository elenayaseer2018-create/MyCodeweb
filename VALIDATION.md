# Validation — 2026-10-07

## Verified in this cloud machine

- Production generator builds 23 HTML pages: main pages, six service detail pages, six genuine project pages, three retained legacy services, clients, careers and a 404 page.
- Four Node tests pass: all sitemap pages and internal assets resolve, metadata and one H1 are present, HTTP error/method/slash behavior is correct, and verified legacy URLs redirect to relevant pages with query strings preserved.
- Eleven Chromium browser tests pass: all pages render without script errors, twelve widths have no horizontal overflow, both themes pass automated axe WCAG AA checks, mobile menu and Escape work, theme selection persists, FAQ opens, email handoff validates, mocked submission failures/success behave correctly, portfolio filters and project links work, hero controls update meaningful content, all recovered images decode, and native Netlify submissions send the expected URL-encoded form fields.
- Browser widths: 320, 360, 375, 390, 414, 768, 1024, 1280, 1366, 1440, 1920 and 2560px.
- Desktop and mobile screenshots were inspected.
- Revised local mobile Lighthouse: Performance 99, Accessibility 100, Best Practices 100, SEO 100. FCP 1.2s, LCP 2.0s, total blocking time 0ms, CLS 0. These are local lab measurements, not production field data or a guarantee.
- Self-hosted font is approximately 25 KB; minified browser JavaScript approximately 8.5 KB; combined minified CSS approximately 53 KB; hero SVG approximately 3.5 KB. Project artwork has responsive WebP variants. No runtime packages, stock hero imagery or heavy animation libraries.
- A production-mode `NETLIFY=true` build was checked for statically discoverable form markup, form name, honeypot, native submission mode and correct initial button labeling.

## Boundaries

The original website is now accessible. Public pages and metadata identify WordPress, Startit, WPBakery/Visual Composer, Contact Form 7 with reCAPTCHA/Akismet, and Yoast SEO. The official icon, original portfolio artwork, client logos and founder portrait were recovered. See CONTENT-SOURCES.md. Individual original project URLs return HTTP 500, so detailed case-study processes, dates, platforms and measured results remain unverified and are not fabricated.

The portfolio now has six authentic entries, filtering and individual project pages. The founder uses the original portrait. No invented quotations, clients, statistics or awards were added. The first design is preserved at commit dea9c76 and the local archive/initial-design branch.

Netlify Forms is configured for Netlify builds; its production markup and mocked browser submission behavior are verified. Local builds retain a clearly labeled email handoff. Actual Netlify acceptance/inbox delivery, live-domain migration, hosting publication and fresh-task snapshot restoration have not been verified from this machine. The WordPress form infrastructure has not been modified or bypassed.

No existing website files were deleted. All source files in this checkout were created for this request. Generated `dist`, dependencies, screenshots and test outputs are ignored.
