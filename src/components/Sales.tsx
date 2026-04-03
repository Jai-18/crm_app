import { useState } from 'react'

interface Sale {
  id: number
  customerName: string
  customerEmail: string
  vehicleMakeModel: string
  salePrice: string
  downPayment: string
  financingAmount: string
  term: number
  interestRate: number
  monthlyPayment: string
  saleDate: string
  status: 'Completed' | 'Pending' | 'Negotiating'
  salesPerson: string
}

type SaleFormData = Omit<Sale, 'id' | 'financingAmount' | 'monthlyPayment' | 'saleDate'>

export default function Sales() {
  const [sales, setSales] = useState<Sale[]>([
    { id: 1, customerName: 'John Smith', customerEmail: 'john@example.com', vehicleMakeModel: 'Tesla Model 3', salePrice: '$52,000', downPayment: '$10,000', financingAmount: '$42,000', term: 60, interestRate: 4.5, monthlyPayment: '$769', saleDate: '2026-02-14', status: 'Completed', salesPerson: 'Alex Thompson' },
    { id: 2, customerName: 'Sarah Johnson', customerEmail: 'sarah@example.com', vehicleMakeModel: 'BMW X5', salePrice: '$68,500', downPayment: '$15,000', financingAmount: '$53,500', term: 72, interestRate: 5.2, monthlyPayment: '$833', saleDate: '2026-02-13', status: 'Completed', salesPerson: 'Mike Chen' },
    { id: 3, customerName: 'Robert Wilson', customerEmail: 'robert@example.com', vehicleMakeModel: 'Honda Civic', salePrice: '$28,900', downPayment: '$8,000', financingAmount: '$20,900', term: 48, interestRate: 4.8, monthlyPayment: '$476', saleDate: '2026-02-10', status: 'Pending', salesPerson: 'Emma Davis' },
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<SaleFormData>({ 
    customerName: '', 
    customerEmail: '',
    vehicleMakeModel: '',
    salePrice: '',
    downPayment: '',
    term: 60,
    interestRate: 4.5,
    salesPerson: '',
    status: 'Pending',
  })

  const calculateFinancing = () => {
    const sale = parseFloat(formData.salePrice.replace(/[$,]/g, '')) || 0
    const down = parseFloat(formData.downPayment.replace(/[$,]/g, '')) || 0
    const financing = sale - down
    const monthlyRate = (formData.interestRate / 100) / 12
    const monthlyPayment = financing * (monthlyRate * Math.pow(1 + monthlyRate, formData.term)) / (Math.pow(1 + monthlyRate, formData.term) - 1)
    return { financing: financing.toFixed(2), monthly: monthlyPayment.toFixed(2) }
  }

  const handleAddSale = (e: React.FormEvent) => {
    e.preventDefault()
    const calc = calculateFinancing()
    const newSale: Sale = {
      id: Math.max(...sales.map(s => s.id), 0) + 1,
      ...formData,
      financingAmount: `$${calc.financing}`,
      monthlyPayment: `$${calc.monthly}`,
      saleDate: new Date().toISOString().split('T')[0],
    }
    setSales([...sales, newSale])
    setFormData({ 
      customerName: '', customerEmail: '', vehicleMakeModel: '', salePrice: '', 
      downPayment: '', term: 60, interestRate: 4.5, salesPerson: '', status: 'Pending'
    })
    setShowForm(false)
  }

  const handleDelete = (id: number) => {
    setSales(sales.filter(s => s.id !== id))
  }

  const totalRevenue = sales
    .filter(s => s.status === 'Completed')
    .reduce((sum, s) => sum + parseFloat(s.salePrice.replace(/[$,]/g, '')), 0)

  return (
    <div>
      <h2>Sales Management</h2>

      <div className="stats">
        <div className="stat-card">
          <h3>Total Sales This Month</h3>
          <p className="value">{sales.filter(s => s.status === 'Completed').length}</p>
          <p className="change">✓ {sales.filter(s => s.status === 'Pending').length} pending</p>
        </div>
        <div className="stat-card variant-2">
          <h3>Total Revenue</h3>
          <p className="value">${(totalRevenue / 1000).toFixed(0)}K</p>
          <p className="change">From {sales.filter(s => s.status === 'Completed').length} completed sales</p>
        </div>
        <div className="stat-card variant-1">
          <h3>Average Sale Price</h3>
          <p className="value">${(totalRevenue / (sales.filter(s => s.status === 'Completed').length || 1)).toLocaleString('en-US', {maximumFractionDigits: 0})}</p>
          <p className="change">Excluding pending deals</p>
        </div>
      </div>

      <div className="action-bar">
        <button className="btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ New Sale'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h3>Record New Sale</h3>
          <form onSubmit={handleAddSale}>
            <div className="grid-2">
              <div className="form-group">
                <label>Customer Name *</label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="form-group">
                <label>Customer Email *</label>
                <input
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div className="form-group">
                <label>Vehicle (Make & Model) *</label>
                <input
                  type="text"
                  value={formData.vehicleMakeModel}
                  onChange={(e) => setFormData({ ...formData, vehicleMakeModel: e.target.value })}
                  placeholder="e.g., Tesla Model 3"
                  required
                />
              </div>
              <div className="form-group">
                <label>Sale Price *</label>
                <input
                  type="text"
                  value={formData.salePrice}
                  onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                  placeholder="$52,000"
                  required
                />
              </div>
              <div className="form-group">
                <label>Down Payment *</label>
                <input
                  type="text"
                  value={formData.downPayment}
                  onChange={(e) => setFormData({ ...formData, downPayment: e.target.value })}
                  placeholder="$10,000"
                  required
                />
              </div>
              <div className="form-group">
                <label>Financing Term (months)</label>
                <input
                  type="number"
                  value={formData.term}
                  onChange={(e) => setFormData({ ...formData, term: parseInt(e.target.value) })}
                />
              </div>
              <div className="form-group">
                <label>Interest Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.interestRate}
                  onChange={(e) => setFormData({ ...formData, interestRate: parseFloat(e.target.value) })}
                />
              </div>
              <div className="form-group">
                <label>Sales Person *</label>
                <input
                  type="text"
                  value={formData.salesPerson}
                  onChange={(e) => setFormData({ ...formData, salesPerson: e.target.value })}
                  placeholder="e.g., Alex Thompson"
                  required
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as SaleFormData['status'] })}
                >
                  <option>Pending</option>
                  <option>Negotiating</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-success">Record Sale</button>
          </form>
        </div>
      )}

      <div className="card">
        <h3>Sales Records ({sales.length})</h3>
        {sales.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">💰</div>
            <h3>No Sales Yet</h3>
            <p>Record your first sale to track revenue and commissions</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Sale Price</th>
                <th>Down Payment</th>
                <th>Financing</th>
                <th>Monthly Payment</th>
                <th>Sales Person</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sales.map(sale => (
                <tr key={sale.id}>
                  <td><strong>{sale.customerName}</strong></td>
                  <td>{sale.vehicleMakeModel}</td>
                  <td><strong>{sale.salePrice}</strong></td>
                  <td>{sale.downPayment}</td>
                  <td>{sale.financingAmount}</td>
                  <td>{sale.monthlyPayment}</td>
                  <td>{sale.salesPerson}</td>
                  <td>{sale.saleDate}</td>
                  <td>
                    <span className={`status-badge status-${sale.status.toLowerCase()}`}>
                      {sale.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-danger btn-small" onClick={() => handleDelete(sale.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
