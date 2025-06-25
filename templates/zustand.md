# Zustand Best Practices

## Basic Store

```typescript
interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
```

## Async Actions

```typescript
export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,
  
  fetchUser: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const user = await fetch(`/api/users/${id}`).then(r => r.json());
      set({ user, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  updateUser: (updates) => {
    const { user } = get();
    if (user) set({ user: { ...user, ...updates } });
  },
  
  logout: () => set({ user: null }),
}));
```

## Slices Pattern

```typescript
// Bear slice
const createBearSlice: StateCreator<BearSlice & FishSlice> = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
  eatFish: () => set((state) => ({ fishes: state.fishes - 1 })),
});

// Fish slice
const createFishSlice: StateCreator<BearSlice & FishSlice> = (set) => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
});

// Combined store
export const useBoundStore = create<BearSlice & FishSlice>()((...a) => ({
  ...createBearSlice(...a),
  ...createFishSlice(...a),
}));
```

## Selectors

```typescript
export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  filter: 'all',
  
  addTodo: (title) => set((state) => ({
    todos: [...state.todos, { id: Date.now().toString(), title, completed: false }],
  })),
    
  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ),
  })),
  
  // Selectors for derived state
  filteredTodos: () => {
    const { todos, filter } = get();
    if (filter === 'active') return todos.filter(t => !t.completed);
    if (filter === 'completed') return todos.filter(t => t.completed);
    return todos;
  },
  
  completedCount: () => get().todos.filter(t => t.completed).length,
}));
```

## Middleware

```typescript
// Persist state
export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'light',
      language: 'en',
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// DevTools
export const useStore = create<State>()(
  devtools(
    (set) => ({ /* store */ }),
    { name: 'MyStore' }
  )
);
```

## Performance

```typescript
// Shallow comparison
const { todos, filter } = useTodoStore(
  (state) => ({ todos: state.todos, filter: state.filter }),
  shallow
);

// Specific selectors
const completedCount = useTodoStore((state) => state.completedCount());

// Subscribe outside React
const unsub = useTodoStore.subscribe(
  (state) => state.count,
  (count) => console.log('Count changed:', count)
);
```

## Testing

```typescript
describe('Counter Store', () => {
  beforeEach(() => {
    useCounterStore.setState({ count: 0 });
  });
  
  it('should increment count', () => {
    const { result } = renderHook(() => useCounterStore());
    
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
  });
});

// Direct state access
const initialState = useCounterStore.getState();
useCounterStore.setState({ count: 5 });
```

## TypeScript

```typescript
// Type inference
const useStore = create<StoreState>()((set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
}));

// Selector typing
const count = useStore((state) => state.count); // number
const inc = useStore((state) => state.inc); // () => void
```

## Best Practices

### Do's
✅ Keep stores small & focused
✅ Use TypeScript
✅ Implement selectors
✅ Use middleware
✅ Test stores independently
✅ Use shallow comparison

### Don'ts
❌ No direct mutations
❌ Avoid monolithic stores
❌ Minimize subscriptions
❌ No UI logic in stores

## Common Patterns

```typescript
// Computed values
const useStore = create((set, get) => ({
  items: [],
  get total() { return get().items.length; },
}));

// Immer for complex updates
import { immer } from 'zustand/middleware/immer';

const useStore = create(immer((set) => ({
  nested: { deep: { value: 0 } },
  update: () => set((state) => {
    state.nested.deep.value++;
  }),
})));
```