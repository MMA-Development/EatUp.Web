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
  Text,
  useBreakpointValue
} from '@chakra-ui/react'
import { Breadcrumbs } from '@components/ui/breadcrumbs.tsx'
import { ColorModeButton } from '@components/ui/color-mode.tsx'
import { LanguageSelector } from '@components/ui/language-selector.tsx'
import { Tooltip } from '@components/ui/tooltip.tsx'
import { UserMenu } from '@features/auth/components/user-menu.tsx'
import { selectVendor } from '@features/auth/store'
import { useReverseGeocodeQuery } from '@features/map/api/reverse-geocode.ts'
import { LocalStorage, useLocalStorage } from '@hooks/use-local-storage.ts'
import { useAppSelector } from '@store/hooks.ts'
import { Outlet, useNavigate, useRouter, useRouterState } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FiSidebar } from 'react-icons/fi'
import { LuFactory, LuLayoutDashboard, LuSalad } from 'react-icons/lu'

export function DashboardLayout() {
  const navigate = useNavigate()
  const location = useRouterState({ select: (s) => s.location })

  const vendor = useAppSelector(selectVendor)
  const { data: address } = useReverseGeocodeQuery({
    lat: vendor?.latitude.toString() || '',
    lon: vendor?.longitude.toString() || ''
  })

  const mobile = useBreakpointValue({ base: true, md: false })

  const { t } = useTranslation('common')

  const { routesByPath } = useRouter()

  const [sidebarCollapsed, setSidebarCollapsed] = useLocalStorage(
    LocalStorage.SIDEBAR_COLLAPSED,
    false
  )

  useEffect(() => {
    if (mobile) {
      setSidebarCollapsed(true)
    }
  }, [mobile, setSidebarCollapsed])

  const dashboardRoute = routesByPath['/dashboard']
  const dashboardRoutes = Object.values(
    dashboardRoute.children
      ? dashboardRoute.children.filter((r) => r.options.staticData?.displayOnNav === true)
      : {}
  )

  if (!vendor) return null

  return (
    <Flex h="100vh" w="100vw">
      <Box
        gap={2}
        px={sidebarCollapsed ? 2 : 4}
        as="aside"
        h="100%"
        bg="bg.subtle"
        borderRight="1px solid"
        borderRightColor="border"
      >
        <Flex my={4} justifyContent={sidebarCollapsed ? 'center' : 'flex-start'}>
          <HStack>
            <IconButton size={'xs'} pointerEvents={'none'}>
              <LuFactory />
            </IconButton>
            <Stack gap={0} display={sidebarCollapsed ? 'none' : 'flex'}>
              <Text textStyle={'sm'} color={'fg'} fontWeight={'semibold'}>
                {vendor.name}
              </Text>
              {address && address.address && (
                <Text textStyle={'xs'} color={'fg.muted'}>
                  {address.address.road} {address.address.house_number}, {address.address.village}
                </Text>
              )}
            </Stack>
          </HStack>
        </Flex>
        <Stack mt={8}>
          <Text textStyle={'xs'} color={'fg.muted'} display={sidebarCollapsed ? 'none' : 'flex'}>
            Dashboard
          </Text>
          <Tooltip
            positioning={{ placement: 'right' }}
            openDelay={sidebarCollapsed ? 50 : 500}
            content={'Dashboard'}
          >
            <Button
              size={'sm'}
              variant={'ghost'}
              justifyContent={'flex-start'}
              onClick={() => navigate({ to: '/dashboard' })}
            >
              <Icon fontSize="lg" color="fg.subtle">
                <LuLayoutDashboard />
              </Icon>
              <Span display={sidebarCollapsed ? 'none' : 'flex'} textStyle={'sm'}>
                Dashboard
              </Span>
            </Button>
          </Tooltip>
        </Stack>

        <Stack my={2}>
          <Text textStyle={'xs'} color={'fg.muted'} display={sidebarCollapsed ? 'none' : 'flex'}>
            Måltids håndtering
          </Text>
          <Accordion.Root variant={'plain'} collapsible defaultValue={['info']}>
            <Accordion.Item value={'meal'}>
              <Tooltip
                positioning={{ placement: 'right' }}
                openDelay={sidebarCollapsed ? 50 : 500}
                content={'Måltider'}
              >
                <Accordion.ItemTrigger asChild w={'100%'}>
                  <Button w={'100%'} size={'sm'} variant={'ghost'} justifyContent={'flex-start'}>
                    <Icon fontSize="lg" color="fg.subtle">
                      <LuSalad />
                    </Icon>
                    <Span display={sidebarCollapsed ? 'none' : 'flex'} textStyle={'sm'}>
                      Måltider
                    </Span>
                    <Accordion.ItemIndicator
                      display={sidebarCollapsed ? 'none' : 'flex'}
                      ml={'auto'}
                    />
                  </Button>
                </Accordion.ItemTrigger>
              </Tooltip>
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
            <LanguageSelector size={'sm'} ml={'auto'} w={{ base: '75px', md: '200px' }} />
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
