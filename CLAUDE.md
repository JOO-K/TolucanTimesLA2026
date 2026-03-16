# Tolucan Times LA — Project Brief

## What this is
A static HTML/CSS/JS newspaper website for **The Tolucan Times**, a real local newspaper based in Toluca Lake, LA (est. 1937). Eric is building/maintaining this for his friend who runs the paper. No npm, no build tools, no frameworks — pure HTML/CSS/JS only, deployable as a static folder.

**Live site:** https://joo-k.github.io/TolucanTimesLA2026/
**GitHub repo:** https://github.com/JOO-K/TolucanTimesLA2026
**Admin panel:** https://joo-k.github.io/TolucanTimesLA2026/admin.html
**Local project path:** `C:\Users\ericd\Downloads\TolucanTimesLA-main (1)\TolucanTimesLA-main`

---

## Architecture

### Component system
All pages use `partloader.js` (jQuery `$.get`) to inject shared HTML components into placeholder divs. Components live in `html/`. Only fetches a component if its placeholder `id` exists on the page.

| Placeholder ID | Component file | Used on |
|---|---|---|
| `nav-ph` | `html/navComp.html` | Every page |
| `footer-ph` | `html/footerComp.html` | Every page |
| `slide-ph` | `html/slideComp.html` | index.html only |
| `publication-ph` | `html/publicationComp.html` | index.html only |
| `homepageboxnav-ph` | `html/homepageboxnavComp.html` | index.html only |

### Article system
- Articles live at root as `article_01.html`, `article_02.html`, etc.
- Article metadata + content stored in `data/articles.json` (created by admin panel on first save)
- `html/homepageboxnavComp.html` is **auto-regenerated** by the admin panel — don't hand-edit it
- Article HTML files are also **auto-generated** by the admin panel

### Admin panel (`admin.html`)
- Pure JS, no backend — connects to GitHub API directly
- Login with a GitHub Personal Access Token (repo scope), stored in localStorage
- **Block-based editor**: articles are built from ordered blocks (text or image+caption)
- On publish: writes article HTML → updates `data/articles.json` → regenerates homepage component
- All changes commit directly to the repo; GitHub Pages deploys in ~1 min

### Data format (`data/articles.json`)
```json
[
  {
    "id": "article_01",
    "title": "Article Headline",
    "author": "Author Name",
    "tag": "Interview",
    "cardImage": "./images/Frontpage_02.png",
    "excerpt": "Short preview for homepage card (2-3 sentences)",
    "blocks": [
      { "type": "text", "content": "Paragraph text. Blank line = new paragraph." },
      { "type": "image", "src": "./images/photo.png", "caption": "Optional caption" },
      { "type": "text", "content": "More text..." }
    ]
  }
]
```

---

## Design intent
- **Nav stays exactly as-is** — Eric loves it, do not touch it
- **Homepage aesthetic:** dense Yahoo/newspaper front page circa 2010 — cream background (`#faf8f3`), dashed column rules, section headers, tight typography
- **Fonts:** Fraunces (headlines), Manrope (UI/meta), Bookish (body text) — all loaded locally from `fonts/` via `css/style.css` @font-face
- **Color palette:** dodgerblue (#1E90FF) primary, orange-brown gradient (#de8c35 → #c54a2b) for accents

## CSS files
| File | Purpose |
|---|---|
| `style.css` | @font-face, global body, old hp-container styles |
| `nav.css` | Navigation bar + mobile menu |
| `newspaper.css` | Dense homepage layout (article grid, section dividers, explore row) |
| `article.css` | Article page layout, headline, body text, image blocks + captions |
| `frontpage.css` | Frontpage article container styles (legacy) |
| `publications.css` | Issue card grid |
| `footer.css` | Footer |
| `photogallery.css` | Gallery grid |
| `swiper.css` | Carousel (Swiper.js) |
| `weather.css` | Weather display in nav |

---

## Key decisions made
- `partloader.js` uses check-before-fetch to avoid unnecessary requests on non-homepage pages
- Swiper is initialized only in `html/slideComp.html` — not in `index.html` (removed duplicate)
- Gallery images use `loading="lazy"` — browser loads them as user scrolls
- `homepageboxnavComp.html` shows the 4 most recent articles (last 4 in articles array, reversed)
- Article template at `article_template.html` for reference (not used by admin)

## Still to do / known issues
- The 4 existing article HTML files (`article_01–04`) have full real content but `data/articles.json` won't exist until the admin panel is first used — on first admin load it seeds from stubs, so editing and re-saving an article will overwrite the real body text with the stub. **Fix:** before using the admin to edit existing articles, manually populate the body content in the editor
- Gallery photos are hosted on imagesupload.xyz (external) — could move to `images/` folder for reliability
- Several gallery entries are duplicates (same image repeated) — worth cleaning up
- `comingsoon.html` (Merch Shop) is a placeholder
- Weather API key is hardcoded in `javascript/script.js` — should be noted as a potential expiry issue
