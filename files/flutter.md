# Flutter Development Rules

## Project Architecture
```
lib/
├── core/
│   ├── constants/       # App-wide constants
│   ├── errors/          # Error handling
│   ├── network/         # API clients
│   ├── theme/           # App themes
│   ├── utils/           # Utilities
│   └── widgets/         # Shared widgets
├── features/
│   └── feature_name/
│       ├── data/
│       │   ├── datasources/
│       │   ├── models/
│       │   └── repositories/
│       ├── domain/
│       │   ├── entities/
│       │   ├── repositories/
│       │   └── usecases/
│       └── presentation/
│           ├── bloc/
│           ├── pages/
│           └── widgets/
├── injection.dart       # Dependency injection
└── main.dart
```

## Clean Architecture Principles
- Separate presentation, domain, and data layers
- Domain layer should be independent
- Use dependency injection (GetIt)
- Follow dependency rule (outer depends on inner)
- Implement repository pattern
- Use use cases for business logic
- Keep frameworks at the boundaries
- Test each layer independently

## State Management (BLoC)
- Use BLoC pattern for complex state
- Implement proper event-state mapping
- Keep BLoCs focused and single-purpose
- Use Cubits for simpler state
- Proper stream management
- Implement proper error states
- Use BlocBuilder, BlocListener appropriately
- Test BLoCs thoroughly

## Widget Best Practices
- Prefer const constructors
- Keep widgets small and focused
- Use proper widget composition
- Implement proper keys for lists
- Separate presentational and container widgets
- Use StatelessWidget when possible
- Extract reusable widgets
- Follow single responsibility principle

## Performance Optimization
- Use const widgets whenever possible
- Implement proper list optimizations (ListView.builder)
- Lazy load images and data
- Use RepaintBoundary for complex widgets
- Profile with Flutter DevTools
- Minimize widget rebuilds
- Use ValueListenableBuilder for simple state
- Optimize asset sizes

## Responsive Design
- Use MediaQuery responsibly
- Implement LayoutBuilder for adaptive layouts
- Support multiple screen sizes
- Handle orientation changes
- Use Flex widgets appropriately
- Test on various devices
- Implement platform-specific UI
- Use proper constraints

## Navigation & Routing
- Use declarative routing (GoRouter)
- Implement proper deep linking
- Handle navigation state properly
- Use named routes
- Implement route guards
- Handle back button properly
- Test navigation flows
- Document route structure

## Async Operations
- Use FutureBuilder for one-time async
- Use StreamBuilder for continuous data
- Handle loading states properly
- Implement error handling
- Show appropriate UI feedback
- Cancel operations when disposed
- Use proper timeout handling
- Test async flows

## Error Handling
- Implement global error handling
- Use try-catch appropriately
- Show user-friendly error messages
- Log errors for debugging
- Implement retry mechanisms
- Handle network errors
- Use error boundaries
- Test error scenarios

## Forms & Validation
- Use Form widget with validation
- Implement TextEditingController properly
- Dispose controllers in dispose()
- Use FocusNode for focus management
- Implement proper validation
- Show inline error messages
- Handle form submission states
- Test form interactions

## Testing Strategy
- Write unit tests for business logic
- Widget tests for UI components
- Integration tests for user flows
- Use mockito for mocking
- Test edge cases
- Maintain >80% coverage
- Use golden tests for UI
- Automate testing in CI/CD

## Platform Integration
- Use platform channels carefully
- Handle platform differences
- Test on both iOS and Android
- Use conditional imports
- Implement proper permissions
- Handle platform-specific features
- Document platform limitations
- Test platform-specific code

## Localization (i18n)
- Use Flutter's intl package
- Extract all strings
- Support RTL languages
- Handle date/time formatting
- Support multiple locales
- Test all translations
- Use ARB files
- Implement fallback locales

## Asset Management
- Organize assets by type
- Use proper image formats
- Implement image caching
- Optimize asset sizes
- Use SVGs when appropriate
- Handle different resolutions
- Lazy load assets
- Document asset usage

## Dependency Management
- Use dependency injection
- Keep dependencies minimal
- Update dependencies regularly
- Use version constraints
- Document why each dependency
- Avoid transitive dependencies
- Test after updates
- Monitor security advisories

## Code Style
- Follow Dart style guide
- Use effective dart lints
- Configure analysis_options.yaml
- Use consistent naming
- Format with dart format
- Document public APIs
- Use meaningful variable names
- Keep lines under 80 characters

## Build & Release
- Configure flavors for environments
- Use proper versioning
- Implement CI/CD pipeline
- Automate builds
- Sign releases properly
- Obfuscate release builds
- Monitor app size
- Test release builds

## Debugging Tools
- Use Flutter Inspector
- Profile with DevTools
- Use print debugging sparingly
- Implement proper logging
- Use breakpoints effectively
- Monitor memory usage
- Track performance metrics
- Debug layout issues

## Security Best Practices
- Store sensitive data securely
- Use HTTPS for API calls
- Implement certificate pinning
- Validate inputs
- Obfuscate code
- Secure local storage
- Handle permissions properly
- Regular security audits

## Best Practices Summary
- Follow Flutter style guide
- Write testable code
- Keep widgets simple
- Optimize performance
- Handle errors gracefully
- Support multiple platforms
- Document thoroughly
- Stay updated with Flutter changes