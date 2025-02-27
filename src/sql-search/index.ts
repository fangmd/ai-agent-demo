export * from "./db"
import { z } from "zod"
import { db } from "./db"
import { getQueryPromptTemplate } from "./prompt"
import { dsLangchainLLM } from "@/lib/llm"
import { ConsoleCallbackHandler } from "@langchain/core/tracers/console"
import { InputStateAnnotation, StateAnnotation } from "./type"
import { CompiledStateGraph, StateGraph } from "@langchain/langgraph"
import { executeQuery } from "./tools"

export const writeQuery = async (state: typeof InputStateAnnotation.State) => {
  const queryPromptTemplate = await getQueryPromptTemplate()

  const promptValue = await queryPromptTemplate.invoke(
    {
      dialect: db.appDataSourceOptions.type,
      top_k: 10,
      table_info: await db.getTableInfo(),
      input: state.question,
    },
    {
      callbacks: [new ConsoleCallbackHandler()],
    }
  )

  const queryOutput = z.object({
    query: z.string().describe("Syntactically valid SQL query."),
  })
  const structuredLlm = dsLangchainLLM.withStructuredOutput(queryOutput)

  const result = await structuredLlm.invoke(promptValue, {
    callbacks: [new ConsoleCallbackHandler()],
  })
  console.log("result", result)
  return { query: result.query }
}

/** 根据所有内容，生成一个最后给用户的答案 */
export const generateAnswer = async (state: typeof StateAnnotation.State) => {
  const promptValue =
    "Given the following user question, corresponding SQL query, " +
    "and SQL result, answer the user question.\n\n" +
    `Question: ${state.question}\n` +
    `SQL Query: ${state.query}\n` +
    `SQL Result: ${state.result}\n`
  const response = await dsLangchainLLM.invoke(promptValue, {
    callbacks: [new ConsoleCallbackHandler()],
  })
  return { answer: response.content }
}

/** 通过 graph 组合多个提示词的调用 */
export const sqlSearchGraph = () => {
  const graphBuilder = new StateGraph({
    stateSchema: StateAnnotation,
  })
    .addNode("writeQuery", writeQuery)
    .addNode("executeQuery", executeQuery)
    .addNode("generateAnswer", generateAnswer)
    .addEdge("__start__", "writeQuery")
    .addEdge("writeQuery", "executeQuery")
    .addEdge("executeQuery", "generateAnswer")
    .addEdge("generateAnswer", "__end__")

  const graph = graphBuilder.compile()
  return graph
}

export const runSqlSearchGraph = async (question: string) => {
  const inputs = { question: question }

  const graph = sqlSearchGraph()

  console.log(inputs)
  console.log("\n====\n")
  for await (const step of await graph.stream(inputs, {
    streamMode: "updates",
  })) {
    console.log(step)
    console.log("\n====\n")
  }
}
