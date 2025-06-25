"use client"

import { useState, useCallback, useMemo } from "react"
import type { ToolType } from "@/components/tool-selector"
import type { PresetType } from "@/components/preset-selector"
import type { TechStack } from "@/types/rules"
import { generateRulesContent } from "@/lib/rules-generator"
import { downloadFile, downloadZip } from "@/lib/file-utils"

export function useRulesGenerator() {
  const [selectedTool, setSelectedTool] = useState<ToolType>("cursor")
  const [selectedPreset, setSelectedPreset] = useState<PresetType>("modern-react")
  const [techStack, setTechStack] = useState<Partial<TechStack>>({
    frontend: "react",
    metaFramework: "nextjs",
    styling: ["tailwind", "shadcn-ui"],
    language: "typescript",
    stateManagement: ["context-api"],
  })
  const [bestPractices, setBestPractices] = useState<string[]>([
    "code-quality",
    "git-workflow",
    "error-handling",
    "performance",
    "security",
  ])
  const [customRules, setCustomRules] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)

  const canGenerate = useMemo(() => {
    return selectedTool && (Object.keys(techStack).length > 0 || bestPractices.length > 0)
  }, [selectedTool, techStack, bestPractices])

  const generateRules = useCallback(async () => {
    if (!canGenerate) return

    setIsGenerating(true)

    try {
      // Generate rules content - now async
      const rulesContent = await generateRulesContent({
        tool: selectedTool,
        techStack,
        bestPractices,
        preset: selectedPreset,
        customRules,
      })

      // Download based on tool selection
      if (selectedTool === "all") {
        // Generate ZIP with multiple tool formats
        await downloadZip(rulesContent, "llm-rules-package")
      } else if (selectedTool === "cursor") {
        // Cursor always downloads as a zip with .cursor/rules structure
        await downloadZip(rulesContent, "cursor-rules")
      } else if (selectedTool === "claude" && rulesContent.files.length === 2) {
        // For Claude, download only the CLAUDE.md file (skip README)
        const claudeFile = rulesContent.files.find(f => f.filename === "CLAUDE.md")
        if (claudeFile) {
          downloadFile(claudeFile.content, claudeFile.filename)
        }
      } else {
        // Download single file or tool-specific package
        if (rulesContent.files.length === 1) {
          const file = rulesContent.files[0]
          downloadFile(file.content, file.filename)
        } else {
          await downloadZip(rulesContent, `${selectedTool}-rules`)
        }
      }
    } catch (error) {
      console.error("Failed to generate rules:", error)
      // In a real app, you'd show an error toast here
    } finally {
      setIsGenerating(false)
    }
  }, [selectedTool, techStack, bestPractices, selectedPreset, customRules, canGenerate])

  return {
    selectedTool,
    setSelectedTool,
    selectedPreset,
    setSelectedPreset,
    techStack,
    setTechStack,
    bestPractices,
    setBestPractices,
    customRules,
    setCustomRules,
    generateRules,
    isGenerating,
    canGenerate,
  }
}