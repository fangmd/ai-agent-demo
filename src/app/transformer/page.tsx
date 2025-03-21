'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * pnpm dev-webpack
 * 需要使用 webpack 模式启动 app
 */
export default function Home() {
  const [result, setResult] = useState(null)
  const [ready, setReady] = useState(null)

  // Create a reference to the worker object.
  const worker = useRef(null)

  // We use the `useEffect` hook to set up the worker as soon as the `App` component is mounted.
  useEffect(() => {
    console.log('worker', worker)
    if (!worker.current) {
      // Create the worker if it does not yet exist.
      worker.current = new Worker(new URL('../worker.js', import.meta.url), {
        type: 'module',
      })
      console.log('worker.current', worker.current)
    }

    // Create a callback function for messages from the worker thread.
    const onMessageReceived = (e: MessageEvent) => {
      switch (e.data.status) {
        case 'initiate':
          setReady(false)
          break
        case 'ready':
          setReady(true)
          break
        case 'complete':
          setResult(e.data.output[0])
          break
      }
    }

    // Attach the callback function as an event listener.
    worker.current.addEventListener('message', onMessageReceived)

    // Define a cleanup function for when the component is unmounted.
    return () => worker.current.removeEventListener('message', onMessageReceived)
  }, [])

  const classify = useCallback((text) => {
    if (worker.current) {
      console.log('worker', text)
      worker.current.postMessage({ text })
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12">
      <h1 className="mb-2 text-center text-5xl font-bold">Transformers.js</h1>
      <h2 className="mb-4 text-center text-2xl">Next.js template</h2>

      <input
        className="mb-4 w-full max-w-xs rounded border border-gray-300 p-2"
        type="text"
        placeholder="Enter text here"
        onInput={(e) => {
          classify(e.target.value)
        }}
      />

      {ready !== null && (
        <pre className="rounded bg-gray-100 p-2">
          {!ready || !result ? 'Loading...' : JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  )
}
