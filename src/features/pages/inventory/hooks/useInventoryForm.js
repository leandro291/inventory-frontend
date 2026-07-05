import { useState, useEffect } from 'react'
import { EMPTY_FORM } from '../utils/inventoryFormUtils.js'
import { getProducts } from '../services/auxService.js'
import { getRepositories } from '../services/auxService.js'

export function useInventoryForm({ onCreate }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    if (!modalOpen) return
    setForm(EMPTY_FORM)
    setSubmitError(null)
    setSubmitting(false)

    getProducts()
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]))

    getRepositories()
      .then((data) => setRepositories(Array.isArray(data) ? data : []))
      .catch(() => setRepositories([]))
  }, [modalOpen])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitError(null)
    setSubmitting(true)

    onCreate({
      stock: Number(form.stock),
      id_product: Number(form.id_product),
      id_repository: Number(form.id_repository),
    })
      .then(() => {
        setForm(EMPTY_FORM)
        setModalOpen(false)
      })
      .catch((err) => setSubmitError(err.message))
      .finally(() => setSubmitting(false))
  }

  function handleOpen() {
    setForm(EMPTY_FORM)
    setSubmitError(null)
    setSubmitting(false)
    setModalOpen(true)
  }

  function handleClose() {
    setForm(EMPTY_FORM)
    setSubmitError(null)
    setModalOpen(false)
  }

  return {
    form,
    products,
    repositories,
    submitting,
    submitError,
    modalOpen,
    handleChange,
    handleSubmit,
    handleOpen,
    handleClose,
  }
}
