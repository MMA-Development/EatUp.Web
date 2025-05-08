import { ReverseGeocodeResponse } from '@features/map/types/reverse-geocode.ts'
import { eatupApi } from '@lib/api-slice.ts'

export const reverseGeocode = eatupApi.injectEndpoints({
  endpoints: (builder) => ({
    reverseGeocode: builder.query<
      ReverseGeocodeResponse,
      {
        lat: string
        lon: string
      }
    >({
      query: ({ lat, lon }) =>
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    })
  })
})

export const { useReverseGeocodeQuery, useLazyReverseGeocodeQuery } = reverseGeocode
