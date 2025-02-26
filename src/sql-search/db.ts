import { SqlDatabase } from "langchain/sql_db"
import { DataSource } from "typeorm"

const datasource = new DataSource({
  type: "sqlite",
  database: "Chinook.db",
})
export const db = await SqlDatabase.fromDataSourceParams({
  appDataSource: datasource,
})

export async function getArtists() {
  console.log("test")
  const result = await db.run("SELECT * FROM Artist LIMIT 10;")
  console.log(result)
  return result
}
