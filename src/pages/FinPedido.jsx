import { CartContext } from '../context/Cart.jsx';
import { useContext, useState, useEffect } from 'react';
import { ArrowLeftFromLine } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FinPedido() {
    const { cart } = useContext(CartContext);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        calcuTotal(); 
    }, [cart]);

    const calcuTotal = () => {
        let totalCalcu = 0;
        cart.forEach(product => {
            totalCalcu += product.price * product.quantity;
        });
        setTotal(totalCalcu);
    };

    return (
        <>
        <header>
                <div className="flex flex-row justify-between align-center w-screen p-3 bg-gebum-violet">
                <span className="text-white font-extrabold text-[1.3rem]" onClick={() => {navigate('/')}} >Finalizar Pedido</span>
                <div className="flex flex-row gap-2">
                  <ArrowLeftFromLine className="" onClick={() => navigate(-1)} color="white" size={30} />
                </div>
                </div>
            </header>
        <div className="bg-gray-100">
            <div className="max-w-3xl mx-auto bg-white shadow-md rounded-md p-8">

                {cart.length === 0 ? (
                    <p className="text-gray-600">Tu carrito está vacío.</p>
                ) : (
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-3 text-gray-700">Productos en tu carrito:</h2>
                        <ul>
                            {cart.map(product => (
                                <li key={product.id} className="flex items-center justify-between py-2 border-b border-gray-200">
                                    <div className="flex items-center">
                                        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded mr-4" />
                                        <div>
                                            <p className="text-gray-700 font-semibold">{product.name}</p>
                                            <p className="text-gray-500 text-sm">Cantidad: {product.quantity}</p>
                                        </div>
                                    </div>
                                    <span className="text-gray-700">${(product.price * product.quantity).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="flex justify-between font-semibold text-gray-800">
                                Total: <span>${total.toFixed(2)}</span>
                            </p>
                        </div>
                    </div>
                )}

                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3 text-gray-700">Información de Envío:</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
                            <input type="text" id="nombre" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div>
                            <label htmlFor="apellido" className="block text-gray-700 text-sm font-bold mb-2">Apellido:</label>
                            <input type="text" id="apellido" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div>
                            <label htmlFor="direccion" className="block text-gray-700 text-sm font-bold mb-2">Dirección:</label>
                            <input type="text" id="direccion" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div>
                            <label htmlFor="ciudad" className="block text-gray-700 text-sm font-bold mb-2">Ciudad:</label>
                            <input type="text" id="ciudad" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div>
                            <label htmlFor="provincia" className="block text-gray-700 text-sm font-bold mb-2">Provincia:</label>
                            <input type="text" id="provincia" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div>
                            <label htmlFor="codigoPostal" className="block text-gray-700 text-sm font-bold mb-2">Código Postal:</label>
                            <input type="text" id="codigoPostal" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3 text-gray-700">Método de Pago:</h2>
                    <div className="space-y-2">
                        <label className="inline-flex items-center">
                            <input type="radio" className="form-radio" name="metodoPago" value="tarjeta" />
                            <span className="ml-2 text-gray-700">Tarjeta de Crédito</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input type="radio" className="form-radio" name="metodoPago" value="efectivo" />
                            <span className="ml-2 text-gray-700">Efectivo al recibir</span>
                        </label>
                    </div>
                </div>

                <button className="bg-gebum-violet hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Confirmar Pedido
                </button>
            </div>
        </div>
        </>
    );
}