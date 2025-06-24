# Angular Development Rules

## Project Structure
```
src/
├── app/
│   ├── core/               # Singleton services, guards
│   ├── shared/             # Shared components, directives, pipes
│   ├── features/           # Feature modules
│   │   ├── users/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── models/
│   │   │   └── users.routes.ts
│   │   └── products/
│   ├── layouts/            # Layout components
│   ├── app.component.ts
│   ├── app.config.ts       # App configuration
│   └── app.routes.ts       # Route configuration
├── assets/                 # Static assets
├── environments/           # Environment configs
├── styles/                 # Global styles
├── index.html
├── main.ts
└── styles.scss
```

## Modern Angular Patterns (v14+)
- Use standalone components (no NgModules)
- Implement signals for reactive state
- Use inject() function over constructor injection
- Leverage new control flow syntax (@if, @for, @switch)
- Use DestroyRef for cleanup
- Implement input transforms
- Use required inputs
- Leverage computed signals

## Component Architecture
- Keep components small and focused
- Use smart/dumb component pattern
- Implement OnPush change detection
- Use standalone components by default
- Leverage component composition
- Implement proper input/output contracts
- Use content projection appropriately
- Keep templates simple and declarative

## TypeScript Best Practices
- Enable strict mode in tsconfig
- Use interfaces for data models
- Implement proper type safety
- Avoid using 'any' type
- Use enums for constants
- Leverage TypeScript utility types
- Use access modifiers appropriately
- Implement generic types when reusable

## Services & Dependency Injection
- Use providedIn: 'root' for singleton services
- Implement service layer for business logic
- Use HttpClient with proper typing
- Handle errors with RxJS operators
- Implement proper service interfaces
- Use injection tokens for configuration
- Leverage hierarchical injectors
- Keep services focused and testable

## RxJS & Reactive Programming
- Use async pipe in templates
- Implement proper subscription management
- Use takeUntilDestroyed() operator
- Leverage RxJS operators effectively
- Avoid nested subscriptions
- Use subjects appropriately
- Implement proper error handling
- Cache HTTP requests when appropriate

## State Management
- Use signals for local component state
- Implement service-based state for features
- Consider NgRx for complex applications
- Use computed signals for derived state
- Implement proper state immutability
- Handle side effects appropriately
- Keep state normalized
- Implement proper state typing

## Routing & Navigation
- Use lazy loading for feature routes
- Implement route guards appropriately
- Use resolver for data preloading
- Handle route parameters properly
- Implement breadcrumbs
- Use router outlets effectively
- Handle navigation errors
- Implement deep linking support

## Forms & Validation
- Use typed reactive forms
- Implement custom validators
- Use form arrays for dynamic forms
- Handle async validation
- Show inline error messages
- Implement proper form state management
- Use control value accessors
- Create reusable form components

## HTTP & API Integration
- Use interceptors for common concerns
- Implement proper error handling
- Use environment-specific API URLs
- Handle loading states
- Implement retry logic
- Use proper request/response typing
- Cache requests appropriately
- Handle offline scenarios

## Performance Optimization
- Use OnPush change detection
- Implement lazy loading
- Use track functions in loops
- Optimize bundle size
- Implement virtual scrolling
- Use Web Workers for heavy computations
- Minimize change detection cycles
- Profile with Angular DevTools

## Testing Strategy
- Write unit tests with Jest/Jasmine
- Test components with TestBed
- Mock dependencies appropriately
- Test user interactions
- Implement integration tests
- Use component harnesses
- Test guards and interceptors
- Maintain >80% code coverage

## Styling & CSS
- Use component styles (ViewEncapsulation)
- Implement CSS custom properties
- Use SCSS for advanced features
- Follow BEM or similar methodology
- Implement responsive design
- Use CSS Grid and Flexbox
- Optimize CSS delivery
- Implement dark mode support

## Accessibility (a11y)
- Use semantic HTML elements
- Implement ARIA attributes
- Ensure keyboard navigation
- Test with screen readers
- Use Angular CDK a11y module
- Implement focus management
- Provide alt text for images
- Follow WCAG guidelines

## Security Best Practices
- Sanitize user inputs
- Use Angular's built-in sanitization
- Implement CSP headers
- Avoid direct DOM manipulation
- Use HTTPS for API calls
- Implement proper authentication
- Store tokens securely
- Validate data on server

## Internationalization (i18n)
- Use Angular i18n package
- Extract messages for translation
- Implement locale-specific formatting
- Support RTL languages
- Use ICU message format
- Implement language switching
- Handle pluralization
- Test all locales

## Build & Deployment
- Optimize build configuration
- Use production builds
- Implement source maps
- Configure budgets
- Use differential loading
- Implement PWA features
- Configure caching strategies
- Monitor bundle size

## Code Quality Tools
- Use ESLint with Angular rules
- Implement Prettier for formatting
- Use Husky for pre-commit hooks
- Run tests in CI/CD
- Use SonarQube for analysis
- Implement commit conventions
- Use semantic versioning
- Document with Compodoc

## Angular CLI Usage
- Use schematics for generation
- Customize schematics for team
- Use ng update for upgrades
- Leverage builders
- Use workspace configuration
- Implement custom schematics
- Use libraries for shared code
- Follow Angular style guide

## Error Handling
- Implement global error handler
- Log errors appropriately
- Show user-friendly messages
- Handle HTTP errors
- Implement retry mechanisms
- Use error boundaries
- Track errors in production
- Provide fallback UI

## Best Practices Summary
- Follow Angular style guide
- Keep up with Angular updates
- Use Angular DevTools
- Implement proper logging
- Document complex logic
- Use TypeScript strictly
- Write maintainable code
- Consider SSR with Angular Universal