# Testing Development Rules

## Testing Pyramid

### Unit Tests (70%)
- Test individual functions/methods
- Fast execution (milliseconds)
- No external dependencies
- High code coverage
- Test edge cases
- Use mocking/stubbing
- Run on every commit
- Deterministic results

### Integration Tests (20%)
- Test component interactions
- Test database operations
- Test API endpoints
- Test external service integration
- Use test databases
- Clean up test data
- Run in CI/CD pipeline
- Test error scenarios

### E2E Tests (10%)
- Test complete user flows
- Run in browser/real environment
- Test critical paths only
- Slower execution
- More maintenance required
- Use page object pattern
- Run before deployment
- Test across browsers

## Test-Driven Development (TDD)

### Red-Green-Refactor Cycle
1. **Red**: Write failing test first
2. **Green**: Write minimal code to pass
3. **Refactor**: Improve code quality
4. Repeat for each feature
5. Keep tests simple
6. One assertion per test
7. Test behavior, not implementation
8. Refactor tests too

### TDD Best Practices
```javascript
// Bad: Testing implementation
test('uses map to double values', () => {
  const spy = jest.spyOn(Array.prototype, 'map');
  doubleArray([1, 2, 3]);
  expect(spy).toHaveBeenCalled();
});

// Good: Testing behavior
test('doubles all array values', () => {
  expect(doubleArray([1, 2, 3])).toEqual([2, 4, 6]);
});
```

## Unit Testing Best Practices

### Test Structure (AAA Pattern)
```javascript
test('should calculate total price with tax', () => {
  // Arrange
  const items = [
    { price: 10, quantity: 2 },
    { price: 5, quantity: 3 }
  ];
  const taxRate = 0.1;
  
  // Act
  const total = calculateTotal(items, taxRate);
  
  // Assert
  expect(total).toBe(38.5);
});
```

### Test Naming Conventions
- Describe what is being tested
- Include expected behavior
- Be specific and descriptive
- Use consistent format

```javascript
// Good test names
describe('UserService', () => {
  test('should create user with valid data', () => {});
  test('should throw error when email is invalid', () => {});
  test('should hash password before saving', () => {});
});
```

### Mocking Strategies
```javascript
// Mock external dependencies
jest.mock('./emailService');

// Mock specific implementation
const mockSendEmail = jest.fn().mockResolvedValue(true);
emailService.send = mockSendEmail;

// Verify mock calls
expect(mockSendEmail).toHaveBeenCalledWith(
  'user@example.com',
  'Welcome',
  expect.any(String)
);
```

## Integration Testing

### Database Testing
```javascript
beforeEach(async () => {
  // Set up test database
  await db.migrate.latest();
  await db.seed.run();
});

afterEach(async () => {
  // Clean up
  await db.migrate.rollback();
});

test('should create user in database', async () => {
  const user = await createUser({
    email: 'test@example.com',
    name: 'Test User'
  });
  
  const found = await db('users').where({ id: user.id }).first();
  expect(found.email).toBe('test@example.com');
});
```

### API Testing
```javascript
describe('POST /api/users', () => {
  test('should create user with valid data', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        email: 'test@example.com',
        password: 'securePassword123',
        name: 'Test User'
      })
      .expect(201);
    
    expect(response.body).toMatchObject({
      id: expect.any(String),
      email: 'test@example.com',
      name: 'Test User'
    });
  });
});
```

## End-to-End Testing

### Page Object Pattern
```javascript
class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.submitButton = page.locator('button[type="submit"]');
  }
  
  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

### E2E Test Example
```javascript
test('user can complete purchase flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  // Login
  await page.goto('/login');
  await loginPage.login('user@example.com', 'password');
  
  // Add item to cart
  await page.goto('/products');
  await page.click('[data-testid="add-to-cart-1"]');
  
  // Checkout
  await page.goto('/checkout');
  await page.fill('[name="address"]', '123 Test St');
  await page.click('[data-testid="place-order"]');
  
  // Verify success
  await expect(page.locator('h1')).toContainText('Order Confirmed');
});
```

## Test Data Management

### Fixtures
```javascript
// fixtures/users.js
export const validUser = {
  email: 'test@example.com',
  name: 'Test User',
  role: 'user'
};

export const adminUser = {
  email: 'admin@example.com',
  name: 'Admin User',
  role: 'admin'
};
```

### Factories
```javascript
// factories/user.factory.js
export function createUser(overrides = {}) {
  return {
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
    name: faker.name.fullName(),
    createdAt: new Date(),
    ...overrides
  };
}
```

## Test Coverage

### Coverage Targets
- Aim for 80%+ code coverage
- 100% coverage for critical paths
- Focus on meaningful coverage
- Don't test for coverage sake
- Exclude generated code
- Monitor coverage trends
- Set coverage thresholds
- Review uncovered code

### Coverage Configuration
```json
{
  "jest": {
    "collectCoverageFrom": [
      "src/**/*.{js,jsx,ts,tsx}",
      "!src/**/*.d.ts",
      "!src/**/index.ts",
      "!src/**/*.stories.tsx"
    ],
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

## Performance Testing

### Load Testing
```javascript
import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
  },
};

export default function () {
  const res = http.get('https://api.example.com/users');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
}
```

## Testing Best Practices

### General Guidelines
- Write tests first (TDD)
- Keep tests simple and focused
- Test one thing at a time
- Use descriptive test names
- Avoid testing implementation details
- Make tests deterministic
- Keep tests fast
- Maintain tests regularly

### Test Maintenance
- Refactor tests with code
- Remove obsolete tests
- Update test data regularly
- Fix flaky tests immediately
- Document complex test setups
- Review test effectiveness
- Monitor test execution time
- Keep test dependencies updated

### CI/CD Integration
- Run tests on every commit
- Fail fast on test failures
- Parallelize test execution
- Cache dependencies
- Generate test reports
- Track test metrics
- Automate test environments
- Notify on failures

## Testing Anti-Patterns

### Common Mistakes
- Testing implementation over behavior
- Excessive mocking
- Brittle selectors in E2E tests
- Shared test state
- Testing framework code
- Ignoring flaky tests
- Over-testing simple code
- Under-testing complex logic

## Testing Tools by Language

### JavaScript/TypeScript
- Jest, Vitest (Unit)
- Supertest (API)
- Playwright, Cypress (E2E)
- React Testing Library
- Mock Service Worker

### Python
- pytest, unittest
- pytest-django
- requests-mock
- Selenium
- Locust (Load)

### Go
- testing package
- testify
- gomock
- httptest
- go-sqlmock

### Java
- JUnit, TestNG
- Mockito
- REST Assured
- Selenium
- JMeter

## Testing Best Practices Summary
- Follow testing pyramid
- Write meaningful tests
- Keep tests maintainable
- Automate testing
- Monitor test metrics
- Test early and often
- Focus on value
- Continuous improvement