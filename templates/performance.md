# Performance Optimization

## Core Web Vitals

### Metrics to Track
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **FCP** (First Contentful Paint): < 1.8s
- **TTFB** (Time to First Byte): < 600ms

## Frontend Performance

### JavaScript Optimization
```javascript
// Code splitting
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Tree shaking
export { specificFunction } from './utils'; // Not export *

// Bundle optimization
// webpack.config.js
optimization: {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        priority: 10
      }
    }
  }
}
```

### CSS Optimization
```css
/* Critical CSS inline */
<style>
  /* Above-the-fold styles */
  .hero { /* ... */ }
</style>

/* Non-critical CSS deferred */
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

### Image Optimization
```html
<!-- Modern formats with fallback -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>

<!-- Responsive images -->
<img srcset="small.jpg 480w, medium.jpg 800w, large.jpg 1200w"
     sizes="(max-width: 600px) 480px, (max-width: 900px) 800px, 1200px"
     src="medium.jpg" alt="Description">
```

### Resource Loading
```html
<!-- Preconnect to external domains -->
<link rel="preconnect" href="https://fonts.googleapis.com">

<!-- Preload critical resources -->
<link rel="preload" href="/font.woff2" as="font" type="font/woff2" crossorigin>

<!-- DNS prefetch -->
<link rel="dns-prefetch" href="//api.example.com">
```

## React Performance

### Component Optimization
```javascript
// Memoization
const ExpensiveComponent = memo(({ data }) => {
  return <div>{/* Expensive render */}</div>;
});

// useMemo for expensive computations
const sortedList = useMemo(
  () => list.sort((a, b) => b.value - a.value),
  [list]
);

// useCallback for stable references
const handleClick = useCallback((id) => {
  setSelected(id);
}, []);

// React 18 features
const [isPending, startTransition] = useTransition();
startTransition(() => {
  setSearchQuery(input);
});
```

### Virtual Lists
```javascript
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={items.length}
  itemSize={50}
  width="100%"
>
  {({ index, style }) => (
    <div style={style}>{items[index].name}</div>
  )}
</FixedSizeList>
```

## Backend Performance

### Database Optimization
```sql
-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_created ON orders(user_id, created_at DESC);

-- Query optimization
-- Bad
SELECT * FROM users WHERE YEAR(created_at) = 2023;

-- Good
SELECT id, name, email FROM users 
WHERE created_at >= '2023-01-01' AND created_at < '2024-01-01';

-- Use EXPLAIN
EXPLAIN ANALYZE SELECT ...
```

### Caching Strategies
```javascript
// Memory cache (Node.js)
const cache = new Map();

function getCachedData(key) {
  if (cache.has(key)) {
    const { data, timestamp } = cache.get(key);
    if (Date.now() - timestamp < 3600000) { // 1 hour
      return data;
    }
  }
  return null;
}

// Redis cache
const redis = require('redis');
const client = redis.createClient();

async function getCached(key) {
  const cached = await client.get(key);
  return cached ? JSON.parse(cached) : null;
}

// HTTP cache headers
res.setHeader('Cache-Control', 'public, max-age=3600');
res.setHeader('ETag', etag);
```

### API Optimization
```javascript
// Pagination
app.get('/api/users', async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const offset = (page - 1) * limit;
  
  const users = await db.users.findMany({
    skip: offset,
    take: limit,
    select: { id: true, name: true, email: true }
  });
  
  res.json({ data: users, page, limit });
});

// Field selection
app.get('/api/users/:id', async (req, res) => {
  const fields = req.query.fields?.split(',') || ['id', 'name', 'email'];
  const user = await db.users.findUnique({
    where: { id: req.params.id },
    select: fields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
  });
  res.json(user);
});
```

## Build Optimization

### Webpack Configuration
```javascript
module.exports = {
  optimization: {
    minimize: true,
    sideEffects: false,
    usedExports: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          name: 'vendor',
          chunks: 'all',
          test: /node_modules/
        }
      }
    }
  }
};
```

### Bundle Analysis
```bash
# Webpack Bundle Analyzer
npm install --save-dev webpack-bundle-analyzer

# In webpack.config.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
plugins: [new BundleAnalyzerPlugin()]

# Vite
npm install --save-dev rollup-plugin-visualizer
```

## Monitoring

### Performance API
```javascript
// Measure component render time
const measure = (name, fn) => {
  performance.mark(`${name}-start`);
  const result = fn();
  performance.mark(`${name}-end`);
  performance.measure(name, `${name}-start`, `${name}-end`);
  
  const measure = performance.getEntriesByName(name)[0];
  console.log(`${name} took ${measure.duration}ms`);
  return result;
};

// Observer pattern
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration}ms`);
  });
});
observer.observe({ entryTypes: ['measure'] });
```

## Best Practices

### Do's
- ✅ Measure before optimizing
- ✅ Set performance budgets
- ✅ Use lazy loading
- ✅ Optimize critical rendering path
- ✅ Implement caching strategies
- ✅ Monitor real user metrics

### Don'ts
- ❌ Don't optimize prematurely
- ❌ Avoid blocking the main thread
- ❌ Don't ignore mobile performance
- ❌ Avoid memory leaks
- ❌ Don't serve unoptimized images

### Quick Wins
1. Enable gzip/brotli compression
2. Minify CSS/JS/HTML
3. Use CDN for static assets
4. Implement browser caching
5. Optimize images
6. Remove unused code
7. Defer non-critical scripts
8. Preconnect to required origins