'use client'

import { useState, useEffect } from 'react'
import { Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

interface TemplatePreviewProps {
  templateName: string
  displayName: string
}

export function TemplatePreview({ templateName, displayName }: TemplatePreviewProps) {
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open && !content) {
      loadTemplate()
    }
  }, [open])

  const loadTemplate = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/rules?files=${templateName}.md`)
      const data = await response.json()
      
      if (data.contents && data.contents[`${templateName}.md`]) {
        setContent(data.contents[`${templateName}.md`])
      }
    } catch (error) {
      console.error('Failed to load template:', error)
      setContent('Failed to load template content.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-6 w-6 ml-2"
          title={`Preview ${displayName} template`}
        >
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{displayName} Template</DialogTitle>
          <DialogDescription>
            Preview of the {templateName}.md template that will be included in your rules
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">Loading template...</p>
            </div>
          ) : (
            <pre className="text-sm whitespace-pre-wrap font-mono">
              {content}
            </pre>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}