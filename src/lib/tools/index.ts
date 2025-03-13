import { z } from 'zod'
import { tool } from 'ai'
import { askForConfirmation } from './ask-for-confirmation'
import { getLocation } from './get-location'
import { getWeather } from './get-weather'

export const tools = {
  getWeather: getWeather,
  // askForConfirmation,
  getLocation,
}
