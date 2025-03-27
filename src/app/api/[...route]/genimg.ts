import { Hono } from 'hono'
import { experimental_generateImage as generateImage } from 'ai'
import { aiClaudeLLM, aiClaudeLLMWithLog, aiDeepseekLLMWithLog, openaiImage, qwenVLMAx } from '@/lib/llm'

const app = new Hono()

app.post('/', async (c) => {
  const { prompt }: { prompt: string } = await c.req.json()

  try {
    const { image } = await generateImage({
      model: openaiImage,
      prompt: prompt,
    })

    console.log('image', image)

    return c.json({
      base64: image.base64,
    })
  } catch (error) {
    console.error('Error generating image:', error)
    return c.json({ error: 'Failed to generate image' }, 500)
  }
})

export default app
