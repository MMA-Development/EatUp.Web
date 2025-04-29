import { Box, Button, Flex } from '@chakra-ui/react'
import { Outlet } from '@tanstack/react-router'

export function DashboardLayout() {
  return (
    <Flex h="100vh" w="100vw">
      <Box as="aside" w="240px" h="100%" bg="gray.100" borderRight="1px" borderColor="gray.200">
        <Button>Dashboard</Button>
        <Button>Pakker</Button>
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
        >
          <Button>Hans Peter</Button>
        </Box>

        <Box flex="1" p="4" bg="gray.50">
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  )
}
