import { router } from '@app/router.ts'
import { useAppSelector } from '@store/hooks.ts'
import { RouterProvider } from '@tanstack/react-router'
import { selectAuth } from '@features/auth/store'

function App() {
  const auth = useAppSelector(selectAuth)

  return <RouterProvider router={router} context={{ auth }} />
}

export default App
