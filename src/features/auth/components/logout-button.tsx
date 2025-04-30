import { Button, ButtonProps } from '@chakra-ui/react'
import { useAppDispatch } from '@store/hooks.ts'
import { logout } from '@features/auth/store'
import { useNavigate } from '@tanstack/react-router'

export function LogoutButton({ ...props }: ButtonProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  async function handleLogout() {
    dispatch(logout())
    await navigate({ to: '/auth/login' })
  }

  return (
    <Button {...props} onClick={handleLogout}>
      Logout
    </Button>
  )
}
