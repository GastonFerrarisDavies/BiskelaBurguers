"use client"

import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { ArrowLeftFromLine, User, MapPin, Home, LogOut, Plus, Navigation, Map } from "lucide-react"
import { ModalDireccion } from "../components/ModalDireccion"
import supabase from "../config/supabaseClient"
import NavBar from "../components/NavBar"
const ProfilePage = () => {
  const { logOut, session, user, loading } = useContext(AuthContext)
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [direcciones, setDirecciones] = useState([])

  useEffect(() => {
    if (!user) {
      navigate("/")
      return
    }

    const fetchDirecciones = async () => {
      try {
        const { data, error } = await supabase.from("Direccion").select("*").eq("userID", user.id)

        if (error) throw error
        setDirecciones(data || [])
      } catch (err) {
        console.error("Error al obtener direcciones:", err.message)
        setDirecciones([])
      }
    }

    if (user?.id) {
      fetchDirecciones()
    }
  }, [user, navigate])

  const handleClick = () => {
    logOut()
    navigate("/")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-gebum-violet/50 mb-4"></div>
          <p className="text-gebum-violet font-medium">Cargando información del usuario...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-md">
          <User className="mx-auto text-red-400 mb-2" size={32} />
          <p className="text-red-600 font-medium mb-4">No estás autenticado.</p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-gebum-violet text-white rounded-md hover:bg-opacity-90 transition-all"
          >
            Ir a inicio de sesión
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
    
    
    <NavBar className="absolute"/>
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <main className="flex-1 container mx-auto max-w-3xl px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-gebum-violet/10 p-3 rounded-full">
              <User className="text-gebum-violet" size={28} />
            </div>
            <div>
              <h2 className="font-bold text-xl text-gray-800">¡Hola, {user?.email?.split("@")[0]}!</h2>
              <p className="text-gray-500">Bienvenido a tu panel de usuario</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center">
              <Home className="mr-2 text-gebum-violet" size={20} />
              Mis Direcciones
            </h3>
            <span className="bg-gray-100 text-gray-600 text-sm py-1 px-3 rounded-full">
              {direcciones.length} {direcciones.length === 1 ? "dirección" : "direcciones"}
            </span>
          </div>

          {direcciones.length === 0 ? (
            <div className="bg-gray-50 border border-dashed border-gray-200 rounded-lg p-8 text-center">
              <Map className="mx-auto text-gray-300 mb-2" size={40} />
              <p className="text-gray-500">No tienes direcciones guardadas</p>
              <button
                onClick={() => setIsOpen(true)}
                className="mt-4 inline-flex items-center text-gebum-violet hover:underline"
              >
                <Plus size={16} className="mr-1" /> Añadir tu primera dirección
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {direcciones.map((direccion) => (
                <div
                  key={direccion.id}
                  className="bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-16 h-16">
                    <div className="absolute transform rotate-45 bg-gebum-violet/10 text-gebum-violet text-xs font-medium py-1 right-[-35px] top-[20px] w-[120px] text-center">
                      Guardada
                    </div>
                  </div>

                  <div className="flex items-start mb-3">
                    <MapPin className="text-gebum-violet mr-2 mt-1 flex-shrink-0" size={18} />
                    <h3 className="font-semibold text-gray-800 text-lg leading-tight">
                      Calle {direccion.calle} N° {direccion.numero}
                    </h3>
                  </div>

                  <div className="pl-7 space-y-2 text-gray-600">
                    <div className="flex items-center">
                      <Navigation className="text-gray-400 mr-2" size={14} />
                      <p className="text-sm">Entre {direccion.entreCalle1}</p>
                    </div>
                    <div className="flex items-center">
                      <Navigation className="text-gray-400 mr-2" size={14} />
                      <p className="text-sm">Y {direccion.entreCalle2}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                    <button className="text-xs text-gebum-violet hover:underline">Editar</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setIsOpen(true)}
            className="w-full flex justify-center items-center py-3 px-4 bg-gebum-violet text-white rounded-lg shadow-sm hover:bg-opacity-90 transition-colors font-medium"
          >
            <Plus className="mr-2" size={18} />
            Añadir nueva dirección
          </button>

          <button
            onClick={handleClick}
            className="w-full flex justify-center items-center py-3 px-4 bg-white border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition-colors font-medium"
          >
            <LogOut className="mr-2" size={18} />
            Cerrar sesión
          </button>
        </div>
      </main>

      <ModalDireccion isOpen={isOpen} closeModal={() => setIsOpen(false)} />
    </div>
    </>
  )
}

export default ProfilePage
