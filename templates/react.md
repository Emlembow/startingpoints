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