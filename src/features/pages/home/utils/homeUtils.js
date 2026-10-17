const list = (value) => (Array.isArray(value) ? value : [])

// Suma `amount` por etiqueta y devuelve filas {label, value} de mayor a menor.
function tally(items, getLabel, getAmount = () => 1) {
  const totals = new Map()
  for (const item of items) {
    const label = getLabel(item)
    totals.set(label, (totals.get(label) ?? 0) + getAmount(item))
  }
  return [...totals]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
}

export function buildDashboardData({ products, inventories, movements, suppliers, categories, repositories }) {
  const productList = list(products)
  const inventoryList = list(inventories)
  const movementList = list(movements)

  const productById = new Map(productList.map((p) => [p.id_product, p]))
  const categoryName = new Map(list(categories).map((c) => [c.id_category, c.name]))
  const repositoryName = new Map(list(repositories).map((r) => [r.id_repository, r.name]))

  return {
    total_products: productList.length,
    total_stock: inventoryList.reduce((sum, i) => sum + (i.stock || 0), 0),
    total_movements: movementList.length,
    total_suppliers: list(suppliers).length,
    inventory_value: inventoryList.reduce(
      (sum, i) => sum + (i.stock || 0) * (productById.get(i.id_product)?.purchase_price || 0),
      0,
    ),
    stock_by_product: tally(
      inventoryList,
      (i) => productById.get(i.id_product)?.name ?? `Producto ${i.id_product}`,
      (i) => i.stock || 0,
    ),
    stock_by_repository: tally(
      inventoryList,
      (i) => repositoryName.get(i.id_repository) ?? `Almacén ${i.id_repository}`,
      (i) => i.stock || 0,
    ),
    products_by_category: tally(productList, (p) => categoryName.get(p.id_category) ?? 'Sin categoría'),
    movements_by_type: tally(movementList, (m) => m.type_movement?.name ?? 'Sin tipo'),
  }
}
