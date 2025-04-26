
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
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/FinPedido" element={<FinPedido />} />
        <Route path="/InicioSesion" element={<InicioSesion />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/MiCuenta" element={<MiCuenta />} />
      </Routes>
    </Router>
    </>
  )
}
 