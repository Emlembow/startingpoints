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