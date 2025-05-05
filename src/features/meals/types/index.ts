import { z } from 'zod'

export const MealSchema = z.object({
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
    vendorName: z.string().default('Super Brugsen'),
    title: z.string(),
    originalPrice: z.number(),
    price: z.number(),
    description: z.string(),
    quantity: z.number(),
    maxOrderQuantity: z.number(),
    firstAvailablePickup: z.date(),
    lastAvailablePickup: z.date()
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
    const now = new Date()

    if (first > last) {
      ctx.addIssue({
        path: ['firstAvailablePickup'],
        code: z.ZodIssueCode.custom,
        message: 'First pickup must be before last pickup'
      })
    }

    if (first < now) {
      ctx.addIssue({
        path: ['firstAvailablePickup'],
        code: z.ZodIssueCode.custom,
        message: 'First pickup must be in the future'
      })
    }
  })

export type MealPayload = z.input<typeof MealPayloadSchema>
