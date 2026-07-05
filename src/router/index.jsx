import { createBrowserRouter, Navigate } from 'react-router'
import { MainPage } from '../common/layouts/main_page.jsx'
import { Home } from '../app/home/home.jsx'
import { Products } from '../app/products/products.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Home />,
      },
      {
        path: 'products',
        element: <Products />,
      },
    ],
  },
])
