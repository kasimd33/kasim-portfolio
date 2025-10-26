# UI Improvements (automated edits)

Date: 2025-10-25

Summary:
- Improved accessibility and layout to avoid header overlap and added a keyboard "skip to content" link.
- Added avatar support to the Hero section: uses `siteData.about.photo` or falls back to initials.
- Enhanced the animated background overlay used in the Hero:
  - Increased turbulence/displacement mapping for a more visible effect.
  - Mapped `animation.speed` to seconds for intuitive tuning.
  - Added `prefers-reduced-motion` detection to disable animations when requested by the user.
  - Provided a CSS gradient fallback when mask image loading fails.

Files changed:
- `src/app/page.tsx` — top padding for main to avoid header overlap.
- `src/components/Header.tsx` — added skip link and made logo a home link.
- `src/app/globals.css` — added `.skip-link` utility styles.
- `src/components/Hero.tsx` — added avatar support and tuned hero typography; increased ShadowOverlay intensity.
- `src/components/ui/shadow-overlay.tsx` — increased turbulence/displacement mappings, used animation duration mapping, and added reduced-motion support.

How to preview:
- Run the dev server: `npm run dev` and open http://localhost:3000
- To build for production: `npm run build`

Notes:
- The animated overlay uses an external mask image URL; consider moving it to `public/` if you want offline reliability.
- Some CSS at-rules may produce lint warnings depending on your editor's CSS parser; they were present before edits and are unrelated to the new changes.
