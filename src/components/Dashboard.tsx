export default function Dashboard() {
  return (
    <div>
      <h2>Dashboard Overview</h2>
      <div className="stats">
        <div className="stat-card">
          <h3>Total Customers</h3>
          <p className="value">1,248</p>
          <p className="change">↑ 12% from last month</p>
        </div>
        <div className="stat-card variant-1">
          <h3>Active Inventory</h3>
          <p className="value">87</p>
          <p className="change">✓ 15 vehicles in stock</p>
        </div>
        <div className="stat-card variant-2">
          <h3>Sales This Month</h3>
          <p className="value">$524K</p>
          <p className="change">↑ 8% from last month</p>
        </div>
        <div className="stat-card variant-3">
          <h3>Service Appointments</h3>
          <p className="value">34</p>
          <p className="change">12 scheduled for today</p>
        </div>
      </div>

      <div className="stats" style={{ marginTop: '25px' }}>
        <div className="stat-card">
          <h3>Test Drive Bookings</h3>
          <p className="value">24</p>
          <p className="change">This month scheduled</p>
        </div>
        <div className="stat-card variant-1">
          <h3>Trade-In Requests</h3>
          <p className="value">18</p>
          <p className="change">Pending evaluation</p>
        </div>
        <div className="stat-card variant-2">
          <h3>Active Warranties</h3>
          <p className="value">142</p>
          <p className="change">Valid policies</p>
        </div>
        <div className="stat-card variant-3">
          <h3>Support Tickets</h3>
          <p className="value">8</p>
          <p className="change">Awaiting response</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>Recent Sales</h3>
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Smith</td>
                <td>Tesla Model 3</td>
                <td>$52,000</td>
                <td>2026-02-14</td>
              </tr>
              <tr>
                <td>Sarah Johnson</td>
                <td>BMW X5</td>
                <td>$68,500</td>
                <td>2026-02-13</td>
              </tr>
              <tr>
                <td>Michael Brown</td>
                <td>Honda Civic</td>
                <td>$28,900</td>
                <td>2026-02-12</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card">
          <h3>Top Selling Models</h3>
          <table>
            <thead>
              <tr>
                <th>Model</th>
                <th>Units Sold</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tesla Model 3</td>
                <td>12</td>
                <td>$624,000</td>
              </tr>
              <tr>
                <td>BMW X5</td>
                <td>8</td>
                <td>$548,000</td>
              </tr>
              <tr>
                <td>Honda Civic</td>
                <td>15</td>
                <td>$433,500</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h3>Today's Schedule</h3>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Activity</th>
              <th>Customer</th>
              <th>Details</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>09:00 AM</td>
              <td>Service</td>
              <td>Alex Wilson</td>
              <td>Toyota Camry - Oil Change</td>
              <td><span className="status-badge status-completed">Completed</span></td>
            </tr>
            <tr>
              <td>11:30 AM</td>
              <td>Test Drive</td>
              <td>Emma Davis</td>
              <td>Ford Mustang - 60 min</td>
              <td><span className="status-badge status-pending">In Progress</span></td>
            </tr>
            <tr>
              <td>02:00 PM</td>
              <td>Trade-In Appraisal</td>
              <td>David Lee</td>
              <td>Chevrolet Silverado - Valuation</td>
              <td><span className="status-badge status-pending">Pending</span></td>
            </tr>
            <tr>
              <td>04:00 PM</td>
              <td>Sales Meeting</td>
              <td>Robert Taylor</td>
              <td>Tesla Model 3 - Financing Review</td>
              <td><span className="status-badge status-active">Scheduled</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>Quick Stats</h3>
          <div style={{ padding: '10px 0' }}>
            <p><strong>Monthly Revenue Target:</strong> $750,000</p>
            <div style={{ width: '100%', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', marginTop: '5px', overflow: 'hidden' }}>
              <div style={{ width: '69.9%', height: '100%', background: 'linear-gradient(90deg, #ff6b35, #f7931e)', transition: 'width 0.3s ease' }}></div>
            </div>
            <p style={{ marginTop: '10px', fontSize: '12px', color: '#64748b' }}>$524K / $750K (69.9%)</p>
          </div>
        </div>

        <div className="card">
          <h3>Performance Metrics</h3>
          <div style={{ padding: '10px 0' }}>
            <p><strong>Customer Satisfaction:</strong> 4.8/5 ⭐</p>
            <p style={{ marginTop: '10px' }}><strong>Avg Response Time:</strong> 2.3 hours</p>
            <p style={{ marginTop: '10px' }}><strong>Repeat Customers:</strong> 34%</p>
            <p style={{ marginTop: '10px' }}><strong>Deals Closed Rate:</strong> 78%</p>
          </div>
        </div>
      </div>
    </div>
  )
}
