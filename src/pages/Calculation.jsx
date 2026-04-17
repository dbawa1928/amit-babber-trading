import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BackButton from '../components/BackButton'
import ReceiptModal from '../components/ReceiptModal'
import { supabase } from '../supabaseClient'
import { useToast } from '../contexts/ToastContext'
import { useLanguage } from '../contexts/LanguageContext'
import { useAutoSave } from '../hooks/useAutoSave'
import { FaCalculator, FaFileInvoice, FaFileAlt, FaPlus } from 'react-icons/fa'

const Calculation = () => {
  const { showToast } = useToast()
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    crop: 'Wheat', farmerName: '', phone: '', date: new Date().toISOString().split('T')[0],
    quantity: '', rate: 2585, commission: 2.5, labour: 40, transport: 15
  })
  const [calculationResult, setCalculationResult] = useState(null)
  const [showIModal, setShowIModal] = useState(false)
  const [showJModal, setShowJModal] = useState(false)
  const [lastSavedHash, setLastSavedHash] = useState(null)
  const { loadDraft, clearDraft } = useAutoSave('calc_draft', formData)

  useEffect(() => { const draft = loadDraft(); if (draft?.farmerName) setFormData(draft) }, [])

  const cropDefaults = { Wheat: { rate: 2585, commission: 2.5, labour: 40, transport: 15 }, Paddy: { rate: 2370, commission: 2.5, labour: 40, transport: 15 }, Basmati: { rate: 4000, commission: 2.5, labour: 40, transport: 15 } }
  useEffect(() => { const d = cropDefaults[formData.crop]; setFormData(prev => ({ ...prev, rate: d.rate, commission: d.commission, labour: d.labour, transport: d.transport })) }, [formData.crop])

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const generateHash = (data) => `${data.farmerName}|${data.crop}|${data.date}|${data.quantity}|${data.rate}|${data.commission}|${data.labour}|${data.transport}`

  const calculateAndSave = async () => {
    if (!formData.farmerName.trim()) return showToast('Enter farmer name', 'error')
    const qty = parseFloat(formData.quantity) || 0
    if (qty <= 0) return showToast('Enter valid quantity', 'error')
    const rate = parseFloat(formData.rate) || 0
    const commissionPercent = parseFloat(formData.commission) || 0
    const labourCost = parseFloat(formData.labour) || 0
    const transportCost = parseFloat(formData.transport) || 0
    const totalAmount = qty * rate
    const commissionAmount = (totalAmount * commissionPercent) / 100
    const labourTransport = labourCost + transportCost
    const totalExpenses = commissionAmount + labourTransport
    const netAmount = totalAmount - totalExpenses
    const result = { farmerName: formData.farmerName, quantity: qty, rate, totalAmount, commissionAmount, labourTransport, totalExpenses, netAmount }
    setCalculationResult(result)
    const currentHash = generateHash(formData)
    if (lastSavedHash === currentHash) return showToast('Duplicate transaction not saved', 'error')
    const record = { farmer_name: formData.farmerName, phone: formData.phone, crop: formData.crop, date: formData.date, quantity: qty, rate, commission: parseFloat(formData.commission), labour: labourCost, transport: transportCost, total_amount: totalAmount, net_amount: netAmount, payment_status: 'unpaid' }
    const { error } = await supabase.from('transactions').insert([record])
    if (error) showToast('Error saving', 'error')
    else { showToast('Saved!', 'success'); setLastSavedHash(currentHash); clearDraft() }
  }

  const resetForm = () => {
    setFormData({ crop: 'Wheat', farmerName: '', phone: '', date: new Date().toISOString().split('T')[0], quantity: '', rate: 2585, commission: 2.5, labour: 40, transport: 15 })
    setCalculationResult(null); clearDraft(); showToast('New transaction ready', 'success')
  }

  const transactionData = { ...formData, ...calculationResult }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar />
      <BackButton />
      <main className="flex-grow max-w-5xl mx-auto px-4 py-8 w-full">
        <h2 className="text-3xl font-bold text-primary mb-6">{t('calculation')}</h2>
        <div className="card p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div><label>{t('cropType')}</label><select name="crop" value={formData.crop} onChange={handleChange} className="input-field"><option>Wheat</option><option>Paddy</option><option>Basmati</option></select></div>
            <div><label>{t('farmerName')} *</label><input name="farmerName" value={formData.farmerName} onChange={handleChange} className="input-field" /></div>
            <div><label>{t('phone')}</label><input name="phone" value={formData.phone} onChange={handleChange} className="input-field" /></div>
            <div><label>{t('date')}</label><input type="date" name="date" value={formData.date} onChange={handleChange} className="input-field" /></div>
            <div><label>{t('quantity')}</label><input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="input-field" step="0.01" /></div>
            <div><label>{t('rate')}</label><input type="number" name="rate" value={formData.rate} onChange={handleChange} className="input-field" step="0.01" /></div>
            <div><label>{t('commission')}</label><input type="number" name="commission" value={formData.commission} onChange={handleChange} className="input-field" step="0.1" /></div>
            <div><label>{t('labour')}</label><input type="number" name="labour" value={formData.labour} onChange={handleChange} className="input-field" step="0.01" /></div>
            <div><label>{t('transport')}</label><input type="number" name="transport" value={formData.transport} onChange={handleChange} className="input-field" step="0.01" /></div>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-4"><button onClick={calculateAndSave} className="btn-primary flex-1"><FaCalculator className="inline mr-2" /> Calculate & Save</button><button onClick={resetForm} className="btn-secondary flex-1"><FaPlus className="inline mr-2" /> New Transaction</button></div>
        </div>
        {calculationResult && (
          <div className="card p-6 mt-8"><h3 className="text-xl font-bold text-primary mb-4">📋 {t('netPayable')}</h3><div className="space-y-2"><div className="flex justify-between"><span>{t('farmerName')}:</span><span>{calculationResult.farmerName}</span></div><div className="flex justify-between"><span>{t('quantity')}:</span><span>{calculationResult.quantity} Qtls</span></div><div className="flex justify-between"><span>Total Amount:</span><span>₹{calculationResult.totalAmount.toFixed(2)}</span></div><div className="flex justify-between"><span>Commission:</span><span>₹{calculationResult.commissionAmount.toFixed(2)}</span></div><div className="flex justify-between"><span>Labour+Transport:</span><span>₹{calculationResult.labourTransport.toFixed(2)}</span></div><div className="flex justify-between border-t pt-2 font-bold text-primary text-lg"><span>{t('netPayable')}:</span><span>₹{calculationResult.netAmount.toFixed(2)}</span></div></div><div className="flex flex-col sm:flex-row gap-4 mt-6"><button onClick={() => setShowIModal(true)} className="bg-green-600 text-white px-5 py-2 rounded-xl flex items-center justify-center gap-2"><FaFileInvoice /> {t('generateIForm')}</button><button onClick={() => setShowJModal(true)} className="bg-orange-600 text-white px-5 py-2 rounded-xl flex items-center justify-center gap-2"><FaFileAlt /> {t('generateJForm')}</button></div></div>
        )}
      </main>
      <ReceiptModal isOpen={showIModal} onClose={() => setShowIModal(false)} type="I" data={transactionData} />
      <ReceiptModal isOpen={showJModal} onClose={() => setShowJModal(false)} type="J" data={transactionData} />
      <Footer />
    </div>
  )
}
export default Calculation