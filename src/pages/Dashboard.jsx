import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import clafLogo from '../assets/claf.png'; 

const Dashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [inventory, setInventory] = useState([
    { id: 1, name: "Blue Hydro Flask", category: "Personal", location: "University Library", status: "Lost", date: "2023-10-24" },
    { id: 2, name: "Mechanical Pencil", category: "Stationery", location: "Canteen", status: "Found", date: "2023-10-25" },
    { id: 3, name: "iPhone 13 Pro", category: "Electronics", location: "Gymnasium", status: "Lost", date: "2023-10-26" },
    { id: 4, name: "Black Wallet", category: "Personal", location: "Canteen", status: "Found", date: "2023-10-27" },
  ]);

  const [filters, setFilters] = useState({
    search: "",
    category: "All Categories",
    location: "All Locations",
    status: "All Status",
    start: "",
    end: ""
  });

  const processedItems = inventory.filter(item => {
    const searchMatch = item.name.toLowerCase().includes(filters.search.toLowerCase());
    const categoryMatch = filters.category === "All Categories" || item.category === filters.category;
    const locationMatch = filters.location === "All Locations" || item.location === filters.location;
    const statusMatch = filters.status === "All Status" || item.status === filters.status;

    const itemDate = new Date(item.date);
    const startLimit = filters.start ? new Date(filters.start) : null;
    const endLimit = filters.end ? new Date(filters.end) : null;
    const dateMatch = (!startLimit || itemDate >= startLimit) && (!endLimit || itemDate <= endLimit);

    return searchMatch && categoryMatch && locationMatch && statusMatch && dateMatch;
  });

  const theme = {
    primary: "#003366",
    secondary: "#002244",
    accent: "#c5a059"
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      category: "All Categories",
      location: "All Locations",
      status: "All Status",
      start: "",
      end: ""
    });
  };

  return (
    <div className="container-fluid vh-100 p-0 d-flex bg-light text-dark overflow-hidden">
      
      <div className="p-4 d-none d-md-flex flex-column shadow-lg text-white position-relative" 
           style={{ width: '280px', background: `linear-gradient(180deg, ${theme.primary} 0%, ${theme.secondary} 100%)`, zIndex: 100 }}>
        
        <div className="d-flex align-items-center mb-5 gap-3">
            <img src={clafLogo} alt="Logo" style={{ width: '40px' }} />
            <h4 className="fw-bold m-0" style={{ color: theme.accent }}>CLAF System</h4>
        </div>

        <nav className="nav flex-column gap-2">
          <Link className="nav-link rounded px-3 py-2 text-decoration-none shadow-sm" 
                style={{ backgroundColor: theme.accent, color: theme.primary, fontWeight: 'bold' }} 
                to="/dashboard">
            Dashboard
          </Link>
          <Link className="nav-link text-white-50 px-3 py-2 text-decoration-none" to="/profile">
            My Profile
          </Link>
        </nav>
      </div>

      <div className="flex-grow-1 p-4 p-md-5 overflow-auto position-relative bg-white">
        
        <div 
          style={{
            position: 'absolute',
            top: '55%', left: '50%', transform: 'translate(-50%, -50%)',
            backgroundImage: `url(${clafLogo})`,
            backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain',
            width: '500px', height: '500px', opacity: '0.02', 
            pointerEvents: 'none', 
            zIndex: 0
          }}
        />

        <div className="position-relative" style={{ zIndex: 5 }}>
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div>
                <p className="text-muted m-0 small">Welcome to the Item Hunters Portal</p>
                <h2 className="fw-bold m-0 mt-1" style={{ color: theme.primary }}>Item Gallery</h2>
            </div>
            <button 
                className="btn fw-bold rounded-pill px-4 shadow-sm text-white border-0" 
                style={{ backgroundColor: theme.primary, position: 'relative', zIndex: 10 }} 
                onClick={() => setIsModalOpen(true)}
            >
              + Report New Item
            </button>
          </div>

          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', zIndex: 10 }}>
            <div className="row g-3">
              <div className="col-md-3">
                <label className="small fw-bold text-muted mb-1 text-uppercase">Search Keyword</label>
                <input type="text" className="form-control" placeholder="wallet..." value={filters.search} 
                       onChange={(e) => setFilters({...filters, search: e.target.value})} />
              </div>
              <div className="col-md-2">
                <label className="small fw-bold text-muted mb-1 text-uppercase">Category</label>
                <select className="form-select" value={filters.category} 
                        onChange={(e) => setFilters({...filters, category: e.target.value})}>
                  <option>All Categories</option>
                  <option>Personal</option>
                  <option>Stationery</option>
                  <option>Electronics</option>
                </select>
              </div>
              <div className="col-md-2">
                <label className="small fw-bold text-muted mb-1 text-uppercase">Status</label>
                <select className="form-select" value={filters.status} 
                        onChange={(e) => setFilters({...filters, status: e.target.value})}>
                  <option>All Status</option>
                  <option>Lost</option>
                  <option>Found</option>
                </select>
              </div>
              <div className="col-md-2">
                <label className="small fw-bold text-muted mb-1 text-uppercase">Location</label>
                <select className="form-select" value={filters.location} 
                        onChange={(e) => setFilters({...filters, location: e.target.value})}>
                  <option>All Locations</option>
                  <option>University Library</option>
                  <option>Canteen</option>
                  <option>Gymnasium</option>
                </select>
              </div>
              <div className="col-md-3 d-flex gap-2">
                <div className="w-50">
                  <label className="small fw-bold text-muted mb-1 text-uppercase">From</label>
                  <input type="date" className="form-control" value={filters.start} 
                         onChange={(e) => setFilters({...filters, start: e.target.value})} />
                </div>
                <div className="w-50">
                  <label className="small fw-bold text-muted mb-1 text-uppercase">To</label>
                  <input type="date" className="form-control" value={filters.end} 
                         onChange={(e) => setFilters({...filters, end: e.target.value})} />
                </div>
              </div>
              <div className="col-md-12 d-flex justify-content-end">
                <button className="btn btn-sm btn-outline-secondary px-4 fw-bold mt-2" onClick={resetFilters}>
                  Clear All
                </button>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm rounded-4 p-0 overflow-hidden">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="px-4 py-3 border-0">ITEM NAME</th>
                  <th className="py-3 border-0 text-center">CATEGORY</th>
                  <th className="py-3 border-0 text-center">LOCATION</th>
                  <th className="py-3 border-0 text-center">STATUS</th>
                  <th className="px-4 py-3 border-0 text-end">DATE</th>
                </tr>
              </thead>
              <tbody>
                {processedItems.length > 0 ? (
                  processedItems.map((item) => (
                    <tr key={item.id} style={{ cursor: 'pointer' }} onClick={() => navigate('/item-detail')}>
                      <td className="px-4 py-3"><strong>{item.name}</strong></td>
                      <td className="text-center text-muted small">{item.category}</td>
                      <td className="text-center text-muted small">{item.location}</td>
                      <td className="text-center">
                        <span className={`badge rounded-pill px-3 py-2 ${item.status === 'Lost' ? 'bg-danger-subtle text-danger' : 'bg-success-subtle text-success'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-end text-muted small">{item.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5 text-muted">No items found matching your filters.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 p-4 shadow-lg">
              <div className="modal-header border-0 p-0 mb-3">
                <h5 className="fw-bold m-0" style={{ color: theme.primary }}>Report New Item</h5>
                <button className="btn-close" onClick={() => setIsModalOpen(false)}></button>
              </div>
              <div className="modal-body p-0">
                <label className="small fw-bold text-muted mb-1">DESCRIPTION</label>
                <input type="text" className="form-control mb-3" placeholder="What did you find/lose?" />
                <label className="small fw-bold text-muted mb-1">TYPE</label>
                <select className="form-select mb-3">
                  <option>Lost</option>
                  <option>Found</option>
                </select>
                <label className="small fw-bold text-muted mb-1">ATTACHMENT</label>
                <input type="file" className="form-control" />
              </div>
              <button className="btn w-100 fw-bold mt-4 text-white border-0 py-2 rounded-pill" 
                      style={{ backgroundColor: theme.primary }} 
                      onClick={() => setIsModalOpen(false)}>
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;