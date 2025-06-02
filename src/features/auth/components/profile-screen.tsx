import { Button, Field, Fieldset, Flex, Input, Stack, Textarea } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLoaderData } from '@tanstack/react-router'
import { Profile, ProfileSchema } from '@features/auth/types'
import { useUpdateProfileMutation } from '@features/auth/api/update-profile.ts'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { RecenterAutomatically } from '@features/map/components/recenter.tsx'
import { DragEndEvent, LatLngExpression } from 'leaflet'
import { useColorMode } from '@components/ui/color-mode.tsx'
import { useEffect, useState } from 'react'
import { reverseGeocode } from '@features/map/api/reverse-geocode.ts'
import { useAppDispatch } from '@store/hooks.ts'
import { useTranslation } from 'react-i18next'

export function ProfileScreen() {
  const dispatch = useAppDispatch()

  const { t } = useTranslation('auth')

  const { colorMode } = useColorMode()
  const { data } = useLoaderData({ from: '/dashboard/profile' })

  const [update, { isLoading }] = useUpdateProfileMutation()

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit
  } = useForm<Profile>({
    defaultValues: data,
    resolver: zodResolver(ProfileSchema)
  })

  function onSubmit(data: Profile) {
    update(data)
    dispatch(
      reverseGeocode.endpoints.reverseGeocode.initiate(
        {
          lat: data.latitude.toString(),
          lon: data.longitude.toString()
        },
        {
          forceRefetch: true
        }
      )
    )
  }

  const defaultPosition = [data.latitude, data.longitude] satisfies LatLngExpression

  const [markerPos, setMarkerPos] = useState<LatLngExpression>(defaultPosition)

  useEffect(() => {
    const lat = data.latitude
    const lng = data.longitude
    setMarkerPos([lat, lng])
    // update form values
    setValue('latitude', lat)
    setValue('longitude', lng)
  }, [data, setValue])

  function onMarkerDragEnd(event: DragEndEvent) {
    const latlng = event.target.getLatLng()
    setMarkerPos([latlng.lat, latlng.lng])
    setValue('latitude', latlng.lat)
    setValue('longitude', latlng.lng)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset.Root size="lg" maxW="md">
        <Stack>
          <Fieldset.Legend>Profil</Fieldset.Legend>
          <Fieldset.HelperText>Change your profile details below.</Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Field.Root invalid={Boolean(errors.name)} required>
            <Field.Label>Name</Field.Label>
            <Input {...register('name')} />
            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={Boolean(errors.email)} required>
            <Field.Label>Email</Field.Label>
            <Textarea {...register('email')} />
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>
        </Fieldset.Content>

        <Flex h={'350px'} w={'100%'} position={'relative'}>
          <MapContainer
            center={[data.latitude, data.longitude] as LatLngExpression}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              url={
                colorMode === 'light'
                  ? 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
                  : 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
              }
            />
            <Marker
              position={markerPos}
              draggable
              eventHandlers={{
                dragend: onMarkerDragEnd
              }}
            >
              <Popup>Drag me to adjust your exact location.</Popup>
            </Marker>
            <RecenterAutomatically
              lat={(markerPos as [number, number])[0]}
              lng={(markerPos as [number, number])[1]}
            />
          </MapContainer>
        </Flex>
        <input type="hidden" {...register('latitude')} />
        <input type="hidden" {...register('longitude')} />
        <Button size={'sm'} type="submit" alignSelf="flex-start" loading={isLoading}>
          {t('update.profile')}
        </Button>
      </Fieldset.Root>
    </form>
  )
}
