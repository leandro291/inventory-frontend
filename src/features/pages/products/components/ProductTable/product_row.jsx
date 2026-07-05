import { useState } from 'react'

export function ProductRow({ product }) {
  const [showImage, setShowImage] = useState(false)

  return (
    <>
      <tr className="border-b border-gray-100 hover:bg-gray-50">
        <td className="px-4 py-3 text-sm font-medium text-gray-900">
          {product.code}
        </td>
        <td className="px-4 py-3 text-sm text-gray-700">{product.name}</td>
        <td className="px-4 py-3 text-sm text-gray-500">{product.brand}</td>
        <td className="px-4 py-3 text-sm text-gray-900">
          ${Number(product.sale_price).toFixed(2)}
        </td>
        <td className="px-4 py-3 text-sm text-gray-500">{product.id_category}</td>
        <td className="px-4 py-3">
          <span
            className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
              product.status
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {product.status ? 'Activo' : 'Inactivo'}
          </span>
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            {product.image && (
              <button onClick={() => setShowImage(true)} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-blue-500" title="Ver imagen">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            )}
            <button className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </button>
            <button className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-red-500">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          </div>
        </td>
      </tr>

      {showImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setShowImage(false)}>
          <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowImage(false)} className="absolute -right-3 -top-3 z-10 rounded-full bg-white p-1 shadow-md hover:bg-gray-100">
              <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img src={product.image} alt={product.name} className="max-h-[85vh] max-w-[85vw] rounded-xl object-contain shadow-2xl" />
          </div>
        </div>
      )}
    </>
  )
}
