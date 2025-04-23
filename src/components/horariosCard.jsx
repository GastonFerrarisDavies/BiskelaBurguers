import './card-a.css'
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import supabase from '../config/supabaseClient';


export function Horarios () {

  const handleClick = async () => {
    if (supabase.auth.getSession()) {
      navigate('/micuenta')
    }
    else {
      navigate('/InicioSesion')
    }
  }

    const navigate = useNavigate();
    return (
      <a href="#" className="card-a col-span-1 row-span-1 bg-gradient-to-br from-[#1d1d1d] to-[#131313] p-0 m-0 rounded-md shadow flex items-center justify-center">
        <User color="#E8D57B" size={76} onClick={handleClick} />
      </a>
    )
}