import { z } from 'zod'

export const MealSchema = z.object({
  id: z.string(),
  vendorId: z.string(),
  vendorName: z.string(),
  title: z.string(),
  originalPrice: z.number(),
  price: z.number(),
  description: z.string(),
  quantity: z.number(),
  maxOrderQuantity: z.number(),
  firstAvailablePickup: z.string(),
  lastAvailablePickup: z.string(),
  categories: z.array(z.string()).nullable()
})

export type Meal = z.infer<typeof MealSchema>

export const MealPayloadSchema = z
  .object({
    vendorName: z.string(),
    title: z.string(),
    originalPrice: z.number().min(1),
    price: z.number().min(1),
    description: z.string(),
    quantity: z.number().min(1),
    maxOrderQuantity: z.number().min(1),
    firstAvailablePickup: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), { message: 'Ugyldig dato/tid' })
      .transform((val) => new Date(val).toISOString()),
    lastAvailablePickup: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), { message: 'Ugyldig dato/tid' })
      .transform((val) => new Date(val).toISOString())
  })
  .superRefine((data, ctx) => {
    if (data.price > data.originalPrice) {
      ctx.addIssue({
        path: ['price'],
        code: z.ZodIssueCode.custom,
        message: 'Price cannot be higher than original price'
      })
    }

    if (data.maxOrderQuantity > data.quantity) {
      ctx.addIssue({
        path: ['maxOrderQuantity'],
        code: z.ZodIssueCode.custom,
        message: 'Max order quantity cannot be greater than quantity'
      })
    }

    const first = new Date(data.firstAvailablePickup)
    const last = new Date(data.lastAvailablePickup)

    if (!isNaN(first.getTime()) && !isNaN(last.getTime()) && first >= last) {
      ctx.addIssue({
        path: ['firstAvailablePickup'],
        code: z.ZodIssueCode.custom,
        message: 'First available must be before last available'
      })
    }
  })

export type MealPayload = z.input<typeof MealPayloadSchema>
