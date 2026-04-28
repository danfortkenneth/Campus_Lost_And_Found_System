import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import clafLogo from '../assets/claf.png'; 

const Profile = () => {
  const navigate = useNavigate();

  const theme = {
    primary: "#003366",
    secondary: "#002244",
    accent: "#c5a059",
    info: "#007bff",
    success: "#28a745",
    warning: "#856404",
    warningBg: "#fff3cd"
  };

  return (
    <div className="container-fluid vh-100 p-0 d-flex bg-light text-dark overflow-hidden">
      
      <div className="p-4 d-none d-md-flex flex-column shadow-lg text-white position-relative overflow-hidden" 
           style={{ 
             width: '280px', 
             background: `linear-gradient(180deg, ${theme.primary} 0%, ${theme.secondary} 100%)`, 
             zIndex: 10 
           }}>
        
        <img 
          src={clafLogo} 
          alt=""
          style={{
            position: 'absolute',
            bottom: '-30px',
            right: '-30px',
            width: '200px',
            opacity: '0.08',
            transform: 'rotate(-15deg)',
            pointerEvents: 'none',
            zIndex: 0
          }} 
        />

        <div className="position-relative" style={{ zIndex: 1 }}>
          <div className="d-flex align-items-center mb-5 gap-3">
              <img src={clafLogo} alt="Logo" style={{ width: '40px' }} />
              <h4 className="fw-bold m-0" style={{ color: theme.accent, letterSpacing: '1px' }}>CLAF System</h4>
          </div>

          <nav className="nav flex-column gap-2">
            <Link className="nav-link text-white-50 px-3 py-2 text-decoration-none d-flex align-items-center gap-2" to="/dashboard">
              <i className="bi bi-speedometer2 me-1"></i> Dashboard
            </Link>
            
            <Link 
              className="nav-link rounded px-3 py-2 text-decoration-none d-flex align-items-center gap-2 shadow-sm" 
              style={{ backgroundColor: theme.accent, color: theme.primary, fontWeight: 'bold' }} 
              to="/profile"
            >
              <i className="bi bi-person-fill me-1"></i> My Profile
            </Link>
            
            <Link className="nav-link text-white-50 px-3 py-2 text-decoration-none fw-bold d-flex align-items-center gap-2" to="/admin-panel">
              🛡️ Admin Panel
            </Link>
          </nav>
        </div>
        
        <div className="mt-auto position-relative" style={{ zIndex: 1 }}>
            <div className="d-flex align-items-center gap-2 mb-4">
                <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white shadow-sm border border-light" 
                     style={{ width: '40px', height: '40px', backgroundColor: theme.info }}>
                     DG
                </div>
                <div className="small">
                    <p className="fw-bold m-0" style={{ color: theme.accent }}>Danfort G.</p>
                    <p className="text-white-50 m-0 small">Verified Student</p>
                </div>
            </div>
            <hr style={{ backgroundColor: theme.accent, opacity: 0.3 }} className="my-3" />
            <Link to="/" className="nav-link text-danger px-3 py-2 small fw-bold text-decoration-none d-flex align-items-center gap-2">
                <i className="bi bi-box-arrow-left me-1"></i> Logout
            </Link>
        </div>
      </div>

      <div className="flex-grow-1 p-4 p-md-5 overflow-auto position-relative bg-white custom-content">
        
        <div 
          style={{
            position: 'absolute',
            top: '55%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundImage: `url(${clafLogo})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            width: '500px',
            height: '500px',
            opacity: '0.02', 
            pointerEvents: 'none',
            zIndex: '0'
          }}
        />

        <div className="position-relative" style={{ zIndex: 1 }}>
          <div className="mb-5">
              <p className="text-muted m-0 small">Account Settings</p>
              <h2 className="fw-bold m-0 mt-1" style={{ color: theme.primary }}>My Profile</h2>
          </div>

          <div className="row g-4">
            
            <div className="col-md-4">
              <div className="card border-0 shadow-sm rounded-4 p-4 text-center h-100" 
                   style={{ 
                       backgroundColor: 'rgba(255, 255, 255, 0.7)', 
                       backdropFilter: 'blur(10px)', 
                       border: '1px solid rgba(255, 255, 255, 0.3)'
                   }}>
                
                <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white mx-auto shadow-lg mb-4" 
                     style={{ width: '100px', height: '100px', backgroundColor: theme.info, fontSize: '36px' }}>
                     DG
                </div>
                
                <h4 className="fw-bold mb-1" style={{ color: theme.primary }}>Danfort Garcia</h4>
                <p className="text-muted small mb-3">ID: 1811761573</p>
                
                <span className="badge rounded-pill text-success px-4 py-2" style={{ backgroundColor: '#e5f9e0' }}>
                    <i className="bi bi-patch-check-fill me-2"></i> Verified Student
                </span>
                
                <hr style={{ backgroundColor: theme.accent, opacity: 0.2 }} className="my-4" />
                
                <p className="small text-muted mb-0">College of Engineering & Technology</p>
                <p className="small text-muted">BS Information Technology</p>
              </div>
            </div>

            <div className="col-md-8">
              <div className="d-flex flex-column gap-4">
                
                <div className="card border-0 shadow-sm rounded-4 p-4" 
                     style={{ 
                         backgroundColor: 'rgba(255, 255, 255, 0.7)', 
                         backdropFilter: 'blur(10px)', 
                         border: '1px solid rgba(255, 255, 255, 0.3)'
                     }}>
                  <h5 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: theme.primary }}>
                    <i className="bi bi-file-earmark-plus me-1 text-primary opacity-75"></i> Active Reports
                  </h5>
                  
                  <div className="bg-light rounded-4 p-3 d-flex justify-content-between align-items-center border" style={{ border: '1px solid #eee' }}>
                    <div>
                        <strong className="d-block" style={{ color: theme.primary }}>Blue Hydro Flask</strong>
                        <span className="small text-muted">Reported: Oct 24, 2023</span>
                    </div>
                    <button className="btn btn-success fw-bold rounded-pill px-4 shadow-sm border-0">Mark as Recovered</button>
                  </div>
                </div>

                <div className="card border-0 shadow-sm rounded-4 p-4" 
                     style={{ 
                         backgroundColor: 'rgba(255, 255, 255, 0.7)', 
                         backdropFilter: 'blur(10px)', 
                         border: '1px solid rgba(255, 255, 255, 0.3)'
                     }}>
                  <h5 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: theme.primary }}>
                    <i className="bi bi-folder me-1 text-warning opacity-75"></i> Claim History
                  </h5>
                  
                  <table className="table custom-table align-middle mb-0 table-hover">
                    <thead className="small text-muted text-uppercase">
                        <tr style={{ borderBottom: `2px solid ${theme.accent}33` }}>
                            <th className="pb-3 border-0">Item</th>
                            <th className="pb-3 border-0 text-center">Date Reported</th>
                            <th className="pb-3 border-0 text-end">Current Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-3"><strong style={{ color: theme.primary }}>Black Leather Wallet</strong></td>
                            <td className="small text-muted text-center">Oct 26, 2023</td>
                            <td className="text-end">
                                <span className="badge px-3 py-2 rounded-pill" style={{ backgroundColor: theme.warningBg, color: theme.warning }}>
                                  <i className="bi bi-clock me-2"></i> Pending Review
                                </span>
                            </td>
                        </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>

      <style>{`
        .custom-table tbody tr:hover {
          background-color: rgba(197, 160, 89, 0.05) !important;
          transition: background-color 0.2s ease;
        }
        .custom-content .card:hover {
          transform: translateY(-2px);
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default Profile;