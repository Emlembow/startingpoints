"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { FileText, MessageSquare, Wind, GitBranch } from "lucide-react"

export type ToolType = "cursor" | "claude" | "windsurf" | "aider" | "all"

interface ToolOption {
  id: ToolType
  name: string
  description: string
  formats: string[]
  icon: React.ComponentType<{ className?: string }>
  popular?: boolean
}

const toolOptions: ToolOption[] = [
  {
    id: "cursor",
    name: "Cursor",
    description: "AI-first code editor with intelligent suggestions",
    formats: [".cursorrules", ".mdc files"],
    icon: FileText,
    popular: true,
  },
  {
    id: "claude",
    name: "Claude",
    description: "Anthropic's AI assistant for coding",
    formats: ["CLAUDE.md"],
    icon: MessageSquare,
    popular: true,
  },
  {
    id: "windsurf",
    name: "Windsurf",
    description: "AI-powered development environment",
    formats: [".windsurfrules"],
    icon: Wind,
  },
  {
    id: "aider",
    name: "Aider",
    description: "AI pair programming in your terminal",
    formats: ["CONVENTIONS.md"],
    icon: GitBranch,
  },
  {
    id: "all",
    name: "All Tools",
    description: "Generate files for all supported tools",
    formats: ["Multiple formats"],
    icon: FileText,
    popular: true,
  },
]

interface ToolSelectorProps {
  selectedTool: ToolType
  onToolChange: (tool: ToolType) => void
}

export function ToolSelector({ selectedTool, onToolChange }: ToolSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {toolOptions.map((tool) => {
        const Icon = tool.icon
        const isSelected = selectedTool === tool.id

        return (
          <Card
            key={tool.id}
            className={cn(
              "cursor-pointer transition-all duration-200 hover:shadow-md",
              isSelected ? "ring-2 ring-primary bg-primary/5" : "hover:bg-slate-50",
            )}
            onClick={() => onToolChange(tool.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={cn("p-2 rounded-lg", isSelected ? "bg-primary text-primary-foreground" : "bg-muted")}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{tool.name}</h3>
                    {tool.popular && (
                      <Badge variant="secondary" className="text-xs">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{tool.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {tool.formats.map((format) => (
                      <Badge key={format} variant="outline" className="text-xs">
                        {format}
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
  )
}
