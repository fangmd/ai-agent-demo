import { pull } from "langchain/hub"
import { ChatPromptTemplate } from "@langchain/core/prompts"

/**
 * 获取提示词
 * 
 * Given an input question, create a syntactically correct {dialect} query to run to help find the answer. Unless the user specifies in his question a specific number of examples they wish to obtain, always limit your query to at most {top_k} results. You can order the results by a relevant column to return the most interesting examples in the database.

Never query for all the columns from a specific table, only ask for a the few relevant columns given the question.

Pay attention to use only the column names that you can see in the schema description. Be careful to not query for columns that do not exist. Also, pay attention to which column is in which table.

Only use the following tables:
{table_info}

Question: {input}

 */
export async function getQueryPromptTemplate() {
  const queryPromptTemplate = await pull<ChatPromptTemplate>(
    "langchain-ai/sql-query-system-prompt"
  )

  console.log(queryPromptTemplate.promptMessages[0].lc_kwargs.prompt.template)
  return queryPromptTemplate
}
