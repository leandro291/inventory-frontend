export function MovementForm({
  form,
  suppliers,
  repositories,
  typeMovements,
  products,
  submitting,
  error,
  onChange,
  onDetailChange,
  onAddDetail,
  onRemoveDetail,
  onSubmit,
  onCancel,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Tipo de movimiento</label>
          <select name="id_type_movement" value={form.id_type_movement} onChange={onChange} required
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none">
            <option value="">Seleccionar tipo</option>
            {typeMovements.map((t) => (
              <option key={t.id_type_movement} value={t.id_type_movement}>{t.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Proveedor</label>
          <select name="id_supplier" value={form.id_supplier} onChange={onChange} required
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none">
            <option value="">Seleccionar proveedor</option>
            {suppliers.map((s) => (
              <option key={s.id_supplier} value={s.id_supplier}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Almacén</label>
        <select name="id_repository" value={form.id_repository} onChange={onChange} required
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none">
          <option value="">Seleccionar almacén</option>
          {repositories.map((r) => (
            <option key={r.id_repository} value={r.id_repository}>{r.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Observación</label>
        <textarea name="observation" value={form.observation} onChange={onChange} rows={2}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none" />
      </div>

      <div className="border-t border-gray-100 pt-4">
        <div className="mb-3 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Detalles del movimiento</label>
          <button type="button" onClick={onAddDetail}
            className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1 text-sm text-gray-600 hover:bg-gray-50">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Agregar producto
          </button>
        </div>

        {form.details.map((detail, index) => (
          <div key={index} className="mb-3 flex items-end gap-3 rounded-lg border border-gray-100 p-3">
            <div className="flex-1">
              <label className="mb-1 block text-xs font-medium text-gray-500">Producto</label>
              <select name="id_product" value={detail.id_product} onChange={(e) => onDetailChange(index, e)} required
                className="w-full rounded-lg border border-gray-200 px-2 py-1.5 text-sm focus:border-blue-400 focus:outline-none">
                <option value="">Seleccionar</option>
                {products.map((p) => (
                  <option key={p.id_product} value={p.id_product}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className="w-24">
              <label className="mb-1 block text-xs font-medium text-gray-500">Cantidad</label>
              <input name="quantity" type="number" min="0" value={detail.quantity} onChange={(e) => onDetailChange(index, e)} required
                className="w-full rounded-lg border border-gray-200 px-2 py-1.5 text-sm focus:border-blue-400 focus:outline-none" />
            </div>
            <div className="w-28">
              <label className="mb-1 block text-xs font-medium text-gray-500">Precio unitario</label>
              <input name="unit_price" type="number" step="0.0001" value={detail.unit_price} onChange={(e) => onDetailChange(index, e)} required
                className="w-full rounded-lg border border-gray-200 px-2 py-1.5 text-sm focus:border-blue-400 focus:outline-none" />
            </div>
            <button type="button" onClick={() => onRemoveDetail(index)}
              className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-500">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
          Cancelar
        </button>
        <button type="submit" disabled={submitting}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
          {submitting ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Guardando...
            </>
          ) : 'Guardar movimiento'}
        </button>
      </div>
    </form>
  )
}
