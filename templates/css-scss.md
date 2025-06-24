# CSS/SCSS Development Rules

## File Organization
```
styles/
├── abstracts/
│   ├── _variables.scss   # Variables
│   ├── _mixins.scss      # Mixins
│   ├── _functions.scss   # Functions
│   └── _breakpoints.scss # Breakpoints
├── base/
│   ├── _reset.scss       # Reset/normalize
│   ├── _typography.scss  # Typography rules
│   └── _base.scss        # Base styles
├── components/
│   ├── _buttons.scss     # Button styles
│   ├── _cards.scss       # Card components
│   └── _forms.scss       # Form styles
├── layout/
│   ├── _header.scss      # Header styles
│   ├── _footer.scss      # Footer styles
│   └── _grid.scss        # Grid system
├── pages/
│   └── _home.scss        # Page-specific
├── themes/
│   └── _dark.scss        # Theme variations
├── vendors/
│   └── _bootstrap.scss   # Third-party
└── main.scss             # Main entry point
```

## CSS Architecture

### BEM Methodology
```scss
// Block
.card { }

// Element
.card__title { }
.card__content { }

// Modifier
.card--featured { }
.card__title--large { }
```

### ITCSS Architecture
- Settings: Variables and configs
- Tools: Mixins and functions
- Generic: Reset and normalize
- Elements: HTML elements
- Objects: Design patterns
- Components: UI components
- Utilities: Helper classes

## SCSS Best Practices

### Variables
```scss
// Colors
$color-primary: #007bff;
$color-secondary: #6c757d;
$color-danger: #dc3545;

// Spacing
$spacing-unit: 8px;
$spacing-xs: $spacing-unit;
$spacing-sm: $spacing-unit * 2;
$spacing-md: $spacing-unit * 3;

// Typography
$font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
$font-size-base: 16px;
$line-height-base: 1.5;
```

### Mixins
```scss
@mixin button-variant($bg-color, $text-color: white) {
  background-color: $bg-color;
  color: $text-color;
  
  &:hover {
    background-color: darken($bg-color, 10%);
  }
}

@mixin breakpoint($name) {
  @if map-has-key($breakpoints, $name) {
    @media #{inspect(map-get($breakpoints, $name))} {
      @content;
    }
  }
}
```

### Nesting
- Limit nesting to 3 levels maximum
- Use nesting for pseudo-selectors and states
- Avoid over-nesting that creates specificity issues

```scss
.nav {
  display: flex;
  
  &__item {
    padding: 10px;
    
    &:hover {
      background-color: $color-hover;
    }
    
    &--active {
      font-weight: bold;
    }
  }
}
```

## Responsive Design

### Mobile-First Approach
```scss
.container {
  width: 100%;
  padding: 15px;
  
  @include breakpoint(sm) {
    max-width: 540px;
  }
  
  @include breakpoint(md) {
    max-width: 720px;
  }
  
  @include breakpoint(lg) {
    max-width: 960px;
  }
}
```

### Breakpoint Management
```scss
$breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px
);
```

## Performance Optimization

### Critical CSS
- Inline critical above-the-fold styles
- Lazy load non-critical CSS
- Minimize render-blocking resources

### CSS Optimization
- Remove unused CSS
- Minimize CSS files
- Use CSS containment
- Optimize selector performance
- Avoid expensive properties

## Modern CSS Features

### CSS Custom Properties
```css
:root {
  --color-primary: #007bff;
  --spacing-unit: 8px;
  --font-family: system-ui, sans-serif;
}

.button {
  background-color: var(--color-primary);
  padding: var(--spacing-unit);
}
```

### CSS Grid
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
```

### Flexbox
```css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
```

## Animation & Transitions

### Performance-Friendly Animations
```scss
.element {
  transition: transform 0.3s ease, opacity 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    opacity: 0.9;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## Accessibility

### Focus Styles
```scss
:focus {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.button:focus:not(:focus-visible) {
  outline: none;
}
```

### Color Contrast
- Ensure WCAG AA compliance (4.5:1 for normal text)
- Use tools to verify contrast ratios
- Provide alternative indicators beyond color

### Reduced Motion
```scss
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## CSS Reset/Normalize

### Modern Reset
```css
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 100%;
  -webkit-text-size-adjust: 100%;
}

body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}
```

## Utility Classes

### Spacing Utilities
```scss
@each $size, $value in $spacing-values {
  .m-#{$size} { margin: $value; }
  .mt-#{$size} { margin-top: $value; }
  .mr-#{$size} { margin-right: $value; }
  .mb-#{$size} { margin-bottom: $value; }
  .ml-#{$size} { margin-left: $value; }
  
  .p-#{$size} { padding: $value; }
  // ... similar for padding
}
```

## Dark Mode Support

### CSS Custom Properties Approach
```css
:root {
  --color-bg: white;
  --color-text: black;
}

[data-theme="dark"] {
  --color-bg: black;
  --color-text: white;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
}
```

### Media Query Approach
```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: black;
    --color-text: white;
  }
}
```

## Best Practices Summary
- Use consistent naming conventions
- Keep specificity low
- Avoid !important
- Write maintainable code
- Document complex styles
- Use CSS methodologies
- Optimize for performance
- Ensure accessibility
- Test across browsers
- Use modern CSS features wisely