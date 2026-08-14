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
