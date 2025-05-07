import {
  Button,
  Field,
  Fieldset,
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

interface MealFormProps {
  meal?: Meal
}

export function MealForm({ meal }: MealFormProps) {
  const [addMeal, { isLoading: isAdding }] = useAddMealMutation()
  const [updateMeal, { isLoading: isUpdating }] = useUpdateMealMutation()

  const isEditing = !!meal?.id
  const isLoading = isAdding || isUpdating

  const {
    register,
    reset,
    control,
    formState: { errors },
    handleSubmit
  } = useForm<MealPayload>({
    defaultValues: meal,
    resolver: zodResolver(MealPayloadSchema)
  })

  async function onSubmit(data: MealPayload) {
    try {
      if (isEditing) {
        await updateMeal({ id: meal!.id, meal: data }).unwrap()
      } else {
        await addMeal(data).unwrap()
        reset()
      }
    } catch (e) {
      console.error(e)
      toaster.create({
        title: isEditing ? 'Failed to update meal' : 'Failed to create meal',
        type: 'error'
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset.Root size="lg" maxW="md">
        <Stack>
          <Fieldset.Legend>Måltid</Fieldset.Legend>
          <Fieldset.HelperText>Please provide your contact details below.</Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Field.Root invalid={Boolean(errors.title)} required>
            <Field.Label>Title</Field.Label>
            <Input {...register('title')} />
            <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={Boolean(errors.description)} required>
            <Field.Label>Description</Field.Label>
            <Textarea {...register('description')} />
            <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
          </Field.Root>

          <Stack direction={'row'}>
            <Field.Root invalid={Boolean(errors.originalPrice)}>
              <Field.Label>Original price</Field.Label>
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
              <Field.Label>Price</Field.Label>
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
              <Field.Label>Quantity</Field.Label>
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
              <Field.Label>Max order quantity</Field.Label>
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
              <Field.Label>First available pickup</Field.Label>
              <Input type="datetime-local" {...register('firstAvailablePickup')} />
              <Field.ErrorText>{errors.firstAvailablePickup?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={Boolean(errors.lastAvailablePickup)}>
              <Field.Label>Last available pickup</Field.Label>
              <Input type="datetime-local" {...register('lastAvailablePickup')} />
              <Field.ErrorText>{errors.lastAvailablePickup?.message}</Field.ErrorText>
            </Field.Root>
          </HStack>
        </Fieldset.Content>

        <HStack>
          <Button size={'sm'} type="submit" alignSelf="flex-start" loading={isLoading}>
            Submit
          </Button>
          <Button size={'sm'} variant={'outline'}>
            Opret skabelon
          </Button>
        </HStack>
      </Fieldset.Root>
    </form>
  )
}
