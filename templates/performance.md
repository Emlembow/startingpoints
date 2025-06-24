# Performance Optimization Rules

## Performance Analysis

### Measurement First
- **Measure before optimizing**: Use profilers and monitoring tools
- **Identify bottlenecks**: Focus on the critical path
- **Set performance budgets**: Define acceptable thresholds
- **Monitor continuously**: Track performance over time
- **Use real user metrics**: Measure actual user experience
- **A/B test optimizations**: Validate improvements
- **Document baselines**: Keep performance history
- **Automate monitoring**: Set up alerts

### Key Metrics
- **Time to First Byte (TTFB)**: Server response time
- **First Contentful Paint (FCP)**: First visual feedback
- **Largest Contentful Paint (LCP)**: Main content visible
- **First Input Delay (FID)**: Interactivity readiness
- **Cumulative Layout Shift (CLS)**: Visual stability
- **Total Blocking Time (TBT)**: Main thread blocking
- **Time to Interactive (TTI)**: Fully interactive
- **Custom business metrics**: User-specific actions

## Frontend Performance

### JavaScript Optimization
```javascript
// Code splitting
const LazyComponent = lazy(() => import('./LazyComponent'));

// Tree shaking - use named imports
import { debounce } from 'lodash-es'; // Good
import _ from 'lodash'; // Bad - imports everything

// Memoization
const expensiveValue = useMemo(() => 
  computeExpensiveValue(a, b), [a, b]
);

// Virtualization for long lists
<VirtualList
  height={600}
  itemCount={10000}
  itemSize={50}
  renderItem={renderRow}
/>
```

### Bundle Optimization
- **Code splitting**: Split by routes and components
- **Tree shaking**: Remove unused code
- **Minification**: Compress JavaScript/CSS
- **Compression**: Use Gzip/Brotli
- **Source maps**: Separate from production
- **Lazy loading**: Load on demand
- **Preloading**: Critical resources
- **Module federation**: Share dependencies

### Asset Optimization
```html
<!-- Responsive images -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>

<!-- Preload critical assets -->
<link rel="preload" href="font.woff2" as="font" crossorigin>
<link rel="preload" href="critical.css" as="style">

<!-- DNS prefetch for external domains -->
<link rel="dns-prefetch" href="https://api.example.com">
```

### CSS Performance
```css
/* Critical CSS inline */
<style>
  /* Above-the-fold styles */
  .hero { /* ... */ }
</style>

/* Non-critical CSS async -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">

/* CSS containment */
.widget {
  contain: layout style paint;
}

/* GPU acceleration */
.animated {
  will-change: transform;
  transform: translateZ(0);
}
```

### Rendering Optimization
- **Minimize reflows**: Batch DOM updates
- **Use CSS transforms**: GPU accelerated
- **Debounce events**: Limit execution frequency
- **Use requestAnimationFrame**: For animations
- **Optimize paint areas**: Reduce paint complexity
- **Layer promotion**: Use will-change carefully
- **Virtual scrolling**: For long lists
- **Progressive rendering**: Show content incrementally

## Backend Performance

### Database Optimization
```sql
-- Use indexes effectively
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);

-- Optimize queries
-- Bad: N+1 query
SELECT * FROM users;
SELECT * FROM orders WHERE user_id = ?; -- Called N times

-- Good: Join or eager loading
SELECT u.*, o.* 
FROM users u 
LEFT JOIN orders o ON u.id = o.user_id;

-- Use prepared statements
PREPARE stmt FROM 'SELECT * FROM users WHERE id = ?';
EXECUTE stmt USING @user_id;
```

### Query Optimization
- **Use EXPLAIN**: Analyze query execution plans
- **Proper indexing**: Index frequently queried columns
- **Avoid N+1 queries**: Use joins or eager loading
- **Limit result sets**: Use pagination
- **Cache query results**: Redis/Memcached
- **Denormalize when needed**: Trade space for speed
- **Partition large tables**: Improve query performance
- **Use read replicas**: Distribute read load

### API Optimization
```javascript
// Implement caching
app.get('/api/products', cache('5 minutes'), async (req, res) => {
  const products = await getProducts();
  res.json(products);
});

// Use compression
app.use(compression());

// Implement pagination
app.get('/api/users', async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const users = await User.find()
    .limit(limit)
    .skip((page - 1) * limit);
  res.json(users);
});

// Use field filtering
app.get('/api/users/:id', async (req, res) => {
  const fields = req.query.fields?.split(',') || [];
  const user = await User.findById(req.params.id).select(fields);
  res.json(user);
});
```

### Server Optimization
- **Use HTTP/2**: Multiplexing and server push
- **Enable compression**: Gzip/Brotli
- **Implement caching**: Browser, CDN, server
- **Use connection pooling**: Database connections
- **Horizontal scaling**: Load balancing
- **Async operations**: Non-blocking I/O
- **Queue background jobs**: Don't block requests
- **Monitor resource usage**: CPU, memory, disk

## Caching Strategies

### Cache Levels
```javascript
// Browser cache
res.setHeader('Cache-Control', 'public, max-age=31536000');

// CDN cache
res.setHeader('CDN-Cache-Control', 'public, max-age=3600');

// Application cache
const cachedData = await redis.get(cacheKey);
if (cachedData) return JSON.parse(cachedData);

// Database query cache
const users = await db.query('SELECT * FROM users', {
  cache: true,
  cacheDuration: 60000
});
```

### Cache Invalidation
- **TTL-based**: Automatic expiration
- **Event-based**: Invalidate on updates
- **Tag-based**: Group related caches
- **Versioning**: Cache keys with versions
- **Partial invalidation**: Update specific items
- **Warm cache**: Preload critical data
- **Cache stampede prevention**: Lock during rebuild
- **Monitor hit rates**: Track effectiveness

## Network Optimization

### HTTP Optimization
```nginx
# Enable HTTP/2
listen 443 ssl http2;

# Enable compression
gzip on;
gzip_types text/plain text/css application/json application/javascript;

# Set proper cache headers
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Enable keep-alive
keepalive_timeout 65;
keepalive_requests 100;
```

### CDN Usage
- **Static assets**: Images, CSS, JavaScript
- **Geographic distribution**: Reduce latency
- **Edge computing**: Process at edge
- **Cache warming**: Preload popular content
- **Purge strategies**: Invalidate stale content
- **Security features**: DDoS protection
- **Compression**: At edge level
- **HTTP/3 support**: QUIC protocol

## Mobile Performance

### Mobile-Specific Optimizations
- **Reduce payload size**: Smaller bundles
- **Optimize images**: Use appropriate formats
- **Minimize network requests**: Bundle resources
- **Use service workers**: Offline functionality
- **Implement lazy loading**: Load visible content
- **Reduce JavaScript**: Less parsing/execution
- **Optimize fonts**: Subset and preload
- **Test on real devices**: Actual performance

### Progressive Web App (PWA)
```javascript
// Service worker for caching
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        '/',
        '/styles.css',
        '/script.js',
        '/offline.html'
      ]);
    })
  );
});

// Cache-first strategy
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
```

## Monitoring & Profiling

### Performance Monitoring Tools
- **Browser DevTools**: Chrome/Firefox profilers
- **Lighthouse**: Automated auditing
- **WebPageTest**: Detailed analysis
- **New Relic/DataDog**: APM solutions
- **Google Analytics**: Real user metrics
- **Sentry**: Error and performance
- **Custom metrics**: Business-specific
- **Synthetic monitoring**: Automated tests

### Continuous Performance Testing
```javascript
// Performance budget in CI/CD
module.exports = {
  extends: 'lighthouse:default',
  settings: {
    budgets: [{
      path: '/*',
      resourceSizes: [
        { resourceType: 'script', budget: 300 },
        { resourceType: 'total', budget: 1000 }
      ],
      resourceCounts: [
        { resourceType: 'third-party', budget: 10 }
      ]
    }]
  }
};
```

## Performance Best Practices

### General Guidelines
- **Performance budget**: Set and enforce limits
- **Progressive enhancement**: Basic functionality first
- **Optimize critical path**: Prioritize visible content
- **Reduce complexity**: Simpler is faster
- **Async everything**: Non-blocking operations
- **Cache aggressively**: But invalidate properly
- **Monitor continuously**: Catch regressions
- **Iterate and improve**: Continuous optimization

### Common Pitfalls
- Premature optimization
- Optimizing the wrong things
- Not measuring impact
- Ignoring mobile performance
- Over-engineering solutions
- Neglecting perceived performance
- Not considering user context
- Forgetting about maintenance

## Performance Checklist
- [ ] Measure baseline performance
- [ ] Set performance budgets
- [ ] Optimize critical rendering path
- [ ] Implement code splitting
- [ ] Optimize images and assets
- [ ] Enable compression
- [ ] Implement caching strategy
- [ ] Optimize database queries
- [ ] Use CDN for static assets
- [ ] Monitor real user metrics
- [ ] Set up performance alerts
- [ ] Regular performance audits