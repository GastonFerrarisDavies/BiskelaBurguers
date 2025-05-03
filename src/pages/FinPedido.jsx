import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import supabase from '../config/supabaseClient';
import NavBar from '../components/NavBar';

export default function FinPedido() {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const { session, user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cart.length === 0) {
      return;
    }
  }, [session, user, cart]);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="flex justify-center items-center h-screen">
          <p>Cargando información del pedido...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Resumen del Pedido</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Información del Carrito */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Tu Pedido</h2>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-4 pb-4 border-b">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-600">Cantidad: {item.quantity}</p>
                </div>
                <p className="font-semibold">${item.price * item.quantity}</p>
              </div>
            ))}
            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <h3 className="text-xl font-bold">Total</h3>
              <p className="text-xl font-bold">${calculateTotal()}</p>
            </div>
          </div>
            {/* Información del Usuario */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Información de Entrega</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/MiCuenta')}
              className="mt-6 w-full bg-gebum-violet text-white py-2 rounded-md hover:bg-gebum-violet transition-colors"
            >
              Actualizar Información
            </button>
          </div>
          
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate('/Products')}
            className="bg-gray-500 text-white px-6 py-2 rounded-md mr-4 hover:bg-gray-600 transition-colors"
          >
            Volver
          </button>
          <button
            className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-gebum-violet transition-colors"
            onClick={() => {
              alert('Pedido realizado con éxito');
              navigate('/');
            }}
          >
            Confirmar Pedido
          </button>
        </div>
      </div>
    </>
  );
}
