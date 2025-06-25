import type { ToolType } from "@/components/tool-selector"
import type { PresetType } from "@/components/preset-selector"
import type { TechStack, GeneratedRules } from "@/types/rules"
import { loadMarkdownRules, combineMarkdownContent } from "./markdown-loader"

interface GenerationConfig {
  tool: ToolType
  techStack: Partial<TechStack>
  bestPractices: string[]
  preset: PresetType
  customRules?: string
}

export async function generateRulesContent(config: GenerationConfig): Promise<GeneratedRules> {
  const { tool, techStack, bestPractices, preset, customRules } = config

  // Load markdown files based on selections
  const markdownContents = await loadMarkdownRules(techStack, bestPractices)
  
  // Combine markdown contents into a single rules document
  let combinedContent = combineMarkdownContent(markdownContents, techStack, bestPractices)
  
  // Don't append custom rules here for single-file outputs
  // They will be handled in the format-specific functions

  // Generate tool-specific files
  const files = await generateToolSpecificFiles(tool, combinedContent, config)

  return {
    files,
    instructions: generateSetupInstructions(tool),
    metadata: {
      tool,
      preset,
      generatedAt: new Date().toISOString(),
    },
  }
}

async function generateToolSpecificFiles(tool: ToolType, content: string, config: GenerationConfig) {
  const files = []

  switch (tool) {
    case "cursor":
      // Generate MDC files for each category in .cursor/rules/ structure
      const mdcFiles = await generateCursorMDCFiles(content, config)
      files.push(...mdcFiles)
      break

    case "claude":
      files.push({
        filename: "CLAUDE.md",
        content: generateClaudeFormat(content, config),
      })
      break

    case "windsurf":
      files.push({
        filename: ".windsurfrules",
        content: generateWindsurfFormat(content, config),
      })
      break

    case "aider":
      files.push({
        filename: "CONVENTIONS.md",
        content: generateAiderFormat(content, config),
      })
      files.push({
        filename: ".aider.yaml",
        content: generateAiderConfig(config),
      })
      break

    case "all":
      // Generate files for all tools
      const cursorFiles = await generateCursorMDCFiles(content, config)
      files.push(...cursorFiles)
      files.push(
        { filename: "CLAUDE.md", content: generateClaudeFormat(content, config) },
        { filename: ".windsurfrules", content: generateWindsurfFormat(content, config) },
        { filename: "CONVENTIONS.md", content: generateAiderFormat(content, config) },
        { filename: ".aider.yaml", content: generateAiderConfig(config) },
      )
      break
  }

  // Add README with setup instructions
  files.push({
    filename: "README.md",
    content: generateReadme(tool, config),
  })

  return files
}

async function generateCursorMDCFiles(content: string, config: GenerationConfig) {
  const files = []
  
  // Load the actual markdown content from files
  const markdownContents = await loadMarkdownRules(config.techStack, config.bestPractices)
  
  // Cursor rules header
  const cursorHeader = `# Cursor AI Assistant Rules

You are an expert software developer assistant. Follow these comprehensive guidelines when helping with code:

## Project Context
${getProjectContext(config)}

`
  
  // Only add project-guidelines.mdc if there are custom rules
  if (config.customRules) {
    files.push({
      filename: "project-guidelines.mdc",
      content: generateMDCFormat(
        "Project Guidelines", 
        "Custom project-specific guidelines and requirements", 
        ["**/*"], 
        true, // Always apply custom rules
        config.customRules
      ),
      path: ".cursor/rules/",
    })
  }
  
  // Tech-specific rules
  if (config.techStack.frontend && markdownContents[TECH_FILE_MAPPINGS[config.techStack.frontend]]) {
    files.push({
      filename: `${config.techStack.frontend}-patterns.mdc`,
      content: generateMDCFormat(
        `${config.techStack.frontend} patterns`,
        `Best practices for ${config.techStack.frontend} development`,
        getFrameworkGlobs(config.techStack.frontend),
        false,
        cursorHeader + markdownContents[TECH_FILE_MAPPINGS[config.techStack.frontend]]
      ),
      path: ".cursor/rules/",
    })
  }
  
  if (config.techStack.metaFramework && markdownContents[TECH_FILE_MAPPINGS[config.techStack.metaFramework]]) {
    files.push({
      filename: `${config.techStack.metaFramework}-conventions.mdc`,
      content: generateMDCFormat(
        `${config.techStack.metaFramework} conventions`,
        `Conventions and patterns for ${config.techStack.metaFramework}`,
        getMetaFrameworkGlobs(config.techStack.metaFramework),
        false,
        cursorHeader + markdownContents[TECH_FILE_MAPPINGS[config.techStack.metaFramework]]
      ),
      path: ".cursor/rules/",
    })
  }
  
  // Language-specific rules (e.g., TypeScript)
  if (config.techStack.language && markdownContents[TECH_FILE_MAPPINGS[config.techStack.language]]) {
    files.push({
      filename: `${config.techStack.language}-guidelines.mdc`,
      content: generateMDCFormat(
        `${config.techStack.language} guidelines`,
        `Language-specific guidelines for ${config.techStack.language}`,
        getLanguageGlobs(config.techStack.language),
        false,
        cursorHeader + markdownContents[TECH_FILE_MAPPINGS[config.techStack.language]]
      ),
      path: ".cursor/rules/",
    })
  }
  
  // Styling-specific rules (e.g., Tailwind, CSS)
  if (config.techStack.styling?.length) {
    config.techStack.styling.forEach(style => {
      if (markdownContents[TECH_FILE_MAPPINGS[style]]) {
        files.push({
          filename: `${style}-styling.mdc`,
          content: generateMDCFormat(
            `${style} styling`,
            `Styling guidelines for ${style}`,
            getStylingGlobs(style),
            false,
            cursorHeader + markdownContents[TECH_FILE_MAPPINGS[style]]
          ),
          path: ".cursor/rules/",
        })
      }
    })
  }
  
  // Best practices rules
  if (config.bestPractices.includes("testing") && markdownContents[PRACTICE_FILE_MAPPINGS["testing"]]) {
    files.push({
      filename: "testing-standards.mdc",
      content: generateMDCFormat(
        "Testing Standards",
        "Testing guidelines and patterns",
        ["**/*.test.*", "**/*.spec.*", "**/tests/**"],
        false,
        cursorHeader + markdownContents[PRACTICE_FILE_MAPPINGS["testing"]]
      ),
      path: ".cursor/rules/",
    })
  }
  
  if (config.bestPractices.includes("code-quality") && markdownContents[PRACTICE_FILE_MAPPINGS["code-quality"]]) {
    files.push({
      filename: "code-quality.mdc",
      content: generateMDCFormat(
        "Code Quality",
        "Code quality and linting standards",
        ["**/*"],
        true, // Always apply code quality rules
        cursorHeader + markdownContents[PRACTICE_FILE_MAPPINGS["code-quality"]]
      ),
      path: ".cursor/rules/",
    })
  }
  
  // Add other best practices
  config.bestPractices.forEach(practice => {
    if (practice !== "testing" && practice !== "code-quality" && PRACTICE_FILE_MAPPINGS[practice] && markdownContents[PRACTICE_FILE_MAPPINGS[practice]]) {
      files.push({
        filename: `${practice}.mdc`,
        content: generateMDCFormat(
          practice.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          `Guidelines for ${practice}`,
          ["**/*"],
          false,
          cursorHeader + markdownContents[PRACTICE_FILE_MAPPINGS[practice]]
        ),
        path: ".cursor/rules/",
      })
    }
  })
  
  return files
}

// Add these constants at the top of the file
const TECH_FILE_MAPPINGS: Record<string, string> = {
  // Languages
  php: 'php.md',
  java: 'java.md',
  rust: 'rust.md',
  // Frontend frameworks
  react: 'react.md',
  vue: 'vue.md',
  angular: 'angular.md',
  svelte: 'svelte.md',
  solidjs: 'solidjs.md',
  qwik: 'qwik.md',
  astro: 'astro.md',
  
  // Meta-frameworks
  nextjs: 'nextjs.md',
  nuxtjs: 'nuxtjs.md',
  sveltekit: 'sveltekit.md',
  vite: 'vite.md',
  
  // Backend frameworks
  nodejs: 'nodejs.md',
  django: 'django.md',
  fastapi: 'fastapi.md',
  laravel: 'laravel.md',
  'python-flask': 'python-flask.md',
  'spring-boot': 'spring-boot.md',
  go: 'go.md',
  
  // Languages
  typescript: 'typescript.md',
  python: 'python.md',
  
  // Styling
  tailwind: 'tailwind-css.md',
  css: 'css-scss.md',
  'material-ui': 'material-ui.md',
  'chakra-ui': 'chakra-ui.md',
  'shadcn-ui': 'shadcn-ui.md',
  
  // Mobile
  flutter: 'flutter.md',
  
  // Testing
  jest: 'jest.md',
  vitest: 'vitest.md',
  
  // State Management
  redux: 'redux.md',
  zustand: 'zustand.md',
  
  // Databases
  postgresql: 'postgresql.md',
}

const PRACTICE_FILE_MAPPINGS: Record<string, string> = {
  'code-quality': 'clean-code.md',
  'testing': 'testing.md',
  'security': 'security.md',
  'performance': 'performance.md',
  'git-workflow': 'git-workflow.md',
  'api-design': 'api-design.md',
  'database': 'database.md',
  'error-handling': 'error-handling.md',
}

function getProjectContext(config: GenerationConfig): string {
  const context = []
  
  if (config.techStack.frontend) {
    context.push(`- Primary frontend framework: ${config.techStack.frontend}`)
  }
  if (config.techStack.metaFramework) {
    context.push(`- Meta-framework: ${config.techStack.metaFramework}`)
  }
  if (config.techStack.backend) {
    context.push(`- Backend framework: ${config.techStack.backend}`)
  }
  if (config.techStack.language) {
    context.push(`- Primary language: ${config.techStack.language}`)
  }
  if (config.techStack.styling?.length) {
    context.push(`- Styling: ${config.techStack.styling.join(', ')}`)
  }
  if (config.techStack.mobile) {
    context.push(`- Mobile framework: ${config.techStack.mobile}`)
  }
  
  return context.join('\n')
}

function generateMDCFormat(title: string, description: string, globs: string[], alwaysApply: boolean, content: string): string {
  return `---
description: ${description}
globs: ${globs.join(", ")}
alwaysApply: ${alwaysApply}
---

# ${title}

${content}`
}


function getFrameworkGlobs(framework: string): string[] {
  const globMap: Record<string, string[]> = {
    react: ["**/*.tsx", "**/*.jsx", "**/components/**"],
    vue: ["**/*.vue", "**/components/**"],
    angular: ["**/*.ts", "**/*.component.ts", "**/components/**"],
    svelte: ["**/*.svelte", "**/components/**"],
  }
  return globMap[framework] || ["**/*"]
}

function getMetaFrameworkGlobs(metaFramework: string): string[] {
  const globMap: Record<string, string[]> = {
    nextjs: ["**/app/**", "**/pages/**", "**/*.tsx", "**/*.jsx"],
    nuxt: ["**/pages/**", "**/components/**", "**/*.vue"],
    sveltekit: ["**/routes/**", "**/*.svelte"],
    remix: ["**/routes/**", "**/*.tsx"],
  }
  return globMap[metaFramework] || ["**/*"]
}

function getLanguageGlobs(language: string): string[] {
  const globMap: Record<string, string[]> = {
    typescript: ["**/*.ts", "**/*.tsx", "**/*.d.ts"],
    javascript: ["**/*.js", "**/*.jsx", "**/*.mjs", "**/*.cjs"],
    python: ["**/*.py"],
    go: ["**/*.go"],
  }
  return globMap[language] || ["**/*"]
}

function getStylingGlobs(style: string): string[] {
  const globMap: Record<string, string[]> = {
    tailwind: ["**/*.tsx", "**/*.jsx", "**/*.html", "**/tailwind.config.*"],
    css: ["**/*.css", "**/*.scss", "**/*.sass"],
    "styled-components": ["**/*.tsx", "**/*.jsx", "**/*.styled.*"],
    emotion: ["**/*.tsx", "**/*.jsx"],
  }
  return globMap[style] || ["**/*"]
}

function generateClaudeFormat(content: string, config: GenerationConfig): string {
  let claudeContent = `# Claude AI Assistant Rules

`
  
  // Add custom rules at the top if provided
  if (config.customRules) {
    claudeContent += `## Custom Rules & Requirements

${config.customRules}

`
  }
  
  // Add the rest of the content
  claudeContent += content
  
  // Add footer
  claudeContent += `

## Project-Specific Context
- Configuration: ${config.preset}
- Generated: ${new Date().toLocaleDateString()}

Remember to reference files with @filename when providing context about specific implementations.`
  
  return claudeContent
}

function generateWindsurfFormat(content: string, config: GenerationConfig): string {
  let windsurfContent = `# Windsurf AI Assistant Rules

`
  
  // Add custom rules at the top if provided
  if (config.customRules) {
    windsurfContent += `## Custom Rules & Requirements

${config.customRules}

`
  }
  
  // Add the rest of the content
  windsurfContent += content
  
  return windsurfContent
}

function generateAiderFormat(content: string, config: GenerationConfig): string {
  let aiderContent = `# Aider Coding Conventions

`
  
  // Add custom rules at the top if provided
  if (config.customRules) {
    aiderContent += `## Custom Rules & Requirements

${config.customRules}

`
  }
  
  // Add the rest of the content
  aiderContent += content
  
  return aiderContent
}


function generateAiderConfig(config: GenerationConfig): string {
  const aiderConfig = {
    model: "gpt-4o",
    "auto-test": true,
    "auto-lint": true,
    conventions: "CONVENTIONS.md",
  }

  return Object.entries(aiderConfig)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join("\n")
}

function getGlobPatterns(techStack: Partial<TechStack>): string {
  const patterns = []

  if (techStack.frontend === "react") {
    patterns.push("**/*.tsx", "**/*.jsx")
  }
  if (techStack.language === "typescript") {
    patterns.push("**/*.ts")
  }
  if (techStack.language === "javascript") {
    patterns.push("**/*.js")
  }

  return patterns.join(",") || "**/*"
}

function generateSetupInstructions(tool: ToolType): string {
  const instructions = {
    cursor: `
## Cursor Setup Instructions

### Legacy Format (.cursorrules)
1. Place the .cursorrules file in your project root
2. Cursor will automatically detect and use these rules

### Modern Format (.mdc files)
1. Create a .cursor/rules/ directory in your project root
2. Place the .mdc files in this directory
3. Rules will be automatically applied based on file patterns

### Usage
- Rules are applied automatically based on file types
- You can reference specific rules with @rule-name
- Modify glob patterns to target specific files
    `,
    claude: `
## Claude Setup Instructions

1. Place CLAUDE.md in your project root
2. Claude will automatically pull this into context
3. Reference other files with @filename syntax
4. Keep the file focused and avoid information overload
    `,
    windsurf: `
## Windsurf Setup Instructions

1. Place the .windsurfrules file in your project root
2. Windsurf will automatically detect and use these rules
3. The rules will be applied to all AI interactions in your project

### Usage
- Rules are automatically loaded when you open the project
- They guide Windsurf's code generation and suggestions
- Modify the file to customize behavior for your project
    `,
    aider: `
## Aider Setup Instructions

1. Place CONVENTIONS.md in your project root
2. Place .aider.yaml in your project root (optional)
3. Run aider with: aider --conventions CONVENTIONS.md
4. Or configure via environment variables

### Configuration Options
- Use --read for static conventions
- Use --message for dynamic prompts
- Enable auto-testing and auto-linting for better code quality
    `,
    all: `
## Multi-Tool Setup Instructions

This package contains rules for multiple AI coding tools:

### Cursor
- Place .cursorrules in project root (legacy)
- Create .cursor/rules/ directory for .mdc files (modern)

### Claude
- Place CLAUDE.md in project root

### Windsurf
- Place .windsurfrules in project root

### Aider
- Place CONVENTIONS.md in project root
- Optionally use .aider.yaml for configuration

Choose the files relevant to your preferred AI coding tool(s).
    `,
  }

  return instructions[tool] || instructions.all
}

function generateReadme(tool: ToolType, config: GenerationConfig): string {
  if (tool === "cursor") {
    return `# Cursor Rules Package

Generated on ${new Date().toLocaleDateString()} using the ${config.preset} preset.

## Installation

1. Extract this ZIP file in your project root
2. The .cursor/rules/ directory will be created with all rule files
3. Cursor will automatically detect and apply these rules

## Included Rules

${getCursorRulesList(config)}

## Configuration Summary

**Preset:** ${config.preset}
**Tech Stack:** ${Object.entries(config.techStack)
    .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`)
    .join(", ")}

## Usage

- Rules are automatically applied based on file patterns
- Some rules are always active (marked with alwaysApply: true)
- You can reference specific rules using @rulename in Cursor

---

*Generated by StartingPoints.dev*
`
  }
  
  return `# AI Coding Rules - ${config.preset}

Generated on ${new Date().toLocaleDateString()} for ${tool === "all" ? "all supported tools" : tool}.

## Configuration Summary

**Preset:** ${config.preset}
**Target Tool:** ${tool}
**Tech Stack:** ${Object.entries(config.techStack)
    .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`)
    .join(", ")}

---

*Generated by StartingPoints.dev*
`
}

function getCursorRulesList(config: GenerationConfig): string {
  const rules = []
  
  if (config.customRules) {
    rules.push("- **project-guidelines.mdc** - Custom project-specific guidelines and requirements")
  }
  
  if (config.techStack.frontend) {
    rules.push(`- **${config.techStack.frontend}-patterns.mdc** - ${config.techStack.frontend} development patterns`)
  }
  
  if (config.techStack.metaFramework) {
    rules.push(`- **${config.techStack.metaFramework}-conventions.mdc** - ${config.techStack.metaFramework} conventions`)
  }
  
  if (config.techStack.language) {
    rules.push(`- **${config.techStack.language}-guidelines.mdc** - ${config.techStack.language} language guidelines`)
  }
  
  if (config.techStack.styling?.length) {
    config.techStack.styling.forEach(style => {
      rules.push(`- **${style}-styling.mdc** - ${style} styling guidelines`)
    })
  }
  
  config.bestPractices.forEach(practice => {
    const practiceTitle = practice.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    if (practice === "code-quality") {
      rules.push(`- **${practice}.mdc** - ${practiceTitle} (always active)`)
    } else {
      rules.push(`- **${practice}.mdc** - ${practiceTitle}`)
    }
  })
  
  return rules.join("\n")
}