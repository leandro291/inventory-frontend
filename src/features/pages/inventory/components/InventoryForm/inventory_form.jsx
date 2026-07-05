export function InventoryForm({
  form,
  products,
  repositories,
  submitting,
  error,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Producto</label>
        <select name="id_product" value={form.id_product} onChange={onChange} required
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none">
          <option value="">Seleccionar producto</option>
          {products.map((p) => (
            <option key={p.id_product} value={p.id_product}>{p.name}</option>
          ))}
        </select>
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
        <label className="mb-1 block text-sm font-medium text-gray-700">Stock</label>
        <input name="stock" type="number" min="0" value={form.stock} onChange={onChange} required
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none" />
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

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
          ) : 'Guardar inventario'}
        </button>
      </div>
    </form>
  )
}
