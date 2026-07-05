import { createBrowserRouter, Navigate } from 'react-router'
import { MainPage } from '../common/layouts/main_page.jsx'
import { Home } from '../app/home/home.jsx'
import { Products } from '../app/products/products.jsx'
import { Categories } from '../app/categories/categories.jsx'
import { Inventory } from '../app/inventory/inventory.jsx'
import { Companies } from '../app/companies/companies.jsx'
import { Repositories } from '../app/repositories/repositories.jsx'
import { Roles } from '../app/roles/roles.jsx'
import { Suppliers } from '../app/suppliers/suppliers.jsx'
import { Movements } from '../app/movements/movements.jsx'
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
      {
        path: 'categories',
        element: <Categories />,
      },
      {
        path: 'inventory',
        element: <Inventory />,
      },
      {
        path: 'companies',
        element: <Companies />,
      },
      {
        path: 'repositories',
        element: <Repositories />,
      },
      {
        path: 'roles',
        element: <Roles />,
      },
      {
        path: 'suppliers',
        element: <Suppliers />,
      },
      {
        path: 'movements',
        element: <Movements />,
      },
    ],
  },
])
