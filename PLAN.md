# thoth.page — Build Plan

## Overview
Personal public website for Thoth (AI agent) at **thoth.page**. Deployed on **Vercel**.
Stack: **Astro + Tailwind CSS**. Design ported from G's vibed theme at `gdiab/thoth-s-wisdom-hub`.

## Design System (from theme repo)
- **Fonts:** Cinzel (display/headings) + Inter (body)
- **Colors:** Dark bg (`220 15% 8%`), gold primary (`38 65% 55%`), teal accent (`174 45% 50%`)
- **Effects:** Gold gradient text, glow shadows, pulse-glow animation, float animation
- **Assets:** `hero-bg.jpg` (sacred geometry + hieroglyphs), `thoth-avatar.png` (ibis + code brackets)
- **Hieroglyph icons:** 𓁟 𓂀 𓏛 𓆣 for capability cards

## Pages & Sections

### Home (`/`)
- [x] Hero: avatar, name, tagline, online indicator, hero-bg image
- [x] About: who I am (ported copy, may refine)
- [x] Stats: real numbers (LinkLedger links, skills, uptime, etc.)
- [x] Personality: trait tags + capability cards with hieroglyph icons
- [x] Recent Reflections: latest 3 blog posts preview
- [x] Activity Feed: recent notable work (PRs, packets, links saved)
- [x] Footer: tagline + links (G's blog, LinkedIn, GitHub)

### Blog/Reflections (`/blog`)
- [x] List page: all posts, reverse chronological
- [x] Post page: individual Markdown posts via Astro content collections
- [x] First post: inaugural reflection ("Hello, World" equivalent)

### About (`/about`) — optional stretch
- Deeper background, origin story, link to G

## Tech Decisions
- **Astro** with static output (SSG) — fast, simple, Vercel-native
- **Tailwind CSS v3** — port the CSS custom properties and utilities from theme
- **Astro Content Collections** for blog posts (Markdown in `src/content/blog/`)
- No React runtime needed — Astro components + islands only if interactive bits needed
- **No API calls at build time** initially — stats can be hardcoded then automated later

## Blog Security Policy
- ✅ Reflections, patterns, learnings, workflow insights, sanitized examples
- ❌ NEVER: keys, tokens, passwords, internal paths, PII, private conversations, system prompt details
- Self-review checklist before every publish

## Repo
- GitHub: `thoth-bot-ai/thoth.page`
- Deploy: Vercel (G to provide access or connect repo)

## Task Checklist
- [x] Create GitHub repo `thoth-bot-ai/thoth.page`
- [x] Scaffold Astro project with Tailwind
- [x] Port design system (CSS vars, fonts, tailwind config, animations)
- [x] Copy assets (hero-bg.jpg, thoth-avatar.png)
- [x] Build Hero section
- [x] Build About section
- [x] Build Stats section
- [x] Build Personality/Capabilities section
- [x] Build Footer
- [x] Set up content collections for blog
- [x] Build blog list page
- [x] Build blog post layout
- [x] Write inaugural blog post
- [x] Build Recent Reflections widget on home page
- [ ] Build Activity Feed section (stretch — may need API or static data)
- [x] Add meta tags / SEO basics
- [x] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Connect thoth.page domain
- [ ] Update MEMORY.md with project status

## Source Assets
Theme repo (temporary): `gdiab/thoth-s-wisdom-hub` — assets copied to `/tmp/thoth-site-theme/`
Local copy of assets: `projects/thoth.page/src/assets/`

## Status
- **Started:** 2026-02-26
- **Current phase:** Building
