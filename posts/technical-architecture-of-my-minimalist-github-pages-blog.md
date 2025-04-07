<!--
	excerpt: This is the excerpt. 
-->

# Technical Architecture of My Minimalist GitHub Pages Blog

## Overview

My blog is a static site built using:

- **GitHub Pages** for zero-cost hosting
- **Markdown** for all content authoring
- **Vanilla JavaScript** for client-side rendering
- **GitHub Actions** for automated workflows
- **Responsive CSS** for all device compatibility

## Content Pipeline

### 1. Markdown Posts

All posts are stored as `.md` files in the `/posts/` directory with this structure:

```/posts/
├── welcome.md
├── how-this-works.md
└── another-post.md
```


Each post contains YAML front matter for metadata:

```markdown
---
title: "Post Title"
date: 2024-02-20
excerpt: "Brief description of post"
---
# Actual content starts here
```

### 2. Automated Index Generation

A GitHub Action generates posts.json whenever new Markdown files are added:

```name: Update Post Index
on:
  push:
    paths:
      - 'posts/*.md'
jobs:
  update-index:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: |
          echo '[' > posts.json
          find posts -name "*.md" -exec basename {} .md \; | \
            while read slug; do
              echo "  {\"slug\": \"$slug\"}," >> posts.json
            done
          sed -i '$ s/,$//' posts.json
          echo ']' >> posts.json
      - uses: stefanzweifel/git-auto-commit-action@v5
```

This creates a machine-readable index like:

```[
  {"slug": "welcome"},
  {"slug": "how-this-works"}
]
```

## Frontend Implementation

### 1. JavaScript Rendering Engine

The core rendering logic in `main.js`:

```// Load and render posts list
async function loadPosts() {
  const response = await fetch('posts.json');
  const posts = await response.json();
  
  let html = '';
  for (const post of posts) {
    const mdResponse = await fetch(`posts/${post.slug}.md`);
    const mdText = await mdResponse.text();
    const metadata = extractMetadata(mdText);
    
    html += `
      <article>
        <h2>${metadata.title}</h2>
        <time>${formatDate(metadata.date)}</time>
        <div>${marked.parse(metadata.excerpt)}</div>
        <a href="?post=${post.slug}">Read more</a>
      </article>
    `;
  }
  
  document.getElementById('post-list').innerHTML = html;
}

// Extract metadata from Markdown
function extractMetadata(markdown) {
  const meta = markdown.match(/^---\n([\s\S]*?)\n---/);
  return {
    title: meta[1].match(/title: (.*)/)[1],
    date: meta[1].match(/date: (.*)/)[1],
    excerpt: meta[1].match(/excerpt: (.*)/)[1]
  };
}
```

### 3. Responsive CSS Architecture

The styling system uses:

```/* Variables for theming */
:root {
  --text: #333;
  --bg: #fff;
  --primary: #2563eb;
  --max-width: 66%;
}

/* Mobile-first base styles */
body {
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
  margin: 0;
  padding: 1rem;
}

/* Desktop layout */
@media (min-width: 768px) {
  .container {
    width: var(--max-width);
    margin: 0 auto;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  :root {
    --text: #f3f4f6;
    --bg: #111827;
  }
}
```

## Performance Features

  1. Critical CSS inlined in `<head>`
  2. Lazy loading for images: `![Alt text](image.jpg){loading=lazy}`
  3. Client-side caching of fetched posts
  4. Minimal dependencies (only marked.js for Markdown parsing)
  
## Deployment Workflow

  1. Author writes new post in Markdown
  2. Git push triggers GitHub Actions: `A[Push Markdown] --> B[Generate posts.json] --> C[Deploy to GitHub Pages]`
  3. GitHub Pages serves the static assets
  4. Browser fetches and renders content dynamically

## Benefits of This Architecture

  - Zero hosting costs
  - No build process required
  - Content versioning via Git
  - Fast global delivery via GitHub's CDN
  - Easy maintenance with pure Markdown

