import { useState, useEffect } from 'react'
import { useCart } from '../hooks/useCart.js'
import { useVendors } from '../hooks/useVendors.js'
import { subscribeToAllMenuItems } from '../services/vendors.js'
import MenuItemCard from '../components/MenuItemCard.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

function FavouritesPage() {
  const { favourites, addToCart } = useCart()
  const { vendors, loading: vendorsLoading, error: vendorsError, reload } = useVendors()
  const [menuItems, setMenuItems] = useState([])
  const [menuLoading, setMenuLoading] = useState(true)
  const [menuError, setMenuError] = useState(null)

  useEffect(() => {
    const unsubscribe = subscribeToAllMenuItems(
      (items) => {
        setMenuItems(items)
        setMenuLoading(false)
      },
      (err) => {
        setMenuError(err.message)
        setMenuLoading(false)
      },
    )
    return unsubscribe
  }, [])

  if (vendorsLoading || menuLoading) return <Loading />
  if (vendorsError || menuError) return <ErrorMessage message={vendorsError || menuError} onRetry={reload} />

  const allItems = menuItems.map((item) => ({
    ...item,
    vendorName: vendors.find((v) => v.id === item.vendorId)?.name || '',
  }))
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
