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
  stripeCustomerId: z.string(),
  id: z.string(),
  deletedAt: z.null(),
  createdAt: z.string(),
  updatedAt: z.string()
})

export type OrderResponse = z.infer<typeof OrderResponseSchema>
