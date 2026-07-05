import { useInventory } from '../hooks/useInventory.js'
import { useInventoryForm } from '../hooks/useInventoryForm.js'
import { InventoryFilters } from '../components/InventoryFilters/inventory_filters.jsx'
import { InventoryTable } from '../components/InventoryTable/inventory_table.jsx'
import { InventoryModal } from '../components/InventoryModal/inventory_modal.jsx'
import { InventoryForm } from '../components/InventoryForm/inventory_form.jsx'

export function InventoryPage() {
  const { inventories, loading, error, createInventory } = useInventory()
  const form = useInventoryForm({ onCreate: createInventory })

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventario</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gestiona el stock de productos por almacén
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-6 py-4">
          <InventoryFilters onNewInventory={form.handleOpen} />
        </div>

        {error ? (
          <div className="flex flex-col items-center justify-center py-20 text-red-400">
            <svg className="mb-3 h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <p className="text-sm">{error}</p>
          </div>
        ) : (
          <div className="px-6 py-4">
            <InventoryTable inventories={inventories} loading={loading} />
          </div>
        )}
      </div>

      <InventoryModal open={form.modalOpen} onClose={form.handleClose} title="Nuevo inventario">
        <InventoryForm
          form={form.form}
          products={form.products}
          repositories={form.repositories}
          submitting={form.submitting}
          error={form.submitError}
          onChange={form.handleChange}
          onSubmit={form.handleSubmit}
          onCancel={form.handleClose}
        />
      </InventoryModal>
    </>
  )
}
