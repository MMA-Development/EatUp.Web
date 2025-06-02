import { Button, Flex, HStack, Input, InputGroup, Kbd } from '@chakra-ui/react'
import { useDebouncedState } from '@hooks/use-debounced-state.ts'
import { useInputFocusHotkey } from '@hooks/use-input-focus-hotkey.ts'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useEffect } from 'react'
import { BiSearch } from 'react-icons/bi'
import { IoRefresh } from 'react-icons/io5'
import { Tooltip } from '@components/ui/tooltip.tsx'
import { useGetOrdersQuery } from '@features/orders/api/get-orders.ts'
import { OrderList } from '@features/orders/components/order-list.tsx'
import { useTranslation } from 'react-i18next'

export function OrderScreen() {
  const navigate = useNavigate()
  const inputRef = useInputFocusHotkey()

  const { t } = useTranslation('orders')

  const { query, skip, take } = useSearch({ from: '/dashboard/orders' })
  const { refetch, isFetching } = useGetOrdersQuery({ skip, take, query })

  const [searchValue, setSearchValue] = useDebouncedState(query ?? '', 300)

  useEffect(() => {
    void navigate({
      to: '/dashboard/orders',
      search: (old) => ({ query: searchValue, take: old.take }),
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
            onChange={(e) => setSearchValue(e.target.value)}
            defaultValue={query}
            size={'sm'}
            type="text"
            placeholder={t('search')}
            aria-label={t('search')}
          />
        </InputGroup>
        <Tooltip content={t('refresh')}>
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
      <OrderList />
    </Flex>
  )
}
