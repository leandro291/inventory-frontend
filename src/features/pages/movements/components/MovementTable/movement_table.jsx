import { MovementRow } from './movement_row.jsx'

export function MovementTable({ movements, loading }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
      </div>
    )
  }

  if (!movements.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <svg className="mb-3 h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7V3a1 1 0 00-1-1H4a1 1 0 00-1 1v18l4-2 4 2 4-2 4 2V3a1 1 0 00-1-1h-2" />
        </svg>
        <p className="text-sm">No hay movimientos registrados</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-400">
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Observación</th>
            <th className="px-4 py-3">Tipo</th>
            <th className="px-4 py-3">Proveedor</th>
            <th className="px-4 py-3">Almacén</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {movements.map((mov) => (
            <MovementRow key={mov.id_movement} movement={mov} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
