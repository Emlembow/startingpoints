# Vue.js Development Rules

## Component Architecture
- Use Composition API for new projects (Vue 3+)
- Keep components small and single-purpose
- Use Single File Components (.vue) structure
- Follow the `<script setup>` syntax for cleaner code
- Organize by feature rather than file type
- Implement proper component communication patterns
- Use provide/inject for deeply nested props
- Create composable functions for reusable logic

## Composition API Best Practices
- Use `ref()` for primitive values
- Use `reactive()` for objects (with caution)
- Prefer `ref()` over `reactive()` for consistency
- Always use `computed()` for derived state
- Implement watchers only when necessary
- Use `watchEffect()` for simple side effects
- Extract logic into composables (use* functions)
- Keep setup function organized and readable

## Component Structure (SFC)
```vue
<script setup lang="ts">
// 1. Imports
// 2. Props and Emits
// 3. Reactive state
// 4. Computed properties
// 5. Watchers
// 6. Lifecycle hooks
// 7. Methods
// 8. Expose (if needed)
</script>

<template>
  <!-- Template with minimal logic -->
</template>

<style scoped>
/* Scoped styles */
</style>
```

## Props & Events
- Define props with TypeScript interfaces
- Use proper prop validation and defaults
- Emit events with proper TypeScript typing
- Follow naming conventions (camelCase for props, kebab-case in templates)
- Use v-model for two-way binding appropriately
- Document complex props with comments
- Validate props at runtime when critical
- Use prop destructuring with default values

## State Management (Pinia)
- Create modular stores by domain/feature
- Use Setup Stores syntax for consistency
- Implement proper TypeScript typing
- Keep actions focused and testable
- Use getters for computed store values
- Handle async operations with proper error handling
- Implement optimistic updates for better UX
- Use store composition for complex state

## Reactivity Guidelines
- Understand reactivity limitations
- Avoid directly mutating arrays (use methods)
- Use proper array update patterns
- Be cautious with reactive() on arrays
- Use shallowRef/shallowReactive for performance
- Implement toRefs() when destructuring reactive objects
- Use unref() when needed
- Avoid reactivity loss with proper patterns

## Template Best Practices
- Keep templates declarative and simple
- Avoid complex expressions in templates
- Use computed properties for complex logic
- Implement proper v-if vs v-show usage
- Always use :key with v-for
- Avoid v-for with v-if on same element
- Use template refs properly
- Implement proper slot usage

## Performance Optimization
- Use async components for code splitting
- Implement proper lazy loading with defineAsyncComponent
- Use v-memo for expensive list renders
- Optimize re-renders with v-once when appropriate
- Implement proper component caching
- Use shallowRef for large objects
- Profile with Vue DevTools
- Minimize watchers and computed dependencies

## Vue Router
- Use typed routes for better DX
- Implement navigation guards appropriately
- Use route meta for page-level config
- Handle route params validation
- Implement proper error pages
- Use nested routes for layouts
- Lazy load route components
- Handle navigation failures gracefully

## Form Handling
- Use v-model with computed properties for complex forms
- Implement form validation with VeeValidate or similar
- Create reusable form components
- Handle form submission states properly
- Show inline validation errors
- Implement proper debouncing for inputs
- Use proper input types and attributes
- Handle file uploads appropriately

## TypeScript Integration
- Enable strict mode in tsconfig
- Use `defineProps` with TypeScript
- Type component emits properly
- Use generic components when needed
- Type inject/provide pairs
- Create proper type definitions for stores
- Use Vue-specific TypeScript utilities
- Avoid using any type

## Testing Strategies
- Unit test composables thoroughly
- Test components with Vue Test Utils
- Mock external dependencies properly
- Test user interactions, not implementation
- Use testing-library principles
- Test error states and edge cases
- Implement E2E tests for critical flows
- Maintain good test coverage

## Error Handling
- Implement error boundaries with onErrorCaptured
- Handle async errors in components
- Use try-catch in async operations
- Show user-friendly error messages
- Log errors appropriately
- Implement fallback UI for errors
- Handle network errors gracefully
- Validate external data

## Styling Approaches
- Use scoped styles by default
- Implement CSS Modules when needed
- Use deep selectors sparingly (`:deep()`)
- Leverage CSS custom properties
- Implement proper style encapsulation
- Use PostCSS for transformations
- Consider CSS-in-JS solutions carefully
- Maintain consistent styling approach

## Build & Development
- Use Vite for development and building
- Configure proper environment variables
- Implement proper build optimization
- Use proper chunk splitting strategies
- Configure proper polyfills if needed
- Set up proper linting (ESLint)
- Use Prettier for formatting
- Implement pre-commit hooks

## Accessibility
- Use semantic HTML in templates
- Implement proper ARIA attributes
- Ensure keyboard navigation
- Manage focus appropriately
- Test with screen readers
- Use proper heading hierarchy
- Implement skip links
- Follow WCAG guidelines

## Best Practices Summary
- Follow official Vue Style Guide
- Keep components focused and reusable
- Use TypeScript for better maintainability
- Write tests for critical functionality
- Document complex business logic
- Optimize for performance from the start
- Consider SSR/SSG with Nuxt when beneficial
- Stay updated with Vue ecosystem changes