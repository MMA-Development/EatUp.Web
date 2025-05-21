import {
  Button,
  createListCollection,
  Flex,
  HStack,
  Input,
  InputGroup,
  Kbd,
  Portal,
  Select
} from '@chakra-ui/react'
import { MealList } from '@features/meals/components/meal-list.tsx'
import { useDebouncedState } from '@hooks/use-debounced-state.ts'
import { useInputFocusHotkey } from '@hooks/use-input-focus-hotkey.ts'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useEffect } from 'react'
import { BiSearch } from 'react-icons/bi'
import { useGetMealsQuery } from '@features/meals/api/get-meals.ts'
import { IoRefresh } from 'react-icons/io5'
import { Tooltip } from '@components/ui/tooltip.tsx'
import { useTranslation } from 'react-i18next'

export function MealScreen() {
  const { t } = useTranslation('meals')

  const navigate = useNavigate()

  const inputRef = useInputFocusHotkey()

  const { query, skip, take } = useSearch({ from: '/dashboard/meals' })
  const { refetch, isFetching } = useGetMealsQuery({ skip, take, query })

  const [searchValue, setSearchValue] = useDebouncedState(query, 300)

  useEffect(() => {
    if (searchValue !== undefined) {
      void navigate({
        to: '/dashboard/meals',
        search: (old) => ({ query: searchValue, take: old.take }),
        replace: true
      })
    }
  }, [navigate, query, searchValue])

  const frameworks = createListCollection({
    items: [
      { label: 'Aftensmad', value: 'dinner' },
      { label: 'Frokost', value: 'lunch' },
      { label: 'Brød & kager', value: 'bread' },
      { label: 'Slik', value: 'candy' }
    ]
  })

  return (
    <Flex direction={'column'}>
      <HStack>
        <Select.Root
          onValueChange={async (e) => {
            await navigate({
              to: '/dashboard/meals',
              search: (old) => ({ ...old, categories: e.value }),
              replace: true
            })
          }}
          multiple
          collection={frameworks}
          size="sm"
          width="320px"
        >
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="choose.category" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {frameworks.items.map((framework) => (
                  <Select.Item item={framework} key={framework.value}>
                    {framework.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
        <InputGroup
          startElement={<BiSearch />}
          endElement={<Kbd variant={'outline'}>CTRL + K</Kbd>}
        >
          <Input
            ref={inputRef}
            onChange={(e) => setSearchValue(e.target.value)}
            defaultValue={query}
            size={'sm'}
            type="text"
            placeholder={t('search')}
            aria-label={t('search')}
          />
        </InputGroup>
        <Tooltip content={t('refresh.description')}>
          <Button
            w={'36px'}
            h={'36px'}
            loading={isFetching}
            onClick={refetch}
            variant={'outline'}
            size={'sm'}
            aria-label={t('refresh')}
          >
            <IoRefresh />
          </Button>
        </Tooltip>
      </HStack>
      <MealList />
    </Flex>
  )
}
