import { useState } from 'react'

interface TestDrive {
  id: number
  customerName: string
  customerPhone: string
  email: string
  vehicleMakeModel: string
  preferredDate: string
  preferredTime: string
  duration: number
  driverLicense: string
  insurance: 'Yes' | 'No'
  feedback: string
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'No-Show'
  rating: number
}

type TestDriveFormData = Omit<TestDrive, 'id' | 'feedback' | 'rating'>

export default function TestDrive() {
  const [drives, setDrives] = useState<TestDrive[]>([
    { id: 1, customerName: 'Alice Wilson', customerPhone: '555-0401', email: 'alice@example.com', vehicleMakeModel: 'Tesla Model 3', preferredDate: '2026-02-18', preferredTime: '10:00 AM', duration: 60, driverLicense: 'DL123456', insurance: 'Yes', feedback: 'Great acceleration and handling', status: 'Completed', rating: 5 },
    { id: 2, customerName: 'Bob Martinez', customerPhone: '555-0402', email: 'bob@example.com', vehicleMakeModel: 'BMW X5', preferredDate: '2026-02-20', preferredTime: '02:00 PM', duration: 45, driverLicense: 'DL123457', insurance: 'No', feedback: '', status: 'Scheduled', rating: 0 },
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<TestDriveFormData>({
    customerName: '',
    customerPhone: '',
    email: '',
    vehicleMakeModel: '',
    preferredDate: '',
    preferredTime: '',
    duration: 60,
    driverLicense: '',
    insurance: 'Yes',
    status: 'Scheduled',
  })

  const handleAddDrive = (e: React.FormEvent) => {
    e.preventDefault()
    const newDrive: TestDrive = {
      id: Math.max(...drives.map(d => d.id), 0) + 1,
      ...formData,
      feedback: '',
      rating: 0,
    }
    setDrives([...drives, newDrive])
    setFormData({
      customerName: '', customerPhone: '', email: '', vehicleMakeModel: '',
      preferredDate: '', preferredTime: '', duration: 60, driverLicense: '',
      insurance: 'Yes', status: 'Scheduled'
    })
    setShowForm(false)
  }

  const handleDelete = (id: number) => {
    setDrives(drives.filter(d => d.id !== id))
  }

  const handleStatusChange = (id: number, newStatus: TestDrive['status']) => {
    setDrives(drives.map(d => d.id === id ? { ...d, status: newStatus } : d))
  }

  const scheduledCount = drives.filter(d => d.status === 'Scheduled').length
  const completedCount = drives.filter(d => d.status === 'Completed').length
  const avgRating = drives.filter(d => d.rating > 0).length > 0 
    ? (drives.filter(d => d.rating > 0).reduce((sum, d) => sum + d.rating, 0) / drives.filter(d => d.rating > 0).length).toFixed(1)
    : 0

  return (
    <div>
      <h2>Test Drive Management</h2>

      <div className="stats">
        <div className="stat-card">
          <h3>Total Test Drives</h3>
          <p className="value">{drives.length}</p>
          <p className="change">All time bookings</p>
        </div>
        <div className="stat-card variant-1">
          <h3>Scheduled</h3>
          <p className="value">{scheduledCount}</p>
          <p className="change">Upcoming drives</p>
        </div>
        <div className="stat-card variant-2">
          <h3>Completed</h3>
          <p className="value">{completedCount}</p>
          <p className="change">✓ Finished drives</p>
        </div>
        <div className="stat-card variant-3">
          <h3>Avg Rating</h3>
          <p className="value">⭐ {avgRating}</p>
          <p className="change">Customer satisfaction</p>
        </div>
      </div>

      <div className="action-bar">
        <button className="btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ Book Test Drive'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h3>Book New Test Drive</h3>
          <form onSubmit={handleAddDrive}>
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
                  placeholder="555-0400"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                <label>Preferred Date *</label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Preferred Time *</label>
                <input
                  type="time"
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Duration (minutes)</label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                />
              </div>
              <div className="form-group">
                <label>Driver License Number *</label>
                <input
                  type="text"
                  value={formData.driverLicense}
                  onChange={(e) => setFormData({ ...formData, driverLicense: e.target.value })}
                  placeholder="DL123456"
                  required
                />
              </div>
              <div className="form-group">
                <label>Has Insurance?</label>
                <select
                  value={formData.insurance}
                  onChange={(e) => setFormData({ ...formData, insurance: e.target.value as TestDriveFormData['insurance'] })}
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-success">Book Test Drive</button>
          </form>
        </div>
      )}

      <div className="card">
        <h3>All Test Drives ({drives.length})</h3>
        {drives.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🏁</div>
            <h3>No Test Drives Booked</h3>
            <p>Start booking test drives for interested customers</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Date & Time</th>
                <th>Duration</th>
                <th>License</th>
                <th>Insurance</th>
                <th>Status</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {drives.map(drive => (
                <tr key={drive.id}>
                  <td><strong>{drive.customerName}</strong></td>
                  <td>{drive.vehicleMakeModel}</td>
                  <td>{drive.preferredDate} {drive.preferredTime}</td>
                  <td>{drive.duration} min</td>
                  <td><code>{drive.driverLicense}</code></td>
                  <td>{drive.insurance}</td>
                  <td>
                    <select
                      value={drive.status}
                      onChange={(e) => handleStatusChange(drive.id, e.target.value as TestDrive['status'])}
                      style={{
                        padding: '6px',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        backgroundColor: 'white'
                      }}
                    >
                      <option>Scheduled</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                      <option>No-Show</option>
                    </select>
                  </td>
                  <td>{drive.rating > 0 ? `⭐ ${drive.rating}/5` : '—'}</td>
                  <td>
                    <button className="btn btn-danger btn-small" onClick={() => handleDelete(drive.id)}>Delete</button>
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
