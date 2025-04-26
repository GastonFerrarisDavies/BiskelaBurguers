import { User, ArrowLeftFromLine } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function NavBar() {
    const navigate = useNavigate();
    const { session } = useContext(AuthContext);

    const goHome = () => {
        navigate('/');
    };

    const goUser = () => {
        if (session) {
            navigate('/MiCuenta');
        } else {
            navigate('/InicioSesion');
        }

    }    

    return (
        <header>
            <div className="flex flex-row justify-between align-center w-screen p-3 bg-gebum-violet">
                <span className="text-white font-extrabold text-[1.3rem]" onClick={goHome} >Biskela</span>
                <div className="flex flex-row gap-2">
                    <User className="text-white" size={30} onClick={() => navigate('/InicioSesion')} />
                    <ArrowLeftFromLine className="" onClick={() => navigate(-1)} color="white" size={30} />
                </div>
            </div>
        </header>
    )
}
