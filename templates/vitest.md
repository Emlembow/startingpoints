# Vitest Best Practices

## Configuration

### Basic Setup
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['node_modules/', 'test/'],
    },
  },
});
```

### Test Setup
```typescript
// test/setup.ts
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
```

## Writing Tests

### Basic Structure
```typescript
import { describe, it, expect, beforeEach } from 'vitest';

describe('Calculator', () => {
  it('should add numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it.each([
    [1, 1, 2],
    [2, 3, 5],
  ])('add(%i, %i) = %i', (a, b, expected) => {
    expect(add(a, b)).toBe(expected);
  });
});
```

### Component Testing
```typescript
// React
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

test('handles click', async () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click</Button>);
  
  await userEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledOnce();
});

// Vue
import { mount } from '@vue/test-utils';

test('emits event', async () => {
  const wrapper = mount(Button);
  await wrapper.trigger('click');
  expect(wrapper.emitted('click')).toBeTruthy();
});
```

## Mocking

### Module Mocks
```typescript
vi.mock('./api', () => ({
  fetchUser: vi.fn(() => Promise.resolve({ id: 1 })),
}));

// Partial mocking
vi.mock('./utils', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    formatDate: vi.fn(() => '2023-01-01'),
  };
});
```

### Spies and Stubs
```typescript
// Spy on existing method
const spy = vi.spyOn(console, 'log');

// Mock implementation
const mock = vi.fn()
  .mockResolvedValueOnce('first')
  .mockResolvedValueOnce('second');

// Timer mocks
vi.useFakeTimers();
vi.advanceTimersByTime(1000);
vi.useRealTimers();
```

## Async Testing

```typescript
// Promises
test('fetches data', async () => {
  await expect(fetchData()).resolves.toEqual({ data: 'test' });
});

// Error handling
test('handles errors', async () => {
  await expect(fetchData(-1)).rejects.toThrow('Invalid ID');
});

// Timers
test('debounces calls', async () => {
  vi.useFakeTimers();
  const fn = vi.fn();
  const debounced = debounce(fn, 300);
  
  debounced();
  debounced();
  
  expect(fn).not.toHaveBeenCalled();
  await vi.runAllTimersAsync();
  expect(fn).toHaveBeenCalledOnce();
});
```

## Snapshots

```typescript
test('matches snapshot', () => {
  const { container } = render(<Card title="Test" />);
  expect(container.firstChild).toMatchSnapshot();
});

// Inline snapshots
test('generates correct data', () => {
  expect(generateConfig()).toMatchInlineSnapshot(`
    {
      "env": "test",
      "debug": false,
    }
  `);
});
```

## Coverage

```typescript
// vitest.config.ts
coverage: {
  provider: 'v8',
  reporter: ['text', 'json', 'html'],
  thresholds: {
    statements: 80,
    branches: 80,
    functions: 80,
    lines: 80,
  },
}

// Run with coverage
// vitest --coverage
```

## Performance

### Benchmarking
```typescript
import { bench, describe } from 'vitest';

describe('Array operations', () => {
  bench('map', () => {
    [1, 2, 3].map(x => x * 2);
  });

  bench('for loop', () => {
    const arr = [1, 2, 3];
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      result.push(arr[i] * 2);
    }
  });
});
```

## Best Practices

### Do's
- ✅ Keep tests close to source
- ✅ Use descriptive names
- ✅ Mock external dependencies
- ✅ Test edge cases
- ✅ Use setup/teardown hooks

### Don'ts
- ❌ Don't test implementation
- ❌ Avoid global state
- ❌ Don't use real APIs
- ❌ Avoid time-dependent tests
- ❌ Don't ignore flaky tests

### Tips
- Use `it.concurrent` for parallel tests
- Use `it.skip` to temporarily disable
- Use `it.only` to focus on specific test
- Use `--watch` for development
- Configure reporters for CI/CD