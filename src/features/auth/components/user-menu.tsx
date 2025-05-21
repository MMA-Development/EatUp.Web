import { useAppDispatch, useAppSelector } from '@store/hooks.ts'
import { logout, selectToken, selectUser } from '@features/auth/store'
import { Avatar, Button, Menu, Portal, useBreakpointValue } from '@chakra-ui/react'
import { useNavigate } from '@tanstack/react-router'
import { useSignoutMutation } from '@features/auth/api/signout.ts'

export function UserMenu() {
  const user = useAppSelector(selectUser)
  const token = useAppSelector(selectToken)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [signout] = useSignoutMutation()

  const mobile = useBreakpointValue({ base: true, md: false })

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
            <Menu.Item
              cursor={'pointer'}
              value="profile"
              onClick={() => navigate({ to: '/dashboard/profile' })}
            >
              Profile
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
