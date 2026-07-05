import { useState, useEffect } from 'react'
import { EMPTY_FORM, EMPTY_DETAIL } from '../utils/movementFormUtils.js'
import { getSuppliers } from '../../suppliers/services/supplierService.js'
import { getRepositories } from '../../repositories/services/repositoryService.js'
import { getProducts } from '../../products/services/productService.js'
import axios from 'axios'

const api = axios.create({ baseURL: '/api/v1' })
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
api.interceptors.response.use((r) => r.data, (e) => Promise.reject(new Error(e.response?.data?.error || e.message)))

function getTypeMovements() { return api.get('/type-movement') }

export function useMovementForm({ onCreate }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [suppliers, setSuppliers] = useState([])
  const [repositories, setRepositories] = useState([])
  const [typeMovements, setTypeMovements] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (!modalOpen) return
    setForm(EMPTY_FORM); setSubmitError(null); setSubmitting(false)
    getSuppliers().then((d) => setSuppliers(Array.isArray(d) ? d : [])).catch(() => setSuppliers([]))
    getRepositories().then((d) => setRepositories(Array.isArray(d) ? d : [])).catch(() => setRepositories([]))
    getTypeMovements().then((d) => setTypeMovements(Array.isArray(d) ? d : [])).catch(() => setTypeMovements([]))
    getProducts().then((d) => setProducts(Array.isArray(d) ? d : [])).catch(() => setProducts([]))
  }, [modalOpen])

  function handleChange(e) { setForm({ ...form, [e.target.name]: e.target.value }) }

  function handleDetailChange(index, e) {
    const details = [...form.details]
    details[index] = { ...details[index], [e.target.name]: e.target.value }
    setForm({ ...form, details })
  }

  function addDetail() { setForm({ ...form, details: [...form.details, { ...EMPTY_DETAIL }] }) }

  function removeDetail(index) {
    setForm({ ...form, details: form.details.filter((_, i) => i !== index) })
  }

  function handleSubmit(e) {
    e.preventDefault(); setSubmitError(null); setSubmitting(true)
    onCreate({
      observation: form.observation || null,
      id_supplier: Number(form.id_supplier),
      id_type_movement: Number(form.id_type_movement),
      id_repository: Number(form.id_repository),
      id_user: 1,
      movement_details: form.details.map((d) => ({
        id_product: Number(d.id_product),
        quantity: Number(d.quantity),
        unit_price: Number(d.unit_price),
      })),
    })
      .then(() => { setForm(EMPTY_FORM); setModalOpen(false) })
      .catch((err) => setSubmitError(err.message))
      .finally(() => setSubmitting(false))
  }

  function handleOpen() {
    setForm(EMPTY_FORM); setSubmitError(null); setSubmitting(false); setModalOpen(true)
  }

  function handleClose() {
    setForm(EMPTY_FORM); setSubmitError(null); setModalOpen(false)
  }

  return {
    form, suppliers, repositories, typeMovements, products,
    submitting, submitError, modalOpen,
    handleChange, handleDetailChange, addDetail, removeDetail,
    handleSubmit, handleOpen, handleClose,
  }
}
