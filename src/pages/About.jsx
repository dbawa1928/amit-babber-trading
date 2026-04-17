import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BackButton from '../components/BackButton'
import { GiFarmer, GiWheat, GiFruitTree } from 'react-icons/gi'

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar />
      <BackButton />
      <main className="flex-grow max-w-4xl mx-auto px-4 py-8 w-full">
        <div className="card p-6 md:p-8">
          <h2 className="text-2xl font-bold text-primary mb-2">Babber Trading Company</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Version 1.0.0 | Established 2026</p>
          <div className="space-y-6">
            <div><h3 className="text-xl font-semibold text-primary mb-2">Our Mission</h3><p>Babber Trading Company app is designed to simplify crop transaction calculations for mandi commission agents, farmers, and traders. We aim to digitize and streamline the traditional mandi transaction process, making it faster, transparent, and more efficient. Our mission is to empower every mandi stakeholder with technology that saves time and reduces errors.</p></div>
            <div><h3 className="text-xl font-semibold text-primary mb-2">What We Do</h3><ul className="space-y-2"><li className="flex items-center gap-2"><GiFruitTree className="text-primary" /> • Instant crop transaction calculations</li><li className="flex items-center gap-2"><GiWheat className="text-primary" /> • Generate professional I Form & J Form</li><li className="flex items-center gap-2"><GiFarmer className="text-primary" /> • Securely save transaction history</li><li>• Share receipts via WhatsApp & PDF</li><li>• Support for Wheat, Paddy, Basmati with auto-fill rates</li><li>• Payment tracking (Paid/Unpaid status)</li><li>• Analytics dashboard for business insights</li></ul></div>
            <div><h3 className="text-xl font-semibold text-primary mb-2">Why Choose Us</h3><p>Unlike traditional manual registers, our app provides instant calculations, digital record keeping, and easy sharing. No more lost paper records or calculation mistakes. All data is securely stored in the cloud and accessible from any device.</p></div>
            <div><h3 className="text-xl font-semibold text-primary mb-2">Who We Are</h3><p>Built by <span className="font-semibold">Code Xyra Labs</span> - a team of passionate developers and agri-tech enthusiasts dedicated to bringing digital solutions to India's mandi ecosystem. We understand the challenges of daily transaction recording and have crafted this tool specifically for commission agents and traders.</p></div>
            <div><h3 className="text-xl font-semibold text-primary mb-2">Contact Support</h3><p>For any queries or support, reach us at: <strong>codexyra.connect@gmail.com</strong> or call <strong>6329520582</strong>. We're here to help 24/7.</p></div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
export default About
