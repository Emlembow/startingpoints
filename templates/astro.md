# Astro Best Practices

## Project Structure

### Directory Organization
```
src/
├── pages/         # File-based routing
│   ├── index.astro
│   └── blog/
│       └── [slug].astro
├── components/    # Reusable components
├── layouts/       # Page layouts
├── content/       # Content collections
├── styles/        # Global styles
├── scripts/       # Client-side JS
└── assets/        # Images, fonts
public/           # Static assets
astro.config.mjs  # Configuration
```

### Component Architecture
- Follow Atomic Design principles
- Single responsibility per component
- Use TypeScript for type safety
- Leverage Astro's island architecture

## Core Concepts

### Basic Component
```astro
---
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<article>
  <h2>{title}</h2>
  {description && <p>{description}</p>}
</article>

<style>
  article {
    padding: 1rem;
  }
</style>
```

### Island Architecture
```astro
---
import InteractiveComponent from './Interactive.jsx';
---

<!-- Static by default -->
<h1>My Page</h1>

<!-- Only this component loads JS -->
<InteractiveComponent client:visible />
```

### Client Directives
- `client:load` - Load immediately
- `client:idle` - Load when idle
- `client:visible` - Load when visible
- `client:media` - Load on media query
- `client:only` - Skip SSR

## Data Fetching

### Content Collections
```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
  }),
});

export const collections = { blog };
```

### Fetching Data
```astro
---
const response = await fetch('https://api.example.com/data');
const data = await response.json();
---

<ul>
  {data.map(item => <li>{item.name}</li>)}
</ul>
```

## Performance Optimization

### Image Optimization
```astro
---
import { Image } from 'astro:assets';
import myImage from '../assets/hero.jpg';
---

<Image 
  src={myImage} 
  alt="Hero image"
  width={1200}
  height={600}
  format="webp"
/>
```

### JavaScript Minimization
- Render static HTML by default
- Only hydrate interactive components
- Use appropriate client directives
- Implement code splitting

### Font Optimization
```astro
<link rel="preload" 
      href="/fonts/font.woff2" 
      as="font" 
      type="font/woff2" 
      crossorigin>
```

## Routing

### File-Based Routes
```
src/pages/
├── index.astro      → /
├── about.astro      → /about
├── blog/
│   ├── index.astro  → /blog
│   └── [slug].astro → /blog/:slug
```

### Dynamic Routes
```astro
---
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
---
```

## Styling Best Practices

### Scoped Styles
```astro
<style>
  /* Automatically scoped to component */
  h1 { color: blue; }
</style>
```

### Global Styles
```astro
<style is:global>
  /* Applied globally */
  body { font-family: system-ui; }
</style>
```

### CSS Framework Integration
- Tailwind CSS integration
- CSS Modules support
- PostCSS processing

## Security

### Input Validation
- Always validate server-side
- Sanitize user input
- Use Content Security Policy

### XSS Prevention
```astro
---
// Output is automatically escaped
const userContent = "<script>alert('XSS')</script>";
---
<p>{userContent}</p> <!-- Safe -->
```

## SEO & Meta Tags

### Meta Configuration
```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout 
  title="Page Title"
  description="Page description"
  image="/og-image.jpg"
>
  <!-- Page content -->
</Layout>
```

## Best Practices Summary

### Do's
- ✅ Use static generation when possible
- ✅ Optimize images with `<Image>`
- ✅ Leverage content collections
- ✅ Implement proper SEO
- ✅ Use TypeScript

### Don'ts
- ❌ Over-hydrate components
- ❌ Import .astro into framework components
- ❌ Ignore build warnings
- ❌ Skip accessibility
- ❌ Use client:only without reason