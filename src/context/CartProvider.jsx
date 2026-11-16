import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { CartContext } from './cart-context.js'
import { subscribeToFavourites, toggleFavouriteItem } from '../services/favourites.js'

export function CartProvider({ children }) {
  const { user } = useAuth()

  const [cart, setCart] = useLocalStorage('campuseats-cart', [])
  const [favourites, setFavourites] = useState([])

  useEffect(() => {
    if (!user) return
    const unsubscribe = subscribeToFavourites(user.uid, setFavourites)
    return () => {
      unsubscribe()
      setFavourites([])
    }
  }, [user])

  // Safely calculate count and total using optional chaining (?.)
  const count = cart.reduce((sum, line) => sum + (line?.qty || 0), 0)
  const total = cart.reduce((sum, line) => sum + ((line?.item?.price || 0) * (line?.qty || 0)), 0)

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((line) => line?.item?.id === item.id)
      if (existing) {
        return prev.map((line) =>
          line?.item?.id === item.id ? { ...line, qty: line.qty + 1 } : line
        )
      }
      return [...prev, { item, qty: 1 }]
    })
  }

  const changeQty = (itemId, delta) => {
    setCart((prev) =>
      prev
        .map((line) =>
          line?.item?.id === itemId ? { ...line, qty: line.qty + delta } : line
        )
        .filter((line) => line.qty > 0)
    )
  }

  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((line) => line?.item?.id !== itemId))
  }

  const clearCart = () => {
    setCart([])
  }

  const toggleFavourite = async (itemId) => {
    if (!user) return
    const isFav = favourites.includes(itemId)
    await toggleFavouriteItem(user.uid, itemId, isFav)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        clearCart,
        favourites,
        count,
        total,
        addToCart,
        changeQty,
        removeFromCart,
        toggleFavourite,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

