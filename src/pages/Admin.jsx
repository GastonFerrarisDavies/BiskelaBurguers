import supabase from '../config/supabaseClient'
import { useState, useEffect } from 'react'
import { PencilLine, ArrowBigDownDash, Trash2 } from 'lucide-react';
import { ModalCrear } from '../components/ModalCrear.jsx';
import ModalEditar from '../components/ModalEditar.jsx';
import ModalUser from '../components/ModalUser.jsx';
import ModalEliminar from '../components/ModalEliminar.jsx';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export default function Admin() {
  const { user, loading, isAdmin } = useContext(AuthContext);
  const [isOpenCrear, setIsOpenCrear] = useState(false);
  const [isOpenEditar, setIsOpenEditar] = useState(false);
  const [isOpenEliminar, setIsOpenEliminar] = useState(false);
  const [isOpenUser, setIsOpenUser] = useState(false);
  const [data, setData] = useState([]);
  const [pSelected, setPSelected] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from('Producto').select('*')
        if (error) throw error
        setData(data)
      } 
      catch (error) {
        console.log(error)
      }
      finally {
      }
    }
    fetchData()
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen bg-gray-300 font-bold">Cargando...</div>;
  if (!isAdmin || !user ) return <div className="flex justify-center items-center h-screen bg-gray-300 font-bold">No tienes acceso a esta página.</div>;

  return (
    <>
      <header className="flex w-[100vw] justify-center align-center p-3 bg-gebum-violet">
        <p1 className="bg-gebum-violet text-white p-2"> Bienvenido al panel de administración.</p1>
      </header>
      <div className="flex flex-col w-screen gap-2 p-2 h-[100vh] bg-gradient-to-b from-gebum-white to-gebum-gray">

        <button onClick={() => {setIsOpenCrear(true)}} className="my-2 w-full bg-gebum-violet text-white py-2 rounded-md hover:bg-gebum-violet transition-colors">
                Crear
        </button>
        <button onClick={() => { setIsOpenUser(true)}} className="my-2 w-full bg-red-400 text-white py-2 rounded-md hover:bg-gebum-violet transition-colors">
                Añadir administrador
        </button>
        <div className="flex flex-row items-center justify-center bg-green-500 text-white p-2 text-center rounded-md">
          <p className="mx-2">Seleccione producto a editar </p>
          <ArrowBigDownDash color="#ffffff" size={25}/></div>
        <div className="flex flex-col mx-2 max-h-[200px] overflow-auto">
          {data.map(product => (
            <div onClick={ () => {setPSelected(product)}} key={product.id} className="flex py-1 px-3 mx-2 my-1 flex-row justify-between items-center bg-[#e6e6e6] hover:bg-purple-400 rounded-lg shadow-md transition-[.5s] cursor-pointer">
              <div className="flex flex-col">
                <h5 className="">{product.name}</h5>
                <p className="text-gray-600">{product.category}</p>
              </div>
              <p className="text-gray-600">${product.price}</p>
              <div className="flex flex-row gap-3">
                <PencilLine 
                  className="" 
                  color="#212121" 
                  size={25} 
                  onClick={(e) => {
                    e.stopPropagation();
                    setPSelected(product);
                    setIsOpenEditar(true)}}/>
                <Trash2
                  className="hover:text-red-400"
                  color="#212121"
                  size={25}
                  onClick={e => {
                    e.stopPropagation();
                    setPSelected(product);
                    setIsOpenEliminar(true);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <ModalCrear isOpen={isOpenCrear} closeModal={ () => setIsOpenCrear(false) } />
      <ModalEditar isOpen={isOpenEditar} pSelected={pSelected} closeModal={ () => setIsOpenEditar(false) } />
      <ModalUser isOpen={isOpenUser} closeModal={ () => {setIsOpenUser(false)} } />
      <ModalEliminar isOpen={isOpenEliminar} pSelected={pSelected} closeModal={ () => {setIsOpenEliminar(false)} } />
    </>
  );
}