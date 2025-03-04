'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function Page() {
  const [result, setResult] = useState<{ finalTranslation: string; iterationsRequired: number }>(null)
  const [input, setInput] = useState('')

  const start = async () => {
    const response = await fetch('/api/reflecting', {
      method: 'POST',
      body: JSON.stringify({ text: input }),
    })
    const data = await response.json()
    console.log('query', data)
    setResult(data.data.result)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      AI Agent Self-Reflecting
      <div className="flex w-[300px] flex-col gap-2">
        <Input placeholder="请输入内容" value={input} onChange={(e) => setInput(e.target.value)} />
        <Button onClick={start}>开始</Button>
      </div>
      <div className="flex w-[300px] flex-col items-start gap-2">
        <p>结果</p>
        <p>翻译: {result?.finalTranslation}</p>
        <p>迭代次数: {result?.iterationsRequired}</p>
      </div>
    </div>
  )
}
