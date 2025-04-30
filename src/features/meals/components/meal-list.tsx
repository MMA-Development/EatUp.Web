import { Badge, ButtonGroup, Flex, HStack, IconButton, Pagination, Table } from '@chakra-ui/react'
import { useLoaderData, useNavigate, useSearch } from '@tanstack/react-router'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'

export function MealList() {
  const navigate = useNavigate()

  const { data, totalCount } = useLoaderData({ from: '/dashboard/meals' })
  const { page, limit } = useSearch({ from: '/dashboard/meals' })

  return (
    <Flex direction={'column'}>
      <Table.Root size="sm">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Vendor</Table.ColumnHeader>
            <Table.ColumnHeader>Title</Table.ColumnHeader>
            <Table.ColumnHeader>Original Price</Table.ColumnHeader>
            <Table.ColumnHeader>Price</Table.ColumnHeader>
            <Table.ColumnHeader>Quantity</Table.ColumnHeader>
            <Table.ColumnHeader>Max quantity</Table.ColumnHeader>
            <Table.ColumnHeader>Categories</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((meal, index) => (
            <Table.Row key={index}>
              <Table.Cell>{meal.vendorName}</Table.Cell>
              <Table.Cell>{meal.title}</Table.Cell>
              <Table.Cell>{meal.originalPrice}</Table.Cell>
              <Table.Cell>{meal.price}</Table.Cell>
              <Table.Cell>{meal.quantity}</Table.Cell>
              <Table.Cell>{meal.maxOrderQuantity}</Table.Cell>
              <Table.Cell>
                <HStack gap={2}>
                  <Badge variant="solid" colorPalette="blue">
                    Meat
                  </Badge>
                  <Badge variant="solid" colorPalette="green">
                    Dinner
                  </Badge>
                </HStack>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Pagination.Root
        onPageChange={(page) =>
          navigate({
            to: '/dashboard/meals',
            search: () => ({ page: page.page - 1 })
          })
        }
        count={totalCount}
        pageSize={limit}
        defaultPage={page + 1}
      >
        <ButtonGroup variant="ghost" size="sm" w={'100%'}>
          <Pagination.PrevTrigger asChild>
            <IconButton>
              <LuChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(page) => (
              <IconButton variant={{ base: 'ghost', _selected: 'outline' }}>
                {page.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton>
              <LuChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
          <Pagination.PageText ml={'auto'} format="long" flex="1" />
        </ButtonGroup>
      </Pagination.Root>
    </Flex>
  )
}
