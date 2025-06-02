import { eatupApi } from '@lib/api-slice.ts'
import {
  ApiPaginationWithSearch,
  PaginatedResponse,
  PaginatedResponseSchema
} from '@app-types/api-types.ts'
import { OrderResponse, OrderResponseSchema } from '@features/orders/types'

export const orders = eatupApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<PaginatedResponse<OrderResponse>, ApiPaginationWithSearch | void>({
      query: (pagination = { skip: 0, take: 10 }) => ({
        url: `/orders/vendor?skip=${pagination?.skip}&take=${pagination?.take}${pagination && pagination.query ? `&search=${pagination.query}` : ''}`
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
