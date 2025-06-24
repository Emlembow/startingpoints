# Python Development Rules

## Code Style & Formatting
- Follow PEP 8 style guide
- Use Black for automatic code formatting (88 char line length)
- Use isort for import sorting (black compatible settings)
- Use flake8 or ruff for linting
- Follow naming conventions:
  - `snake_case` for functions, variables, modules
  - `PascalCase` for classes
  - `UPPER_SNAKE_CASE` for constants
  - Private with single underscore `_private`
  - Name mangling with double underscore `__very_private`

## Project Structure
```
project/
├── src/
│   └── package_name/
│       ├── __init__.py
│       ├── core/
│       ├── api/
│       ├── models/
│       └── utils/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── fixtures/
├── docs/
├── scripts/
├── requirements/
│   ├── base.txt
│   ├── dev.txt
│   └── prod.txt
├── .env.example
├── pyproject.toml
└── README.md
```

## Type Hints & Annotations
- Use type hints for all function signatures
- Import from `typing` module for complex types
- Use `Optional[T]` over `T | None` for clarity
- Define custom types with TypeAlias
- Use Protocol for structural subtyping
- Type hint generators and async functions
- Use TypedDict for dictionary structures
- Run mypy for static type checking

## Error Handling
- Use specific exception types
- Create custom exceptions for domain errors
- Always catch specific exceptions, not bare except
- Use finally for cleanup operations
- Log exceptions with proper context
- Re-raise with `raise` to preserve stack trace
- Use contextlib for resource management
- Handle errors at appropriate levels

## Functions & Classes
- Keep functions small and focused
- Use descriptive names
- Document with docstrings (Google/NumPy style)
- Avoid mutable default arguments
- Use *args and **kwargs judiciously
- Implement `__str__` and `__repr__` for classes
- Use properties for computed attributes
- Follow SOLID principles

## Async Programming
- Use async/await for I/O operations
- Avoid blocking operations in async functions
- Use asyncio.gather for concurrent operations
- Implement proper error handling in async code
- Use async context managers
- Avoid mixing sync and async code
- Use proper async libraries (httpx, aiofiles)
- Test async code properly

## Testing Best Practices
- Use pytest as testing framework
- Write tests before or with code (TDD)
- Aim for high test coverage (>80%)
- Use fixtures for test data
- Mock external dependencies
- Test edge cases and error conditions
- Use parameterized tests
- Keep tests independent and fast

## Documentation
- Use docstrings for all public modules, functions, classes
- Follow Google or NumPy docstring style consistently
- Include type information in docstrings
- Document parameters, returns, raises
- Keep README.md comprehensive and updated
- Use inline comments sparingly and meaningfully
- Generate API docs with Sphinx or mkdocs
- Include usage examples

## Virtual Environments & Dependencies
- Always use virtual environments (venv, virtualenv, poetry)
- Pin dependency versions in requirements files
- Separate dev and production dependencies
- Use pip-tools or poetry for dependency management
- Regular security updates with pip-audit
- Document system dependencies
- Use .env files for configuration
- Never commit sensitive data

## Performance Optimization
- Profile before optimizing
- Use appropriate data structures
- Leverage built-in functions and libraries
- Use generators for memory efficiency
- Implement caching where appropriate
- Use concurrent.futures for CPU-bound tasks
- Use asyncio for I/O-bound tasks
- Monitor memory usage

## Security Best Practices
- Never hardcode secrets or passwords
- Use environment variables for config
- Validate and sanitize all inputs
- Use parameterized queries for databases
- Keep dependencies updated
- Use cryptography library for encryption
- Implement proper authentication
- Follow OWASP guidelines

## Logging & Monitoring
- Use Python's logging module
- Configure appropriate log levels
- Use structured logging (JSON)
- Include context in log messages
- Rotate logs appropriately
- Don't log sensitive information
- Use correlation IDs for tracing
- Monitor application metrics

## Database Best Practices
- Use ORM for database interactions (SQLAlchemy)
- Implement proper migrations (Alembic)
- Use connection pooling
- Handle transactions properly
- Implement proper indexing
- Use prepared statements
- Avoid N+1 queries
- Back up data regularly

## API Development (General)
- Follow RESTful principles
- Use proper HTTP methods and status codes
- Implement pagination for lists
- Version your APIs
- Use proper authentication (JWT, OAuth)
- Implement rate limiting
- Validate request data
- Return consistent response formats

## Code Quality Tools
- pre-commit hooks for formatting and linting
- GitHub Actions or GitLab CI for automation
- Coverage.py for test coverage
- Bandit for security scanning
- Black for formatting
- isort for import sorting
- mypy for type checking
- pytest for testing

## Best Practices Summary
- Write readable code - code is read more than written
- Follow the Zen of Python (import this)
- Don't repeat yourself (DRY)
- Keep it simple (KISS)
- You aren't gonna need it (YAGNI)
- Fail fast and explicitly
- Use standard library when possible
- Contribute back to open source