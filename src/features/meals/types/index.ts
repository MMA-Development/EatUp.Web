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
