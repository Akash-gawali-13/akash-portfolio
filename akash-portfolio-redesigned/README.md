# Akash Gawali — Portfolio

A single-page portfolio site with a SUPERVISED / UNSUPERVISED persona toggle.
Plain HTML, CSS and JavaScript — no build step, no framework. Open `index.html`
in any browser and it works.

## Folder structure

```
akash-portfolio/
├── index.html              → page structure and content
├── css/
│   └── style.css           → all styles (design tokens, layout, both themes)
├── js/
│   └── script.js           → persona toggle, scroll reveals, counters,
│                              canvas visualizations, form handling
├── assets/
│   ├── images/
│   │   ├── profile.jpg      → About section portrait — REPLACE with a real photo
│   │   ├── project-01.jpg   → District Dashboard with AI — REPLACE
│   │   ├── project-02.jpg   → Sign Language Translation — REPLACE
│   │   ├── project-03.jpg   → Biometric Verification Engine — REPLACE
│   │   ├── project-04.jpg   → Outreach Automation Pipeline — REPLACE
│   │   ├── project-05.jpg   → Resume Screening Platform — REPLACE
│   │   └── og-image.jpg     → social-share preview image (1200×630) — REPLACE if desired
│   └── icons/
│       ├── favicon-16.png
│       ├── favicon-32.png
│       ├── favicon-192.png
│       └── favicon-512.png  → browser tab icon (monogram "A") — REPLACE if desired
└── README.md
```

## Replacing the placeholder images

Every image currently in `assets/images/` is a **generated placeholder**, clearly
labeled in-image (e.g. "PROFILE PHOTO PLACEHOLDER — replace assets/images/profile.jpg").
None of it is real content — it exists so the folder has the right shape and nothing
looks broken while you gather real photos.

To swap one in: drop your real image into `assets/images/` using the **exact same
filename** (e.g. `profile.jpg`), and it will appear on the site immediately. No
HTML/CSS changes needed.

Recommended sizes:
- `profile.jpg` — at least 800×1000px, portrait orientation (the frame crops to 4:5)
- `project-0X.jpg` — at least 1600×900px, landscape (the frame crops to 16:9)
- `og-image.jpg` — exactly 1200×630px (standard social preview size)
- favicons — square, ideally provide a 512×512 source and re-export the smaller sizes

## Editing content

All copy lives directly in `index.html` — section by section, in the order it
appears on the page (hero → stats → about → expertise → experience → projects →
training → contact → footer). Search for the relevant heading text to find the
right spot.

## Editing design

- Colors, fonts, spacing tokens: top of `css/style.css`, in the `:root` and
  `html[data-mode="unsupervised"]` blocks.
- Section-specific styles are grouped below that, each under a `/* ---- NAME ---- */`
  comment matching the section in `index.html`.

## Editing behavior

`js/script.js` is a single IIFE, organized top to bottom as:
nav scroll state → persona toggle → scroll-reveal animations → animated counters →
scroll-progress indicator → contact form → hero canvas visualization → contact
canvas visualization.

## Notes

- Fonts (Anton, Space Grotesk, JetBrains Mono) are loaded from Google Fonts via
  `<link>` tags in `index.html` — an internet connection is needed for them to
  load; there's a system-font fallback if not.
- The contact form has no backend — submitting it opens the visitor's email client
  with the message pre-filled, addressed to the email in `index.html`. Wire it up
  to a real form service if you want submissions to land somewhere directly.
