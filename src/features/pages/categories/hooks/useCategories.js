import { useState, useEffect } from 'react'
import { getCategories, createCategory as apiCreate } from '../services/categoryService.js'

export function useCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  function createCategory(data) {
    return apiCreate(data)
      .then((newCategory) => {
        setCategories((prev) => [...prev, newCategory])
        return newCategory
      })
  }

  return { categories, loading, error, createCategory }
}
