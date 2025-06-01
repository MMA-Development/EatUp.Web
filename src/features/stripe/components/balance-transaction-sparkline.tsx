import { Chart, useChart } from '@chakra-ui/charts'
import { Box, Card, HStack, IconButton, Input, Skeleton, Stat } from '@chakra-ui/react'
import { useGetBalanceTransactionsQuery } from '@features/stripe/api/balance-transactions.ts'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoRefresh } from 'react-icons/io5'
import { LuDollarSign } from 'react-icons/lu'
import { Area, AreaChart, Tooltip, XAxis, YAxis } from 'recharts'
import { CategoricalChartState } from 'recharts/types/chart/types'

const DAYS = 14

export function BalanceTransactionsSparkline() {
  const { t } = useTranslation('stripe')

  const [fromDate, setFromDate] = useState(
    moment()
      .subtract(DAYS - 1, 'days')
      .format('YYYY-MM-DD')
  )
  const [toDate, setToDate] = useState(moment().format('YYYY-MM-DD'))

  const { data, isLoading, isError, refetch, isFetching } = useGetBalanceTransactionsQuery({
    from: fromDate,
    to: toDate
  })

  const transactions = useMemo(() => data ?? [], [data])

  const chartData = useMemo(() => {
    const start = moment(fromDate).startOf('day')
    const end = moment(toDate).startOf('day')
    const daysDiff = end.diff(start, 'days') + 1

    const result: { date: string; revenue: number; orders: number }[] = []

    for (let i = 0; i < daysDiff; i++) {
      const day = moment(fromDate).add(i, 'days')
      const dayStr = day.format('YYYY-MM-DD')

      const dayTransactions = transactions.filter(
        (tx) => moment(tx.date).format('YYYY-MM-DD') === dayStr
      )

      const revenue = dayTransactions.reduce((sum, tx) => sum + tx.revenue, 0)
      const orders = dayTransactions.reduce((sum, tx) => sum + tx.orders, 0)

      result.push({ date: dayStr, revenue, orders })
    }

    return result
  }, [transactions, fromDate, toDate])

  const chart = useChart({
    data: chartData,
    series: [{ name: 'revenue', color: 'blue.solid' }]
  })

  const lastIndex = chart.data.length - 1
  const [value, setValue] = useState(0)
  const [label, setLabel] = useState<string | undefined>(undefined)

  useEffect(() => {
    const totalRevenue = transactions.reduce((sum, tx) => sum + tx.revenue, 0)
    setValue(totalRevenue)
  }, [transactions])

  const onMouseMove = (state: CategoricalChartState) => {
    const index = state.activeTooltipIndex ?? lastIndex
    const { revenue = value } = chart.data[index]
    setValue(revenue)
    setLabel(state.activeLabel)
  }

  const onMouseLeave = () => {
    const totalRevenue = transactions.reduce((sum, tx) => sum + tx.revenue, 0)
    setValue(totalRevenue)
    setLabel(undefined)
  }

  return (
    <Card.Root size="sm" overflow="hidden">
      <Skeleton loading={isLoading}>
        <Card.Body>
          <Stat.Root>
            <HStack>
              <Stat.Label>
                <LuDollarSign /> {t('balance.revenue')}
              </Stat.Label>

              <Input
                value={fromDate}
                onChange={(e) => {
                  const value = e.target.value
                  if (moment(value).isAfter(toDate)) return
                  setFromDate(value)
                }}
                size="2xs"
                type="date"
              />
              <Input
                value={toDate}
                onChange={(e) => {
                  const value = e.target.value
                  if (moment(value).isBefore(fromDate)) return
                  setToDate(value)
                }}
                size="2xs"
                type="date"
              />
              <IconButton
                variant="outline"
                size="xs"
                ml="auto"
                loading={isFetching}
                onClick={refetch}
                aria-label="refresh"
              >
                <IoRefresh />
              </IconButton>
            </HStack>
            <HStack>
              <Stat.ValueText>
                {isLoading ? 'Loading...' : isError ? 'Error' : `${value.toLocaleString()} DKK`}
              </Stat.ValueText>
              {label && (
                <Box alignContent="end" ml="auto" textStyle="xs" color="fg.muted">
                  {moment(label).format('MMM D')}
                </Box>
              )}
            </HStack>
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
            <XAxis dataKey={chart.key('date')} hide />
            <YAxis hide />
            <Tooltip
              cursor={{ stroke: chart.color('blue.solid'), strokeWidth: 2 }}
              content={() => null}
            />
            {chart.series.map((item) => (
              <Area
                key={item.name}
                activeDot={{ stroke: chart.color('bg') }}
                isAnimationActive
                type="bump"
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
