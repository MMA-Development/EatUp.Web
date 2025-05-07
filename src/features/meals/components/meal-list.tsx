import {
  Badge,
  Box,
  ButtonGroup,
  createListCollection,
  Flex,
  HStack,
  IconButton,
  Menu,
  Pagination,
  Portal,
  Select,
  Table,
  useBreakpointValue
} from '@chakra-ui/react'
import { useLoaderData, useNavigate, useSearch } from '@tanstack/react-router'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useDeleteMealMutation } from '../api/delete-meal'

const limitList = createListCollection({
  items: [
    { label: '10', value: '10' },
    { label: '25', value: '25' },
    { label: '50', value: '50' }
  ]
})

export function MealList() {
  const navigate = useNavigate()

  const [remove] = useDeleteMealMutation()

  const { data, totalCount } = useLoaderData({ from: '/dashboard/meals' })
  const { limit } = useSearch({ from: '/dashboard/meals' })

  const mobile = useBreakpointValue({ base: true, md: false })

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
            <Table.ColumnHeader textAlign="end">Handlinger</Table.ColumnHeader>
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
              <Table.Cell textAlign="end">
                <Menu.Root positioning={{ placement: 'left-start' }}>
                  <Menu.Trigger asChild>
                    <IconButton size={'2xs'} variant={'ghost'} aria-label={'more options'}>
                      <BsThreeDotsVertical />
                    </IconButton>
                  </Menu.Trigger>
                  <Portal>
                    <Menu.Positioner>
                      <Menu.Content>
                        <Menu.Item
                          value="edit"
                          onClick={() =>
                            navigate({
                              to: '/dashboard/meals/$id',
                              params: {
                                id: meal.id
                              }
                            })
                          }
                        >
                          Edit
                        </Menu.Item>
                        <Menu.Separator />
                        <Menu.Item
                          value="delete"
                          color="fg.error"
                          _hover={{ bg: 'bg.error', color: 'fg.error' }}
                          onClick={() => remove(meal.id)}
                        >
                          <Box flex="1">Delete</Box>
                        </Menu.Item>
                      </Menu.Content>
                    </Menu.Positioner>
                  </Portal>
                </Menu.Root>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Pagination.Root
        bottom={4}
        position={'absolute'}
        onPageChange={(page) =>
          navigate({
            to: '/dashboard/meals',
            search: (old) => ({ ...old, skip: (page.page - 1) * limit }),
            replace: true
          })
        }
        count={totalCount}
        pageSize={limit}
        defaultPage={1}
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
            <Pagination.PageText ml={'auto'} format="long" flex="1" />
          </ButtonGroup>
          <Select.Root
            defaultValue={[String(limit)]}
            onValueChange={(e) => {
              void navigate({
                to: '/dashboard/meals',
                search: (old) => ({ ...old, limit: Number(e.value[0]) }),
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
