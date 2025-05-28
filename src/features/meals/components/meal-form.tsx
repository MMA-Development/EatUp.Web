import {
  Button,
  Field,
  Fieldset,
  FileUpload,
  HStack,
  Input,
  NumberInput,
  Stack,
  Textarea
} from '@chakra-ui/react'
import { useAddMealMutation } from '@features/meals/api/add-meal.ts'
import { Meal, MealPayload, MealPayloadSchema } from '@features/meals/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useUpdateMealMutation } from '@features/meals/api/update-meal.ts'
import { toaster } from '@components/ui/toaster.tsx'
import { useMemo, useState } from 'react'
import moment from 'moment'
import { useLazyGetMealsQuery } from '@features/meals/api/get-meals.ts'
import { useAppSelector } from '@store/hooks.ts'
import { selectVendor } from '@features/auth/store'
import { useTranslation } from 'react-i18next'
import { CategoriesSelector } from '@features/meals/components/categories-selector.tsx'
import { HiUpload } from 'react-icons/hi'

interface MealFormProps {
  meal?: Meal
}

export function MealForm({ meal }: MealFormProps) {
  const { t } = useTranslation('meals')

  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const [addMeal, { isLoading: isAdding }] = useAddMealMutation()
  const [updateMeal, { isLoading: isUpdating }] = useUpdateMealMutation()
  const [refetchMeals] = useLazyGetMealsQuery()

  const vendor = useAppSelector(selectVendor)

  const isEditing = !!meal?.id
  const isLoading = isAdding || isUpdating

  const defaultValues = useMemo(() => {
    if (!meal) return undefined
    return {
      ...meal,
      categories: meal.categories.map((c) => c.id),
      firstAvailablePickup: moment
        .utc(meal.firstAvailablePickup)
        .local()
        .format('YYYY-MM-DDTHH:mm'),
      lastAvailablePickup: moment.utc(meal.lastAvailablePickup).local().format('YYYY-MM-DDTHH:mm')
    }
  }, [meal])

  const {
    register,
    reset,
    control,
    formState: { errors },
    handleSubmit
  } = useForm<MealPayload>({
    defaultValues,
    resolver: zodResolver(MealPayloadSchema)
  })

  async function onSubmit(data: MealPayload) {
    try {
      let fileUrl = data.imageUrl ?? ''

      if (selectedFile) {
        const formData = new FormData()
        formData.append('file', selectedFile)

        const response = await fetch('https://dev-eatup-api.mma-development.dk/Files/meal', {
          method: 'POST',
          body: formData
        })

        if (!response.ok) {
          new Error('Failed to upload image')
        }

        const result = await response.json()
        fileUrl = result.fileurl
      }

      const mealDataWithImage = {
        ...data,
        imageUrl: fileUrl
      }

      if (isEditing) {
        await updateMeal({ id: meal.id, meal: mealDataWithImage }).unwrap()
      } else {
        await addMeal(mealDataWithImage).unwrap()
      }

      toaster.create({
        title: isEditing ? 'Meal updated' : 'Meal created',
        type: 'success'
      })
    } catch (e) {
      console.error(e)
      toaster.create({
        title: isEditing ? 'Failed to update meal' : 'Failed to create meal',
        type: 'error'
      })
    } finally {
      reset()
      refetchMeals({ take: 10, skip: 0 })
      setSelectedFile(null)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset.Root size="lg" maxW="md">
        <Stack>
          <Fieldset.Legend>{t('meal')}</Fieldset.Legend>
        </Stack>

        <Fieldset.Content>
          <Input display={'none'} {...register('vendorName')} value={vendor!.name} />

          <Field.Root invalid={Boolean(errors.title)} required>
            <Field.Label>{t('title')}</Field.Label>
            <Input {...register('title')} />
            <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={Boolean(errors.description)} required>
            <Field.Label>{t('description')}</Field.Label>
            <Textarea {...register('description')} />
            <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root>
            <Field.Label>{t('categories')}</Field.Label>
            <Controller
              name="categories"
              control={control}
              render={({ field }) => (
                <CategoriesSelector
                  name={field.name}
                  value={field.value}
                  onValueChange={({ value }) => field.onChange(value)}
                  onInteractOutside={() => field.onBlur()}
                />
              )}
            />
            <Field.ErrorText></Field.ErrorText>
            <Field.HelperText>Giv din måltidspakke en ellere flere kategorier</Field.HelperText>
          </Field.Root>

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
                  <HiUpload /> Upload file
                </Button>
              </FileUpload.Trigger>
              <FileUpload.ItemGroup>
                <FileUpload.Items p={2} h={'40px'} borderRadius={'md'} />
              </FileUpload.ItemGroup>
            </HStack>
          </FileUpload.Root>

          <Stack direction={'row'}>
            <Field.Root invalid={Boolean(errors.originalPrice)}>
              <Field.Label>{t('original.price')}</Field.Label>
              <Controller
                name="originalPrice"
                control={control}
                render={({ field }) => (
                  <NumberInput.Root
                    disabled={field.disabled}
                    name={field.name}
                    value={String(field.value)}
                    onValueChange={({ valueAsNumber }) => {
                      field.onChange(valueAsNumber)
                    }}
                  >
                    <NumberInput.Control />
                    <NumberInput.Input onBlur={field.onBlur} />
                  </NumberInput.Root>
                )}
              />
              <Field.HelperText>
                Den oprindelig pris, hvis kunden skulle købe varen i butikken
              </Field.HelperText>
              <Field.ErrorText>{errors.originalPrice?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={Boolean(errors.price)}>
              <Field.Label>{t('price')}</Field.Label>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <NumberInput.Root
                    disabled={field.disabled}
                    name={field.name}
                    value={String(field.value)}
                    onValueChange={({ valueAsNumber }) => {
                      field.onChange(valueAsNumber)
                    }}
                  >
                    <NumberInput.Control />
                    <NumberInput.Input onBlur={field.onBlur} />
                  </NumberInput.Root>
                )}
              />
              <Field.HelperText>Prisen kunden betaler</Field.HelperText>
              <Field.ErrorText>{errors.price?.message}</Field.ErrorText>
            </Field.Root>
          </Stack>

          <HStack>
            <Field.Root invalid={Boolean(errors.quantity)}>
              <Field.Label>{t('quantity')}</Field.Label>
              <Controller
                name="quantity"
                control={control}
                render={({ field }) => (
                  <NumberInput.Root
                    disabled={field.disabled}
                    name={field.name}
                    value={String(field.value)}
                    onValueChange={({ valueAsNumber }) => {
                      field.onChange(valueAsNumber)
                    }}
                  >
                    <NumberInput.Control />
                    <NumberInput.Input onBlur={field.onBlur} />
                  </NumberInput.Root>
                )}
              />
              <Field.ErrorText>{errors.quantity?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={Boolean(errors.maxOrderQuantity)}>
              <Field.Label>{t('max.order.quantity')}</Field.Label>
              <Controller
                name="maxOrderQuantity"
                control={control}
                render={({ field }) => (
                  <NumberInput.Root
                    disabled={field.disabled}
                    name={field.name}
                    value={String(field.value)}
                    onValueChange={({ valueAsNumber }) => {
                      field.onChange(valueAsNumber)
                    }}
                  >
                    <NumberInput.Control />
                    <NumberInput.Input onBlur={field.onBlur} />
                  </NumberInput.Root>
                )}
              />
              <Field.ErrorText>{errors.maxOrderQuantity?.message}</Field.ErrorText>
            </Field.Root>
          </HStack>

          <HStack>
            <Field.Root invalid={Boolean(errors.firstAvailablePickup)}>
              <Field.Label>{t('first.available.pickup')}</Field.Label>
              <Input type="datetime-local" {...register('firstAvailablePickup')} />
              <Field.ErrorText>{errors.firstAvailablePickup?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={Boolean(errors.lastAvailablePickup)}>
              <Field.Label>{t('last.available.pickup')}</Field.Label>
              <Input type="datetime-local" {...register('lastAvailablePickup')} />
              <Field.ErrorText>{errors.lastAvailablePickup?.message}</Field.ErrorText>
            </Field.Root>
          </HStack>
        </Fieldset.Content>

        <HStack>
          <Button size={'sm'} type="submit" alignSelf="flex-start" loading={isLoading}>
            {t('create')}
          </Button>
          <Button size={'sm'} variant={'outline'}>
            Opret skabelon
          </Button>
        </HStack>
      </Fieldset.Root>
    </form>
  )
}
