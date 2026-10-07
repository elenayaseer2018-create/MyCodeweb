import { studio, services, process, faqs } from "./content.mjs";
export const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
export const arrow =
  '<span aria-hidden="true"><svg class="inline-arrow" viewBox="0 0 20 20" fill="none"><path d="M4 16 16 4M5 4h11v11" stroke="currentColor" stroke-width="1.4"/></svg></span>';
export const button = (text, href, secondary = false) =>
  `<a class="button ${secondary ? "button-secondary" : ""}" href="${href}">${text}${arrow}</a>`;
export const logo = `<img class="brand-symbol" src="/assets/brand-crab.webp" width="40" height="40" alt=""><span>CodeCrab<span class="brand-dot">.</span></span>`;
export function icon(type) {
  const p = {
    web: "M4 7h24v18H4z M4 12h24 M9 9.5h.01 M13 9.5h.01 M13 17l-3 3 3 3 M19 17l3 3-3 3",
    platform: "M5 5h9v9H5z M19 5h9v9h-9z M5 19h9v9H5z M19 19h9v9h-9z",
    ai: "M16 3v6 M16 23v6 M3 16h6 M23 16h6 M7 7l4 4 M21 21l4 4 M7 25l4-4 M21 11l4-4 M16 9l7 7-7 7-7-7z",
    commerce: "M5 9h22l-2 19H7z M11 9V7a5 5 0 0 1 10 0v2 M11 15h.01 M21 15h.01",
    design: "M5 5h22v22H5z M11 5v22 M5 11h22 M17 17h10",
    growth: "M5 26V6 M5 26h23 M10 20l6-7 5 3 7-9 M23 7h5v5",
  };
  return `<svg class="service-icon" aria-hidden="true" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="${p[type]}"/></svg>`;
}
export function header(path) {
  return `<a class="skip-link" href="#main">Skip to content</a><header class="site-header"><div class="container header-inner"><a class="brand" href="/" aria-label="CodeCrab home">${logo}</a><nav class="desktop-nav" aria-label="Main navigation">${[
    ["Work", "/portfolio/"],
    ["Services", "/services/"],
    ["About", "/about/"],
    ["Contact", "/contact/"],
  ]
    .map(
      ([n, h]) =>
        `<a href="${h}" ${path === h ? 'aria-current="page"' : ""}>${n}</a>`,
    )
    .join(
      "",
    )}</nav><div class="header-actions"><button class="theme-toggle" aria-label="Switch to light theme" title="Change color theme"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1"/></svg></button>${button("Let’s talk", "/contact/")}<button class="menu-toggle" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open navigation"><span></span><span></span></button></div></div><nav id="mobile-nav" class="mobile-nav" aria-label="Mobile navigation" hidden>${[
    ["Work", "/portfolio/"],
    ["Services", "/services/"],
    ["About", "/about/"],
    ["Contact", "/contact/"],
  ]
    .map(([n, h]) => `<a href="${h}">${n}${arrow}</a>`)
    .join("")}</nav></header>`;
}
export function footer() {
  return `<footer class="footer"><div class="container"><div class="footer-top"><div><a class="brand" href="/" aria-label="CodeCrab home">${logo}</a><p>Digital products. Web experiences.<br>Intelligent technology.</p></div><div><span class="eyebrow">Explore</span><a href="/portfolio/">Work</a><a href="/services/">Services</a><a href="/about/">The studio</a><a href="/contact/">Start a project</a></div><div><span class="eyebrow">Capabilities</span>${services
    .slice(0, 4)
    .map((s) => `<a href="/services/${s.slug}/">${s.title}</a>`)
    .join(
      "",
    )}</div><div><span class="eyebrow">Say hello</span><a class="footer-email" href="mailto:${studio.email}">${studio.email}${arrow}</a><p>Open to conversations.<br>Built for collaboration.</p></div></div><div class="footer-word" aria-hidden="true">codecrab<span>.</span></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} CodeCrab Technologies</span><span>Thoughtfully designed. Carefully built.</span><a href="#top">Back to top ↑</a></div></div></footer>`;
}
export function cta() {
  return `<section class="cta section"><div class="container"><div class="eyebrow"><span class="status-dot"></span> Your next chapter starts here</div><div class="cta-inner"><h2>Have something<br><span>ambitious in mind?</span></h2><div><p>Tell us what you’re building.<br>Let’s find a better way forward.</p>${button("Start a project", "/contact/")}</div></div><div class="cta-line"><span>DESIGN</span><span>DEVELOPMENT</span><span>WHAT COMES NEXT ↗</span></div></div></section>`;
}
export function sectionHead(label, title, copy = "", link = "") {
  return `<div class="section-heading"><div><div class="eyebrow">${label}</div><h2>${title}</h2></div><div>${copy ? `<p>${copy}</p>` : ""}${link}</div></div>`;
}
export function serviceCards() {
  return `<div class="services-grid">${services.map((s, i) => `<a class="service-card" href="/services/${s.slug}/"><div class="service-card-top">${icon(s.icon)}<span class="mono">0${i + 1}</span></div><h3>${s.title}</h3><p>${s.short}</p><div class="service-card-bottom"><span>${s.tags.slice(0, 2).join(" · ")}</span>${arrow}</div></a>`).join("")}</div>`;
}
export function processSection() {
  return `<section class="section process-section"><div class="container">${sectionHead("05 / The way we work", "Good work starts<br>with a clear process.", "A considered path from the first conversation to what comes after launch.")}<ol class="process-list">${process.map(([t, d], i) => `<li><span class="process-number mono">0${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join("")}</ol></div></section>`;
}
export function faqSection() {
  return `<section class="section"><div class="container faq-layout"><div><div class="eyebrow">A little more clarity</div><h2>Good questions.<br>Straight answers.</h2><p>Something else on your mind?</p><a class="text-link" href="mailto:${studio.email}">Let’s talk ${arrow}</a></div><div class="faq-list">${faqs.map(([q, a]) => `<details><summary>${q}<span aria-hidden="true">+</span></summary><p>${a}</p></details>`).join("")}</div></div></section>`;
}
export function tech() {
  return `<section class="tech-section"><div class="container"><div class="eyebrow">The right tools. For the right reasons.</div><div class="tech-list"><span>WordPress</span><span>Shopify</span><span>Next.js</span><span>Webflow</span><span>JavaScript</span><span>API integrations</span></div></div></section>`;
}
export function heroArt() {
  return `<div class="hero-art" aria-label="Abstract branching diagram connecting design, engineering and intelligence" role="img"><div class="art-coordinate mono">CC / SYSTEM 001</div><div class="art-grid"></div><svg class="orbit-diagram" viewBox="0 0 600 560" fill="none" aria-hidden="true"><defs><linearGradient id="line-color"><stop stop-color="#43ddc3" stop-opacity=".12"/><stop offset=".5" stop-color="#43ddc3"/><stop offset="1" stop-color="#43ddc3" stop-opacity=".12"/></linearGradient></defs><ellipse cx="300" cy="270" rx="235" ry="155" transform="rotate(-35 300 270)" stroke="currentColor" stroke-opacity=".2"/><ellipse cx="300" cy="270" rx="235" ry="155" transform="rotate(35 300 270)" stroke="currentColor" stroke-opacity=".2"/><circle cx="300" cy="270" r="105" stroke="currentColor" stroke-opacity=".13" stroke-dasharray="3 9"/><path d="M95 178h105l100 92 105-90h110M105 365h95l100-95 105 94h110" stroke="url(#line-color)"/><path d="M300 82v105m0 167v105" stroke="url(#line-color)"/><circle cx="95" cy="178" r="4" fill="#43ddc3"/><circle cx="515" cy="364" r="4" fill="#43ddc3"/><circle cx="300" cy="82" r="4" fill="#43ddc3"/></svg><div class="core-symbol"><svg viewBox="0 0 100 100" fill="none" aria-hidden="true"><path d="M32 26 12 50l20 24M68 26l20 24-20 24M59 20 41 80" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="art-tag art-tag-one"><span class="tiny-dot"></span> Thoughtful design <span class="mono">01</span></div><div class="art-tag art-tag-two"><span class="tiny-dot"></span> Considered engineering <span class="mono">02</span></div><div class="art-tag art-tag-three"><span class="tiny-dot"></span> Practical intelligence <span class="mono">03</span></div><div class="art-caption mono">IDEA → INTERFACE → IMPACT</div></div>`;
}
export function aiSection() {
  return `<section class="section ai-section"><div class="container ai-layout"><div><div class="eyebrow">04 / Practical intelligence</div><h2>AI where it creates<br><span class="accent">real value.</span></h2><p>Connect the tools you use. Simplify the work you repeat. Create experiences that do a little more.</p><p>We bring AI services and automation into practical business workflows, with a clear purpose and people in control.</p><a class="text-link" href="/services/ai-automation/">Explore AI & automation ${arrow}</a></div><div class="workflow" aria-label="Illustrative workflow: request, understand, connect, human review, useful outcome"><div class="workflow-top mono"><span><span class="status-dot"></span> A MORE CONNECTED WORKFLOW</span><span>↗</span></div><div class="workflow-node">A request comes in <span>01</span></div><div class="workflow-connector"></div><div class="workflow-pair"><div>Understand<br><small>Context & intent</small></div><div>Connect<br><small>Your existing tools</small></div></div><div class="workflow-connector"></div><div class="workflow-node review">Human review <span>02</span></div><div class="workflow-connector"></div><div class="workflow-node outcome">A useful outcome <span>✓</span></div><p class="mono workflow-note">Illustrative process · Built around your business</p></div></div></section>`;
}
