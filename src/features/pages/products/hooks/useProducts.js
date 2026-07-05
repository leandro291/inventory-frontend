import { useState, useEffect } from 'react'
import { getProducts, createProduct as apiCreate } from '../services/productService.js'

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

  function createProduct(formData) {
    return apiCreate(formData)
      .then((newProduct) => {
        setProducts((prev) => [...prev, newProduct])
        return newProduct
      })
  }

  return { products, loading, error, createProduct }
}
