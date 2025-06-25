# Jest Testing Best Practices

## Test Organization

### Directory Structure
```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── Button.test.tsx
├── utils/
│   ├── helpers.ts
│   └── helpers.test.ts
└── __tests__/
    └── integration/
```

### File Naming Conventions
- Test files: `.test.js`, `.test.ts`, or `.spec.js`
- Keep test files close to source files
- Use `__tests__` directory for integration tests

## Writing Tests

### Basic Test Structure
```javascript
describe('UserAuthentication', () => {
  beforeEach(() => {
    // Setup before each test
  });

  afterEach(() => {
    // Cleanup after each test
  });

  it('should log in a user with valid credentials', async () => {
    // Arrange
    const credentials = { username: 'test', password: 'pass' };
    
    // Act
    const result = await login(credentials);
    
    // Assert
    expect(result.success).toBe(true);
  });
});
```

### Testing Async Code
```javascript
// Using async/await
it('fetches user data', async () => {
  const data = await fetchUser(1);
  expect(data.name).toBe('John');
});

// Using promises
it('resolves with user data', () => {
  return expect(fetchUser(1)).resolves.toEqual({ name: 'John' });
});
```

## Mocking

### Module Mocking
```javascript
// Mock entire module
jest.mock('./api');

// Mock specific function
jest.spyOn(api, 'getUser').mockResolvedValue({ id: 1 });
```

### Mock Implementation
```javascript
const mockFn = jest.fn();
mockFn.mockImplementation((x) => x * 2);
mockFn.mockReturnValue(42);
mockFn.mockResolvedValue({ data: 'test' });
```

## Jest Matchers

### Common Matchers
```javascript
// Equality
expect(value).toBe(4);
expect(obj).toEqual({ name: 'test' });

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();

// Numbers
expect(value).toBeGreaterThan(3);
expect(value).toBeCloseTo(0.3);

// Strings
expect('team').toMatch(/I/);

// Arrays
expect(['Alice', 'Bob']).toContain('Alice');

// Exceptions
expect(() => throwError()).toThrow();
```

## Best Practices

### Do's
- ✅ Keep tests isolated and independent
- ✅ Use descriptive test names
- ✅ Follow AAA pattern (Arrange, Act, Assert)
- ✅ Mock external dependencies
- ✅ Test edge cases and error scenarios
- ✅ Use beforeEach/afterEach for setup/teardown

### Don'ts
- ❌ Don't test implementation details
- ❌ Avoid testing third-party libraries
- ❌ Don't share state between tests
- ❌ Avoid hardcoded test data
- ❌ Don't use production data in tests

## Configuration

### jest.config.js
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

## Testing React Components

### Component Testing
```javascript
import { render, screen, fireEvent } from '@testing-library/react';

test('renders button and handles click', () => {
  const handleClick = jest.fn();
  
  render(<Button onClick={handleClick}>Click me</Button>);
  
  const button = screen.getByText('Click me');
  fireEvent.click(button);
  
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

## Advanced Techniques

### Snapshot Testing
```javascript
it('renders correctly', () => {
  const tree = renderer.create(<Component />).toJSON();
  expect(tree).toMatchSnapshot();
});
```

### Custom Matchers
```javascript
expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    return {
      pass,
      message: () => `expected ${received} to be within range ${floor} - ${ceiling}`,
    };
  },
});
```

### Timer Mocks
```javascript
jest.useFakeTimers();

it('calls callback after delay', () => {
  const callback = jest.fn();
  setTimeout(callback, 1000);
  
  jest.advanceTimersByTime(1000);
  expect(callback).toHaveBeenCalled();
});
```

## Performance Tips

### Optimization Strategies
- Use `jest.clearAllMocks()` in beforeEach
- Run tests in parallel (default behavior)
- Use `--maxWorkers` flag for CI environments
- Mock expensive operations
- Use focused tests during development

### Coverage Reports
```bash
# Generate coverage report
jest --coverage

# With specific threshold
jest --coverage --coverageThreshold='{"global":{"lines":80}}'
```