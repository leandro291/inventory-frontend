import { ChartCard } from './chart_card.jsx'
import { BarChart } from './bar_chart.jsx'
import { DonutChart } from './donut_chart.jsx'

export function DashboardCharts({ stats, loading }) {
  if (loading) {
    return (
      <div className="mt-6 grid gap-4 sm:gap-6 lg:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-72 animate-pulse rounded-xl bg-gray-200" />
        ))}
      </div>
    )
  }

  if (!stats) return null

  return (
    <div className="mt-6 grid gap-4 sm:gap-6 lg:grid-cols-2">
      <ChartCard
        title="Stock por producto"
        description="Unidades disponibles de cada producto, de mayor a menor."
        rows={stats.stock_by_product}
        labelHeader="Producto"
        valueHeader="Unidades"
      >
        <BarChart
          rows={stats.stock_by_product}
          valueLabel="Unidades"
          ariaLabel="Stock por producto"
          ariaDescription="Gráfico de barras con las unidades disponibles de cada producto, ordenado de mayor a menor."
        />
      </ChartCard>

      <ChartCard
        title="Stock por almacén"
        description="Cómo se reparten las unidades entre los almacenes."
        rows={stats.stock_by_repository}
        labelHeader="Almacén"
        valueHeader="Unidades"
      >
        <DonutChart
          rows={stats.stock_by_repository}
          ariaLabel="Stock por almacén"
          ariaDescription="Gráfico de anillo con la proporción de unidades en cada almacén."
        />
      </ChartCard>

      <ChartCard
        title="Productos por categoría"
        description="Cantidad de productos del catálogo en cada categoría."
        rows={stats.products_by_category}
        labelHeader="Categoría"
        valueHeader="Productos"
      >
        <BarChart
          rows={stats.products_by_category}
          valueLabel="Productos"
          ariaLabel="Productos por categoría"
          ariaDescription="Gráfico de barras con la cantidad de productos en cada categoría."
        />
      </ChartCard>

      <ChartCard
        title="Movimientos por tipo"
        description="Entradas, salidas y otros movimientos registrados."
        rows={stats.movements_by_type}
        labelHeader="Tipo"
        valueHeader="Movimientos"
      >
        <DonutChart
          rows={stats.movements_by_type}
          ariaLabel="Movimientos por tipo"
          ariaDescription="Gráfico de anillo con la proporción de movimientos de cada tipo."
        />
      </ChartCard>
    </div>
  )
}
