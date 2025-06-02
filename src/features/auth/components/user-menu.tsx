import { useAppDispatch, useAppSelector } from '@store/hooks.ts'
import { logout, selectToken, selectUser } from '@features/auth/store'
import { Avatar, Button, Menu, Portal, Text } from '@chakra-ui/react'
import { useNavigate } from '@tanstack/react-router'
import { useSignoutMutation } from '@features/auth/api/signout.ts'
import { useTranslation } from 'react-i18next'
import { selectSidebarCollapsed } from '@features/ui/store'

export function UserMenu() {
  const { t } = useTranslation('auth')

  const user = useAppSelector(selectUser)
  const token = useAppSelector(selectToken)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [signout] = useSignoutMutation()

  const sidebarCollapsed = useAppSelector(selectSidebarCollapsed)

  async function handleLogout() {
    if (!token) {
      dispatch(logout())
    } else {
      signout(token.refreshToken)
      dispatch(logout())
    }
    await navigate({ to: '/auth/login' })
  }

  if (!user) return null

  return (
    <Menu.Root positioning={{ sameWidth: true }}>
      <Menu.Trigger asChild>
        <Button justifyContent={'flex-start'} variant="outline" size="xs">
          <Avatar.Root size={'2xs'}>
            <Avatar.Fallback />
            <Avatar.Image />
          </Avatar.Root>
          <Text>{!sidebarCollapsed && user}</Text>
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item
              cursor={'pointer'}
              value="profile"
              onClick={() => navigate({ to: '/dashboard/profile' })}
            >
              {t('profile')}
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item
              cursor={'pointer'}
              value="delete"
              color="fg.error"
              _hover={{ bg: 'bg.error', color: 'fg.error' }}
              onClick={handleLogout}
            >
              {t('logout')}
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}
