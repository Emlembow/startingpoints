# Testing Best Practices

## Testing Pyramid

### Unit Tests (70%)
- Test individual functions/methods
- Fast, isolated, deterministic
- Mock external dependencies
- Run on every commit

### Integration Tests (20%)
- Test component interactions
- Verify API contracts
- Test database operations
- Run in CI pipeline

### E2E Tests (10%)
- Test critical user paths
- Verify full system behavior
- Run before deployment

## Test Structure

### AAA Pattern
```javascript
test('should calculate total price', () => {
  // Arrange
  const items = [{ price: 10 }, { price: 20 }];
  
  // Act
  const total = calculateTotal(items);
  
  // Assert
  expect(total).toBe(30);
});
```

### Test Naming
```javascript
// Pattern: should [expected behavior] when [condition]
describe('UserService', () => {
  it('should return user when valid ID provided', () => {});
  it('should throw error when user not found', () => {});
  it('should update cache after fetching user', () => {});
});
```

## Testing Principles

### FIRST Principles
- **Fast**: Tests run quickly
- **Independent**: No test depends on another
- **Repeatable**: Same result every time
- **Self-validating**: Pass or fail clearly
- **Timely**: Written with production code

### Test Coverage Goals
- Statements: 80%+
- Branches: 80%+
- Functions: 90%+
- Lines: 80%+

## Common Testing Patterns

### Mocking
```javascript
// Mock external services
const mockApi = {
  getUser: jest.fn().mockResolvedValue({ id: 1, name: 'John' })
};

// Mock timers
jest.useFakeTimers();
act(() => jest.advanceTimersByTime(1000));

// Mock modules
jest.mock('./api', () => ({
  fetchData: jest.fn()
}));
```

### Test Data Builders
```javascript
class UserBuilder {
  constructor() {
    this.user = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com'
    };
  }
  
  withName(name) {
    this.user.name = name;
    return this;
  }
  
  build() {
    return { ...this.user };
  }
}

// Usage
const user = new UserBuilder()
  .withName('John')
  .build();
```

### Parameterized Tests
```javascript
test.each([
  [1, 1, 2],
  [2, 3, 5],
  [3, 5, 8],
])('add(%i, %i) returns %i', (a, b, expected) => {
  expect(add(a, b)).toBe(expected);
});
```

## Testing Async Code

```javascript
// Promises
test('fetches user data', async () => {
  const data = await fetchUser(1);
  expect(data.name).toBe('John');
});

// Callbacks
test('calls callback', (done) => {
  fetchData((data) => {
    expect(data).toBeDefined();
    done();
  });
});

// Error handling
test('handles errors', async () => {
  await expect(fetchUser(-1)).rejects.toThrow('Invalid ID');
});
```

## Component Testing

### React Example
```javascript
test('renders and handles click', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  fireEvent.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Vue Example
```javascript
test('emits event on click', async () => {
  const wrapper = mount(Button);
  await wrapper.trigger('click');
  expect(wrapper.emitted().click).toBeTruthy();
});
```

## Test Doubles

### Types
- **Dummy**: Passed but not used
- **Stub**: Returns canned responses
- **Spy**: Records how it was called
- **Mock**: Pre-programmed with expectations
- **Fake**: Working implementation

### Example
```javascript
// Spy
const spy = jest.spyOn(console, 'log');
myFunction();
expect(spy).toHaveBeenCalledWith('expected message');

// Stub
const stub = jest.fn().mockReturnValue(42);

// Mock
const mock = jest.fn();
mock.mockReturnValueOnce(1).mockReturnValueOnce(2);
```

## Performance Testing

```javascript
test('completes within time limit', async () => {
  const start = performance.now();
  await heavyOperation();
  const duration = performance.now() - start;
  expect(duration).toBeLessThan(1000); // 1 second
});
```

## Security Testing

### Input Validation
```javascript
test.each([
  '<script>alert("XSS")</script>',
  "'; DROP TABLE users; --",
  '../../../etc/passwd',
])('sanitizes malicious input: %s', (input) => {
  const result = sanitize(input);
  expect(result).not.toContain('<script>');
  expect(result).not.toContain('DROP TABLE');
});
```

## Best Practices Summary

### Do's
- ✅ Write tests first (TDD)
- ✅ Test behavior, not implementation
- ✅ Keep tests simple and focused
- ✅ Use descriptive test names
- ✅ Mock external dependencies
- ✅ Test edge cases

### Don'ts
- ❌ Don't test framework code
- ❌ Avoid testing private methods
- ❌ Don't use production data
- ❌ Avoid time-dependent tests
- ❌ Don't ignore flaky tests

### Testing Checklist
- [ ] Happy path tested
- [ ] Error cases covered
- [ ] Edge cases handled
- [ ] Performance acceptable
- [ ] Security validated
- [ ] Documentation updated