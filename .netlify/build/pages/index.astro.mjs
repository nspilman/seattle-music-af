import { e as createComponent, m as maybeRenderHead, k as renderScript, r as renderTemplate, l as renderComponent, f as createAstro } from '../chunks/astro/server_BjHVUQXF.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                 */
import { $ as $$Layout } from '../chunks/Layout_BNm-0pN4.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$TypedHeading = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="typing-container" data-astro-cid-tsqe6jpn> <h1 id="typed-heading" class="text-[1.6rem] md:text-[2.2rem] font-bold text-center mb-3 leading-tight text-color-text-primary whitespace-nowrap" data-astro-cid-tsqe6jpn></h1> </div>  ${renderScript($$result, "/Users/natespilman/Repos/seattle-music-af/seattle-music-af/src/components/TypedHeading.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/natespilman/Repos/seattle-music-af/seattle-music-af/src/components/TypedHeading.astro", void 0);

const $$SeattleMusicLanding = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"> <!-- Main content --> <div class="relative max-w-xl w-full flex flex-col items-center p-10 z-10"> ${renderComponent($$result, "TypedHeading", $$TypedHeading, {})} <div class="text-[1.1rem] text-color-text-secondary text-center mb-6 font-medium tracking-wide">
Web infrastructure for Seattle musicians
</div> <div class="text-[1.5rem] text-color-text-secondary mb-8 text-center font-medium">
Coming Soon
</div> <div class="text-center mb-6"> <p class="text-color-text-secondary text-[0.9rem] mb-3">
Help us build what <span class="font-semibold">you</span> need most. Tell us what features we should prioritize first!
</p> </div> <div class="flex flex-col items-center mb-10"> <a href="/survey" class="seattle-button text-[0.95rem] px-8 py-3 rounded-none font-medium tracking-wide uppercase transition hover:opacity-90" style="background-color: #1C4B4C;">
Take Our Survey
</a> <span class="text-[0.75rem] text-color-text-secondary mt-2.5 font-medium">
for free and discounted services on launch
</span> </div> <!-- Updated wave visualization --> <svg class="w-[240px] h-[40px] mx-auto block mb-4" viewBox="0 0 240 40"> <path d="M0 20 Q 30 10 60 15 T 120 25 T 180 15 T 240 20" stroke="currentColor" stroke-width="1" fill="none" class="text-color-accent opacity-60"></path> </svg> <div class="text-color-text-secondary text-[0.8rem] text-center tracking-wide">
#SeattleMusicAF
</div> </div> </div>`;
}, "/Users/natespilman/Repos/seattle-music-af/seattle-music-af/src/components/SeattleMusicLanding.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SeattleMusicLanding", $$SeattleMusicLanding, {})} ` })}`;
}, "/Users/natespilman/Repos/seattle-music-af/seattle-music-af/src/pages/index.astro", void 0);

const $$file = "/Users/natespilman/Repos/seattle-music-af/seattle-music-af/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
