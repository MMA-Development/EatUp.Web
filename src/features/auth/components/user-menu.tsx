import { useAppDispatch, useAppSelector } from '@store/hooks.ts'
import { logout, selectUser } from '@features/auth/store'
import { Avatar, Button, Menu, Portal, useBreakpointValue } from '@chakra-ui/react'
import { useNavigate } from '@tanstack/react-router'

export function UserMenu() {
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const mobile = useBreakpointValue({ base: true, md: false })

  async function handleLogout() {
    dispatch(logout())
    await navigate({ to: '/auth/login' })
  }

  if (!user) return null

  return (
    <Menu.Root positioning={{ sameWidth: true }}>
      <Menu.Trigger asChild>
        <Button justifyContent={'flex-start'} variant="outline" size="sm">
          <Avatar.Root size={'2xs'}>
            <Avatar.Fallback />
            <Avatar.Image />
          </Avatar.Root>
          {!mobile && user}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item cursor={'pointer'} value="profile">
              Profile
            </Menu.Item>
            <Menu.Item cursor={'pointer'} value="settings">
              Settings
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item
              cursor={'pointer'}
              value="delete"
              color="fg.error"
              _hover={{ bg: 'bg.error', color: 'fg.error' }}
              onClick={handleLogout}
            >
              Logout
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}
