import { Flex, SimpleGrid } from '@chakra-ui/react'
import { OrdersTodaySparkline } from '@features/orders/components/orders-today-sparkline.tsx'
import { BalanceTransactionsSparkline } from '@features/stripe/components/balance-transaction-sparkline.tsx'

export function Dashboard() {
  return (
    <Flex direction={'column'} gap={4}>
      <SimpleGrid minChildWidth="2xs" gap="40px">
        <OrdersTodaySparkline />
        <BalanceTransactionsSparkline />
      </SimpleGrid>
    </Flex>
  )
}
