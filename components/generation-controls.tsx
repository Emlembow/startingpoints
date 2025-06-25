"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Download, FileText, Loader2, CheckCircle, Zap, AlertCircle } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { ToolType } from "@/components/tool-selector"
import { useState } from "react"

interface GenerationControlsProps {
  selectedTool: ToolType
  canGenerate: boolean
  isGenerating: boolean
  onGenerate: (options: { compress: boolean }) => void
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
  const [compress, setCompress] = useState(false)

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
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Compression:</span>
            <Badge variant={compress ? "default" : "outline"} className="text-xs">
              {compress ? "Enabled (30-40% smaller)" : "Disabled"}
            </Badge>
          </div>
        </div>
      </div>

      <Separator />

      {/* Compression Toggle */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-primary" />
            <div className="space-y-1">
              <Label htmlFor="compress-toggle" className="text-base font-medium cursor-pointer">
                Enable <a href="https://github.com/Emlembow/promptpress" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">PromptPress</a> Compression
              </Label>
              <p className="text-sm text-muted-foreground">
                Reduce file size by 30-40% using linguistic preprocessing
              </p>
            </div>
          </div>
          <Switch
            id="compress-toggle"
            checked={compress}
            onCheckedChange={setCompress}
          />
        </div>

        {compress && (
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-sm">
              <strong>Trade-offs:</strong> Compressed files are optimized for AI models and will no longer be human-readable. 
              A small percentage of rules may not be understood by some AI models. However, you'll save significant 
              token costs and improve processing speed.
            </AlertDescription>
          </Alert>
        )}
      </div>

      <Separator />

      {/* Generation Button */}
      <div className="flex flex-col items-center gap-4">
        <Button onClick={() => onGenerate({ compress })} disabled={!canGenerate || isGenerating} size="lg" className="w-full max-w-md">
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