import { Flex, SimpleGrid } from '@chakra-ui/react'
import { OrdersTodaySparkline } from '@features/orders/components/orders-today-sparkline.tsx'

export function Dashboard() {
  return (
    <Flex direction={'column'} gap={4}>
      <SimpleGrid minChildWidth="sm" gap="40px">
        <OrdersTodaySparkline />
        <OrdersTodaySparkline />
        <OrdersTodaySparkline />
        <OrdersTodaySparkline />
      </SimpleGrid>
    </Flex>
  )
}
