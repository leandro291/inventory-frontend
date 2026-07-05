export const EMPTY_FORM = {
  name: '',
  description: '',
  brand: '',
  purchase_price: '',
  sale_price: '',
  id_category: '',
}

export function buildFormData(form, image) {
  const data = new FormData()
  data.append('name', form.name)
  data.append('description', form.description)
  data.append('brand', form.brand)
  data.append('purchase_price', form.purchase_price)
  data.append('sale_price', form.sale_price)
  data.append('id_category', form.id_category)
  if (image) data.append('image', image)
  return data
}
