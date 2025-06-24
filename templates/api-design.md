# API Design Rules

## RESTful API Principles

### Resource-Based Design
- Use nouns for resources, not verbs
- Resources are collections or singletons
- Use plural names for collections
- Keep URLs consistent and predictable

```
GET    /users          # Get all users
GET    /users/{id}     # Get specific user
POST   /users          # Create new user
PUT    /users/{id}     # Update entire user
PATCH  /users/{id}     # Partial update
DELETE /users/{id}     # Delete user
```

### HTTP Methods
- **GET**: Retrieve resources (idempotent)
- **POST**: Create new resources
- **PUT**: Update/replace entire resource (idempotent)
- **PATCH**: Partial update (idempotent)
- **DELETE**: Remove resources (idempotent)
- **HEAD**: Get headers only
- **OPTIONS**: Get allowed methods

### Status Codes
```javascript
// Success responses
200 OK                  // Successful GET, PUT, PATCH
201 Created            // Successful POST
202 Accepted           // Accepted for processing
204 No Content         // Successful DELETE

// Client errors
400 Bad Request        // Invalid request
401 Unauthorized       // Missing/invalid auth
403 Forbidden          // Authenticated but not allowed
404 Not Found          // Resource doesn't exist
409 Conflict           // State conflict
422 Unprocessable      // Validation errors
429 Too Many Requests  // Rate limit exceeded

// Server errors
500 Internal Error     // General server error
502 Bad Gateway        // Invalid upstream response
503 Service Unavailable // Server overload/maintenance
504 Gateway Timeout    // Upstream timeout
```

## URL Structure

### Path Design
```
# Good - Resource hierarchy
/users/{userId}/posts/{postId}/comments

# Good - Filtering via query params
/users?role=admin&active=true

# Bad - Verbs in URLs
/getUsers
/deletePost

# Bad - Deep nesting (>3 levels)
/users/{id}/posts/{id}/comments/{id}/likes/{id}
```

### Query Parameters
```
# Filtering
GET /products?category=electronics&price_min=100

# Sorting
GET /products?sort=price,-created_at

# Pagination
GET /products?page=2&limit=20

# Field selection
GET /users?fields=id,name,email

# Search
GET /products?q=laptop

# Date ranges
GET /orders?created_after=2023-01-01&created_before=2023-12-31
```

## Request/Response Format

### JSON Structure
```json
// Single resource
{
  "data": {
    "id": "123",
    "type": "user",
    "attributes": {
      "name": "John Doe",
      "email": "john@example.com"
    },
    "relationships": {
      "posts": {
        "data": [
          { "id": "1", "type": "post" }
        ]
      }
    }
  }
}

// Collection
{
  "data": [
    { "id": "1", "type": "user", "attributes": {} },
    { "id": "2", "type": "user", "attributes": {} }
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "per_page": 20
  },
  "links": {
    "self": "/users?page=1",
    "next": "/users?page=2",
    "last": "/users?page=5"
  }
}
```

### Error Response Format
```json
{
  "errors": [
    {
      "id": "uuid",
      "status": "422",
      "code": "VALIDATION_ERROR",
      "title": "Validation Failed",
      "detail": "Email address is invalid",
      "source": {
        "pointer": "/data/attributes/email"
      },
      "meta": {
        "field": "email",
        "rule": "email"
      }
    }
  ]
}
```

## Authentication & Authorization

### Authentication Methods
```http
# Bearer Token (JWT)
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

# API Key
X-API-Key: your-api-key-here

# Basic Auth (avoid in production)
Authorization: Basic base64(username:password)

# OAuth 2.0
Authorization: Bearer oauth-token
```

### Security Headers
```http
# Security headers
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
Strict-Transport-Security: max-age=31536000

# CORS headers
Access-Control-Allow-Origin: https://trusted-domain.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400
```

## Versioning Strategies

### URL Versioning
```
https://api.example.com/v1/users
https://api.example.com/v2/users
```

### Header Versioning
```http
Accept: application/vnd.api+json;version=1
API-Version: 1
```

### Query Parameter Versioning
```
https://api.example.com/users?version=1
```

## Pagination

### Offset-Based
```json
{
  "data": [...],
  "pagination": {
    "total": 1000,
    "per_page": 20,
    "current_page": 5,
    "total_pages": 50,
    "links": {
      "prev": "/users?page=4&limit=20",
      "next": "/users?page=6&limit=20"
    }
  }
}
```

### Cursor-Based
```json
{
  "data": [...],
  "pagination": {
    "has_more": true,
    "cursors": {
      "before": "eyJpZCI6MTB9",
      "after": "eyJpZCI6MzB9"
    },
    "links": {
      "prev": "/users?cursor=eyJpZCI6MTB9&limit=20",
      "next": "/users?cursor=eyJpZCI6MzB9&limit=20"
    }
  }
}
```

## Rate Limiting

### Rate Limit Headers
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1619433600
X-RateLimit-Reset-After: 3600
Retry-After: 3600
```

### Rate Limit Response
```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests",
    "retry_after": 3600
  }
}
```

## Filtering & Searching

### Filter Syntax
```
# Exact match
GET /users?status=active

# Multiple values
GET /users?role=admin,moderator

# Range queries
GET /products?price[gte]=100&price[lte]=500

# Nested filtering
GET /users?address.city=London

# Complex filters (JSON)
GET /users?filter={"$and":[{"age":{"$gte":18}},{"status":"active"}]}
```

## Webhooks

### Webhook Payload
```json
{
  "id": "evt_123",
  "type": "user.created",
  "created": 1619433600,
  "data": {
    "object": {
      "id": "user_123",
      "email": "user@example.com"
    }
  }
}
```

### Webhook Security
```javascript
// HMAC signature verification
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return `sha256=${hash}` === signature;
}
```

## GraphQL Considerations

### Query Design
```graphql
query GetUser($id: ID!) {
  user(id: $id) {
    id
    name
    email
    posts(first: 10) {
      edges {
        node {
          id
          title
          content
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
```

### Error Handling
```json
{
  "data": {
    "user": null
  },
  "errors": [
    {
      "message": "User not found",
      "extensions": {
        "code": "USER_NOT_FOUND",
        "id": "123"
      },
      "path": ["user"]
    }
  ]
}
```

## API Documentation

### OpenAPI/Swagger
```yaml
openapi: 3.0.0
info:
  title: User API
  version: 1.0.0
paths:
  /users:
    get:
      summary: List users
      parameters:
        - in: query
          name: page
          schema:
            type: integer
            default: 1
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserList'
```

### API Documentation Best Practices
- Provide clear descriptions
- Include request/response examples
- Document all parameters
- Specify required vs optional
- Include error responses
- Provide authentication details
- Keep documentation updated
- Include rate limit information

## Performance & Caching

### Cache Headers
```http
# Client caching
Cache-Control: public, max-age=3600
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
Last-Modified: Wed, 21 Oct 2023 07:28:00 GMT

# Conditional requests
If-None-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"
If-Modified-Since: Wed, 21 Oct 2023 07:28:00 GMT
```

## Best Practices Summary
- Use consistent naming conventions
- Version your API properly
- Implement proper error handling
- Use appropriate HTTP methods and status codes
- Document thoroughly
- Implement security best practices
- Design for scalability
- Monitor API usage
- Provide SDKs when possible
- Follow REST constraints when applicable