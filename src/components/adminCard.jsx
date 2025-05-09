import './card-a.css'
import { MonitorCog } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export function AdminCard () {
    const navigate = useNavigate();

    return (
      <a href="#" className="card-a col-span-1 row-span-1 bg-gradient-to-br from-[#1d1d1d] to-[#131313] p-0 m-0 rounded-md shadow flex items-center justify-center">
        <MonitorCog color="#E8D57B" size={76} onClick={() => {navigate('/admin')}} />
      </a>
    )
}