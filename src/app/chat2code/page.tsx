'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useChat } from '@ai-sdk/react'
import { text2codePromptV1 } from '@/lib/prompt/text2code'
export default function Page() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat2code',
    initialMessages: [],
  })

  return (
    <div className="flex h-screen w-screen flex-col">
      <div className="flex h-10 w-full items-center justify-center bg-black uppercase text-white">chat2code</div>
      {/* body */}
      <div className="flex w-full flex-1 flex-row overflow-hidden">
        {/* left */}
        <div className="relative h-full w-1/4 bg-yellow-100">
          <div className="box-border h-full overflow-auto px-2 pb-40 pt-10">
            {messages.map((m) => (
              <div key={m.id} className="whitespace-pre-wrap">
                {m.role === 'user' ? 'User: ' : 'AI: '}
                {m.content}
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="absolute bottom-0 left-4 right-8 mb-8 overflow-hidden rounded-lg shadow-xl"
          >
            <input className="w-full p-2" value={input} placeholder="Say something..." onChange={handleInputChange} />
          </form>
        </div>
        {/* right */}
        <div className="w-3/4"></div>
      </div>
    </div>
  )
}
