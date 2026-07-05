import { useState, useEffect } from 'react'
import { EMPTY_FORM } from '../utils/supplierFormUtils.js'
import { getCompanies } from '../../companies/services/companyService.js'

export function useSupplierForm({ onCreate }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    if (!modalOpen) return
    setForm(EMPTY_FORM); setSubmitError(null); setSubmitting(false)
    getCompanies()
      .then((data) => setCompanies(Array.isArray(data) ? data : []))
      .catch(() => setCompanies([]))
  }, [modalOpen])

  function handleChange(e) { setForm({ ...form, [e.target.name]: e.target.value }) }

  function handleSubmit(e) {
    e.preventDefault(); setSubmitError(null); setSubmitting(true)
    onCreate({ ...form, id_company: Number(form.id_company) })
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

  return { form, companies, submitting, submitError, modalOpen, handleChange, handleSubmit, handleOpen, handleClose }
}
