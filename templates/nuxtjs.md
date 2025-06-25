# Nuxt.js Best Practices

## Project Structure

### Directory Organization
```
nuxt-app/
├── components/      # Reusable Vue components
├── composables/     # Reusable composition functions
├── layouts/         # Page layouts
├── middleware/      # Route middleware
├── pages/          # File-based routing
├── plugins/        # Nuxt plugins
├── public/         # Static assets
├── server/         # Server routes and API
│   ├── api/
│   └── middleware/
├── stores/         # Pinia stores
├── utils/          # Utility functions
└── nuxt.config.ts  # Configuration
```

### File Naming Conventions
- Components: `PascalCase.vue` (e.g., `UserCard.vue`)
- Composables: `usePascalCase.ts` (e.g., `useAuth.ts`)
- Pages: `kebab-case.vue` (e.g., `user-profile.vue`)
- Stores: `kebab-case.ts` (e.g., `user-store.ts`)

## Core Concepts

### Auto-imports
```typescript
// No need to import - Nuxt auto-imports these
export default defineNuxtConfig({
  // Configuration
})

// In components
const { $fetch } = useNuxtApp()
const route = useRoute()
const router = useRouter()
```

### File-based Routing
```
pages/
├── index.vue          → /
├── about.vue          → /about
├── users/
│   ├── index.vue      → /users
│   └── [id].vue       → /users/:id
└── [...slug].vue      → /* (catch-all)
```

## Data Fetching

### useFetch and useAsyncData
```vue
<script setup>
// Simple fetch
const { data, pending, error } = await useFetch('/api/users')

// With options
const { data: user } = await useFetch(`/api/users/${id}`, {
  pick: ['name', 'email'],
  transform: (data) => data.user,
})

// useAsyncData for custom logic
const { data } = await useAsyncData('users', async () => {
  const [users, roles] = await Promise.all([
    $fetch('/api/users'),
    $fetch('/api/roles')
  ])
  return { users, roles }
})
</script>
```

### Server-Side Rendering (SSR)
```vue
<script setup>
// Runs on server and client
const data = await useFetch('/api/data')

// Client-only
onMounted(() => {
  // Client-side logic
})

// Server-only
if (process.server) {
  // Server-side logic
}
</script>
```

## State Management with Pinia

### Store Definition
```typescript
// stores/user.ts
export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const isLoggedIn = computed(() => !!user.value)
  
  async function login(credentials) {
    const data = await $fetch('/api/login', {
      method: 'POST',
      body: credentials
    })
    user.value = data.user
  }
  
  function logout() {
    user.value = null
    navigateTo('/login')
  }
  
  return { user, isLoggedIn, login, logout }
})
```

## Composables

### Creating Composables
```typescript
// composables/useCounter.ts
export const useCounter = () => {
  const count = useState('counter', () => 0)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  
  return {
    count: readonly(count),
    increment,
    decrement
  }
}
```

## Middleware

### Route Middleware
```typescript
// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const { isLoggedIn } = useUserStore()
  
  if (!isLoggedIn.value) {
    return navigateTo('/login')
  }
})
```

### Using Middleware
```vue
<script setup>
// In pages
definePageMeta({
  middleware: 'auth'
})
</script>
```

## API Routes

### Server API
```typescript
// server/api/users/index.get.ts
export default defineEventHandler(async (event) => {
  const users = await getUsersFromDB()
  return users
})

// server/api/users/[id].ts
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const method = event.node.req.method
  
  switch (method) {
    case 'GET':
      return await getUser(id)
    case 'PUT':
      const body = await readBody(event)
      return await updateUser(id, body)
    case 'DELETE':
      return await deleteUser(id)
  }
})
```

## Layouts

### Default Layout
```vue
<!-- layouts/default.vue -->
<template>
  <div>
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
```

### Custom Layout
```vue
<!-- pages/admin.vue -->
<script setup>
definePageMeta({
  layout: 'admin'
})
</script>
```

## Performance Optimization

### Lazy Loading
```vue
<script setup>
// Lazy load components
const LazyModal = defineAsyncComponent(() => 
  import('~/components/Modal.vue')
)
</script>

<template>
  <LazyModal v-if="showModal" />
</template>
```

### Image Optimization
```vue
<template>
  <NuxtImg
    src="/hero.jpg"
    alt="Hero image"
    width="1200"
    height="600"
    loading="lazy"
    format="webp"
  />
</template>
```

## SEO and Meta Tags

### useSeoMeta
```vue
<script setup>
useSeoMeta({
  title: 'My Page Title',
  description: 'Page description',
  ogTitle: 'My Page Title',
  ogDescription: 'Page description',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image',
})
</script>
```

## Error Handling

### Error Page
```vue
<!-- error.vue -->
<script setup>
const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div>
    <h1>{{ error.statusCode }}</h1>
    <p>{{ error.statusMessage }}</p>
    <button @click="handleError">Go Home</button>
  </div>
</template>
```

## Best Practices Summary

### Do's
✅ Use auto-imports
✅ Leverage file routing
✅ Use Pinia for state
✅ Optimize with NuxtImg
✅ TypeScript everywhere

### Don'ts
❌ No prop mutations
❌ Avoid global state
❌ Don't skip types
❌ No client-only in SSR