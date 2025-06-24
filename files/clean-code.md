# Clean Code Development Rules

## Naming Conventions
- Use meaningful and pronounceable variable names
- Use searchable names (avoid single letters or numeric constants)
- Avoid mental mapping - be explicit
- Class names should be nouns (Customer, Account)
- Method names should be verbs (getName, calculateTotal)
- Use consistent naming throughout the codebase
- Avoid abbreviations unless universally understood
- Use intention-revealing names

## Functions & Methods
- Functions should do one thing only
- Keep functions small (ideally < 20 lines)
- Use descriptive function names
- Limit function parameters (ideally ≤ 3)
- Functions should have no side effects
- Use pure functions when possible
- Extract complex conditionals into functions
- Avoid flag arguments - split into multiple functions

## Code Organization
- Keep related functionality close together
- Organize code from high level to low level
- Group similar functions
- Maintain consistent file structure
- Use meaningful file and folder names
- Keep files focused and small
- Separate concerns appropriately
- Follow established patterns in the codebase

## Comments & Documentation
- Code should be self-documenting
- Use comments to explain "why," not "what"
- Keep comments up-to-date with code changes
- Remove commented-out code
- Document complex algorithms
- Write meaningful commit messages
- Document APIs and public interfaces
- Avoid redundant comments

## Error Handling
- Use exceptions rather than error codes
- Create meaningful error messages
- Handle errors at the appropriate level
- Don't ignore or suppress errors
- Log errors with context
- Fail fast when appropriate
- Use custom exceptions for domain errors
- Clean up resources in finally blocks

## Code Simplicity
- Avoid clever code - write obvious code
- Reduce cyclomatic complexity
- Eliminate dead code
- Avoid premature optimization
- Extract magic numbers to constants
- Use early returns to reduce nesting
- Simplify conditional expressions
- Remove unnecessary complexity

## DRY Principle
- Don't Repeat Yourself
- Extract common code into functions
- Create reusable components
- Use configuration over duplication
- Centralize business rules
- Avoid copy-paste programming
- Maintain single source of truth
- Balance DRY with readability

## SOLID Principles
- **Single Responsibility**: Classes should have one reason to change
- **Open/Closed**: Open for extension, closed for modification
- **Liskov Substitution**: Derived classes must be substitutable
- **Interface Segregation**: Many specific interfaces are better
- **Dependency Inversion**: Depend on abstractions, not concretions

## Testing Principles
- Write tests first (TDD when appropriate)
- Keep tests simple and focused
- Use descriptive test names
- Test one concept per test
- Keep tests independent
- Use meaningful test data
- Maintain test code quality
- Aim for high coverage of critical paths

## Refactoring Guidelines
- Refactor in small steps
- Run tests after each change
- Keep refactoring separate from features
- Remove duplication
- Improve names
- Simplify conditionals
- Extract methods and classes
- Leave code better than you found it

## Performance Considerations
- Measure before optimizing
- Optimize algorithms before code
- Consider space-time tradeoffs
- Cache expensive operations
- Use appropriate data structures
- Avoid premature optimization
- Profile to find bottlenecks
- Document performance decisions

## Code Reviews
- Review code regularly
- Focus on correctness first
- Check for maintainability
- Ensure consistent style
- Look for potential bugs
- Verify test coverage
- Provide constructive feedback
- Learn from reviews

## Version Control
- Make small, focused commits
- Write clear commit messages
- Use branching strategies effectively
- Keep main/master branch stable
- Review before merging
- Tag releases appropriately
- Document breaking changes
- Maintain clean history

## Security Practices
- Validate all inputs
- Sanitize user data
- Use parameterized queries
- Don't store sensitive data in code
- Keep dependencies updated
- Follow principle of least privilege
- Implement proper authentication
- Log security events

## Team Practices
- Follow team conventions
- Communicate design decisions
- Document architectural choices
- Share knowledge regularly
- Pair program complex features
- Maintain coding standards
- Use linters and formatters
- Automate repetitive tasks

## Continuous Improvement
- Learn from mistakes
- Stay updated with best practices
- Refactor legacy code gradually
- Measure code quality metrics
- Address technical debt
- Experiment with new approaches
- Share learnings with team
- Maintain a growth mindset