export interface TechStack {
  frontend?: string
  metaFramework?: string
  language?: string
  styling?: string[]
  stateManagement?: string[]
  backend?: string
  database?: string[]
  testing?: string[]
  mobile?: string
  deployment?: string[]
}

export interface BestPractices {
  codeQuality: boolean
  gitWorkflow: boolean
  errorHandling: boolean
  performance: boolean
  security: boolean
  projectOrganization: boolean
  testing?: boolean
  accessibility?: boolean
  advancedPerformance?: boolean
  documentation?: boolean
  cicd?: boolean
  monitoring?: boolean
}

export interface RuleTemplate {
  id: string
  name: string
  description: string
  category: string
  content: {
    cursor?: {
      cursorrules?: string
      mdc?: {
        frontmatter: Record<string, any>
        content: string
      }
    }
    claude?: {
      markdown: string
    }
    windsurf?: {
      markdown: string
      frontmatter?: Record<string, any>
    }
    aider?: {
      conventions: string
      config?: Record<string, any>
    }
  }
  compatibility: {
    tools: string[]
    frameworks?: string[]
    requires?: string[]
    incompatible?: string[]
  }
  priority: number
}

export interface GeneratedRules {
  files: Array<{
    filename: string
    content: string
    path?: string
  }>
  instructions: string
  metadata: {
    tool: string
    preset: string
    generatedAt: string
  }
}
