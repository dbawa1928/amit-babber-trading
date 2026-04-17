import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BackButton from '../components/BackButton'
import { supabase } from '../supabaseClient'
import { useToast } from '../contexts/ToastContext'
import { useLanguage } from '../contexts/LanguageContext'
import { FaSearch, FaEye, FaDownload, FaCheckCircle, FaTimesCircle, FaTrash } from 'react-icons/fa'
import { exportToCSV } from '../utils/exportToCSV'
import LoadingSpinner from '../components/LoadingSpinner'

const History = () => {
  const [transactions, setTransactions] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const { showToast } = useToast()
  const { t } = useLanguage()

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      showToast('Error fetching transactions', 'error')
    } else {
      setTransactions(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    if (search.trim() === '') {
      setFiltered(transactions)
    } else {
      const lowerSearch = search.toLowerCase()
      setFiltered(transactions.filter(t => t.farmer_name?.toLowerCase().includes(lowerSearch)))
    }
  }, [search, transactions])

  const togglePaymentStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'paid' ? 'unpaid' : 'paid'
    const { error } = await supabase
      .from('transactions')
      .update({ payment_status: newStatus })
      .eq('id', id)
    if (error) {
      showToast('Error updating status', 'error')
    } else {
      showToast(`Marked as ${newStatus}`, 'success')
      fetchTransactions()
    }
  }

  const deleteTransaction = async (id, farmerName) => {
    if (window.confirm(`Delete transaction for ${farmerName}? This action cannot be undone.`)) {
      const { error } = await supabase.from('transactions').delete().eq('id', id)
      if (error) {
        showToast('Error deleting transaction', 'error')
      } else {
        showToast('Transaction deleted', 'success')
        fetchTransactions()
      }
    }
  }

  const handleExport = () => {
    if (filtered.length === 0) {
      showToast('No data to export', 'error')
      return
    }
    const exportData = filtered.map(t => ({
      Farmer: t.farmer_name,
      Phone: t.phone || '',
      Crop: t.crop,
      Date: t.date,
      Quantity: t.quantity,
      Rate: t.rate,
      Commission: t.commission,
      Labour: t.labour,
      Transport: t.transport,
      Total: t.total_amount,
      Net: t.net_amount,
      Status: t.payment_status || 'unpaid'
    }))
    exportToCSV(exportData, `transactions_${new Date().toISOString().slice(0,10)}.csv`)
    showToast('Exported to CSV', 'success')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar />
      <BackButton />
      <main className="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <h2 className="text-3xl font-bold text-primary">{t('history')}</h2>
          <button onClick={handleExport} className="bg-green-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-green-700 transition">
            <FaDownload /> {t('exportCSV')}
          </button>
        </div>

        <div className="relative mb-6">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={t('search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-11 py-3"
          />
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500">{t('noRecords')}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map(transaction => (
              <div key={transaction.id} className="card p-5 hover:shadow-lg transition">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-primary">{transaction.farmer_name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.crop} | {transaction.date}</p>
                    <p className="text-sm">📞 {transaction.phone || 'N/A'}</p>
                    <p className="text-sm">📦 {transaction.quantity} Qtls | ₹{transaction.rate}/Qtl</p>
                    <p className="font-semibold mt-1">💰 Net: ₹{transaction.net_amount?.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => togglePaymentStatus(transaction.id, transaction.payment_status)}
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition ${
                          transaction.payment_status === 'paid'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                            : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                        }`}
                      >
                        {transaction.payment_status === 'paid' ? <FaCheckCircle /> : <FaTimesCircle />}
                        {transaction.payment_status === 'paid' ? t('paid') : t('unpaid')}
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setSelected(transaction)} className="text-primary hover:text-secondary text-xl p-2">
                      <FaEye />
                    </button>
                    <button onClick={() => deleteTransaction(transaction.id, transaction.farmer_name)} className="text-red-500 hover:text-red-700 text-xl p-2">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {selected && <TransactionModal transaction={selected} onClose={() => setSelected(null)} />}
      <Footer />
    </div>
  )
}

const TransactionModal = ({ transaction, onClose }) => {
  const { t } = useLanguage()
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b p-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-primary">Transaction Details</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        <div className="p-5 space-y-3">
          <DetailRow label={t('farmerName')} value={transaction.farmer_name} />
          <DetailRow label={t('phone')} value={transaction.phone || 'N/A'} />
          <DetailRow label={t('cropType')} value={transaction.crop} />
          <DetailRow label={t('date')} value={transaction.date} />
          <DetailRow label={t('quantity')} value={`${transaction.quantity} Qtls`} />
          <DetailRow label={t('rate')} value={`₹${transaction.rate}/Qtl`} />
          <DetailRow label={t('commission')} value={`${transaction.commission}%`} />
          <DetailRow label="Labour" value={`₹${transaction.labour}`} />
          <DetailRow label="Transport" value={`₹${transaction.transport}`} />
          <DetailRow label="Total Amount" value={`₹${transaction.total_amount?.toFixed(2)}`} />
          <DetailRow label={t('netPayable')} value={`₹${transaction.net_amount?.toFixed(2)}`} className="font-bold text-primary text-lg" />
          <DetailRow label={t('paymentStatus')} value={transaction.payment_status === 'paid' ? t('paid') : t('unpaid')} />
        </div>
      </div>
    </div>
  )
}

const DetailRow = ({ label, value, className = '' }) => (
  <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-700">
    <span className="font-medium text-gray-600 dark:text-gray-400">{label}:</span>
    <span className={className}>{value}</span>
  </div>
)

export default History
