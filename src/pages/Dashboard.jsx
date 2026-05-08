import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import clafLogo from '../assets/claf.png'; 
import { getItems, createItem } from '../api/itemService'; 

const Dashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    category: 'Personal Effects',
    location: '',
    status: 'Lost',
    dateFound: new Date().toISOString().split('T')[0]
  });

  const [filters, setFilters] = useState({
    search: "", category: "All Categories", location: "All Locations", status: "All Status", start: "", end: ""
  });

  // ─── FETCH ITEMS LOGIC ──────────────────────────────────────
  const fetchItems = async () => {
    setLoading(true);
    try {
      const result = await getItems(filters); 
      if (result.success) {
        setInventory(result.data);
      }
    } catch (error) {
      console.error("Fetch Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchItems();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [filters.search, filters.category, filters.status, filters.start, filters.end]);

  
  const handleItemSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Session expired.");

    const reportData = {
      ...newItem,
      reportedBy: user.name,
      studentId: user.studentId,
      dateFound: new Date(newItem.dateFound).toISOString() 
    };

    try {
      const data = await createItem(reportData); 
      if (data.success) {
        alert("Report submitted successfully!");
        setIsModalOpen(false);
        fetchItems();
        setNewItem({ 
          title: '', description: '', category: 'Personal Effects', 
          location: '', status: 'Lost', dateFound: new Date().toISOString().split('T')[0] 
        });
      }
    } catch (err) {
      alert(err.message || "Error submitting report.");
    }
  };

  const theme = { primary: "#003366", secondary: "#002244", accent: "#c5a059", success: "#28a745" };
  const resetFilters = () => setFilters({ search: "", category: "All Categories", location: "All Locations", status: "All Status", start: "", end: "" });

  return (
    <div className="container-fluid vh-100 p-0 d-flex bg-light text-dark overflow-hidden">
      
      {/* Sidebar */}
      <div className="p-4 d-none d-md-flex flex-column shadow-lg text-white" 
           style={{ width: '280px', background: `linear-gradient(180deg, ${theme.primary} 0%, ${theme.secondary} 100%)`, zIndex: 100 }}>
        <div className="d-flex align-items-center mb-5 gap-3">
            <img src={clafLogo} alt="Logo" style={{ width: '40px' }} />
            <h4 className="fw-bold m-0" style={{ color: theme.accent }}>CLAF System</h4>
        </div>
        <nav className="nav flex-column gap-2">
          <Link className="nav-link rounded px-3 py-2 text-white fw-bold shadow-sm" 
                style={{ backgroundColor: theme.accent }} to="/dashboard">Dashboard</Link>
          <Link className="nav-link text-white-50 px-3 py-2 text-decoration-none" to="/profile">My Profile</Link>
          {user?.role === 'admin' && (
            <Link className="nav-link text-white-50 px-3 py-2 text-decoration-none fw-bold" to="/admin-panel">🛡️ Admin Panel</Link>
          )}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4 p-md-5 overflow-auto bg-white">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div>
                <p className="text-muted m-0 small">Welcome to the Item Hunters Portal</p>
                <h2 className="fw-bold m-0 mt-1" style={{ color: theme.primary }}>Item Gallery</h2>
            </div>
            <button className="btn fw-bold rounded-pill px-4 shadow-sm text-white border-0" 
                    style={{ backgroundColor: theme.primary }} onClick={() => setIsModalOpen(true)}>
              + Report New Item
            </button>
          </div>

          {}
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-light">
            <div className="row g-3">
              <div className="col-md-3">
                <label className="small fw-bold text-muted mb-1">SEARCH</label>
                <input type="text" className="form-control shadow-sm border-0" placeholder="Item name..." value={filters.search} 
                       onChange={(e) => setFilters({...filters, search: e.target.value})} />
              </div>
              <div className="col-md-2">
                <label className="small fw-bold text-muted mb-1">CATEGORY</label>
                <select className="form-select shadow-sm border-0" value={filters.category} onChange={(e) => setFilters({...filters, category: e.target.value})}>
                  <option>All Categories</option>
                  <option>Personal Effects</option>
                  <option>Stationery</option>
                  <option>Electronics</option>
                </select>
              </div>
              <div className="col-md-2">
                <label className="small fw-bold text-muted mb-1">STATUS</label>
                <select className="form-select shadow-sm border-0" value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})}>
                  <option>All Status</option>
                  <option>Lost</option>
                  <option>Found</option>
                  <option>Claimed</option>
                </select>
              </div>
              <div className="col-md-5 d-flex gap-2 align-items-end">
                  <div className="w-100">
                    <label className="small fw-bold text-muted mb-1">DATE RANGE</label>
                    <div className="d-flex gap-2">
                        <input type="date" className="form-control shadow-sm border-0" value={filters.start} onChange={(e) => setFilters({...filters, start: e.target.value})} />
                        <input type="date" className="form-control shadow-sm border-0" value={filters.end} onChange={(e) => setFilters({...filters, end: e.target.value})} />
                    </div>
                  </div>
                  <button className="btn btn-light shadow-sm border-0 fw-bold" onClick={resetFilters}>Reset</button>
              </div>
            </div>
          </div>

          {/* Table Area */}
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="px-4 py-3">ITEM DETAILS</th>
                  <th className="text-center">CATEGORY</th>
                  <th className="text-center">STATUS</th>
                  <th className="text-end px-4">DATE</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="4" className="text-center py-5">Loading...</td></tr>
                ) : inventory.length > 0 ? (
                  inventory.map((item) => {
                    const isClaimed = item.status.toLowerCase() === 'claimed';
                    
                    return (
                      <tr 
                        key={item._id} 
                        onClick={() => navigate('/item-detail', { state: { item } })} 
                        style={{ 
                          cursor: 'pointer',
                          opacity: isClaimed ? 0.7 : 1,
                          backgroundColor: isClaimed ? '#f8f9fa' : 'transparent'
                        }}
                      >
                        <td className="px-4 py-3 position-relative">
                          <div className="d-flex align-items-center gap-2">
                            <div className="fw-bold" style={{ color: isClaimed ? '#6c757d' : theme.primary }}>
                              {item.title}
                            </div>
                            {/* MARK AS RECOVERED BADGE */}
                            {isClaimed && (
                              <span className="badge bg-success-subtle text-success small border border-success-subtle">
                                <i className="bi bi-check-circle-fill me-1"></i>RECOVERED
                              </span>
                            )}
                          </div>
                          <div className="small text-muted text-truncate" style={{maxWidth: '250px'}}>{item.description}</div>
                        </td>
                        <td className="text-center small">{item.category}</td>
                        <td className="text-center">
                          <span className={`badge rounded-pill px-3 py-2 ${
                            isClaimed 
                              ? 'bg-secondary text-white' 
                              : item.status.toLowerCase() === 'lost' 
                                ? 'bg-danger-subtle text-danger' 
                                : 'bg-success-subtle text-success'
                          }`}>
                            {item.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-end small text-muted">
                          {new Date(item.dateFound).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr><td colSpan="4" className="text-center py-5">No items found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
      </div>

      {}
      {isModalOpen && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1060 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4 rounded-4 border-0 shadow-lg">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold m-0" style={{ color: theme.primary }}>Report Item</h4>
                <button className="btn-close" onClick={() => setIsModalOpen(false)}></button>
              </div>
              <form onSubmit={handleItemSubmit}>
                <div className="mb-3">
                  <label className="small fw-bold text-muted">TITLE</label>
                  <input type="text" className="form-control bg-light border-0" placeholder="What did you lose/find?" required 
                         value={newItem.title} onChange={(e) => setNewItem({...newItem, title: e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="small fw-bold text-muted">DESCRIPTION</label>
                  <textarea className="form-control bg-light border-0" rows="2" placeholder="Provide details..." required
                            value={newItem.description} onChange={(e) => setNewItem({...newItem, description: e.target.value})}></textarea>
                </div>
                <div className="row g-2 mb-4">
                  <div className="col-md-6">
                    <label className="small fw-bold text-muted">LOCATION</label>
                    <input type="text" className="form-control bg-light border-0" placeholder="Where?" required
                           value={newItem.location} onChange={(e) => setNewItem({...newItem, location: e.target.value})} />
                  </div>
                  <div className="col-md-6">
                    <label className="small fw-bold text-muted">STATUS</label>
                    <select className="form-select bg-light border-0" value={newItem.status} onChange={(e) => setNewItem({...newItem, status: e.target.value})}>
                      <option value="Lost">Lost</option>
                      <option value="Found">Found</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn w-100 fw-bold text-white py-2 rounded-pill shadow" style={{ backgroundColor: theme.primary }}>
                  Submit Report
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;