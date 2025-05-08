import { z } from 'zod'

export const ForwardGeocodeResponseSchema = z.object({
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
  boundingbox: z.array(z.string())
})

export type ForwardGeocodeResponse = z.infer<typeof ForwardGeocodeResponseSchema>
