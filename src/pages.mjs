import { studio, services } from "./content.mjs";
import {
  arrow,
  button,
  sectionHead,
  serviceCards,
  processSection,
  faqSection,
  tech,
  heroArt,
  aiSection,
  cta,
} from "./components.mjs";
import {
  studioHero,
  clientStrip,
  featuredWork,
  capabilityVisuals,
  founderEditorial,
  portfolioPage,
} from "./showcase.mjs";
const intro = (label, title, copy) =>
  `<section class="page-hero container"><div class="eyebrow">${label}</div><h1>${title}</h1><p>${copy}</p></section>`;
const principles = () =>
  `<div class="principles"><article><span class="mono">01 / INVOLVEMENT</span><h3>Senior thinking.<br>Hands-on building.</h3><p>Direct founder involvement brings design decisions and technical decisions into the same conversation.</p></article><article><span class="mono">02 / INTENTION</span><h3>Business first.<br>Technology second.</h3><p>We start with what needs to work, then choose the tools that make sense for your goals.</p></article><article><span class="mono">03 / PARTNERSHIP</span><h3>Clear conversations.<br>Better outcomes.</h3><p>Thoughtful scoping, clear communication and a shared understanding of what comes next.</p></article></div>`;
export function home() {
  return `${studioHero()}${clientStrip()}${featuredWork()}<section id="studio" class="section studio-manifesto"><div class="container"><div class="eyebrow">02 / Beyond the brief</div><h2>Not just a website.<br><span class="muted">Your next</span> <span class="accent">advantage.</span></h2><div class="manifesto-bottom"><div class="manifesto-mark" aria-hidden="true">{<span>+</span>}</div><p>We connect design, engineering and practical intelligence to turn your next idea into something that works beautifully in the real world.</p><a class="text-link" href="/about/">Our point of view ${arrow}</a></div></div></section><section class="section capabilities"><div class="container">${sectionHead("03 / Connected capabilities", "Four disciplines.<br>One bigger picture.", "The experience people see. The systems they rely on. The intelligence that connects them.")}${capabilityVisuals()}<div class="supporting-capabilities"><span>And the details that make the difference.</span><a href="/services/ui-ux-design/">UX/UI & product design ${arrow}</a><a href="/services/seo-performance/">Performance & growth ${arrow}</a></div></div></section>${aiSection()}${processSection()}${tech()}${founderEditorial()}${faqSection()}${cta()}`;
}
export function work() {
  return `${portfolioPage()}${cta()}`;
}
export function servicesPage() {
  return `${intro("Digital capabilities", 'Strategy, design<br>& technology.<br><span class="muted">One considered approach.</span>', "The visible experience and the systems behind it. Built around your business, with the right tools for the job.")}<section class="section services-overview"><div class="container">${services.map((s, i) => `<article class="service-row"><span class="mono row-number">0${i + 1}</span><div>${iconSafe(s)}<h2>${s.name}</h2><p>${s.description}</p><div class="tags">${s.tags.map((t) => `<span>${t}</span>`).join("")}</div></div><div><div class="eyebrow">What we can help with</div><ul class="deliverables">${s.deliverables.map((t) => `<li>${t}</li>`).join("")}</ul><a class="text-link" href="/services/${s.slug}/">Explore ${s.title.toLowerCase()} ${arrow}</a></div></article>`).join("")}</div></section>${processSection()}${cta()}`;
}
function iconSafe(s) {
  return `<span class="service-label mono">${s.title.toUpperCase()}</span>`;
}
export function serviceDetail(s) {
  return `${intro("Capabilities / " + s.title, s.name + '<span class="accent">.</span>', s.description)}<section class="section"><div class="container detail-layout"><div><div class="eyebrow">Built for</div><h2>${s.short}</h2><p>${s.uses}</p><div class="tags">${s.tags.map((t) => `<span>${t}</span>`).join("")}</div>${button("Discuss your project", "/contact/?service=" + s.slug)}</div><div class="detail-deliverables"><div class="eyebrow">A clear set of foundations</div>${s.deliverables.map((d, i) => `<div><span class="mono">0${i + 1}</span><h3>${d}</h3></div>`).join("")}<p>The final scope is shaped during discovery, based on your goals, existing systems and timeline.</p></div></div></section>${s.slug === "ai-automation" ? aiSection() : processSection()}<section class="section"><div class="container">${sectionHead("Connected capabilities", "Good experiences<br>bring disciplines together.")}<div class="related-services">${services
    .filter((x) => x.slug !== s.slug)
    .slice(0, 3)
    .map(
      (x) => `<a href="/services/${x.slug}/"><h3>${x.title}</h3>${arrow}</a>`,
    )
    .join("")}</div></div></section>${cta()}`;
}
export function about() {
  return `${intro("Independent by design", 'Technology should<br>make business<br><span class="accent">more capable.</span>', "CodeCrab is a boutique digital technology studio bringing design, development and practical intelligence into one conversation.")}<section class="section"><div class="container positioning-layout"><div><div class="eyebrow">Our point of view</div><h2>Purpose before<br>possibilities.</h2></div><div><p class="large-copy">There’s always another tool. Another trend. Another way to build.</p><p>We believe the real work is choosing what matters. Understanding the business, designing for the people using it and creating a digital foundation that can grow with both.</p><p>From a carefully crafted website to an integrated business platform, every project starts with a useful question: what should this make possible?</p></div></div></section>${founderEditorial()}<section class="section"><div class="container">${sectionHead("How we think", "Good principles.<br>Better decisions.")}${principles()}<div class="values-strip"><span>Design for humans.</span><span>Keep technology practical.</span><span>Keep improving.</span></div></div></section>${tech()}${processSection()}${cta()}`;
}
export function contact() {
  const netlify = process.env.NETLIFY === "true";
  return `${intro("Start a conversation", 'Let’s build<br>something <span class="accent">better.</span>', "An idea, an existing website or a challenge worth solving. We’d like to hear about it.")}<section class="section contact-section"><div class="container contact-layout"><aside><div class="eyebrow">Direct is good, too</div><a class="contact-email" href="mailto:${studio.email}">${studio.email}${arrow}</a><p>Tell us where you are now.<br>And where you want to go.</p><div class="contact-next"><div class="eyebrow">What comes next</div><ol><li>Share a little about your project.</li><li>We discuss the goals and requirements.</li><li>Together, we agree the right next step.</li></ol></div><p class="contact-note">${netlify ? "Your project brief is submitted securely through this website. Prefer email? Copy the brief and send it directly." : "Your brief opens in your email app. Nothing is sent until you send it. Prefer webmail? Copy your brief and email it directly."}</p></aside><form id="project-form" name="project-inquiry" method="POST" data-netlify="true" netlify-honeypot="fax" data-delivery="${netlify ? "netlify" : "email"}" data-endpoint="${netlify ? "/" : studio.inquiryEndpoint}"><input type="hidden" name="form-name" value="project-inquiry"><div class="form-grid"><div class="field"><label for="name">Your name <span>*</span></label><input id="name" name="name" autocomplete="name" required maxlength="120" placeholder="Alex Morgan"><span class="field-error" id="name-error"></span></div><div class="field"><label for="email">Email address <span>*</span></label><input id="email" name="email" type="email" autocomplete="email" required maxlength="254" placeholder="alex@company.com"><span class="field-error" id="email-error"></span></div><div class="field"><label for="company">Company <span class="optional">Optional</span></label><input id="company" name="company" autocomplete="organization" maxlength="160" placeholder="Your company"></div><div class="field"><label for="website">Current website <span class="optional">Optional</span></label><input id="website" name="website" type="url" autocomplete="url" maxlength="500" placeholder="https://"><span class="field-error" id="website-error"></span></div></div><fieldset class="service-selection"><legend>What do you have in mind? <span>*</span></legend><div class="service-options">${[...services.map((s) => [s.slug, s.title]), ["other", "Something else"]].map(([v, n]) => `<label><input type="checkbox" name="services" value="${v}"><span>${n}</span></label>`).join("")}</div><span class="field-error" id="services-error"></span></fieldset><div class="form-grid"><div class="field"><label for="budget">Budget direction</label><select id="budget" name="budget">${studio.budgets.map((b) => `<option>${b}</option>`).join("")}</select></div><div class="field"><label for="timeline">Timeline</label><select id="timeline" name="timeline"><option>Let’s discuss</option><option>As soon as practical</option><option>Within 1–3 months</option><option>Within 3–6 months</option><option>Exploring for now</option></select></div></div><div class="field"><label for="message">Tell us about your project <span>*</span></label><textarea id="message" name="message" rows="5" required minlength="20" maxlength="5000" placeholder="What are you building? What would a successful project look like?"></textarea><span class="field-error" id="message-error"></span></div><div class="honeypot" aria-hidden="true"><label for="fax">Leave this blank</label><input id="fax" name="fax" tabindex="-1" autocomplete="off"></div><div class="form-action"><button class="button" type="submit">${netlify ? "Send project brief" : "Prepare project email"} ${arrow}</button><button class="text-link copy-brief" type="button">Copy brief <span aria-hidden="true">↗</span></button></div><p class="form-privacy">${netlify ? "Your contact details and project brief are collected to respond to your inquiry. Please do not include sensitive information." : "Only the details you choose to share are included in your email. This site does not store your brief."}</p><div id="form-status" role="status" aria-live="polite"></div></form></div></section>${faqSection()}`;
}
export function notFound() {
  return `${intro("404 / A wrong turn", "This page escaped<br>the codebase.", "The page you’re looking for isn’t here. Let’s get you somewhere useful.")}<div class="container error-actions">${button("Back home", "/")}${button("Explore capabilities", "/services/", true)}</div>`;
}
