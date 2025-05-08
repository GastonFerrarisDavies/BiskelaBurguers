"use client"

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftFromLine, User, ShoppingBag } from 'lucide-react'
import NavBar from '../components/NavBar'
import { ModalPedidos } from '../components/ModalPedidos'
import { CartTab } from '../components/cartTab'
import supabase from '../config/supabaseClient'

export default function Products() {
  // ===== Estado =====
  const [fetchError, setFetchError] = useState(null)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('todos')
  const [isOpen, setIsOpen] = useState(false)
  const [pSelected, setPSelected] = useState(null)
  
  const navigate = useNavigate()

  // ===== Funciones =====
  const goHome = () => navigate('/')
  
  const handleClick = (producto) => {
    setPSelected(producto)
    setIsOpen(true)
  }
  
  const filtrar = (producto) => 
    filter === "todos" || filter === producto.category.toLowerCase()

  // ===== Efectos =====
  useEffect(() => {
    const fetchProductos = async () => {
      setIsLoading(true)
      
      try {
        const { data: productos, error } = await supabase
          .from('Producto')
          .select('*')
        
        if (error) {
          setFetchError(error.message)
          console.error('Error fetching products:', error)
        } else {
          setData(productos || [])
          setFetchError(null)
        }
      } catch (err) {
        setFetchError('Error al cargar los productos')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchProductos()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="container mx-auto px-4 py-6">
        {/* Cabecera y Filtros */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Nuestros Productos!</h1>
            <button 
              onClick={goHome}
              className="flex items-center gap-2 text-gebum-violet hover:text-gebum-violet/80 transition-colors"
            >
              <ArrowLeftFromLine size={18} />
              <span>Volver</span>
            </button>
          </div>
          
          <div className="w-full max-w-xs">
            <select
              className="w-full bg-white border border-gray-200 text-gray-800 text-md rounded-lg 
                        focus:ring-gebum-violet focus:border-gebum-violet pt-3 pb-3 pl-3 pr-5 shadow-sm
                        transition-all duration-200"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option className="text-gray-800 bg-white hover:bg-gray-100" value="todos">Todos los productos</option>
              <option className="text-gray-800 bg-white hover:bg-gray-100" value="hamburguesa">Hamburguesas</option>
              <option className="text-gray-800 bg-white hover:bg-gray-100" value="extra">Extras</option>
            </select>
          </div>
        </div>
        
        {/* Estado de carga y errores */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-pulse text-gebum-violet">Cargando productos...</div>
          </div>
        )}
        
        {fetchError && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {fetchError}
          </div>
        )}
        
        {/* Lista de productos */}
        {!isLoading && !fetchError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
            {data.filter(filtrar).map(product => (
              <div 
                key={product.id} 
                className="flex flex-col justify-between bg-white rounded-xl shadow-md 
                          overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 mb-1">{product.name}</h2>
                      <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                    <div className="text-xl font-bold text-gebum-violet">${product.price}</div>
                  </div>
                  
                  <div className="flex justify-center my-4">
                    <img 
                      src={`${product.image}`}
                      alt={product.name} 
                      className="h-[120px] object-contain" 
                    />
                  </div>
                </div>
                
                <div className="px-5 pb-5">
                  <button 
                    onClick={() => handleClick(product)} 
                    className="w-full bg-gebum-violet text-white py-3 rounded-lg 
                              hover:bg-gebum-violet/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={18} />
                    Agregar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Mensaje cuando no hay productos */}
        {!isLoading && !fetchError && data.filter(filtrar).length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No se encontraron productos en esta categoría
          </div>
        )}
      </main>
      
      <CartTab />
      <ModalPedidos 
        isOpen={isOpen} 
        pSelected={pSelected} 
        closeModal={() => setIsOpen(false)} 
      />
    </div>
  )
}
