import {
  Button,
  Field,
  Fieldset,
  FileUpload,
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
import { useTranslation } from 'react-i18next'
import { HiUpload } from 'react-icons/hi'

export function SignupForm() {
  const { t } = useTranslation('auth')
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
  const [lookup, { data, isLoading: isLoadingLookup }] = useLazyForwardGeocodeQuery()
  const [checkPOI] = usePoiMutation()

  const defaultPosition = [55.3997225, 10.3852104] satisfies LatLngExpression

  const [selectedFile, setSelectedFile] = useState<File | null>(null)

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

      const found = poiRes?.elements.length > 0

      if (!found) {
        const confirmLocation = confirm(
          'No supermarket, restaurant, or gas station was found on the given location. Do you want to continue?'
        )
        if (!confirmLocation) {
          return
        }
      }

      let fileUrl = data.logo ?? ''

      if (selectedFile) {
        const formData = new FormData()
        formData.append('file', selectedFile)

        const response = await fetch('https://dev-eatup-api.mma-development.dk/Files/logo', {
          method: 'POST',
          body: formData
        })

        if (!response.ok) {
          new Error('Failed to upload image')
        }

        const result = await response.json()
        fileUrl = result.fileurl
      }

      const dataWithLogo = {
        ...data,
        logo: fileUrl
      }

      const res = await signup(dataWithLogo).unwrap()
      window.open(res.url)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset.Root size="lg" maxW="md">
        <Stack>
          <Fieldset.Legend>{t('signup')}</Fieldset.Legend>
          <Fieldset.HelperText>{t('signup.description')}</Fieldset.HelperText>
        </Stack>

        <Fieldset.Content mt={2}>
          <Stack direction={'row'}>
            <Field.Root required invalid={Boolean(errors.name)}>
              <Field.Label>{t('name')}</Field.Label>
              <Input {...register('name')} />
              <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root required invalid={Boolean(errors.email)}>
              <Field.Label>{t('email')}</Field.Label>
              <Input {...register('email')} />
              <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
            </Field.Root>
          </Stack>

          <Stack direction={'row'}>
            <Field.Root required invalid={Boolean(errors.username)}>
              <Field.Label>{t('username')}</Field.Label>
              <Input {...register('username')} />
              <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root required invalid={Boolean(errors.password)}>
              <Field.Label>{t('password')}</Field.Label>
              <Input type="password" {...register('password')} />
              <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            </Field.Root>
          </Stack>

          <Field.Root required invalid={Boolean(errors.cvr)}>
            <Field.Label>{t('cvr')}</Field.Label>
            <Input {...register('cvr')} />
            <Field.ErrorText>{errors.cvr?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root>
            <Field.Label>{t('logo')}</Field.Label>
            <FileUpload.Root
              accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
              maxFiles={1}
              onFileChange={(details) => {
                const file = details.acceptedFiles[0]
                if (file) {
                  setSelectedFile(file)
                }
              }}
            >
              <HStack w={'100%'}>
                <FileUpload.HiddenInput />
                <FileUpload.Trigger asChild>
                  <Button variant="outline">
                    <HiUpload /> {t('upload.file')}
                  </Button>
                </FileUpload.Trigger>
                <FileUpload.ItemGroup>
                  <FileUpload.Items p={2} h={'40px'} borderRadius={'md'} />
                </FileUpload.ItemGroup>
              </HStack>
            </FileUpload.Root>
          </Field.Root>

          <HStack>
            <Field.Root>
              <Field.Label>{t('address')}</Field.Label>
              <Input onChange={(e) => setAddress(e.target.value)} value={address} />
            </Field.Root>
            <Button
              loading={isLoadingLookup}
              loadingText={t('searching')}
              alignSelf={'end'}
              onClick={() => lookup(address)}
            >
              {t('search')}
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
            {t('signup')}
          </Button>
          <Separator orientation="vertical" h={8} />
          <Text>
            {t('already.customer')} {t('login')}{' '}
            <CustomLink colorPalette={'blue'} to={'/auth/login'}>
              {t('here').toLowerCase()}.
            </CustomLink>
          </Text>
        </HStack>
      </Fieldset.Root>
    </form>
  )
}
