import { createDeepSeek } from '@ai-sdk/deepseek'
import { wrapLanguageModel } from 'ai'
import { logMiddleware } from '../middleware/log'

export const aiDeepseekLLM = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY_HUOS ?? '',
  baseURL: 'https://ark.cn-beijing.volces.com/api/v3',
}).languageModel('deepseek-r1-250120')

// export const aiDeepseekLLM = createDeepSeek({
//   apiKey: process.env.DEEPSEEK_API_KEY ?? '',
//   baseURL: 'https://api.deepseek.com',
// }).languageModel('deepseek-chat')

export const aiDeepseekLLMWithLog = wrapLanguageModel({
  model: aiDeepseekLLM,
  middleware: logMiddleware,
})
