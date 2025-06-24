# Laravel Development Rules

## Project Structure
```
app/
├── Console/          # Artisan commands
├── Exceptions/       # Exception handlers
├── Http/
│   ├── Controllers/  # HTTP controllers
│   ├── Middleware/   # HTTP middleware
│   └── Requests/     # Form requests
├── Models/           # Eloquent models
├── Providers/        # Service providers
├── Services/         # Business logic
└── View/             # View composers
database/
├── factories/        # Model factories
├── migrations/       # Database migrations
└── seeders/          # Database seeders
resources/
├── css/              # CSS files
├── js/               # JavaScript files
├── lang/             # Language files
└── views/            # Blade templates
routes/
├── api.php           # API routes
├── channels.php      # Broadcast channels
├── console.php       # Console routes
└── web.php           # Web routes
```

## Laravel Best Practices
- Use latest stable Laravel version
- Follow PSR-12 coding standards
- Use strict typing: `declare(strict_types=1);`
- Leverage Laravel's built-in features
- Follow naming conventions consistently
- Use service container for dependency injection
- Implement repository pattern when appropriate
- Keep controllers thin, models thick

## Eloquent ORM
- Use Eloquent relationships properly
- Implement model scopes for reusable queries
- Use mass assignment protection
- Implement model events and observers
- Use eager loading to prevent N+1 queries
- Create model factories for testing
- Use database transactions for data integrity
- Index frequently queried columns

## Database & Migrations
- Use migrations for all schema changes
- Never edit existing migrations
- Use foreign key constraints
- Implement proper indexes
- Use database seeders for test data
- Follow naming conventions for tables/columns
- Use timestamps() for created_at/updated_at
- Backup database before migrations

## Controllers
- Keep controllers focused on HTTP
- Use resource controllers for CRUD
- Implement form requests for validation
- Use dependency injection
- Return consistent responses
- Handle exceptions properly
- Use middleware for cross-cutting concerns
- Keep business logic in services

## Routing
- Use resource routing for CRUD operations
- Group related routes
- Use route model binding
- Implement route caching in production
- Use named routes
- Apply middleware to route groups
- Version API routes
- Document complex routes

## Validation
- Use Form Request classes
- Implement custom validation rules
- Return meaningful error messages
- Validate at multiple levels
- Use Laravel's validation rules
- Handle validation errors gracefully
- Implement API validation responses
- Test validation thoroughly

## Authentication & Authorization
- Use Laravel's built-in authentication
- Implement policies for authorization
- Use gates for simple checks
- Secure routes with middleware
- Implement API authentication (Sanctum/Passport)
- Use guards for multi-auth
- Hash passwords properly
- Implement password reset functionality

## Security Best Practices
- Always validate and sanitize input
- Use CSRF protection
- Implement rate limiting
- Use prepared statements (Eloquent does this)
- Store sensitive data in .env
- Use HTTPS in production
- Implement security headers
- Regular security audits

## API Development
- Version your APIs (/api/v1/)
- Use API Resources for responses
- Implement consistent error handling
- Use proper HTTP status codes
- Document with OpenAPI/Swagger
- Implement rate limiting
- Use pagination for lists
- Handle CORS properly

## Blade Templates
- Use layouts and components
- Leverage Blade directives
- Escape output with {{ }}
- Use {!! !!} carefully for raw HTML
- Implement view composers
- Cache compiled views
- Use slots for flexible components
- Keep logic minimal in views

## Queues & Jobs
- Use queues for time-consuming tasks
- Implement job retry logic
- Handle failed jobs properly
- Monitor queue health
- Use appropriate queue drivers
- Implement job batching
- Set proper timeouts
- Log job execution

## Events & Listeners
- Decouple code with events
- Use event subscribers for multiple listeners
- Queue listeners when possible
- Document event payloads
- Test event dispatching
- Use model events appropriately
- Implement event sourcing if needed
- Monitor event execution

## Caching
- Cache expensive queries
- Use cache tags for invalidation
- Implement view caching
- Cache API responses
- Use Redis for caching
- Set appropriate TTLs
- Clear cache after deployments
- Monitor cache hit rates

## Testing
- Write feature tests for endpoints
- Unit test services and models
- Use factories for test data
- Test validation rules
- Mock external services
- Use database transactions in tests
- Aim for high test coverage
- Run tests in CI/CD

## Performance Optimization
- Use eager loading to prevent N+1
- Implement database indexing
- Cache frequently accessed data
- Optimize assets with Mix/Vite
- Use CDN for static assets
- Implement HTTP caching
- Profile with Laravel Debugbar
- Monitor with Laravel Telescope

## Error Handling
- Use custom exception classes
- Implement global exception handler
- Log errors appropriately
- Return user-friendly error messages
- Handle 404s gracefully
- Implement error monitoring
- Use try-catch for expected errors
- Document error codes

## Packages & Dependencies
- Keep dependencies updated
- Use well-maintained packages
- Check package licenses
- Avoid too many dependencies
- Document package usage
- Test after updates
- Use Composer scripts
- Lock dependency versions

## Deployment
- Use environment variables
- Cache configuration in production
- Optimize autoloader
- Enable OPcache
- Use deployment scripts
- Implement zero-downtime deployments
- Monitor application health
- Backup before deployments

## TALL Stack Specific
- Create reusable Livewire components
- Use Alpine.js for simple interactions
- Optimize Livewire for performance
- Implement real-time validation
- Use Tailwind utility classes
- Keep components focused
- Test Livewire components
- Document component APIs

## Laravel Best Practices Summary
- Follow Laravel conventions
- Write clean, maintainable code
- Test thoroughly
- Optimize for performance
- Secure your application
- Document your code
- Keep learning new features
- Contribute to the community