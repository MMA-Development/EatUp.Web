import { RouterProvider } from '@tanstack/react-router'
import { router } from '@app/router.ts'
import { useAppSelector } from '@store/hooks.ts'

function App() {
  const auth = useAppSelector((state) => state.auth)

  return <RouterProvider router={router} context={{ auth }} />
}

export default App
