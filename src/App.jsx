import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Details from './pages/Details'

export default function App() {
  const routes = createBrowserRouter(
    [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/:category_slug?", //yha pr kuch b likh sakta ha hum is ki jagha pr // opetional parametr bola jata ha isa 
            element: <Home />
          },
          {
            path: "product-details/:product_id", //this is a parametar => product_id
            element: <Details />
          }
        ]
      }
    ]
  )
  return (
    <RouterProvider router={routes} />
  )
}
