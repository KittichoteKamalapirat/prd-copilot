import { ObjectKeys, ObjectValues } from '../utils'

export const PRD_TYPE = {
  CREATE_MVP: 'createMVP',
  ADD_FEATURE: 'addFeature',
  SOLVE_PROBLEM: 'solveProblem',
  IMPROVE_EFFICIENCY: 'improveEfficiency',
  ENHANCE_UX: 'enhanceUX',
  DRIVE_REVENUE: 'driveRevenue',
  STRENGTHEN_RETENTION: 'strengthenRetention',
  ENABLE_CAPABILITY: 'enableCapability',
  TARGET_MARKET: 'targetMarket',
  IMPROVE_SCALABILITY: 'improveScalability',
  ALIGN_COMPLIANCE: 'alignCompliance',
  BUILD_BRAND: 'buildBrand',
  OTHERS: 'others',
} as const

export type PrdTypeKeys = ObjectKeys<typeof PRD_TYPE>
export type PrdTypeValues = ObjectValues<typeof PRD_TYPE>
