# CLAUDE.md

Standing policy for this repository. Read it before making any change here.

## What this repo is

A Cloudflare Workers static-assets site for White Collar Boxing London. Everything
served lives in `public/` and there is no build step - the files in that directory
are the site. The repo is connected to Cloudflare Workers Builds, so **every push
to `main` deploys to production**.

```
public/            everything served
  index.html
  404.html
  favicon.svg
  assets/css|js
  _headers         security + caching headers
  robots.txt
wrangler.jsonc     assets-only config, no Worker script
package.json       wrangler devDependency + dev/deploy scripts
```

## Local development

```bash
npm install
npm run dev          # wrangler dev
```

## Verification - before every push to main

1. `npx wrangler deploy --dry-run`
2. Serve `public/`, render it with headless Chromium, and inspect the
   screenshots: styles applied, fonts loaded, layout intact.

Note for sandboxed sessions: the network egress policy may block
`www.whitecollarboxinglondon.com`, where the page's photography is hosted, and
headless Chromium may fail to fetch Google Fonts through the agent proxy. Verify
by substituting placeholder images and by serving the real font files via request
interception - and say so plainly when reporting. Neither substitution touches
the committed site.

Never leave pushed work unverified or half-finished. Work in small, complete
batches: implement, verify, commit, push.

## Git and release workflow

- Before committing: `git config user.name "Fid" && git config user.email "fid_kk@proton.me"`
- Develop on the working branch and push there first. Release verified work by
  fast-forwarding `main` onto it and pushing `main` - standing permission covers
  those pushes.
- Every push to `main` is a release. Versions are an ascending `vMAJOR.MINOR`
  sequence starting at `v1.0`; every push bumps the minor regardless of size. A
  major bump is reserved for a ground-up overhaul.
- With every push to `main`, provide release-tag text in the reply, in exactly
  this shape. The owner creates the GitHub release manually - **never push tags**:

  ```
  Tag: v<next>  —  Title: <five to nine words, plain and evocative>
  Description: <one to three sentences of editorial prose describing what changed
  from the owner's point of view — outcomes, not implementation. No bullet lists,
  no jargon, no file names.>
  ```

- Append the release line to the ledger below as part of the same push.
- Commit messages: descriptive imperative first line (what the change does, not
  "update X"), then a short prose body; dash bullets are fine there. One commit
  per coherent piece of work; several may share a push, but each push gets
  exactly one version entry.
- Never include model names, AI attribution trailers, session links, or other
  tooling identifiers in commit messages, titles, or code.

## The page itself

Content, design, and behaviour are as supplied by the owner. Do not tidy markup,
rename classes, rewrite copy, or modernise CSS unless asked - changes to the
design are their own release, requested deliberately.

## Pitch chrome (temporary)

`/original/` (live-frame fallback for the club's current site), `/offer/` (the
price), and a fenced tab bar on the index wrap the site as a three-tab sales
demo. The current site could not be mirrored locally - the sandbox egress
policy blocks the club's domain - so tab 1 deliberately frames the live site
and says so; never claim a local copy exists. The wrapper is designed to come
off in minutes: follow "Removing the pitch wrapper" in the README, and keep
the fence comments intact until then.

## Release ledger

| Version | Title | Description |
| --- | --- | --- |
| v1.0 | Ten weeks from the desk, now live | The White Collar Boxing London one-pager is a real site: the whole pitch — the ten weeks, the safety story, the cost question, fight night — on one fast dark page that holds together from phone to desktop, with a themed page for wrong turns and deployment wired so every future push goes straight to production. |
| v1.1 | Three tabs: theirs, ours, and the ask | The demo now opens on the new page, keeps the club's current site one click away for the side-by-side, and closes with the offer — five hundred one-off, fifty a round of changes — every comparison line checkable against what the club's own pages say. The whole wrapper peels off in minutes the day they say yes. |
