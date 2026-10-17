import { useMemo } from 'react'
import { barX, defineChart } from '@tanstack/charts'
import { scaleBand } from '@tanstack/charts/scales/band'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { tooltip } from '@tanstack/charts/tooltip'
import { Chart } from '@tanstack/charts/react'
import { PALETTE } from '../../utils/chartPalette.js'

const ROW_HEIGHT = 44
const TICK_LABELS = { fontSize: 12 }

// Paso entero "redondo" (1, 2, 5 × 10^n): unidades y conteos nunca llevan decimales.
function niceStep(max, ticks) {
  const raw = Math.max(1, max / ticks)
  const magnitude = 10 ** Math.floor(Math.log10(raw))
  const n = raw / magnitude
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * magnitude
}

export function BarChart({ rows, valueLabel, ariaLabel, ariaDescription }) {
  // La definición captura `rows`: se memoiza para que el gráfico se actualice, no se remonte.
  const definition = useMemo(
    () =>
      defineChart(({ width }) => {
        const max = Math.max(1, ...rows.map((r) => r.value))
        const step = niceStep(max, width < 420 ? 3 : 5)
        const top = Math.ceil(max / step) * step
        const values = Array.from({ length: top / step + 1 }, (_, i) => i * step)

        return {
          marks: [barX(rows, { x: 'value', y: 'label', fill: PALETTE[0], inset: 2, radius: 4 })],
          scales: {
            x: {
              // Instancia (no fábrica): fija el dominio en 0..top en vez de inferirlo de los datos.
              scale: scaleLinear().domain([0, top]),
              grid: true,
              axis: { label: valueLabel, ticks: { values }, tickLabels: TICK_LABELS },
            },
            y: {
              scale: () => scaleBand().domain(rows.map((r) => r.label)).padding(0.3),
              axis: { tickLabels: TICK_LABELS },
            },
          },
          tooltip,
        }
      }),
    [rows, valueLabel],
  )

  return (
    <Chart
      definition={definition}
      height={Math.max(260, rows.length * ROW_HEIGHT + 64)}
      initialWidth={480}
      ariaLabel={ariaLabel}
      ariaDescription={ariaDescription}
    />
  )
}
