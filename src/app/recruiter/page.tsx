'use client'

import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { resumeMock } from './constant'

export default function Page() {
  const [result, setResult] = useState()
  const [resumeText, setResumeText] = useState(resumeMock)

  const search = async () => {
    const response = await fetch('/api/recruiter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resumeText }),
    })
    const data = await response.json()
    console.log('query', data)

    setResult(data.data.result)
  }

  useEffect(() => {}, [])

  return (
    <div className="flex flex-col items-center gap-4">
      AI Recruiter
      <div className="w-full max-w-2xl">
        <textarea
          className="min-h-[300px] w-full rounded-lg border p-4"
          placeholder="请输入简历内容..."
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
        />
      </div>
      <div>
        <Button onClick={search}>开始</Button>
      </div>
      {result && (
        <div className="w-full max-w-2xl space-y-4 rounded-lg border p-4">
          <h2 className="text-xl font-semibold">分析结果</h2>

          {Object.entries(result).map(([stepId, stepResult]: [string, any]) => (
            <div key={stepId} className="space-y-2">
              <h3 className="font-medium">{stepId}</h3>

              {stepResult.status === 'success' && (
                <div className="rounded bg-gray-50 p-3">
                  <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(stepResult.output, null, 2)}</pre>
                </div>
              )}

              {stepResult.status === 'failed' && (
                <div className="rounded bg-red-50 p-3 text-red-600">{stepResult.error}</div>
              )}

              {stepResult.status === 'waiting' && <div className="text-gray-500">处理中...</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
