import { useCategories } from '../hooks/useCategories.js'
import { useCategoryForm } from '../hooks/useCategoryForm.js'
import { CategoryFilters } from '../components/CategoryFilters/category_filters.jsx'
import { CategoryTable } from '../components/CategoryTable/category_table.jsx'
import { CategoryModal } from '../components/CategoryModal/category_modal.jsx'
import { CategoryForm } from '../components/CategoryForm/category_form.jsx'

export function CategoriesPage() {
  const { categories, loading, error, createCategory } = useCategories()
  const form = useCategoryForm({ onCreate: createCategory })

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categorías</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gestiona las categorías de productos del sistema
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-6 py-4">
          <CategoryFilters onNewCategory={form.handleOpen} />
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
            <CategoryTable categories={categories} loading={loading} />
          </div>
        )}
      </div>

      <CategoryModal open={form.modalOpen} onClose={form.handleClose} title="Nueva categoría">
        <CategoryForm
          form={form.form}
          submitting={form.submitting}
          error={form.submitError}
          onChange={form.handleChange}
          onSubmit={form.handleSubmit}
          onCancel={form.handleClose}
        />
      </CategoryModal>
    </>
  )
}
