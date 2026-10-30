import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { CartContext } from './cart-context.js'

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('campuseats-cart', [])
  const [orders, setOrders] = useLocalStorage('campuseats-orders', [])
  const [favourites, setFavourites] = useLocalStorage('campuseats-favourites', [])

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

  const placeOrder = (details) => {
    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items: cart,
      total,
      details,
    }
    setOrders((prev) => [newOrder, ...prev])
    setCart([])
  }

  const toggleFavourite = (itemId) => {
    setFavourites((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    )
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        favourites,
        count,
        total,
        addToCart,
        changeQty,
        removeFromCart,
        placeOrder,
        toggleFavourite,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}