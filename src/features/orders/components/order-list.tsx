import {
  ButtonGroup,
  createListCollection,
  Flex,
  HStack,
  IconButton,
  Pagination,
  Portal,
  Select,
  Separator,
  Status,
  Table,
  useBreakpointValue
} from '@chakra-ui/react'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import moment from 'moment'
import { Tooltip } from '@components/ui/tooltip.tsx'
import { useTranslation } from 'react-i18next'
import { CustomLink } from '@components/ui/custom-link.tsx'
import { useGetOrdersQuery } from '@features/orders/api/get-orders.ts'

const limitList = createListCollection({
  items: [
    { label: '10', value: '10' },
    { label: '25', value: '25' },
    { label: '50', value: '50' }
  ]
})

export function OrderList() {
  const { t } = useTranslation('orders')

  const navigate = useNavigate()

  const {
    i18n: { language }
  } = useTranslation()

  const { take, skip, query } = useSearch({ from: '/dashboard/orders' })
  const { data: orders } = useGetOrdersQuery({ skip, take, query })

  const mobile = useBreakpointValue({ base: true, md: false })

  return (
    <Flex direction={'column'}>
      <Table.Root size="sm">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>{t('order.number')}</Table.ColumnHeader>
            <Table.ColumnHeader>{t('user')}</Table.ColumnHeader>
            <Table.ColumnHeader>{t('meal')}</Table.ColumnHeader>
            <Table.ColumnHeader>{t('payment.status')}</Table.ColumnHeader>
            <Table.ColumnHeader>{t('payment.id')}</Table.ColumnHeader>
            <Table.ColumnHeader>{t('price')}</Table.ColumnHeader>
            <Table.ColumnHeader>{t('order.created')}</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {orders?.items.map((order, index) => (
            <Table.Row key={index}>
              <Table.Cell cursor="help">
                <Tooltip interactive={true} content={order.id}>
                  <span>{order.id.substring(0, 8)}...</span>
                </Tooltip>
              </Table.Cell>
              <Table.Cell>{order.userName}</Table.Cell>
              <Table.Cell>
                <CustomLink to={'/dashboard/meals/$id'} params={{ id: order.foodPackageId }}>
                  {order.foodPackageTitle}
                </CustomLink>
              </Table.Cell>
              <Table.Cell>
                <HStack>
                  {order.paymentStatus}{' '}
                  <Status.Root
                    colorPalette={order.paymentStatus === 'Pending' ? 'orange' : 'green'}
                  >
                    <Status.Indicator />
                  </Status.Root>
                </HStack>
              </Table.Cell>
              <Table.Cell>{order.paymentId}</Table.Cell>
              <Table.Cell>{order.price} kr.</Table.Cell>
              <Table.Cell cursor="help">
                <Tooltip
                  content={moment.utc(order.createdAt).local().locale(language).format('LLLL')}
                >
                  <span>{moment.utc(order.createdAt).local().locale(language).fromNow()}</span>
                </Tooltip>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Pagination.Root
        mt={4}
        onPageChange={(page) =>
          navigate({
            to: '/dashboard/orders',
            search: (old) => ({ ...old, skip: (page.page - 1) * take }),
            replace: true
          })
        }
        count={orders?.totalCount}
        pageSize={take}
        page={skip / take + 1}
        defaultPage={skip / take + 1}
      >
        <HStack>
          <ButtonGroup variant="ghost" size="sm" w={'100%'}>
            <Pagination.PrevTrigger asChild>
              <IconButton>
                <LuChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>

            {!mobile ? (
              <Pagination.Items
                render={(page) => (
                  <IconButton variant={{ base: 'ghost', _selected: 'outline' }}>
                    {page.value}
                  </IconButton>
                )}
              />
            ) : (
              <Pagination.PageText />
            )}

            <Pagination.NextTrigger asChild>
              <IconButton>
                <LuChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
            <Separator orientation="vertical" h={6} />
            <Pagination.PageText ml={'auto'} format="long" flex="1" />
          </ButtonGroup>
          <Separator orientation="vertical" h={6} />
          <Select.Root
            defaultValue={[String(take)]}
            onValueChange={(e) => {
              void navigate({
                to: '/dashboard/orders',
                search: (old) => ({ ...old, take: Number(e.value[0]) }),
                replace: true
              })
            }}
            collection={limitList}
            size="sm"
            width="100px"
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {limitList.items.map((item) => (
                    <Select.Item item={item} key={item.value}>
                      {item.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </HStack>
      </Pagination.Root>
    </Flex>
  )
}
