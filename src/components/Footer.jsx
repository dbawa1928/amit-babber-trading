import { FaHeart, FaEnvelope, FaPhone, FaInstagram, FaGlobe, FaArrowUp } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Amit Babber Trading & Co.</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Simplifying mandi crop transactions with technology. Trusted by commission agents and farmers across India.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="https://instagram.com/codexyralabs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition" aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
              <a href="https://codexyralabs.site" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition" aria-label="Website">
                <FaGlobe size={20} />
              </a>
              <a href="mailto:codexyra.connect@gmail.com" className="text-gray-400 hover:text-white transition" aria-label="Email">
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <FaPhone className="text-primary" size={14} />
                <a href="tel:6329520582" className="hover:text-white transition">+91 63295 20582</a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-primary" size={14} />
                <a href="mailto:codexyra.connect@gmail.com" className="hover:text-white transition break-all">codexyra.connect@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <FaGlobe className="text-primary" size={14} />
                <a href="https://codexyralabs.site" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">codexyralabs.site</a>
              </li>
            </ul>
          </div>

          {/* Additional Info & Back to Top */}
          <div className="flex flex-col items-start md:items-end">
            <div className="text-sm text-gray-400 mb-4 text-left md:text-right">
              <p>Secure & Reliable</p>
              <p>Instant Calculations</p>
              <p>24/7 Support</p>
            </div>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg transition text-sm"
            >
              <FaArrowUp size={14} /> Back to Top
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-5 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© {currentYear} Amit Babber Trading and Company. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:text-white transition">Privacy Policy</a>
            <span>•</span>
            <a href="/contact" className="hover:text-white transition">Contact Us</a>
          </div>
          <p className="flex items-center gap-1">
            Built with <FaHeart className="text-red-500 text-xs" /> by{' '}
            <a href="https://codexyralabs.site" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              CodeXyraLabs
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer