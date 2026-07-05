import { CategoryRow } from './category_row.jsx'

export function CategoryTable({ categories, loading }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
      </div>
    )
  }

  if (!categories.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <svg className="mb-3 h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <p className="text-sm">No hay categorías registradas</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-400">
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">Descripción</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <CategoryRow key={cat.id_category} category={cat} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
