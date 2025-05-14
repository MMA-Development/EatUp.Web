import {
  Button,
  Field,
  Fieldset,
  Flex,
  HStack,
  Input,
  Separator,
  Stack,
  Text
} from '@chakra-ui/react'
import { useColorMode } from '@components/ui/color-mode.tsx'
import { CustomLink } from '@components/ui/custom-link.tsx'
import { useSignupMutation } from '@features/auth/api/signup.ts'
import { SignupPayload, SignupPayloadSchema } from '@features/auth/types'
import { useLazyForwardGeocodeQuery } from '@features/map/api/forward-geocode.ts'
import { usePoiMutation } from '@features/map/api/poi.ts'
import { RecenterAutomatically } from '@features/map/components/recenter.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { DragEndEvent, LatLngExpression } from 'leaflet'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

export function SignupForm() {
  const { colorMode } = useColorMode()

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm<SignupPayload>({
    resolver: zodResolver(SignupPayloadSchema)
  })

  const [signup, { isLoading, isError }] = useSignupMutation()
  const [lookup, { data }] = useLazyForwardGeocodeQuery()
  const [checkPOI] = usePoiMutation()

  const defaultPosition = [55.3997225, 10.3852104] satisfies LatLngExpression

  const [address, setAddress] = useState<string>('')
  const [markerPos, setMarkerPos] = useState<LatLngExpression>(defaultPosition)

  useEffect(() => {
    if (data && data.length > 0 && data[0].lat && data[0].lon) {
      const lat = Number(data[0].lat)
      const lng = Number(data[0].lon)
      setMarkerPos([lat, lng])
      // update form values
      setValue('latitude', lat)
      setValue('longitude', lng)
    }
  }, [data, setValue])

  function onMarkerDragEnd(event: DragEndEvent) {
    const latlng = event.target.getLatLng()
    setMarkerPos([latlng.lat, latlng.lng])
    setValue('latitude', latlng.lat)
    setValue('longitude', latlng.lng)
  }

  async function onSubmit(data: SignupPayload) {
    try {
      const poiRes = await checkPOI({
        lat: data.latitude,
        lon: data.longitude,
        radius: 50
      }).unwrap()

      console.log(poiRes)
      const found = poiRes?.elements.length > 0
      console.log(found)

      if (!found) {
        const confirmLocation = confirm(
          'No supermarket, restaurant, or gas station was found on the given location. Do you want to continue?'
        )
        if (!confirmLocation) {
          return
        }
      }

      const res = await signup(data).unwrap()
      window.open(res.url)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset.Root size="lg" maxW="md">
        <Stack>
          <Fieldset.Legend>Signup</Fieldset.Legend>
          <Fieldset.HelperText>Please provide your contact details below.</Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Stack direction={'row'}>
            <Field.Root required invalid={Boolean(errors.name)}>
              <Field.Label>Name</Field.Label>
              <Input {...register('name')} />
              <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root required invalid={Boolean(errors.email)}>
              <Field.Label>Email address</Field.Label>
              <Input {...register('email')} />
              <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
            </Field.Root>
          </Stack>

          <Stack direction={'row'}>
            <Field.Root required invalid={Boolean(errors.username)}>
              <Field.Label>Username</Field.Label>
              <Input {...register('username')} />
              <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root required invalid={Boolean(errors.password)}>
              <Field.Label>Password</Field.Label>
              <Input type="password" {...register('password')} />
              <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            </Field.Root>
          </Stack>

          <Field.Root required invalid={Boolean(errors.cvr)}>
            <Field.Label>CVR</Field.Label>
            <Input {...register('cvr')} />
            <Field.ErrorText>{errors.cvr?.message}</Field.ErrorText>
          </Field.Root>

          <HStack>
            <Field.Root>
              <Field.Label>Address</Field.Label>
              <Input onChange={(e) => setAddress(e.target.value)} value={address} />
            </Field.Root>
            <Button alignSelf={'end'} onClick={() => lookup(address)}>
              Søg
            </Button>
          </HStack>

          <Flex h={'350px'} w={'100%'} position={'relative'}>
            <MapContainer center={defaultPosition} zoom={13} scrollWheelZoom={false}>
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
        </Fieldset.Content>

        {isError && (
          <Text mt={1} color={'fg.error'}>
            An error occurred during signup
          </Text>
        )}

        <HStack>
          <Button loading={isLoading} type="submit" alignSelf="flex-start">
            Opret dig
          </Button>
          <Separator orientation="vertical" h={8} />
          <Text>
            Allerede oprettet? Log ind{' '}
            <CustomLink colorPalette={'blue'} to={'/auth/login'}>
              her.
            </CustomLink>
          </Text>
        </HStack>
      </Fieldset.Root>
    </form>
  )
}
