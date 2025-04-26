"use client"

import { CircleX, Minus, Plus } from "lucide-react"
import { useState, useContext } from "react"
import { CartContext } from "../context/CartContext"

export function ModalPedidos({ isOpen, closeModal, pSelected }) {
  const [cantidad, setCantidad] = useState(1)
  const [comment, setComment] = useState("")
  const { addToCart } = useContext(CartContext)

  const calculateTotal = () => {
    return pSelected.price * cantidad
  }

  const decrementQuantity = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1)
    }
  }

  const incrementQuantity = () => {
    setCantidad(cantidad + 1)
  }

  const handleAddToCart = () => {
    addToCart(pSelected, cantidad, comment)
    closeModal()
    setCantidad(1)
    setComment("")
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div className="w-full max-w-md bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-lg">
        <div className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 id="modal-title" className="text-2xl font-bold">
              {pSelected.name}
            </h2>
            <button
              onClick={closeModal}
              className="text-red-500 hover:text-red-700 transition-colors"
              aria-label="Close modal"
            >
              <CircleX size={24} />
            </button>
          </div>

          {/* Comment Section */}
          <div className="mb-6">
            <label htmlFor="comment" className="block mb-2 font-medium">
              Comentarios:
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Sin queso..."
              className="w-full min-h-[100px] p-3 border-2 border-gray-300 rounded-md focus:border-violet-500 focus:outline-none"
            />
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={decrementQuantity}
              className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50"
              disabled={cantidad <= 1}
              aria-label="Decrease quantity"
            >
              <Minus size={20} />
            </button>

            <span className="font-bold text-xl">Cantidad: {cantidad}</span>

            <button
              onClick={incrementQuantity}
              className="flex items-center justify-center w-10 h-10 bg-gebum-violet text-white rounded-md hover:bg-violet-700 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={20} />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full py-3 bg-gebum-violet text-white text-lg font-medium rounded-md hover:bg-violet-700 transition-colors"
          >
            Agregar ${calculateTotal().toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  )
}
