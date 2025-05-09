import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Admin from './pages/Admin';
import FinPedido from './pages/FinPedido';
import InicioSesion from './pages/InicioSesion';
import Registro from './pages/Registro';
import NotFound from './pages/NotFound';
import MiCuenta from './pages/MiCuenta';
import './App.css'

export function App() {
  return (
    <>
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/finPedido" element={<FinPedido />} />
        <Route path="/inicioSesion" element={<InicioSesion />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/miCuenta" element={<MiCuenta />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </>
  )
}
 