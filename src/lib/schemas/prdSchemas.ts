import { PRD_TYPE } from '@/lib/types/PrdType'
import * as z from 'zod'

export const baseSchema = z.object({
  successMetrics: z.string().optional(),
  additional: z.string().optional(),
  audience: z.string().optional(),
  hasObjective: z.boolean(),
  hasSuccessMetrics: z.boolean(),
  hasPOC: z.boolean(),
  hasSecurity: z.boolean(),
  hasFunctionalReq: z.boolean(),
  hasNonFunctionalReq: z.boolean(),
  hasStakeholders: z.boolean(),
  hasBackground: z.boolean(),
  hasConstraints: z.boolean(),
  hasAssumptions: z.boolean(),
  hasTimeline: z.boolean(),
  hasDependency: z.boolean(),
})

export const solveProblemSchema = baseSchema.extend({
  type: z.literal(PRD_TYPE.SOLVE_PROBLEM),
  problem: z.string().min(1, 'Problem is required'),
  solution: z.string().min(1, 'Solution is required'),
})

export const createMVPSchema = baseSchema.extend({
  type: z.literal(PRD_TYPE.CREATE_MVP),
  productName: z.string().min(1, 'Product name is required'),
  valueProp: z.string().min(1, 'Value proposition is required'),
  featureList: z.string().min(1, 'Features are required'),
})

export const addFeatureSchema = baseSchema.extend({
  type: z.literal(PRD_TYPE.ADD_FEATURE),
  existingProduct: z.string().min(1, 'Existing product is required'),
  featureName: z.string().min(1, 'Feature name is required'),
  why: z.string().min(1, 'Why is required'),
})

export const othersSchema = baseSchema.extend({
  type: z.literal(PRD_TYPE.OTHERS),
  problem: z.string().min(1, 'Problem is required'),
})

export const prdFormSchema = z.discriminatedUnion('type', [
  solveProblemSchema,
  createMVPSchema,
  addFeatureSchema,
  othersSchema,
])

export type SolveProblemFormData = z.infer<typeof solveProblemSchema>
export type CreateMVPFormData = z.infer<typeof createMVPSchema>
export type AddFeatureFormData = z.infer<typeof addFeatureSchema>
export type OthersFormData = z.infer<typeof othersSchema>
export type PrdFormData = z.infer<typeof prdFormSchema>
