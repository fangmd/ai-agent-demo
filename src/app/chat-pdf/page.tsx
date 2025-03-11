'use client'

import { useChat } from '@ai-sdk/react'
import { useScrollToBottom } from '@/hooks/use-scroll-to-bottom'
import { Markdown } from '@/components/markdown'
import { toast } from 'sonner'
import { useRef, useState } from 'react'

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    api: '/api/chat-pdf',
    initialMessages: [],
    onFinish: () => {
      console.log('onFinish', messages)
    },
    onError: (error) => {
      toast.error('An error occured, please try again!')
    },
  })
  const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>()

  const [files, setFiles] = useState<FileList | undefined>(undefined)
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex h-screen w-screen flex-col">
      <div className="flex h-10 w-full items-center justify-center bg-black uppercase text-white">copyweb</div>
      {/* body */}
      <div className="flex w-full flex-1 flex-row overflow-hidden">
        {/* left */}
        <div className="relative h-full w-full bg-yellow-100" ref={messagesContainerRef}>
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
            onSubmit={(event) => {
              handleSubmit(event, {
                experimental_attachments: files,
              })

              setFiles(undefined)

              if (fileInputRef.current) {
                fileInputRef.current.value = ''
              }
            }}
            className="absolute bottom-0 left-4 right-8 mb-8 overflow-hidden rounded-lg shadow-xl"
          >
            {status}
            <div className="flex gap-2">
              <input className="flex-1 p-2" value={input} placeholder="Say something..." onChange={handleInputChange} />

              <input
                type="file"
                className=""
                onChange={(event) => {
                  if (event.target.files) {
                    setFiles(event.target.files)
                  }
                }}
                multiple
                ref={fileInputRef}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
