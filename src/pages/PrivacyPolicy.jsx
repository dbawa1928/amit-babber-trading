import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BackButton from '../components/BackButton'

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar />
      <BackButton />
      <main className="flex-grow max-w-4xl mx-auto px-4 py-8 w-full">
        <div className="card p-6 md:p-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Privacy Policy</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Last updated: January 2025 | Effective: January 2025</p>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>At Amit Babber Trading Company, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we handle your information.</p>
            <h3 className="font-semibold text-primary mt-4">1. Information We Collect</h3>
            <p>We collect transaction data including farmer names, phone numbers, crop details, transaction amounts, and payment status. This data is provided by you when using our calculation and history features.</p>
            <h3 className="font-semibold text-primary mt-4">2. How We Use Your Data</h3>
            <p>Your data is used solely for: generating transaction forms (I Form & J Form), maintaining transaction history, providing calculation services, and generating analytics reports. We do not sell or share your personal information with third parties for marketing purposes.</p>
            <h3 className="font-semibold text-primary mt-4">3. Data Storage & Security</h3>
            <p>All data is stored securely using Supabase (a cloud database service). We implement industry-standard encryption for data transmission (HTTPS) and storage. Access to your data is restricted to authenticated users of this application.</p>
            <h3 className="font-semibold text-primary mt-4">4. Data Retention</h3>
            <p>We retain transaction records indefinitely unless you request deletion. You can delete individual records via the history page (contact support for bulk deletion).</p>
            <h3 className="font-semibold text-primary mt-4">5. Your Rights</h3>
            <p>You have the right to access, correct, or delete your transaction data. To exercise these rights, contact us at codexyra.connect@gmail.com. We will respond within 15 days.</p>
            <h3 className="font-semibold text-primary mt-4">6. Cookies & Tracking</h3>
            <p>This app does not use cookies or any tracking technologies. No analytics tools (Google Analytics, etc.) are embedded.</p>
            <h3 className="font-semibold text-primary mt-4">7. Children's Privacy</h3>
            <p>This app is not intended for persons under 18 years of age. We do not knowingly collect data from children.</p>
            <h3 className="font-semibold text-primary mt-4">8. Changes to This Policy</h3>
            <p>We may update this policy occasionally. Any changes will be posted on this page with an updated revision date.</p>
            <h3 className="font-semibold text-primary mt-4">9. Contact Us</h3>
            <p>If you have questions about this privacy policy, please contact: <strong>codexyra.connect@gmail.com</strong> or call <strong>6329520582</strong>.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
export default PrivacyPolicy