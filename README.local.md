Local preview (Windows PowerShell)

1. Install bundler (if not already installed):

```powershell
gem install bundler
```

2. Install project gems from the `Gemfile` (this repo is now configured to use the `github-pages` gem so local builds match GitHub Pages):

```powershell
bundle install
```

3. Serve the site locally with live reload:

```powershell
bundle exec jekyll serve --livereload
```

This will build the site to `_site/` and serve at http://127.0.0.1:4000 by default.

Notes:
- This repository now uses the `github-pages` gem in `Gemfile` so local builds will mirror GitHub Pages' environment. That ensures parity but may pin older Jekyll/Liquid/kramdown versions.
- If you prefer to develop with a newer Jekyll locally, ask and I can add an alternate `Gemfile` (e.g. `Gemfile.dev`) and document how to switch between them.
