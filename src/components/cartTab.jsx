"use client"

import { useState, useContext, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { ShoppingCart, X, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react"
import { CartContext } from "../context/CartContext"

export function CartTab() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const { cart, removeFromCart, addToCart } = useContext(CartContext)

  // Calcular el total del carrito
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [cart])

  // Función para cerrar el carrito
  const closeCart = () => setIsOpen(false)

  // Función para abrir el carrito
  const openCart = () => setIsOpen(true)

  // Función para finalizar el pedido
  const finalizarPedido = () => {
    navigate("/FinPedido")
    closeCart()
  }

  return (
    <>
      {/* Botón flotante del carrito */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 z-50">
          <button
            onClick={openCart}
            className="relative flex items-center justify-center p-4 bg-gebum-violet text-white rounded-full shadow-lg hover:bg-gebum-violet/90 transition-all duration-300 transform hover:scale-105"
            aria-label="Abrir carrito"
          >
            <ShoppingCart className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Modal del carrito */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeCart} />

        {/* Contenido del carrito */}
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transition-transform duration-300 transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Cabecera del carrito */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between p-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-gebum-violet" />
                Tu Carrito
              </h2>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Cerrar carrito"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Contenido del carrito */}
          <div className="flex flex-col h-[calc(100%-180px)] overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <div className="w-20 h-20 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <ShoppingCart className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Tu carrito está vacío</h3>
                <p className="text-gray-500 mb-6">Agrega algunos productos para comenzar tu pedido</p>
                <button
                  onClick={closeCart}
                  className="px-6 py-2 bg-gebum-violet text-white rounded-lg hover:bg-gebum-violet/90 transition-colors"
                >
                  Explorar Productos
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center p-3 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-semibold text-gray-800 truncate">{product.name}</h4>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="inline-block bg-gray-100 px-2 py-0.5 rounded-full text-xs">
                          {product.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className="font-bold text-gebum-violet">
                        ${(product.price * product.quantity).toFixed(2)}
                      </span>

                      <div className="flex items-center">
                        {product.quantity === 1 ? (
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            aria-label="Eliminar producto"
                          >
                            <Trash2 size={18} />
                          </button>
                        ) : (
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="p-1 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Disminuir cantidad"
                          >
                            <Minus size={18} />
                          </button>
                        )}

                        <span className="w-8 text-center font-medium">{product.quantity}</span>

                        <button
                          onClick={() => addToCart(product, 1)}
                          className="p-1 text-gebum-violet hover:bg-gebum-violet/10 rounded-full transition-colors"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer con total y botón de finalizar */}
          {cart.length > 0 && (
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Total</span>
                <span className="text-xl font-bold text-gebum-violet">${cartTotal.toFixed(2)}</span>
              </div>

              <button
                onClick={finalizarPedido}
                className="w-full py-3 bg-gebum-violet text-white font-medium rounded-lg hover:bg-gebum-violet/90 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} />
                Finalizar Pedido
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
