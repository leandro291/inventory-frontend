import { useState, useEffect } from 'react'
import { getSuppliers, createSupplier as apiCreate } from '../services/supplierService.js'

export function useSuppliers() {
  const [suppliers, setSuppliers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getSuppliers()
      .then((data) => setSuppliers(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  function createSupplier(data) {
    return apiCreate(data).then((newItem) => {
      setSuppliers((prev) => [...prev, newItem])
      return newItem
    })
  }

  return { suppliers, loading, error, createSupplier }
}
