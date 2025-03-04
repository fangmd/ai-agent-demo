import { Step, Workflow } from '@mastra/core/workflows'
import { z } from 'zod'
import { deepseekAgent } from '../agents'

// 2. Step One: Gather Candidate Info
const gatherCandidateInfo = new Step({
  id: 'gatherCandidateInfo',
  inputSchema: z.object({
    resumeText: z.string(),
  }),
  outputSchema: z.object({
    candidateName: z.string(),
    isTechnical: z.boolean(),
    specialty: z.string(),
    resumeText: z.string(),
  }),
  execute: async ({ context }) => {
    const resumeText = context?.getStepResult<{
      resumeText: string
    }>('trigger')?.resumeText

    const prompt = `
          Extract details from the resume text:
          "${resumeText}"
        `

    const res = await deepseekAgent.generate(prompt, {
      output: z.object({
        candidateName: z.string(),
        isTechnical: z.boolean(),
        specialty: z.string(),
        resumeText: z.string(),
      }),
    })

    return res.object
  },
})

// 3. Technical Question Step
interface CandidateInfo {
  candidateName: string
  isTechnical: boolean
  specialty: string
  resumeText: string
}
const askAboutSpecialty = new Step({
  id: 'askAboutSpecialty',
  outputSchema: z.object({
    question: z.string(),
  }),
  execute: async ({ context }) => {
    const candidateInfo = context?.getStepResult<CandidateInfo>('gatherCandidateInfo')

    const prompt = `
            You are a recruiter. Given the resume below, craft a short question
            for ${candidateInfo?.candidateName} about how they got into "${candidateInfo?.specialty}".
            Resume: ${candidateInfo?.resumeText}
          `
    const res = await deepseekAgent.generate(prompt)

    return { question: res?.text?.trim() || '' }
  },
})

// 4. Behavioral Question Step

const askAboutRole = new Step({
  id: 'askAboutRole',
  outputSchema: z.object({
    question: z.string(),
  }),
  execute: async ({ context }) => {
    const candidateInfo = context?.getStepResult<CandidateInfo>('gatherCandidateInfo')

    const prompt = `
            You are a recruiter. Given the resume below, craft a short question
            for ${candidateInfo?.candidateName} asking what interests them most about this role.
            Resume: ${candidateInfo?.resumeText}
          `
    const res = await deepseekAgent.generate(prompt)
    return { question: res?.text?.trim() || '' }
  },
})

// 5. Define the Workflow
const candidateWorkflow = new Workflow({
  name: 'candidate-workflow',
  triggerSchema: z.object({
    resumeText: z.string(),
  }),
})

candidateWorkflow
  .step(gatherCandidateInfo)
  .then(askAboutSpecialty, {
    when: { 'gatherCandidateInfo.isTechnical': true },
  })
  .after(gatherCandidateInfo)
  .step(askAboutRole, {
    when: { 'gatherCandidateInfo.isTechnical': false },
  })

candidateWorkflow.commit()

export { candidateWorkflow }
