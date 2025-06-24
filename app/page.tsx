"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Download, FileText, Zap, Shield, Code2 } from "lucide-react"
import { ToolSelector } from "@/components/tool-selector"
import { PresetSelector } from "@/components/preset-selector"
import { TechStackSelector } from "@/components/tech-stack-selector"
import { BestPracticesSelector } from "@/components/best-practices-selector"
import { GenerationControls } from "@/components/generation-controls"
import { CustomRulesInput } from "@/components/custom-rules-input"
import { useRulesGenerator } from "@/hooks/use-rules-generator"
import Image from "next/image"

export default function HomePage() {
  const {
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
  } = useRulesGenerator()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image 
                src="/startingpoints-logo.png" 
                alt="StartingPoints Logo" 
                width={300} 
                height={90}
                className="h-16 md:h-20 w-auto"
                priority
              />
            </div>
            <Button variant="outline" size="sm" asChild className="bg-white text-black">
              <a href="https://github.com/Emlembow/startingpoints" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                startingpoints
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Your Starting Point for AI-Powered Development</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Generate customized rules files for Cursor, Claude, Windsurf, and Aider. Set the perfect foundation 
            for your AI coding assistant with battle-tested best practices.
          </p>
        </div>

        {/* Configuration Form */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Tool Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  1
                </div>
                Select Target Tool
              </CardTitle>
              <CardDescription>Choose which AI coding tool you want to generate rules for</CardDescription>
            </CardHeader>
            <CardContent>
              <ToolSelector selectedTool={selectedTool} onToolChange={setSelectedTool} />
            </CardContent>
          </Card>

          {/* Preset Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  2
                </div>
                Choose Configuration
              </CardTitle>
              <CardDescription>Start with a popular preset or build a custom configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <PresetSelector
                selectedPreset={selectedPreset}
                onPresetChange={setSelectedPreset}
                onTechStackChange={setTechStack}
                onBestPracticesChange={setBestPractices}
              />
            </CardContent>
          </Card>

          {/* Technology Stack */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  3
                </div>
                Customize Technology Stack
              </CardTitle>
              <CardDescription>Fine-tune your technology selections (auto-filled from preset)</CardDescription>
            </CardHeader>
            <CardContent>
              <TechStackSelector
                techStack={techStack}
                onTechStackChange={setTechStack}
                selectedPreset={selectedPreset}
              />
            </CardContent>
          </Card>

          {/* Best Practices */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  4
                </div>
                Development Best Practices
              </CardTitle>
              <CardDescription>
                Essential practices are included by default, add optional ones as needed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BestPracticesSelector bestPractices={bestPractices} onBestPracticesChange={setBestPractices} />
            </CardContent>
          </Card>

          {/* Custom Rules */}
          <CustomRulesInput customRules={customRules} onCustomRulesChange={setCustomRules} />

          {/* Generation Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  6
                </div>
                Generate & Download
              </CardTitle>
              <CardDescription>Create your customized rules file and download it instantly</CardDescription>
            </CardHeader>
            <CardContent>
              <GenerationControls
                selectedTool={selectedTool}
                canGenerate={canGenerate}
                isGenerating={isGenerating}
                onGenerate={generateRules}
              />
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            Built with ❤️ for the AI coding community • Powered by{" "}
            <a
              href="https://github.com/Emlembow/startingpoints"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              startingpoints
            </a>
          </p>
        </footer>
      </main>
    </div>
  )
}
