# Svelte Development Rules

## Component Structure
```svelte
<script lang="ts">
  // 1. Imports
  // 2. Props/exports
  // 3. Local state
  // 4. Reactive declarations ($:)
  // 5. Lifecycle functions
  // 6. Functions/handlers
</script>

<!-- Markup with minimal logic -->

<style>
  /* Component styles */
</style>
```

## Component Best Practices
- Keep components small and single-purpose
- Use TypeScript for better type safety
- Export props with proper types
- Use $$props and $$restProps appropriately
- Implement proper event forwarding
- Use slots for component composition
- Keep logic in script, not template
- Use components for reusability

## Props & Component API
- Type all component props
- Use export let for required props
- Provide default values for optional props
- Document complex props with comments
- Use readonly props when appropriate
- Validate props when necessary
- Follow consistent naming conventions
- Export functions/actions when needed

## Reactivity Patterns
- Use reactive declarations ($:) effectively
- Keep reactive statements simple
- Avoid complex chains of reactivity
- Use stores for cross-component state
- Understand reactivity triggers
- Batch DOM updates appropriately
- Use tick() when needed for DOM updates
- Avoid circular dependencies

## Svelte Stores
- Use writable stores for mutable state
- Use readable stores for external data
- Create derived stores for computed values
- Implement custom store contracts
- Use auto-subscription ($store) in components
- Unsubscribe in non-component code
- Keep stores focused and modular
- Type stores properly with TypeScript

## State Management Patterns
```javascript
// Custom store pattern
function createTodoStore() {
  const { subscribe, set, update } = writable([]);
  
  return {
    subscribe,
    add: (todo) => update(todos => [...todos, todo]),
    remove: (id) => update(todos => todos.filter(t => t.id !== id)),
    toggle: (id) => update(todos => 
      todos.map(t => t.id === id ? {...t, done: !t.done} : t)
    )
  };
}
```

## Event Handling
- Use createEventDispatcher for custom events
- Forward DOM events with on:event
- Type custom events properly
- Use event modifiers (preventDefault, stopPropagation)
- Handle bubbling appropriately
- Debounce/throttle when needed
- Clean up event listeners
- Use actions for complex DOM interactions

## Lifecycle Functions
- onMount: DOM initialization, subscriptions
- onDestroy: Cleanup subscriptions, timers
- beforeUpdate: Pre-DOM update logic
- afterUpdate: Post-DOM update logic
- Use lifecycle functions sparingly
- Prefer reactive declarations
- Handle SSR considerations
- Clean up resources properly

## Animations & Transitions
- Use built-in transitions (fade, slide, etc.)
- Create custom transitions when needed
- Implement intro/outro animations
- Use animate directive for FLIP animations
- Configure easing functions
- Handle animation performance
- Use CSS animations when simpler
- Test animations across devices

## Forms & Input Handling
- Use bind: directives appropriately
- Implement two-way binding carefully
- Validate inputs on change/blur
- Show inline validation messages
- Handle form submission
- Use bind:group for radio/checkboxes
- Implement debouncing for inputs
- Create reusable form components

## Actions (use: directive)
- Create reusable DOM behaviors
- Type actions properly
- Handle cleanup in destroy
- Pass parameters to actions
- Update on parameter changes
- Use for third-party integrations
- Implement tooltips, click-outside
- Test actions thoroughly

## SvelteKit Integration
- Use load functions for data fetching
- Implement proper layouts
- Handle errors with error pages
- Use server-side rendering (SSR)
- Implement API routes
- Use form actions for mutations
- Handle progressive enhancement
- Configure adapters properly

## Performance Optimization
- Use {#key} blocks for list updates
- Implement lazy loading
- Minimize reactive computations
- Use CSS for animations when possible
- Avoid large component trees
- Profile with browser DevTools
- Implement code splitting
- Optimize bundle size

## TypeScript Integration
```typescript
// Typed component props
export interface ComponentProps {
  title: string;
  count?: number;
  onUpdate?: (value: number) => void;
}

// Typed stores
import type { Writable } from 'svelte/store';
export const store: Writable<User[]> = writable([]);

// Typed events
type Events = {
  update: { value: number };
  delete: { id: string };
};
```

## Testing Strategies
- Use Vitest for unit testing
- Test components with @testing-library/svelte
- Mock stores and external dependencies
- Test component interactions
- Verify event dispatching
- Test reactive behaviors
- Use component fixtures
- Maintain good coverage

## Styling Best Practices
- Use scoped styles by default
- Leverage CSS custom properties
- Implement global styles carefully
- Use :global() modifier sparingly
- Organize styles logically
- Use CSS preprocessing if needed
- Implement responsive design
- Consider CSS-in-JS alternatives

## Accessibility
- Use semantic HTML elements
- Implement ARIA attributes
- Ensure keyboard navigation
- Manage focus appropriately
- Test with screen readers
- Use Svelte's a11y warnings
- Implement skip links
- Follow WCAG guidelines

## Error Handling
- Handle errors in load functions
- Implement error boundaries
- Show user-friendly messages
- Log errors appropriately
- Handle async errors
- Validate external data
- Provide fallback UI
- Test error scenarios

## Build Configuration
- Use Vite for development
- Configure TypeScript properly
- Set up path aliases
- Optimize build output
- Configure environment variables
- Use appropriate adapters
- Implement CSP headers
- Monitor bundle size

## Best Practices Summary
- Keep components simple and focused
- Use TypeScript for type safety
- Leverage Svelte's reactivity
- Write semantic, accessible markup
- Test components thoroughly
- Optimize for performance
- Follow Svelte conventions
- Stay updated with Svelte changes