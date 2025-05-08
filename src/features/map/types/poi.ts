import { z } from 'zod'

export const POIPayloadSchema = z.object({
  radius: z.number().default(50),
  lat: z.number(),
  lon: z.number()
})

export type POIPayload = z.infer<typeof POIPayloadSchema>

export const POIResponseSchema = z.object({
  version: z.number(),
  generator: z.string(),
  osm3s: z.object({ timestamp_osm_base: z.string(), copyright: z.string() }),
  elements: z.array(
    z.object({
      type: z.string(),
      id: z.number(),
      lat: z.number(),
      lon: z.number(),
      tags: z.object({
        branch: z.string(),
        brand: z.string(),
        'brand:wikidata': z.string(),
        'brand:wikipedia': z.string(),
        'fvst:navnelbnr': z.string(),
        name: z.string(),
        opening_hours: z.string(),
        'ref:DK:cvr': z.string(),
        shop: z.string()
      })
    })
  )
})

export type POIResponse = z.infer<typeof POIResponseSchema>
