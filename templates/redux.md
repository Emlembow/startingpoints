# Redux Best Practices

## Store Setup (Redux Toolkit)

```typescript
// Store configuration
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## Creating Slices

```typescript
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1; // Immer handles immutability
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

## Async Actions

```typescript
// Async thunk
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await fetch('/api/todos');
    return response.json();
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    todoToggled: (state, action) => {
      const todo = state.items.find(t => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
```

## Selectors

```typescript
// Basic selectors
export const selectAllTodos = (state: RootState) => state.todos.items;
export const selectTodoById = (state: RootState, id: string) =>
  state.todos.items.find(todo => todo.id === id);

// Memoized selectors
export const selectCompletedTodos = createSelector(
  [selectAllTodos],
  (todos) => todos.filter(todo => todo.completed)
);

export const selectTodoStats = createSelector(
  [selectAllTodos],
  (todos) => ({
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
  })
);
```

## Component Usage

```typescript
function TodoList() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectAllTodos);
  const status = useAppSelector(state => state.todos.status);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);
  
  if (status === 'loading') return <div>Loading...</div>;
  
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch(todoToggled(todo.id))}
          />
          {todo.title}
        </li>
      ))}
    </ul>
  );
}
```

## Entity Adapters

```typescript
const usersAdapter = createEntityAdapter<User>({
  selectId: (user) => user.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(),
  reducers: {
    userAdded: usersAdapter.addOne,
    usersReceived: usersAdapter.setAll,
    userUpdated: usersAdapter.updateOne,
  },
});

// Generated selectors
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors((state: RootState) => state.users);
```

## RTK Query

```typescript
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => 'todos',
      providesTags: ['Todo'],
    }),
    addTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (todo) => ({
        url: 'todos',
        method: 'POST',
        body: todo,
      }),
      invalidatesTags: ['Todo'],
    }),
  }),
});

export const { useGetTodosQuery, useAddTodoMutation } = api;
```

## Performance

```typescript
// Normalized state structure
interface NormalizedState {
  users: {
    byId: Record<string, User>;
    allIds: string[];
  };
}

// Efficient selectors
const selectUserById = (state: RootState, userId: string) =>
  state.users.byId[userId];

const selectPostsByUser = createSelector(
  [(state) => state.posts.byId, (_, userId) => userId],
  (posts, userId) => Object.values(posts).filter(p => p.authorId === userId)
);
```

## Testing

```typescript
describe('counter reducer', () => {
  it('should handle increment', () => {
    const previousState = { value: 5 };
    expect(counterReducer(previousState, increment())).toEqual({
      value: 6,
    });
  });
});
```

## Best Practices

### Do's
✅ Use Redux Toolkit
✅ Normalize state shape
✅ TypeScript for safety
✅ Reusable selectors
✅ Test reducers

### Don'ts
❌ No direct mutations
❌ Avoid nested state
❌ No non-serializable values
❌ Don't overuse for local state

## Common Patterns

```typescript
// Prepare callback for complex payloads
reducers: {
  todoAdded: {
    reducer: (state, action) => {
      state.items.push(action.payload);
    },
    prepare: (title: string) => ({
      payload: { id: nanoid(), title, completed: false }
    }),
  },
}

// Listener middleware for side effects
listenerMiddleware.startListening({
  actionCreator: todoAdded,
  effect: async (action, listenerApi) => {
    console.log('Todo added:', action.payload);
  },
});
```