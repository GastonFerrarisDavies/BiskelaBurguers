import { useState } from 'react';
import supabase from '../config/supabaseClient';
import { CircleX } from 'lucide-react';
import Card from './Card';
import CardHeader from './CardHeader';
import CardTitle from './CardTitle';
import CardContent from './CardContent';
import Button from './Button';

export default function ModalEliminar({ isOpen, closeModal, pSelected }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const deleteProduct = async () => {
        setIsLoading(true);
        setError(null);

        try {
            await supabase.from('Producto').delete().eq('id', pSelected.id);
            setSuccess('Producto eliminado correctamente');
            setTimeout(closeModal, 2000);
        } catch (error) {
            setError(error);
        }
    }

    if ( !isOpen ) return null;
    
        return (
            <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="absolute inset-0 bg-black/50" onClick={closeModal} />
            <Card className="relative w-full max-w-md mx-4 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">Eliminar producto</CardTitle>
                <Button variant="ghost" size="icon" onClick={closeModal} className="h-8 w-8 rounded-full">
                  <CircleX className="h-5 w-5 text-red-500" />
                </Button>
              </CardHeader>
              <CardContent>

              <div className="flex flex-col gap-2 justify-center items-center">
                <h1>¿Estás seguro de querer eliminar {pSelected.name}?</h1>
                <div className="flex gap-2 flex-row">
                  <Button onClick={closeModal}>Cancelar</Button>
                  <Button className="bg-red-500" onClick={() => {
                      deleteProduct(pSelected.id);
                  }}>{isLoading ? 'Eliminando...' : 'Eliminar'}</Button>
                </div>
                  {error && <p className="text-red-500">{error.message}</p>}
                  {success && <p className="text-green-500">{success}</p>}
            </div>
              </CardContent>
            </Card>
            </div>
        )
}

