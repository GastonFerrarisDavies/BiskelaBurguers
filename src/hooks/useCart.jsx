import { useContext } from 'react'
import { CartContext } from '../context/Cart'

export default function useCart() {

    const cart = useContext(CartContext)

    return cart
}