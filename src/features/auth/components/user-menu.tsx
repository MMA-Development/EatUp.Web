import { useAppDispatch, useAppSelector } from '@store/hooks.ts'
import { logout, selectUser } from '@features/auth/store'
import { Avatar, Button, Menu, Portal } from '@chakra-ui/react'
import { useNavigate } from '@tanstack/react-router'

export function UserMenu() {
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  async function handleLogout() {
    dispatch(logout())
    await navigate({ to: '/auth/login' })
  }

  if (!user) return null

  return (
    <Menu.Root positioning={{ sameWidth: true }}>
      <Menu.Trigger rounded={'lg'} asChild>
        <Button justifyContent={'flex-start'} variant="outline" size="sm" w={'205px'}>
          <Avatar.Root size={'2xs'}>
            <Avatar.Fallback />
            <Avatar.Image />
          </Avatar.Root>
          {user}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content rounded={'lg'}>
            <Menu.Item cursor={'pointer'} rounded={'lg'} value="profile">
              Profile
            </Menu.Item>
            <Menu.Item cursor={'pointer'} rounded={'lg'} value="settings">
              Settings
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item
              cursor={'pointer'}
              rounded={'lg'}
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
