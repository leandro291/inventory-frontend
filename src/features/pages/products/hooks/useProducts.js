import { useState, useEffect } from 'react'
import { getProducts } from '../services/productService.js'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { products, loading, error }
}
