export * from "./db"
import { Annotation } from "@langchain/langgraph"
import { z } from "zod"
import { db } from "./db"
import { getQueryPromptTemplate } from "./prompt"
import { dsLLM2 } from "@/lib/llm"

const queryOutput = z.object({
  query: z.string().describe("Syntactically valid SQL query."),
})

const structuredLlm = dsLLM2 //.withStructuredOutput(queryOutput)

export const writeQuery = async (state: typeof InputStateAnnotation.State) => {
  const queryPromptTemplate = await getQueryPromptTemplate()

  const promptValue = await queryPromptTemplate.invoke({
    dialect: db.appDataSourceOptions.type,
    top_k: 10,
    table_info: await db.getTableInfo(),
    input: state.question,
  })
  const result = await structuredLlm.invoke(promptValue)
  console.log("result", result)
  return { query: result.query }
}

// 定义输入和输出的数据格式
const InputStateAnnotation = Annotation.Root({
  question: Annotation<string>,
})

const StateAnnotation = Annotation.Root({
  question: Annotation<string>,
  query: Annotation<string>,
  result: Annotation<string>,
  answer: Annotation<string>,
})
