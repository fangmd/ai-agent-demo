import { Agent } from '@mastra/core/agent'
import { openai } from '@ai-sdk/openai'
import { createDeepSeek, deepseek } from '@ai-sdk/deepseek'

export const deepseekAgent = new Agent({
  name: 'recruiter',
  instructions: `You are a recruiter.`,
  model: createDeepSeek({
    apiKey: process.env.DEEPSEEK_API_KEY ?? '',
    baseURL: 'https://api.deepseek.com',
  }).languageModel('deepseek-chat'),
})
