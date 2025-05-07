import { eatupApi } from '@lib/api-slice.ts'
import { Meal, MealSchema } from '@features/meals/types'
import { store } from '@store/index.ts'

export const meals = eatupApi.injectEndpoints({
  endpoints: (builder) => ({
    getMeal: builder.query<Meal, string>({
      query: (mealId) => ({
        url: `/meals/${mealId}`
      }),
      extraOptions: {
        dataSchema: MealSchema
      }
    })
  })
})

export const getMeal = async (mealId: string) => {
  return store.dispatch(meals.endpoints.getMeal.initiate(mealId)).unwrap()
}
