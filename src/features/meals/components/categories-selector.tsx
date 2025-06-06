import { useGetCategoriesQuery } from '@features/meals/api/get-categories.ts'
import { useMemo } from 'react'
import { createListCollection, Portal, Select, Spinner } from '@chakra-ui/react'
import { Category } from '@features/meals/types'
import { useTranslation } from 'react-i18next'

export function CategoriesSelector({ ...props }: Omit<Select.RootProps<Category>, 'collection'>) {
  const { t } = useTranslation('meals')

  const { data, isLoading } = useGetCategoriesQuery()

  const collection = useMemo(() => {
    return createListCollection({
      items: data?.items ?? [],
      itemToString: (category) => category.name,
      itemToValue: (category) => category.id
    })
  }, [data])

  return (
    <Select.Root {...props} collection={collection} multiple>
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={t('select.category')} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          {isLoading && <Spinner size="xs" borderWidth="1.5px" color="fg.muted" />}
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {collection.items.map((category) => (
              <Select.Item item={category} key={category.id}>
                {category.name}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}
