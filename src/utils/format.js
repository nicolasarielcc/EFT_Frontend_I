// Formatea un número en pesos chilenos (CLP) para mostrar los precios de la tienda.
export function formatCLP(valor) {
  return Number.isFinite(valor)
    ? valor.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })
    : '—'
}