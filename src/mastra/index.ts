import { Mastra } from '@mastra/core'
import { candidateWorkflow } from './workflows/candidate-workflow'

// 6. Execute the Workflow
export const mastra = new Mastra({
  workflows: {
    candidateWorkflow,
  },
})
