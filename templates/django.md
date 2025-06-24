# Django Development Rules

## Project Structure
```
project/
├── project_name/        # Main project directory
│   ├── __init__.py
│   ├── settings/        # Environment-specific settings
│   │   ├── base.py
│   │   ├── development.py
│   │   ├── production.py
│   │   └── testing.py
│   ├── urls.py          # Root URL configuration
│   ├── wsgi.py
│   └── asgi.py
├── apps/                # Django apps
│   ├── users/
│   ├── products/
│   └── orders/
├── static/              # Static files
├── media/               # User uploads
├── templates/           # Global templates
├── requirements/
│   ├── base.txt
│   ├── development.txt
│   └── production.txt
├── manage.py
└── README.md
```

## Django App Structure
```
app_name/
├── __init__.py
├── admin.py             # Admin interface
├── apps.py              # App configuration
├── forms.py             # Forms
├── managers.py          # Custom model managers
├── middleware.py        # App-specific middleware
├── models.py            # Database models
├── serializers.py       # DRF serializers
├── signals.py           # Signal handlers
├── urls.py              # URL patterns
├── views.py             # Views
├── tasks.py             # Celery tasks
├── tests/
│   ├── __init__.py
│   ├── test_models.py
│   ├── test_views.py
│   └── test_forms.py
├── templates/
│   └── app_name/
├── static/
│   └── app_name/
└── migrations/
```

## Models Best Practices
- Follow Django's naming conventions (singular model names)
- Use Django's built-in field types appropriately
- Implement `__str__` method for all models
- Use `verbose_name` and `verbose_name_plural` in Meta
- Create custom model managers for complex queries
- Use `select_related()` and `prefetch_related()` for optimization
- Implement model validation with `clean()` method
- Use database indexes on frequently queried fields

## Views Architecture
- Use Class-Based Views (CBVs) for standard CRUD operations
- Use Function-Based Views (FBVs) for simple, custom logic
- Keep views thin - delegate business logic to models/services
- Use Django's generic views when appropriate
- Implement proper permission checks with mixins
- Handle exceptions gracefully
- Use Django's shortcuts (get_object_or_404, etc.)
- Return appropriate HTTP status codes

## Forms & Validation
- Use ModelForm for model-based forms
- Implement custom validation in clean_<field>() methods
- Use formsets for multiple related objects
- Create reusable form mixins
- Validate data at both form and model level
- Use Django's built-in validators
- Implement CSRF protection (enabled by default)
- Handle file uploads securely

## URL Configuration
- Use namespace for app URLs
- Follow RESTful URL patterns
- Use path converters (<int:pk>, <slug:slug>)
- Keep URL patterns readable and maintainable
- Use include() for app-specific URLs
- Document complex URL patterns
- Implement URL reversing with reverse()
- Use named URL patterns

## Templates & Frontend
- Use template inheritance with extends and blocks
- Keep business logic out of templates
- Use Django's built-in template tags and filters
- Create custom template tags when needed
- Organize templates by app
- Use static template tag for static files
- Implement template fragment caching
- Follow DRY principle in templates

## Django REST Framework
- Use ViewSets for standard API endpoints
- Implement proper serializer validation
- Use pagination for list endpoints
- Implement filtering, searching, and ordering
- Use appropriate permission classes
- Version your APIs properly
- Document APIs with drf-spectacular/drf-yasg
- Handle nested relationships efficiently

## Authentication & Permissions
- Use Django's built-in User model or extend it properly
- Implement custom authentication backends when needed
- Use Django's permission system
- Create custom permission classes
- Implement proper session management
- Use Django's password validators
- Handle social authentication with django-allauth
- Implement two-factor authentication when needed

## Middleware Development
- Keep middleware focused and lightweight
- Order middleware correctly in settings
- Handle exceptions in middleware
- Use process_request/process_response appropriately
- Implement caching middleware
- Add security headers via middleware
- Create request/response logging middleware
- Test middleware thoroughly

## Database & ORM
- Use migrations for all database changes
- Never edit migrations after applying
- Use atomic transactions appropriately
- Implement database routing for multiple databases
- Optimize queries with select_related/prefetch_related
- Use Q objects for complex queries
- Implement custom lookups when needed
- Monitor slow queries with django-debug-toolbar

## Settings Management
- Split settings by environment
- Use environment variables for secrets
- Never commit sensitive data
- Use django-environ for environment management
- Configure proper ALLOWED_HOSTS
- Set up proper static/media file handling
- Configure logging appropriately
- Use Django's security settings

## Caching Strategy
- Use Django's cache framework
- Implement view caching with cache_page
- Use template fragment caching
- Cache expensive queries with cache.get/set
- Configure Redis or Memcached backend
- Implement cache invalidation strategy
- Use conditional caching with ETags
- Monitor cache hit rates

## Celery & Background Tasks
- Use Celery for asynchronous tasks
- Configure proper task queues
- Implement task retry logic
- Handle task failures gracefully
- Use periodic tasks with celery beat
- Monitor task execution
- Implement task result backend
- Keep tasks idempotent

## Testing Best Practices
- Use Django's TestCase classes
- Create fixtures with factory_boy
- Test views, models, and forms separately
- Use Django's test client
- Mock external services
- Test permissions and authentication
- Implement integration tests
- Aim for high test coverage

## Security Implementation
- Enable and use CSRF protection
- Implement proper XSS prevention
- Use Django's SQL injection protection
- Configure secure headers
- Use HTTPS in production
- Implement rate limiting
- Validate file uploads
- Follow OWASP guidelines

## Performance Optimization
- Use database indexing strategically
- Implement query optimization
- Use caching at multiple levels
- Optimize static file serving
- Implement database connection pooling
- Use CDN for static assets
- Profile with django-debug-toolbar
- Monitor with django-silk

## Admin Interface
- Customize admin for better UX
- Implement admin actions
- Use inline models appropriately
- Override admin templates when needed
- Implement custom filters
- Add search functionality
- Use readonly_fields for computed values
- Secure admin with additional authentication

## Deployment & DevOps
- Use gunicorn/uwsgi with nginx
- Configure proper logging
- Implement health checks
- Use whitenoise for static files
- Set up proper database backups
- Implement monitoring and alerting
- Use Docker for containerization
- Implement CI/CD pipelines

## Django Best Practices
- Follow "Fat models, thin views" principle
- Use Django's built-in features first
- Don't repeat yourself (DRY)
- Keep apps focused and reusable
- Write documentation
- Follow PEP 8 and Django coding style
- Use type hints where appropriate
- Contribute back to the community