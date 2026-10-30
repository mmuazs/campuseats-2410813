import { useCart } from '../hooks/useCart.js'

function MenuItemCard({ item, onAdd }) {
  const { favourites, toggleFavourite } = useCart()
  const isFav = favourites.includes(item.id)

  return (
    <article className="card menu-card">
      <div className="thumb" aria-hidden="true">{item.name.charAt(0)}</div>
      <button
        type="button"
        onClick={() => toggleFavourite(item.id)}
        style={{ float: 'right', background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
      >
        {isFav ? '♥' : '♡'}
      </button>
      <p className="tag">{item.category}</p>
      <h3>{item.name}</h3>
      <p className="muted">{item.description}</p>
      <p className="price">RM {item.price.toFixed(2)}</p>
      <button className="btn" disabled={!item.available} onClick={onAdd}>
        {item.available ? 'Add to cart' : 'Sold out'}
      </button>
    </article>
  )
}

export default MenuItemCard