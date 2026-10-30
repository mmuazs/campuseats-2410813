import { useCart } from '../hooks/useCart.js'

function OrdersPage() {
  const { orders } = useCart()

  if (orders.length === 0) {
    return (
      <section>
        <h2 className="section-title">My Orders</h2>
        <p className="muted">You haven't placed any orders yet.</p>
      </section>
    )
  }

  return (
    <section>
      <h2 className="section-title">My Orders</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="card order-card">
            <h3>Order {order.id.slice(-5)}</h3>
            <p className="muted">Total: RM {order.total.toFixed(2)}</p>
            <ul>
              {order.items.map((line) => (
                <li key={line.item.id}>
                  {line.qty}x {line.item.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OrdersPage