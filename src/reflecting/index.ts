import { deepseek } from '@ai-sdk/deepseek'
import { openai } from '@ai-sdk/openai'
import { generateText, generateObject } from 'ai'
import { z } from 'zod'

const deepSeekAgent = deepseek('deepseek-chat')

export async function translateWithFeedback(text: string, targetLanguage: string) {
  let currentTranslation = ''
  let iterations = 0
  const MAX_ITERATIONS = 3

  // Initial translation
  const { text: translation } = await generateText({
    model: deepSeekAgent, // use small model for first attempt
    system: 'You are an expert literary translator.',
    prompt: `Translate this text to ${targetLanguage}, preserving tone and cultural nuances:
    ${text}`,
  })

  currentTranslation = translation

  // Evaluation-optimization loop
  while (iterations < MAX_ITERATIONS) {
    // Evaluate current translation
    const { object: evaluation } = await generateObject({
      model: deepSeekAgent, // use a larger model to evaluate
      schema: z.object({
        qualityScore: z.number().min(1).max(10),
        preservesTone: z.boolean(),
        preservesNuance: z.boolean(),
        culturallyAccurate: z.boolean(),
        specificIssues: z.array(z.string()),
        improvementSuggestions: z.array(z.string()),
      }),
      system: 'You are an expert in evaluating literary translations.',
      prompt: `Evaluate this translation:

      Original: ${text}
      Translation: ${currentTranslation}

      Consider:
      1. Overall quality
      2. Preservation of tone
      3. Preservation of nuance
      4. Cultural accuracy`,
    })

    // Check if quality meets threshold
    if (
      evaluation.qualityScore >= 8 &&
      evaluation.preservesTone &&
      evaluation.preservesNuance &&
      evaluation.culturallyAccurate
    ) {
      break
    }

    // Generate improved translation based on feedback
    const { text: improvedTranslation } = await generateText({
      model: deepSeekAgent, // use a larger model
      system: 'You are an expert literary translator.',
      prompt: `Improve this translation based on the following feedback:
      ${evaluation.specificIssues.join('\n')}
      ${evaluation.improvementSuggestions.join('\n')}

      Original: ${text}
      Current Translation: ${currentTranslation}`,
    })

    currentTranslation = improvedTranslation
    iterations++
  }

  return {
    finalTranslation: currentTranslation,
    iterationsRequired: iterations,
  }
}

export async function translateWithFeedbackV2(text: string, targetLanguage: string) {
  let currentTranslation = ''
  let iterations = 0
  const MAX_ITERATIONS = 3

  // Initial translation
  const { text: translation } = await generateText({
    model: deepSeekAgent,
    system: '你是一名精通文学翻译的专家。',
    prompt: `将此文本翻译成 ${targetLanguage}, 并保留语气和文化细微差别:
      ${text}`,
  })

  currentTranslation = translation

  // Evaluation-optimization loop
  while (iterations < MAX_ITERATIONS) {
    // Evaluate current translation
    const { object: evaluation } = await generateObject({
      model: deepSeekAgent, // use a larger model to evaluate
      schema: z.object({
        qualityScore: z.number().min(1).max(10),
        preservesTone: z.boolean(),
        preservesNuance: z.boolean(),
        culturallyAccurate: z.boolean(),
        specificIssues: z.array(z.string()),
        improvementSuggestions: z.array(z.string()),
      }),
      system: '你是一名精通文学翻译评估的专家。',
      prompt: `评估以下翻译:
  
        原文: ${text}
        当前翻译: ${currentTranslation}
  
        请考虑:
        1. 整体质量
        2. 语气保留
        3. 细微差别保留
        4. 文化准确性`,
    })

    // Check if quality meets threshold
    if (
      evaluation.qualityScore >= 8 &&
      evaluation.preservesTone &&
      evaluation.preservesNuance &&
      evaluation.culturallyAccurate
    ) {
      break
    }

    // Generate improved translation based on feedback
    const { text: improvedTranslation } = await generateText({
      model: deepSeekAgent, // use a larger model
      system: '你是一名精通文学翻译的专家。',
      prompt: `根据以下反馈改进翻译:
        ${evaluation.specificIssues.join('\n')}
        ${evaluation.improvementSuggestions.join('\n')}
  
        原文: ${text}
        当前翻译: ${currentTranslation}`,
    })

    currentTranslation = improvedTranslation
    iterations++
  }

  return {
    finalTranslation: currentTranslation,
    iterationsRequired: iterations,
  }
}
