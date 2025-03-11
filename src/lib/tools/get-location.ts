import { z } from 'zod'

// client-side tool that is automatically executed on the client:
export const getLocation = {
  description: 'Get the user location. Always ask for confirmation before using this tool.',
  parameters: z.object({}),
}
