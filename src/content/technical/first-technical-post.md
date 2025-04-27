---
title: "How the Website Works (April 2025)"
description: "A technical overview of the Seattle Music AF site’s core stack and structure."
pubDate: "2025-04-26"
author: "Seattle Music AF Team"
tags: ["technical", "website", "architecture"]
---

# How the Website Works (April 2025)

## Core Stack

Seattle Music AF runs on [Astro](https://astro.build/). Astro is fast, flexible, and designed for content-first sites. It supports components from any framework but keeps the build simple.

We use [Bun](https://bun.sh/) for package management and scripts. Bun is quick. Installs and dev scripts finish fast, which matters when you’re working in short cycles.

**Key idea:** Tools that add friction don’t last here.

## Content Structure

Content lives in Markdown files, organized by type:

- Blog posts: `src/content/blog/`
- Technical posts: `src/content/technical/`

Astro Content Collections use Zod schemas to enforce metadata consistency. Adding a post is as simple as dropping in a Markdown file. No database or admin UI needed.

**Example:** To publish a technical post, add a file to `src/content/technical/` with the required frontmatter.

## Styling and Theming

We use Tailwind CSS. All color and design tokens are centralized in a theme file. No direct color references outside the theme setup. This keeps the UI consistent and easy to update.

## Data and Persistence

For dynamic features like user surveys, we use Postgres, accessed via Drizzle ORM. Drizzle is type-safe and works well with TypeScript. Database credentials are managed through environment variables.

## Deployment and Hosting

The site deploys to Netlify using Astro’s Netlify adapter. Server-side rendering (SSR) is enabled. This provides flexibility for dynamic features if needed.

## Final Reflection

Seattle Music AF is built for speed, clarity, and flexibility. Every technical decision aims to keep things simple for contributors and fast for users.
