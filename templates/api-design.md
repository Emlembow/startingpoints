# API Design Rules

## RESTful Principles

### Resource Design
- Use nouns for resources, not verbs
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

### HTTP Status Codes
```javascript
// Success
200 OK              // GET, PUT, PATCH success
201 Created         // POST success
204 No Content      // DELETE success

// Client errors
400 Bad Request     // Invalid request
401 Unauthorized    // Missing/invalid auth
403 Forbidden       // Not allowed
404 Not Found       // Resource missing
422 Unprocessable   // Validation errors

// Server errors
500 Internal Error  // Server error
503 Unavailable     // Overload/maintenance
```

## Request/Response Format

### Standard Response Structure
```json
{
  "data": {
    "id": "123",
    "type": "user",
    "attributes": {
      "name": "John Doe",
      "email": "john@example.com"
    }
  },
  "meta": {
    "timestamp": "2023-01-01T00:00:00Z"
  }
}
```

### Error Response
```json
{
  "errors": [{
    "status": "422",
    "code": "VALIDATION_ERROR",
    "title": "Validation Failed",
    "detail": "Email is invalid",
    "source": { "pointer": "/data/attributes/email" }
  }]
}
```

## Authentication

### Common Methods
```http
# Bearer Token
Authorization: Bearer <token>

# API Key
X-API-Key: <api-key>
```

### Essential Security Headers
```http
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Strict-Transport-Security: max-age=31536000
```

## Versioning

### URL Versioning (Recommended)
```
https://api.example.com/v1/users
```

### Header Versioning
```http
Accept: application/vnd.api+json;version=1
```

## Pagination

### Offset-based
```
GET /users?page=2&limit=20

{
  "data": [...],
  "meta": {
    "page": 2,
    "limit": 20,
    "total": 100
  },
  "links": {
    "prev": "/users?page=1&limit=20",
    "next": "/users?page=3&limit=20"
  }
}
```

### Cursor-based
```
GET /users?cursor=eyJpZCI6MTB9&limit=20
```

## Best Practices

### Query Parameters
- Filtering: `GET /users?status=active`
- Sorting: `GET /users?sort=-created_at,name`
- Field selection: `GET /users?fields=id,name,email`
- Search: `GET /users?q=john`

### Performance
- Implement caching with ETags
- Use compression (gzip)
- Limit response payload size
- Support partial responses

### Documentation
- Use OpenAPI/Swagger specification
- Provide interactive API explorer
- Include authentication examples
- Show request/response samples

### Rate Limiting
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

### CORS Configuration
```http
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

## GraphQL Alternative

### When to Use GraphQL
- Complex data relationships
- Mobile apps needing minimal data
- Multiple frontend clients
- Rapid frontend iteration

### Basic GraphQL Query
```graphql
query GetUser($id: ID!) {
  user(id: $id) {
    id
    name
    posts {
      title
    }
  }
}
```

## Key Principles

1. **Consistency**: Same patterns across all endpoints
2. **Predictability**: Intuitive URL structure
3. **Flexibility**: Support filtering, sorting, pagination
4. **Security**: Always authenticate and validate
5. **Performance**: Cache aggressively, paginate
6. **Documentation**: Keep it current and complete
7. **Versioning**: Plan for breaking changes
8. **Error Handling**: Consistent error format