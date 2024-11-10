import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import ViewPaste from "./components/ViewPaste"
import Paste from "./components/Paste"
import { Provider } from 'react-redux'
import { store } from './store.js'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element:
        <>
          <Navbar />
          <Home />
        </>
    },
    {
      path: "/pastes",
      element:
        <>
          <Navbar />
          <Paste />
        </>
    },
    {
      path: "/pastes/:id",
      element:
        <>
          <Navbar />
          <ViewPaste />
        </>
    }
  ]
)

function App() {


  return (
    <>
      <Provider store={store} >
        <RouterProvider router={router} />
      </Provider>
    </>
  )
}

export default App
