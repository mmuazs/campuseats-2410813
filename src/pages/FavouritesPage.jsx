import { useCart } from '../hooks/useCart.js'
import { useVendors } from '../hooks/useVendors.js'
import MenuItemCard from '../components/MenuItemCard.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

function FavouritesPage() {
  const { favourites, addToCart } = useCart()
  const { vendors, loading, error, reload } = useVendors()

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  const allItems = vendors.flatMap((v) => v.menu)
  const favouriteItems = allItems.filter((item) => favourites.includes(item.id))

  if (favouriteItems.length === 0) {
    return (
      <section>
        <h2 className="section-title">My Favourites</h2>
        <p className="muted">You haven't added any favourites yet.</p>
      </section>
    )
  }

  return (
    <section>
      <h2 className="section-title">My Favourites</h2>
      <div className="grid">
        {favouriteItems.map((item) => (
          <MenuItemCard key={item.id} item={item} onAdd={() => addToCart(item)} />
        ))}
      </div>
    </section>
  )
}

export default FavouritesPage