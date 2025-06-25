"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { TemplatePreview } from "@/components/template-preview"
import type { TechStack } from "@/types/rules"
import type { PresetType } from "@/components/preset-selector"

interface TechStackSelectorProps {
  techStack: Partial<TechStack>
  onTechStackChange: (techStack: Partial<TechStack>) => void
  selectedPreset: PresetType
}

const techOptions = {
  frontend: {
    title: "Frontend Framework",
    type: "radio" as const,
    options: [
      { id: "react", label: "React", popular: true },
      { id: "vue", label: "Vue.js", popular: true },
      { id: "angular", label: "Angular" },
      { id: "svelte", label: "Svelte" },
      { id: "solidjs", label: "Solid.js" },
      { id: "qwik", label: "Qwik" },
      { id: "astro", label: "Astro" },
      { id: "vanilla", label: "Vanilla JavaScript", disabled: true },
      { id: "none", label: "No Frontend Framework" },
    ],
  },
  metaFramework: {
    title: "Meta-Framework",
    type: "radio" as const,
    options: [
      { id: "nextjs", label: "Next.js", popular: true, requires: ["react"] },
      { id: "nuxtjs", label: "Nuxt.js", requires: ["vue"] },
      { id: "sveltekit", label: "SvelteKit", requires: ["svelte"] },
      { id: "vite", label: "Vite" },
      { id: "none", label: "None" },
    ],
  },
  language: {
    title: "Primary Language",
    type: "radio" as const,
    options: [
      { id: "typescript", label: "TypeScript", popular: true },
      { id: "javascript", label: "JavaScript", disabled: true },
      { id: "python", label: "Python" },
      { id: "php", label: "PHP" },
      { id: "java", label: "Java" },
      { id: "go", label: "Go" },
      { id: "rust", label: "Rust" },
    ],
  },
  styling: {
    title: "CSS & Styling",
    type: "checkbox" as const,
    options: [
      { id: "tailwind", label: "Tailwind CSS", popular: true },
      { id: "shadcn-ui", label: "shadcn/ui", requires: ["react"] },
      { id: "styled-components", label: "Styled Components", requires: ["react"], disabled: true },
      { id: "chakra-ui", label: "Chakra UI", requires: ["react"] },
      { id: "material-ui", label: "Material UI", requires: ["react"] },
      { id: "angular-material", label: "Angular Material", requires: ["angular"], disabled: true },
      { id: "css", label: "CSS/SCSS" },
      { id: "css-modules", label: "CSS Modules", disabled: true },
      { id: "vanilla-css", label: "Vanilla CSS", disabled: true },
    ],
  },
  stateManagement: {
    title: "State Management",
    type: "checkbox" as const,
    options: [
      { id: "context-api", label: "Context API", requires: ["react"], disabled: true },
      { id: "redux", label: "Redux", requires: ["react"] },
      { id: "zustand", label: "Zustand", requires: ["react"] },
      { id: "pinia", label: "Pinia", requires: ["vue"], disabled: true },
      { id: "vuex", label: "Vuex", requires: ["vue"], disabled: true },
      { id: "ngrx", label: "NgRx", requires: ["angular"], disabled: true },
      { id: "none", label: "None" },
    ],
  },
  backend: {
    title: "Backend Framework",
    type: "radio" as const,
    options: [
      { id: "nodejs", label: "Node.js", popular: true },
      { id: "django", label: "Django", requires: ["python"] },
      { id: "fastapi", label: "FastAPI", requires: ["python"] },
      { id: "python-flask", label: "Flask" },
      { id: "laravel", label: "Laravel" },
      { id: "spring-boot", label: "Spring Boot" },
      { id: "go", label: "Go", requires: ["go"] },
      { id: "elixir-phoenix", label: "Phoenix", disabled: true },
      { id: "none", label: "No Backend" },
    ],
  },
  database: {
    title: "Database & Services",
    type: "checkbox" as const,
    options: [
      { id: "supabase", label: "Supabase", popular: true, disabled: true },
      { id: "firebase", label: "Firebase", disabled: true },
      { id: "postgresql", label: "PostgreSQL" },
      { id: "mongodb", label: "MongoDB", disabled: true },
      { id: "prisma", label: "Prisma ORM", disabled: true },
      { id: "convex", label: "Convex", disabled: true },
      { id: "none", label: "None" },
    ],
  },
  testing: {
    title: "Testing Frameworks",
    type: "checkbox" as const,
    options: [
      { id: "jest", label: "Jest", popular: true },
      { id: "vitest", label: "Vitest" },
      { id: "cypress", label: "Cypress", disabled: true },
      { id: "playwright", label: "Playwright", disabled: true },
      { id: "testing-library", label: "Testing Library", disabled: true },
      { id: "none", label: "None" },
    ],
  },
}

export function TechStackSelector({ techStack, onTechStackChange, selectedPreset }: TechStackSelectorProps) {
  const handleSelectionChange = (category: keyof TechStack, value: string, checked: boolean) => {
    const currentCategory = techStack[category] || []

    if (techOptions[category].type === "radio") {
      // For radio options, handle language/backend conflicts
      if (category === "backend" && checked) {
        // If selecting a Python backend, auto-select Python language
        if ((value === "django" || value === "fastapi") && techStack.language !== "python") {
          onTechStackChange({
            ...techStack,
            language: "python",
            backend: value,
          })
          return
        }
        // If selecting Go backend, auto-select Go language
        if (value === "go" && techStack.language !== "go") {
          onTechStackChange({
            ...techStack,
            language: "go",
            backend: value,
          })
          return
        }
      }
      
      onTechStackChange({
        ...techStack,
        [category]: checked ? value : undefined,
      })
    } else {
      // Checkbox logic
      const currentArray = Array.isArray(currentCategory) ? currentCategory : []
      const newArray = checked ? [...currentArray, value] : currentArray.filter((item) => item !== value)

      onTechStackChange({
        ...techStack,
        [category]: newArray,
      })
    }
  }

  const isOptionDisabled = (option: any, category: keyof TechStack) => {
    // First check if option is explicitly disabled (no file support)
    if (option.disabled) return true
    
    if (!option.requires) return false

    // Check if required dependencies are selected
    return !option.requires.some((req: string) => {
      // Check in all categories for the required dependency
      return Object.entries(techStack).some(([cat, values]) => {
        if (typeof values === "string") return values === req
        if (Array.isArray(values)) return values.includes(req)
        return false
      })
    })
  }

  const isOptionSelected = (category: keyof TechStack, value: string) => {
    const currentValue = techStack[category]
    if (typeof currentValue === "string") return currentValue === value
    if (Array.isArray(currentValue)) return currentValue.includes(value)
    return false
  }

  const isPresetSelected = (value: string) => {
    // Check if this option was auto-selected by the current preset
    return (
      selectedPreset !== "custom" &&
      Object.values(techStack).some((categoryValue) => {
        if (typeof categoryValue === "string") return categoryValue === value
        if (Array.isArray(categoryValue)) return categoryValue.includes(value)
        return false
      })
    )
  }

  return (
    <div className="space-y-8">
      {Object.entries(techOptions).map(([categoryKey, category]) => {
        const typedCategoryKey = categoryKey as keyof TechStack

        return (
          <div key={categoryKey} className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
              <Separator className="mb-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {category.options.map((option) => {
                const isSelected = isOptionSelected(typedCategoryKey, option.id)
                const isDisabled = isOptionDisabled(option, typedCategoryKey)
                const isFromPreset = isPresetSelected(option.id)

                return (
                  <div
                    key={option.id}
                    className={cn(
                      "flex items-center space-x-3 p-3 rounded-lg border transition-colors",
                      isSelected ? "bg-primary/5 border-primary/20" : "bg-background hover:bg-muted/50",
                      isDisabled && "opacity-50 cursor-not-allowed",
                    )}
                  >
                    <Checkbox
                      id={`${categoryKey}-${option.id}`}
                      checked={isSelected}
                      disabled={isDisabled}
                      onCheckedChange={(checked) =>
                        handleSelectionChange(typedCategoryKey, option.id, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`${categoryKey}-${option.id}`}
                      className={cn("flex-1 cursor-pointer", isDisabled && "cursor-not-allowed")}
                    >
                      <div className="flex items-center gap-2">
                        <span>{option.label}</span>
                        {option.popular && (
                          <Badge variant="secondary" className="text-xs">
                            Popular
                          </Badge>
                        )}
                        {isFromPreset && (
                          <Badge variant="outline" className="text-xs text-blue-600 border-blue-200">
                            From Preset
                          </Badge>
                        )}
                        {option.disabled && (
                          <Badge variant="outline" className="text-xs text-gray-500 border-gray-300">
                            Coming Soon
                          </Badge>
                        )}
                      </div>
                      {option.requires && !option.disabled && (
                        <div className="text-xs text-muted-foreground mt-1">Requires: {option.requires.join(", ")}</div>
                      )}
                    </Label>
                    {!option.disabled && option.id !== "none" && (
                      <TemplatePreview 
                        templateName={
                          option.id === "css" ? "css-scss" : 
                          option.id === "tailwind" ? "tailwind-css" : 
                          option.id
                        } 
                        displayName={option.label} 
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}