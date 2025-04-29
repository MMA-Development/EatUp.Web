import { router } from '@app/router.ts'
import { useAppSelector } from '@store/hooks.ts'
import { RouterProvider } from '@tanstack/react-router'

function App() {
  const auth = useAppSelector((state) => state.auth)

  return <RouterProvider router={router} context={{ auth }} />
}

export default App
