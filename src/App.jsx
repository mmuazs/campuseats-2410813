import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import MenuList from './components/MenuList.jsx'
import vendors from './data/vendors.js'

function App() {
  const selectedVendor = vendors[0]

  return (
    <>
      <Header />
      <main className="container">
        <section>
          <h2 className="section-title">Menu: {selectedVendor.name}</h2>
          <MenuList items={selectedVendor.menu} />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App