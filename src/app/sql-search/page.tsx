import { db, writeQuery } from "@/sql-search"
import { getQueryPromptTemplate } from "@/sql-search/prompt"

export default async function Page() {
  const result = await db.run("SELECT * FROM Artist LIMIT 10;")
//   const queryPromptTemplate = await getQueryPromptTemplate()

  const query = await writeQuery({ question: "How many Employees are there?" })

  console.log("result", result)
  console.log("query", query)

  return (
    <div>
      <div>SqlSearch</div>
      <pre className="whitespace-pre-wrap break-words">
        {/* {JSON.stringify(query, null, 2)} */}
      </pre>
    </div>
  )
}
