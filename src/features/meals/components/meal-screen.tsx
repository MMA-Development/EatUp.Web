import { Button, Flex, HStack, Input, InputGroup, Kbd } from '@chakra-ui/react'
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
import { CategoriesSelector } from '@features/meals/components/categories-selector.tsx'

export function MealScreen() {
  const { t } = useTranslation('meals')

  const navigate = useNavigate()

  const inputRef = useInputFocusHotkey()

  const { query, skip, take, categories } = useSearch({ from: '/dashboard/meals' })
  const { refetch, isFetching } = useGetMealsQuery({ skip, take, query, categories })

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

  return (
    <Flex direction={'column'}>
      <HStack>
        <CategoriesSelector
          value={categories}
          onValueChange={async ({ value }) => {
            await navigate({
              to: '/dashboard/meals',
              search: (old) => ({ ...old, categories: value }),
              replace: true
            })
          }}
        />
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
