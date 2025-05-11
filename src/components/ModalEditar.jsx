import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';

import Card from './Card';
import CardHeader from './CardHeader';
import CardTitle from './CardTitle';
import CardContent from './CardContent';
import CardFooter from './CardFooter';
import { CircleX } from "lucide-react";
import Button from './Button';
import Label from './Label';
import Input from './Input';
import RadioGroup from './RadioGroup';
import RadioGroupItem from './RadioGroupItem';

export default function ModalEditar ({ pSelected, isOpen, closeModal }) {
  const [editedProduct, setEditedProduct] = useState({
    id: pSelected?.id,
    name: pSelected?.name,
    category: pSelected?.category,
    price: pSelected?.price,
    image: pSelected?.image
  });
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    setEditedProduct({
      id: pSelected?.id,
      name: pSelected?.name,
      category: pSelected?.category,
      price: pSelected?.price,
      image: pSelected?.image
    });
    setNewImage(null);
  }, [pSelected]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!editedProduct.name || !editedProduct.category || !editedProduct.price) {
      setError("Todos los campos son obligatorios.");
      setLoading(false);
      return;
    }

    try {
      let imageUrl = editedProduct.image;

      if (newImage) {
        if (editedProduct.image) {
          const oldImageName = editedProduct.image.split('/').pop();
          await supabase.storage.from('productsimages').remove([oldImageName]);
        }

        const { error: uploadError } = await supabase.storage
          .from('productsimages')
          .upload(`${editedProduct.name}.jpg`, newImage);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('productsimages')
          .getPublicUrl(`${editedProduct.name}.jpg`);

        imageUrl = publicUrl;
      }

      const { data, error } = await supabase
        .from('Producto')
        .update({
          name: editedProduct.name,
          category: editedProduct.category,
          price: Number(editedProduct.price),
          image: imageUrl
        })
        .eq('id', editedProduct.id)
        .select();

      if (error) throw error;

      setSuccess('Producto actualizado correctamente');
      setTimeout(() => {
        closeModal(data[0]);
      }, 2000);
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      setError('Hubo un error al intentar actualizar el producto.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

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

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={editedProduct.name}
                onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                placeholder={pSelected?.name || ""}
              />
            </div>

            <div className="space-y-2">
              <Label>Categoría</Label>
              <RadioGroup 
                value={editedProduct.category} 
                onValueChange={(value) => {
                  setEditedProduct(prev => ({
                    ...prev,
                    category: value
                  }));
                }}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="hamburguesa"
                    id="hamburguesa"
                  />
                  <Label htmlFor="hamburguesa" className="font-normal">
                    Hamburguesa
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="extra"
                    id="extra"
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
                type="number"
                value={editedProduct.price}
                onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
                placeholder={pSelected?.price || ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Imagen</Label>
              {editedProduct.image && !newImage && (
                <div className="mb-2">
                  <img 
                    src={editedProduct.image} 
                    alt={editedProduct.name} 
                    className="w-32 h-32 object-cover rounded-md"
                  />
                </div>
              )}
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setNewImage(e.target.files[0])}
              />
              {newImage && (
                <p className="text-sm text-gray-500">Nueva imagen seleccionada</p>
              )}
            </div>

            {error && <p className="text-sm font-medium text-red-500">{error}</p>}
            {success && <p className="text-sm font-medium text-green-500">{success}</p>}
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
