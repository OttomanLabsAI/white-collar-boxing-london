# White Collar Boxing London

One-page site for White Collar Boxing London — ten weeks of free training,
then fight night for a charity you choose — served as static assets from
Cloudflare Workers. There is no build step: the files in `public/` are the
site.

## Structure

```
public/                  everything served
  index.html             the page
  404.html               themed dead-end page
  favicon.svg            two corners, navy vs red
  robots.txt
  _headers               security + caching headers
  assets/
    css/main.css         the page's stylesheet
    js/reveal.js         scroll-reveal behaviour
wrangler.jsonc           assets-only Workers config, no Worker script
package.json             wrangler devDependency + dev/deploy scripts
```

## Local development

```bash
npm install
npm run dev        # wrangler dev — http://localhost:8787
```

Any static file server pointed at `public/` also works.

## Verification — before every push

Every push to `main` deploys to production, so verify first:

1. `npm run check` — `wrangler deploy --dry-run`, validates the config.
2. Serve `public/`, render it with headless Chromium at mobile and desktop
   widths, and inspect the screenshots: styles applied, fonts loaded, layout
   intact, nothing overflowing.

## Deployment

The repo is meant to be connected to **Cloudflare Workers Builds** (dashboard →
Workers & Pages → Create → Import a repository), after which every push to
`main` deploys automatically. `npm run deploy` deploys manually from a machine
with Cloudflare credentials.

## The sales pitch wrapper

The deploy currently carries a three-tab sales demo around the site. An
identical numbered bar sits at the very top of all three pages, so it reads as
chrome around the demo rather than part of any site; the demo lands on the new
design, with the story still running left to right.

| Tab | Route | What it is |
| --- | --- | --- |
| 1 · The original | `/original/` | The club's site as it stands. A static local copy **could not be captured** — this build environment's network policy blocks `www.whitecollarboxinglondon.com`, so the tab says so plainly and falls back to the live site in a frame with an open-in-a-new-tab button. If their host also refuses framing, the note and button still stand. |
| 2 · New site | `/` | The new one-pager. Visitors arriving at the link land here, not on the old site. |
| 3 · The offer | `/offer/` | The ask: £500 one-off for the site, £50 per round of changes afterwards — built from the new site's own stylesheet and component grammar. |

No page previously lived at another path, so no redirects were needed. The
pitch pages carry `noindex` (meta and header) so the demo never turns up in a
search result. The offer's comparison table only claims things verifiable from
the club's own pages as Google lists them (checked 14 August 2026).

### Removing the pitch wrapper — the day the client says yes

1. Delete `public/original/` and `public/offer/` — each is self-contained.
2. Delete `public/assets/css/pitch-tabs.css` and `public/assets/css/offer.css`.
3. In `public/index.html`, remove the fenced block between the
   `PITCH TAB BAR` and `END PITCH TAB BAR` comment markers, and the
   `pitch-tabs.css` `<link>` in the head (marked `PITCH CHROME`).
4. In `public/_headers`, remove the four `/original*` and `/offer*` blocks
   (marked with the pitch comment).

Nothing else references the pitch; the site is then left alone at the root.

## External resources

- **Images** — photography, charity logos, the show poster, and the footer
  logo are hotlinked from `https://www.whitecollarboxinglondon.com`
  (the club's live WordPress uploads). They are kept as absolute URLs
  deliberately; browsers load them directly from the live domain. Most carry
  `onerror` handlers that hide their block if the file ever disappears.
  Build/CI sandboxes that block that domain will render grey gaps or
  placeholder boxes locally — that is a sandbox artifact, not a site defect.
- **Fonts** — Big Shoulders Display, IBM Plex Sans, and IBM Plex Mono load
  from Google Fonts (`fonts.googleapis.com` / `fonts.gstatic.com`).
- `robots.txt` allows everything and no sitemap is published yet; add one
  when the site moves onto the club's own domain.
