import { useNavigate } from 'react-router-dom';

export function Pedidos () {
    const navigate = useNavigate();

    const goCart = () => {
        navigate('/products');
    };
    return (
        <a href="" onClick={goCart} className="col-span-3 row-span-3 bg-gradient-to-br from-gebum-violet to-[#492861] p-0 rounded-md shadow flex flex-col items-center justify-center text-4xl font-bold hover:text-[2.5rem] transition-[.5s] overflow-hidden">
            <div className="g-image"/> 
        </a>
    )
}