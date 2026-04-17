import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FaCalculator, FaHistory, FaStar, FaInfoCircle, FaFileContract, FaEnvelope, FaChartLine, FaUserCog, FaUsers } from 'react-icons/fa'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'

const Home = () => {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { user } = useAuth()

  const menuItems = [
    { title: t('calculation'), icon: FaCalculator, path: '/calculation', bg: 'bg-green-500' },
    { title: t('history'), icon: FaHistory, path: '/history', bg: 'bg-blue-500' },
    { title: t('analytics'), icon: FaChartLine, path: '/analytics', bg: 'bg-indigo-500' },
    { title: t('rateUs'), icon: FaStar, path: '/rate-us', bg: 'bg-yellow-500' },
    { title: t('about'), icon: FaInfoCircle, path: '/about', bg: 'bg-purple-500' },
    { title: t('privacy'), icon: FaFileContract, path: '/privacy', bg: 'bg-gray-500' },
    { title: t('contact'), icon: FaEnvelope, path: '/contact', bg: 'bg-red-500' },
    { title: 'Profile', icon: FaUserCog, path: '/profile', bg: 'bg-teal-500' },
  ]

  // Only admin sees Manage Workers card
  if (user?.role === 'admin') {
    menuItems.push({ title: 'Manage Workers', icon: FaUsers, path: '/manage-workers', bg: 'bg-orange-500' })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-primary to-green-600 text-white py-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">AMIT BABBER TRADING COMPANY</h1>
          <p className="text-green-100 mt-3 text-lg">Mandi Crop Transaction Platform</p>
        </div>
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((item) => (
              <button
                key={item.title}
                onClick={() => navigate(item.path)}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden transform hover:-translate-y-1"
              >
                <div className={`${item.bg} p-6 flex justify-center`}>
                  <item.icon className="text-5xl text-white group-hover:scale-110 transition" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{item.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Tap to open</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
export default Home