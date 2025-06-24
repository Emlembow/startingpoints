# Go Development Rules

## Project Structure
```
project/
├── cmd/
│   └── app/
│       └── main.go      # Application entry point
├── internal/            # Private application code
│   ├── config/          # Configuration
│   ├── handlers/        # HTTP handlers
│   ├── models/          # Data models
│   ├── repository/      # Data access layer
│   ├── service/         # Business logic
│   └── middleware/      # HTTP middleware
├── pkg/                 # Public packages
├── api/                 # API definitions (OpenAPI, Proto)
├── scripts/             # Build and deployment scripts
├── tests/               # Integration tests
├── go.mod
├── go.sum
└── README.md
```

## Go Best Practices
- Use Go 1.21+ features appropriately
- Follow effective Go guidelines
- Write idiomatic Go code
- Prefer standard library over dependencies
- Use meaningful package names
- Keep interfaces small
- Accept interfaces, return structs
- Handle errors explicitly

## Error Handling
- Always check errors
- Wrap errors with context
- Use custom error types when needed
- Never panic in libraries
- Use errors.Is and errors.As
- Return early on errors
- Log errors at appropriate level
- Provide actionable error messages

## Concurrency Patterns
- Use goroutines for concurrent work
- Communicate via channels
- Don't share memory unnecessarily
- Use sync package primitives correctly
- Implement proper cancellation with context
- Avoid goroutine leaks
- Use worker pools for bounded concurrency
- Test concurrent code thoroughly

## HTTP Server Development
```go
// Use Go 1.22+ enhanced ServeMux
mux := http.NewServeMux()
mux.HandleFunc("GET /api/users/{id}", handleGetUser)
mux.HandleFunc("POST /api/users", handleCreateUser)

// Middleware pattern
handler := loggingMiddleware(authMiddleware(mux))
```

- Use standard net/http when possible
- Implement proper middleware chain
- Handle graceful shutdown
- Set appropriate timeouts
- Use context for request-scoped values
- Implement proper CORS handling
- Add request ID for tracing
- Use HTTP/2 when beneficial

## Database Integration
- Use database/sql with appropriate driver
- Always use prepared statements
- Implement connection pooling
- Handle NULL values properly
- Use transactions appropriately
- Close rows after use
- Implement retry logic
- Monitor connection health

## API Design
- Follow RESTful principles
- Use proper HTTP methods
- Return appropriate status codes
- Version your APIs
- Implement pagination
- Use consistent response format
- Document with OpenAPI/Swagger
- Handle content negotiation

## Security Best Practices
- Validate all inputs
- Use prepared statements for SQL
- Implement authentication/authorization
- Use HTTPS in production
- Add rate limiting
- Sanitize log output
- Use crypto/rand for randomness
- Keep dependencies updated

## Testing Strategy
- Write table-driven tests
- Use subtests for organization
- Mock external dependencies
- Test edge cases
- Use testify for assertions (optional)
- Implement integration tests
- Use coverage tools
- Test concurrent code

## Performance Optimization
- Profile before optimizing
- Use benchmarks
- Minimize allocations
- Use sync.Pool for reusable objects
- Buffer I/O operations
- Use appropriate data structures
- Cache computed values
- Monitor performance metrics

## Configuration Management
- Use environment variables
- Implement config validation
- Support multiple environments
- Use viper or similar (optional)
- Document all config options
- Provide sensible defaults
- Validate at startup
- Keep secrets secure

## Logging & Monitoring
- Use structured logging
- Log at appropriate levels
- Include request context
- Avoid logging sensitive data
- Use log aggregation
- Implement metrics collection
- Set up alerts
- Use distributed tracing

## Dependency Management
- Use Go modules
- Pin dependency versions
- Regularly update dependencies
- Audit for vulnerabilities
- Minimize external dependencies
- Vendor dependencies if needed
- Document dependency choices
- Use go mod tidy regularly

## Code Quality
- Run go fmt
- Use golangci-lint
- Follow naming conventions
- Write self-documenting code
- Add comments for exported items
- Keep functions small
- Avoid deep nesting
- Use meaningful variable names

## gRPC Development
```proto
syntax = "proto3";
package api.v1;
option go_package = "github.com/user/project/api/v1;v1";

service UserService {
  rpc GetUser(GetUserRequest) returns (User);
  rpc ListUsers(ListUsersRequest) returns (ListUsersResponse);
}
```

- Define clear proto files
- Version your APIs
- Use proper error codes
- Implement interceptors
- Handle streaming properly
- Add request validation
- Document services
- Generate client SDKs

## Microservices Patterns
- Implement service discovery
- Use circuit breakers
- Add distributed tracing
- Implement health checks
- Use message queues appropriately
- Handle partial failures
- Implement idempotency
- Monitor service mesh

## Docker & Deployment
```dockerfile
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o main cmd/app/main.go

FROM alpine:latest
RUN apk --no-cache add ca-certificates
COPY --from=builder /app/main /main
CMD ["/main"]
```

- Use multi-stage builds
- Minimize image size
- Handle signals properly
- Implement health endpoints
- Use non-root user
- Configure resource limits
- Support configuration via env
- Enable graceful shutdown

## Context Usage
- Pass context as first parameter
- Use context for cancellation
- Don't store values unnecessarily
- Respect context cancellation
- Set appropriate timeouts
- Use context.Background() at top level
- Create child contexts appropriately
- Clean up resources on cancellation

## Best Practices Summary
- Write simple, readable code
- Handle errors properly
- Test thoroughly
- Document public APIs
- Profile and optimize
- Use concurrency wisely
- Keep security in mind
- Follow Go idioms