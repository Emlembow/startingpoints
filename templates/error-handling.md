# Error Handling Best Practices

## Error Types and Strategies

### Error Categories
- **Operational Errors**: Expected errors (network failures, invalid input)
- **Programming Errors**: Bugs in code (type errors, logic errors)
- **System Errors**: Infrastructure issues (out of memory, disk full)

## Frontend Error Handling

### Try-Catch Blocks
```javascript
async function fetchData() {
  try {
    const response = await api.getData();
    return response.data;
  } catch (error) {
    // Log error for debugging
    console.error('Data fetch failed:', error);
    
    // Handle specific error types
    if (error.code === 'NETWORK_ERROR') {
      throw new Error('Network connection failed. Please try again.');
    }
    
    // Re-throw unknown errors
    throw error;
  }
}
```

### Error Boundaries (React)
```javascript
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    // Log to error reporting service
    errorReportingService.log({ error, errorInfo });
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

### Global Error Handlers
```javascript
// Unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault();
});

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});
```

## Backend Error Handling

### Express Error Middleware
```javascript
// Custom error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

// Error handling middleware
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  
  // Log error
  logger.error({
    error: err,
    request: req.url,
    method: req.method,
  });
  
  res.status(statusCode).json({
    status: 'error',
    message: statusCode === 500 ? 'Internal server error' : message,
  });
});
```

### Async Route Handler
```javascript
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  res.json(user);
}));
```

## Validation and Input Errors

### Schema Validation
```javascript
const { body, validationResult } = require('express-validator');

const validateUser = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
```

### Frontend Validation
```javascript
function validateForm(data) {
  const errors = {};
  
  if (!data.email || !isValidEmail(data.email)) {
    errors.email = 'Valid email is required';
  }
  
  if (!data.password || data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
```

## Error Recovery Strategies

### Retry Logic
```javascript
async function fetchWithRetry(url, options = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      
      // Exponential backoff
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, i) * 1000)
      );
    }
  }
}
```

### Circuit Breaker Pattern
```javascript
class CircuitBreaker {
  constructor(fn, threshold = 5, timeout = 60000) {
    this.fn = fn;
    this.threshold = threshold;
    this.timeout = timeout;
    this.failures = 0;
    this.nextAttempt = Date.now();
  }
  
  async call(...args) {
    if (this.failures >= this.threshold) {
      if (Date.now() < this.nextAttempt) {
        throw new Error('Circuit breaker is OPEN');
      }
      this.failures = 0;
    }
    
    try {
      const result = await this.fn(...args);
      this.failures = 0;
      return result;
    } catch (error) {
      this.failures++;
      if (this.failures >= this.threshold) {
        this.nextAttempt = Date.now() + this.timeout;
      }
      throw error;
    }
  }
}
```

## User-Friendly Error Messages

### Error Message Guidelines
- Be specific but not technical
- Provide actionable solutions
- Maintain consistent tone
- Include error codes for support

### Error Display Component
```javascript
const ErrorMessage = ({ error, onRetry }) => {
  const getMessage = (error) => {
    const messages = {
      NETWORK_ERROR: 'Connection failed. Please check your internet.',
      AUTH_FAILED: 'Login failed. Please check your credentials.',
      NOT_FOUND: 'The requested resource was not found.',
      DEFAULT: 'Something went wrong. Please try again.',
    };
    
    return messages[error.code] || messages.DEFAULT;
  };
  
  return (
    <div className="error-container">
      <p>{getMessage(error)}</p>
      {onRetry && (
        <button onClick={onRetry}>Try Again</button>
      )}
    </div>
  );
};
```

## Logging and Monitoring

### Structured Logging
```javascript
const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// Log with context
logger.error('Database query failed', {
  query: 'SELECT * FROM users',
  error: error.message,
  stack: error.stack,
  userId: req.user?.id,
  timestamp: new Date().toISOString(),
});
```

### Error Tracking Services
```javascript
// Sentry integration
Sentry.init({ dsn: process.env.SENTRY_DSN });

// Capture exceptions
try {
  riskyOperation();
} catch (error) {
  Sentry.captureException(error, {
    tags: { section: 'payment' },
    extra: { orderId: order.id },
  });
}
```

## Best Practices Summary

### Do's
- ✅ Handle errors at appropriate levels
- ✅ Provide meaningful error messages
- ✅ Log errors with context
- ✅ Implement retry mechanisms
- ✅ Use error boundaries in React
- ✅ Validate input early

### Don'ts
- ❌ Don't expose sensitive information
- ❌ Avoid catching errors without handling
- ❌ Don't use generic error messages
- ❌ Avoid infinite retry loops
- ❌ Don't ignore error logs