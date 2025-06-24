"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Zap, Settings, Palette, Database, Globe, Code, Wrench } from "lucide-react"
import type { TechStack } from "@/types/rules"

export type PresetType =
  | "modern-react"
  | "vue-nuxt"
  | "angular-enterprise"
  | "svelte-kit"
  | "next-fullstack"
  | "laravel-tall"
  | "python-fastapi"
  | "custom"

interface PresetOption {
  id: PresetType
  name: string
  description: string
  technologies: string[]
  icon: React.ComponentType<{ className?: string }>
  popular?: boolean
  techStack: Partial<TechStack>
  bestPractices: string[]
}

const presetOptions: PresetOption[] = [
  {
    id: "modern-react",
    name: "Modern React Stack",
    description: "React + Next.js + TypeScript + Tailwind CSS",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    icon: Code,
    popular: true,
    techStack: {
      frontend: "react",
      metaFramework: "nextjs",
      styling: ["tailwind"],
      language: "typescript",
    },
    bestPractices: [
      "code-quality",
      "git-workflow",
      "performance",
      "security",
    ],
  },
  {
    id: "vue-nuxt",
    name: "Vue Stack",
    description: "Vue 3 + TypeScript + Tailwind CSS",
    technologies: ["Vue 3", "TypeScript", "Tailwind CSS"],
    icon: Globe,
    techStack: {
      frontend: "vue",
      styling: ["tailwind"],
      language: "typescript",
    },
    bestPractices: [
      "code-quality",
      "git-workflow",
      "performance",
      "security",
    ],
  },
  {
    id: "next-fullstack",
    name: "Next.js Full-Stack",
    description: "Next.js + TypeScript + Tailwind + Database Best Practices",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Database"],
    icon: Database,
    popular: true,
    techStack: {
      frontend: "react",
      metaFramework: "nextjs",
      styling: ["tailwind"],
      language: "typescript",
    },
    bestPractices: [
      "code-quality",
      "git-workflow",
      "performance",
      "security",
      "database",
    ],
  },
  {
    id: "laravel-tall",
    name: "Laravel Stack",
    description: "Laravel + Tailwind CSS",
    technologies: ["Laravel", "Tailwind CSS", "PHP"],
    icon: Wrench,
    techStack: {
      backend: "laravel",
      styling: ["tailwind"],
    },
    bestPractices: [
      "code-quality",
      "git-workflow",
      "performance",
      "security",
    ],
  },
  {
    id: "python-fastapi",
    name: "Python FastAPI",
    description: "FastAPI + Python + Database Best Practices",
    technologies: ["FastAPI", "Python", "Database"],
    icon: Zap,
    techStack: {
      backend: "fastapi",
      language: "python",
    },
    bestPractices: [
      "code-quality",
      "git-workflow",
      "performance",
      "security",
      "database",
    ],
  },
  {
    id: "svelte-kit",
    name: "Svelte Stack",
    description: "Svelte + TypeScript + Tailwind CSS",
    technologies: ["Svelte", "TypeScript", "Tailwind CSS"],
    icon: Palette,
    techStack: {
      frontend: "svelte",
      styling: ["tailwind"],
      language: "typescript",
    },
    bestPractices: [
      "code-quality",
      "git-workflow",
      "performance",
      "security",
    ],
  },
  {
    id: "angular-enterprise",
    name: "Angular Enterprise",
    description: "Angular + TypeScript + Testing Standards",
    technologies: ["Angular", "TypeScript", "RxJS"],
    icon: Settings,
    techStack: {
      frontend: "angular",
      language: "typescript",
    },
    bestPractices: [
      "code-quality",
      "git-workflow",
      "performance",
      "security",
      "testing",
    ],
  },
  {
    id: "custom",
    name: "Custom Configuration",
    description: "Start with essential practices, build your own stack",
    technologies: ["Essential Best Practices"],
    icon: Settings,
    popular: true,
    techStack: {},
    bestPractices: [
      "code-quality",
      "git-workflow",
      "performance",
      "security",
    ],
  },
]

interface PresetSelectorProps {
  selectedPreset: PresetType
  onPresetChange: (preset: PresetType) => void
  onTechStackChange: (techStack: Partial<TechStack>) => void
  onBestPracticesChange: (practices: string[]) => void
}

export function PresetSelector({
  selectedPreset,
  onPresetChange,
  onTechStackChange,
  onBestPracticesChange,
}: PresetSelectorProps) {
  const handlePresetSelect = (preset: PresetOption) => {
    onPresetChange(preset.id)
    onTechStackChange(preset.techStack)
    onBestPracticesChange(preset.bestPractices)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {presetOptions.map((preset) => {
          const Icon = preset.icon
          const isSelected = selectedPreset === preset.id

          return (
            <Card
              key={preset.id}
              className={cn(
                "cursor-pointer transition-all duration-200 hover:shadow-md",
                isSelected ? "ring-2 ring-primary bg-primary/5" : "hover:bg-slate-50",
              )}
              onClick={() => handlePresetSelect(preset)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={cn("p-2 rounded-lg", isSelected ? "bg-primary text-primary-foreground" : "bg-muted")}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{preset.name}</h3>
                      {preset.popular && (
                        <Badge variant="secondary" className="text-xs">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{preset.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {preset.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {selectedPreset !== "custom" && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Preset selected:</strong> All compatible technologies and essential best practices have been
            automatically configured. You can customize any selections in the sections below.
          </p>
        </div>
      )}
    </div>
  )
}