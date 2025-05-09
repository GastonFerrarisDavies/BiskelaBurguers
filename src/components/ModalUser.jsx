import React, { useState } from 'react';
import supabase from '../config/supabaseClient';
import Card from './Card';
import CardHeader from './CardHeader';
import CardTitle from './CardTitle';
import CardContent from './CardContent';
import CardFooter from './CardFooter';
import Button from './Button';
import Label from './Label';
import Input from './Input';
import { CircleX } from 'lucide-react';

function ModalUser({ isOpen, closeModal }) {
  const [userEmail, setUserEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    // Verificar si el email ya existe
  const { data: existing, error: fetchError } = await supabase
    .from('Admin')
    .select('email')
    .eq('email', userEmail)
    .maybeSingle();

  if (existing) {
    setIsSubmitting(false);
    setError('Este email ya fue agregado como administrador.');
    return;
  }
  if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116: No rows found
    setIsSubmitting(false);
    setError('Ocurrió un error al verificar el email.');
    return;
  }

    const { data, error: insertError } = await supabase.from('Admin').insert([{ email: userEmail, type: 'admin' }]);
    setIsSubmitting(false);
    if (insertError) {
      setError('Ocurrió un error al añadir el administrador.');
      return;
    }
    setSuccess(true);
    setUserEmail('');
  }
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <Card className="relative w-full max-w-md mx-4 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">Añadir administrador</CardTitle>
          <Button variant="ghost" size="icon" onClick={closeModal} className="h-8 w-8 rounded-full">
            <CircleX className="h-5 w-5 text-red-500" />
          </Button>
        </CardHeader>

        
          <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="calle">Mail de administrador</Label>
                <Input
                type="text"
                placeholder="Buscar por email..."
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>

          {success && <p className="text-sm font-medium text-green-500">Administrador añadido correctamente</p>}
          {error && <p className="text-sm font-medium text-red-500">{error}</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-gebum-violet hover:bg-gebum-violet/90" disabled={isSubmitting}>
              {isSubmitting ? "Añadiendo..." : "Añadir nuevo administrador"}
            </Button>
          </CardFooter>
          </form>
      </Card>
    </div>
  )
}

export default ModalUser;