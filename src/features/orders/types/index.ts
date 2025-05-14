import { z } from 'zod'

export const OrderResponseSchema = z.object({
  userId: z.string(),
  userName: z.string(),
  vendorId: z.string(),
  foodPackageId: z.string(),
  foodPackageTitle: z.string(),
  paymentStatus: z.string(),
  paymentId: z.string(),
  price: z.number(),
  quantity: z.number(),
  id: z.string(),
  createdAt: z.string()
})

export type OrderResponse = z.infer<typeof OrderResponseSchema>
