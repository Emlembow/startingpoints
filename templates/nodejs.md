# Node.js Development Rules

## Project Structure
```
project/
├── src/
│   ├── controllers/     # Route handlers
│   ├── services/        # Business logic
│   ├── models/          # Data models
│   ├── middlewares/     # Custom middleware
│   ├── routes/          # Route definitions
│   ├── utils/           # Helper functions
│   ├── config/          # Configuration
│   └── app.js           # Express app setup
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── public/              # Static files
├── scripts/             # Build/deployment scripts
├── package.json
├── tsconfig.json        # If using TypeScript
├── .env.example
└── README.md
```

## Express.js Setup
- Initialize Express app in separate file from server
- Use compression middleware for responses
- Implement proper body parsing (express.json())
- Set up CORS with proper configuration
- Use helmet for security headers
- Implement request logging with morgan/winston
- Set up error handling middleware last
- Configure static file serving appropriately

## Routing Best Practices
- Use Express Router for modular routes
- Group routes by resource/feature
- Use proper HTTP methods
- Implement RESTful conventions
- Use route parameters appropriately
- Validate route parameters
- Version APIs (/api/v1/)
- Document routes with comments or Swagger

## Middleware Architecture
- Order middleware correctly (general → specific)
- Create focused, single-purpose middleware
- Use next() properly for flow control
- Handle errors in middleware
- Implement authentication middleware
- Add request ID for tracing
- Use conditional middleware when needed
- Test middleware in isolation

## Error Handling
- Create custom error classes
- Implement global error handler
- Use try-catch in async routes
- Wrap async routes with error handler
- Return consistent error format
- Log errors with context
- Don't expose stack traces in production
- Handle different error types appropriately

## Async Operations
- Use async/await over callbacks
- Handle Promise rejections
- Use Promise.all() for parallel operations
- Implement proper error boundaries
- Avoid callback hell
- Use util.promisify for callback APIs
- Handle event emitter errors
- Implement timeouts for long operations

## Database Integration
- Use connection pooling
- Implement proper ORM/ODM (Sequelize, Mongoose)
- Handle connection errors
- Use transactions where appropriate
- Implement proper migrations
- Index frequently queried fields
- Use prepared statements
- Monitor query performance

## Authentication & Security
- Use bcrypt for password hashing
- Implement JWT with proper expiration
- Store sensitive data in environment variables
- Use HTTPS in production
- Implement rate limiting
- Validate and sanitize inputs
- Prevent SQL/NoSQL injection
- Use CSRF protection for forms

## API Design
- Follow RESTful principles
- Use proper status codes
- Implement pagination for lists
- Version your APIs
- Use consistent response format
- Implement filtering and sorting
- Handle partial updates (PATCH)
- Document with OpenAPI/Swagger

## Environment Configuration
- Use dotenv for environment variables
- Create .env.example file
- Validate environment variables at startup
- Use different configs for environments
- Don't commit .env files
- Use proper defaults
- Document all variables
- Use config module for organization

## Logging & Monitoring
- Use winston or pino for logging
- Implement structured logging
- Use appropriate log levels
- Include request context in logs
- Don't log sensitive information
- Rotate logs in production
- Integrate with monitoring services
- Add performance metrics

## Testing Strategy
- Use Jest or Mocha for testing
- Write unit tests for services
- Test API endpoints with supertest
- Mock external dependencies
- Use factories for test data
- Test error scenarios
- Implement CI/CD testing
- Aim for >80% coverage

## Performance Optimization
- Use clustering for multi-core CPUs
- Implement caching (Redis)
- Optimize database queries
- Use streaming for large responses
- Implement pagination
- Compress responses
- Use CDN for static assets
- Monitor memory usage

## WebSocket Integration
- Use Socket.io or ws library
- Implement proper authentication
- Handle connection lifecycle
- Use rooms/namespaces appropriately
- Implement heartbeat mechanism
- Handle reconnection logic
- Scale with Redis adapter
- Test real-time features

## Process Management
- Use PM2 or similar in production
- Handle graceful shutdown
- Implement health checks
- Monitor process metrics
- Use cluster mode for scaling
- Handle uncaught exceptions
- Implement auto-restart
- Log process events

## TypeScript Integration
- Use strict TypeScript config
- Type all function parameters
- Create interfaces for data models
- Use enums for constants
- Implement proper error types
- Use generics appropriately
- Avoid using any type
- Generate types from schemas

## Security Best Practices
- Keep dependencies updated
- Use npm audit regularly
- Implement CSP headers
- Validate all inputs
- Use parameterized queries
- Implement rate limiting
- Use security.txt file
- Regular security testing

## API Documentation
- Use Swagger/OpenAPI
- Document all endpoints
- Include request/response examples
- Document error responses
- Keep documentation updated
- Use JSDoc for code
- Create API changelog
- Provide client SDKs

## Deployment Best Practices
- Use Docker containers
- Implement health checks
- Use reverse proxy (Nginx)
- Enable gzip compression
- Set up SSL certificates
- Use environment-specific builds
- Implement zero-downtime deployments
- Monitor application metrics

## Code Quality
- Use ESLint with proper rules
- Implement Prettier for formatting
- Use husky for pre-commit hooks
- Follow naming conventions
- Keep functions small and focused
- Avoid deep nesting
- Use early returns
- Comment complex logic

## Package Management
- Use package-lock.json
- Audit dependencies regularly
- Use exact versions in production
- Separate dev dependencies
- Remove unused packages
- Check license compatibility
- Use npm scripts effectively
- Document npm scripts