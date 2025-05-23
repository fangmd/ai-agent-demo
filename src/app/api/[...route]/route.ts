import { runSqlSearchGraph } from '@/sql-search'
import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { streamText, Message, experimental_generateImage as generateImage } from 'ai'
import { deepseek } from '@ai-sdk/deepseek'
import { mastra } from '@/mastra'
import { translateWithFeedback, translateWithFeedbackV2 } from '@/reflecting'
import { aiClaudeLLM, aiClaudeLLMWithLog, aiDeepseekLLMWithLog, openaiImage, qwenVLMAx } from '@/lib/llm'
import { png2codePromptV1, text2codePromptV1 } from '@/lib/prompt/text2code'
import { tools } from '@/lib/tools'
import { getPuppeteerTools } from '@/lib/mcp'
import { openai } from '@ai-sdk/openai'
import genimg from './genimg'

export const runtime = 'nodejs'

const app = new Hono().basePath('/api')

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello from Hono!',
  })
})

app.get('/sql-search', async (c) => {
  // const query = await writeQuery({
  //   question: "How many Employees are there?",
  // })

  runSqlSearchGraph('How many Employees are there?')

  // console.log("result", result)
  // console.log("query", query)

  return c.json({
    code: 200,
    message: 'Hello from Hono!',
    data: {},
  })
})

app.post('/chat', async (c) => {
  console.log('chat')

  const { messages }: { messages: Message[] } = await c.req.json()

  const result = streamText({
    model: deepseek('deepseek-reasoner'),
    messages,
  })

  return result.toDataStreamResponse()
})

app.post('/chat2code', async (c) => {
  const { messages }: { messages: Message[] } = await c.req.json()

  const result = streamText({
    model: aiDeepseekLLMWithLog,
    // system: text2codePromptV1,
    messages,
  })

  return result.toDataStreamResponse()
})

app.post('/copyweb', async (c) => {
  const { messages }: { messages: Message[] } = await c.req.json()

  const result = streamText({
    model: aiClaudeLLM,
    system: png2codePromptV1,
    messages,
  })

  return result.toDataStreamResponse()
})

app.post('/chat-pdf', async (c) => {
  const { messages }: { messages: Message[] } = await c.req.json()

  const result = streamText({
    model: aiClaudeLLM,
    system: 'You are a helpful assistant that can answer questions about the uploaded PDF file.',
    messages,
  })

  return result.toDataStreamResponse()
})

app.post('/chat-tools', async (c) => {
  const { messages }: { messages: Message[] } = await c.req.json()

  const result = streamText({
    model: aiDeepseekLLMWithLog,
    // system: 'You are a helpful assistant that can answer questions about the uploaded PDF file.',
    messages,
    tools: { ...tools },
  })

  return result.toDataStreamResponse()
})

app.post('/reflecting', async (c) => {
  const { text }: { text: string } = await c.req.json()
  const result = await translateWithFeedbackV2(text, 'zh')
  console.log('result', result)

  return c.json({
    code: 200,
    message: 'Hello from Hono!',
    data: {
      result,
    },
  })
})

app.post('/recruiter', async (c) => {
  const { resumeText }: { resumeText: string } = await c.req.json()

  const { runId, start } = mastra.getWorkflow('candidateWorkflow').createRun()
  console.log('Run', runId)
  const runResult = await start({
    triggerData: {
      resumeText: resumeText,
    },
  })
  console.log('Final output:', runResult.results)

  return c.json({
    code: 200,
    message: 'Hello from Hono!',
    data: {
      result: runResult.results,
    },
  })
})

app.get('/web3/fmList', (c) => {
  return c.json({
    code: 200,
    message: 'Hello from Hono!',
    data: {
      list: [
        {
          platform: '币安',
          type: '理财',
          coin: 'USDT',
          apy: '2.5%',
        },
        {
          platform: 'AAVE',
          type: '质押',
          coin: 'USDT',
          apy: '2.31%',
        },
      ],
    },
  })
})

app.route('/genimg', genimg)

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
