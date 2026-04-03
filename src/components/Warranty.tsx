import { useState } from 'react'

interface Warranty {
  id: number
  customerName: string
  customerEmail: string
  vehicleMakeModel: string
  vin: string
  purchaseDate: string
  warrantyType: 'Basic' | 'Extended' | 'Premium'
  warrantyTerm: number
  mileageLimit: number
  coverage: string
  cost: string
  expiryDate: string
  claimsCount: number
  status: 'Active' | 'Expired' | 'Voided'
}

export default function Warranty() {
  const [warranties, setWarranties] = useState<Warranty[]>([
    { id: 1, customerName: 'John Smith', customerEmail: 'john@example.com', vehicleMakeModel: 'Tesla Model 3', vin: 'TSL2024001', purchaseDate: '2024-02-15', warrantyType: 'Extended', warrantyTerm: 5, mileageLimit: 100000, coverage: 'Full coverage including battery', cost: '$2,500', expiryDate: '2029-02-15', claimsCount: 0, status: 'Active' },
    { id: 2, customerName: 'Sarah Johnson', customerEmail: 'sarah@example.com', vehicleMakeModel: 'BMW X5', vin: 'BMW2023001', purchaseDate: '2023-12-20', warrantyType: 'Premium', warrantyTerm: 7, mileageLimit: 150000, coverage: 'All components and parts', cost: '$3,200', expiryDate: '2030-12-20', claimsCount: 1, status: 'Active' },
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    vehicleMakeModel: '',
    vin: '',
    purchaseDate: '',
    warrantyType: 'Basic' as const,
    warrantyTerm: 3,
    mileageLimit: 100000,
    coverage: '',
    cost: '',
    status: 'Active' as const,
  })

  const calculateExpiry = (purchaseDate: string, term: number) => {
    const date = new Date(purchaseDate)
    date.setFullYear(date.getFullYear() + term)
    return date.toISOString().split('T')[0]
  }

  const handleAddWarranty = (e: React.FormEvent) => {
    e.preventDefault()
    const expiryDate = calculateExpiry(formData.purchaseDate, formData.warrantyTerm)
    const newWarranty: Warranty = {
      id: Math.max(...warranties.map(w => w.id), 0) + 1,
      ...formData,
      expiryDate,
      claimsCount: 0,
    }
    setWarranties([...warranties, newWarranty])
    setFormData({
      customerName: '', customerEmail: '', vehicleMakeModel: '', vin: '',
      purchaseDate: '', warrantyType: 'Basic', warrantyTerm: 3, mileageLimit: 100000,
      coverage: '', cost: '', status: 'Active'
    })
    setShowForm(false)
  }

  const handleDelete = (id: number) => {
    setWarranties(warranties.filter(w => w.id !== id))
  }

  const handleStatusChange = (id: number, newStatus: Warranty['status']) => {
    setWarranties(warranties.map(w => w.id === id ? { ...w, status: newStatus } : w))
  }

  const activeCount = warranties.filter(w => w.status === 'Active').length
  const expiredCount = warranties.filter(w => w.status === 'Expired').length
  const totalClaims = warranties.reduce((sum, w) => sum + w.claimsCount, 0)

  return (
    <div>
      <h2>Warranty Management</h2>

      <div className="stats">
        <div className="stat-card">
          <h3>Total Warranties</h3>
          <p className="value">{warranties.length}</p>
          <p className="change">Active policies</p>
        </div>
        <div className="stat-card variant-1">
          <h3>Active Warranties</h3>
          <p className="value">{activeCount}</p>
          <p className="change">Currently valid</p>
        </div>
        <div className="stat-card variant-2">
          <h3>Expired</h3>
          <p className="value">{expiredCount}</p>
          <p className="change">Ended warranties</p>
        </div>
        <div className="stat-card variant-3">
          <h3>Total Claims</h3>
          <p className="value">{totalClaims}</p>
          <p className="change">Filed claims</p>
        </div>
      </div>

      <div className="action-bar">
        <button className="btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ New Warranty'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h3>Register Warranty</h3>
          <form onSubmit={handleAddWarranty}>
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
                <label>Email *</label>
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
                  placeholder="Tesla Model 3"
                  required
                />
              </div>
              <div className="form-group">
                <label>VIN *</label>
                <input
                  type="text"
                  value={formData.vin}
                  onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
                  placeholder="Vehicle Identification Number"
                  required
                />
              </div>
              <div className="form-group">
                <label>Purchase Date *</label>
                <input
                  type="date"
                  value={formData.purchaseDate}
                  onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Warranty Type *</label>
                <select
                  value={formData.warrantyType}
                  onChange={(e) => setFormData({ ...formData, warrantyType: e.target.value as any })}
                >
                  <option>Basic</option>
                  <option>Extended</option>
                  <option>Premium</option>
                </select>
              </div>
              <div className="form-group">
                <label>Warranty Term (Years)</label>
                <input
                  type="number"
                  value={formData.warrantyTerm}
                  onChange={(e) => setFormData({ ...formData, warrantyTerm: parseInt(e.target.value) })}
                />
              </div>
              <div className="form-group">
                <label>Mileage Limit (km)</label>
                <input
                  type="number"
                  value={formData.mileageLimit}
                  onChange={(e) => setFormData({ ...formData, mileageLimit: parseInt(e.target.value) })}
                />
              </div>
              <div className="form-group">
                <label>Cost</label>
                <input
                  type="text"
                  value={formData.cost}
                  onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                  placeholder="$2,500"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Coverage Details</label>
              <textarea
                value={formData.coverage}
                onChange={(e) => setFormData({ ...formData, coverage: e.target.value })}
                placeholder="Describe what's covered under this warranty"
                style={{ minHeight: '100px' }}
              />
            </div>
            <button type="submit" className="btn btn-success">Register Warranty</button>
          </form>
        </div>
      )}

      <div className="card">
        <h3>All Warranties ({warranties.length})</h3>
        {warranties.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🛡️</div>
            <h3>No Warranties Registered</h3>
            <p>Register warranty policies for sold vehicles</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Type</th>
                <th>Term</th>
                <th>Mileage Limit</th>
                <th>Cost</th>
                <th>Expiry Date</th>
                <th>Claims</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {warranties.map(warranty => (
                <tr key={warranty.id}>
                  <td><strong>{warranty.customerName}</strong></td>
                  <td>{warranty.vehicleMakeModel}</td>
                  <td>{warranty.warrantyType}</td>
                  <td>{warranty.warrantyTerm} years</td>
                  <td>{warranty.mileageLimit.toLocaleString()} km</td>
                  <td>{warranty.cost}</td>
                  <td>{warranty.expiryDate}</td>
                  <td>{warranty.claimsCount}</td>
                  <td>
                    <select
                      value={warranty.status}
                      onChange={(e) => handleStatusChange(warranty.id, e.target.value as Warranty['status'])}
                      style={{
                        padding: '6px',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        backgroundColor: 'white'
                      }}
                    >
                      <option>Active</option>
                      <option>Expired</option>
                      <option>Voided</option>
                    </select>
                  </td>
                  <td>
                    <button className="btn btn-danger btn-small" onClick={() => handleDelete(warranty.id)}>Delete</button>
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
