import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clafLogo from '../assets/claf.png';
import puzzleHero from '../assets/fl.png'; 
import { signupUser } from '../api/authService'; 

const Signup = () => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [adminSecret, setAdminSecret] = useState('');
    const [loading, setLoading] = useState(false); 

    const branding = { primary: "#003366", accent: "#c5a059" };

    // ─── REFACTORED SIGNUP LOGIC ────────────────────────────────
    const onRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
          
            const data = await signupUser({ 
                name: fullName, 
                studentId, 
                email, 
                password,
                adminSecret 
            });

            if (data.success) {
                alert(data.message); 
                navigate('/'); 
            }
        } catch (err) { 
            
            alert(err.message || "Signup failed. Please check your connection."); 
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid vh-100 p-0 d-flex align-items-center justify-content-center bg-light">
            <div className="row shadow-lg bg-white rounded-4 overflow-hidden w-100 m-2" style={{ maxWidth: '1000px', minHeight: '650px' }}>
                
                {/* LEFT SIDE: FORM */}
                <div className="col-md-6 p-4 p-md-5">
                    <div className="text-center mb-4">
                        <img src={clafLogo} alt="Logo" style={{ width: '80px' }} className="img-fluid mb-2" />
                        <h5 className="fw-bold" style={{ color: branding.primary }}>CAMPUS LOST & FOUND</h5>
                        <div className="mx-auto" style={{ width: '50px', height: '3px', backgroundColor: branding.accent }}></div>
                    </div>

                    <h2 className="fw-bold mb-1" style={{ color: branding.primary }}>Create an Account</h2>
                    <p className="text-muted mb-4 small">Join the community and help return lost items.</p>
                    
                    <form onSubmit={onRegister}>
                        <div className="mb-2">
                            <label className="form-label fw-bold small">Full Name</label>
                            <input type="text" className="form-control bg-light border-0 shadow-sm" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                        </div>
                        <div className="mb-2">
                            <label className="form-label fw-bold small">Student ID Number</label>
                            <input type="text" className="form-control bg-light border-0 shadow-sm" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
                        </div>
                        <div className="mb-2">
                            <label className="form-label fw-bold small">University Email</label>
                            <input type="email" className="form-control bg-light border-0 shadow-sm" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-2">
                            <label className="form-label fw-bold small">Password</label>
                            <input type="password" className="form-control bg-light border-0 shadow-sm" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold small text-muted">Admin Key (Optional)</label>
                            <input 
                                type="password" 
                                className="form-control bg-light border-0 shadow-sm" 
                                placeholder="Enter code for admin access"
                                value={adminSecret} 
                                onChange={(e) => setAdminSecret(e.target.value)} 
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-lg w-100 fw-bold mb-3 shadow text-white" 
                            style={{ backgroundColor: branding.primary, border: 'none' }}
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>
                    
                    <p className="text-center small text-secondary">
                        Already have an account? <Link to="/" className="fw-bold text-decoration-none" style={{ color: branding.primary }}>Sign in</Link>
                    </p>
                </div>

                {/* RIGHT SIDE: HERO SECTION */}
                <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center p-0 position-relative">
                    <img src={puzzleHero} alt="Hero" className="w-100 h-100 object-fit-cover position-absolute top-0 start-0" />
                    <div className="w-100 h-100 position-absolute" style={{ backgroundColor: branding.primary, opacity: '0.7', zIndex: 1 }}></div>
                    
                    <div className="text-center p-5 position-relative" style={{ zIndex: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', borderRadius: '15px', border: '1px solid rgba(255, 255, 255, 0.2)', margin: '20px' }}>
                        <h1 className="display-5 fw-bold mb-3" style={{ color: branding.accent }}>Item Hunters</h1>
                        <p className="fs-5 fw-light text-white">Join the community in keeping our campus organized and helpful.</p>
                        <hr className="mx-auto" style={{ width: '50px', borderColor: branding.accent, borderWidth: '3px' }} />
                        <p className="small mt-4 text-white opacity-75">New Era University • Lost & Found System</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Signup;