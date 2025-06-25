# Tech Stack Dependency Rules

This document outlines the dependency rules enforced in the StartingPoints tech stack selector to prevent incompatible technology combinations.

## Core Principles

1. **Language Separation**: Frontend JavaScript frameworks cannot be mixed with backend languages (Python, PHP, Java, Go, Rust)
2. **Framework Dependencies**: Meta-frameworks and UI libraries require their base framework
3. **Auto-correction**: When incompatible selections are made, the system auto-corrects to maintain consistency

## Implemented Rules

### Language Rules

#### Frontend Languages (JavaScript/TypeScript)
- Enable: All frontend frameworks (React, Vue, Angular, Svelte, etc.)
- Enable: All meta-frameworks (Next.js, Nuxt.js, SvelteKit)
- Enable: All JavaScript UI libraries and state management
- Enable: JavaScript testing frameworks (Jest, Vitest, Cypress)

#### Backend Languages (Python, PHP, Java, Go, Rust)
- Disable: All frontend frameworks
- Disable: All meta-frameworks
- Disable: JavaScript UI libraries (except CSS/Tailwind)
- Disable: JavaScript state management libraries
- Disable: JavaScript testing frameworks
- Enable: Language-specific backends:
  - Python → Django, FastAPI, Flask
  - PHP → Laravel
  - Java → Spring Boot
  - Go → Go backend

### Framework Dependencies

#### Meta-frameworks
- Next.js → Requires React
- Nuxt.js → Requires Vue
- SvelteKit → Requires Svelte

#### UI Libraries
- shadcn/ui → Requires React
- Material UI → Requires React
- Chakra UI → Requires React
- Styled Components → Requires React
- Angular Material → Requires Angular

#### State Management
- Redux → Requires React
- Zustand → Requires React
- Pinia → Requires Vue
- Vuex → Requires Vue
- NgRx → Requires Angular

### Auto-correction Behavior

1. **Selecting a backend language** (Python, PHP, etc.):
   - Clears all frontend framework selections
   - Clears all meta-framework selections
   - Preserves only universal styling (CSS/SCSS, Tailwind)
   - Clears JavaScript-specific state management

2. **Selecting a frontend framework** with a backend language:
   - Automatically switches language to TypeScript
   - Preserves the frontend selection

3. **Selecting a backend framework**:
   - Automatically selects the required language
   - Clears incompatible frontend selections

4. **Selecting a meta-framework**:
   - Automatically selects the required frontend framework

## Universal Options

These options work with any tech stack:
- CSS/SCSS
- Tailwind CSS
- PostgreSQL database
- No framework options ("none")

## User Experience

- Incompatible options are visually disabled (grayed out)
- Hover states show why options are disabled
- Auto-corrections show a temporary warning message
- All dependency requirements are clearly displayed