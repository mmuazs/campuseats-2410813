import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'
import { useCart } from '../hooks/useCart.js'
import { placeOrders } from '../services/orders.js'
import CartItem from '../components/CartItem.jsx'
import CheckoutForm from '../components/CheckoutForm.jsx'

function CartPage() {
  const { cart, total, changeQty, removeFromCart, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  async function handlePlaceOrder(details) {
    setError('')
    try {
      await placeOrders(user, cart, details)
      clearCart()
      navigate('/orders')
    } catch (err) {
      setError(`Could not place the order: ${err.message}`)
    }
  }

  // Safety check: Filter out corrupted old local storage data
  const validCart = cart.filter((line) => line && line.item)

  if (validCart.length === 0) {
    return (
      <section>
        <h2 className="section-title">Your cart</h2>
        <p className="muted">Your cart is empty.</p>
      </section>
    )
  }

  return (
    <section>
      <h2 className="section-title">Your cart</h2>
      {error && <p className="field-error" role="alert">{error}</p>}
      <div className="cart-layout">
        <div className="cart-items">
          {validCart.map((line) => (
            <CartItem
              key={line.item.id}
              line={line}
              onChangeQty={changeQty}
              onRemove={removeFromCart}
            />
          ))}
          <div className="cart-total">
            <h3>Total: RM {total.toFixed(2)}</h3>
          </div>
        </div>
        <div className="checkout-sidebar">
          <CheckoutForm
            defaultName={user?.displayName ?? ''}
            onPlaceOrder={handlePlaceOrder}
          />
        </div>
      </div>
    </section>
  )
}

export default CartPage
