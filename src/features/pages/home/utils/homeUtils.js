export function buildDashboardData(products, inventories, movements, suppliers) {
  return {
    total_products: Array.isArray(products) ? products.length : 0,
    total_stock: Array.isArray(inventories)
      ? inventories.reduce((sum, i) => sum + (i.stock || 0), 0)
      : 0,
    total_movements: Array.isArray(movements) ? movements.length : 0,
    total_suppliers: Array.isArray(suppliers) ? suppliers.length : 0,
  }
}
