import { useState, useEffect } from 'react'
import { getProducts, getInventories, getMovements, getSuppliers } from '../services/homeService.js'
import { buildDashboardData } from '../utils/homeUtils.js'

export function useHome() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    Promise.all([
      getProducts(),
      getInventories(),
      getMovements(),
      getSuppliers(),
    ])
      .then(([products, inventories, movements, suppliers]) => {
        setStats(buildDashboardData(products, inventories, movements, suppliers))
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { stats, loading, error }
}
