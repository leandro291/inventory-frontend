import { useMemo } from 'react'
import { colorLegend, colorLegendItems, defineChart } from '@tanstack/charts'
import { pie, polar, radialArc } from '@tanstack/charts/polar'
import { tooltip } from '@tanstack/charts/tooltip'
import { Chart } from '@tanstack/charts/react'
import { PALETTE } from '../../utils/chartPalette.js'

export function DonutChart({ rows, ariaLabel, ariaDescription }) {
  const definition = useMemo(
    () =>
      defineChart({
        marks: [
          polar({
            inset: 8,
            radiusRatio: 0.9,
            marks: [
              radialArc(pie(rows, { value: 'value' }), {
                innerRadius: ({ radius }) => radius * 0.6,
                cornerRadius: 4,
                color: 'label',
                key: 'label',
              }),
            ],
            scales: { angle: null, radius: null },
          }),
        ],
        scales: { x: null, y: null },
        // Dominio fijo: una categoría conserva su color aunque cambie el orden de los datos.
        color: {
          domain: rows.map((r) => r.label),
          range: PALETTE,
          legend: colorLegend({
            placement: 'bottom',
            items: colorLegendItems({ justify: 'center', gap: 20, label: { fontSize: 12 } }),
          }),
        },
        tooltip,
      }),
    [rows],
  )

  return (
    <Chart
      definition={definition}
      height={300}
      initialWidth={480}
      ariaLabel={ariaLabel}
      ariaDescription={ariaDescription}
    />
  )
}
