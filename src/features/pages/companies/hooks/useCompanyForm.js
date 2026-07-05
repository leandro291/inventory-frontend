import { useState } from 'react'
import { EMPTY_FORM } from '../utils/companyFormUtils.js'

export function useCompanyForm({ onCreate }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  function handleChange(e) { setForm({ ...form, [e.target.name]: e.target.value }) }

  function handleSubmit(e) {
    e.preventDefault(); setSubmitError(null); setSubmitting(true)
    onCreate(form)
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

  return { form, submitting, submitError, modalOpen, handleChange, handleSubmit, handleOpen, handleClose }
}
