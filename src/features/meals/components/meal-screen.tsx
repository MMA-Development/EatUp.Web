import { Flex, Input, InputGroup, Kbd } from '@chakra-ui/react'
import { MealList } from '@features/meals/components/meal-list.tsx'
import { useDebouncedState } from '@hooks/use-debounced-state.ts'
import { useInputFocusHotkey } from '@hooks/use-input-focus-hotkey.ts'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useEffect } from 'react'
import { BiSearch } from 'react-icons/bi'

export function MealScreen() {
  const navigate = useNavigate()

  const inputRef = useInputFocusHotkey()

  const { query } = useSearch({ from: '/dashboard/meals' })
  const [searchValue, setSearchValue] = useDebouncedState(query ?? '', 300)

  useEffect(() => {
    navigate({
      to: '/dashboard/meals',
      search: () => ({ query: searchValue })
    })
  }, [navigate, searchValue])

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
