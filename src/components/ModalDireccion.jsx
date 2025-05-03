"use client"

import { useState, useContext } from "react"
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
import { AuthContext } from "../context/AuthContext"

export function ModalDireccion({ isOpen, closeModal }) {
  const [calle, setCalle] = useState("")
  const [numero, setNumero] = useState("")
  const [entrecalle1, setEntrecalle1] = useState("")
  const [entrecalle2, setEntrecalle2] = useState("")
  const [formError, setFormError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const { user } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)

    if (!calle || !numero || !entrecalle1 || !entrecalle2) {
      setFormError("Todos los campos son obligatorios")
      return
    }

    try {
      setIsSubmitting(true)

      const { error } = await supabase.from("Direccion").insert([{ calle: calle, numero: numero, entreCalle1: entrecalle1, entreCalle2: entrecalle2, userID: user.id }])

      if (error) {
        throw error
      }

      setCalle("")
      setNumero("")
      setEntrecalle1("")
      setEntrecalle2("")
      setSuccess(true)
      setTimeout(() => {
        closeModal()
      }, 2000)
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
          <CardTitle className="text-xl font-bold">Añadir dirección</CardTitle>
          <Button variant="ghost" size="icon" onClick={closeModal} className="h-8 w-8 rounded-full">
            <CircleX className="h-5 w-5 text-red-500" />
          </Button>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="calle">Calle</Label>
              <Input
                id="calle"
                value={calle}
                onChange={(e) => setCalle(e.target.value)}
                placeholder="123"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numero">Número</Label>
              <Input
                id="numero"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                placeholder="1400"
              />
            </div>

            <div className="space-y-2 flex flex-row gap-2 items-center">
              <Label htmlFor="entrecalle1">Entrecalles</Label>
              <div className="flex flex-row gap-2">
              <Input
                id="entrecalle1"
                value={entrecalle1}
                onChange={(e) => setEntrecalle1(e.target.value)}
                placeholder="123"
              />
              <Input
                id="entrecalle2"
                value={entrecalle2}
                onChange={(e) => setEntrecalle2(e.target.value)}
                placeholder="123"
              />
              </div>
              
            </div>

            {formError && <p className="text-sm font-medium text-red-500">{formError}</p>}
            {success && <p className="text-sm font-medium text-green-500">Dirección añadida correctamente</p>}
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full bg-gebum-violet hover:bg-gebum-violet/90" disabled={isSubmitting}>
              {isSubmitting ? "Añadiendo..." : "Añadir mi dirección"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
