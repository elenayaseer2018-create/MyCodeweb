import { button, cta, esc, sectionHead } from "./components.mjs";
import { clients } from "./projects.mjs";
// Existing public URLs that need their own content rather than an unrelated redirect.
export const legacyPages = [
  {
    path: "/our-services/mobile-apps-development/",
    title: "Mobile App Development",
    intro: "Useful on the move.",
    description:
      "Mobile application design and development shaped around your users, workflows and business requirements.",
    items: [
      "Mobile experience planning",
      "Interface design and prototypes",
      "Application development scoping",
      "Integration and launch planning",
    ],
  },
  {
    path: "/our-services/social-media-management/",
    title: "Social Media Management",
    intro: "A more coherent presence.",
    description:
      "Connect your brand, content and digital channels with a clearer direction for your business.",
    items: [
      "Brand and content direction",
      "Channel planning",
      "Creative assets",
      "Connections to your website and campaigns",
    ],
  },
  {
    path: "/our-services/digital-marketing/",
    title: "Digital Marketing",
    intro: "Give your next move a foundation.",
    description:
      "Landing pages, analytics and connected marketing tools that bring your digital activity into a more considered system.",
    items: [
      "Landing pages and funnels",
      "Analytics and event tracking",
      "Marketing technology integrations",
      "Campaign experience planning",
    ],
  },
];
export function legacyService(s) {
  return `<section class="page-hero container"><div class="eyebrow">CodeCrab / ${esc(s.title)}</div><h1>${esc(s.intro)}</h1><p>${esc(s.description)}</p></section><section class="section"><div class="container detail-layout"><div><span class="eyebrow">Start with your goals</span><h2>A considered approach.<br>A clear next step.</h2><p>Tell us about your existing tools, audience and requirements. We’ll discuss the scope and the right way forward.</p>${button("Discuss your project", "/contact/")}</div><div class="detail-deliverables">${s.items.map((item, i) => `<div><span class="mono">0${i + 1}</span><h3>${esc(item)}</h3></div>`).join("")}</div></div></section>${cta()}`;
}
export function clientsPage() {
  return `<section class="page-hero container"><span class="eyebrow">The client portfolio</span><h1>In good company<span class="accent">.</span></h1><p>A selection of client identities featured on the existing CodeCrab website.</p></section><section class="section"><div class="container">${sectionHead("Different industries. Individual businesses.", "Every business deserves<br>its own point of view.")}<div class="client-directory">${clients.map(([asset, name]) => `<div><img src="/assets/${asset}.webp" width="395" height="225" alt="${name}" loading="lazy"></div>`).join("")}</div></div></section>${cta()}`;
}
export function careersPage() {
  return `<section class="page-hero container"><span class="eyebrow">Work with CodeCrab</span><h1>Good work starts<br>with good people.</h1><p>Interested in design, development or digital collaboration? Introduce yourself and share your work.</p></section><section class="section"><div class="container"><h2>Start a conversation.</h2><p>We’re not listing specific openings here. For current opportunities, email the studio with your experience and portfolio.</p>${button("Introduce yourself", "mailto:info@codecrab.net?subject=Working%20with%20CodeCrab")}</div></section>`;
}
