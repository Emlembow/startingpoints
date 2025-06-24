import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const fileNames = searchParams.get('files')?.split(',') || []
    
    if (fileNames.length === 0) {
      return NextResponse.json({ error: 'No files requested' }, { status: 400 })
    }

    const filesDir = path.join(process.cwd(), 'files')
    const contents: Record<string, string> = {}

    for (const fileName of fileNames) {
      // Sanitize file name to prevent directory traversal
      const sanitizedFileName = path.basename(fileName)
      if (!sanitizedFileName.endsWith('.md')) {
        continue
      }

      const filePath = path.join(filesDir, sanitizedFileName)
      
      try {
        const content = await fs.readFile(filePath, 'utf-8')
        contents[sanitizedFileName] = content
      } catch (error) {
        console.error(`Failed to read file ${sanitizedFileName}:`, error)
        // Continue with other files even if one fails
      }
    }

    return NextResponse.json({ contents })
  } catch (error) {
    console.error('Error reading markdown files:', error)
    return NextResponse.json(
      { error: 'Failed to read markdown files' },
      { status: 500 }
    )
  }
}