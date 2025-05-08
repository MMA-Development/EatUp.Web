import { LatLngExpression } from 'leaflet'
import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

export function RecenterAutomatically({ lat, lng }: { lat?: number; lng?: number }) {
  const map = useMap()

  useEffect(() => {
    const mapCenter = [55.3997225, 10.3852104]

    if (lat && lng) {
      map.setView([lat, lng], map.getZoom(), { animate: true, duration: 2 })
    } else {
      map.setView(mapCenter as LatLngExpression, map.getZoom(), { animate: true, duration: 2 })
    }
  }, [lat, lng, map])
  return null
}
