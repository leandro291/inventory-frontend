import { useState, useEffect } from 'react'
import { getInventories, createInventory as apiCreate } from '../services/inventoryService.js'

export function useInventory() {
  const [inventories, setInventories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getInventories()
      .then((data) => setInventories(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  function createInventory(data) {
    return apiCreate(data)
      .then((newItem) => {
        setInventories((prev) => [...prev, newItem])
        return newItem
      })
  }

  return { inventories, loading, error, createInventory }
}
