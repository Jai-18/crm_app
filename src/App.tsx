import { useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import Customers from './components/Customers'
import Inventory from './components/Inventory'
import Sales from './components/Sales'
import ServiceAppointments from './components/ServiceAppointments'
import TradeIn from './components/TradeIn'
import TestDrive from './components/TestDrive'
import Warranty from './components/Warranty'
import Contacts from './components/Contacts'
import Login from './components/Login'

type View = 'dashboard' | 'customers' | 'inventory' | 'sales' | 'service' | 'tradein' | 'testdrive' | 'warranty' | 'contacts'

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = (username: string, password: string) => {
    // In a real app, you'd validate against a backend
    if (username === 'customer' && password === 'customerAdmin') {
      setIsLoggedIn(true)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentView('dashboard')
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="app">
      <nav className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="logo-section">
          <div className="logo-icon">🏎️</div>
          <h1>AutoDeal</h1>
          <p className="tagline">CRM Pro</p>
        </div>

        <div className="nav-container">
          <h3 className="nav-category">MAIN</h3>
          <ul className="nav-menu">
            <li>
              <button 
                onClick={() => setCurrentView('dashboard')} 
                className={`nav-btn ${currentView === 'dashboard' ? 'active' : ''}`}
              >
                <span className="icon">📊</span>
                <span className="label">Dashboard</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentView('customers')} 
                className={`nav-btn ${currentView === 'customers' ? 'active' : ''}`}
              >
                <span className="icon">👥</span>
                <span className="label">Customers</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentView('contacts')} 
                className={`nav-btn ${currentView === 'contacts' ? 'active' : ''}`}
              >
                <span className="icon">📇</span>
                <span className="label">Contacts</span>
              </button>
            </li>
          </ul>

          <h3 className="nav-category">INVENTORY & SALES</h3>
          <ul className="nav-menu">
            <li>
              <button 
                onClick={() => setCurrentView('inventory')} 
                className={`nav-btn ${currentView === 'inventory' ? 'active' : ''}`}
              >
                <span className="icon">🚗</span>
                <span className="label">Inventory</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentView('sales')} 
                className={`nav-btn ${currentView === 'sales' ? 'active' : ''}`}
              >
                <span className="icon">💰</span>
                <span className="label">Sales</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentView('tradein')} 
                className={`nav-btn ${currentView === 'tradein' ? 'active' : ''}`}
              >
                <span className="icon">🔄</span>
                <span className="label">Trade-In</span>
              </button>
            </li>
          </ul>

          <h3 className="nav-category">SERVICE & SUPPORT</h3>
          <ul className="nav-menu">
            <li>
              <button 
                onClick={() => setCurrentView('service')} 
                className={`nav-btn ${currentView === 'service' ? 'active' : ''}`}
              >
                <span className="icon">🔧</span>
                <span className="label">Service</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentView('warranty')} 
                className={`nav-btn ${currentView === 'warranty' ? 'active' : ''}`}
              >
                <span className="icon">🛡️</span>
                <span className="label">Warranty</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentView('testdrive')} 
                className={`nav-btn ${currentView === 'testdrive' ? 'active' : ''}`}
              >
                <span className="icon">🏁</span>
                <span className="label">Test Drive</span>
              </button>
            </li>
          </ul>
        </div>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">👨‍💼</div>
            <div className="user-details">
              <p className="user-name">Admin User</p>
              <p className="user-role">Manager</p>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <span className="icon">🚪</span>
            <span className="label">Logout</span>
          </button>
          <p className="copyright">© 2026 AutoDeal</p>
        </div>
      </nav>

      <div className="main-wrapper">
        <button className="toggle-sidebar" onClick={() => setSidebarOpen(!sidebarOpen)}>
          ☰
        </button>
        
        <main className="content">
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'customers' && <Customers />}
          {currentView === 'contacts' && <Contacts />}
          {currentView === 'inventory' && <Inventory />}
          {currentView === 'sales' && <Sales />}
          {currentView === 'tradein' && <TradeIn />}
          {currentView === 'service' && <ServiceAppointments />}
          {currentView === 'warranty' && <Warranty />}
          {currentView === 'testdrive' && <TestDrive />}
        </main>
      </div>
    </div>
  )
}

export default App
