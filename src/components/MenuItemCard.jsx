import { Link, useLocation } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'
import { useCart } from '../hooks/useCart.js'

function MenuItemCard({ item, onAdd }) {
  const { user } = useAuth()
  const { favourites, toggleFavourite } = useCart()
  const location = useLocation()
  const isFav = favourites.includes(item.id)

  return (
    <article className="card menu-card">
      <div className="thumb" aria-hidden="true">{item.name.charAt(0)}</div>
      {user ? (
        <button
          type="button"
          onClick={() => toggleFavourite(item.id)}
          style={{ float: 'right', background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
          aria-label={isFav ? 'Remove from favourites' : 'Add to favourites'}
        >
          {isFav ? '♥' : '♡'}
        </button>
      ) : (
        <Link
          to="/login"
          state={{ from: location.pathname }}
          style={{ float: 'right', fontSize: '0.85rem' }}
        >
          Log in to save favourites
        </Link>
      )}
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
