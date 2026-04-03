import { useState } from 'react'

interface Contact {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  position: string
  company: string
  communicationPreference: 'Phone' | 'Email' | 'SMS'
  status: 'Active' | 'Inactive'
  dateAdded: string
}

type ContactFormData = Omit<Contact, 'id' | 'dateAdded'>

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, firstName: 'John', lastName: 'Smith', email: 'john.smith@example.com', phone: '555-0101', position: 'Fleet Manager', company: 'ABC Corp', communicationPreference: 'Email', status: 'Active', dateAdded: '2025-12-01' },
    { id: 2, firstName: 'Sarah', lastName: 'Johnson', email: 'sarah.j@example.com', phone: '555-0102', position: 'Owner', company: 'XYZ Inc', communicationPreference: 'Phone', status: 'Active', dateAdded: '2025-11-15' },
    { id: 3, firstName: 'Michael', lastName: 'Brown', email: 'm.brown@example.com', phone: '555-0103', position: 'Operations Manager', company: 'Tech Ltd', communicationPreference: 'SMS', status: 'Inactive', dateAdded: '2025-10-20' },
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<ContactFormData>({ 
    firstName: '', 
    lastName: '',
    email: '',
    phone: '',
    position: '',
    company: '',
    communicationPreference: 'Email',
    status: 'Active',
  })

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault()
    const newContact: Contact = {
      id: Math.max(...contacts.map(c => c.id), 0) + 1,
      ...formData,
      dateAdded: new Date().toISOString().split('T')[0],
    }
    setContacts([...contacts, newContact])
    setFormData({ 
      firstName: '', lastName: '', email: '', phone: '', position: '', 
      company: '', communicationPreference: 'Email', status: 'Active'
    })
    setShowForm(false)
  }

  const handleDelete = (id: number) => {
    setContacts(contacts.filter(c => c.id !== id))
  }

  return (
    <div>
      <h2>Contact Directory</h2>

      <div className="action-bar">
        <button className="btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ Add Contact'}
        </button>
        <span style={{ color: '#64748b' }}>Total: {contacts.length} contacts</span>
      </div>

      {showForm && (
        <div className="card">
          <h3>Add New Contact</h3>
          <form onSubmit={handleAddContact}>
            <div className="grid-2">
              <div className="form-group">
                <label>First Name *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="John"
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Doe"
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
                <label>Phone *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="555-0100"
                  required
                />
              </div>
              <div className="form-group">
                <label>Position</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="e.g., Manager, Director"
                />
              </div>
              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Company Name"
                />
              </div>
              <div className="form-group">
                <label>Preferred Contact</label>
                <select 
                  value={formData.communicationPreference}
                  onChange={(e) => setFormData({ ...formData, communicationPreference: e.target.value as ContactFormData['communicationPreference'] })}
                >
                  <option>Email</option>
                  <option>Phone</option>
                  <option>SMS</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as ContactFormData['status'] })}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-success">Add Contact</button>
          </form>
        </div>
      )}

      <div className="card">
        <h3>All Contacts ({contacts.length})</h3>
        {contacts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📇</div>
            <h3>No Contacts Yet</h3>
            <p>Add contacts to build your network</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Position</th>
                <th>Company</th>
                <th>Preference</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr key={contact.id}>
                  <td><strong>{contact.firstName} {contact.lastName}</strong></td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.position}</td>
                  <td>{contact.company}</td>
                  <td>{contact.communicationPreference}</td>
                  <td>
                    <span className={`status-badge status-${contact.status.toLowerCase()}`}>
                      {contact.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-danger btn-small" onClick={() => handleDelete(contact.id)}>Delete</button>
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
