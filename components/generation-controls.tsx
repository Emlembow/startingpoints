"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Download, FileText, Loader2, CheckCircle } from "lucide-react"
import type { ToolType } from "@/components/tool-selector"

interface GenerationControlsProps {
  selectedTool: ToolType
  canGenerate: boolean
  isGenerating: boolean
  onGenerate: () => void
}

const toolFileFormats = {
  cursor: [".cursorrules (legacy)", ".mdc files (modern)"],
  claude: ["CLAUDE.md"],
  windsurf: [".windsurfrules"],
  aider: ["CONVENTIONS.md", ".aider.yaml"],
  all: ["Multiple formats for all tools"],
}

export function GenerationControls({ selectedTool, canGenerate, isGenerating, onGenerate }: GenerationControlsProps) {
  const formats = toolFileFormats[selectedTool] || []

  return (
    <div className="space-y-6">
      {/* Generation Summary */}
      <div className="p-4 bg-slate-50 rounded-lg">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Generation Summary
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Target Tool:</span>
            <Badge variant="outline">
              {selectedTool === "all" ? "All Tools" : selectedTool.charAt(0).toUpperCase() + selectedTool.slice(1)}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Output Format:</span>
            <div className="flex gap-1">
              {formats.map((format) => (
                <Badge key={format} variant="secondary" className="text-xs">
                  {format}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Generation Button */}
      <div className="flex flex-col items-center gap-4">
        <Button onClick={onGenerate} disabled={!canGenerate || isGenerating} size="lg" className="w-full max-w-md">
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating Rules...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Generate & Download Rules
            </>
          )}
        </Button>

        {!canGenerate && !isGenerating && (
          <p className="text-sm text-muted-foreground text-center">
            Please select a tool and configure your technology stack to generate rules.
          </p>
        )}

        {canGenerate && !isGenerating && (
          <div className="flex items-center gap-2 text-sm text-green-600">
            <CheckCircle className="h-4 w-4" />
            Ready to generate your custom rules file
          </div>
        )}
      </div>
    </div>
  )
}