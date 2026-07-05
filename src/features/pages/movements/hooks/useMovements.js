import { useState, useEffect } from 'react'
import { getMovements, createMovement as apiCreate } from '../services/movementService.js'

export function useMovements() {
  const [movements, setMovements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getMovements()
      .then((data) => setMovements(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  function createMovement(data) {
    return apiCreate(data).then((newItem) => {
      setMovements((prev) => [...prev, newItem])
      return newItem
    })
  }

  return { movements, loading, error, createMovement }
}
