'use client'

import { useChat } from '@ai-sdk/react'
import { useScrollToBottom } from '@/hooks/use-scroll-to-bottom'
import { Markdown } from '@/components/markdown'
import { toast } from 'sonner'

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    api: '/api/chat2code',
    initialMessages: [],
    onFinish: () => {
      console.log('onFinish', messages)
    },
    onError: (error) => {
      toast.error('An error occured, please try again!')
    },
  })
  const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>()

  return (
    <div className="flex h-screen w-screen flex-col">
      <div className="flex h-10 w-full items-center justify-center bg-black uppercase text-white">chat2code</div>
      {/* body */}
      <div className="flex w-full flex-1 flex-row overflow-hidden">
        {/* left */}
        <div className="relative h-full w-2/4 bg-yellow-100" ref={messagesContainerRef}>
          <div className="box-border h-full overflow-auto px-2 pt-10">
            {messages.map((m) => {
              return (
                <div key={m.id}>
                  <div className="text-sm font-bold">{m.role === 'user' ? 'User: ' : 'AI: '}</div>
                  <Markdown>{m.content as string}</Markdown>
                </div>
              )
            })}
            <div ref={messagesEndRef} className="min-h-[24px] min-w-[24px] shrink-0 pb-40" />
          </div>

          <form
            onSubmit={handleSubmit}
            className="absolute bottom-0 left-4 right-8 mb-8 overflow-hidden rounded-lg shadow-xl"
          >
            {status}
            <input className="w-full p-2" value={input} placeholder="Say something..." onChange={handleInputChange} />
          </form>
        </div>
        {/* right */}
        <div className="w-2/4">
          {status === 'ready' && messages.length > 0 && (
            <iframe className="h-full w-full" srcDoc={messages[messages.length - 1].content} />
          )}
        </div>
      </div>
    </div>
  )
}
