import { useState } from 'react'
import { EMPTY_FORM, buildFormData } from '../utils/productFormUtils.js'

export function useProductForm({ onCreate }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [image, setImage] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleImage(e) {
    setImage(e.target.files[0] || null)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitError(null)
    setSubmitting(true)

    onCreate(buildFormData(form, image))
      .then(() => {
        setForm(EMPTY_FORM)
        setImage(null)
        setModalOpen(false)
      })
      .catch((err) => setSubmitError(err.message))
      .finally(() => setSubmitting(false))
  }

  function handleOpen() {
    setForm(EMPTY_FORM)
    setImage(null)
    setSubmitError(null)
    setSubmitting(false)
    setModalOpen(true)
  }

  function handleClose() {
    setForm(EMPTY_FORM)
    setImage(null)
    setSubmitError(null)
    setModalOpen(false)
  }

  return {
    form,
    image,
    submitting,
    submitError,
    modalOpen,
    handleChange,
    handleImage,
    handleSubmit,
    handleOpen,
    handleClose,
  }
}
