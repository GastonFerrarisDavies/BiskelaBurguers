import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import supabase from '../config/supabaseClient';
import NavBar from '../components/NavBar';
import Card from '../components/Card';
import CardHeader from '../components/CardHeader';
import CardTitle from '../components/CardTitle';
import CardContent from '../components/CardContent';
import CardFooter from '../components/CardFooter';
import Input from '../components/Input';
import Label from '../components/Label';
import Button from '../components/Button';

export default function FinPedido() {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const { session, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [direcciones, setDirecciones] = useState([]);
  const [direccionSeleccionada, setDireccionSeleccionada] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [calle, setCalle] = useState("");
  const [numero, setNumero] = useState("");
  const [entrecalle1, setEntrecalle1] = useState("");
  const [entrecalle2, setEntrecalle2] = useState("");
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (cart.length === 0) {
      return;
    }
    if (user?.id) {
      fetchDirecciones();
    }
  }, [session, user, cart]);

  const fetchDirecciones = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("Direccion")
        .select("*")
        .eq("userID", user.id);
      if (error) {
        throw error;
      }
      setDirecciones(data || []);
      if (data && data.length > 0) {
        setDireccionSeleccionada(data[0].id);
      }
    } catch (err) {
      console.error("Error al obtener direcciones:", err.message);
      setDirecciones([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleDireccionChange = (event) => {
    setDireccionSeleccionada(event.target.value);
  };

  const handleMetodoPagoChange = (event) => {
    setMetodoPago(event.target.value);
  };

  const handleConfirmarPedido = () => {
    if (user?.id) {
      if (!direccionSeleccionada) {
        alert('Por favor, selecciona una dirección de entrega.');
        return;
      }
      if (!metodoPago) {
        alert('Por favor, selecciona un método de pago.');
        return;
      }
      const direccionEntrega = direcciones.find(dir => dir.id === direccionSeleccionada);
      console.log('Pedido a realizar a la dirección:', direccionEntrega);
      console.log('Método de pago seleccionado:', metodoPago);
      alert(`Pedido realizado con éxito a la dirección seleccionada mediante ${metodoPago}.`);
      navigate('/');
    } else {
      if (!calle || !numero || !entrecalle1 || !entrecalle2) {
        setFormError("Todos los campos de dirección son obligatorios");
        return;
      }
      if (!metodoPago) {
        setFormError("Por favor, selecciona un método de pago.");
        return;
      }
      setFormError(null);
      const direccionEntrega = { calle, numero, entreCalle1: entrecalle1, entreCalle2: entrecalle2 };
      console.log('Pedido a realizar a la dirección:', direccionEntrega);
      console.log('Método de pago seleccionado:', metodoPago);
      alert(`Pedido realizado con éxito a la dirección indicada mediante ${metodoPago}.`);
      navigate('/');
    }
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
          <div className="bg-white rounded-lg shadow-md p-6 max-h-[500px] overflow-y-auto">
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
          {/* Información de Entrega y Pago */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Información de Entrega y Pago</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Email</p>
                <p className="font-medium">{user?.email || 'Invitado'}</p>
              </div>
              {user?.id ? (
                <div>
                  <label htmlFor="direccion" className="block text-gray-700 text-sm font-bold mb-2">
                    Seleccionar Dirección de Entrega:
                  </label>
                  <select
                    id="direccion"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={direccionSeleccionada}
                    onChange={handleDireccionChange}
                  >
                    <option value="" disabled>Selecciona una dirección</option>
                    {direcciones.map((direccion) => (
                      <option key={direccion.id} value={direccion.id}>
                        {direccion.calle} {direccion.numero}, {direccion.entreCalle1} y {direccion.entreCalle2}
                      </option>
                    ))}
                    {direcciones.length === 0 && <option disabled>No hay direcciones guardadas</option>}
                  </select>
                </div>
              ) : (
                <Card className="mb-4">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">Dirección de Entrega</CardTitle>
                  </CardHeader>
                  <form onSubmit={e => { e.preventDefault(); handleConfirmarPedido(); }}>
                    <CardContent className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="calle">Calle</Label>
                        <Input id="calle" value={calle} onChange={e => setCalle(e.target.value)} placeholder="Ej: San Martín" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="numero">Número</Label>
                        <Input id="numero" value={numero} onChange={e => setNumero(e.target.value)} placeholder="Ej: 1400" />
                      </div>
                      <div className="space-y-2 flex flex-row gap-2 align-center items-center justify-center">
                          <Label className="" htmlFor="entrecalle1">Entrecalles</Label>
                        <div className="flex flex-row gap-2 items-center">
                          <Input id="entrecalle1" value={entrecalle1} onChange={e => setEntrecalle1(e.target.value)} placeholder="Ej: Belgrano" />
                          <Input id="entrecalle2" value={entrecalle2} onChange={e => setEntrecalle2(e.target.value)} placeholder="Ej: Rivadavia" />
                        </div>
                      </div>
                      {formError && <p className="text-sm font-medium text-red-500">{formError}</p>}
                    </CardContent>
                  </form>
                </Card>
              )}
              <div>
                <label htmlFor="metodoPago" className="block text-gray-700 text-sm font-bold mb-2">
                  Seleccionar Método de Pago:
                </label>
                <select
                  id="metodoPago"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={metodoPago}
                  onChange={handleMetodoPagoChange}
                >
                  <option value="" disabled>Selecciona un método de pago</option>
                  <option value="efectivo">Efectivo</option>
                  <option value="transferencia">Transferencia</option>
                </select>
              </div>
            </div>
            <button
              onClick={() => navigate('/MiCuenta')}
              className="mt-6 w-full bg-gebum-violet text-white py-2 rounded-md hover:bg-gebum-violet transition-colors"
              style={{ display: user?.id ? 'block' : 'none' }}
            >
              Administrar Direcciones
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
            className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-gebum-violet transition-colors transition-all duration-300"
            onClick={handleConfirmarPedido}
            disabled={user?.id ? (direcciones.length === 0 || !metodoPago) : (!calle || !numero || !entrecalle1 || !entrecalle2 || !metodoPago)}
          >
            Confirmar Pedido
          </button>
        </div>
      </div>
    </>
  );
}