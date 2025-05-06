import {
  Accordion,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Separator,
  Span,
  Stack,
  Text
} from '@chakra-ui/react'
import { Breadcrumbs } from '@components/ui/breadcrumbs.tsx'
import { ColorModeButton } from '@components/ui/color-mode.tsx'
import { LanguageSelector } from '@components/ui/language-selector.tsx'
import { Outlet, useNavigate, useRouter, useRouterState } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { FiSidebar } from 'react-icons/fi'
import { LuFactory, LuSalad } from 'react-icons/lu'
import { UserMenu } from '@features/auth/components/user-menu.tsx'
import { useAppSelector } from '@store/hooks.ts'
import { selectVendor } from '@features/auth/store'
import { LocalStorage, useLocalStorage } from '@hooks/use-local-storage.ts'

export function DashboardLayout() {
  const navigate = useNavigate()
  const location = useRouterState({ select: (s) => s.location })

  const vendor = useAppSelector(selectVendor)

  const { t } = useTranslation('common')

  const { routesByPath } = useRouter()

  const [sidebarCollapsed, setSidebarCollapsed] = useLocalStorage(
    LocalStorage.SIDEBAR_COLLAPSED,
    false
  )

  const dashboardRoute = routesByPath['/dashboard']
  const dashboardRoutes = Object.values(dashboardRoute.children ?? {})

  if (!vendor) return null

  return (
    <Flex h="100vh" w="100vw">
      <Box
        gap={2}
        px={{ base: 2, md: 4 }}
        as="aside"
        w="240px"
        h="100%"
        bg="bg.subtle"
        borderRight="1px solid"
        borderRightColor="border"
      >
        <Flex my={4} justifyContent={{ base: 'center', md: 'flex-start' }}>
          <HStack>
            <IconButton size={'xs'} pointerEvents={'none'}>
              <LuFactory />
            </IconButton>
            <Stack gap={0} display={{ base: 'none', md: 'flex' }}>
              <Text textStyle={'sm'} color={'fg'} fontWeight={'semibold'}>
                {vendor.name}
              </Text>
              <Text textStyle={'xs'} color={'fg.muted'}>
                {vendor.cvr}
              </Text>
            </Stack>
          </HStack>
        </Flex>
        <Stack mt={8}>
          <Text textStyle={'xs'} color={'fg.muted'} display={{ base: 'none', md: 'flex' }}>
            Dashboard
          </Text>
          <Button
            display={{ base: 'none', md: 'flex' }}
            size={'sm'}
            variant={'ghost'}
            justifyContent={'flex-start'}
            onClick={() => navigate({ to: '/dashboard' })}
          >
            Dashboard
          </Button>
        </Stack>

        <Stack my={2}>
          <Text textStyle={'xs'} color={'fg.muted'} display={{ base: 'none', md: 'flex' }}>
            Måltids håndtering
          </Text>
          <Accordion.Root variant={'plain'} collapsible defaultValue={['info']}>
            <Accordion.Item value={'meal'}>
              <Accordion.ItemTrigger asChild w={'100%'}>
                <Button w={'100%'} size={'sm'} variant={'ghost'} justifyContent={'flex-start'}>
                  <Icon fontSize="lg" color="fg.subtle">
                    <LuSalad />
                  </Icon>
                  <Span display={{ base: 'none', md: 'flex' }} textStyle={'sm'}>
                    Måltider
                  </Span>
                  <Accordion.ItemIndicator display={{ base: 'none', md: 'flex' }} ml={'auto'} />
                </Button>
              </Accordion.ItemTrigger>
              <Accordion.ItemContent pt={2}>
                {dashboardRoutes.map((route) => (
                  <Stack key={route.id} flexDirection={'row'} ml={6}>
                    <Separator orientation="vertical" h={10} />
                    <Accordion.ItemBody p={0} w={'100%'}>
                      <Button
                        w={'100%'}
                        size={'sm'}
                        variant={route.fullPath === location.pathname ? 'subtle' : 'ghost'}
                        justifyContent={'flex-start'}
                        onClick={() => navigate({ to: route.fullPath })}
                      >
                        {route.options.staticData?.name ? t(route.options.staticData.name) : ''}
                      </Button>
                    </Accordion.ItemBody>
                  </Stack>
                ))}
              </Accordion.ItemContent>
            </Accordion.Item>
          </Accordion.Root>
        </Stack>
        <Stack position={'absolute'} bottom={12} mt={'auto'}>
          <UserMenu />
        </Stack>
      </Box>

      <Flex flex="1" flexDirection="column">
        <Box
          as="header"
          h="64px"
          w="100%"
          bg="bg"
          borderBottom="1px"
          borderColor="gray.200"
          px="4"
          alignContent={'center'}
        >
          <HStack>
            <IconButton
              variant={'ghost'}
              size={'xs'}
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <FiSidebar />
            </IconButton>
            <Separator orientation="vertical" h={6} />
            <Breadcrumbs />
            <LanguageSelector size={'sm'} ml={'auto'} w={'200px'} />
            <ColorModeButton variant={'outline'} />
          </HStack>
        </Box>

        <Box flex="1" p="4">
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  )
}
