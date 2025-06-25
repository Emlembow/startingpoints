# CSS/SCSS Development Rules

## File Organization
```
styles/
├── abstracts/     # Variables, mixins, functions
├── base/          # Reset, typography, base styles
├── components/    # UI components
├── layout/        # Layout components
├── pages/         # Page-specific styles
├── themes/        # Theme variations
├── vendors/       # Third-party styles
└── main.scss      # Entry point
```

## CSS Architecture

### BEM Methodology
```scss
.card { }              // Block
.card__title { }       // Element
.card--featured { }    // Modifier
```

### ITCSS Layers
1. Settings → 2. Tools → 3. Generic → 4. Elements → 5. Objects → 6. Components → 7. Utilities

## SCSS Best Practices

### Variables
```scss
// Design tokens
$color-primary: #007bff;
$spacing-unit: 8px;
$font-family-base: system-ui, sans-serif;
$font-size-base: 16px;
$breakpoint-md: 768px;
```

### Essential Mixins
```scss
@mixin button-variant($bg, $text: white) {
  background: $bg;
  color: $text;
  &:hover { background: darken($bg, 10%); }
}

@mixin breakpoint($size) {
  @media (min-width: #{$size}) { @content; }
}
```

### Nesting Guidelines
```scss
.nav {
  display: flex;
  
  &__item {
    padding: 10px;
    &:hover { background: $hover; }
    &--active { font-weight: bold; }
  }
}
```
⚠️ Max 3 levels deep

## Responsive Design

### Mobile-First
```scss
.container {
  width: 100%;
  @include breakpoint(768px) { max-width: 720px; }
  @include breakpoint(992px) { max-width: 960px; }
}

// Common breakpoints: 576px, 768px, 992px, 1200px
```

## Performance

- **Critical CSS**: Inline above-fold styles
- **Optimization**: Remove unused, minimize files
- **Selectors**: Keep specificity low
- **Properties**: Avoid expensive operations

## Modern CSS

```css
/* Custom Properties */
:root {
  --primary: #007bff;
  --spacing: 8px;
}

/* Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

/* Flexbox */
.flex { display: flex; gap: 1rem; }
```

## Animations

```scss
// Use transform & opacity for performance
.element {
  transition: transform 0.3s, opacity 0.3s;
  &:hover { transform: translateY(-5px); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

## Accessibility

```scss
/* Focus styles */
:focus { outline: 2px solid currentColor; }
:focus:not(:focus-visible) { outline: none; }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

✓ WCAG AA contrast (4.5:1)
✓ Don't rely on color alone

## CSS Reset

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
```

## Utilities

```scss
// Generate spacing utilities
@each $size, $value in $spacing {
  .m-#{$size} { margin: $value; }
  .p-#{$size} { padding: $value; }
}
```

## Dark Mode

```css
:root {
  --bg: white;
  --text: black;
}

/* Auto dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: black;
    --text: white;
  }
}

/* Manual toggle */
[data-theme="dark"] {
  --bg: black;
  --text: white;
}
```

## Best Practices

### Do's
✅ Use BEM or consistent naming
✅ Keep specificity low
✅ Mobile-first approach
✅ Optimize performance
✅ Ensure accessibility

### Don'ts
❌ Avoid !important
❌ Don't over-nest (>3 levels)
❌ No inline styles
❌ Avoid ID selectors
❌ Don't repeat yourself