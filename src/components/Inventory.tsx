import { useState } from 'react'

interface Vehicle {
  id: number
  make: string
  model: string
  year: number
  color: string
  vin: string
  price: string
  mileage: number
  transmission: 'Manual' | 'Automatic'
  fuelType: 'Gasoline' | 'Diesel' | 'Hybrid' | 'Electric'
  status: 'Available' | 'Sold' | 'Reserved'
  dateAdded: string
}

type VehicleFormData = Omit<Vehicle, 'id' | 'dateAdded'>

export default function Inventory() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: 1, make: 'Tesla', model: 'Model 3', year: 2024, color: 'Pearl White', vin: 'TSL2024001', price: '$52,000', mileage: 15, transmission: 'Automatic', fuelType: 'Electric', status: 'Available', dateAdded: '2026-02-01' },
    { id: 2, make: 'BMW', model: 'X5', year: 2023, color: 'Black', vin: 'BMW2023001', price: '$68,500', mileage: 12500, transmission: 'Automatic', fuelType: 'Gasoline', status: 'Available', dateAdded: '2026-01-15' },
    { id: 3, make: 'Honda', model: 'Civic', year: 2022, color: 'Silver', vin: 'HND2022001', price: '$28,900', mileage: 35600, transmission: 'Automatic', fuelType: 'Gasoline', status: 'Available', dateAdded: '2025-12-10' },
    { id: 4, make: 'Ford', model: 'Mustang', year: 2024, color: 'Red', vin: 'FRD2024001', price: '$45,200', mileage: 8, transmission: 'Manual', fuelType: 'Gasoline', status: 'Reserved', dateAdded: '2026-02-05' },
  ])

  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState({ status: 'All', fuelType: 'All' })
  const [formData, setFormData] = useState<VehicleFormData>({ 
    make: '', 
    model: '', 
    year: 2026, 
    color: '',
    vin: '',
    price: '',
    mileage: 0,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    status: 'Available',
  })

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault()
    const newVehicle: Vehicle = {
      id: Math.max(...vehicles.map(v => v.id), 0) + 1,
      ...formData,
      dateAdded: new Date().toISOString().split('T')[0],
    }
    setVehicles([...vehicles, newVehicle])
    setFormData({ 
      make: '', model: '', year: 2026, color: '', vin: '', price: '', mileage: 0,
      transmission: 'Automatic', fuelType: 'Gasoline', status: 'Available'
    })
    setShowForm(false)
  }

  const handleDelete = (id: number) => {
    setVehicles(vehicles.filter(v => v.id !== id))
  }

  const filteredVehicles = vehicles.filter(v => {
    const matchStatus = filter.status === 'All' || v.status === filter.status
    const matchFuel = filter.fuelType === 'All' || v.fuelType === filter.fuelType
    return matchStatus && matchFuel
  })

  return (
    <div>
      <h2>Vehicle Inventory</h2>

      <div className="filter-section">
        <h4>Filter Vehicles</h4>
        <div className="filter-row">
          <div className="form-group">
            <label>Status</label>
            <select 
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            >
              <option>All</option>
              <option>Available</option>
              <option>Sold</option>
              <option>Reserved</option>
            </select>
          </div>
          <div className="form-group">
            <label>Fuel Type</label>
            <select 
              value={filter.fuelType}
              onChange={(e) => setFilter({ ...filter, fuelType: e.target.value })}
            >
              <option>All</option>
              <option>Gasoline</option>
              <option>Diesel</option>
              <option>Hybrid</option>
              <option>Electric</option>
            </select>
          </div>
        </div>
      </div>

      <div className="action-bar">
        <button className="btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ Add Vehicle'}
        </button>
        <span style={{ color: '#64748b' }}>Total: {filteredVehicles.length} vehicles</span>
      </div>

      {showForm && (
        <div className="card">
          <h3>Add New Vehicle</h3>
          <form onSubmit={handleAddVehicle}>
            <div className="grid-2">
              <div className="form-group">
                <label>Make *</label>
                <input
                  type="text"
                  value={formData.make}
                  onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                  placeholder="e.g., Tesla, BMW, Honda"
                  required
                />
              </div>
              <div className="form-group">
                <label>Model *</label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  placeholder="e.g., Model 3, X5, Civic"
                  required
                />
              </div>
              <div className="form-group">
                <label>Year *</label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Color</label>
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="e.g., Black, White, Red"
                />
              </div>
              <div className="form-group">
                <label>VIN</label>
                <input
                  type="text"
                  value={formData.vin}
                  onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
                  placeholder="Vehicle Identification Number"
                />
              </div>
              <div className="form-group">
                <label>Price *</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="e.g., $52,000"
                  required
                />
              </div>
              <div className="form-group">
                <label>Mileage</label>
                <input
                  type="number"
                  value={formData.mileage}
                  onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) })}
                />
              </div>
              <div className="form-group">
                <label>Transmission</label>
                <select 
                  value={formData.transmission}
                  onChange={(e) => setFormData({ ...formData, transmission: e.target.value as VehicleFormData['transmission'] })}
                >
                  <option>Manual</option>
                  <option>Automatic</option>
                </select>
              </div>
              <div className="form-group">
                <label>Fuel Type</label>
                <select 
                  value={formData.fuelType}
                  onChange={(e) => setFormData({ ...formData, fuelType: e.target.value as any })}
                >
                  <option>Gasoline</option>
                  <option>Diesel</option>
                  <option>Hybrid</option>
                  <option>Electric</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as VehicleFormData['status'] })}
                >
                  <option>Available</option>
                  <option>Reserved</option>
                  <option>Sold</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-success">Add Vehicle</button>
          </form>
        </div>
      )}

      <div className="card">
        <h3>All Vehicles ({filteredVehicles.length})</h3>
        {filteredVehicles.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🚗</div>
            <h3>No Vehicles Found</h3>
            <p>Add vehicles to your inventory or adjust filters</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Make & Model</th>
                <th>Year</th>
                <th>Color</th>
                <th>VIN</th>
                <th>Price</th>
                <th>Mileage</th>
                <th>Fuel Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map(vehicle => (
                <tr key={vehicle.id}>
                  <td><strong>{vehicle.make} {vehicle.model}</strong></td>
                  <td>{vehicle.year}</td>
                  <td>{vehicle.color}</td>
                  <td><code>{vehicle.vin}</code></td>
                  <td><strong>{vehicle.price}</strong></td>
                  <td>{vehicle.mileage.toLocaleString()} km</td>
                  <td>{vehicle.fuelType}</td>
                  <td>
                    <span className={`status-badge status-${vehicle.status.toLowerCase()}`}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-danger btn-small" onClick={() => handleDelete(vehicle.id)}>Delete</button>
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
