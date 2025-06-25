// Dependency rules for tech stack compatibility

export interface DependencyRule {
  // If these are selected, then certain options become required/forbidden
  if: {
    category: string
    values: string[]
  }
  then: {
    category: string
    action: 'require' | 'forbid' | 'enable' | 'disable'
    values: string[]
  }
  message?: string
}

export interface CompatibilityGroup {
  name: string
  exclusive: boolean // If true, only one option from this group can be selected
  options: Array<{
    category: string
    value: string
  }>
}

// Define mutually exclusive groups
export const compatibilityGroups: CompatibilityGroup[] = [
  {
    name: 'Primary Development Language',
    exclusive: true,
    options: [
      { category: 'language', value: 'typescript' },
      { category: 'language', value: 'javascript' },
      { category: 'language', value: 'python' },
      { category: 'language', value: 'php' },
      { category: 'language', value: 'java' },
      { category: 'language', value: 'go' },
      { category: 'language', value: 'rust' },
    ]
  }
]

// Define dependency rules
export const dependencyRules: DependencyRule[] = [
  // Frontend frameworks require JS/TS
  {
    if: { category: 'frontend', values: ['react', 'vue', 'angular', 'svelte', 'solidjs', 'qwik', 'astro'] },
    then: { category: 'language', action: 'require', values: ['typescript', 'javascript'] },
    message: 'Frontend frameworks require TypeScript or JavaScript'
  },
  
  // Backend languages forbid frontend frameworks
  {
    if: { category: 'language', values: ['python', 'php', 'java', 'go', 'rust'] },
    then: { category: 'frontend', action: 'forbid', values: ['react', 'vue', 'angular', 'svelte', 'solidjs', 'qwik', 'astro'] },
    message: 'Backend languages cannot be used with frontend frameworks'
  },
  
  // Backend languages forbid meta-frameworks
  {
    if: { category: 'language', values: ['python', 'php', 'java', 'go', 'rust'] },
    then: { category: 'metaFramework', action: 'forbid', values: ['nextjs', 'nuxtjs', 'sveltekit'] },
    message: 'Backend languages cannot be used with JavaScript meta-frameworks'
  },
  
  // Python enables Python backends
  {
    if: { category: 'language', values: ['python'] },
    then: { category: 'backend', action: 'enable', values: ['django', 'fastapi', 'python-flask'] }
  },
  
  // PHP enables Laravel
  {
    if: { category: 'language', values: ['php'] },
    then: { category: 'backend', action: 'enable', values: ['laravel'] }
  },
  
  // Java enables Spring Boot
  {
    if: { category: 'language', values: ['java'] },
    then: { category: 'backend', action: 'enable', values: ['spring-boot'] }
  },
  
  // Go enables Go backend
  {
    if: { category: 'language', values: ['go'] },
    then: { category: 'backend', action: 'enable', values: ['go'] }
  },
  
  // Non-JS/TS languages disable frontend UI libraries
  {
    if: { category: 'language', values: ['python', 'php', 'java', 'go', 'rust'] },
    then: { category: 'styling', action: 'disable', values: ['shadcn-ui', 'styled-components', 'chakra-ui', 'material-ui', 'angular-material'] }
  },
  
  // Non-JS/TS languages disable state management
  {
    if: { category: 'language', values: ['python', 'php', 'java', 'go', 'rust'] },
    then: { category: 'stateManagement', action: 'disable', values: ['context-api', 'redux', 'zustand', 'pinia', 'vuex', 'ngrx'] }
  },
  
  // Backend frameworks require their language
  {
    if: { category: 'backend', values: ['django', 'fastapi'] },
    then: { category: 'language', action: 'require', values: ['python'] },
    message: 'This backend framework requires Python'
  },
  {
    if: { category: 'backend', values: ['laravel'] },
    then: { category: 'language', action: 'require', values: ['php'] },
    message: 'Laravel requires PHP'
  },
  {
    if: { category: 'backend', values: ['spring-boot'] },
    then: { category: 'language', action: 'require', values: ['java'] },
    message: 'Spring Boot requires Java'
  },
  {
    if: { category: 'backend', values: ['go'] },
    then: { category: 'language', action: 'require', values: ['go'] },
    message: 'Go backend requires Go language'
  },
  
  // Testing framework compatibility
  {
    if: { category: 'language', values: ['python', 'php', 'java', 'go', 'rust'] },
    then: { category: 'testing', action: 'disable', values: ['jest', 'vitest', 'cypress', 'playwright', 'testing-library'] },
    message: 'JavaScript testing frameworks cannot be used with backend languages'
  },
  
  // Vite can work with any JS framework or vanilla
  {
    if: { category: 'frontend', values: ['none'] },
    then: { category: 'metaFramework', action: 'disable', values: ['nextjs', 'nuxtjs', 'sveltekit'] },
    message: 'Meta-frameworks require a frontend framework'
  },
  
  // CSS/SCSS and Tailwind are universal and can work with any stack
  // But component libraries require their frameworks
  {
    if: { category: 'frontend', values: ['none'] },
    then: { category: 'styling', action: 'disable', values: ['shadcn-ui', 'styled-components', 'chakra-ui', 'material-ui', 'angular-material'] },
    message: 'Component libraries require a frontend framework'
  }
]

// Helper function to check if a selection is valid
export function isSelectionValid(
  category: string,
  value: string,
  currentSelections: Record<string, string | string[]>
): { valid: boolean; reason?: string } {
  for (const rule of dependencyRules) {
    // Check if the rule condition is met
    const conditionMet = rule.if.values.some(v => {
      const selection = currentSelections[rule.if.category]
      if (typeof selection === 'string') return selection === v
      if (Array.isArray(selection)) return selection.includes(v)
      return false
    })
    
    if (!conditionMet) continue
    
    // Apply the rule
    if (rule.then.category === category) {
      if (rule.then.action === 'forbid' && rule.then.values.includes(value)) {
        return { valid: false, reason: rule.message || `This option is incompatible with your current selections` }
      }
      if (rule.then.action === 'require' && !rule.then.values.includes(value)) {
        // Only apply this if we're trying to select something not in the required list
        if (!rule.then.values.includes(value)) {
          return { valid: false, reason: rule.message || `This option requires different dependencies` }
        }
      }
    }
  }
  
  return { valid: true }
}

// Helper function to get all disabled options based on current selections
export function getDisabledOptions(
  currentSelections: Record<string, string | string[]>
): Record<string, Set<string>> {
  const disabled: Record<string, Set<string>> = {}
  
  for (const rule of dependencyRules) {
    // Check if the rule condition is met
    const conditionMet = rule.if.values.some(v => {
      const selection = currentSelections[rule.if.category]
      if (typeof selection === 'string') return selection === v
      if (Array.isArray(selection)) return selection.includes(v)
      return false
    })
    
    if (!conditionMet) continue
    
    // Apply the rule
    if (rule.then.action === 'forbid' || rule.then.action === 'disable') {
      if (!disabled[rule.then.category]) {
        disabled[rule.then.category] = new Set()
      }
      rule.then.values.forEach(v => disabled[rule.then.category].add(v))
    }
  }
  
  return disabled
}

// Helper function to get required options based on current selections
export function getRequiredOptions(
  currentSelections: Record<string, string | string[]>
): Record<string, Set<string>> {
  const required: Record<string, Set<string>> = {}
  
  for (const rule of dependencyRules) {
    // Check if the rule condition is met
    const conditionMet = rule.if.values.some(v => {
      const selection = currentSelections[rule.if.category]
      if (typeof selection === 'string') return selection === v
      if (Array.isArray(selection)) return selection.includes(v)
      return false
    })
    
    if (!conditionMet) continue
    
    // Apply the rule
    if (rule.then.action === 'require') {
      if (!required[rule.then.category]) {
        required[rule.then.category] = new Set()
      }
      rule.then.values.forEach(v => required[rule.then.category].add(v))
    }
  }
  
  return required
}

// Helper to auto-correct invalid selections
export function autoCorrectSelections(
  newCategory: string,
  newValue: string,
  currentSelections: Record<string, string | string[]>
): Record<string, string | string[]> {
  const corrected = { ...currentSelections }
  
  // Always apply the new selection first
  corrected[newCategory] = newValue
  
  // Handle language/frontend conflicts
  if (newCategory === 'language' && ['python', 'php', 'java', 'go', 'rust'].includes(newValue)) {
    // Clear frontend selections
    corrected.frontend = 'none'
    corrected.metaFramework = 'none'
    corrected.styling = (corrected.styling as string[])?.filter(s => s === 'css' || s === 'tailwind') || []
    corrected.stateManagement = ['none']
  }
  
  // Handle frontend selection with backend language
  if (newCategory === 'frontend' && newValue !== 'none') {
    if (['python', 'php', 'java', 'go', 'rust'].includes(corrected.language as string)) {
      corrected.language = 'typescript' // Auto-switch to TypeScript
    }
  }
  
  // Handle backend framework selection
  if (newCategory === 'backend') {
    const backendLangMap: Record<string, string> = {
      'django': 'python',
      'fastapi': 'python',
      'python-flask': 'python',
      'laravel': 'php',
      'spring-boot': 'java',
      'go': 'go'
    }
    
    if (backendLangMap[newValue]) {
      corrected.language = backendLangMap[newValue]
      // Also clear incompatible frontend selections
      corrected.frontend = 'none'
      corrected.metaFramework = 'none'
      corrected.styling = (corrected.styling as string[])?.filter(s => s === 'css' || s === 'tailwind') || []
      corrected.stateManagement = ['none']
    }
  }
  
  // Handle meta-framework dependencies
  if (newCategory === 'metaFramework') {
    const metaFrameworkMap: Record<string, string> = {
      'nextjs': 'react',
      'nuxtjs': 'vue',
      'sveltekit': 'svelte'
    }
    
    if (metaFrameworkMap[newValue]) {
      corrected.frontend = metaFrameworkMap[newValue]
    }
  }
  
  return corrected
}