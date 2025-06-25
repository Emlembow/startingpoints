# Spring Boot Best Practices

## Project Structure

### Layered Architecture
```
src/main/java/com/example/app/
├── controller/     # REST endpoints
├── service/        # Business logic
├── repository/     # Data access
├── model/
│   ├── dto/       # Data transfer objects
│   └── entity/    # JPA entities
├── config/        # Configuration
├── exception/     # Custom exceptions
└── security/      # Security config
```

## Configuration

### Application Properties
```yaml
# application.yml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/mydb
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
  
server:
  port: ${SERVER_PORT:8080}
  
app:
  jwt:
    secret: ${JWT_SECRET}
    expiration: 86400
```

## REST Controllers

```java
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Validated
public class UserController {
    
    private final UserService userService;
    
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findById(id));
    }
    
    @PostMapping
    public ResponseEntity<UserDto> createUser(
            @Valid @RequestBody CreateUserRequest request) {
        UserDto user = userService.create(request);
        URI location = URI.create("/api/v1/users/" + user.getId());
        return ResponseEntity.created(location).body(user);
    }
}
```

## Service Layer

```java
@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    
    @Transactional(readOnly = true)
    public UserDto findById(Long id) {
        return userRepository.findById(id)
            .map(userMapper::toDto)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
```

## Data Access

### JPA Entity
```java
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
}
```

### Repository
```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    @Query("SELECT u FROM User u WHERE u.status = :status")
    Page<User> findByStatus(@Param("status") Status status, Pageable pageable);
}
```

## Validation

```java
@Data
public class CreateUserRequest {
    
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100)
    private String name;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
    
    @NotBlank
    @Size(min = 8)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$",
             message = "Password must contain uppercase, lowercase, and digit")
    private String password;
}
```

## Exception Handling

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(
            ResourceNotFoundException ex) {
        return ResponseEntity.status(NOT_FOUND)
            .body(ErrorResponse.of(NOT_FOUND, ex.getMessage()));
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = ex.getBindingResult()
            .getFieldErrors().stream()
            .collect(Collectors.toMap(
                FieldError::getField,
                FieldError::getDefaultMessage
            ));
        
        return ResponseEntity.badRequest()
            .body(ErrorResponse.of(BAD_REQUEST, "Validation failed", errors));
    }
}
```

## Security

```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    
    private final JwtAuthenticationFilter jwtAuthFilter;
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(session -> 
                session.sessionCreationPolicy(STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/auth/**").permitAll()
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }
}
```

## Testing

### Unit Test
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
        User user = User.builder().id(1L).name("John").build();
        when(repository.findById(1L)).thenReturn(Optional.of(user));
        
        // When
        UserDto result = service.findById(1L);
        
        // Then
        assertThat(result.getName()).isEqualTo("John");
    }
}
```

### Integration Test
```java
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class UserControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Test
    void shouldCreateUser() throws Exception {
        String json = """
            {
                "name": "John Doe",
                "email": "john@example.com",
                "password": "SecurePass123"
            }
            """;
            
        mockMvc.perform(post("/api/v1/users")
                .contentType(APPLICATION_JSON)
                .content(json))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.email").value("john@example.com"));
    }
}
```

## Best Practices

### Do's
- ✅ Use constructor injection
- ✅ Keep controllers thin
- ✅ Use DTOs for data transfer
- ✅ Implement proper validation
- ✅ Handle exceptions globally
- ✅ Use transactions appropriately
- ✅ Follow REST conventions
- ✅ Write comprehensive tests

### Don'ts
- ❌ Don't expose entities directly
- ❌ Avoid business logic in controllers
- ❌ Don't use field injection
- ❌ Avoid hardcoded values
- ❌ Don't ignore security
- ❌ Avoid tight coupling

### Performance Tips
- Use lazy loading carefully
- Implement pagination
- Cache frequently accessed data
- Use database indexes
- Monitor N+1 queries
- Use projection for read-only data