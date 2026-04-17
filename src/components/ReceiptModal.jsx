import { useRef } from 'react'
import html2pdf from 'html2pdf.js'
import { FaDownload, FaWhatsapp, FaPrint, FaTimes } from 'react-icons/fa'

const ReceiptModal = ({ isOpen, onClose, type, data }) => {
  const receiptRef = useRef()
  if (!isOpen) return null
  if (!data || !data.farmerName) return <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4"><div className="bg-white p-6 rounded">Error: Receipt data incomplete</div></div>

  const downloadPDF = () => {
    const opt = { margin: [0.5,0.5,0.5,0.5], filename: `${type}_Form_${data.farmerName}.pdf`, image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' } }
    html2pdf().set(opt).from(receiptRef.current).save()
  }
  const shareWhatsApp = () => {
    const msg = `*AMIT BABBER TRADING & COMPANY*\n*${type} FORM*\nFarmer: ${data.farmerName}\nCrop: ${data.crop}\nQuantity: ${data.quantity} Qtls\nRate: ₹${data.rate}/Qtl\nNet: ₹${data.netAmount?.toFixed(2)}\nThank you!`
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank')
  }
  const handlePrint = () => {
    const win = window.open('', '_blank')
    win.document.write(`<html><head><title>${type} Form</title><style>body{padding:20px}</style></head><body>${receiptRef.current.outerHTML}</body></html>`)
    win.document.close()
    win.print()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b p-4 flex justify-between">
          <h2 className="text-xl font-bold text-primary">{type} Form</h2>
          <button onClick={onClose}><FaTimes /></button>
        </div>
        <div ref={receiptRef} className="p-6">
          <div className="text-center border-b pb-4"><h1 className="text-2xl font-bold text-primary">AMIT BABBER TRADING AND COMPANY</h1><p>{type} FORM</p></div>
          <div className="grid grid-cols-2 gap-4 my-4"><div><strong>Farmer:</strong> {data.farmerName}<br/><strong>Phone:</strong> {data.phone||'N/A'}<br/><strong>Date:</strong> {data.date}</div><div><strong>Crop:</strong> {data.crop}<br/><strong>Quantity:</strong> {data.quantity} Qtls<br/><strong>Rate:</strong> ₹{data.rate}</div></div>
          <table className="w-full"><tbody><tr><td>Total</td><td>₹{data.totalAmount?.toFixed(2)}</td></tr><tr><td>Commission</td><td>₹{data.commissionAmount?.toFixed(2)}</td></tr><tr><td>Labour+Transport</td><td>₹{data.labourTransport?.toFixed(2)}</td></tr><tr className="font-bold"><td>Net Payable</td><td className="text-primary">₹{data.netAmount?.toFixed(2)}</td></tr></tbody></table>
        </div>
        <div className="sticky bottom-0 bg-white border-t p-4 flex gap-3"><button onClick={downloadPDF} className="flex-1 bg-primary text-white py-2 rounded">PDF</button><button onClick={shareWhatsApp} className="flex-1 bg-green-600 text-white py-2 rounded">WhatsApp</button><button onClick={handlePrint} className="flex-1 bg-blue-600 text-white py-2 rounded">Print</button></div>
      </div>
    </div>
  )
}
export default ReceiptModal