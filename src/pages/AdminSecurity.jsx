import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import clafLogo from '../assets/claf.png'; 

const AdminSecurity = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('users');

  const navyBlue = "#003366";
  const darkNavy = "#002244"; 
  const goldColor = "#c5a059";

  return (
    <div className="container-fluid vh-100 p-0 d-flex bg-light text-dark overflow-hidden">
      
      <div className="p-4 d-none d-md-flex flex-column shadow-lg text-white position-relative overflow-hidden" 
           style={{ 
             width: '280px', 
             background: `linear-gradient(180deg, ${navyBlue} 0%, ${darkNavy} 100%)`, 
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
              <h4 className="fw-bold m-0" style={{ color: goldColor, letterSpacing: '1px' }}>CLAF Admin</h4>
          </div>

          <nav className="nav flex-column gap-2">
            <Link className="nav-link text-white-50 px-3 py-2 text-decoration-none d-flex align-items-center gap-2" to="/dashboard">
              <i className="bi bi-arrow-left-circle me-1"></i> Back to Gallery
            </Link>
            
            <hr style={{ backgroundColor: goldColor, opacity: 0.3 }} />

            <button 
              className={`nav-link border-0 text-start rounded px-3 py-2 d-flex align-items-center gap-2 mb-2 transition-all ${view === 'claims' ? 'shadow-sm' : 'text-white-50 bg-transparent'}`}
              style={view === 'claims' ? { backgroundColor: goldColor, color: navyBlue, fontWeight: 'bold' } : {}}
              onClick={() => setView('claims')}
            >
              <i className="bi bi-clipboard-check me-1"></i> Manage Claims
            </button>
            
            <button 
              className={`nav-link border-0 text-start rounded px-3 py-2 d-flex align-items-center gap-2 transition-all ${view === 'users' ? 'shadow-sm' : 'text-white-50 bg-transparent'}`}
              style={view === 'users' ? { backgroundColor: goldColor, color: navyBlue, fontWeight: 'bold' } : {}}
              onClick={() => setView('users')}
            >
              <i className="bi bi-people-fill me-1"></i> User Management
            </button>
          </nav>
        </div>
        
        <div className="mt-auto position-relative" style={{ zIndex: 1 }}>
            <Link to="/" className="nav-link text-danger px-3 py-2 small fw-bold text-decoration-none d-flex align-items-center gap-2">
                <i className="bi bi-box-arrow-left me-1"></i> Logout
            </Link>
        </div>
      </div>

      <div className="flex-grow-1 p-4 p-md-5 overflow-auto position-relative bg-white">
        
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
            width: '550px',
            height: '550px',
            opacity: '0.02', 
            pointerEvents: 'none',
            zIndex: '0'
          }}
        />

        <div className="position-relative" style={{ zIndex: 1 }}>
          <div className="mb-5">
              <p className="text-muted m-0 small">Administrative Control Panel</p>
              <h2 className="fw-bold m-0 mt-1" style={{ color: navyBlue }}>
                {view === 'users' ? 'User Accounts Control' : 'Claim Verification'}
              </h2>
          </div>

          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4" 
               style={{ 
                   backgroundColor: 'rgba(255, 255, 255, 0.7)', 
                   backdropFilter: 'blur(10px)', 
                   border: '1px solid rgba(255, 255, 255, 0.3)'
               }}>
            
            <table className="table custom-table align-middle mb-0">
              <thead className="small text-muted text-uppercase">
                <tr style={{ borderBottom: `2px solid ${goldColor}33` }}>
                  <th className="pb-3 border-0">{view === 'users' ? 'Student Name' : 'Item Name'}</th>
                  <th className="pb-3 border-0 text-center">{view === 'users' ? 'ID Number' : 'Claimer Name'}</th>
                  <th className="pb-3 border-0 text-center">Status</th>
                  <th className="pb-3 border-0 text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {view === 'users' ? (
                  <tr>
                    <td className="py-4">
                      <div className="d-flex align-items-center gap-3">
                          <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold shadow-sm" style={{ width: '35px', height: '35px', fontSize: '12px' }}>DG</div>
                          <strong style={{ color: navyBlue }}>Danfort Garcia</strong>
                      </div>
                    </td>
                    <td className="text-center text-muted fw-bold">1811761573</td>
                    <td className="text-center">
                      <span className="badge px-3 py-2 rounded-pill" style={{ backgroundColor: '#e5f9e0', color: '#28a745' }}>
                          <i className="bi bi-patch-check-fill me-1"></i> Verified
                      </span>
                    </td>
                    <td className="text-end">
                      <div className="d-flex gap-2 justify-content-end">
                          <button className="btn btn-sm btn-outline-secondary rounded-pill px-3 border-0 bg-light fw-bold">Edit</button>
                          <button className="btn btn-sm btn-danger rounded-pill px-3 shadow-sm fw-bold border-0" style={{ backgroundColor: '#d9534f' }}>Block Account</button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td className="py-4"><strong style={{ color: navyBlue }}>Black Leather Wallet</strong></td>
                    <td className="text-center text-muted">Danfort Garcia</td>
                    <td className="text-center">
                      <span className="badge px-3 py-2 rounded-pill" style={{ backgroundColor: '#fff3cd', color: '#856404' }}>
                        Pending Review
                      </span>
                    </td>
                    <td className="text-end">
                      <div className="d-flex gap-2 justify-content-end">
                          <button className="btn btn-sm btn-success rounded-pill px-3 shadow-sm border-0 fw-bold">Approve</button>
                          <button className="btn btn-sm btn-outline-danger rounded-pill px-3 border-0 bg-light fw-bold">Reject</button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="row g-4">
              <div className="col-md-4">
                  <div className="card border-0 shadow-sm rounded-4 p-3 bg-white d-flex flex-row align-items-center gap-3 card-hover">
                      <div className="rounded-4 p-3" style={{ backgroundColor: `${navyBlue}15`, color: navyBlue }}>
                        <i className="bi bi-people h4 m-0"></i>
                      </div>
                      <div>
                          <p className="text-muted small m-0">Total Users</p>
                          <h4 className="fw-bold m-0" style={{ color: navyBlue }}>1,240</h4>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-table tbody tr:hover { background-color: rgba(197, 160, 89, 0.05) !important; transition: all 0.2s ease; }
        .card-hover:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.08) !important; transition: all 0.3s ease; }
      `}</style>
    </div>
  );
};

export default AdminSecurity;