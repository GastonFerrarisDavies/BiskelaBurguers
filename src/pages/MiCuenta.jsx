import { useState, useEffect } from "react"
import supabase from "../config/supabaseClient"
import { useNavigate } from "react-router-dom"
import { ArrowLeftFromLine } from "lucide-react"

export default function MiCuenta() {
  const [userData, setUserData] = useState(null);
  const [direcciones, setDirecciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nombre, setNombre] = useState('');
  const [mail, setMail] = useState('');
  const [id, setId] = useState('');
  const userID = 5
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Ejecuta useEffect")
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      console.log("ejecuta try")
      console.log("userID:", userID); // Verifica el valor de userID

      const { data, error: userError } = await supabase
        .from('Usuario')
        .select('id, nombre, mail')
        .eq('id', userID);

      if (userError) {
        console.error("Error fetching user data:", userError);
        setError(userError.message);
        return; // Detener la ejecución si hay un error
      }

      if (data) {
        console.log("User data:", data);
        setId(data.id);
        setNombre(data.nombre);
        setMail(data.mail);
        setUserData(data);
      } else {
        console.log("No user data found for userID:", userID);
      }

      const { data: direccionesData, error: direccionError } = await supabase
        .from('Direccion')
        .select('*')
        .eq('usuario_id', userID);

      if (direccionError) {
        console.error("Error fetching direcciones:", direccionError);
        setError(direccionError.message);
        return; // Detener la ejecución si hay un error
      }

      console.log("Direcciones data:", direccionesData);
      setDirecciones(direccionesData);

    } catch (error) {
      console.error("Unexpected error:", error);
      setError(error.message);
    }
  };

  



  return (
    <>
      <header>
        <div className="absolute flex flex-row justify-between align-center w-screen p-3 bg-gebum-violet">
        <span className="text-white font-extrabold text-[1.3rem]" onClick={() => {navigate('/')}} >Biskela</span>
        <div className="flex flex-row gap-2">
          <ArrowLeftFromLine className="" onClick={() => navigate(-1)} color="white" size={30} />
        </div>
        </div>
      </header>

    </>
  );
}