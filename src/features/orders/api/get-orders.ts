import { eatupApi } from '@lib/api-slice.ts'
import {
  ApiPaginationWithSearch,
  PaginatedResponse,
  PaginatedResponseSchema
} from '../../../types/api-types.ts'
import { OrderResponse, OrderResponseSchema } from '@features/orders/types'

export const orders = eatupApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<PaginatedResponse<OrderResponse>, ApiPaginationWithSearch | void>({
      query: (pagination) => ({
        url: `/orders/vendor?skip=${pagination?.skip}&take=${pagination?.limit}${pagination && pagination.query ? `&search=${pagination.query}` : ''}`
      }),
      extraOptions: {
        dataSchema: PaginatedResponseSchema(OrderResponseSchema)
      }
    })
  })
})

export const { useGetOrdersQuery } = orders
export const {
  useQueryState: useGetMealQueryState,
  useQuerySubscription: useGetMealQuerySubscription
} = orders.endpoints.getOrders
