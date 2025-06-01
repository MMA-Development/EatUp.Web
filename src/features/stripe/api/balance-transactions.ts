import {
  BalanceTransactionResponse,
  BalanceTransactionResponseSchema,
  BalanceTransactionsQuery
} from '@features/stripe/types/balance-transactions.ts'
import { eatupApi } from '@lib/api-slice.ts'

export const stripe = eatupApi.injectEndpoints({
  endpoints: (builder) => ({
    getBalanceTransactions: builder.query<BalanceTransactionResponse, BalanceTransactionsQuery>({
      query: (params) => {
        const searchParams = new URLSearchParams()

        if (params?.from) searchParams.append('from', params.from.toString())
        if (params?.to) searchParams.append('to', params.to.toString())

        return {
          url: `/orders/bydate?${searchParams.toString()}`
        }
      },
      extraOptions: {
        dataSchema: BalanceTransactionResponseSchema
      }
    })
  })
})

export const { useGetBalanceTransactionsQuery } = stripe
