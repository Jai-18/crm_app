import { useState } from 'react'

interface Customer {
  id: number
  name: string
  email: string
  phone: string
  vehiclesPurchased: number
  totalSpent: string
  preferredBrand: string
  status: 'Active' | 'Inactive'
  lastPurchase: string
}

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([
    { id: 1, name: 'John Smith', email: 'john@example.com', phone: '555-0101', vehiclesPurchased: 3, totalSpent: '$156,200', preferredBrand: 'Tesla', status: 'Active', lastPurchase: '2026-01-15' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', phone: '555-0102', vehiclesPurchased: 2, totalSpent: '$98,500', preferredBrand: 'BMW', status: 'Active', lastPurchase: '2025-12-20' },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com', phone: '555-0103', vehiclesPurchased: 1, totalSpent: '$28,900', preferredBrand: 'Honda', status: 'Active', lastPurchase: '2026-02-10' },
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    preferredBrand: '',
    status: 'Active' as const 
  })

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault()
    const newCustomer: Customer = {
      id: Math.max(...customers.map(c => c.id), 0) + 1,
      ...formData,
      vehiclesPurchased: 0,
      totalSpent: '$0',
      lastPurchase: new Date().toISOString().split('T')[0],
    }
    setCustomers([...customers, newCustomer])
    setFormData({ name: '', email: '', phone: '', preferredBrand: '', status: 'Active' })
    setShowForm(false)
  }

  const handleDelete = (id: number) => {
    setCustomers(customers.filter(c => c.id !== id))
  }

  return (
    <div>
      <h2>Customer Management</h2>
      
      <div className="action-bar">
        <button className="btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ Add New Customer'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h3>Add New Customer</h3>
          <form onSubmit={handleAddCustomer}>
            <div className="grid-2">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
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
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="555-0100"
                />
              </div>
              <div className="form-group">
                <label>Preferred Brand</label>
                <input
                  type="text"
                  value={formData.preferredBrand}
                  onChange={(e) => setFormData({ ...formData, preferredBrand: e.target.value })}
                  placeholder="Tesla, BMW, Honda, etc."
                />
              </div>
            </div>
            <button type="submit" className="btn btn-success">Add Customer</button>
          </form>
        </div>
      )}

      <div className="card">
        <h3>All Customers ({customers.length})</h3>
        {customers.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <h3>No Customers Yet</h3>
            <p>Add your first customer to get started</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Preferred Brand</th>
                <th>Vehicles</th>
                <th>Total Spent</th>
                <th>Last Purchase</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.id}>
                  <td><strong>{customer.name}</strong></td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.preferredBrand}</td>
                  <td>{customer.vehiclesPurchased}</td>
                  <td><strong>{customer.totalSpent}</strong></td>
                  <td>{customer.lastPurchase}</td>
                  <td>
                    <span className={`status-badge status-${customer.status.toLowerCase()}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-danger btn-small" onClick={() => handleDelete(customer.id)}>Delete</button>
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
