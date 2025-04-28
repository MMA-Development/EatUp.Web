import {RouterProvider} from "@tanstack/react-router";

function App() {

  const peter = "klaus"

  return (
    <RouterProvider router={router} context={{auth}}/>
  )
}

export default App
