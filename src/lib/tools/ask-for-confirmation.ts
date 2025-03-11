import { z } from 'zod'
import { tool } from 'ai'

// client-side tool that starts user interaction:
export const askForConfirmation = tool({
  description: 'Ask the user for confirmation.',
  parameters: z.object({
    message: z.string().describe('The message to ask for confirmation.'),
  }),
})
