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
  Separator,
  Table,
  useBreakpointValue
} from '@chakra-ui/react'
import { useLoaderData, useNavigate, useSearch } from '@tanstack/react-router'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import { useDeleteMealMutation } from '../api/delete-meal'
import { useTranslation } from 'react-i18next'
import { getRandomColor } from '@utils/color.ts'

const limitList = createListCollection({
  items: [
    { label: '10', value: '10' },
    { label: '25', value: '25' },
    { label: '50', value: '50' }
  ]
})

export function MealList() {
  const { t } = useTranslation('meals')

  const navigate = useNavigate()

  const [remove] = useDeleteMealMutation()

  const { data, totalCount } = useLoaderData({ from: '/dashboard/meals' })
  const { take, skip } = useSearch({ from: '/dashboard/meals' })

  const mobile = useBreakpointValue({ base: true, md: false })

  return (
    <Flex direction={'column'}>
      <Table.Root size="sm">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>{t('title')}</Table.ColumnHeader>
            <Table.ColumnHeader>{t('original.price')}</Table.ColumnHeader>
            <Table.ColumnHeader>{t('price')}</Table.ColumnHeader>
            <Table.ColumnHeader>{t('quantity')}</Table.ColumnHeader>
            <Table.ColumnHeader>{t('max.order.quantity')}</Table.ColumnHeader>
            <Table.ColumnHeader>{t('categories')}</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">{t('actions')}</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((meal, index) => (
            <Table.Row key={index}>
              <Table.Cell>{meal.title}</Table.Cell>
              <Table.Cell>{meal.originalPrice} kr.</Table.Cell>
              <Table.Cell>{meal.price} kr.</Table.Cell>
              <Table.Cell>{meal.quantity}</Table.Cell>
              <Table.Cell>{meal.maxOrderQuantity}</Table.Cell>
              <Table.Cell>
                <HStack gap={2}>
                  {meal.categories.map((category) => (
                    <Badge
                      variant="solid"
                      colorPalette={getRandomColor(category.name)}
                      key={category.id}
                    >
                      {category.name}
                    </Badge>
                  ))}
                </HStack>
              </Table.Cell>
              <Table.Cell textAlign="end">
                <Menu.Root positioning={{ placement: 'left-start' }}>
                  <Menu.Trigger asChild>
                    <IconButton size={'2xs'} variant={'ghost'} aria-label={t('more.options')}>
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
                          {t('edit')}
                        </Menu.Item>
                        <Menu.Separator />
                        <Menu.Item
                          value="delete"
                          color="fg.error"
                          _hover={{ bg: 'bg.error', color: 'fg.error' }}
                          onClick={() => remove(meal.id)}
                        >
                          <Box flex="1">{t('delete')}</Box>
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
            search: (old) => ({ ...old, skip: (page.page - 1) * take }),
            replace: true
          })
        }
        count={totalCount}
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
                to: '/dashboard/meals',
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
