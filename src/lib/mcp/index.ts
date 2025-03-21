import { createToolSet } from './mcp'

export const getPuppeteerTools = async () => {
  const toolSet = await createToolSet({
    mcpServers: {
      // fetch: {
      //   command: 'npx',
      //   args: ['-y', '@michaellatman/mcp-get@latest'],
      // },
      // puppeteer: {
      //   command: 'npx',
      //   args: ['-y', '@modelcontextprotocol/server-puppeteer'],
      // },

      'filesystem-server': {
        command: 'node',
        args: [
          '/Users/double/projects/ai-agent-demo/filesystem-mcp-server/build/index.js',
          '/Users/double/projects/ai-agent-demo/data',
        ],
      },
    },
  })

  console.log(toolSet.tools)
  return toolSet.tools
}
