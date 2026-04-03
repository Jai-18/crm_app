import { useState } from 'react'

interface ServiceAppointment {
  id: number
  customerName: string
  customerPhone: string
  vehicleMakeModel: string
  serviceType: string
  description: string
  appointmentDate: string
  appointmentTime: string
  technician: string
  estimatedCost: string
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled'
}

export default function ServiceAppointments() {
  const [appointments, setAppointments] = useState<ServiceAppointment[]>([
    { id: 1, customerName: 'Alex Wilson', customerPhone: '555-0201', vehicleMakeModel: 'Toyota Camry', serviceType: 'Oil Change & Filter', description: 'Regular maintenance', appointmentDate: '2026-02-15', appointmentTime: '09:00 AM', technician: 'John Martinez', estimatedCost: '$75', status: 'Completed' },
    { id: 2, customerName: 'Emma Davis', customerPhone: '555-0202', vehicleMakeModel: 'Ford Mustang', serviceType: 'Tire Rotation', description: 'Front and rear tire rotation', appointmentDate: '2026-02-15', appointmentTime: '11:30 AM', technician: 'Sarah Lee', estimatedCost: '$120', status: 'In Progress' },
    { id: 3, customerName: 'David Lee', customerPhone: '555-0203', vehicleMakeModel: 'Chevrolet Silverado', serviceType: 'Brake Inspection', description: 'Full brake system inspection and pad check', appointmentDate: '2026-02-15', appointmentTime: '02:00 PM', technician: 'Mike Johnson', estimatedCost: '$150', status: 'Scheduled' },
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ 
    customerName: '', 
    customerPhone: '',
    vehicleMakeModel: '',
    serviceType: '',
    description: '',
    appointmentDate: '',
    appointmentTime: '',
    technician: '',
    estimatedCost: '',
    status: 'Scheduled' as const,
  })

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault()
    const newAppointment: ServiceAppointment = {
      id: Math.max(...appointments.map(a => a.id), 0) + 1,
      ...formData,
    }
    setAppointments([...appointments, newAppointment])
    setFormData({ 
      customerName: '', customerPhone: '', vehicleMakeModel: '', serviceType: '', 
      description: '', appointmentDate: '', appointmentTime: '', technician: '', 
      estimatedCost: '', status: 'Scheduled'
    })
    setShowForm(false)
  }

  const handleStatusChange = (id: number, newStatus: ServiceAppointment['status']) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status: newStatus } : a))
  }

  const handleDelete = (id: number) => {
    setAppointments(appointments.filter(a => a.id !== id))
  }

  const upcomingCount = appointments.filter(a => a.status === 'Scheduled').length
  const completedCount = appointments.filter(a => a.status === 'Completed').length

  return (
    <div>
      <h2>Service Appointments</h2>

      <div className="stats">
        <div className="stat-card">
          <h3>Total Appointments</h3>
          <p className="value">{appointments.length}</p>
          <p className="change">All time appointments</p>
        </div>
        <div className="stat-card variant-3">
          <h3>Upcoming</h3>
          <p className="value">{upcomingCount}</p>
          <p className="change">Scheduled for future</p>
        </div>
        <div className="stat-card variant-2">
          <h3>Completed</h3>
          <p className="value">{completedCount}</p>
          <p className="change">✓ Service completed</p>
        </div>
        <div className="stat-card variant-1">
          <h3>Today's Schedule</h3>
          <p className="value">{appointments.filter(a => a.appointmentDate === new Date().toISOString().split('T')[0]).length}</p>
          <p className="change">Appointments today</p>
        </div>
      </div>

      <div className="action-bar">
        <button className="btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ New Appointment'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h3>Schedule Service Appointment</h3>
          <form onSubmit={handleAddAppointment}>
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
                <label>Phone Number *</label>
                <input
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                  placeholder="555-0200"
                  required
                />
              </div>
              <div className="form-group">
                <label>Vehicle (Make & Model) *</label>
                <input
                  type="text"
                  value={formData.vehicleMakeModel}
                  onChange={(e) => setFormData({ ...formData, vehicleMakeModel: e.target.value })}
                  placeholder="e.g., Toyota Camry"
                  required
                />
              </div>
              <div className="form-group">
                <label>Service Type *</label>
                <input
                  type="text"
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  placeholder="e.g., Oil Change, Tire Rotation"
                  required
                />
              </div>
              <div className="form-group">
                <label>Appointment Date *</label>
                <input
                  type="date"
                  value={formData.appointmentDate}
                  onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Appointment Time *</label>
                <input
                  type="time"
                  value={formData.appointmentTime}
                  onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Assigned Technician *</label>
                <input
                  type="text"
                  value={formData.technician}
                  onChange={(e) => setFormData({ ...formData, technician: e.target.value })}
                  placeholder="e.g., John Martinez"
                  required
                />
              </div>
              <div className="form-group">
                <label>Estimated Cost</label>
                <input
                  type="text"
                  value={formData.estimatedCost}
                  onChange={(e) => setFormData({ ...formData, estimatedCost: e.target.value })}
                  placeholder="$100"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Additional notes or special instructions"
                style={{ minHeight: '100px' }}
              />
            </div>
            <button type="submit" className="btn btn-success">Schedule Appointment</button>
          </form>
        </div>
      )}

      <div className="card">
        <h3>All Appointments ({appointments.length})</h3>
        {appointments.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔧</div>
            <h3>No Appointments Yet</h3>
            <p>Schedule service appointments for customers</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Service Type</th>
                <th>Date & Time</th>
                <th>Technician</th>
                <th>Estimated Cost</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(appointment => (
                <tr key={appointment.id}>
                  <td><strong>{appointment.customerName}</strong></td>
                  <td>{appointment.vehicleMakeModel}</td>
                  <td>{appointment.serviceType}</td>
                  <td>{appointment.appointmentDate} {appointment.appointmentTime}</td>
                  <td>{appointment.technician}</td>
                  <td>{appointment.estimatedCost}</td>
                  <td>
                    <select
                      value={appointment.status}
                      onChange={(e) => handleStatusChange(appointment.id, e.target.value as ServiceAppointment['status'])}
                      style={{ 
                        padding: '6px', 
                        borderRadius: '4px', 
                        border: '1px solid #ddd',
                        backgroundColor: 'white'
                      }}
                    >
                      <option>Scheduled</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button className="btn btn-danger btn-small" onClick={() => handleDelete(appointment.id)}>Delete</button>
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

