import { e as createComponent, m as maybeRenderHead, r as renderTemplate, k as renderScript, f as createAstro, h as addAttribute, l as renderComponent, n as renderHead, o as renderSlot } from './astro/server_BjHVUQXF.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */

const $$SeattleBackground = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div data-astro-cid-asgvs77u> <!-- Background images --> <img src="/seattle.png" alt="" class="bg-image desktop-bg" data-astro-cid-asgvs77u> <img src="/space-needle.png" alt="" class="bg-image mobile-bg" data-astro-cid-asgvs77u> <!-- Grid pattern --> <div class="grid-pattern" data-astro-cid-asgvs77u> ${Array(12).fill(0).map(() => renderTemplate`<div class="vertical-line" data-astro-cid-asgvs77u></div>`)} ${Array(12).fill(0).map(() => renderTemplate`<div class="horizontal-line" data-astro-cid-asgvs77u></div>`)} </div> </div>`;
}, "/Users/natespilman/Repos/seattle-music-af/seattle-music-af/src/components/SeattleBackground.astro", void 0);

const $$Posthog = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderScript($$result, "/Users/natespilman/Repos/seattle-music-af/seattle-music-af/src/components/posthog.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/natespilman/Repos/seattle-music-af/seattle-music-af/src/components/posthog.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.png"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Space+Grotesk:wght@700;800&display=swap" rel="stylesheet"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Seattle Music Artist Foundry (#SeattleMusicAF)</title>${renderComponent($$result, "PostHog", $$Posthog, { "data-astro-cid-sckkx6r4": true })}${renderHead()}</head> <body data-astro-cid-sckkx6r4> ${renderComponent($$result, "SeattleBackground", $$SeattleBackground, { "data-astro-cid-sckkx6r4": true })} ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/natespilman/Repos/seattle-music-af/seattle-music-af/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
