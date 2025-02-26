import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const runtime = 'nodejs'

const app = new Hono().basePath('/api')

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello from Hono!',
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

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
