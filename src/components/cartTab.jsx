import { ShoppingCart, CircleX, Frown, CirclePlus, CircleMinus, Trash2 } from 'lucide-react';
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/Cart.jsx';

export function CartTab () {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false)
    const { cart, removeFromCart, addToCart } = useContext(CartContext);
        if (!isOpen) return (

        <div className="fixed bottom-5 right-3">
                <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-2 right-2 p-3 bg-gradient-to-br from-[#2f2f2f] to-[#232323] text-white rounded-full shadow-lg"
            >
                <ShoppingCart className="w-6 h-6" />
            </button>
        </div>
        )
        if (isOpen) return (
            <div className={` fixed inset-0 transition-colors ${isOpen ? 'visible bg-black/50' : 'hidden'}`}>
                
                <div className="flex flex-col justify-center mx-5 my-11 bg-gradient-to-br from-[#ececec] to-[#e6e6e6] rounded-lg shadow-md">
                    <div className="flex flex-row justify-around m-2">
                        <h4 className="text-[2rem] font-extrabold">Tu Carrito</h4>
                        <button onClick={() => setIsOpen(false)}>
                        <CircleX color="#ff6961" size={25}/>
                        </button>
                    </div>
                    <div className="flex flex-col mx-5 my-1">
                        {cart.length === 0 ? ( 
                            <div className="flex flex-col items-center m-5" > 
                                <p className="font-bold text-gray-400">Tu carrito esta vacío</p>
                                <Frown className="text-gray-400 text-5xl" />
                            </div>
                        ) : (
                        cart.map((product) => (
                            <div key={product.id} className="flex flex-row justify-between items-center bg-gradient-to-br from-[#f5f5f5] to-[#e9e9e9] rounded-lg shadow-sm shadow-[#1a1a1a] p-2 m-1 max-h-[600px] overflow-hidden">
                                <div className="flex flex-col">
                                    <h4 className="text-lg font-semibold">{product.name}</h4>
                                    <p className="text-gray-600">{product.category}</p>
                                </div>
                                <div className="flex flex-row justify-around items-center gap-2">
                                    <h4 className="text-lg font-semibold">${product.price * product.quantity}</h4>
                                    <div className="flex items-center justify-between gap-2">
                                        {(product.quantity === 1) ? <Trash2 className="text-red-400" onClick={() => {removeFromCart(product.id)}}/> : <CircleMinus onClick={() => {removeFromCart(product.id)}}/>}
                                        <p className="text-[#000000] ">{product.quantity}</p>
                                        <CirclePlus onClick={() => {addToCart(product, 1)}}/>
                                    </div>
                                </div>
                            </div>
                        )))}
                    </div>
                    <button className="mx-auto my-2 w-[80%] bg-gebum-violet text-white py-2 rounded-md hover:bg-gebum-violet transition-colors" onClick={() => {navigate('/FinPedido')}}>Finalizar Pedido</button>
                </div>
            </div>)
}