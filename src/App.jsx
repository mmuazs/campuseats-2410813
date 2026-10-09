import { useState } from 'react'
import VendorCard from './components/VendorCard.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import MenuList from './components/MenuList.jsx'
import vendors from './data/vendors.js'

function handleAddToCart(item) {
    setCart((prevCart) => [...prevCart, item]) // a New array, never cart.push()
  }

function App() {
  const [selectedVendorId, setSelectedVendorId] = useState(vendors[0].id)
  const selectedVendor = vendors.find((v) => v.id === selectedVendorId)
  const [cart, setCart] = useState([])

  function handleAddToCart(item) {
    setCart((prevCart) => [...prevCart, item]) // a New array, never cart.push()
  }

  return (
    <>
      <Header cartCount={cart.length} />
      <main className="container">
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
        <section>
          <h2 className="section-title">Menu: {selectedVendor.name}</h2>
          <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App