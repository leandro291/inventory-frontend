import { useState, useEffect } from 'react'
import { getRepositories, createRepository as apiCreate } from '../services/repositoryService.js'

export function useRepositories() {
  const [repositories, setRepositories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getRepositories()
      .then((data) => setRepositories(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  function createRepository(data) {
    return apiCreate(data).then((newItem) => {
      setRepositories((prev) => [...prev, newItem])
      return newItem
    })
  }

  return { repositories, loading, error, createRepository }
}
