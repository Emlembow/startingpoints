"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { CheckCircle, Plus } from "lucide-react"
import { TemplatePreview } from "@/components/template-preview"

interface BestPractice {
  id: string
  label: string
  description: string
  mandatory?: boolean
  category: "essential" | "optional"
  disabled?: boolean
}

const bestPracticesOptions: BestPractice[] = [
  // Essential practices (always included)
  {
    id: "code-quality",
    label: "Code Quality Principles",
    description: "DRY, SOLID, KISS, YAGNI principles and clean code practices",
    mandatory: true,
    category: "essential",
  },
  {
    id: "git-workflow",
    label: "Git Workflow Standards",
    description: "Conventional commits, semantic versioning, and branch naming",
    mandatory: true,
    category: "essential",
  },
  {
    id: "error-handling",
    label: "Error Handling Patterns",
    description: "Proper exception handling, validation, and error boundaries",
    mandatory: true,
    category: "essential",
  },
  {
    id: "performance",
    label: "Performance Optimization",
    description: "Web Vitals, image optimization, and performance best practices",
    mandatory: true,
    category: "essential",
  },
  {
    id: "security",
    label: "Security Best Practices",
    description: "OWASP guidelines, input validation, and secure coding",
    mandatory: true,
    category: "essential",
  },
  {
    id: "project-organization",
    label: "Project Organization",
    description: "File naming conventions, directory structure, and code organization",
    mandatory: true,
    category: "essential",
    disabled: true,
  },

  // Optional practices
  {
    id: "testing",
    label: "Testing Standards",
    description: "TDD, unit testing, integration testing, and Arrange-Act-Assert pattern",
    category: "optional",
  },
  {
    id: "accessibility",
    label: "Accessibility Guidelines",
    description: "WCAG compliance, semantic HTML, and inclusive design",
    category: "optional",
    disabled: true,
  },
  {
    id: "advanced-performance",
    label: "Advanced Performance",
    description: "Bundle optimization, caching strategies, and advanced optimizations",
    category: "optional",
    disabled: true,
  },
  {
    id: "documentation",
    label: "Documentation Standards",
    description: "Code comments, API documentation, and README best practices",
    category: "optional",
    disabled: true,
  },
  {
    id: "api-design",
    label: "API Design Patterns",
    description: "RESTful principles, GraphQL best practices, and API versioning",
    category: "optional",
  },
  {
    id: "database",
    label: "Database Best Practices",
    description: "Schema design, query optimization, and data modeling",
    category: "optional",
  },
  {
    id: "cicd",
    label: "CI/CD Integration",
    description: "GitHub Actions, automated testing, and deployment pipelines",
    category: "optional",
    disabled: true,
  },
  {
    id: "monitoring",
    label: "Monitoring & Logging",
    description: "Error tracking, performance monitoring, and structured logging",
    category: "optional",
    disabled: true,
  },
]

interface BestPracticesSelectorProps {
  bestPractices: string[]
  onBestPracticesChange: (practices: string[]) => void
}

export function BestPracticesSelector({ bestPractices, onBestPracticesChange }: BestPracticesSelectorProps) {
  const handlePracticeChange = (practiceId: string, checked: boolean) => {
    const practice = bestPracticesOptions.find((p) => p.id === practiceId)
    
    // Don't allow changing disabled practices
    if (practice?.disabled) return
    
    if (checked) {
      onBestPracticesChange([...bestPractices, practiceId])
    } else {
      // Allow unchecking mandatory practices (user explicitly requested this)
      // Only prevent unchecking if the practice is disabled
      if (practice?.disabled) return

      onBestPracticesChange(bestPractices.filter((id) => id !== practiceId))
    }
  }

  const essentialPractices = bestPracticesOptions.filter((p) => p.category === "essential")
  const optionalPractices = bestPracticesOptions.filter((p) => p.category === "optional")

  return (
    <div className="space-y-6">
      {/* Essential Practices */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Essential Best Practices
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            These practices form the foundation of professional development and are selected by default.
            You can customize selections based on your project needs.
          </p>
          <Separator />
        </div>

        <div className="grid gap-3">
          {essentialPractices.map((practice) => {
            const isSelected = bestPractices.includes(practice.id)
            const isDisabled = practice.disabled

            return (
              <div
                key={practice.id}
                className={cn(
                  "flex items-start space-x-3 p-4 rounded-lg border",
                  isDisabled ? "bg-gray-50 border-gray-200 opacity-60" : "bg-green-50 border-green-200"
                )}
              >
                <Checkbox
                  id={practice.id}
                  checked={isSelected && !isDisabled}
                  disabled={isDisabled}
                  onCheckedChange={(checked) => handlePracticeChange(practice.id, checked as boolean)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor={practice.id} className={cn("cursor-pointer font-medium", isDisabled ? "text-gray-600" : "text-green-800")}>
                    <div className="flex items-center gap-2">
                      <span>{practice.label}</span>
                      <Badge variant="secondary" className={cn("text-xs", isDisabled ? "bg-gray-100 text-gray-600" : "bg-green-100 text-green-700")}>
                        Essential
                      </Badge>
                      {isDisabled && (
                        <Badge variant="outline" className="text-xs text-gray-500 border-gray-300">
                          Coming Soon
                        </Badge>
                      )}
                    </div>
                  </Label>
                  <p className={cn("text-sm mt-1", isDisabled ? "text-gray-600" : "text-green-700")}>{practice.description}</p>
                </div>
                {!isDisabled && (
                  <TemplatePreview 
                    templateName={practice.id === "code-quality" ? "clean-code" : practice.id} 
                    displayName={practice.label} 
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Optional Practices */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Plus className="h-5 w-5 text-blue-600" />
            Optional Enhancements
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Add these practices based on your project needs and team requirements.
          </p>
          <Separator />
        </div>

        <div className="grid gap-3">
          {optionalPractices.map((practice) => {
            const isSelected = bestPractices.includes(practice.id)
            const isDisabled = practice.disabled

            return (
              <div
                key={practice.id}
                className={cn(
                  "flex items-start space-x-3 p-4 rounded-lg border transition-colors",
                  isDisabled ? "bg-gray-50 border-gray-200 opacity-60" : (isSelected ? "bg-blue-50 border-blue-200" : "bg-background hover:bg-muted/50"),
                )}
              >
                <Checkbox
                  id={practice.id}
                  checked={isSelected}
                  disabled={isDisabled}
                  onCheckedChange={(checked) => handlePracticeChange(practice.id, checked as boolean)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor={practice.id} className={cn("cursor-pointer font-medium", isDisabled && "text-gray-600")}>
                    <div className="flex items-center gap-2">
                      <span>{practice.label}</span>
                      {isSelected && !isDisabled && (
                        <Badge variant="outline" className="text-xs text-blue-600 border-blue-200">
                          Selected
                        </Badge>
                      )}
                      {isDisabled && (
                        <Badge variant="outline" className="text-xs text-gray-500 border-gray-300">
                          Coming Soon
                        </Badge>
                      )}
                    </div>
                  </Label>
                  <p className={cn("text-sm mt-1", isDisabled ? "text-gray-600" : "text-muted-foreground")}>{practice.description}</p>
                </div>
                {!isDisabled && (
                  <TemplatePreview 
                    templateName={practice.id === "code-quality" ? "clean-code" : practice.id} 
                    displayName={practice.label} 
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}