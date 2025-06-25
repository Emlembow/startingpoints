# Java Best Practices

## Project Structure

### Maven Standard Layout
```
src/
├── main/
│   ├── java/
│   │   └── com/example/
│   │       ├── controller/
│   │       ├── service/
│   │       ├── repository/
│   │       └── model/
│   └── resources/
│       ├── application.properties
│       └── static/
└── test/
    ├── java/
    └── resources/
pom.xml
```

### Package by Feature
```
com/example/
├── user/
│   ├── UserController.java
│   ├── UserService.java
│   ├── UserRepository.java
│   └── User.java
└── product/
    ├── ProductController.java
    ├── ProductService.java
    └── Product.java
```

## Naming Conventions

- **Classes/Interfaces**: PascalCase (`UserService`)
- **Methods/Variables**: camelCase (`getUserById`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`)
- **Packages**: lowercase (`com.example.user`)

## Core Principles

### SOLID Principles
```java
// Single Responsibility
public class UserService {
    private final UserRepository repository;
    
    public User findById(Long id) {
        return repository.findById(id);
    }
}

// Open/Closed + Dependency Inversion
public interface PaymentProcessor {
    void processPayment(Payment payment);
}

public class CreditCardProcessor implements PaymentProcessor {
    @Override
    public void processPayment(Payment payment) {
        // Implementation
    }
}
```

### Dependency Injection
```java
@Service
public class OrderService {
    private final UserService userService;
    private final PaymentService paymentService;
    
    @Autowired
    public OrderService(UserService userService, 
                       PaymentService paymentService) {
        this.userService = userService;
        this.paymentService = paymentService;
    }
}
```

## Resource Management

### Try-with-Resources
```java
// Automatic resource management
try (FileInputStream fis = new FileInputStream("file.txt");
     BufferedReader reader = new BufferedReader(new InputStreamReader(fis))) {
    return reader.lines().collect(Collectors.toList());
} catch (IOException e) {
    log.error("Error reading file", e);
    throw new FileProcessingException("Failed to read file", e);
}
```

## Collections Best Practices

### Use Appropriate Collections
```java
// Choose the right collection
List<String> arrayList = new ArrayList<>(); // Fast random access
List<String> linkedList = new LinkedList<>(); // Fast insertion/deletion
Set<String> hashSet = new HashSet<>(); // No duplicates, fast lookup
Map<String, User> hashMap = new HashMap<>(); // Key-value pairs

// Prefer immutable collections
List<String> immutableList = List.of("a", "b", "c");
Map<String, String> immutableMap = Map.of("key", "value");
```

### Stream API
```java
// Use streams for functional operations
List<User> activeUsers = users.stream()
    .filter(User::isActive)
    .sorted(Comparator.comparing(User::getName))
    .collect(Collectors.toList());

// Parallel processing for large datasets
long count = largeList.parallelStream()
    .filter(item -> item.matches(criteria))
    .count();
```

## Error Handling

### Custom Exceptions
```java
public class BusinessException extends Exception {
    private final ErrorCode errorCode;
    
    public BusinessException(String message, ErrorCode errorCode) {
        super(message);
        this.errorCode = errorCode;
    }
}
```

### Exception Handling
```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleBusinessException(
            BusinessException e) {
        ErrorResponse error = new ErrorResponse(
            e.getErrorCode(), 
            e.getMessage()
        );
        return ResponseEntity.badRequest().body(error);
    }
}
```

## Performance Optimization

### String Operations
```java
// Use StringBuilder for concatenation
StringBuilder sb = new StringBuilder();
for (String item : items) {
    sb.append(item).append(",");
}
String result = sb.toString();

// String.format for complex formatting
String message = String.format("User %s has %d items", 
    username, itemCount);
```

### Lazy Initialization
```java
public class ExpensiveResource {
    private volatile HeavyObject instance;
    
    public HeavyObject getInstance() {
        if (instance == null) {
            synchronized (this) {
                if (instance == null) {
                    instance = new HeavyObject();
                }
            }
        }
        return instance;
    }
}
```

## Modern Java Features

### Optional
```java
public Optional<User> findUser(Long id) {
    return Optional.ofNullable(repository.findById(id));
}

// Usage
findUser(id)
    .map(User::getName)
    .orElse("Unknown User");
```

### Records (Java 14+)
```java
public record UserDTO(Long id, String name, String email) {
    // Compact constructor for validation
    public UserDTO {
        Objects.requireNonNull(name);
        Objects.requireNonNull(email);
    }
}
```

### Pattern Matching (Java 17+)
```java
public String format(Object obj) {
    return switch (obj) {
        case Integer i -> String.format("int %d", i);
        case String s -> String.format("string %s", s);
        case null -> "null";
        default -> obj.toString();
    };
}
```

## Testing

### JUnit 5
```java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    
    @Mock
    private UserRepository repository;
    
    @InjectMocks
    private UserService service;
    
    @Test
    void shouldFindUserById() {
        // Given
        User expected = new User(1L, "John");
        when(repository.findById(1L)).thenReturn(expected);
        
        // When
        User actual = service.findById(1L);
        
        // Then
        assertThat(actual).isEqualTo(expected);
    }
}
```

## Security Best Practices

### Input Validation
```java
@PostMapping("/users")
public User createUser(@Valid @RequestBody UserDTO userDTO) {
    // Validation annotations
    return userService.create(userDTO);
}

public class UserDTO {
    @NotNull
    @Size(min = 2, max = 50)
    private String name;
    
    @Email
    private String email;
}
```

## Best Practices Summary

### Do's
- ✅ Use try-with-resources
- ✅ Prefer composition over inheritance
- ✅ Use Optional for nullable returns
- ✅ Follow SOLID principles
- ✅ Write unit tests
- ✅ Use appropriate collections

### Don'ts
- ❌ Don't catch generic Exception
- ❌ Avoid mutable static state
- ❌ Don't ignore compiler warnings
- ❌ Avoid premature optimization
- ❌ Don't use raw types with generics