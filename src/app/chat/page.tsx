'use client'
import { useState } from 'react'
import { useChat } from '@ai-sdk/react'

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({ api: '/api/chat' })

  return (
    <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 mb-8 w-full max-w-md rounded border border-gray-300 shadow-xl"
      >
        <input className="w-full p-2" value={input} placeholder="Say something..." onChange={handleInputChange} />
      </form>
    </div>
  )
}
