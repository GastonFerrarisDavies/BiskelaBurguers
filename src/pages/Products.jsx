import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ArrowLeftFromLine } from 'lucide-react';
import { CartTab } from '../components/CartTab.jsx'
import { ModalPedidos } from '../components/ModalPedidos.jsx';
import { CartProvider } from '../context/Cart';
import { User } from 'lucide-react';

import supabase from '../config/supabaseClient.js';

export default function Products() {

  //Data
  const [fetchError, setFetchError] = useState(null);
  const [data, setData] = useState([]);


  useEffect( () => {
    const fetchProds = async () => {
      
    let { data: Producto, error } = await supabase
    .from('Producto')
    .select('*')
    
    if (error) {
      setFetchError(error)
      console.log(fetchError)
    }
    if ( data || Producto ) {
      setData(Producto)
      console.log(Producto)
      setFetchError(null)
    }
  }
  fetchProds()
  }, [])

  //Filtro
  const [filter, setFilter] = useState('todos')

  const filtrar = (p) => (filter === "todos" || filter === p.category.toLowerCase())

  //Modal
  const [isOpen, setIsOpen] = useState(false);
  const [pSelected, setPSelected] = useState(null);


  //Navigate
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  //Handle
  const handleClick = (unProducto) => {
    setPSelected(unProducto);
    setIsOpen(true);
  };


  return (
    <CartProvider>
      <>
      <header>
        <div className="flex flex-row justify-between align-center w-screen p-3 bg-gebum-violet">
        <span className="text-white font-extrabold text-[1.3rem]" onClick={goHome} >Biskela</span>
        <div className="flex flex-row gap-2">
          <User className="text-white" size={30} onClick={() => navigate('/InicioSesion')} />
          <ArrowLeftFromLine className="" onClick={() => navigate(-1)} color="white" size={30} />
        </div>
        </div>
      </header>
      <div className="container m-auto px-4 pt-3">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="m-auto flex gap-2">
            <div className="relative">
              <select
                className="bg-gebum-gray border-none border-gray-300 text-black text-md rounded-lg ring-red-900 focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                value={filter}
                onChange={(v) => setFilter(v.target.value)}
             >
               <option value="todos">Todos los productos</option>
                <option value="hamburguesa">Hamburguesas</option>
                <option value="extra">Extras</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        {data.filter((a) => filtrar(a)).map(product => (
          <div key={product.id} className="flex mx-2 flex-col justify-between align-center bg-gradient-to-br from-[#ececec] to-[#e6e6e6] rounded-lg shadow-sm shadow-[#1a1a1a] overflow-hidden">
          <div className="flex flex-row justify-between align-middle">
            <div className="p-4 mx-4">
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">{product.category}</p>
              <p className="text-gray-600 mb-2">${product.price}</p>
            </div>
              <img src='../../public/hambur.png' alt={product.name} className="my-auto mx-4 h-[110px]" />
          </div>
          <div className="mx-2 mb-2">
            <button onClick={() => handleClick(product)} className="m-auto w-full bg-gebum-violet text-white py-2 rounded-md hover:bg-gebum-violet transition-colors">
                Agregar
            </button>
          </div>
        </div>
        ))}
      </div>
      <CartTab/>
      <ModalPedidos isOpen={isOpen} pSelected={pSelected} closeModal={ () => setIsOpen(false) } />
      </>
    </CartProvider>
  )
}