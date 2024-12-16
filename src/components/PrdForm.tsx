'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'

import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { PRD_TYPE } from '@/lib/types/PrdType'
import { zodResolver } from '@hookform/resolvers/zod'
import { SendHorizontal } from 'lucide-react'
import { Controller, FieldErrors, FieldErrorsImpl, useForm } from 'react-hook-form'
import * as z from 'zod'
import { LocalStorage } from '../app/enums/LocalStorage'

import { useStore } from '../lib/store'
import { generateFakeChunks } from '../constants/generateFakeChunks'

interface Option {
  label: string
  value: string
}

export const PRD_TYPE_OPTIONS: Option[] = [
  { label: 'Solve a specific problem', value: PRD_TYPE.SOLVE_PROBLEM },
  { label: 'Create an MVP', value: PRD_TYPE.CREATE_MVP },
  { label: 'Add a new feature', value: PRD_TYPE.ADD_FEATURE },
  { label: 'Others', value: PRD_TYPE.OTHERS },
  // {
  //   label: 'Improve Efficiency or Performance',
  //   value: PRD_TYPE.IMPROVE_EFFICIENCY,
  // },
  // { label: 'Enhance User Experience (UX)', value: PRD_TYPE.ENHANCE_UX },
  // {
  //   label: 'Drive Revenue Growth or Monetization',
  //   value: PRD_TYPE.DRIVE_REVENUE,
  // },
  // {
  //   label: 'Strengthen Customer Retention or Engagement',
  //   value: PRD_TYPE.STRENGTHEN_RETENTION,
  // },
  // { label: 'Enable a New Capability', value: PRD_TYPE.ENABLE_CAPABILITY },
  // { label: 'Target a New Market', value: PRD_TYPE.TARGET_MARKET },
  // {
  //   label: 'Improve Scalability or Reliability',
  //   value: PRD_TYPE.IMPROVE_SCALABILITY,
  // },
  // {
  //   label: 'Align with Regulatory Compliance or Security Standards',
  //   value: PRD_TYPE.ALIGN_COMPLIANCE,
  // },
  // {
  //   label: 'Build Brand Identity or Market Differentiation',
  //   value: PRD_TYPE.BUILD_BRAND,
  // },
]
// Define schema using zod
const baseSchema = z.object({
  // productName: z.string().min(1, 'Product name is required'),

  // overview: z.string().min(1, 'Overview is required'),

  // userFeedback: z.string(),
  successMetrics: z.string().optional(),
  additional: z.string().optional(),
  audience: z.string().optional(),

  //   checkboxes
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

const solveProblemSchema = baseSchema.extend({
  type: z.literal(PRD_TYPE.SOLVE_PROBLEM),
  problem: z.string().min(1, 'Problem is required'),
  solution: z.string().min(1, 'Solution is required'),
})

const createMVPSchema = baseSchema.extend({
  type: z.literal(PRD_TYPE.CREATE_MVP),
  productName: z.string().min(1, 'Product name is required'),
  valueProp: z.string().min(1, 'Value proposition is required'),
  featureList: z.string().min(1, 'Features are required'),
})

const addFeatureSchema = baseSchema.extend({
  type: z.literal(PRD_TYPE.ADD_FEATURE),
  existingProduct: z.string().min(1, 'Existing product is required'),
  featureName: z.string().min(1, 'Feature name is required'),
  why: z.string().min(1, 'Why is required'),
})

const othersSchema = baseSchema.extend({
  type: z.literal(PRD_TYPE.OTHERS),
  problem: z.string().min(1, 'Problem is required'),
})

// const improveEfficiencySchema = baseSchema.extend({
//   type: z.literal(PRD_TYPE.IMPROVE_EFFICIENCY),
//   inefficiencies: z.string().min(1, 'Inefficiencies are required'),
//   metrics: z.string().min(1, 'Metrics are required'),
// })

// const enhanceUxSchema = baseSchema.extend({
//   type: z.literal(PRD_TYPE.ENHANCE_UX),
//   inefficiencies: z.string().min(1, 'Inefficiencies are required'),
//   metrics: z.string().min(1, 'Metrics are required'),
// })

const prdFormSchema = z.discriminatedUnion('type', [
  solveProblemSchema,
  createMVPSchema,
  addFeatureSchema,
  othersSchema,
  // improveEfficiencySchema,
  // enhanceUxSchema,
])

type SolveProblemFormData = z.infer<typeof solveProblemSchema>
type CreateMVPFormData = z.infer<typeof createMVPSchema>
type AddFeatureFormData = z.infer<typeof addFeatureSchema>
type OthersFormData = z.infer<typeof othersSchema>
export type PrdFormData = z.infer<typeof prdFormSchema>

interface Props {
  isAuth?: boolean
  isPro: boolean
  initialData?: PrdFormData
}

export const PrdForm = ({ isPro, initialData }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid, isDirty },
  } = useForm<PrdFormData>({
    resolver: zodResolver(prdFormSchema),
    defaultValues: initialData || {
      hasObjective: true,
      hasSuccessMetrics: true,
      hasPOC: true,
      hasSecurity: true,
      hasFunctionalReq: true,
      hasNonFunctionalReq: true,
      hasStakeholders: true,
      hasBackground: true,
      hasConstraints: true,
      hasAssumptions: true,
      hasTimeline: true,
      hasDependency: true,
    },
  })

  const { set, setText } = useStore((state) => state.prd)
  const selectedPrdType = watch('type')

  // const onSubmit = async (data: FormData) => {
  //   try {
  //     const response = await fetch("/api/generate-requirements", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     const result = await response.json();
  //     set({ text: result.requirements });
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   }
  // };

  const handleFakeSubmit = async (data: PrdFormData) => {
    // Fake stream for not logged in users
    const delay = new Promise((resolve) => setTimeout(resolve, 1000))
    await delay

    let index = 0
    set({ isBlurred: true })

    const fakeChunks = generateFakeChunks(data)

    const interval = setInterval(() => {
      if (index < fakeChunks.length) {
        const chunk = fakeChunks[index]
        setText((prev) => prev + chunk) // Add a space after each chunk

        index++
      } else {
        clearInterval(interval)
      }
    }, 10) // Adjust the interval time as needed
  }

  const onSubmit = async (data: PrdFormData) => {
    if (!isPro) {
      handleFakeSubmit(data)
      localStorage.setItem(LocalStorage.UNAUTH_PRD_INPUT, JSON.stringify(data))
      return
    }

    try {
      const response = await fetch('/api/generate-requirements-stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let done = false

      while (!done) {
        const { value, done: doneReading } = await reader!.read()
        done = doneReading
        const chunk = decoder.decode(value)
        setText((prev) => prev + chunk)
        set({ isBlurred: true })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Section 1: About Product */}
      <div>
        <div className="space-y-4">
          <div>
            <Label htmlFor="type" className="text-lg font-bold text-gray-800 mb-5">
              What kind of PRD are you trying to create? <span className="text-red-500">*</span>
            </Label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select PRD Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRD_TYPE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type && <p className="mt-1 text-sm text-red-500">{errors.type.message}</p>}
          </div>
        </div>
      </div>

      {Boolean(watch('type')) && (
        <div>
          {/* Section 2: Define Requirements */}
          <div>
            <div className="text-lg font-bold text-gray-800 mb-5">
              <span className="text-pink-500">2.</span> Define your Requirement
            </div>
          </div>

          {/* dynamic */}
          {selectedPrdType === PRD_TYPE.SOLVE_PROBLEM && (
            <>
              <div>
                <Label htmlFor="problem">
                  What is the problem you are trying to solve?
                  <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="problem"
                  rows={4}
                  {...register('problem')}
                  className={
                    (errors as FieldErrorsImpl<SolveProblemFormData>).problem
                      ? 'border-red-500'
                      : ''
                  }
                />

                {(errors as FieldErrorsImpl<SolveProblemFormData>).problem && (
                  <p className="mt-1 text-sm text-red-500">
                    {(errors as FieldErrorsImpl<SolveProblemFormData>).problem?.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="solution">
                  What is the solution?<span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="solution"
                  rows={4}
                  {...register('solution')}
                  className={
                    (errors as FieldErrorsImpl<SolveProblemFormData>).solution
                      ? 'border-red-500'
                      : ''
                  }
                />
                <p className="mt-1 text-sm text-red-500">
                  {(errors as FieldErrorsImpl<SolveProblemFormData>).solution?.message}
                </p>
              </div>
            </>
          )}

          {selectedPrdType === PRD_TYPE.CREATE_MVP && (
            <>
              <div>
                <Label htmlFor="productName">
                  What is the product name?
                  <span className="text-red-500">*</span>
                </Label>
                <Input id="productName" {...register('productName')} />
                {(errors as FieldErrorsImpl<CreateMVPFormData>).productName && (
                  <p className="mt-1 text-sm text-red-500">
                    {(errors as FieldErrors<CreateMVPFormData>).productName?.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="valueProp">
                  What is the value proposition?
                  <span className="text-red-500">*</span>
                </Label>
                <Input id="valueProp" {...register('valueProp')} />
                {(errors as FieldErrorsImpl<CreateMVPFormData>).valueProp && (
                  <p className="mt-1 text-sm text-red-500">
                    {(errors as FieldErrors<CreateMVPFormData>).valueProp?.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="solution">
                  What are the main features?
                  <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="featureList"
                  rows={4}
                  {...register('featureList')}
                  className={
                    (errors as FieldErrorsImpl<CreateMVPFormData>).featureList
                      ? 'border-red-500'
                      : ''
                  }
                />
                <p className="mt-1 text-sm text-red-500">
                  {(errors as FieldErrorsImpl<CreateMVPFormData>).featureList?.message}
                </p>
              </div>
            </>
          )}

          {selectedPrdType === PRD_TYPE.ADD_FEATURE && (
            <>
              <div>
                <Label htmlFor="existingProduct">
                  Tell us a bit more about the existing product.
                  <span className="text-red-500">*</span>
                </Label>
                <Input id="existingProduct" {...register('existingProduct')} />
                {(errors as FieldErrorsImpl<AddFeatureFormData>).existingProduct && (
                  <p className="mt-1 text-sm text-red-500">
                    {(errors as FieldErrors<AddFeatureFormData>).existingProduct?.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="featureName">
                  What is the feature name?
                  <span className="text-red-500">*</span>
                </Label>
                <Input id="featureName" {...register('featureName')} />
                {(errors as FieldErrorsImpl<AddFeatureFormData>).featureName && (
                  <p className="mt-1 text-sm text-red-500">
                    {(errors as FieldErrors<AddFeatureFormData>).featureName?.message}
                  </p>
                )}
              </div>
            </>
          )}

          {selectedPrdType === PRD_TYPE.OTHERS && (
            <>
              <div>
                <Label htmlFor="problem">
                  What is the problem you are trying to solve?
                  <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="problem"
                  rows={4}
                  {...register('problem')}
                  className={
                    (errors as FieldErrorsImpl<OthersFormData>).problem ? 'border-red-500' : ''
                  }
                />

                {(errors as FieldErrorsImpl<OthersFormData>).problem && (
                  <p className="mt-1 text-sm text-red-500">
                    {(errors as FieldErrorsImpl<OthersFormData>).problem?.message}
                  </p>
                )}
              </div>
            </>
          )}

          <div>
            <Label htmlFor="audience">Who are the audiences?</Label>
            <Input id="audience" {...register('audience')} />
            {(errors as FieldErrorsImpl<SolveProblemFormData>).audience && (
              <p className="mt-1 text-sm text-red-500">
                {(errors as FieldErrorsImpl<SolveProblemFormData>).audience?.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="successMetrics">What are the success metrics?</Label>
            <Textarea
              id="successMetrics"
              rows={4}
              {...register('successMetrics')}
              className={errors.successMetrics ? 'border-red-500' : ''}
            />

            {errors.successMetrics && (
              <p className="mt-1 text-sm text-red-500">{errors.successMetrics?.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="additional">Additional note?</Label>
            <Textarea
              id="additional"
              rows={4}
              {...register('additional')}
              className={errors.additional ? 'border-red-500' : ''}
            />

            {errors.additional && (
              <p className="mt-1 text-sm text-red-500">{errors.additional?.message}</p>
            )}
          </div>

          {/* Section 3: Additional Requirements */}

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Advanced options</AccordionTrigger>
              <AccordionContent>
                <div>
                  <div className="text-lg font-bold text-gray-800 mb-5">
                    <span className="text-pink-500">3.</span> Sections to include
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-1 items-center">
                      <Controller
                        name="hasObjective"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id="hasObjective"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                      <Label htmlFor="hasObjective">Objective</Label>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Controller
                        name="hasSuccessMetrics"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id="hasSuccessMetrics"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                      <Label htmlFor="hasSuccessMetrics">Success Metrics</Label>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Controller
                        name="hasPOC"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id="hasPOC"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                      <Label htmlFor="hasPOC">Point of Contact</Label>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Controller
                        name="hasSecurity"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id="hasSecurity"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                      <Label htmlFor="hasSecurity">Security</Label>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Controller
                        name="hasFunctionalReq"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id="hasFunctionalReq"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                      <Label htmlFor="hasFunctionalReq">Functional Requirements</Label>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Controller
                        name="hasNonFunctionalReq"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id="hasNonFunctionalReq"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                      <Label htmlFor="hasNonFunctionalReq">Non-Functional Requirements</Label>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Controller
                        name="hasStakeholders"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id="hasStakeholders"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                      <Label htmlFor="hasStakeholders">Stakeholders</Label>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Controller
                        name="hasBackground"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id="hasBackground"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                      <Label htmlFor="hasBackground">Background</Label>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Controller
                        name="hasConstraints"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id="hasConstraints"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                      <Label htmlFor="hasConstraints">Constraints</Label>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Controller
                        name="hasAssumptions"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id="hasAssumptions"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                      <Label htmlFor="hasAssumptions">Assumptions</Label>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Controller
                        name="hasTimeline"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id="hasTimeline"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                      <Label htmlFor="hasTimeline">Timeline</Label>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Controller
                        name="hasDependency"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id="hasDependency"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                      <Label htmlFor="hasDependency">Dependency</Label>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}

      {/* Sticky Action Buttons */}
      <div className="sticky bottom-1 left-0 right-0 px-2 py-2 font-semibold text-sm text-slate-900 bg-slate-50/90 backdrop-blur-sm ring-1 ring-slate-900/10 space-x-4 rounded-xl shadow-2xl">
        <div className="flex gap-4 text-white leading-6 bg-stripes-indigo rounded-lg">
          <Button
            type="submit"
            className="sm:p-4 p-3 pt-4 grow rounded-lg flex items-center justify-center shadow-lg text-xs sm:text-base"
            disabled={!isValid || !isDirty}
          >
            Generate
            <SendHorizontal />
          </Button>
        </div>
      </div>
    </form>
  )
}
