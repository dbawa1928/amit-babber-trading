import { useNavigate, useLocation } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

const BackButton = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Don't show on login, splash, home
  const hidePaths = ['/login', '/', '/home']
  if (hidePaths.includes(location.pathname)) return null

  return (
    <div className="sticky top-20 z-40 container mx-auto px-4 max-w-7xl">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-2 text-primary hover:text-secondary font-medium transition"
      >
        <FaArrowLeft size={18} /> Back
      </button>
    </div>
  )
}

export default BackButton