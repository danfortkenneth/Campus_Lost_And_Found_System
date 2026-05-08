import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import clafLogo from '../assets/claf.png'; 
import { getUserClaims } from '../api/claimService'; 

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const theme = {
    primary: "#003366",
    secondary: "#002244",
    accent: "#c5a059",
    info: "#007bff",
    success: "#28a745",
    danger: "#dc3545",
    warning: "#856404",
    warningBg: "#fff3cd",
    successBg: "#e5f9e0",
    dangerBg: "#ffe5e5"
  };

  // ─── REAL-TIME FETCH LOGIC ──────────────────────────────────
  const fetchActivity = async () => {
    try {
      const userId = user.studentId || user._id || user.id;
      const result = await getUserClaims(userId); 
      if (result.success) {
        setActivities(result.data);
      }
    } catch (err) {
      console.error("Activity Fetch Error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchActivity();
      
     
      const interval = setInterval(fetchActivity, 5000); 
      return () => clearInterval(interval);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="container-fluid vh-100 p-0 d-flex bg-light text-dark overflow-hidden">
      
      {/* Sidebar */}
      <div className="p-4 d-none d-md-flex flex-column shadow-lg text-white" 
           style={{ width: '280px', background: `linear-gradient(180deg, ${theme.primary} 0%, ${theme.secondary} 100%)`, zIndex: 10 }}>
        <div className="d-flex align-items-center mb-5 gap-3">
            <img src={clafLogo} alt="Logo" style={{ width: '40px' }} />
            <h4 className="fw-bold m-0" style={{ color: theme.accent }}>CLAF System</h4>
        </div>
        <nav className="nav flex-column gap-2">
          <Link className="nav-link text-white-50 px-3 py-2 text-decoration-none" to="/dashboard">Dashboard</Link>
          <Link className="nav-link rounded px-3 py-2 text-white fw-bold shadow-sm" 
                style={{ backgroundColor: theme.accent }} to="/profile">My Profile</Link>
          {user?.role === 'admin' && (
            <Link className="nav-link text-white-50 px-3 py-2 text-decoration-none fw-bold" to="/admin-panel">🛡️ Admin Panel</Link>
          )}
        </nav>

        <div className="mt-auto">
            <div className="d-flex align-items-center gap-2 mb-4">
                <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white shadow-sm border border-light" 
                     style={{ width: '40px', height: '40px', backgroundColor: theme.info }}>
                     {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="small">
                    <p className="fw-bold m-0" style={{ color: theme.accent }}>{user?.name || "Guest"}</p>
                    <p className="text-white-50 m-0 text-uppercase" style={{fontSize: '10px'}}>{user?.role}</p>
                </div>
            </div>
            <button onClick={handleLogout} className="btn btn-link text-danger p-0 small fw-bold text-decoration-none border-0 bg-transparent">
                Logout
            </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4 p-md-5 overflow-auto bg-white">
        <div className="mb-5">
            <p className="text-muted m-0 small">Account Settings</p>
            <h2 className="fw-bold m-0 mt-1" style={{ color: theme.primary }}>My Profile</h2>
        </div>

        <div className="row g-4">
          {/* PROFILE CARD */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 text-center h-100 bg-light">
              <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white mx-auto shadow-lg mb-4" 
                   style={{ width: '100px', height: '100px', backgroundColor: theme.info, fontSize: '36px' }}>
                   {user?.name?.charAt(0) || 'U'}
              </div>
              <h4 className="fw-bold mb-1" style={{ color: theme.primary }}>{user?.name}</h4>
              <p className="text-muted small mb-3 text-capitalize">
                {user?.role === 'admin' ? 'System Administrator' : `Student ID: ${user?.studentId || 'N/A'}`}
              </p>
              <span className="badge rounded-pill text-success px-4 py-2" style={{ backgroundColor: theme.successBg }}>
                  Verified User
              </span>
            </div>
          </div>

          {/* ACTIVITY LOG (Real-time Status) */}
          <div className="col-md-8">
            <div className="card border-0 shadow-sm rounded-4 p-4">
              <h5 className="fw-bold mb-4" style={{ color: theme.primary }}>Recent System Activity</h5>
              
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead className="small text-muted text-uppercase">
                      <tr>
                          <th className="pb-3 border-0">Item Name</th>
                          <th className="pb-3 border-0 text-center">Date</th>
                          <th className="pb-3 border-0 text-end">Status</th>
                      </tr>
                  </thead>
                  <tbody>
                      {loading ? (
                        <tr><td colSpan="3" className="text-center py-4">Loading Activity...</td></tr>
                      ) : activities.length > 0 ? (
                        activities.map((claim) => (
                          <tr key={claim._id}>
                              <td className="py-3">
                                <strong style={{ color: theme.primary }}>{claim.itemId?.title || "Deleted Item"}</strong>
                                <br /><small className="text-muted">{claim.itemId?.category}</small>
                              </td>
                              <td className="small text-muted text-center">
                                {new Date(claim.createdAt).toLocaleDateString()}
                              </td>
                              <td className="text-end">
                                  <span className="badge px-3 py-2 rounded-pill text-uppercase" 
                                        style={{ 
                                          backgroundColor: 
                                            claim.status === 'approved' ? theme.successBg : 
                                            claim.status === 'rejected' ? theme.dangerBg : theme.warningBg, 
                                          color: 
                                            claim.status === 'approved' ? theme.success : 
                                            claim.status === 'rejected' ? theme.danger : theme.warning 
                                        }}>
                                    {claim.status}
                                  </span>
                              </td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="3" className="text-center py-4 text-muted">No claim requests found.</td></tr>
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;