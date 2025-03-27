'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function ImageGeneration() {
  const [prompt, setPrompt] = useState('Santa Claus driving a Cadillac')
  const [loading, setLoading] = useState(false)
  const [base64Image, setBase64Image] = useState('')

  const generateImage = async () => {
    if (!prompt) return

    setLoading(true)
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      const data = await response.json()
      console.log('img response')
      setBase64Image(data.base64)
    } catch (error) {
      console.error('Error generating image:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-12">
      <h1 className="mb-8 text-4xl font-bold">AI Image Generation</h1>

      <div className="w-full max-w-2xl space-y-4">
        <Textarea
          placeholder="Describe the image you want to generate..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[100px]"
        />

        <Button onClick={generateImage} disabled={loading || !prompt} className="w-full">
          {loading ? 'Generating...' : 'Generate Image'}
        </Button>

        {base64Image && (
          <div className="mt-8">
            <img
              src={`data:image/png;base64,${base64Image}`}
              alt="Generated image"
              className="rounded-lg shadow-lg"
              width={512}
              height={512}
            />
          </div>
        )}
      </div>
    </main>
  )
}
