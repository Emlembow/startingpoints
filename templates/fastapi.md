# FastAPI Development Rules

## Project Structure
```
project/
├── app/
│   ├── __init__.py
│   ├── main.py          # FastAPI app instance
│   ├── api/
│   │   ├── __init__.py
│   │   ├── deps.py      # Dependencies
│   │   └── v1/
│   │       ├── __init__.py
│   │       └── endpoints/
│   ├── core/
│   │   ├── config.py    # Settings
│   │   ├── security.py  # Auth utilities
│   │   └── database.py  # DB connection
│   ├── models/          # SQLAlchemy models
│   ├── schemas/         # Pydantic models
│   ├── crud/            # Database operations
│   └── utils/           # Helper functions
├── tests/
├── alembic/             # Database migrations
├── requirements.txt
└── .env
```

## Application Configuration
- Use Pydantic Settings for configuration management
- Load settings from environment variables
- Create separate configs for dev/staging/prod
- Use .env files for local development
- Validate all configuration at startup
- Document all environment variables
- Use proper secret management
- Implement health check endpoints

## API Design Principles
- Follow RESTful conventions
- Use proper HTTP methods (GET, POST, PUT, DELETE, PATCH)
- Return appropriate status codes
- Version APIs (/api/v1/)
- Use plural nouns for resources
- Implement HATEOAS where appropriate
- Keep endpoints focused and single-purpose
- Use proper URL path parameters and query strings

## Pydantic Models (Schemas)
- Create separate request and response models
- Use proper type hints and validation
- Implement custom validators when needed
- Use Pydantic's BaseModel for all schemas
- Create base schemas for common fields
- Use proper field descriptions
- Implement example values for documentation
- Handle optional fields with Optional[T]

## Database Integration
- Use SQLAlchemy ORM with async support
- Implement repository pattern for data access
- Use Alembic for database migrations
- Create proper database sessions per request
- Implement connection pooling
- Use transactions appropriately
- Handle database errors gracefully
- Index frequently queried fields

## Dependency Injection
- Use FastAPI's Depends system
- Create reusable dependencies
- Implement proper dependency chains
- Use dependencies for:
  - Database sessions
  - Current user authentication
  - Permission checking
  - Common parameters
- Keep dependencies focused and testable

## Authentication & Authorization
- Implement OAuth2 with JWT tokens
- Use FastAPI's security utilities
- Store passwords with proper hashing (bcrypt)
- Implement refresh token mechanism
- Set appropriate token expiration
- Use HTTPBearer for token transport
- Implement role-based access control (RBAC)
- Secure sensitive endpoints

## Request/Response Handling
- Validate all input data with Pydantic
- Use proper response models
- Implement consistent error responses
- Handle file uploads appropriately
- Use background tasks for long operations
- Implement request ID tracking
- Add CORS middleware when needed
- Compress responses for performance

## Error Handling
- Create custom exception classes
- Use FastAPI's exception handlers
- Return consistent error format
- Include error codes and messages
- Log errors with context
- Don't expose internal details
- Handle validation errors gracefully
- Implement global exception handling

## Async Best Practices
- Use async/await throughout
- Don't block the event loop
- Use async database drivers
- Implement async context managers
- Handle concurrent requests properly
- Use asyncio.gather for parallel operations
- Avoid synchronous I/O operations
- Test async code properly

## API Documentation
- Leverage FastAPI's automatic OpenAPI/Swagger
- Add proper descriptions to endpoints
- Include request/response examples
- Document all status codes
- Use tags to organize endpoints
- Add security schemes documentation
- Include API versioning info
- Keep documentation up-to-date

## Testing Strategy
- Use pytest with pytest-asyncio
- Create test client with TestClient
- Mock external dependencies
- Test all endpoints
- Include negative test cases
- Test authentication/authorization
- Use fixtures for test data
- Aim for high coverage

## Performance Optimization
- Use connection pooling
- Implement caching (Redis)
- Paginate large responses
- Use lazy loading for relationships
- Optimize database queries
- Implement rate limiting
- Use CDN for static assets
- Monitor response times

## Middleware & CORS
- Configure CORS appropriately
- Add request timing middleware
- Implement rate limiting
- Add security headers
- Use GZip compression
- Implement request logging
- Add request ID tracking
- Handle middleware order correctly

## Background Tasks
- Use FastAPI's BackgroundTasks
- Implement job queues for heavy tasks (Celery)
- Handle task failures gracefully
- Log background task execution
- Don't return sensitive data
- Set appropriate timeouts
- Monitor task execution
- Clean up completed tasks

## Logging & Monitoring
- Use structured logging (JSON)
- Include request context
- Log at appropriate levels
- Don't log sensitive data
- Use correlation IDs
- Monitor API metrics
- Set up alerts for errors
- Use APM tools (New Relic, DataDog)

## Security Best Practices
- Validate all inputs
- Use HTTPS in production
- Implement rate limiting
- Add security headers
- Prevent SQL injection
- Use parameterized queries
- Implement CSRF protection
- Regular security audits

## Deployment Considerations
- Use Gunicorn with Uvicorn workers
- Configure proper worker counts
- Use Docker for containerization
- Implement health checks
- Use reverse proxy (Nginx)
- Enable auto-restart on failure
- Monitor memory usage
- Implement zero-downtime deployments

## Development Workflow
- Use hot-reload in development
- Implement pre-commit hooks
- Use environment-specific configs
- Document API changes
- Version control migrations
- Use feature flags
- Implement CI/CD pipelines
- Regular dependency updates