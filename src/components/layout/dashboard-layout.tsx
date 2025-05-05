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
import { LogoutButton } from '@features/auth/components/logout-button.tsx'
import { Outlet, useNavigate, useRouter, useRouterState } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { FiSidebar } from 'react-icons/fi'
import { LuFactory, LuSalad } from 'react-icons/lu'

export function DashboardLayout() {
  const navigate = useNavigate()
  const location = useRouterState({ select: (s) => s.location })

  const { t } = useTranslation('common')

  const { routesByPath } = useRouter()

  const dashboardRoute = routesByPath['/dashboard']
  const dashboardRoutes = Object.values(dashboardRoute.children ?? {})

  return (
    <Flex h="100vh" w="100vw">
      <Box
        gap={2}
        px={4}
        as="aside"
        w="240px"
        h="100%"
        bg="bg.subtle"
        borderRight="1px solid"
        borderRightColor="border"
      >
        <Flex my={4}>
          <HStack>
            <IconButton size={'xs'} rounded={'lg'} pointerEvents={'none'}>
              <LuFactory />
            </IconButton>
            <Stack gap={0}>
              <Text textStyle={'sm'} color={'fg'} fontWeight={'semibold'}>
                Super Brugsen
              </Text>
              <Text textStyle={'xs'} color={'fg.muted'}>
                Supermarked
              </Text>
            </Stack>
          </HStack>
        </Flex>
        <Stack mt={8}>
          <Text textStyle={'xs'} color={'fg.muted'}>
            Dashboard
          </Text>
          <Button
            size={'sm'}
            rounded={'lg'}
            variant={'ghost'}
            justifyContent={'flex-start'}
            onClick={() => navigate({ to: '/dashboard' })}
          >
            Dashboard
          </Button>
        </Stack>

        <Stack my={2}>
          <Text textStyle={'xs'} color={'fg.muted'}>
            Måltids håndtering
          </Text>
          <Accordion.Root variant={'plain'} collapsible defaultValue={['info']}>
            <Accordion.Item value={'meal'}>
              <Accordion.ItemTrigger asChild w={'100%'}>
                <Button
                  w={'100%'}
                  size={'sm'}
                  rounded={'lg'}
                  variant={'ghost'}
                  justifyContent={'flex-start'}
                >
                  <Icon fontSize="lg" color="fg.subtle">
                    <LuSalad />
                  </Icon>
                  <Span textStyle={'sm'}>Måltider</Span>
                  <Accordion.ItemIndicator ml={'auto'} />
                </Button>
              </Accordion.ItemTrigger>
              <Accordion.ItemContent pt={2}>
                {dashboardRoutes.map((route) => (
                  <Stack flexDirection={'row'} ml={6}>
                    <Separator orientation="vertical" h={10} />
                    <Accordion.ItemBody p={0} w={'100%'}>
                      <Button
                        w={'100%'}
                        size={'sm'}
                        rounded={'lg'}
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
          <LogoutButton mt={'auto'} colorPalette={'red'} variant={'outline'} />
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
            <IconButton variant={'ghost'} size={'xs'}>
              <FiSidebar />
            </IconButton>
            <Separator orientation="vertical" h={6} />
            <Breadcrumbs />
            <LanguageSelector size={'sm'} ml={'auto'} w={'200px'} rounded={'lg'} />
            <ColorModeButton variant={'outline'} rounded={'lg'} />
          </HStack>
        </Box>

        <Box flex="1" p="4">
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  )
}
