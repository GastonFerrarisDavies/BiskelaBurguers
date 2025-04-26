import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';

import Card from './Card';
import CardHeader from './CardHeader';
import CardTitle from './CardTitle';
import CardContent from './CardContent';
import CardFooter from './CardFooter';

const ModalEditar = ({ pSelected, isOpen, closeModal }) => {
  const [editedProduct, setEditedProduct] = useState({
    id: pSelected?.id || null,
    name: pSelected?.name || '',
    category: pSelected?.category || '',
    price: pSelected?.price || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para manejar los cambios en los campos del formulario
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Función para actualizar el producto en la base de datos de Supabase
  const updateProduct = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from('Producto')
      .update(editedProduct)
      .eq('id', editedProduct.id)

    setLoading(false);

    if (error) {
      console.error('Error al actualizar el producto:', error);
      setError('Hubo un error al intentar actualizar el producto.');
    } else {
      console.log('Producto actualizado exitosamente:', data);
      setSelectedProduct(null);
      setEditedProduct({ id: null, name: '', category: '', price: '', image: '' });
    }
  };

  if (!isOpen) return null

  return (
    <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
    >
        <div className="absolute inset-0 bg-black/50" onClick={closeModal} />
        <Card className="relative w-full max-w-md mx-4 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">Editar producto</CardTitle>
          <Button variant="ghost" size="icon" onClick={closeModal} className="h-8 w-8 rounded-full">
            <CircleX className="h-5 w-5 text-red-500" />
          </Button>
        </CardHeader>

        <form onSubmit={updateProduct}>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={editedProduct.name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre del producto"
              />
            </div>

            <div className="space-y-2">
              <Label>Categoría</Label>
              <RadioGroup value={category} onValueChange={setCategory} className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="hamburguesa"
                    id="hamburguesa"
                    checked={editedProduct.category === "hamburguesa"}
                    onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })}
                  />
                  <Label htmlFor="hamburguesa" className="font-normal">
                    Hamburguesa
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="extra"
                    id="extra"
                    checked={editedProduct.category === "extra"}
                    onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })}
                  />
                  <Label htmlFor="extra" className="font-normal">
                    Extra
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Precio</Label>
              <Input
                id="price"
                value={editedProduct.price}
                onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
                placeholder="Precio del producto"
              />
            </div>

            {error && <p className="text-sm font-medium text-red-500">{error}</p>}
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full bg-gebum-violet hover:bg-gebum-violet/90" disabled={loading}>
              {loading ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ModalEditar;