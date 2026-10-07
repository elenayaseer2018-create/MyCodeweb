import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const paths = [
  "/",
  "/portfolio/",
  "/services/",
  "/about/",
  "/contact/",
  "/services/web-design-development/",
  "/services/web-apps/",
  "/services/ai-automation/",
  "/services/ecommerce/",
  "/services/ui-ux-design/",
  "/services/seo-performance/",
  "/portfolio-item/tembo-safaris-website/",
  "/portfolio-item/grandview-dental-care-website/",
  "/portfolio-item/sexy-eyewear-website/",
  "/portfolio-item/maid-and-cleaning-website/",
  "/portfolio-item/reimagine-earth-website/",
  "/portfolio-item/marley-shirts-website/",
  "/our-clients/",
  "/our-services/mobile-apps-development/",
  "/our-services/social-media-management/",
  "/our-services/digital-marketing/",
  "/we-are-hiring/",
  "/missing/",
];
test("all pages render without browser errors or failed assets", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error" && !m.text().includes("404"))
      errors.push(m.text());
  });
  for (const p of paths) {
    const response = await page.goto(p);
    expect(response.status()).toBe(p === "/missing/" ? 404 : 200);
    await expect(page.locator("h1")).toBeVisible();
  }
  expect(errors).toEqual([]);
});
test("all pages fit every requested viewport", async ({ page }) => {
  for (const width of [
    320, 360, 375, 390, 414, 768, 1024, 1280, 1366, 1440, 1920, 2560,
  ]) {
    await page.setViewportSize({ width, height: 900 });
    for (const p of paths) {
      await page.goto(p);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${p} at ${width}`,
      ).toBe(true);
    }
  }
});
test("dark and light pages pass automated WCAG AA checks", async ({ page }) => {
  for (const theme of ["dark", "light"]) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    for (const p of paths.filter((p) => p !== "/missing/")) {
      await page.goto(p);
      await page.evaluate(
        (t) => (document.documentElement.dataset.theme = t),
        theme,
      );
      await page.emulateMedia({ reducedMotion: "reduce" });
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(result.violations, `${p} ${theme}`).toEqual([]);
    }
  }
});
test("mobile navigation, theme persistence and FAQ", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.locator(".menu-toggle");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Services" })
    .click();
  await expect(page).toHaveURL(/\/services\//);
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.goto("/");
  const summary = page.locator("summary").first();
  await summary.click();
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
});
test("contact validates and produces a real email handoff", async ({
  page,
}) => {
  await page.goto("/contact/?service=web-apps");
  await expect(page.locator("[value=web-apps]")).toBeChecked();
  await page.getByRole("button", { name: "Prepare project email" }).click();
  await expect(page.locator("#name-error")).toHaveText(
    "Please complete this field.",
  );
  await page.getByLabel("Your name").fill("Test Client");
  await page.getByLabel("Email address").fill("client@example.com");
  await page
    .getByLabel("Tell us about your project")
    .fill("We need a new business website and a customer portal.");
  await page.getByRole("button", { name: "Prepare project email" }).click();
  const link = page.getByRole("link", { name: "Open project email" });
  await expect(link).toHaveAttribute("href", /^mailto:info@codecrab.net\?/);
  await expect(page.locator("#form-status")).toContainText(
    "It has not been sent",
  );
  expect(decodeURIComponent(await link.getAttribute("href"))).toContain(
    "Test Client",
  );
});
test("contact provider failure preserves the brief and success is explicit", async ({
  page,
}) => {
  await page.goto("/contact/");
  await page
    .locator("#project-form")
    .evaluate((e) => (e.dataset.endpoint = "/test-inquiry"));
  await page.route("**/test-inquiry", (r) =>
    r.fulfill({ status: 503, body: "Unavailable" }),
  );
  await page.getByLabel("Your name").fill("Test Client");
  await page.getByLabel("Email address").fill("client@example.com");
  await page.locator("[value=web-apps]").check();
  await page
    .getByLabel("Tell us about your project")
    .fill("We need a customer portal for an existing business.");
  await page.getByRole("button", { name: "Prepare project email" }).click();
  await expect(page.locator("#form-status")).toContainText("couldn’t submit");
  await expect(page.getByLabel("Your name")).toHaveValue("Test Client");
  await page.unroute("**/test-inquiry");
  await page.route("**/test-inquiry", (r) =>
    r.fulfill({ status: 200, body: "{}" }),
  );
  await page.getByRole("button", { name: "Send project brief" }).click();
  await expect(page.locator("#form-status")).toContainText(
    "has been submitted",
  );
});
test("screenshots", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.evaluate(() =>
    document
      .querySelectorAll(".reveal")
      .forEach((e) => e.classList.add("visible")),
  );
  await page.evaluate(async () => { for(const image of document.images){image.loading='eager'; await image.decode();} });
  await page.screenshot({
    path: "test-results/home-desktop.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: "test-results/home-mobile.png",
    fullPage: true,
  });
});

test("portfolio filters show real matching projects and reset", async ({
  page,
}) => {
  await page.goto("/portfolio/");
  await expect(page.locator(".project-card:visible")).toHaveCount(6);
  await page.getByRole("button", { name: "E-commerce", exact: true }).click();
  await expect(page.locator(".project-card:visible")).toHaveCount(2);
  await expect(page.locator("#project-count")).toHaveText("2 PROJECTS");
  await expect(
    page.getByRole("link", { name: "View Sexy Eyewear project" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "All", exact: true }).click();
  await expect(page.locator(".project-card:visible")).toHaveCount(6);
  await page.getByRole("link", { name: "View Tembo Safaris project" }).click();
  await expect(page.locator("h1")).toContainText("Tembo Safaris");
});
test("hero approach controls change meaningful content", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "02 Build", exact: true }).click();
  await expect(page.locator("#approach-title")).toHaveText(
    "Engineer the foundations.",
  );
  await expect(
    page.getByRole("button", { name: "02 Build", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "03 Connect", exact: true }).click();
  await expect(page.locator("#approach-title")).toHaveText(
    "Connect what comes next.",
  );
});
test("all recovered images load and have descriptive alternatives", async ({
  page,
}) => {
  for (const path of ["/", "/portfolio/", "/about/"]) {
    await page.goto(path);
    await page.evaluate(async () => {
      for (const img of document.images) {
        img.loading = "eager";
        await img.decode();
      }
    });
    expect(
      await page
        .locator("img")
        .evaluateAll((images) =>
          images.every((img) => img.complete && img.naturalWidth > 0),
        ),
    ).toBe(true);
  }
});
test("Netlify form posts URL-encoded fields and preserves failure behavior", async ({
  page,
}) => {
  await page.goto("/contact/");
  await page.locator("#project-form").evaluate((f) => {
    f.dataset.delivery = "netlify";
    f.dataset.endpoint = "/netlify-test";
  });
  await page.route("**/netlify-test", async (route) => {
    expect(route.request().headers()["content-type"]).toContain(
      "application/x-www-form-urlencoded",
    );
    const fields = new URLSearchParams(route.request().postData());
    expect(fields.get("form-name")).toBe("project-inquiry");
    expect(fields.get("services")).toBe("web-apps");
    await route.fulfill({ status: 200, body: "Accepted" });
  });
  await page.getByLabel("Your name").fill("Test Client");
  await page.getByLabel("Email address").fill("client@example.com");
  await page.locator("[value=web-apps]").check();
  await page
    .getByLabel("Tell us about your project")
    .fill("We need a customer portal for an existing business.");
  await page.getByRole("button", { name: "Prepare project email" }).click();
  await expect(page.locator("#form-status")).toContainText(
    "has been submitted",
  );
});
