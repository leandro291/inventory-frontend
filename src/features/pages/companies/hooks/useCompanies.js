import { useState, useEffect } from 'react'
import { getCompanies, createCompany as apiCreate } from '../services/companyService.js'

export function useCompanies() {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getCompanies()
      .then((data) => setCompanies(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  function createCompany(data) {
    return apiCreate(data).then((newItem) => {
      setCompanies((prev) => [...prev, newItem])
      return newItem
    })
  }

  return { companies, loading, error, createCompany }
}
