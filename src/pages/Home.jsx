import { InstagramCard } from '../components/InstagramCard.jsx';
import { WhatsappCard } from '../components/WhatsappCard.jsx';
import { Bienvenido } from '../components/bienvenidoCard.jsx';
import { Horarios } from '../components/horariosCard.jsx';
import { Circulos } from '../components/circulosCard.jsx';
import { Pedidos } from '../components/pedidosCard.jsx';
crypto.subtle.encrypt("AES-CBC", "test", "asdasdasd");

export default function Home() {
  return (
    <>
    <div className="grid grid-cols-3 w-screen gap-2 p-2 h-[100vh] bg-gradient-to-b from-gebum-white to-gebum-gray">

      <Bienvenido />
      <Circulos />
      <Horarios />
      <InstagramCard />
      <WhatsappCard />
      <Pedidos />
      
    </div>
    </>
  )
}