import { ChatDeepSeek } from "@langchain/deepseek"

// llm deepseek 官方
export const dsLangchainLLM = new ChatDeepSeek({
  openAIApiKey: process.env.DEEPSEEK_API_KEY,
  temperature: 0, // 控制模型输出随机性的参数， 0 表示确定性输出
  model: "deepseek-chat",
  configuration: {
    baseURL: "https://api.deepseek.com",
  },
})

// llm 火山引擎
export const dsLLM2 = new ChatDeepSeek({
  openAIApiKey: process.env.DEEPSEEK_API_KEY_HUOS,
  temperature: 0, // 控制模型输出随机性的参数， 0 表示确定性输出
  model: "deepseek-r1-250120",
  configuration: {
    baseURL: "https://ark.cn-beijing.volces.com/api/v3",
  },
})

// llm
export const openaiLangchainLLM = new ChatDeepSeek({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0, // 控制模型输出随机性的参数， 0 表示确定性输出
  model: "gpt-4o-mini",
})
