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

export function MealScreen() {
  const navigate = useNavigate()

  const inputRef = useInputFocusHotkey()

  const { query, skip, limit } = useSearch({ from: '/dashboard/meals' })
  const { refetch, isFetching } = useGetMealsQuery({ skip, limit, query })

  const [searchValue, setSearchValue] = useDebouncedState(query ?? '', 300)

  useEffect(() => {
    void navigate({
      to: '/dashboard/meals',
      search: (old) => ({ query: searchValue, limit: old.limit }),
      replace: true
    })
  }, [navigate, searchValue])

  return (
    <Flex direction={'column'}>
      <HStack>
        <InputGroup
          startElement={<BiSearch />}
          endElement={<Kbd variant={'outline'}>CTRL + K</Kbd>}
        >
          <Input
            ref={inputRef}
            rounded={'lg'}
            onChange={(e) => setSearchValue(e.target.value)}
            defaultValue={query}
            size={'sm'}
            type="text"
            placeholder={'search'}
            aria-label={'search'}
          />
        </InputGroup>
        <Tooltip content={'refresh data'}>
          <Button
            w={'36px'}
            h={'36px'}
            loading={isFetching}
            onClick={refetch}
            rounded={'lg'}
            variant={'outline'}
            size={'sm'}
            aria-label={'refresh'}
          >
            <IoRefresh />
          </Button>
        </Tooltip>
      </HStack>
      <MealList />
    </Flex>
  )
}
