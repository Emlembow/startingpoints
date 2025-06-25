# Vite Best Practices

## Project Structure

### Directory Organization
```
src/
├── assets/          # Static assets
├── components/      # Reusable components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.module.css
│   │   └── index.ts
├── features/        # Feature-based modules
├── pages/          # Page components
├── services/       # API services
├── utils/          # Utility functions
├── App.tsx
├── main.tsx
└── vite-env.d.ts
public/             # Public static assets
vite.config.ts      # Vite configuration
```

## Configuration

### Basic Vite Config
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@utils': resolve(__dirname, './src/utils'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['lodash', 'date-fns'],
        },
      },
    },
  },
});
```

### Environment Variables
```typescript
// .env
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=My App

// Usage
const apiUrl = import.meta.env.VITE_API_URL;
const isProd = import.meta.env.PROD;
```

## Development Features

### Hot Module Replacement (HMR)
```typescript
// main.tsx
if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(() => {
    // Cleanup code
  });
}
```

### Asset Handling
```typescript
// Import assets
import logo from '@/assets/logo.svg';
import styles from './App.module.css';

// Dynamic imports
const getImage = async (name: string) => {
  const module = await import(`./assets/${name}.png`);
  return module.default;
};

// Public assets
<img src="/logo.png" alt="Logo" />
```

## Code Splitting

### Dynamic Imports
```typescript
// Route-based code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  );
}
```

### Manual Chunks
```typescript
// vite.config.ts
build: {
  rollupOptions: {
    output: {
      manualChunks: (id) => {
        if (id.includes('node_modules')) {
          if (id.includes('react')) {
            return 'react-vendor';
          }
          if (id.includes('lodash')) {
            return 'lodash';
          }
          return 'vendor';
        }
      },
    },
  },
}
```

## Performance Optimization

### CSS Code Splitting
```typescript
// Component-level CSS
import styles from './Button.module.css';

// Global CSS optimization
import 'virtual:uno.css'; // Using UnoCSS
```

### Build Optimization
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Chunk size warnings
    chunkSizeWarningLimit: 500,
  },
});
```

### Image Optimization
```typescript
// Using vite-imagetools
import { imagetools } from 'vite-imagetools';

export default defineConfig({
  plugins: [
    imagetools({
      defaultDirectives: new URLSearchParams({
        format: 'webp',
        quality: '80',
      }),
    }),
  ],
});

// Usage
import heroImage from '@/assets/hero.jpg?w=1200&format=webp';
```

## Plugin Ecosystem

### Essential Plugins
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';
import compress from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
    }),
    compress({
      algorithm: 'gzip',
    }),
  ],
});
```

## Testing Integration

### Vitest Configuration
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    exclude: [...configDefaults.exclude, 'e2e/*'],
  },
});
```

## Production Deployment

### Build Analysis
```bash
# Install rollup-plugin-visualizer
npm i -D rollup-plugin-visualizer

# Add to vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

plugins: [
  visualizer({
    open: true,
    filename: 'stats.html',
  }),
]
```

### Preview Server
```bash
# Build and preview
npm run build
npm run preview

# Custom preview config
preview: {
  port: 8080,
  strictPort: true,
  headers: {
    'X-Frame-Options': 'DENY',
  },
}
```

## Best Practices Summary

### Do's
- ✅ Use TypeScript for type safety
- ✅ Leverage Vite's fast HMR
- ✅ Optimize bundle sizes with code splitting
- ✅ Use environment variables properly
- ✅ Configure path aliases
- ✅ Analyze bundle size regularly

### Don'ts
- ❌ Don't import large libraries unnecessarily
- ❌ Avoid using require() syntax
- ❌ Don't ignore build warnings
- ❌ Avoid inline dynamic imports in loops
- ❌ Don't commit .env files with secrets