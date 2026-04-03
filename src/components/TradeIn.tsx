import { useState } from 'react'

interface TradeInRequest {
  id: number
  customerName: string
  customerPhone: string
  vehicleMake: string
  vehicleModel: string
  vehicleYear: number
  mileage: number
  condition: 'Excellent' | 'Good' | 'Fair' | 'Poor'
  estimatedValue: string
  purpose: 'Upgrade' | 'Downgrade' | 'Switch Brand'
  status: 'Submitted' | 'Appraised' | 'Negotiating' | 'Accepted' | 'Rejected'
  submissionDate: string
}

export default function TradeIn() {
  const [requests, setRequests] = useState<TradeInRequest[]>([
    { id: 1, customerName: 'John Smith', customerPhone: '555-0301', vehicleMake: 'Honda', vehicleModel: 'Civic', vehicleYear: 2020, mileage: 35600, condition: 'Good', estimatedValue: '$18,500', purpose: 'Upgrade', status: 'Appraised', submissionDate: '2026-02-10' },
    { id: 2, customerName: 'Sarah Johnson', customerPhone: '555-0302', vehicleMake: 'Toyota', vehicleModel: 'Camry', vehicleYear: 2019, mileage: 52000, condition: 'Fair', estimatedValue: '$16,200', purpose: 'Switch Brand', status: 'Negotiating', submissionDate: '2026-02-12' },
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: 2026,
    mileage: 0,
    condition: 'Good' as const,
    estimatedValue: '',
    purpose: 'Upgrade' as const,
    status: 'Submitted' as const,
  })

  const handleAddRequest = (e: React.FormEvent) => {
    e.preventDefault()
    const newRequest: TradeInRequest = {
      id: Math.max(...requests.map(r => r.id), 0) + 1,
      ...formData,
      submissionDate: new Date().toISOString().split('T')[0],
    }
    setRequests([...requests, newRequest])
    setFormData({
      customerName: '', customerPhone: '', vehicleMake: '', vehicleModel: '',
      vehicleYear: 2026, mileage: 0, condition: 'Good', estimatedValue: '',
      purpose: 'Upgrade', status: 'Submitted'
    })
    setShowForm(false)
  }

  const handleDelete = (id: number) => {
    setRequests(requests.filter(r => r.id !== id))
  }

  const handleStatusChange = (id: number, newStatus: TradeInRequest['status']) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus } : r))
  }

  const totalRequests = requests.length
  const appraisedCount = requests.filter(r => r.status === 'Appraised' || r.status === 'Negotiating').length
  const acceptedCount = requests.filter(r => r.status === 'Accepted').length

  return (
    <div>
      <h2>Trade-In Management</h2>

      <div className="stats">
        <div className="stat-card">
          <h3>Total Requests</h3>
          <p className="value">{totalRequests}</p>
          <p className="change">Active trade-in requests</p>
        </div>
        <div className="stat-card variant-1">
          <h3>Under Appraisal</h3>
          <p className="value">{appraisedCount}</p>
          <p className="change">Being evaluated</p>
        </div>
        <div className="stat-card variant-2">
          <h3>Accepted</h3>
          <p className="value">{acceptedCount}</p>
          <p className="change">Ready for trade</p>
        </div>
      </div>

      <div className="action-bar">
        <button className="btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ New Trade-In Request'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h3>Submit Trade-In Request</h3>
          <form onSubmit={handleAddRequest}>
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
                <label>Phone *</label>
                <input
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                  placeholder="555-0300"
                  required
                />
              </div>
              <div className="form-group">
                <label>Vehicle Make *</label>
                <input
                  type="text"
                  value={formData.vehicleMake}
                  onChange={(e) => setFormData({ ...formData, vehicleMake: e.target.value })}
                  placeholder="Honda, Toyota, Ford, etc."
                  required
                />
              </div>
              <div className="form-group">
                <label>Vehicle Model *</label>
                <input
                  type="text"
                  value={formData.vehicleModel}
                  onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                  placeholder="Civic, Camry, Mustang"
                  required
                />
              </div>
              <div className="form-group">
                <label>Year *</label>
                <input
                  type="number"
                  value={formData.vehicleYear}
                  onChange={(e) => setFormData({ ...formData, vehicleYear: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Mileage (km)</label>
                <input
                  type="number"
                  value={formData.mileage}
                  onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) })}
                />
              </div>
              <div className="form-group">
                <label>Condition</label>
                <select
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value as any })}
                >
                  <option>Excellent</option>
                  <option>Good</option>
                  <option>Fair</option>
                  <option>Poor</option>
                </select>
              </div>
              <div className="form-group">
                <label>Estimated Value</label>
                <input
                  type="text"
                  value={formData.estimatedValue}
                  onChange={(e) => setFormData({ ...formData, estimatedValue: e.target.value })}
                  placeholder="$18,500"
                />
              </div>
              <div className="form-group">
                <label>Trade-In Purpose</label>
                <select
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value as any })}
                >
                  <option>Upgrade</option>
                  <option>Downgrade</option>
                  <option>Switch Brand</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-success">Submit Request</button>
          </form>
        </div>
      )}

      <div className="card">
        <h3>All Trade-In Requests ({requests.length})</h3>
        {requests.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔄</div>
            <h3>No Trade-In Requests</h3>
            <p>Start accepting trade-in requests from customers</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Year</th>
                <th>Mileage</th>
                <th>Condition</th>
                <th>Estimated Value</th>
                <th>Purpose</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(request => (
                <tr key={request.id}>
                  <td><strong>{request.customerName}</strong></td>
                  <td>{request.vehicleMake} {request.vehicleModel}</td>
                  <td>{request.vehicleYear}</td>
                  <td>{request.mileage.toLocaleString()} km</td>
                  <td>{request.condition}</td>
                  <td><strong>{request.estimatedValue}</strong></td>
                  <td>{request.purpose}</td>
                  <td>
                    <select
                      value={request.status}
                      onChange={(e) => handleStatusChange(request.id, e.target.value as TradeInRequest['status'])}
                      style={{
                        padding: '6px',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        backgroundColor: 'white'
                      }}
                    >
                      <option>Submitted</option>
                      <option>Appraised</option>
                      <option>Negotiating</option>
                      <option>Accepted</option>
                      <option>Rejected</option>
                    </select>
                  </td>
                  <td>
                    <button className="btn btn-danger btn-small" onClick={() => handleDelete(request.id)}>Delete</button>
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
