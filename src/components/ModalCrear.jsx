"use client"

import { useState } from "react"
import { CircleX } from "lucide-react"
import supabase from "../config/supabaseClient"
import CardHeader from "./CardHeader"
import Button from "./Button"
import Label from "./Label"
import Input from "./Input"
import RadioGroup from "./RadioGroup"
import RadioGroupItem from "./RadioGroupItem"
import Card from "./Card"
import CardTitle from "./CardTitle"
import CardContent from "./CardContent"
import CardFooter from "./CardFooter"


export function ModalCrear({ isOpen, closeModal }) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [formError, setFormError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)

    if (!name || !category || !price) {
      setFormError("Todos los campos son obligatorios")
      return
    }

    try {
      setIsSubmitting(true)

      const { error } = await supabase.from("Producto").insert([{ name, category, price }])

      if (error) {
        throw error
      }

      setName("")
      setCategory("")
      setPrice("")
      closeModal()
      alert("Producto creado con éxito")
    } catch (error) {
      setFormError("Error al crear el producto")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

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
          <CardTitle className="text-xl font-bold">Crear producto</CardTitle>
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
                value={name}
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
                    checked={category === "hamburguesa"}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <Label htmlFor="hamburguesa" className="font-normal">
                    Hamburguesa
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="extra"
                    id="extra"
                    checked={category === "extra"}
                    onChange={(e) => setCategory(e.target.value)}
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
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Precio del producto"
              />
            </div>

            {formError && <p className="text-sm font-medium text-red-500">{formError}</p>}
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full bg-gebum-violet hover:bg-gebum-violet/90" disabled={isSubmitting}>
              {isSubmitting ? "Creando..." : "Crear"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
