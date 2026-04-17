import { useLanguage } from '../contexts/LanguageContext'
import { FaGlobe } from 'react-icons/fa'

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage()
  return (
    <div className="relative group">
      <button className="flex items-center gap-1 bg-white/10 text-white px-3 py-1.5 rounded-lg text-sm font-medium">
        <FaGlobe /> {language === 'en' ? 'EN' : language === 'hi' ? 'हिंदी' : 'ਪੰਜਾਬੀ'}
      </button>
      <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hidden group-hover:block z-20">
        <button onClick={() => changeLanguage('en')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">English</button>
        <button onClick={() => changeLanguage('hi')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">हिंदी</button>
        <button onClick={() => changeLanguage('pa')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">ਪੰਜਾਬੀ</button>
      </div>
    </div>
  )
}
export default LanguageSwitcher