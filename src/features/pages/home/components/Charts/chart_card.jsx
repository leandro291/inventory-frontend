// min-w-0: un hijo de grid no se encoge por debajo de su contenido sin esto, y el gráfico desborda.
export function ChartCard({ title, description, rows, labelHeader, valueHeader, children }) {
  return (
    <section className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
      <h2 className="text-base font-semibold text-gray-900">{title}</h2>
      <p className="mt-1 text-sm text-gray-500">{description}</p>

      {rows.length === 0 ? (
        <p className="py-12 text-center text-sm text-gray-400">Sin datos para mostrar</p>
      ) : (
        <>
          <div className="mt-4">{children}</div>
          <details className="group mt-4 text-sm">
            <summary className="cursor-pointer rounded text-indigo-600 hover:text-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Ver datos
            </summary>
            <table className="mt-2 w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
                  <th scope="col" className="py-2 pr-4 font-semibold">{labelHeader}</th>
                  <th scope="col" className="py-2 text-right font-semibold">{valueHeader}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-b border-gray-100 last:border-0">
                    <td className="py-2 pr-4 text-gray-700">{row.label}</td>
                    <td className="py-2 text-right tabular-nums text-gray-900">{row.value.toLocaleString('es')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        </>
      )}
    </section>
  )
}
