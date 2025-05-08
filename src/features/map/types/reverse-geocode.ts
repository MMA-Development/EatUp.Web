import { z } from 'zod'

export const ReverseGeocodeResponseSchema = z.object({
  place_id: z.number(),
  licence: z.string(),
  osm_type: z.string(),
  osm_id: z.number(),
  lat: z.string(),
  lon: z.string(),
  class: z.string(),
  type: z.string(),
  place_rank: z.number(),
  importance: z.number(),
  addresstype: z.string(),
  name: z.string(),
  display_name: z.string(),
  address: z.object({
    house_number: z.string(),
    road: z.string(),
    neighbourhood: z.string(),
    village: z.string(),
    municipality: z.string(),
    state: z.string(),
    'ISO3166-2-lvl4': z.string(),
    postcode: z.string(),
    country: z.string(),
    country_code: z.string()
  }),
  boundingbox: z.array(z.string())
})

export type ReverseGeocodeResponse = z.infer<typeof ReverseGeocodeResponseSchema>
