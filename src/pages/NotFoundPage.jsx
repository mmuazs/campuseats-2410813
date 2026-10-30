import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <div className="box">
      <h2>404</h2>
      <p>No page here.</p>
      <p><Link to="/">Return to home</Link></p>
    </div>
  )
}

export default NotFoundPage