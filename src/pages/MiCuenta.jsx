import { useState, useEffect } from "react"
import supabase from "../config/supabaseClient"

function MiComponente() {
  const [userData, setUserData] = useState(null);
  const [direcciones, setDirecciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDataAndDirecciones = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data: session, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !session?.user?.id) {
          setError(sessionError?.message || 'No hay sesión de usuario activa.');
          setLoading(false);
          return;
        }

        const userId = session.user.id;

        // 1. Obtener los datos del usuario (opcional, ya tienes el id de la sesión)
        const { data: user, error: userError } = await supabase
          .from('User')
          .select('*')
          .eq('id', userId)
          .single(); // Esperamos un solo usuario

        if (userError) {
          setError(userError.message);
          setLoading(false);
          return;
        }
        setUserData(user);

        // 2. Obtener las relaciones de direcciones del usuario
        const { data: userDirecciones, error: userDireccionesError } = await supabase
          .from('userDireccion')
          .select('direccionID')
          .eq('userID', userId);

        if (userDireccionesError) {
          setError(userDireccionesError.message);
          setLoading(false);
          return;
        }

        if (userDirecciones && userDirecciones.length > 0) {
          const direccionIds = userDirecciones.map(ud => ud.direccionID);

          // 3. Obtener los detalles de las direcciones
          const { data: direccionesData, error: direccionesError } = await supabase
            .from('Direccion')
            .select('*')
            .in('id', direccionIds);

          if (direccionesError) {
            setError(direccionesError.message);
            setLoading(false);
            return;
          }
          setDirecciones(direccionesData);
        } else {
          setDirecciones([]); // El usuario no tiene direcciones asociadas
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDataAndDirecciones();
  }, []); // Se ejecuta una vez al montar el componente

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error al cargar los datos: {error}</p>;

  return (
    <div>
      {userData && (
        <div>
          <h3>Información del Usuario</h3>
          <p>ID: {userData.id}</p>
          <p>Email: {userData.mail}</p>
        </div>
      )}

      {direcciones.length > 0 && (
        <div>
          <h3>Direcciones Asociadas</h3>
          <ul>
            {direcciones.map(direccion => (
              <li key={direccion.id}>
                Calle: {direccion.calle}, Número: {direccion.numero}
                {direccion.entrecalle1 && `, entre ${direccion.entrecalle1}`}
                {direccion.entrecalle2 && ` y ${direccion.entrecalle2}`}
              </li>
            ))}
          </ul>
        </div>
      )}

      {direcciones.length === 0 && userData && (
        <p>Este usuario no tiene direcciones asociadas.</p>
      )}
    </div>
  );
}

export default MiComponente;