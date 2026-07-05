import { useCompanies } from '../hooks/useCompanies.js'
import { useCompanyForm } from '../hooks/useCompanyForm.js'
import { CompanyFilters } from '../components/CompanyFilters/company_filters.jsx'
import { CompanyTable } from '../components/CompanyTable/company_table.jsx'
import { CompanyModal } from '../components/CompanyModal/company_modal.jsx'
import { CompanyForm } from '../components/CompanyForm/company_form.jsx'

export function CompaniesPage() {
  const { companies, loading, error, createCompany } = useCompanies()
  const form = useCompanyForm({ onCreate: createCompany })

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compañías</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gestiona las compañías del sistema
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-6 py-4">
          <CompanyFilters onNewCompany={form.handleOpen} />
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
            <CompanyTable companies={companies} loading={loading} />
          </div>
        )}
      </div>

      <CompanyModal open={form.modalOpen} onClose={form.handleClose} title="Nueva compañía">
        <CompanyForm
          form={form.form}
          submitting={form.submitting}
          error={form.submitError}
          onChange={form.handleChange}
          onSubmit={form.handleSubmit}
          onCancel={form.handleClose}
        />
      </CompanyModal>
    </>
  )
}
