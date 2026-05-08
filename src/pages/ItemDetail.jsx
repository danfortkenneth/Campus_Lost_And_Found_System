import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import clafLogo from '../assets/claf.png'; 
import { submitClaim } from '../api/claimService'; 

const ItemDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  
  const item = location.state?.item;
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!item) {
      navigate('/dashboard');
    }
  }, [item, navigate]);

  const theme = {
    primary: "#003366",
    secondary: "#002244",
    accent: "#c5a059",
    success: "#28a745",
    danger: "#dc3545",
    mutedbg: "rgba(255, 255, 255, 0.7)"
  };

  // Helper function para malaman kung ang item ay recovered na
  const isRecovered = item?.status?.toLowerCase() === 'claimed';

  const handleClaim = async () => {
    if (!user) {
        alert("Please log in to claim items.");
        return;
    }

    // Security check: Pigilan ang claim process kung claimed na ang item
    if (isRecovered) {
        alert("This item has already been recovered by its owner.");
        return;
    }

    const isConfirmed = window.confirm(
      `CONFIRM CLAIM: You are submitting a claim as ${user.name.toUpperCase()}.\n\nIs this information correct?`
    );

    if (!isConfirmed) return;

    const proof = prompt("VERIFICATION: Briefly describe a unique mark, content, or detail of this item to prove ownership:");

    if (!proof || proof.trim() === "") {
        alert("Claim cancelled. You must provide proof of ownership.");
        return;
    }

    setLoading(true);
    try {
      const payload = {
        itemId: item._id,
        claimerName: user.name,
        claimerId: user.studentId || user._id || user.id, 
        proof: proof
      };

      const result = await submitClaim(payload);

      if (result.success) {
        alert("Claim request sent! Once approved, the item will be marked as RECOVERED. ✅");
        navigate('/dashboard'); 
      }
    } catch (err) {
      alert(err.message || "Failed to submit claim. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!item) return null;

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
            <Link className="nav-link rounded px-3 py-2 text-decoration-none shadow-sm" 
                  style={{ backgroundColor: theme.accent, color: theme.primary, fontWeight: 'bold' }} to="/dashboard">
              <i className="bi bi-grid-fill me-2"></i> Back to Gallery
            </Link>
            <Link className="nav-link text-white-50 px-3 py-2 text-decoration-none" to="/profile">
              <i className="bi bi-person-circle me-2"></i> My Profile
            </Link>
          </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow-1 p-4 p-md-5 overflow-auto bg-white">
          <div className="mb-5 d-flex justify-content-between align-items-start">
              <div>
                <p className="text-muted m-0 small">Item Specification</p>
                <h2 className="fw-bold m-0 mt-1" style={{ color: theme.primary }}>Item Details</h2>
              </div>
              
              {/* Dynamic Badge: Green if Recovered, Red if Lost, Light Green if Found */}
              <span className="badge rounded-pill px-4 py-2 mt-2" 
                    style={{ 
                        backgroundColor: isRecovered ? theme.success : (item.status.toLowerCase() === 'found' ? '#e5f9e0' : '#ffe5e5'), 
                        color: isRecovered ? '#fff' : (item.status.toLowerCase() === 'found' ? theme.success : theme.danger),
                        border: isRecovered ? 'none' : `1px solid ${item.status.toLowerCase() === 'found' ? theme.success : theme.danger}`
                    }}>
                  <i className={`bi ${isRecovered ? 'bi-check-circle-fill' : 'bi-info-circle'} me-2`}></i>
                  {isRecovered ? 'RECOVERED' : `${item.status.toUpperCase()} ITEM`}
              </span>
          </div>

          <div className="row g-4">
            {/* Left Column: Image/Placeholder */}
            <div className="col-md-5">
              <div className="card border-0 shadow-sm rounded-4 h-100 d-flex align-items-center justify-content-center p-5 text-center bg-light">
                <img 
                  src={isRecovered ? "https://img.icons8.com/isometric/100/checked-user-male.png" : "https://img.icons8.com/isometric/100/camera.png"} 
                  alt="Status Icon" 
                  className="mb-4 opacity-75" 
                  style={{ width: '80px' }} 
                />
                <h6 className="fw-bold text-muted">{isRecovered ? 'Item Successfully Returned' : 'No Photo Available'}</h6>
                <p className="small text-muted px-3">
                    {isRecovered 
                      ? 'This record is kept for administrative transparency and proof of recovery.' 
                      : 'Images are only visible to authorized personnel for security and privacy reasons.'}
                </p>
              </div>
            </div>

            {/* Right Column: Information details */}
            <div className="col-md-7">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100" style={{ backgroundColor: theme.mutedbg }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="fw-bold m-0" style={{ color: theme.primary }}>{item.title}</h3>
                    <span className="small text-muted fw-bold bg-white px-2 py-1 rounded shadow-sm border">
                        ID: #{item._id.slice(-6).toUpperCase()}
                    </span>
                </div>

                <div className="mb-4 small text-muted d-flex gap-4 flex-wrap">
                    <span><i className="bi bi-geo-alt-fill text-danger me-2"></i> {item.location}</span>
                    <span><i className="bi bi-calendar3 text-primary me-2"></i> {new Date(item.dateFound).toLocaleDateString()}</span>
                    <span><i className="bi bi-tag-fill text-warning me-2"></i> {item.category}</span>
                </div>
                
                <hr className="my-3 opacity-10" />

                <div className="mb-4">
                    <label className="small fw-bold text-muted mb-2 text-uppercase d-block">Public Description</label>
                    <div className="bg-white rounded-3 p-3 border shadow-sm" style={{ minHeight: '100px' }}>
                        <p className="m-0 text-dark" style={{ lineHeight: '1.6' }}>{item.description}</p>
                    </div>
                </div>

                <div className="alert border-0 rounded-3 mb-5" style={{ backgroundColor: isRecovered ? '#e5f9e0' : '#fff3cd', color: isRecovered ? theme.success : '#856404' }}>
                   <div className="d-flex align-items-center gap-2 fw-bold small">
                      <i className={`bi ${isRecovered ? 'bi-patch-check-fill' : 'bi-exclamation-triangle-fill'}`}></i>
                      {isRecovered ? 'TRANSACTION COMPLETED: Item returned to its rightful owner.' : 'NOTE: Claiming items requires verification and proof of ownership.'}
                   </div>
                </div>

                <div className="mt-auto">
                    {/* Final Button Logic: Disabled if Recovered */}
                    <button 
                        onClick={handleClaim}
                        disabled={loading || isRecovered}
                        className="btn w-100 fw-bold py-3 rounded-pill text-white shadow-sm border-0 transition-all" 
                        style={{ 
                            backgroundColor: isRecovered ? '#6c757d' : theme.primary,
                            cursor: isRecovered ? 'not-allowed' : 'pointer',
                            opacity: isRecovered ? 0.8 : 1
                        }}
                    >
                        {loading ? (
                          <span className="spinner-border spinner-border-sm me-2"></span>
                        ) : (
                          <i className={`bi ${isRecovered ? 'bi-lock-fill' : 'bi-hand-index-thumb-fill'} me-2`}></i>
                        )}
                        {isRecovered ? 'ALREADY RECOVERED' : 'Claim This Item'}
                    </button>
                    
                    {isRecovered && (
                      <p className="text-center small mt-2 text-muted fw-bold">
                        This item is no longer available for claim.
                      </p>
                    )}
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default ItemDetail;