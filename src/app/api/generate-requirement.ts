import { getFirestore } from 'firebase-admin/firestore'

import { openai } from '@/lib/openai'
import { initAdmin } from '../../firebase/firebaseAdmin'
import { FbPrd } from '@/lib/types/FbPrd'

interface GenerateRequirementsParams {
  userId: string
  prdId: string
  input: FbPrd
}

export async function generateAndSaveRequirements({
  userId,
  prdId,
  input,
}: GenerateRequirementsParams) {
  try {
    await initAdmin()
    const firestore = getFirestore()
    // Fetch the PRD document from Firestore
    const prdDocRef = firestore.doc(`users/${userId}/prds/${prdId}`)
    const prdDoc = await prdDocRef.get()

    if (!prdDoc.exists) {
      throw new Error('PRD document not found')
    }

    const {
      type,
      additional,
      audience,
      successMetrics,
      hasObjective,
      hasSuccessMetrics,
      hasPOC,
      hasSecurity,
      hasFunctionalReq,
      hasNonFunctionalReq,
      hasStakeholders,
      hasBackground,
      hasConstraints,
      hasAssumptions,
      hasTimeline,
      hasDependency,
    } = input

    const prompt = `
    Generate a product requirement document based on the following details:
    ${type === 'addFeature' && `Existing product: ${input.existingProduct}`}
    ${type === 'addFeature' && `Feature Name: ${input.featureName}`}
    ${type === 'createMVP' && `Product Name: ${input.productName}`}
    ${type === 'solveProblem' || (type === 'others' && `Problem: ${input.problem}`)}
    ${type === 'createMVP' && `Value proposition: ${input.valueProp}`}
    ${type === 'solveProblem' && `Solution: ${input.solution}`}
    ${type === 'createMVP' && `Features: \n${input.featureList}`}
    Audience: ${audience}
    Success metrics: ${successMetrics}

    Include the following section
    ${hasObjective && '- Objective'} 
    ${hasSuccessMetrics && '- Success Metrics'}
    ${hasPOC && '- Proof of Concept'}
    ${hasSecurity && '- Security'}
    ${hasFunctionalReq && '- Functional Requirements'}
    ${hasNonFunctionalReq && '- Non-functional Requirements'}
    ${hasStakeholders && '- Stakeholders'}
    ${hasBackground && '- Background'}
    ${hasConstraints && '- Constraints'}
    ${hasAssumptions && '- Assumptions'}
    ${hasTimeline && '- Timeline'}
    ${hasDependency && '- Dependency'}
        
    Additional info: ${additional}
    `

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: prompt }],
      max_tokens: 500,
    })

    const requirements = response.choices[0].message.content

    console.log('response', response)
    console.log('requirements', requirements)

    // Save the generated requirements to the output field of the PRD document
    await prdDocRef.update({ output: requirements })

    return requirements
  } catch (error) {
    console.error('Error generating requirements:', error)
    throw new Error('Failed to generate requirements')
  }
}
