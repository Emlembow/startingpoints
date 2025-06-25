# SolidJS Best Practices

## Code Organization and Structure

### Directory Structure
```
src/
├── components/       # Reusable UI components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.module.css
│   │   └── Button.test.tsx
├── contexts/        # SolidJS Context providers
├── hooks/          # Custom hooks
├── utils/          # Utility functions
├── routes/         # Route components
├── styles/         # Global styles
├── App.tsx         # Root component
└── index.tsx       # Entry point
```

### File Naming Conventions
- Components: PascalCase (e.g., `Button.tsx`, `UserProfile.tsx`)
- Hooks: camelCase prefixed with `use` (e.g., `useTheme.ts`)
- Utilities: camelCase (e.g., `api.ts`, `formatDate.js`)
- Styles: Use `.module.css` for CSS modules

## Component Architecture

### Functional Components
```typescript
import { Component, createSignal } from 'solid-js';

const MyComponent: Component<{ title: string }> = (props) => {
  const [count, setCount] = createSignal(0);
  
  return (
    <div>
      <h1>{props.title}</h1>
      <button onClick={() => setCount(count() + 1)}>
        Count: {count()}
      </button>
    </div>
  );
};
```

### State Management
- Component-level state: Use signals
- Global state: Use Context API or stores
- Always treat state as immutable
- Use `createMemo` for derived values

## Common Patterns

### Data Fetching with createResource
```typescript
import { createResource } from 'solid-js';

const [data] = createResource(async () => {
  const response = await fetch('/api/data');
  return response.json();
});
```

### Control Flow Components
```typescript
import { Show, For } from 'solid-js';

// Conditional rendering
<Show when={isLoading()} fallback={<div>Content</div>}>
  <div>Loading...</div>
</Show>

// List rendering
<For each={items()}>
  {(item) => <div>{item.name}</div>}
</For>
```

## Performance Optimization

### Fine-Grained Reactivity
- Break components into smaller, focused units
- Use derived signals and memos for expensive computations
- Implement lazy loading with dynamic imports

### Memory Management
```typescript
import { onCleanup } from 'solid-js';

// Always cleanup resources
const timer = setInterval(() => {}, 1000);
onCleanup(() => clearInterval(timer));
```

## Security Best Practices

### Input Validation
- Always validate inputs on the server
- Sanitize user inputs to prevent XSS
- Avoid using innerHTML directly

### Authentication Patterns
- Implement proper JWT handling
- Use secure cookie storage
- Protect routes with authentication guards

## Testing Approaches

### Unit Testing
```typescript
import { render } from '@solidjs/testing-library';
import { expect, test } from 'vitest';

test('renders component', () => {
  const { getByText } = render(() => <Button>Click me</Button>);
  expect(getByText('Click me')).toBeInTheDocument();
});
```

### Best Practices
- Colocate tests with components
- Mock external dependencies
- Test all edge cases and scenarios

## Common Pitfalls to Avoid

### Anti-patterns
- ❌ Destructuring props (breaks reactivity)
- ❌ Reading and writing same signal in effects
- ❌ Using `.map()` instead of `<For>`
- ❌ Mutating state directly
- ❌ Forgetting cleanup functions

### Correct Patterns
- ✅ Access props directly: `props.value`
- ✅ Use functional updates: `setCount(c => c + 1)`
- ✅ Use control flow components
- ✅ Create new objects when updating
- ✅ Always use `onCleanup` for resources

## Development Tools

### Recommended Setup
- Build tool: Vite
- Language: TypeScript
- Linting: ESLint
- Formatting: Prettier
- Testing: Vitest or Jest
- Devtools: SolidJS DevTools extension

### Configuration Example
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: 'esnext',
  },
});
```