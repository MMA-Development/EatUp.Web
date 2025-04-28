import { RouterProvider } from '@tanstack/react-router'

function App() {
  const peter = 'klaus'
  const auth = peter

  return <RouterProvider router={router} context={{ auth }} />
}

export default App
