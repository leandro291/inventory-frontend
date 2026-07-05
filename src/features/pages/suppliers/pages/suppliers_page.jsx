import { useSuppliers } from '../hooks/useSuppliers.js'
import { useSupplierForm } from '../hooks/useSupplierForm.js'
import { SupplierFilters } from '../components/SupplierFilters/supplier_filters.jsx'
import { SupplierTable } from '../components/SupplierTable/supplier_table.jsx'
import { SupplierModal } from '../components/SupplierModal/supplier_modal.jsx'
import { SupplierForm } from '../components/SupplierForm/supplier_form.jsx'

export function SuppliersPage() {
  const { suppliers, loading, error, createSupplier } = useSuppliers()
  const form = useSupplierForm({ onCreate: createSupplier })

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Proveedores</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gestiona los proveedores del sistema
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-6 py-4">
          <SupplierFilters onNewSupplier={form.handleOpen} />
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
            <SupplierTable suppliers={suppliers} loading={loading} />
          </div>
        )}
      </div>

      <SupplierModal open={form.modalOpen} onClose={form.handleClose} title="Nuevo proveedor">
        <SupplierForm
          form={form.form}
          companies={form.companies}
          submitting={form.submitting}
          error={form.submitError}
          onChange={form.handleChange}
          onSubmit={form.handleSubmit}
          onCancel={form.handleClose}
        />
      </SupplierModal>
    </>
  )
}
