import { createDeepSeek } from '@ai-sdk/deepseek'
import { wrapLanguageModel } from 'ai'
import { logMiddleware } from '../middleware/log'
import { qwen } from 'qwen-ai-provider'
import { createQwen } from 'qwen-ai-provider'
import { createAnthropic } from '@ai-sdk/anthropic'

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
}).languageModel('qwen-omni-turbo')

const anthropic = createAnthropic({
  apiKey: process.env.CLOSE_API ?? '',
  baseURL: 'https://api.openai-proxy.org/anthropic/v1',
})

export const aiClaudeLLM = anthropic.languageModel('claude-3-7-sonnet-20250219')

export const aiClaudeLLMWithLog = wrapLanguageModel({
  model: aiClaudeLLM,
  middleware: logMiddleware,
})
