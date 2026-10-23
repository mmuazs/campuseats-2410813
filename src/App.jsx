import { useState, useEffect } from 'react'
import VendorCard from './components/VendorCard.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import MenuList from './components/MenuList.jsx'
import CartPage from './components/CartPage.jsx'
import { Loading, ErrorMessage } from './components/Status.jsx'

function App() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)
  
  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const [cart, setCart] = useState([])
  const [view, setView] = useState('menu') // 'menu' | 'cart' | 'done'
  const [lastOrder, setLastOrder] = useState(null)

  // B6: Digit 3 Feature State
  const [favourites, setFavourites] = useState([])
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetch('/api/vendors.json', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setVendors(data)
        if (data.length > 0) setSelectedVendorId(data[0].id)
        setLoading(false)
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError(err.message)
        setLoading(false)
      })

    return () => controller.abort()
  }, [reloadKey])

  const selectedVendor = vendors.find((v) => v.id === selectedVendorId)
  
  // Calculate total quantity dynamically
  const cartCount = cart.reduce((total, line) => total + line.qty, 0)

  function handleAddToCart(item) {
    setCart((prev) => {
      const existing = prev.find((line) => line.item.id === item.id)
      if (existing) {
        return prev.map((line) => 
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
        )
      }
      return [...prev, { item, qty: 1 }]
    })
  }

  function handleChangeQty(itemId, delta) {
    setCart((prev) => 
      prev.map((line) => 
        line.item.id === itemId ? { ...line, qty: line.qty + delta } : line
      ).filter((line) => line.qty > 0)
    )
  }

  function handleRemove(itemId) {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId))
  }

  function handlePlaceOrder(details) {
    const total = cart.reduce((sum, line) => sum + (line.item.price * line.qty), 0)
    setLastOrder({ ...details, total })
    setCart([])
    setView('done')
  }

  function toggleFavourite(itemId) {
    setFavourites((prev) => 
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    )
  }

  let content
  if (view === 'cart') {
    content = (
      <CartPage 
        cart={cart} 
        onChangeQty={handleChangeQty} 
        onRemove={handleRemove} 
        onPlaceOrder={handlePlaceOrder} 
      />
    )
  } else if (view === 'done') {
    content = (
      <div className="card">
        <h2>Order placed!</h2>
        <p>Thank you, {lastOrder.name}.</p>
        <p>Pick up at your Mahallah ({lastOrder.mahallah}) at <strong>{lastOrder.pickupTime}</strong>.</p>
        <p>Total paid: RM {lastOrder.total.toFixed(2)}</p>
        <button className="btn" onClick={() => setView('menu')}>Back to Menus</button>
      </div>
    )
  } else if (loading) {
    content = <Loading />
  } else if (error) {
    content = <ErrorMessage message={error} onRetry={() => setReloadKey((k) => k + 1)} />
  } else {
    
    // B6: Filter menu based on Favourites toggle
    let displayedMenu = selectedVendor ? selectedVendor.menu : []
    if (showFavouritesOnly) {
      displayedMenu = displayedMenu.filter(item => favourites.includes(item.id))
    }

    content = (
      <>
        <section>
          <h2 className="section-title">Choose a Vendor</h2>
          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>
        {selectedVendor && (
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 className="section-title">Menu: {selectedVendor.name}</h2>
              <label>
                <input 
                  type="checkbox" 
                  checked={showFavouritesOnly} 
                  onChange={(e) => setShowFavouritesOnly(e.target.checked)} 
                />
                {' '}Favourites only
              </label>
            </div>
            {displayedMenu.length > 0 ? (
               <MenuList 
                 items={displayedMenu} 
                 onAdd={handleAddToCart} 
                 favourites={favourites}
                 onToggleFavourite={toggleFavourite}
               />
            ) : (
              <p className="muted">No items match your filter.</p>
            )}
          </section>
        )}
      </>
    )
  }

  return (
    <>
      <Header cartCount={cartCount} onShowMenu={() => setView('menu')} onShowCart={() => setView('cart')} />
      <main className="container">
        {content}
      </main>
      <Footer />
    </>
  )
}

export default App