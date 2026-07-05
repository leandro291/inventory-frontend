import { useState, useEffect } from 'react'
import { getRoles, createRole as apiCreate } from '../services/roleService.js'

export function useRoles() {
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getRoles()
      .then((data) => setRoles(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  function createRole(data) {
    return apiCreate(data).then((newItem) => {
      setRoles((prev) => [...prev, newItem])
      return newItem
    })
  }

  return { roles, loading, error, createRole }
}
