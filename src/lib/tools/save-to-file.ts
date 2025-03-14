import { z } from 'zod'
import { tool } from 'ai'
import * as fs from 'fs/promises'
import * as path from 'path'

export const saveToFile = tool({
  description:
    'Save a string to a local file. The filename will be auto-generated with timestamp. Please confirm the content and filename before saving: Content: {content}, Filename: {timestamp}.{extension}',
  parameters: z.object({
    content: z.string().describe('The string content to save to file'),
    extension: z.string().default('md').describe('File extension (default: md)'),
  }),
  execute: async ({ content, extension }) => {
    try {
      // Generate filename with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      const filename = `${timestamp}.${extension}`

      // Ensure the filename is safe and within the current directory
      const safePath = path.join(process.cwd(), 'data', filename)

      // Ensure the data directory exists
      await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true })

      // Write the content to file
      await fs.writeFile(safePath, content, 'utf-8')

      return `Successfully saved content to file: ${filename}`
    } catch (error: any) {
      return `Error saving to file: ${error.message}`
    }
  },
})
