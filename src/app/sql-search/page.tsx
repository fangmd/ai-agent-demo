"use client"
import { useEffect, useState } from "react"

export default function Page() {
  const [query, setQuery] = useState()

  useEffect(() => {
    const search = async () => {
      const response = await fetch("/api/sql-search")
      const data = await response.json()
      console.log("query", data)
      setQuery(data.data.query)
    }
    search()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <div>SqlSearch</div>
      <pre className="whitespace-pre-wrap break-words">
        {query && JSON.stringify(query, null, 2)}
      </pre>
    </div>
  )
}
