import type { GeneratedRules } from "@/types/rules"
import JSZip from "jszip"

export function downloadFile(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/plain" })
  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}

export async function downloadZip(rulesContent: GeneratedRules, packageName: string) {
  const zip = new JSZip()

  // Add files to zip with proper directory structure
  rulesContent.files.forEach((file) => {
    const filePath = file.path ? `${file.path}${file.filename}` : file.filename
    zip.file(filePath, file.content)
  })

  // Generate the zip file
  const blob = await zip.generateAsync({ type: "blob" })
  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.download = `${packageName}.zip`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}