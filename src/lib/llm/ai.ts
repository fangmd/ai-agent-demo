import { deepseek } from '@ai-sdk/deepseek'
import { wrapLanguageModel } from 'ai'
import { logMiddleware } from '../middleware/log'

export const aiDeepseekLLM = deepseek('deepseek-reasoner')

export const aiDeepseekLLMWithLog = wrapLanguageModel({
  model: aiDeepseekLLM,
  middleware: logMiddleware,
})
