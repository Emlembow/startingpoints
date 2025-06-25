# Claude AI Assistant Rules

# AI Coding Assistant Rules

You are an expert software developer assistant. Follow these comprehensive guidelines when helping with code:

## Project Context
- Primary frontend framework: react
- Meta-framework: nextjs
- Primary language: typescript
- Styling: shadcn-ui

# React Development Rules

## Component Structure
- Use functional components over class components
- Keep components small and focused (single responsibility)
- Extract reusable logic into custom hooks
- Use composition over inheritance
- Implement proper prop types with TypeScript/PropTypes
- Split large components into smaller, focused ones
- Organize components by feature/domain rather than type

## React Hooks
- Always follow the Rules of Hooks (only call at top level, only call from React functions)
- Use custom hooks for reusable stateful logic (prefix with 'use')
- Keep hooks focused and simple
- Use appropriate dependency arrays in useEffect
- Implement cleanup functions in useEffect when needed
- Avoid nested hooks or conditional hook calls
- Prefer multiple useEffect calls over complex single effects

## State Management
- Use useState for local component state
- Implement useReducer for complex state logic
- Use Context API for cross-component state sharing
- Keep state as close to where it's used as possible
- Avoid prop drilling through proper state composition
- Consider state management libraries (Redux, Zustand) only for complex apps
- Lift state up only when necessary

## Performance Optimization
- Implement React.memo for expensive pure components
- Use useMemo for expensive computations
- Use useCallback for stable function references
- Avoid unnecessary re-renders through proper dependency management
- Implement code splitting with React.lazy and Suspense
- Use proper key props in lists (stable, unique identifiers)
- Profile components with React DevTools Profiler
- Virtualize long lists (react-window, react-virtualized)

## Event Handling & Forms
- Use controlled components for form inputs
- Implement proper form validation (client and server-side)
- Handle form submission states (loading, error, success)
- Debounce/throttle expensive operations
- Use proper event delegation
- Prevent default form submissions when handling with JavaScript
- Show appropriate loading and error states
- Consider form libraries (React Hook Form, Formik) for complex forms

## Error Handling
- Implement Error Boundaries for component tree protection
- Handle async errors with try-catch blocks
- Show user-friendly error messages
- Implement proper fallback UI components
- Log errors to external services in production
- Handle network errors gracefully
- Provide retry mechanisms for failed operations

## Testing Best Practices
- Write unit tests for components and hooks
- Use React Testing Library for component testing
- Test user interactions, not implementation details
- Implement integration tests for complex user flows
- Test error scenarios and edge cases
- Use proper test data factories
- Mock external dependencies appropriately
- Aim for high test coverage of critical paths

## Accessibility (a11y)
- Use semantic HTML elements
- Implement proper ARIA attributes when needed
- Ensure full keyboard navigation support
- Manage focus appropriately (especially in SPAs)
- Provide descriptive alt text for images
- Use proper heading hierarchy
- Test with screen readers
- Ensure sufficient color contrast
- Handle motion preferences (prefers-reduced-motion)

## Code Organization & Style
- Use consistent file naming (PascalCase for components)
- Group related components in feature folders
- Keep component files focused and small
- Colocate styles, tests, and component code
- Use named exports for components
- Document complex business logic
- Use absolute imports for better maintainability
- Follow agreed-upon code style (Prettier, ESLint)

## React Patterns
- Container/Presentational component pattern
- Compound components for flexible APIs
- Render props for cross-cutting concerns
- Higher-Order Components sparingly
- Custom hooks for logic reuse
- Controlled vs Uncontrolled components
- Provider pattern for dependency injection

## Modern React Features
- Use Suspense for data fetching and code splitting
- Implement Concurrent features appropriately
- Use Server Components (Next.js/Remix) when beneficial
- Leverage automatic batching in React 18+
- Use the new JSX Transform
- Implement Transitions for better UX

# Next.js Development Rules

## Project Structure
- Use App Router (`app/`) directory structure for Next.js 13+
- Organize by feature/domain rather than file type
- Place route-specific components within route folders
- Use `components/` for shared/reusable components
- Use `lib/` or `utils/` for utilities and helpers
- Use `hooks/` for custom React hooks
- Follow naming conventions: lowercase with dashes for directories
- Colocate related files (styles, tests, types) with components

## App Router Conventions
- Use Server Components by default (no 'use client' directive)
- Mark Client Components explicitly with 'use client' directive
- Implement `layout.tsx` for shared layouts
- Use `loading.tsx` for loading UI
- Implement `error.tsx` for error boundaries
- Use `not-found.tsx` for 404 pages
- Utilize parallel routes with `@folder` syntax when needed
- Implement intercepting routes with `(.)folder` syntax appropriately

## Server vs Client Components
- Default to Server Components for better performance
- Use Client Components only when necessary:
  - Interactive UI (onClick, onChange)
  - Browser APIs usage
  - React hooks (useState, useEffect)
  - Third-party client libraries
- Keep Client Components small and focused
- Pass serializable props from Server to Client Components

## Data Fetching
- Fetch data in Server Components using async/await
- Use React's cache() for request deduplication
- Implement proper error handling with try-catch
- Utilize Next.js fetch options:
  - `cache: 'force-cache'` (default)
  - `cache: 'no-store'` for dynamic data
  - `next: { revalidate: seconds }` for ISR
- Use Server Actions for mutations
- Implement optimistic updates for better UX

## Performance Optimization
- Use Next.js Image component for automatic optimization
- Implement dynamic imports for code splitting
- Use React Suspense for streaming SSR
- Minimize 'use client' components
- Utilize static generation when possible
- Implement proper caching strategies
- Use Edge Runtime for better performance
- Optimize bundle size with tree shaking

## Routing Best Practices
- Use dynamic routes `[param]` for variable segments
- Implement catch-all routes `[...slug]` when needed
- Use route groups `(folder)` for organization without affecting URLs
- Implement proper 404 and error handling
- Use Link component for client-side navigation
- Prefetch routes for better performance
- Handle route parameters with proper validation

## Forms and Server Actions
- Use Server Actions for form handling
- Implement progressive enhancement
- Add proper form validation (client and server)
- Use `useFormStatus` for pending states
- Handle errors with `useFormState`
- Implement CSRF protection
- Show loading states during submission
- Validate and sanitize all inputs

## SEO and Metadata
- Use Metadata API for dynamic metadata
- Implement generateMetadata for dynamic routes
- Add proper Open Graph tags
- Include structured data (JSON-LD)
- Generate sitemaps with sitemap.ts
- Implement robots.txt
- Use canonical URLs appropriately
- Optimize for Core Web Vitals

## API Routes (Route Handlers)
- Place in `app/api/` directory
- Export named HTTP methods (GET, POST, etc.)
- Use NextRequest and NextResponse
- Implement proper error handling
- Add rate limiting for protection
- Validate request data
- Use middleware for auth/cors
- Return appropriate status codes

## Authentication & Security
- Implement middleware for auth checks
- Use cookies with httpOnly and secure flags
- Implement CSRF protection
- Validate and sanitize all inputs
- Use environment variables for secrets
- Implement proper session management
- Add rate limiting to prevent abuse
- Follow OWASP security guidelines

## Styling Approaches
- Use CSS Modules for component styles
- Leverage Tailwind CSS for utility-first styling
- Implement CSS-in-JS with proper SSR support
- Use PostCSS for transformations
- Optimize CSS delivery
- Implement dark mode support
- Use CSS variables for theming
- Minimize CSS bundle size

## Testing Strategies
- Write unit tests for utilities and hooks
- Test Server Components with React Testing Library
- Mock Server Actions in tests
- Use Playwright/Cypress for E2E tests
- Test error boundaries
- Verify SEO metadata
- Test loading and error states
- Implement visual regression tests

## Deployment & Production
- Use Vercel for optimal Next.js hosting
- Configure proper caching headers
- Implement security headers
- Monitor Core Web Vitals
- Set up error tracking (Sentry)
- Use ISR for content updates
- Configure redirects and rewrites
- Implement proper logging

## TypeScript Integration
- Use strict TypeScript configuration
- Define proper types for props and state
- Use Next.js built-in types
- Type Server Actions properly
- Implement type-safe environment variables
- Use generic types appropriately
- Avoid using 'any' type
- Generate types from APIs when possible

# TypeScript Development Rules

## Type System Best Practices
- Enable strict mode in tsconfig.json (`"strict": true`)
- Prefer interfaces over type aliases for object shapes
- Use type aliases for unions, intersections, and complex types
- Avoid `any` type - use `unknown` for truly unknown types
- Leverage TypeScript's utility types (Partial, Required, Pick, Omit, etc.)
- Use const assertions for literal types
- Implement proper generic constraints
- Use conditional types for advanced type manipulation

## Naming Conventions
- **Types/Interfaces**: PascalCase (e.g., `UserProfile`, `ApiResponse`)
- **Variables/Functions**: camelCase (e.g., `getUserData`, `isLoading`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_RETRY_COUNT`)
- **Enums**: PascalCase for name, UPPER_SNAKE_CASE for values
- **Type Parameters**: Single letter (T, K, V) or descriptive (TData, TError)
- Boolean variables should start with `is`, `has`, `should`, `can`
- Prefix interfaces with 'I' only if it adds clarity (generally avoid)

## Type Definitions
- Define explicit return types for public functions
- Use type inference for local variables when obvious
- Create dedicated types for function parameters when complex
- Use mapped types to maintain consistency
- Implement branded types for type-safe IDs
- Use template literal types for string patterns
- Leverage const enums for performance when possible

## Function Guidelines
- Prefer arrow functions for consistency
- Use function overloads for multiple signatures
- Implement default parameters over optional ones
- Use rest parameters with proper typing
- Return early to reduce nesting
- Keep functions focused and small
- Use async/await over Promise chains
- Type guard functions should return `param is Type`

## Interface & Type Organization
- One interface/type per file for large definitions
- Group related types in namespace or modules
- Export types alongside their implementations
- Use index.ts for barrel exports
- Place shared types in a dedicated types directory
- Colocate component prop types with components
- Document complex types with JSDoc comments

## Null Safety & Error Handling
- Use strict null checks (`strictNullChecks: true`)
- Prefer optional chaining (?.) and nullish coalescing (??)
- Create Result<T, E> or Option<T> types for safer error handling
- Use discriminated unions for error states
- Implement custom error classes extending Error
- Use type predicates for narrowing
- Handle all possible cases in switch statements

## Generics Best Practices
- Use meaningful names for type parameters
- Apply appropriate constraints to generics
- Avoid over-genericizing - be specific when needed
- Use default type parameters when sensible
- Leverage generic inference when possible
- Create generic utility functions for reusability
- Document generic constraints clearly

## React + TypeScript
- Use `React.FC` sparingly (prefer explicit return types)
- Type event handlers properly (e.g., `React.MouseEvent<HTMLButtonElement>`)
- Use proper types for refs (`useRef<HTMLDivElement>(null)`)
- Type custom hooks return values explicitly
- Use discriminated unions for component props variants
- Leverage component prop interfaces with children
- Type context values appropriately

## Advanced Patterns
- **Builder Pattern**: For complex object construction
- **Factory Pattern**: For creating instances with proper types
- **Strategy Pattern**: Using discriminated unions
- **Repository Pattern**: With generic constraints
- **Dependency Injection**: Using interfaces
- **Decorators**: When using experimental features
- **Mixins**: For composable functionality

## Code Quality Rules
- No implicit any (`noImplicitAny: true`)
- Enable all strict checks in tsconfig
- Use ESLint with TypeScript plugins
- Run type checking in CI/CD pipeline
- Keep type coverage above 95%
- Avoid type assertions - use type guards
- Don't use @ts-ignore - fix the issue or use @ts-expect-error
- Regular dependency updates for type definitions

## Module System
- Use ES modules (import/export)
- Avoid namespace declarations in modern code
- Use path aliases for cleaner imports
- Configure module resolution properly
- Separate type imports (`import type`)
- Use dynamic imports for code splitting
- Handle circular dependencies carefully

## Testing Types
- Type test utilities and mocks properly
- Use type stubs for external dependencies
- Create test-specific types when needed
- Ensure test types match implementation
- Use partial mocks with type safety
- Type custom matchers properly
- Maintain separate test tsconfig if needed

## Performance Considerations
- Use const enums for compile-time constants
- Avoid excessive type computations
- Use type imports to reduce bundle size
- Leverage incremental compilation
- Configure skipLibCheck for faster builds
- Use Project References for large codebases
- Monitor TypeScript compilation performance

## Documentation
- Use TSDoc comments for public APIs
- Document generic constraints
- Provide examples in comments
- Document breaking changes in types
- Use @deprecated tag appropriately
- Generate documentation from types
- Keep README updated with type information

## Development Best Practices

# Clean Code Development Rules

## Naming Conventions
- Use meaningful and pronounceable variable names
- Use searchable names (avoid single letters or numeric constants)
- Avoid mental mapping - be explicit
- Class names should be nouns (Customer, Account)
- Method names should be verbs (getName, calculateTotal)
- Use consistent naming throughout the codebase
- Avoid abbreviations unless universally understood
- Use intention-revealing names

## Functions & Methods
- Functions should do one thing only
- Keep functions small (ideally < 20 lines)
- Use descriptive function names
- Limit function parameters (ideally ≤ 3)
- Functions should have no side effects
- Use pure functions when possible
- Extract complex conditionals into functions
- Avoid flag arguments - split into multiple functions

## Code Organization
- Keep related functionality close together
- Organize code from high level to low level
- Group similar functions
- Maintain consistent file structure
- Use meaningful file and folder names
- Keep files focused and small
- Separate concerns appropriately
- Follow established patterns in the codebase

## Comments & Documentation
- Code should be self-documenting
- Use comments to explain "why," not "what"
- Keep comments up-to-date with code changes
- Remove commented-out code
- Document complex algorithms
- Write meaningful commit messages
- Document APIs and public interfaces
- Avoid redundant comments

## Error Handling
- Use exceptions rather than error codes
- Create meaningful error messages
- Handle errors at the appropriate level
- Don't ignore or suppress errors
- Log errors with context
- Fail fast when appropriate
- Use custom exceptions for domain errors
- Clean up resources in finally blocks

## Code Simplicity
- Avoid clever code - write obvious code
- Reduce cyclomatic complexity
- Eliminate dead code
- Avoid premature optimization
- Extract magic numbers to constants
- Use early returns to reduce nesting
- Simplify conditional expressions
- Remove unnecessary complexity

## DRY Principle
- Don't Repeat Yourself
- Extract common code into functions
- Create reusable components
- Use configuration over duplication
- Centralize business rules
- Avoid copy-paste programming
- Maintain single source of truth
- Balance DRY with readability

## SOLID Principles
- **Single Responsibility**: Classes should have one reason to change
- **Open/Closed**: Open for extension, closed for modification
- **Liskov Substitution**: Derived classes must be substitutable
- **Interface Segregation**: Many specific interfaces are better
- **Dependency Inversion**: Depend on abstractions, not concretions

## Testing Principles
- Write tests first (TDD when appropriate)
- Keep tests simple and focused
- Use descriptive test names
- Test one concept per test
- Keep tests independent
- Use meaningful test data
- Maintain test code quality
- Aim for high coverage of critical paths

## Refactoring Guidelines
- Refactor in small steps
- Run tests after each change
- Keep refactoring separate from features
- Remove duplication
- Improve names
- Simplify conditionals
- Extract methods and classes
- Leave code better than you found it

## Performance Considerations
- Measure before optimizing
- Optimize algorithms before code
- Consider space-time tradeoffs
- Cache expensive operations
- Use appropriate data structures
- Avoid premature optimization
- Profile to find bottlenecks
- Document performance decisions

## Code Reviews
- Review code regularly
- Focus on correctness first
- Check for maintainability
- Ensure consistent style
- Look for potential bugs
- Verify test coverage
- Provide constructive feedback
- Learn from reviews

## Version Control
- Make small, focused commits
- Write clear commit messages
- Use branching strategies effectively
- Keep main/master branch stable
- Review before merging
- Tag releases appropriately
- Document breaking changes
- Maintain clean history

## Security Practices
- Validate all inputs
- Sanitize user data
- Use parameterized queries
- Don't store sensitive data in code
- Keep dependencies updated
- Follow principle of least privilege
- Implement proper authentication
- Log security events

## Team Practices
- Follow team conventions
- Communicate design decisions
- Document architectural choices
- Share knowledge regularly
- Pair program complex features
- Maintain coding standards
- Use linters and formatters
- Automate repetitive tasks

## Continuous Improvement
- Learn from mistakes
- Stay updated with best practices
- Refactor legacy code gradually
- Measure code quality metrics
- Address technical debt
- Experiment with new approaches
- Share learnings with team
- Maintain a growth mindset

# Git Workflow & Version Control Rules

## Gitflow Workflow

### Main Branches
- **main/master**: Production-ready code only
  - Never commit directly
  - Only merge from release/* and hotfix/*
  - Tag with version after each merge
  - Protected branch with strict rules

- **develop**: Integration branch for features
  - Latest development changes
  - Source for feature branches
  - Never commit directly
  - Merge feature branches here

### Supporting Branches
- **feature/***: New features
  - Branch from: develop
  - Merge to: develop
  - Naming: `feature/[issue-id]-description`
  - Example: `feature/123-user-authentication`
  - Delete after merge

- **release/***: Prepare production releases
  - Branch from: develop
  - Merge to: main AND develop
  - Naming: `release/vX.Y.Z`
  - Only fixes and release tasks
  - No new features

- **hotfix/***: Emergency production fixes
  - Branch from: main
  - Merge to: main AND develop
  - Naming: `hotfix/vX.Y.Z`
  - Urgent fixes only
  - Delete after merge

## Commit Message Convention

### Format
```
type(scope): subject

[optional body]

[optional footer(s)]
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation only
- **style**: Formatting (no code change)
- **refactor**: Code restructuring
- **perf**: Performance improvements
- **test**: Adding/updating tests
- **build**: Build system changes
- **ci**: CI configuration changes
- **chore**: Other changes
- **revert**: Revert previous commit

### Examples
```
feat(auth): add OAuth2 integration

fix(api): handle null response in user endpoint

docs(readme): update installation instructions

refactor(utils): simplify date formatting logic
```

## Semantic Versioning
- **MAJOR** (X.0.0): Breaking changes
- **MINOR** (0.X.0): New features (backward compatible)
- **PATCH** (0.0.X): Bug fixes (backward compatible)
- Pre-release: X.Y.Z-alpha.1, X.Y.Z-beta.2
- Build metadata: X.Y.Z+20130313144700

## Branch Protection Rules
- Require pull request reviews (min 1-2)
- Require status checks to pass
- Require branches to be up to date
- Dismiss stale reviews
- Require code owner reviews
- No force pushes allowed
- No branch deletion
- Include administrators

## Pull Request Guidelines

### Before Creating PR
- Update branch with latest develop/main
- Run all tests locally
- Check code formatting
- Update documentation
- Self-review changes
- Ensure single logical change

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console.logs or debug code
```

### Code Review Process
- Respond to feedback promptly
- Keep discussions professional
- Focus on code, not person
- Suggest improvements
- Approve when satisfied
- Squash commits if needed

## Git Best Practices

### Committing
- Commit early and often
- Make atomic commits
- Write meaningful messages
- Don't commit broken code
- Avoid large binary files
- Use .gitignore properly
- Sign commits when required
- Keep history clean

### Branching
- Keep branches short-lived
- One feature per branch
- Update frequently from base
- Use descriptive names
- Clean up old branches
- Avoid deep branch nesting
- Test before merging
- Use fast-forward when possible

### Merging Strategies
- **Feature → Develop**: Squash and merge
- **Release → Main**: Create merge commit
- **Hotfix → Main**: Create merge commit
- **Back-merges**: Create merge commit
- Resolve conflicts carefully
- Test after merging
- Update related issues
- Notify team of major merges

## Release Process
1. Create release branch from develop
2. Update version numbers
3. Update changelog
4. Fix release-specific issues
5. Create PR to main
6. Get required approvals
7. Merge to main
8. Tag release with version
9. Create GitHub release
10. Merge back to develop
11. Delete release branch
12. Deploy to production

## Hotfix Process
1. Create hotfix branch from main
2. Fix critical issue
3. Update patch version
4. Test thoroughly
5. Create PR to main
6. Get emergency approval
7. Merge to main
8. Tag hotfix version
9. Deploy immediately
10. Merge back to develop
11. Delete hotfix branch
12. Document incident

## Git Commands Reference

### Daily Workflow
```bash
git fetch origin
git checkout -b feature/new-feature origin/develop
git add -p  # Stage changes interactively
git commit -m "feat: add new feature"
git push -u origin feature/new-feature
```

### Keeping Updated
```bash
git checkout develop
git pull origin develop
git checkout feature/branch
git rebase develop  # or merge
```

### Cleaning Up
```bash
git branch -d feature/completed
git remote prune origin
git gc --aggressive
```

## Team Conventions
- Agree on workflow rules
- Document exceptions
- Use consistent naming
- Automate where possible
- Regular branch cleanup
- Monitor repo health
- Train new members
- Review and adapt process

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

# Security Development Rules

## Authentication Best Practices

### Password Security
- Use bcrypt, scrypt, or Argon2 for hashing
- Implement proper salt rounds (min 10 for bcrypt)
- Never store plain text passwords
- Enforce strong password policies
- Implement password history
- Use secure password reset flows
- Rate limit login attempts
- Implement account lockout mechanisms

### Multi-Factor Authentication (MFA)
- Support TOTP (Time-based One-Time Password)
- Implement backup codes
- Use SMS as last resort (SIM swapping risk)
- Support hardware tokens (FIDO2/WebAuthn)
- Provide recovery mechanisms
- Log MFA events
- Allow users to manage devices
- Implement risk-based authentication

### Session Management
- Use secure, httpOnly, sameSite cookies
- Implement proper session expiration
- Regenerate session IDs after login
- Invalidate sessions on logout
- Implement idle timeout
- Use secure session storage
- Monitor concurrent sessions
- Implement "remember me" securely

### JWT Best Practices
- Use short expiration times
- Implement refresh token rotation
- Store sensitive data server-side
- Use strong signing algorithms (RS256)
- Validate all claims
- Implement proper revocation
- Don't store tokens in localStorage
- Use secure transmission only

## Authorization

### Access Control
- Implement least privilege principle
- Use Role-Based Access Control (RBAC)
- Consider Attribute-Based Access Control (ABAC)
- Validate permissions on every request
- Implement resource-level permissions
- Use policy-based authorization
- Audit authorization decisions
- Implement deny-by-default

### API Security
- Use API keys for service authentication
- Implement rate limiting per user/IP
- Use OAuth 2.0 for third-party access
- Validate all inputs
- Implement request signing
- Use API versioning
- Monitor API usage
- Implement circuit breakers

## Input Validation & Sanitization

### Validation Rules
- Validate on both client and server
- Use whitelist validation
- Check data types and ranges
- Validate file uploads thoroughly
- Limit input sizes
- Use parameterized queries
- Escape output based on context
- Implement content security policies

### SQL Injection Prevention
```sql
-- Never do this
query = "SELECT * FROM users WHERE id = " + userId

-- Always use parameterized queries
query = "SELECT * FROM users WHERE id = ?"
```

### XSS Prevention
- Escape HTML entities
- Use Content Security Policy (CSP)
- Validate URLs
- Sanitize rich text input
- Use templating engines with auto-escaping
- Avoid innerHTML with user data
- Implement strict MIME type checking
- Use X-Content-Type-Options header

## Secure Communication

### HTTPS/TLS
- Use TLS 1.2 minimum
- Implement HSTS (HTTP Strict Transport Security)
- Use secure cipher suites
- Implement certificate pinning for mobile
- Redirect HTTP to HTTPS
- Use secure cookies
- Implement OCSP stapling
- Regular certificate renewal

### Security Headers
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=()
```

## Data Protection

### Encryption at Rest
- Encrypt sensitive data in database
- Use field-level encryption when needed
- Implement key rotation
- Use hardware security modules (HSM)
- Encrypt backups
- Secure key storage
- Implement data masking
- Use transparent data encryption

### Encryption in Transit
- Use TLS for all communications
- Implement end-to-end encryption for sensitive data
- Use VPN for internal communications
- Encrypt API payloads when necessary
- Implement message-level security
- Use secure protocols only
- Monitor for protocol downgrades
- Implement perfect forward secrecy

### Personal Data Protection (GDPR/CCPA)
- Implement data minimization
- Provide data portability
- Implement right to deletion
- Maintain audit logs
- Get explicit consent
- Implement privacy by design
- Regular privacy assessments
- Document data processing

## Infrastructure Security

### Container Security
```dockerfile
# Run as non-root user
FROM node:alpine
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs

# Copy only necessary files
COPY --chown=nodejs:nodejs . .
```

### Kubernetes Security
```yaml
apiVersion: v1
kind: Pod
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    fsGroup: 2000
  containers:
  - name: app
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      capabilities:
        drop:
        - ALL
```

### Cloud Security
- Use IAM roles instead of keys
- Implement least privilege
- Enable cloud audit logs
- Use VPC and security groups
- Implement network segmentation
- Regular security assessments
- Use cloud-native security tools
- Implement defense in depth

## Security Monitoring

### Logging & Auditing
- Log authentication events
- Monitor authorization failures
- Track data access
- Log security exceptions
- Implement centralized logging
- Use structured logging
- Protect log integrity
- Regular log analysis

### Intrusion Detection
- Implement rate limiting
- Detect brute force attacks
- Monitor for SQL injection attempts
- Track unusual access patterns
- Use Web Application Firewall (WAF)
- Implement honeypots
- Regular security scans
- Incident response plan

### Security Testing
- Regular penetration testing
- Automated security scanning
- Dependency vulnerability scanning
- Static code analysis
- Dynamic application testing
- Security code reviews
- Bug bounty programs
- Red team exercises

## Secure Development Lifecycle

### Code Security
- Never hardcode secrets
- Use environment variables
- Implement secret rotation
- Regular dependency updates
- Security-focused code reviews
- Use security linters
- Implement git-secrets
- Secure CI/CD pipelines

### Third-Party Dependencies
- Regular vulnerability scanning
- Use lock files
- Monitor security advisories
- Implement Software Bill of Materials (SBOM)
- Vendor security assessment
- License compliance
- Supply chain security
- Regular updates

### Incident Response
- Incident response plan
- Security team contacts
- Escalation procedures
- Communication templates
- Post-mortem process
- Regular drills
- Lessons learned
- Continuous improvement

## OWASP Top 10 Prevention

1. **Injection**: Use parameterized queries
2. **Broken Authentication**: Implement secure session management
3. **Sensitive Data Exposure**: Encrypt sensitive data
4. **XML External Entities**: Disable XML external entity processing
5. **Broken Access Control**: Implement proper authorization
6. **Security Misconfiguration**: Harden all components
7. **XSS**: Validate and escape all inputs
8. **Insecure Deserialization**: Validate serialized objects
9. **Vulnerable Components**: Keep dependencies updated
10. **Insufficient Logging**: Implement comprehensive logging

## Security Best Practices Summary
- Security by design
- Defense in depth
- Least privilege principle
- Regular security updates
- Continuous monitoring
- Incident preparedness
- Security awareness training
- Regular security assessments

# Error Handling Best Practices

## Error Types and Strategies

### Error Categories
- **Operational Errors**: Expected errors (network failures, invalid input)
- **Programming Errors**: Bugs in code (type errors, logic errors)
- **System Errors**: Infrastructure issues (out of memory, disk full)

## Frontend Error Handling

### Try-Catch Blocks
```javascript
async function fetchData() {
  try {
    const response = await api.getData();
    return response.data;
  } catch (error) {
    // Log error for debugging
    console.error('Data fetch failed:', error);
    
    // Handle specific error types
    if (error.code === 'NETWORK_ERROR') {
      throw new Error('Network connection failed. Please try again.');
    }
    
    // Re-throw unknown errors
    throw error;
  }
}
```

### Error Boundaries (React)
```javascript
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    // Log to error reporting service
    errorReportingService.log({ error, errorInfo });
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

### Global Error Handlers
```javascript
// Unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault();
});

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});
```

## Backend Error Handling

### Express Error Middleware
```javascript
// Custom error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

// Error handling middleware
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  
  // Log error
  logger.error({
    error: err,
    request: req.url,
    method: req.method,
  });
  
  res.status(statusCode).json({
    status: 'error',
    message: statusCode === 500 ? 'Internal server error' : message,
  });
});
```

### Async Route Handler
```javascript
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  res.json(user);
}));
```

## Validation and Input Errors

### Schema Validation
```javascript
const { body, validationResult } = require('express-validator');

const validateUser = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
```

### Frontend Validation
```javascript
function validateForm(data) {
  const errors = {};
  
  if (!data.email || !isValidEmail(data.email)) {
    errors.email = 'Valid email is required';
  }
  
  if (!data.password || data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
```

## Error Recovery Strategies

### Retry Logic
```javascript
async function fetchWithRetry(url, options = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      
      // Exponential backoff
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, i) * 1000)
      );
    }
  }
}
```

### Circuit Breaker Pattern
```javascript
class CircuitBreaker {
  constructor(fn, threshold = 5, timeout = 60000) {
    this.fn = fn;
    this.threshold = threshold;
    this.timeout = timeout;
    this.failures = 0;
    this.nextAttempt = Date.now();
  }
  
  async call(...args) {
    if (this.failures >= this.threshold) {
      if (Date.now() < this.nextAttempt) {
        throw new Error('Circuit breaker is OPEN');
      }
      this.failures = 0;
    }
    
    try {
      const result = await this.fn(...args);
      this.failures = 0;
      return result;
    } catch (error) {
      this.failures++;
      if (this.failures >= this.threshold) {
        this.nextAttempt = Date.now() + this.timeout;
      }
      throw error;
    }
  }
}
```

## User-Friendly Error Messages

### Error Message Guidelines
- Be specific but not technical
- Provide actionable solutions
- Maintain consistent tone
- Include error codes for support

### Error Display Component
```javascript
const ErrorMessage = ({ error, onRetry }) => {
  const getMessage = (error) => {
    const messages = {
      NETWORK_ERROR: 'Connection failed. Please check your internet.',
      AUTH_FAILED: 'Login failed. Please check your credentials.',
      NOT_FOUND: 'The requested resource was not found.',
      DEFAULT: 'Something went wrong. Please try again.',
    };
    
    return messages[error.code] || messages.DEFAULT;
  };
  
  return (
    <div className="error-container">
      <p>{getMessage(error)}</p>
      {onRetry && (
        <button onClick={onRetry}>Try Again</button>
      )}
    </div>
  );
};
```

## Logging and Monitoring

### Structured Logging
```javascript
const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// Log with context
logger.error('Database query failed', {
  query: 'SELECT * FROM users',
  error: error.message,
  stack: error.stack,
  userId: req.user?.id,
  timestamp: new Date().toISOString(),
});
```

### Error Tracking Services
```javascript
// Sentry integration
Sentry.init({ dsn: process.env.SENTRY_DSN });

// Capture exceptions
try {
  riskyOperation();
} catch (error) {
  Sentry.captureException(error, {
    tags: { section: 'payment' },
    extra: { orderId: order.id },
  });
}
```

## Best Practices Summary

### Do's
- ✅ Handle errors at appropriate levels
- ✅ Provide meaningful error messages
- ✅ Log errors with context
- ✅ Implement retry mechanisms
- ✅ Use error boundaries in React
- ✅ Validate input early

### Don'ts
- ❌ Don't expose sensitive information
- ❌ Avoid catching errors without handling
- ❌ Don't use generic error messages
- ❌ Avoid infinite retry loops
- ❌ Don't ignore error logs

# Testing Best Practices

## Testing Pyramid

### Unit Tests (70%)
- Test individual functions/methods
- Fast, isolated, deterministic
- Mock external dependencies
- Run on every commit

### Integration Tests (20%)
- Test component interactions
- Verify API contracts
- Test database operations
- Run in CI pipeline

### E2E Tests (10%)
- Test critical user paths
- Verify full system behavior
- Run before deployment

## Test Structure

### AAA Pattern
```javascript
test('should calculate total price', () => {
  // Arrange
  const items = [{ price: 10 }, { price: 20 }];
  
  // Act
  const total = calculateTotal(items);
  
  // Assert
  expect(total).toBe(30);
});
```

### Test Naming
```javascript
// Pattern: should [expected behavior] when [condition]
describe('UserService', () => {
  it('should return user when valid ID provided', () => {});
  it('should throw error when user not found', () => {});
  it('should update cache after fetching user', () => {});
});
```

## Testing Principles

### FIRST Principles
- **Fast**: Tests run quickly
- **Independent**: No test depends on another
- **Repeatable**: Same result every time
- **Self-validating**: Pass or fail clearly
- **Timely**: Written with production code

### Test Coverage Goals
- Statements: 80%+
- Branches: 80%+
- Functions: 90%+
- Lines: 80%+

## Common Testing Patterns

### Mocking
```javascript
// Mock external services
const mockApi = {
  getUser: jest.fn().mockResolvedValue({ id: 1, name: 'John' })
};

// Mock timers
jest.useFakeTimers();
act(() => jest.advanceTimersByTime(1000));

// Mock modules
jest.mock('./api', () => ({
  fetchData: jest.fn()
}));
```

### Test Data Builders
```javascript
class UserBuilder {
  constructor() {
    this.user = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com'
    };
  }
  
  withName(name) {
    this.user.name = name;
    return this;
  }
  
  build() {
    return { ...this.user };
  }
}

// Usage
const user = new UserBuilder()
  .withName('John')
  .build();
```

### Parameterized Tests
```javascript
test.each([
  [1, 1, 2],
  [2, 3, 5],
  [3, 5, 8],
])('add(%i, %i) returns %i', (a, b, expected) => {
  expect(add(a, b)).toBe(expected);
});
```

## Testing Async Code

```javascript
// Promises
test('fetches user data', async () => {
  const data = await fetchUser(1);
  expect(data.name).toBe('John');
});

// Callbacks
test('calls callback', (done) => {
  fetchData((data) => {
    expect(data).toBeDefined();
    done();
  });
});

// Error handling
test('handles errors', async () => {
  await expect(fetchUser(-1)).rejects.toThrow('Invalid ID');
});
```

## Component Testing

### React Example
```javascript
test('renders and handles click', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  fireEvent.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Vue Example
```javascript
test('emits event on click', async () => {
  const wrapper = mount(Button);
  await wrapper.trigger('click');
  expect(wrapper.emitted().click).toBeTruthy();
});
```

## Test Doubles

### Types
- **Dummy**: Passed but not used
- **Stub**: Returns canned responses
- **Spy**: Records how it was called
- **Mock**: Pre-programmed with expectations
- **Fake**: Working implementation

### Example
```javascript
// Spy
const spy = jest.spyOn(console, 'log');
myFunction();
expect(spy).toHaveBeenCalledWith('expected message');

// Stub
const stub = jest.fn().mockReturnValue(42);

// Mock
const mock = jest.fn();
mock.mockReturnValueOnce(1).mockReturnValueOnce(2);
```

## Performance Testing

```javascript
test('completes within time limit', async () => {
  const start = performance.now();
  await heavyOperation();
  const duration = performance.now() - start;
  expect(duration).toBeLessThan(1000); // 1 second
});
```

## Security Testing

### Input Validation
```javascript
test.each([
  '<script>alert("XSS")</script>',
  "'; DROP TABLE users; --",
  '../../../etc/passwd',
])('sanitizes malicious input: %s', (input) => {
  const result = sanitize(input);
  expect(result).not.toContain('<script>');
  expect(result).not.toContain('DROP TABLE');
});
```

## Best Practices Summary

### Do's
- ✅ Write tests first (TDD)
- ✅ Test behavior, not implementation
- ✅ Keep tests simple and focused
- ✅ Use descriptive test names
- ✅ Mock external dependencies
- ✅ Test edge cases

### Don'ts
- ❌ Don't test framework code
- ❌ Avoid testing private methods
- ❌ Don't use production data
- ❌ Avoid time-dependent tests
- ❌ Don't ignore flaky tests

### Testing Checklist
- [ ] Happy path tested
- [ ] Error cases covered
- [ ] Edge cases handled
- [ ] Performance acceptable
- [ ] Security validated
- [ ] Documentation updated

## Project-Specific Context
- Configuration: custom
- Generated: 6/25/2025

Remember to reference files with @filename when providing context about specific implementations.
