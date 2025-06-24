# TypeScript Development Rules

## Type System Best Practices
- Enable strict mode in tsconfig.json (`"strict": true`)
- Prefer interfaces over type aliases for object shapes
- Use type aliases for unions, intersections, and complex types
- Avoid `any` type - use `unknown` for truly unknown types
- Leverage TypeScript's utility types (Partial, Required, Pick, Omit, etc.)
- Use const assertions for literal types
- Implement proper generic constraints
- Use conditional types for advanced type manipulation

## Naming Conventions
- **Types/Interfaces**: PascalCase (e.g., `UserProfile`, `ApiResponse`)
- **Variables/Functions**: camelCase (e.g., `getUserData`, `isLoading`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_RETRY_COUNT`)
- **Enums**: PascalCase for name, UPPER_SNAKE_CASE for values
- **Type Parameters**: Single letter (T, K, V) or descriptive (TData, TError)
- Boolean variables should start with `is`, `has`, `should`, `can`
- Prefix interfaces with 'I' only if it adds clarity (generally avoid)

## Type Definitions
- Define explicit return types for public functions
- Use type inference for local variables when obvious
- Create dedicated types for function parameters when complex
- Use mapped types to maintain consistency
- Implement branded types for type-safe IDs
- Use template literal types for string patterns
- Leverage const enums for performance when possible

## Function Guidelines
- Prefer arrow functions for consistency
- Use function overloads for multiple signatures
- Implement default parameters over optional ones
- Use rest parameters with proper typing
- Return early to reduce nesting
- Keep functions focused and small
- Use async/await over Promise chains
- Type guard functions should return `param is Type`

## Interface & Type Organization
- One interface/type per file for large definitions
- Group related types in namespace or modules
- Export types alongside their implementations
- Use index.ts for barrel exports
- Place shared types in a dedicated types directory
- Colocate component prop types with components
- Document complex types with JSDoc comments

## Null Safety & Error Handling
- Use strict null checks (`strictNullChecks: true`)
- Prefer optional chaining (?.) and nullish coalescing (??)
- Create Result<T, E> or Option<T> types for safer error handling
- Use discriminated unions for error states
- Implement custom error classes extending Error
- Use type predicates for narrowing
- Handle all possible cases in switch statements

## Generics Best Practices
- Use meaningful names for type parameters
- Apply appropriate constraints to generics
- Avoid over-genericizing - be specific when needed
- Use default type parameters when sensible
- Leverage generic inference when possible
- Create generic utility functions for reusability
- Document generic constraints clearly

## React + TypeScript
- Use `React.FC` sparingly (prefer explicit return types)
- Type event handlers properly (e.g., `React.MouseEvent<HTMLButtonElement>`)
- Use proper types for refs (`useRef<HTMLDivElement>(null)`)
- Type custom hooks return values explicitly
- Use discriminated unions for component props variants
- Leverage component prop interfaces with children
- Type context values appropriately

## Advanced Patterns
- **Builder Pattern**: For complex object construction
- **Factory Pattern**: For creating instances with proper types
- **Strategy Pattern**: Using discriminated unions
- **Repository Pattern**: With generic constraints
- **Dependency Injection**: Using interfaces
- **Decorators**: When using experimental features
- **Mixins**: For composable functionality

## Code Quality Rules
- No implicit any (`noImplicitAny: true`)
- Enable all strict checks in tsconfig
- Use ESLint with TypeScript plugins
- Run type checking in CI/CD pipeline
- Keep type coverage above 95%
- Avoid type assertions - use type guards
- Don't use @ts-ignore - fix the issue or use @ts-expect-error
- Regular dependency updates for type definitions

## Module System
- Use ES modules (import/export)
- Avoid namespace declarations in modern code
- Use path aliases for cleaner imports
- Configure module resolution properly
- Separate type imports (`import type`)
- Use dynamic imports for code splitting
- Handle circular dependencies carefully

## Testing Types
- Type test utilities and mocks properly
- Use type stubs for external dependencies
- Create test-specific types when needed
- Ensure test types match implementation
- Use partial mocks with type safety
- Type custom matchers properly
- Maintain separate test tsconfig if needed

## Performance Considerations
- Use const enums for compile-time constants
- Avoid excessive type computations
- Use type imports to reduce bundle size
- Leverage incremental compilation
- Configure skipLibCheck for faster builds
- Use Project References for large codebases
- Monitor TypeScript compilation performance

## Documentation
- Use TSDoc comments for public APIs
- Document generic constraints
- Provide examples in comments
- Document breaking changes in types
- Use @deprecated tag appropriately
- Generate documentation from types
- Keep README updated with type information