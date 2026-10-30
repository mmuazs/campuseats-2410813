import { useParams, Link } from 'react-router'
import { useVendors } from '../hooks/useVendors.js'
import MenuList from '../components/MenuList.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

function VendorPage() {
  const { id } = useParams()
  const { vendors, loading, error, reload } = useVendors()

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  const vendor = vendors.find((v) => v.id === id)

  if (!vendor) {
    return (
      <div className="box">
        <h2>Vendor not found</h2>
        <p>We couldn't find a vendor with that ID.</p>
        <p><Link to="/">Return to vendors</Link></p>
      </div>
    )
  }

  return (
    <section>
      <p><Link to="/">← All vendors</Link></p>
      <h2 className="section-title">{vendor.name}</h2>
      <p className="muted">{vendor.location} &middot; Open: {vendor.openHours}</p>
      <MenuList items={vendor.menu} />
    </section>
  )
}

export default VendorPage