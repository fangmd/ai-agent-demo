import { Annotation } from "@langchain/langgraph"

// 定义输入的数据格式
export const InputStateAnnotation = Annotation.Root({
  question: Annotation<string>,
})

/** 定义了 graph 过程中，各个节点间数据传递的格式 */
export const StateAnnotation = Annotation.Root({
  question: Annotation<string>,
  query: Annotation<string>,
  result: Annotation<string>,
  answer: Annotation<string>,
})
