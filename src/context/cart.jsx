import { useState, createContext } from 'react'

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product, quantity) => {
        setCart(prevState => {
          const productExists = prevState.find(item => item.id === product.id);
      
          if (productExists) {
            return prevState.map(item => {
              if (item.id === product.id) {
                return { ...item, quantity: item.quantity + quantity };
              }
              return item;
            });
          } else {
            return [...prevState, { ...product, quantity }];
          }
        });
      };

    const removeFromCart = (productId) => {
        setCart(cart => {
          const productToUpdate = cart.find(item => item.id === productId);
      
          if (productToUpdate) {
            if (productToUpdate.quantity === 1) {
              return cart.filter(item => item.id !== productId);
            } else if (productToUpdate.quantity > 1) {
              return cart.map(item => {
                if (item.id === productId) {
                  return { ...item, quantity: item.quantity - 1 };
                }
                return item;
              });
            }
          }
        });
      };

    const value = { cart, addToCart, removeFromCart };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}


