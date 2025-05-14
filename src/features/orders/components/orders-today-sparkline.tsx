import moment from 'moment'
import { useEffect, useState } from 'react'
import { Chart, useChart } from '@chakra-ui/charts'
import { Badge, Box, Card, HStack, IconButton, Skeleton, Stat } from '@chakra-ui/react'
import { LuPackage } from 'react-icons/lu'
import { Area, AreaChart, Tooltip, XAxis, YAxis } from 'recharts'
import { useGetOrdersQuery } from '@features/orders/api/get-orders.ts'
import { OrderResponse } from '@features/orders/types'
import { CategoricalChartState } from 'recharts/types/chart/types'
import { useTranslation } from 'react-i18next'
import { IoRefresh } from 'react-icons/io5'

export function OrdersTodaySparkline() {
  const { t } = useTranslation('orders')

  const { data, isLoading, isError, refetch, isFetching } = useGetOrdersQuery()
  const [todayOrders, setTodayOrders] = useState<OrderResponse[]>([])
  const yesterdaysOrders = 1

  useEffect(() => {
    if (data && data.items) {
      const today = moment().startOf('day')
      const filteredOrders = data.items.filter((order) =>
        moment(order.createdAt).isSame(today, 'day')
      )
      setTodayOrders(filteredOrders)
    }
  }, [data])

  useEffect(() => {
    setValue(todayOrders.length)
  }, [todayOrders])

  const chartData = Array.from({ length: 24 }, (_, hour) => {
    const count = todayOrders.filter(
      (order) => moment.utc(order.createdAt).local().hour() === hour
    ).length
    return { time: `${hour}:00`, count }
  })

  const chart = useChart({
    data: chartData,
    series: [{ name: 'count', color: 'green.solid' }]
  })

  const lastIndex = chart.data.length - 1
  const [value, setValue] = useState(todayOrders.length)
  const [label, setLabel] = useState<string | undefined>(undefined)
  const percentage = ((todayOrders.length - yesterdaysOrders) / yesterdaysOrders) * 100

  const onMouseMove = (state: CategoricalChartState) => {
    const index = state.activeTooltipIndex ?? lastIndex
    const { count = value } = chart.data[index]
    setValue(count)
    setLabel(state.activeLabel)
  }

  const onMouseLeave = () => {
    setValue(todayOrders.length)
    setLabel(undefined)
  }

  return (
    <Card.Root size="sm" overflow="hidden">
      <Skeleton loading={isLoading}>
        <Card.Body>
          <Stat.Root>
            <HStack>
              <Stat.Label>
                <LuPackage /> {t('todays.orders')}
              </Stat.Label>
              <IconButton
                variant={'outline'}
                size={'xs'}
                ml={'auto'}
                loading={isFetching}
                onClick={refetch}
                aria-label={'refresh'}
              >
                <IoRefresh />
              </IconButton>
            </HStack>
            <HStack>
              <Stat.ValueText>
                {isLoading ? 'Loading...' : isError ? 'Error' : `${value}`}
              </Stat.ValueText>
              <Badge colorPalette="green" gap="0">
                <Stat.UpIndicator />
                {percentage.toFixed(0)}%
              </Badge>
              {label && (
                <Box alignContent={'end'} ml={'auto'} textStyle="xs" color="fg.muted">
                  {label}
                </Box>
              )}
            </HStack>
            <Stat.HelpText>{t('since.yesterday')}</Stat.HelpText>
          </Stat.Root>
        </Card.Body>
        <Chart.Root height="10" chart={chart}>
          <AreaChart
            accessibilityLayer
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            data={chart.data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <XAxis dataKey={chart.key('time')} hide />
            <YAxis hide />
            <Tooltip
              cursor={{ stroke: chart.color('teal.solid'), strokeWidth: 2 }}
              content={() => null}
            />
            {chart.series.map((item) => (
              <Area
                activeDot={{ stroke: chart.color('bg') }}
                key={item.name}
                isAnimationActive={true}
                type={'bump'}
                dataKey={chart.key(item.name)}
                fill={chart.color(item.color)}
                fillOpacity={0.2}
                stroke={chart.color(item.color)}
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        </Chart.Root>
      </Skeleton>
    </Card.Root>
  )
}
