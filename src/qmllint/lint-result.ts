import { z } from 'zod'

// Converted from python/tests/assets/qml/schema.json
export const qmlLintSuggestionSchema = z.object({
  message: z.string(),
  line: z.number().int(),
  column: z.number().int(),
  charOffset: z.number().int(),
  length: z.number().int(),
  replacement: z.string(),
  isHint: z.boolean(),
  filename: z.string().optional(),
})

const qmlLintWarningSchema = z.object({
  type: z.enum(['debug', 'warning', 'critical', 'fatal', 'info', 'unknown']),
  id: z.string().optional(),
  line: z.number().int().optional(),
  column: z.number().int().optional(),
  charOffset: z.number().int().optional(),
  length: z.number().int().optional(),
  message: z.string(),
  suggestions: z.array(qmlLintSuggestionSchema).optional(),
})

export const qmlLintResultSchema = z.object({
  files: z.array(
    z.object({
      filename: z.string(),
      warnings: z.array(qmlLintWarningSchema),
      success: z.boolean(),
    }),
  ),
  revision: z.number(), // Should not be too strict to be 3 only
})

export type QmlLintResult = z.infer<typeof qmlLintResultSchema>

export type QmlLintWarning = z.infer<typeof qmlLintWarningSchema>

export type QmlLintSuggestion = z.infer<typeof qmlLintSuggestionSchema>
