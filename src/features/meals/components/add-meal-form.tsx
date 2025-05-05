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
import { MealPayload, MealPayloadSchema } from '@features/meals/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

export function AddMealForm() {
  const [addMeal, { isLoading }] = useAddMealMutation()

  const {
    register,
    reset,
    control,
    formState: { errors },
    handleSubmit
  } = useForm<MealPayload>({
    resolver: zodResolver(MealPayloadSchema)
  })

  async function onSubmit(data: MealPayload) {
    try {
      await addMeal(data)
      reset()
    } catch (e) {
      console.error(e)
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

          <HStack>
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
              <Field.ErrorText>{errors.price?.message}</Field.ErrorText>
            </Field.Root>
          </HStack>

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
              <Input
                type="datetime-local"
                {...register('firstAvailablePickup', { valueAsDate: true })}
              />
              <Field.ErrorText>{errors.firstAvailablePickup?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={Boolean(errors.lastAvailablePickup)}>
              <Field.Label>Last available pickup</Field.Label>
              <Input
                type="datetime-local"
                {...register('lastAvailablePickup', { valueAsDate: true })}
              />
              <Field.ErrorText>{errors.lastAvailablePickup?.message}</Field.ErrorText>
            </Field.Root>
          </HStack>
        </Fieldset.Content>

        <Button type="submit" alignSelf="flex-start" loading={isLoading}>
          Submit
        </Button>
      </Fieldset.Root>
    </form>
  )
}
