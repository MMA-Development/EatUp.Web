import { ForwardGeocodeResponse } from '@features/map/types/forward-geocode.ts'
import { eatupApi } from '@lib/api-slice.ts'

export const forwardGeocode = eatupApi.injectEndpoints({
  endpoints: (builder) => ({
    forwardGeocode: builder.query<ForwardGeocodeResponse[], string>({
      query: (query) => `https://nominatim.openstreetmap.org/search?q=${query}&format=json`
    })
  })
})

export const { useForwardGeocodeQuery, useLazyForwardGeocodeQuery } = forwardGeocode
