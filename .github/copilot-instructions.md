## Quick repository summary

- This repository is a simple Jekyll-based GitHub Pages site. The active theme is declared in `_config.yml` (`theme: jekyll-theme-slate`).
- Key content lives at the repo root as Markdown pages (`home.md`, `research.md`). Static assets are under `assets/` (CSS in `assets/css/style.scss`, images in `assets/img/`).

## What an AI agent should know first

- Look at `_config.yml` for site-level configuration: title, `theme`, `logo`, and `navigation` entries. Example entries:

  - `theme: jekyll-theme-slate`
  - `logo: /assets/img/logosmall.png`
  - `navigation:` list with `url: /home/` and `url: /research/`

- The SASS file `assets/css/style.scss` contains Jekyll front matter and imports the theme stylesheet with:

  @import "{{ site.theme }}";

  This means the theme's styles are pulled in and then overridden by the rules in `style.scss`.

## Conventions and patterns to follow

- Pages are plain Markdown files at the repository root. When adding pages, prefer including YAML front matter (even empty) so Jekyll will process them as pages. Example top lines in a page:

  ---
  title: About
  ---

- Keep SASS files that should be processed by Jekyll as `.scss` files with leading front matter `---` (see `assets/css/style.scss`). Without that front matter, Jekyll won't compile the SASS.

- Use absolute root paths for images and assets in config and pages (example: `/assets/img/logosmall.png`).

## Build / preview / deploy (what works for this repo)

Notes: there is no `Gemfile` checked into the repo. The site is suitable for GitHub Pages builds (push to main will publish). To preview locally you generally need Ruby + Jekyll installed. Common local steps (assumes Ruby is installed):

PowerShell (Windows) examples:

```powershell
gem install jekyll bundler
jekyll serve --livereload
```

If you prefer a reproducible workflow, add a `Gemfile` with `github-pages` or `jekyll` and run `bundle exec jekyll serve` instead.

Files ignored by git (useful to know): `.gitignore` includes `_site` and `.jekyll-cache` so local build outputs won't be committed.

## Common tasks & examples

- To override theme styling: edit `assets/css/style.scss`. It already imports the theme then defines overrides (body background, link colors). Keep the import line at the top.

- To change navigation: update the `navigation:` array in `_config.yml. Verify resulting URLs by building locally or inspecting the deployed site.

## Gotchas and verification steps

- The repo currently has no `Gemfile` or build lockfile. If you need to reproduce the exact GitHub Pages environment locally, create a `Gemfile` and pin `github-pages`.
- After making changes to SASS or `_config.yml`, either run `jekyll serve` locally or push to `main` and wait for GitHub Pages to build. Check `_site/` locally for the generated HTML (it's in `.gitignore` by default).

## Where to look next in the codebase

- `_config.yml` — site configuration, navigation, theme, logo.
- `home.md`, `research.md` — example content pages.
- `assets/css/style.scss` — how the theme is imported and overrides are applied.
- `assets/img/` — images referenced by the site and `_config.yml`.

If anything above is unclear or you'd like me to include explicit local Gemfile content and bundle-based instructions, tell me which workflow you prefer (quick local preview vs reproducible/bundled).
