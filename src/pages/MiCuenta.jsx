// src/pages/ProfilePage.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import { ArrowLeftFromLine } from 'lucide-react';
import { ModalDireccion } from '../components/ModalDireccion';

const ProfilePage = () => {
  const { logOut, session, user, loading } = useContext(AuthContext);
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    console.log("hola")
    logOut()
    navigate('/')
  }

  if (loading) {
    return <p>Cargando información del usuario...</p>;
  }

  if (!session) {
    return <p>No estás autenticado. Redirige a la página de inicio de sesión.</p>;
  }

  return (
    <>
    <header>
      <div className="flex flex-row justify-between align-center w-screen p-3 bg-gebum-violet">
        <span className="text-white font-extrabold text-[1.3rem]" onClick={ () => {navigate('/')}} >Biskela</span>
        <div className="flex flex-row gap-2">
          <ArrowLeftFromLine className="" onClick={() => navigate(-1)} color="white" size={30} />
        </div>
      </div>
    </header>
    <div>
      <div className="flex flex-col gap-2 m-2 items-center align-center">
        <div className="flex flex-col align-center items-center">
          <h2 className="font-semibold text-[1.3rem]">Hola! {user?.email}</h2>
          <h4 className="font-semibold text-[1rem]">Bienvenido al panel de editor de usuario.</h4>
        </div>

      </div>
    </div>

    <div className="flex flex-col gap-2 m-2">
      <button onClick={ () => {setIsOpen(true)}} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gebum-violet focus:outline-none focus:ring-2 focus:ring-offset-2">
        Añadir dirección
      </button>
      <button onClick={ () => {handleClick()}} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2">
        Cerrar sesión
      </button>
    </div>
    <ModalDireccion isOpen={isOpen} closeModal={() => setIsOpen(false)} />
    </>

  );
};

export default ProfilePage;