"use client"

import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import supabase from "../config/supabaseClient"
import NavBar from '../components/NavBar.jsx';

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [showReset, setShowReset] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [resetLoading, setResetLoading] = useState(false)
  const [resetError, setResetError] = useState(null)
  const [resetSuccess, setResetSuccess] = useState(false)
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError("Correo o contraseña incorrectos")
        setSuccess(false)
      } else {
        setSuccess(true)
        setTimeout(() => {
          navigate('/')
        }, 2000)
      }
    } catch (err) {
      setError("Ocurrió un error durante el inicio de sesión")
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <div className="flex flex-col h-screen">
      <NavBar/>
      <div className="h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Iniciar sesión</h2>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {success ? (
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">¡Bienvenido! Has iniciado sesión correctamente.</p>
              </div>
            </div>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Correo electrónico
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gebum-violet focus:border-gebum-violet focus:z-10 sm:text-sm"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gebum-violet focus:border-gebum-violet focus:z-10 sm:text-sm"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center flex-col gap-1">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gebum-violet focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                {loading ? "Cargando..." : "Iniciar sesión"}
              </button>
              <button onClick={() => navigate("/registro")}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                No tienes una cuenta? Crea una.
              </button>
              <button
                type="button"
                onClick={() => setShowReset(!showReset)}
                className="mt-2 text-sm text-gebum-violet hover:underline bg-transparent border-none shadow-none"
              >
                ¿Has olvidado tu contraseña?
              </button>
            </div>
          </form>
        )}

        {/* Recuperación de contraseña */}
        {showReset && (
          <div className="mt-4 p-4 border rounded bg-white">
            <h3 className="text-md font-semibold mb-2">Recuperar contraseña</h3>
            <input
              type="email"
              placeholder="Introduce tu correo electrónico"
              className="w-full px-3 py-2 border rounded mb-2"
              value={resetEmail}
              onChange={e => setResetEmail(e.target.value)}
              disabled={resetLoading}
            />
            <button
              className="w-full py-2 px-4 bg-gebum-violet text-white rounded disabled:opacity-50"
              onClick={async () => {
                setResetLoading(true);
                setResetError(null);
                setResetSuccess(false);
                try {
                  const { error } = await supabase.auth.resetPasswordForEmail(resetEmail);
                  if (error) {
                    setResetError("No se pudo enviar el correo de recuperación. Verifica el correo e inténtalo de nuevo.");
                  } else {
                    setResetSuccess(true);
                  }
                } catch (err) {
                  setResetError("Ocurrió un error al intentar recuperar la contraseña.");
                } finally {
                  setResetLoading(false);
                }
              }}
              disabled={resetLoading || !resetEmail}
            >
              {resetLoading ? "Enviando..." : "Enviar correo de recuperación"}
            </button>
            {resetError && <p className="text-red-500 mt-2 text-sm">{resetError}</p>}
            {resetSuccess && <p className="text-green-600 mt-2 text-sm">Correo de recuperación enviado. Revisa tu bandeja de entrada.</p>}
          </div>
        )}

      </div>
    </div>
    </div>
    
    </>
  )
}

