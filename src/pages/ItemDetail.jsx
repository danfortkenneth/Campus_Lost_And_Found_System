import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import clafLogo from '../assets/claf.png'; 

const ItemDetail = () => {
  const navigate = useNavigate();

  const theme = {
    primary: "#003366",
    secondary: "#002244",
    accent: "#c5a059",
    success: "#28a745",
    mutedbg: "rgba(255, 255, 255, 0.7)"
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
            <Link 
              className="nav-link rounded px-3 py-2 text-decoration-none d-flex align-items-center gap-2 shadow-sm" 
              style={{ backgroundColor: theme.accent, color: theme.primary, fontWeight: 'bold' }} 
              to="/dashboard"
            >
              <i className="bi bi-arrow-left-circle me-1"></i> Back to Gallery
            </Link>
            
            <Link className="nav-link text-white-50 px-3 py-2 text-decoration-none d-flex align-items-center gap-2" to="/profile">
              <i className="bi bi-person me-1"></i> My Profile
            </Link>
            
            <Link className="nav-link text-white-50 px-3 py-2 text-decoration-none fw-bold d-flex align-items-center gap-2" to="/admin-panel">
              🛡️ Admin Panel
            </Link>
          </nav>
        </div>
        
        <div className="mt-auto position-relative" style={{ zIndex: 1 }}>
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
            opacity: '0.015', 
            pointerEvents: 'none',
            zIndex: '0'
          }}
        />

        <div className="position-relative" style={{ zIndex: 1 }}>
          <div className="mb-5 d-flex justify-content-between align-items-start">
              <div>
                <p className="text-muted m-0 small">Item Specification</p>
                <h2 className="fw-bold m-0 mt-1" style={{ color: theme.primary }}>Item Details</h2>
              </div>
              <span className="badge rounded-pill px-4 py-2 mt-2" style={{ backgroundColor: '#e5f9e0', color: theme.success }}>
                  <i className="bi bi-search me-2"></i> Found Item
              </span>
          </div>

          <div className="row g-4">
            
            <div className="col-md-5">
              <div className="card border-0 shadow-sm rounded-4 h-100 d-flex align-items-center justify-content-center p-5 text-center" 
                   style={{ 
                       backgroundColor: theme.mutedbg, 
                       backdropFilter: 'blur(10px)', 
                       border: '1px solid rgba(255, 255, 255, 0.3)'
                   }}>
                <img 
                    src="https://img.icons8.com/isometric/100/camera.png" 
                    alt="Placeholder" 
                    className="mb-4 opacity-75" 
                    style={{ width: '100px' }}
                />
                <h6 className="fw-bold text-muted">Item Photo</h6>
                <p className="text-muted small">No visual assets attached</p>
              </div>
            </div>

            <div className="col-md-7">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100" 
                   style={{ 
                       backgroundColor: theme.mutedbg, 
                       backdropFilter: 'blur(10px)', 
                       border: '1px solid rgba(255, 255, 255, 0.3)'
                   }}>
                
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="fw-bold m-0" style={{ color: theme.primary }}>Black Leather Wallet</h3>
                    <span className="small text-muted fw-bold">ID: #CLAF-9921</span>
                </div>

                <div className="mb-4">
                    <p className="text-muted m-0 small d-flex align-items-center gap-2">
                        <i className="bi bi-geo-alt-fill text-danger opacity-75"></i> Canteen Area
                    </p>
                    <p className="text-muted m-0 small mt-1 d-flex align-items-center gap-2">
                        <i className="bi bi-calendar3 text-primary opacity-75"></i> October 25, 2023
                    </p>
                </div>
                
                <hr style={{ backgroundColor: theme.accent, opacity: 0.2 }} className="my-3" />

                <label className="small fw-bold text-muted mb-2 text-uppercase">Public Description</label>
                <div className="bg-light rounded-3 p-3 mb-4 border" style={{ border: '1px solid #eee' }}>
                    <p className="m-0 text-muted small">
                        Located near the water station. Contains various identification cards and cash.
                    </p>
                </div>

                <div className="row g-3 mb-4">
                    <div className="col-6">
                        <label className="small fw-bold text-muted text-uppercase mb-1">Category</label>
                        <p className="fw-bold m-0" style={{ color: theme.primary }}>Personal</p>
                    </div>
                    <div className="col-6">
                        <label className="small fw-bold text-muted text-uppercase mb-1">Reported By</label>
                        <p className="fw-bold m-0" style={{ color: theme.primary }}>Sherlyn Cordez</p>
                    </div>
                </div>

                <div className="mt-auto">
                    <button 
                        className="btn w-100 fw-bold py-3 rounded-pill text-white shadow" 
                        style={{ backgroundColor: theme.primary, letterSpacing: '0.5px' }}
                    >
                        <i className="bi bi-hand-index-thumb me-2"></i> Claim This Item
                    </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>

      <style>{`
        .custom-content .card:hover {
          transform: translateY(-2px);
          transition: all 0.3s ease;
        }
        .btn:hover {
            filter: brightness(1.1);
            transition: filter 0.2s ease;
        }
      `}</style>
    </div>
  );
};

export default ItemDetail;