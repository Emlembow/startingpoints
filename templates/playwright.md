# Playwright Test Automation Rules

## Tech Stack
- TypeScript with strict mode enabled
- Playwright with @playwright/test runner
- Zod for API schema validation
- Modern ES6+ JavaScript features

## CODE PRINCIPLES

### Write Clean, Maintainable Tests
- Favor readability over cleverness
- Use descriptive variable names that explain intent
- Keep functions small and focused on one task
- Avoid nested callbacks - use async/await
- Extract complex logic into well-named helper functions

### Type Safety First
- Always use TypeScript over JavaScript
- Avoid `any` type - if needed, document why
- Define interfaces for complex data structures
- Use strict null checks and type narrowing
- Leverage TypeScript's inference where possible

### Test Organization
- One test file per feature or user journey
- Group related tests with describe blocks
- Keep test files under 200 lines
- Separate concerns: tests, page objects, utilities
- Name test files with .spec.ts extension

## LOCATOR STRATEGY

### Selector Hierarchy (Most to Least Preferred)
1. Role-based selectors for accessibility
2. Text content for user-visible elements
3. Labels for form inputs
4. Placeholders as fallback for inputs
5. Test IDs when semantic selectors unavailable
6. CSS selectors only as last resort

### Locator Best Practices
- Always prefer user-facing attributes
- Never use generated classes or IDs
- Avoid xpath unless absolutely necessary
- Store frequently used locators as constants
- Use exact text matching for precision
- Filter collections instead of complex selectors

### Anti-patterns to Avoid
- Don't chain multiple CSS selectors
- Don't rely on element position or index
- Don't use implementation details as selectors
- Don't hardcode dynamic values in selectors
- Don't use brittle parent-child relationships

## PAGE OBJECT MODEL

### Design Principles
- Each page class represents a logical page or component
- Constructor only accepts page instance
- All locators defined as getter methods
- Methods represent complete user actions
- Every action must include success validation
- Return new page objects for navigation

### Method Design
- Name methods after user intent, not implementation
- Include all steps user would take
- Add appropriate waits and validations
- Handle expected variations in behavior
- Throw descriptive errors for failures
- Document complex business logic

### What Not to Do
- Don't expose raw Playwright methods
- Don't create single-click methods
- Don't return locators from methods
- Don't mix UI and API calls in same class
- Don't share state between page objects

## WAITING & TIMING

### Auto-waiting Philosophy
- Trust Playwright's built-in waiting
- Only add explicit waits for specific conditions
- Never use arbitrary sleep or setTimeout
- Wait for application state, not time
- Use network idle for page transitions

### When to Add Explicit Waits
- Waiting for specific API responses
- Complex animations completion
- Dynamic content population
- Third-party widget initialization
- File downloads or uploads

### Common Waiting Mistakes
- Adding waits to "fix" flaky tests
- Waiting for elements already auto-waited
- Using fixed timeouts instead of conditions
- Not waiting for application readiness
- Ignoring loading indicators

## TEST ISOLATION

### Independence Requirements
- Each test must run in any order
- No shared state between tests
- Clean up created data after tests
- Use fresh browser context per test
- Reset application state in beforeEach

### Data Management
- Generate unique test data per run
- Avoid hardcoded test accounts
- Clean up test data in afterEach
- Use API calls for data setup when possible
- Separate test data from test logic

### Context Handling
- New page for each test
- Clear cookies and storage
- Reset authentication state
- Close opened tabs or windows
- Handle browser permissions properly

## API TESTING

### Integration Approach
- Use API calls for test setup/teardown
- Validate both UI and API responses
- Mock external dependencies
- Test error scenarios thoroughly
- Verify data consistency across layers

### Request Validation
- Check status codes explicitly
- Validate response schemas with Zod
- Test pagination and filtering
- Verify error response formats
- Check rate limiting behavior

### Best Practices
- Separate API tests from UI tests
- Use request interceptors for mocking
- Test both success and failure paths
- Validate business logic constraints
- Monitor response times

## ASSERTIONS

### Assertion Strategy
- Use web-first assertions that auto-retry
- Make assertions specific and descriptive
- Test positive and negative cases
- Avoid multiple assertions per test
- Use soft assertions for non-critical checks

### What to Assert
- User-visible state changes
- Successful action completion
- Error message display
- Data persistence
- Navigation outcomes

### What Not to Assert
- Implementation details
- Intermediate states
- Third-party service responses
- Styling details (unless critical)
- Console logs or warnings

## ERROR HANDLING

### Debugging Strategy
- Enable traces on first retry
- Capture screenshots on failure
- Record videos for complex scenarios
- Add meaningful console logs
- Use Playwright Inspector for debugging

### Error Recovery
- Implement retry logic for flaky operations
- Handle known error conditions gracefully
- Provide clear error messages
- Clean up resources on failure
- Report actionable error information

### Common Issues
- Element not found - improve selectors
- Timeout errors - check for loading states
- Navigation failures - verify URLs
- Authentication issues - check session handling
- Race conditions - add proper synchronization

## PERFORMANCE

### Optimization Techniques
- Run tests in parallel by default
- Use sharding for large test suites
- Minimize test setup overhead
- Reuse authentication state when safe
- Lazy load test data and fixtures

### Resource Management
- Close pages after each test
- Dispose of browser contexts
- Clean up event listeners
- Cancel pending requests
- Clear timers and intervals

### Monitoring
- Track test execution times
- Identify slowest tests
- Monitor flakiness rates
- Review retry statistics
- Optimize critical path tests

## CONFIGURATION

### Environment Setup
- Use environment variables for configuration
- Set appropriate timeouts for CI/CD
- Configure retries for stability
- Enable parallel execution
- Set up proper reporting

### Project Organization
- Separate configs for local and CI
- Use projects for browser variants
- Configure global setup/teardown
- Set viewport sizes appropriately
- Handle responsive breakpoints

### Security Practices
- Never commit credentials
- Use environment variables for secrets
- Rotate test account passwords
- Mask sensitive data in logs
- Secure API keys properly

## CI/CD INTEGRATION

### GitHub Actions Setup
- Install browsers in CI environment
- Use artifact upload for reports
- Run on pull requests and main branch
- Configure appropriate runners
- Set up test result notifications

### Stability Measures
- Increase timeouts for CI environment
- Add retries for network operations
- Use headless mode for speed
- Configure proper error reporting
- Monitor test trends over time

### Optimization
- Cache dependencies properly
- Parallelize test execution
- Use test sharding for speed
- Run smoke tests first
- Skip non-critical tests on PRs

## BEST PRACTICES

### Do's
- Write tests from user perspective
- Keep tests focused and atomic
- Use meaningful test descriptions
- Handle asynchronous operations properly
- Maintain consistent code style

### Don'ts
- Don't test external services
- Don't use arbitrary waits
- Don't share state between tests
- Don't ignore test failures
- Don't skip error handling

### Code Review Checklist
- Tests are independent
- Selectors are maintainable
- Assertions are meaningful
- Error handling is present
- No hardcoded values

## COMMON PATTERNS

### Authentication
- Store auth state for reuse
- Handle token refresh
- Test both authenticated and anonymous flows
- Validate session expiration
- Support multiple user roles

### Form Handling
- Fill all fields before submission
- Validate error states
- Test field validation
- Handle dynamic form elements
- Check success confirmations

### Navigation
- Wait for page load completion
- Verify URL changes
- Handle redirects properly
- Test browser back/forward
- Validate deep linking

### Data Tables
- Filter by specific criteria
- Test sorting functionality
- Validate pagination
- Check empty states
- Verify data accuracy

### File Operations
- Set up file inputs properly
- Validate upload progress
- Check file type restrictions
- Test download functionality
- Clean up uploaded files