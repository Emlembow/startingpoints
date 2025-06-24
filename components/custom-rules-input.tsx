"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { HelpCircle } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface CustomRulesInputProps {
  customRules: string
  onCustomRulesChange: (rules: string) => void
}

export function CustomRulesInput({ customRules, onCustomRulesChange }: CustomRulesInputProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
            5
          </div>
          Custom Rules & Requirements
        </CardTitle>
        <CardDescription>
          Add your own project-specific rules, product requirements, or user journeys
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="custom-rules">Custom Content</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">
                    Add any additional guidelines, product requirements, user journeys, or custom rules 
                    for your project. For Cursor, this will be added to the project-guidelines file. 
                    For other tools, it will be appended to the main rules file.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Textarea
            id="custom-rules"
            placeholder="Example:
## Product Requirements
- The app should support multi-tenant architecture
- All API responses must include rate limiting headers
- User authentication should use JWT tokens

## User Journey
1. User lands on the homepage
2. User signs up with email verification
3. User completes onboarding wizard

## Custom Guidelines
- Always use semantic HTML elements
- Implement error boundaries for all React components
- Follow the company's specific naming conventions"
            value={customRules}
            onChange={(e) => onCustomRulesChange(e.target.value)}
            className="min-h-[200px] font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            This content will be included in your generated rules file
          </p>
        </div>
      </CardContent>
    </Card>
  )
}