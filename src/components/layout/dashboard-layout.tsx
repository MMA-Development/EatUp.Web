import { Box, Button, Flex, Separator, Stack } from '@chakra-ui/react'
import { Brand } from '@components/ui/brand.tsx'
import { Breadcrumbs } from '@components/ui/breadcrumbs.tsx'
import { Outlet, useNavigate } from '@tanstack/react-router'

export function DashboardLayout() {
  const navigate = useNavigate()
  return (
    <Flex h="100vh" w="100vw">
      <Box
        gap={2}
        px={4}
        as="aside"
        w="240px"
        h="100%"
        bg="gray.100"
        borderRight="1px"
        borderColor="gray.200"
      >
        <Flex mt={2}>
          <Brand />
        </Flex>
        <Separator />
        <Stack mt={4}>
          <Button onClick={() => navigate({ to: '/dashboard' })}>Dashboard</Button>
          <Button onClick={() => navigate({ to: '/dashboard/meals' })}>Meals</Button>
        </Stack>
      </Box>

      <Flex flex="1" flexDirection="column">
        {/* Topbar */}
        <Box
          as="header"
          h="64px"
          w="100%"
          bg="white"
          borderBottom="1px"
          borderColor="gray.200"
          px="4"
          alignContent={'center'}
        >
          <Breadcrumbs />
        </Box>

        <Box flex="1" p="4" bg="gray.50">
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  )
}
