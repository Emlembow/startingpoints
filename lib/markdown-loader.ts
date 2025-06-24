import type { TechStack } from "@/types/rules"

interface MarkdownFile {
  filename: string
  category: 'tech' | 'practice' | 'general'
}

// Mapping of tech stack selections to markdown files
const TECH_FILE_MAPPINGS: Record<string, string> = {
  // Frontend frameworks
  react: 'react.md',
  vue: 'vue.md',
  angular: 'angular.md',
  svelte: 'svelte.md',
  
  // Meta frameworks
  nextjs: 'nextjs.md',
  
  // Backend frameworks
  nodejs: 'nodejs.md',
  django: 'django.md',
  fastapi: 'fastapi.md',
  laravel: 'laravel.md',
  go: 'go.md',
  
  // Languages
  typescript: 'typescript.md',
  python: 'python.md',
  
  // Styling
  tailwind: 'tailwind-css.md',
  css: 'css-scss.md',
  
  // Mobile
  flutter: 'flutter.md',
}

// Mapping of best practices to markdown files
const PRACTICE_FILE_MAPPINGS: Record<string, string> = {
  'code-quality': 'clean-code.md',
  'testing': 'testing.md',
  'security': 'security.md',
  'performance': 'performance.md',
  'git-workflow': 'git-workflow.md',
  'api-design': 'api-design.md',
  'database': 'database.md',
}

export async function loadMarkdownRules(
  techStack: Partial<TechStack>,
  bestPractices: string[]
): Promise<Record<string, string>> {
  const filesToLoad: string[] = []
  
  // Add tech stack related files
  if (techStack.frontend && TECH_FILE_MAPPINGS[techStack.frontend]) {
    filesToLoad.push(TECH_FILE_MAPPINGS[techStack.frontend])
  }
  
  if (techStack.metaFramework && TECH_FILE_MAPPINGS[techStack.metaFramework]) {
    filesToLoad.push(TECH_FILE_MAPPINGS[techStack.metaFramework])
  }
  
  if (techStack.backend && TECH_FILE_MAPPINGS[techStack.backend]) {
    filesToLoad.push(TECH_FILE_MAPPINGS[techStack.backend])
  }
  
  if (techStack.language && TECH_FILE_MAPPINGS[techStack.language]) {
    filesToLoad.push(TECH_FILE_MAPPINGS[techStack.language])
  }
  
  if (techStack.styling) {
    techStack.styling.forEach(style => {
      if (TECH_FILE_MAPPINGS[style]) {
        filesToLoad.push(TECH_FILE_MAPPINGS[style])
      }
    })
  }
  
  if (techStack.mobile && TECH_FILE_MAPPINGS[techStack.mobile]) {
    filesToLoad.push(TECH_FILE_MAPPINGS[techStack.mobile])
  }
  
  // Add best practice files
  bestPractices.forEach(practice => {
    if (PRACTICE_FILE_MAPPINGS[practice]) {
      filesToLoad.push(PRACTICE_FILE_MAPPINGS[practice])
    }
  })
  
  // Remove duplicates
  const uniqueFiles = [...new Set(filesToLoad)]
  
  if (uniqueFiles.length === 0) {
    return {}
  }
  
  try {
    // Fetch markdown contents from API
    const response = await fetch(`/api/rules?files=${uniqueFiles.join(',')}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch markdown files')
    }
    
    const data = await response.json()
    return data.contents || {}
  } catch (error) {
    console.error('Error loading markdown files:', error)
    return {}
  }
}

export function combineMarkdownContent(
  contents: Record<string, string>,
  techStack: Partial<TechStack>,
  bestPractices: string[]
): string {
  const sections: string[] = []
  
  // Add header
  sections.push('# AI Coding Assistant Rules')
  sections.push('')
  sections.push('You are an expert software developer assistant. Follow these comprehensive guidelines when helping with code:')
  sections.push('')
  
  // Add project context
  if (Object.keys(techStack).length > 0) {
    sections.push('## Project Context')
    
    if (techStack.frontend) {
      sections.push(`- Primary frontend framework: ${techStack.frontend}`)
    }
    if (techStack.metaFramework) {
      sections.push(`- Meta-framework: ${techStack.metaFramework}`)
    }
    if (techStack.backend) {
      sections.push(`- Backend framework: ${techStack.backend}`)
    }
    if (techStack.language) {
      sections.push(`- Primary language: ${techStack.language}`)
    }
    if (techStack.styling?.length) {
      sections.push(`- Styling: ${techStack.styling.join(', ')}`)
    }
    if (techStack.mobile) {
      sections.push(`- Mobile framework: ${techStack.mobile}`)
    }
    
    sections.push('')
  }
  
  // Add technology-specific content
  const techSectionAdded = new Set<string>()
  
  // Frontend framework content
  if (techStack.frontend && contents[TECH_FILE_MAPPINGS[techStack.frontend]]) {
    sections.push(contents[TECH_FILE_MAPPINGS[techStack.frontend]])
    sections.push('')
    techSectionAdded.add(TECH_FILE_MAPPINGS[techStack.frontend])
  }
  
  // Meta framework content
  if (techStack.metaFramework && contents[TECH_FILE_MAPPINGS[techStack.metaFramework]]) {
    sections.push(contents[TECH_FILE_MAPPINGS[techStack.metaFramework]])
    sections.push('')
    techSectionAdded.add(TECH_FILE_MAPPINGS[techStack.metaFramework])
  }
  
  // Backend framework content
  if (techStack.backend && contents[TECH_FILE_MAPPINGS[techStack.backend]]) {
    sections.push(contents[TECH_FILE_MAPPINGS[techStack.backend]])
    sections.push('')
    techSectionAdded.add(TECH_FILE_MAPPINGS[techStack.backend])
  }
  
  // Language content
  if (techStack.language && contents[TECH_FILE_MAPPINGS[techStack.language]]) {
    sections.push(contents[TECH_FILE_MAPPINGS[techStack.language]])
    sections.push('')
    techSectionAdded.add(TECH_FILE_MAPPINGS[techStack.language])
  }
  
  // Styling content
  if (techStack.styling) {
    techStack.styling.forEach(style => {
      const file = TECH_FILE_MAPPINGS[style]
      if (file && contents[file] && !techSectionAdded.has(file)) {
        sections.push(contents[file])
        sections.push('')
        techSectionAdded.add(file)
      }
    })
  }
  
  // Mobile framework content
  if (techStack.mobile && contents[TECH_FILE_MAPPINGS[techStack.mobile]]) {
    sections.push(contents[TECH_FILE_MAPPINGS[techStack.mobile]])
    sections.push('')
    techSectionAdded.add(TECH_FILE_MAPPINGS[techStack.mobile])
  }
  
  // Add best practices content
  if (bestPractices.length > 0) {
    sections.push('## Development Best Practices')
    sections.push('')
    
    bestPractices.forEach(practice => {
      const file = PRACTICE_FILE_MAPPINGS[practice]
      if (file && contents[file]) {
        sections.push(contents[file])
        sections.push('')
      }
    })
  }
  
  return sections.join('\n').trim()
}