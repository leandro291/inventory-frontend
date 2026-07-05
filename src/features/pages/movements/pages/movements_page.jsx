import { useMovements } from '../hooks/useMovements.js'
import { useMovementForm } from '../hooks/useMovementForm.js'
import { MovementFilters } from '../components/MovementFilters/movement_filters.jsx'
import { MovementTable } from '../components/MovementTable/movement_table.jsx'
import { MovementModal } from '../components/MovementModal/movement_modal.jsx'
import { MovementForm } from '../components/MovementForm/movement_form.jsx'

export function MovementsPage() {
  const { movements, loading, error, createMovement } = useMovements()
  const form = useMovementForm({ onCreate: createMovement })

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Movimientos</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gestiona los movimientos de inventario
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-6 py-4">
          <MovementFilters onNewMovement={form.handleOpen} />
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
            <MovementTable movements={movements} loading={loading} />
          </div>
        )}
      </div>

      <MovementModal open={form.modalOpen} onClose={form.handleClose} title="Nuevo movimiento">
        <MovementForm
          form={form.form}
          suppliers={form.suppliers}
          repositories={form.repositories}
          typeMovements={form.typeMovements}
          products={form.products}
          submitting={form.submitting}
          error={form.submitError}
          onChange={form.handleChange}
          onDetailChange={form.handleDetailChange}
          onAddDetail={form.addDetail}
          onRemoveDetail={form.removeDetail}
          onSubmit={form.handleSubmit}
          onCancel={form.handleClose}
        />
      </MovementModal>
    </>
  )
}
