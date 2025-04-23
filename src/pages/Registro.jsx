import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../config/supabaseClient';
import { ArrowLeftFromLine } from 'lucide-react';

export default function Registro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [name, setName] = useState('');

  const navigate = useNavigate("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try { await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          displayName: username,
        },
      },
    });
    setSuccess('Hemos enviado un mail de confirmación.');
    setEmail('');
    setPassword('');
  } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
    <div>
      
    </div>
      <header>
        <div className="absolute flex flex-row justify-between align-center w-screen p-3 bg-gebum-violet">
        <span className="text-white font-extrabold text-[1.3rem]" onClick={() => {navigate('/')}} >Biskela</span>
        <div className="flex flex-row gap-2">
          <ArrowLeftFromLine className="" onClick={() => navigate(-1)} color="white" size={30} />
        </div>
        </div>
      </header>
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Crea tu cuenta!</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSignup}>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Nombre:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Cristina"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="cris@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contrseña:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Cristina123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          
          <div className="flex items-center justify-between">
            <button
              className="bg-gebum-violet hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
                Confirmar.
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}