import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import clafLogo from '../assets/claf.png'; 
import { getAllUsers, removeUser } from '../api/authService'; 

const AdminSecurity = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('claims'); 
  const [claims, setClaims] = useState([]);
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(false);

  const theme = {
    primary: "#003366",
    secondary: "#002244",
    accent: "#c5a059",
    success: "#28a745",
    danger: "#dc3545"
  };

 
  const fetchData = async () => {
    setLoading(true);
    try {
      if (view === 'claims') {
        const response = await fetch('http://localhost:5000/api/claims/all');
        const result = await response.json();
        // Siguraduhin na Array ang data para hindi mag-crash ang .map()
        if (result.success) {
          setClaims(Array.isArray(result.data) ? result.data : []);
        }
      } else {
        const result = await getAllUsers();
        if (result && result.success) {
          setUsers(Array.isArray(result.data) ? result.data : []);
        }
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      
      setClaims([]);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [view]);

 
  const handleRemoveUser = async (userId) => {
    if (!window.confirm("Are you sure you want to remove this student account?")) return;
    try {
      const result = await removeUser(userId);
      if (result.success) {
        setUsers(prev => prev.filter(u => u._id !== userId));
        alert("User account removed successfully.");
      }
    } catch (err) {
      alert(err.message || "Failed to connect to server.");
    }
  };

 
  const handleUpdateStatus = async (id, newStatus) => {
    const actionText = newStatus === 'approved' ? "APPROVE" : "REJECT";
    if (!window.confirm(`Are you sure you want to ${actionText}?`)) return;

    try {
      const response = await fetch(`http://localhost:5000/api/claims/update-status/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      
      const result = await response.json();
      if (result.success) {
        alert(newStatus === 'approved' ? "Claim approved!" : "Claim rejected.");
        fetchData(); 
      }
    } catch (err) {
      alert("Cannot connect to server.");
    }
  };

  return (
    <div className="container-fluid vh-100 p-0 d-flex bg-light text-dark overflow-hidden">
      {/* Sidebar */}
      <div className="p-4 d-none d-md-flex flex-column shadow-lg text-white" 
           style={{ width: '280px', background: `linear-gradient(180deg, ${theme.primary} 0%, ${theme.secondary} 100%)`, zIndex: 10 }}>
        <div className="d-flex align-items-center mb-5 gap-3">
            <img src={clafLogo} alt="Logo" style={{ width: '40px' }} />
            <h4 className="fw-bold m-0" style={{ color: theme.accent }}>CLAF Admin</h4>
        </div>
        <nav className="nav flex-column gap-2">
          <Link className="nav-link text-white-50 px-3 py-2 text-decoration-none d-flex align-items-center gap-2" to="/dashboard">
            <i className="bi bi-arrow-left-circle"></i> Back to Gallery
          </Link>
          <hr style={{ backgroundColor: theme.accent, opacity: 0.3 }} />
          
          <button className={`nav-link border-0 text-start rounded px-3 py-2 mb-2 ${view === 'claims' ? 'active shadow-sm' : 'text-white-50 bg-transparent'}`}
                  style={view === 'claims' ? { backgroundColor: theme.accent, color: theme.primary, fontWeight: 'bold' } : {}}
                  onClick={() => setView('claims')}>
            <i className="bi bi-clipboard-check me-2"></i> Manage Claims
          </button>

          <button className={`nav-link border-0 text-start rounded px-3 py-2 ${view === 'users' ? 'active shadow-sm' : 'text-white-50 bg-transparent'}`}
                  style={view === 'users' ? { backgroundColor: theme.accent, color: theme.primary, fontWeight: 'bold' } : {}}
                  onClick={() => setView('users')}>
            <i className="bi bi-people-fill me-2"></i> User Management
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow-1 p-4 p-md-5 overflow-auto bg-white">
        <div className="mb-5">
            <p className="text-muted m-0 small">Administrative Control Panel</p>
            <h2 className="fw-bold m-0 mt-1" style={{ color: theme.primary }}>
              {view === 'users' ? 'User Accounts Control' : 'Claim Verification'}
            </h2>
        </div>

        <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead className="small text-muted text-uppercase">
                <tr style={{ borderBottom: `2px solid ${theme.accent}33` }}>
                  <th className="pb-3 border-0">{view === 'users' ? 'Student Name' : 'Item Name'}</th>
                  <th className="pb-3 border-0 text-center">{view === 'users' ? 'ID Number' : 'Claimer Name'}</th>
                  {view === 'claims' && <th className="pb-3 border-0 text-center">Proof</th>}
                  <th className="pb-3 border-0 text-center">Status</th>
                  <th className="pb-3 border-0 text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" className="text-center py-5">Syncing data...</td></tr>
                ) : (
                  <>
                    {/* VIEW: USERS */}
                    {view === 'users' && (
                      users.length === 0 ? (
                        <tr><td colSpan="5" className="text-center py-5">No registered users found.</td></tr>
                      ) : (
                        users.map(user => (
                          <tr key={user._id} className="border-bottom-light">
                            <td className="py-4 fw-bold" style={{ color: theme.primary }}>{user.name}</td>
                            <td className="text-center text-muted">{user.studentId || '---'}</td>
                            <td className="text-center">
                              <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">ACTIVE</span>
                            </td>
                            <td className="text-end">
                              <button onClick={() => handleRemoveUser(user._id)} className="btn btn-sm btn-outline-danger border-0">
                                <i className="bi bi-trash me-1"></i> Remove
                              </button>
                            </td>
                          </tr>
                        ))
                      )
                    )}

                    {/* VIEW: CLAIMS */}
                    {view === 'claims' && (
                      claims.length === 0 ? (
                        <tr><td colSpan="5" className="text-center py-5">No claims for review.</td></tr>
                      ) : (
                        claims.map((claim) => (
                          <tr key={claim._id} style={{ borderBottom: '1px solid #f8f9fa' }}>
                            <td className="py-4">
                                <strong style={{ color: theme.primary }}>{claim.itemId?.title || 'Deleted Item'}</strong>
                            </td>
                            <td className="text-center text-muted">{claim.claimerName}</td>
                            <td className="text-center small text-muted">{claim.proof}</td>
                            <td className="text-center">
                              <span className="badge px-3 py-2 rounded-pill" 
                                    style={{ 
                                      backgroundColor: claim.status === 'pending' ? '#fff3cd' : claim.status === 'approved' ? '#e5f9e0' : '#ffe5e5', 
                                      color: claim.status === 'pending' ? '#856404' : claim.status === 'approved' ? theme.success : theme.danger 
                                    }}>
                                {claim.status}
                              </span>
                            </td>
                            <td className="text-end">
                              {claim.status === 'pending' ? (
                                <div className="d-flex gap-2 justify-content-end">
                                  <button onClick={() => handleUpdateStatus(claim._id, 'approved')} className="btn btn-sm btn-success rounded-pill px-3 border-0 fw-bold">Approve</button>
                                  <button onClick={() => handleUpdateStatus(claim._id, 'rejected')} className="btn btn-sm btn-outline-danger rounded-pill px-3 border-0 bg-light fw-bold">Reject</button>
                                </div>
                              ) : (
                                <span className={`fw-bold small ${claim.status === 'approved' ? 'text-success' : 'text-danger'}`}>
                                  {claim.status === 'approved' ? 'Approved' : 'Rejected'}
                                </span>
                              )}
                            </td>
                          </tr>
                        ))
                      )
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Footer */}
        <div className="row g-4">
            <div className="col-md-4">
                <div className="card border-0 shadow-sm rounded-4 p-3 d-flex flex-row align-items-center gap-3">
                    <div className="rounded-4 p-3" style={{ backgroundColor: `${theme.primary}15`, color: theme.primary }}>
                      <i className="bi bi-clipboard-data h4 m-0"></i>
                    </div>
                    <div>
                        <p className="text-muted small m-0">Total Claims</p>
                        <h4 className="fw-bold m-0">{claims.length}</h4>
                    </div>
                </div>
            </div>
            {view === 'users' && (
              <div className="col-md-4">
                <div className="card border-0 shadow-sm rounded-4 p-3 d-flex flex-row align-items-center gap-3">
                    <div className="rounded-4 p-3" style={{ backgroundColor: `${theme.accent}15`, color: theme.accent }}>
                      <i className="bi bi-people h4 m-0"></i>
                    </div>
                    <div>
                        <p className="text-muted small m-0">Total Users</p>
                        <h4 className="fw-bold m-0">{users.length}</h4>
                    </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AdminSecurity;