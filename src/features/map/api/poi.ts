import { POIPayload, POIResponse } from '@features/map/types/poi.ts'
import { eatupApi } from '@lib/api-slice.ts'

export const poi = eatupApi.injectEndpoints({
  endpoints: (builder) => ({
    poi: builder.mutation<POIResponse, POIPayload>({
      query: ({ radius, lat, lon }) => ({
        url: 'https://overpass-api.de/api/interpreter',
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
          'User-Agent': 'eatup@test.com'
        },
        body: `
          [out:json][timeout:25];
          (
            node["shop"="supermarket"](around:${radius},${lat},${lon});
            way["shop"="supermarket"](around:${radius},${lat},${lon});
            node["amenity"="restaurant"](around:${radius},${lat},${lon});
            way["amenity"="restaurant"](around:${radius},${lat},${lon});
            node["amenity"="fuel"](around:${radius},${lat},${lon});
            way["amenity"="fuel"](around:${radius},${lat},${lon});
          );
          out body;
        `
      })
    })
  })
})

export const { usePoiMutation } = poi
