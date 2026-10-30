import { useNavigate } from 'react-router'
import { useCart } from '../hooks/useCart.js'
import CartItem from '../components/CartItem.jsx'
import CheckoutForm from '../components/CheckoutForm.jsx'

function CartPage() {
  const { cart, total, changeQty, removeFromCart, placeOrder } = useCart()
  const navigate = useNavigate()

  const handleCheckout = (details) => {
    placeOrder(details)
    navigate('/orders')
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
          <CheckoutForm onPlaceOrder={handleCheckout} />
        </div>
      </div>
    </section>
  )
}

export default CartPage