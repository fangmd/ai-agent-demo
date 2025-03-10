import { createDeepSeek } from '@ai-sdk/deepseek'
import { wrapLanguageModel } from 'ai'
import { logMiddleware } from '../middleware/log'
import { qwen } from 'qwen-ai-provider'
import { createQwen } from 'qwen-ai-provider'

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

/** 支持图片输入 */
export const qwenVLMAx = createQwen({
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
  apiKey: process.env.QWEN_API_KEY ?? '',
}).languageModel('qwen-vl-plus')
