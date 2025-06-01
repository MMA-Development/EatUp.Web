import { z } from 'zod'

export const BalanceTransactionSchema = z.object({
  date: z.string(),
  revenue: z.number(),
  orders: z.number()
})

export const BalanceTransactionResponseSchema = z.array(BalanceTransactionSchema)

export interface BalanceTransactionsQuery {
  from?: string
  to?: string
}

export type BalanceTransaction = z.infer<typeof BalanceTransactionSchema>
export type BalanceTransactionResponse = z.infer<typeof BalanceTransactionResponseSchema>
