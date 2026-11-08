# AKASH — THE SERIES

A cinematic, streaming-inspired portfolio for **Akash Gawali**: Data Scientist & AI Engineer, Pune — open to freelance.
Every section is an episode, every project is an Original, and the whole site plays like a series.

> A personal portfolio with a fictional streaming-platform look. It is not affiliated with Netflix or any other streaming service and uses none of their logos.

## Run it (Windows PowerShell)

Requires **Node.js 18+** (https://nodejs.org, LTS).

```powershell
cd C:\Users\Akash\Downloads\akash-the-series
npm install      # first time only
npm run dev      # open http://localhost:5173
```

Production build:

```powershell
npm run build    # writes dist/
npm run preview  # check the build locally
```

Deploy: drag the `dist/` folder onto Netlify, or connect the repo to Vercel/Netlify (build `npm run build`, output `dist`).

## Client-first setup (Nov 2026)

The page now runs: **Landing → Services → Work → About → Reviews → Contact → To Be Continued**.
You can change the order with `sectionOrder` in `src/data/portfolio.ts`.

| What | Where in `src/data/portfolio.ts` |
| --- | --- |
| The landing-page offer line ("I build AI tools…") | `profile.offer` |
| WhatsApp button in Contact. Use the number with country code and no "+" or spaces, e.g. `'919876543210'`. Leave it as `''` to hide the button. | `profile.whatsapp` |
| Contact form delivery. Create a free form at https://formspree.io and paste its ID. If you leave it empty, the form opens the visitor's email app instead. | `profile.formspreeId` |
| Outcome line on each project card and popup | `outcome:` on each project |
| Reviews section. It stays hidden until you add the first real testimonial. | `testimonials` |

**Before you share the site:**
1. **Contact form:** set up Formspree and paste the ID, so messages arrive in your Gmail.
2. **Testimonials:** add 2–3 real ones, with permission.
3. **Outcomes:** replace the outcome lines with real numbers wherever you have them.

## The AI layer

- **Landing page:** the site opens straight onto it, with no intro screen and no profile picker. The bike photo fills the screen in depth layers, so the text block sits *behind* Akash and slides out from behind his shoulder. Meanwhile, glowing dots and butterflies fly in from everywhere and form the name. The code is in `src/components/Hero.tsx` and `hero.css`.
- **Intro sound track:** every moment of the landing animation has a digital sound. There's a data stream as the dots fly in, a "lock" hit when they form the name, and a rising chirp as each line of text slides out. The cues are timed in `CUES` in `src/components/Hero.tsx`, and the sounds themselves are in `src/lib/sound.ts`.
- **Why "Tap for sound":** browsers block all audio until the visitor clicks, so no website can play sound on load. A small **TAP FOR SOUND** button appears instead. The first click or tap anywhere on the landing page replays the intro with its full sound track and the voice line *"Welcome to my world. I'm Akash Gawali."*, once per visit. The line is `WELCOME_LINE` in `src/lib/sound.ts`.
- **Sharp photo:** the landing photo was upscaled 2× with Real-ESRGAN. Browsers load the 1600px or 2560px version depending on the screen. The sources are in `hero-src/`.
- **Neural background:** a site-wide neural network. Nodes drift and connect, signals pulse along the links, ML symbols float upward, and the cursor acts as an extra neuron.
- **Robots:** original SVG robots wave goodbye on the final screen. Hover or tap one and it waves and beeps.
- **Robotic sounds:** section headings chirp as they reveal, and the small kicker text above each heading "decodes" with soft data ticks. Every sound is synthesized with the Web Audio API, so there are no audio files.
- **Sound toggle:** a mute button with a live equaliser sits in the top bar, and the choice is remembered.
- All sounds are in `src/lib/sound.ts`.
- All motion respects the visitor's *reduced motion* setting, and the canvases pause when the tab is hidden.

## Updating the content

**All content lives in one file: `src/data/portfolio.ts`.**

| To change… | Edit |
| --- | --- |
| Name, intro, email, LinkedIn, GitHub, freelance on/off | `profile` |
| Jobs | `experience` |
| Projects (Originals) | `projects` — `kind` is `Industry`, `Freelance` or `Personal` |
| Freelance services and process | `services`, `process` |
| Highlights | `achievements` |
| Certificates | `certifications` (the "Certified" rail appears once you add one) |
| Skills and "where it's used" notes | `skillCategories`, `skillEvidence` |
| Seasons and episodes (My Journey) | `seasons` |
| Top 10 row | `topPicks` |
| ▶ Play Intro highlight reel | `introSlides` |
| Order of sections after the landing page | `sectionOrder` |
| Landing photo + cut-out, and where Akash stands in it | `profile.hero` (photo sources are in `hero-src/`) |

**Resume:** replace `public/assets/Akash_Gawali_Resume.pdf` with your own (same filename).

**Photo:** replace `photo.jpg` (high-res) and `cutout.png` (background removed, same framing), then run `npm run images`
to rebuild the WebP portraits and the social share image.

**Stack:** React 18, TypeScript, Vite 6, Tailwind CSS 4, Framer Motion 11, Lenis smooth scroll.

## Keyboard shortcuts
- **Play Intro:** Space pauses, ← and → change slides, Esc closes.
- **Project and resume overlays:** Esc closes.
