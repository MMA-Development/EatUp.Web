import { z } from 'zod'

export interface ApiPagination {
  skip: number
  limit: number
}

export interface ApiPaginationWithSearch extends ApiPagination {
  query?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  page: number
  totalCount: number
}

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    items: z.array(itemSchema),
    page: z.number(),
    totalCount: z.number()
  })
