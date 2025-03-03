'use client'

import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export default function Page() {
  useEffect(() => {
    const search = async () => {
      const response = await fetch('/api/recruiter')
      const data = await response.json()
      console.log('query', data)
    }
    search()
  }, [])

  return (
    <div className="flex flex-col items-center gap-4">
      AI Recruiter
      <div>
        <Button>开始</Button>
      </div>
    </div>
  )
}
