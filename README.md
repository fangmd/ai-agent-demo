
# AI Agent demo


## Agent Framework

- https://github.com/vercel/ai
- https://mastra.ai/docs
- https://js.langchain.com/docs/introduction/


## 案例

- [x] simple chat
- [x] 基于数据库的问答系统
- [x] AI Recruiter
- [x] Self-Reflecting
- [x] tools usage


## 基于数据库的问答系统

https://js.langchain.com/docs/tutorials/sql_qa#system-prompt

流程：

- 问题转 sql (基于提示词)
- 执行 sql 的 tools (把 db 对象包装成 tool)
- 给用户最终回答 (基于提示词)

