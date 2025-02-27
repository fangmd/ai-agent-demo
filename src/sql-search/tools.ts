import { QuerySqlTool } from "langchain/tools/sql"
import { db } from "./db"
import { StateAnnotation } from "./type"

export const executeQuery = async (state: typeof StateAnnotation.State) => {
  const executeQueryTool = new QuerySqlTool(db)
  return { result: await executeQueryTool.invoke(state.query) }
}
