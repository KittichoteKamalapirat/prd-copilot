// src/hooks/useCreatePrdInFirestore.ts
import { PrdFormData } from '@/lib/schemas/prdSchemas'
import { doc, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import { LocalStorage } from '../app/enums/LocalStorage'

import { firestore } from '../firebase/config'

export const useCreatePrdInFirestore = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const createPrdInFirestore = async (userId: string, prdId: string) => {
    try {
      setIsLoading(true)

      // Get unauthPrdInput from localStorage
      const unauthPrdInput = localStorage.getItem(LocalStorage.UNAUTH_PRD_INPUT)
      if (!unauthPrdInput) throw new Error('No PRD input found in local storage')

      // Parse JSON and cast to PrdFormData
      const prdData: PrdFormData = JSON.parse(unauthPrdInput)

      // Save each field to Firestore under users/{userId}/prds/{id}
      const prdDocRef = doc(firestore, `users/${userId}/prds/${prdId}`)
      await setDoc(prdDocRef, { ...prdData, prdId })

      return prdId
    } catch (error) {
      console.error('Error creating PRD in Firestore:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return { createPrdInFirestore, isLoading }
}
