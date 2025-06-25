# SvelteKit Best Practices

## Project Structure
```
src/
├── lib/              # Shared code
├── routes/          # File-based routing
│   ├── +page.svelte → /
│   ├── blog/[slug]/ → /blog/:slug
│   └── api/users/   → /api/users
├── hooks.server.ts
└── app.d.ts
```

## Load Functions

```typescript
// +page.server.ts
export const load: PageServerLoad = async ({ params, fetch }) => {
  const post = await fetch(`/api/posts/${params.slug}`).then(r => r.json());
  return { post };
};
```

## Form Actions

```typescript
export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const email = data.get('email');
    
    if (!email?.toString().includes('@')) {
      return { error: 'Invalid email' };
    }
    
    await saveEmail(email);
    return { success: true };
  }
};
```

## Components

```svelte
<script lang="ts">
  export let variant: 'primary' | 'secondary' = 'primary';
  export let disabled = false;
  
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<button
  class="btn btn-{variant}"
  {disabled}
  on:click={() => dispatch('click')}
>
  <slot />
</button>

<style>
  .btn { padding: 0.5rem 1rem; }
  .btn-primary { background: #3b82f6; color: white; }
</style>
```

## State Management

```typescript
// Stores
export const user = writable(null);
export const isAuthenticated = derived(user, $user => $user !== null);

// Custom store
function createCounter() {
  const { subscribe, update, set } = writable(0);
  return {
    subscribe,
    increment: () => update(n => n + 1),
    reset: () => set(0)
  };
}
```

```svelte
<!-- Using stores -->
{#if $isAuthenticated}
  <p>Welcome, {$user.name}!</p>
{/if}
```

## API Routes

```typescript
// +server.ts
export const GET: RequestHandler = async ({ url }) => {
  const users = await getUsers(Number(url.searchParams.get('limit') ?? 10));
  return json(users);
};

export const POST: RequestHandler = async ({ request }) => {
  const user = await request.json();
  const created = await createUser(user);
  return json(created, { status: 201 });
};
```

## Hooks

```typescript
// hooks.server.ts
export const handle: Handle = async ({ event, resolve }) => {
  event.locals.user = await getUserFromSession(event.cookies);
  
  const response = await resolve(event);
  response.headers.set('x-custom-header', 'value');
  return response;
};
```

## Progressive Enhancement

```svelte
<script>
  import { enhance } from '$app/forms';
  let loading = false;
</script>

<form method="POST" use:enhance={() => {
  loading = true;
  return async ({ result }) => {
    loading = false;
  };
}}>
  <input name="email" type="email" required />
  <button disabled={loading}>
    {loading ? 'Submitting...' : 'Submit'}
  </button>
</form>
```

## Error Handling

```svelte
<!-- +error.svelte -->
<h1>{$page.status}: {$page.error.message}</h1>
{#if $page.status === 404}
  <a href="/">Go home</a>
{/if}
```

```typescript
// hooks.server.ts
export const handleError = ({ error }) => {
  console.error(error);
  return { message: 'Internal Error' };
};
```

## Performance

```svelte
<!-- Preloading -->
<a href="/about" on:mouseenter={() => preloadData('/about')}>
  About
</a>

<!-- Lazy loading -->
<script>
  let Component;
  onMount(async () => {
    Component = (await import('$lib/Heavy.svelte')).default;
  });
</script>

{#if Component}
  <svelte:component this={Component} />
{/if}
```

## Best Practices

### Do's
✅ Use TypeScript
✅ Server-side rendering
✅ Progressive enhancement
✅ Form actions for mutations
✅ Handle errors gracefully

### Don'ts
❌ No fetching in components
❌ Avoid client-only solutions
❌ Don't ignore accessibility
❌ Keep bundles small

## Common Patterns

```typescript
// Page data typing
import type { PageData } from './$types';
export let data: PageData;

// Shared load function
export const load = (async ({ parent }) => {
  const parentData = await parent();
  return { ...parentData, extra: 'data' };
}) satisfies PageServerLoad;

// Invalidation
import { invalidateAll } from '$app/navigation';
await invalidateAll();
```