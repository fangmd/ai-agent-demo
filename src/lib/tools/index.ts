import { z } from 'zod'
import { tool } from 'ai'
import { askForConfirmation } from './ask-for-confirmation'
import { getLocation } from './get-location'

export const tools = {
  weather: tool({
    description: 'Get the weather in a location',
    parameters: z.object({
      location: z.string().describe('The location to get the weather for'),
    }),
    execute: async ({ location }) => {
      // {
      //     location,
      //     temperature: 72 + Math.floor(Math.random() * 21) - 10,
      //   }
      return `The weather in ${location} is sunny with a temperature of ${72 + Math.floor(Math.random() * 21) - 10} degrees.`
    },
  }),
  askForConfirmation,
  getLocation,
}
