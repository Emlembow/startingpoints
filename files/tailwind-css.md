# Tailwind CSS Development Rules

## Configuration & Setup
- Configure content paths properly in `tailwind.config.js`
- Extend theme instead of replacing defaults
- Use CSS variables for dynamic theming
- Configure proper purge/content for production builds
- Set up PostCSS with autoprefixer
- Use @tailwind directives in main CSS file
- Configure custom breakpoints thoughtfully
- Set up proper IDE intellisense support

## Utility-First Principles
- Prefer utility classes over custom CSS
- Use @apply sparingly - only for repeated patterns
- Avoid premature abstraction into components
- Keep utility classes in template files
- Use arbitrary values [size] only when necessary
- Leverage Tailwind's modifier system
- Compose utilities for complex designs
- Maintain readability with logical grouping

## Responsive Design
- Use mobile-first approach (unprefixed, then sm:, md:, lg:, xl:)
- Define breakpoints based on content, not devices
- Use container with responsive padding
- Implement responsive typography scales
- Handle images responsively with aspect-ratio
- Use responsive grid and flexbox layouts
- Test across all defined breakpoints
- Consider using container queries when supported

## Color System
- Use semantic color naming (primary, secondary, danger, etc.)
- Leverage Tailwind's color palette
- Implement proper color contrast for accessibility
- Use color opacity modifiers (bg-blue-500/50)
- Create consistent hover/focus states
- Implement dark mode with dark: modifier
- Use CSS variables for dynamic themes
- Maintain WCAG color contrast standards

## Typography
- Use Tailwind's typography scale consistently
- Implement responsive font sizes
- Set proper line heights for readability
- Use font weight utilities appropriately
- Configure custom fonts in extend.fontFamily
- Apply prose class for content-heavy sections
- Use text utilities for alignment and decoration
- Implement proper text contrast ratios

## Spacing & Layout
- Use Tailwind's spacing scale consistently
- Prefer padding over margin for component internals
- Use negative margins sparingly
- Implement consistent spacing patterns
- Use space-x/y utilities for child element spacing
- Leverage gap utilities in flex/grid containers
- Use divide utilities for borders between elements
- Maintain vertical rhythm throughout

## Flexbox & Grid
- Use flex utilities for one-dimensional layouts
- Use grid for two-dimensional layouts
- Implement proper alignment with justify/items/content
- Use flex-wrap for responsive layouts
- Leverage grid template areas for complex layouts
- Use auto-fit/auto-fill for responsive grids
- Implement proper gap spacing
- Consider CSS Grid for card layouts

## Component Patterns
- Create consistent button variants
- Implement card components with proper shadows
- Use ring utilities for focus states
- Create reusable form input styles
- Implement modal/dialog patterns
- Use group hover for interactive elements
- Create loading states with animation utilities
- Build navigation with proper active states

## State Variants
- Use hover: for mouse interactions
- Implement focus: for keyboard navigation
- Use active: for click states
- Leverage disabled: for inactive elements
- Implement group-hover: for parent interactions
- Use peer modifiers for sibling styling
- Handle checked: states for checkboxes/radios
- Implement visited: for links appropriately

## Dark Mode
- Design with dark mode in mind from start
- Use dark: modifier for dark mode styles
- Implement proper color contrast in dark mode
- Consider using class-based dark mode
- Test all components in both modes
- Use semantic colors that work in both modes
- Handle images and icons for dark mode
- Implement smooth transitions between modes

## Animations & Transitions
- Use transition utilities for smooth interactions
- Implement animation utilities appropriately
- Create custom animations in config when needed
- Use transform utilities for movement
- Implement proper easing functions
- Consider reduced motion preferences
- Use animation delays sparingly
- Keep animations performant

## Forms & Inputs
- Style form elements consistently
- Use ring utilities for focus indicators
- Implement proper error states
- Create consistent input sizes
- Style select elements appropriately
- Handle placeholder styling
- Implement proper label positioning
- Use peer utilities for validation states

## Performance Optimization
- Configure PurgeCSS/JIT properly
- Avoid generating unused utilities
- Use production builds for deployment
- Monitor CSS bundle size
- Implement critical CSS when needed
- Use CDN for faster delivery
- Minimize custom CSS additions
- Leverage browser caching

## Accessibility
- Ensure proper color contrast ratios
- Use semantic HTML with utilities
- Implement focus-visible states
- Provide sr-only text when needed
- Test with keyboard navigation
- Use ARIA attributes when necessary
- Implement proper heading hierarchy
- Consider screen reader users

## Best Practices
- Group utilities logically (layout, typography, colors)
- Use consistent ordering of utilities
- Extract components for truly reusable patterns
- Comment complex utility combinations
- Use Prettier plugin for class sorting
- Maintain consistent naming conventions
- Document custom utilities and plugins
- Keep configuration changes minimal

## Component Libraries
- Integrate with shadcn/ui components
- Customize component library themes
- Override default styles carefully
- Maintain design system consistency
- Use CVA for component variants
- Implement proper component APIs
- Document component usage
- Test components across browsers