import { CircleX } from 'lucide-react';
import { useState } from 'react';
import supabase from '../config/supabaseClient.js';

export function ModalCrear ({isOpen, closeModal}) {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [formError, setFormError] = useState(null);

    const sumbitCreate = async (e) => {
        e.preventDefault();
        console.log(name, category, price);

        if ( !name || !category || !price) {
            setFormError('Todos los campos son obligatorios');
        }

        if ( name && category && price ) {
            const { data, error } = await supabase
            .from('Producto')
            .insert([
                { name, category, price }
            ])
            setName('');
            setCategory('');
            setPrice('');
            closeModal();
            alert('Producto creado con éxito');
            if (error) {
                setFormError(error)
            }
            else {
                {closeModal}
            }
        }
    }

    if (!isOpen) return null;
    return (
        <>
            <div className={` fixed inset-0 transition-colors ${isOpen ? 'visible bg-black/50' : 'hidden'}`}>
                <div className="flex flex-col justify-center items-center mx-5 my-11 bg-gradient-to-br from-[#ececec] to-[#e6e6e6] rounded-lg shadow-md p-1">
                    <div className="flex flex-row justify-around m-2 gap-2">
                        <h4 className="text-[1.2rem] font-extrabold">Crear producto</h4>
                        <button onClick={closeModal}>
                            <CircleX color="#ff6961" size={25} />
                        </button>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                        <form onSubmit={ sumbitCreate } className="flex flex-col gap-3">
                            <fieldset className="border-2 border-gray-700 rounded-md p-2">
                                <legend className="p-1">Nombre: </legend>
                                <input className="rounded-md p-1" type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                            </fieldset>
                            

                            <fieldset className="border-2 border-gray-700 rounded-md p-2">
                            <legend className="p-1">Categoría:</legend>

                            <div>
                                <input type="radio" id="hamburguesa" name="category" value="hamburguesa" checked={category === 'hamburguesa'} onChange={(e) => setCategory(e.target.value)} />
                                <label for="hamburguesa">Hamburguesa</label>
                            </div>

                            <div>
                                <input type="radio" id="extra" name="category" value="extra" checked={category === 'extra'} onChange={(e) => setCategory(e.target.value)} />
                                <label for="extra">Extra</label>
                            </div>
                            </fieldset>

                            <fieldset className="border-2 border-gray-700 rounded-md p-2">
                                <legend className="p-1">Precio: </legend>
                                <input className="rounded-md p-1" type="text"
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)} />
                            </fieldset>
                            {formError && <p className="text-red-500">{ formError }</p>}
                            <button className="m-4 w-full bg-gebum-violet text-white p-2 rounded-md hover:bg-gebum-violet transition-colors">
                                Crear
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>)
}