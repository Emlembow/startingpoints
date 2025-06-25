# PHP Best Practices

## Project Structure

### Directory Organization
```
project/
├── src/
│   ├── Controller/
│   ├── Model/
│   ├── Service/
│   └── Repository/
├── public/
│   └── index.php
├── config/
├── tests/
├── vendor/
├── resources/
│   ├── views/
│   └── lang/
└── migrations/
```

### Naming Conventions
- Classes: PascalCase (`UserController.php`)
- Methods: camelCase (`getUserById()`)
- Variables: camelCase (`$userName`)
- Constants: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`)
- Config files: lowercase_underscore (`database_config.php`)

## Code Organization

### Namespace Structure
```php
namespace App\Controllers;

use App\Models\User;
use App\Services\UserService;

class UserController
{
    private UserService $userService;
    
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }
}
```

### PSR Standards
- Follow PSR-4 for autoloading
- Follow PSR-12 for coding style
- Use Composer for dependency management

## Security Best Practices

### SQL Injection Prevention
```php
// Bad - Never do this
$query = "SELECT * FROM users WHERE id = " . $_GET['id'];

// Good - Use prepared statements
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = :id");
$stmt->execute(['id' => $_GET['id']]);
```

### Input Validation
```php
// Validate and sanitize input
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);

// Type declarations
function processUser(int $id, string $name): void
{
    // Process user
}
```

### XSS Prevention
```php
// Always escape output
echo htmlspecialchars($userInput, ENT_QUOTES, 'UTF-8');

// For JSON output
header('Content-Type: application/json');
echo json_encode($data);
```

## Design Patterns

### Repository Pattern
```php
interface UserRepositoryInterface
{
    public function find(int $id): ?User;
    public function save(User $user): void;
}

class UserRepository implements UserRepositoryInterface
{
    public function find(int $id): ?User
    {
        // Database logic
    }
}
```

### Service Layer
```php
class UserService
{
    private UserRepositoryInterface $repository;
    
    public function __construct(UserRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }
    
    public function createUser(array $data): User
    {
        // Business logic
        $user = new User($data);
        $this->repository->save($user);
        return $user;
    }
}
```

## Error Handling

### Exception Handling
```php
try {
    $result = $service->performAction();
} catch (ValidationException $e) {
    // Handle validation errors
    return response()->json(['error' => $e->getMessage()], 400);
} catch (Exception $e) {
    // Log error
    error_log($e->getMessage());
    return response()->json(['error' => 'Internal error'], 500);
}
```

### Custom Exceptions
```php
class ValidationException extends Exception
{
    protected array $errors;
    
    public function __construct(array $errors)
    {
        $this->errors = $errors;
        parent::__construct('Validation failed');
    }
    
    public function getErrors(): array
    {
        return $this->errors;
    }
}
```

## Performance Optimization

### Caching
```php
// Simple file caching
function getCachedData($key)
{
    $cacheFile = "cache/{$key}.cache";
    
    if (file_exists($cacheFile) && filemtime($cacheFile) > time() - 3600) {
        return unserialize(file_get_contents($cacheFile));
    }
    
    return null;
}
```

### Database Optimization
```php
// Use eager loading to prevent N+1 queries
$users = User::with('posts', 'comments')->get();

// Index frequently queried columns
// Use EXPLAIN to analyze queries
```

## Testing

### Unit Testing with PHPUnit
```php
use PHPUnit\Framework\TestCase;

class UserServiceTest extends TestCase
{
    public function testCreateUser(): void
    {
        $repository = $this->createMock(UserRepositoryInterface::class);
        $repository->expects($this->once())
                   ->method('save');
        
        $service = new UserService($repository);
        $user = $service->createUser(['name' => 'John']);
        
        $this->assertEquals('John', $user->getName());
    }
}
```

## Modern PHP Features

### Type Declarations
```php
declare(strict_types=1);

function calculateTotal(float $price, int $quantity): float
{
    return $price * $quantity;
}
```

### Null Coalescing
```php
// PHP 7.0+
$username = $_GET['user'] ?? 'guest';

// PHP 7.4+ null coalescing assignment
$config['setting'] ??= 'default';
```

### Arrow Functions
```php
// PHP 7.4+
$numbers = [1, 2, 3, 4, 5];
$squared = array_map(fn($n) => $n * $n, $numbers);
```

## Best Practices Summary

### Do's
- ✅ Use prepared statements for database queries
- ✅ Validate and sanitize all input
- ✅ Follow PSR standards
- ✅ Use dependency injection
- ✅ Write unit tests
- ✅ Use type hints and return types

### Don'ts
- ❌ Don't use `eval()` or `exec()`
- ❌ Avoid global variables
- ❌ Don't suppress errors with `@`
- ❌ Never trust user input
- ❌ Don't mix logic and presentation