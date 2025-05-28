type NominatimAddress = {
  shop?: string
  amenity?: string
  name?: string
  road?: string
  house_number?: string
  suburb?: string
  city?: string
  town?: string
  village?: string
  municipality?: string
  state?: string
  postcode?: string
  country?: string
}

type NominatimResponse = {
  display_name?: string
  address: NominatimAddress
}

/**
 * Build a human-readable address string from a Nominatim reverse geocoding result
 */
export function buildAddressFromNominatim({ address }: NominatimResponse): string {
  const { shop, amenity, name, house_number, road } = address

  // Prefer shop/amenity/name if present
  if (shop) return shop
  if (amenity) return amenity
  if (name) return name

  // Otherwise, fallback to road + house number
  if (road) {
    return [road, house_number].filter(Boolean).join(' ')
  }

  // Fallback
  return 'Unknown address'
}
