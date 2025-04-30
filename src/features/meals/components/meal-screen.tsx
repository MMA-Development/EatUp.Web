import { Flex, Input, InputGroup, Kbd } from '@chakra-ui/react'
import { useLocation, useNavigate, useSearch } from '@tanstack/react-router'
import { BiSearch } from 'react-icons/bi'
import { MealList } from '@features/meals/components/meal-list.tsx'
import { useInputFocusHotkey } from '@hooks/use-input-focus-hotkey.ts'
import { useDebouncedState } from '@hooks/use-debounced-state.ts'
import { useEffect } from 'react'

export function MealScreen() {
  const location = useLocation()
  const navigate = useNavigate()

  const inputRef = useInputFocusHotkey()

  const { query } = useSearch({ from: '/dashboard/meals' })
  const [searchValue, setSearchValue] = useDebouncedState(query ?? '', 300)

  useEffect(() => {
    navigate({
      to: location.pathname,
      search: () => ({ query: searchValue })
    })
  }, [searchValue, navigate, location.pathname])

  return (
    <Flex direction={'column'}>
      <InputGroup startElement={<BiSearch />} endElement={<Kbd variant={'outline'}>CTRL + K</Kbd>}>
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
      <MealList />
    </Flex>
  )
}
