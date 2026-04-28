import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clafLogo from '../assets/claf.png';
import puzzleHero from '../assets/fl.png'; 

const Signup = () => {
    const navigate = useNavigate();

    const branding = {
        primary: "#003366", 
        accent: "#c5a059"
    };

    const onRegister = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="row shadow-lg bg-white rounded-4 overflow-hidden w-100" style={{ maxWidth: '1000px', minHeight: '650px' }}>
                
                <div className="col-md-6 p-5">
                    <div className="text-center mb-4">
                        <img src={clafLogo} alt="Logo" style={{ width: '100px' }} className="img-fluid mb-2" />
                        <h5 className="fw-bold" style={{ color: branding.primary }}>CAMPUS LOST & FOUND</h5>
                        <div className="mx-auto" style={{ width: '50px', height: '3px', backgroundColor: branding.accent }}></div>
                    </div>

                    <h2 className="fw-bold mb-1" style={{ color: branding.primary }}>Create an Account</h2>
                    <p className="text-muted mb-4 small">Please enter your details to register</p>
                    
                    <form onSubmit={onRegister}>
                        <div className="mb-3">
                            <label className="form-label fw-bold small" style={{ color: branding.primary }}>Full Name</label>
                            <input type="text" className="form-control bg-light border-0 shadow-sm" placeholder="Juan Dela Cruz" required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold small" style={{ color: branding.primary }}>Student ID Number</label>
                            <input type="text" className="form-control bg-light border-0 shadow-sm" placeholder="2023-XXXXX" required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold small" style={{ color: branding.primary }}>University Email</label>
                            <input type="email" className="form-control bg-light border-0 shadow-sm" placeholder="name@neu.edu.ph" required />
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold small" style={{ color: branding.primary }}>Password</label>
                            <input type="password" className="form-control bg-light border-0 shadow-sm" placeholder="••••••••••••" required />
                        </div>

                        <button type="submit" className="btn btn-lg w-100 fw-bold mb-3 shadow text-white" style={{ backgroundColor: branding.primary }}>
                            Sign Up
                        </button>
                    </form>
                    
                    <p className="text-center small text-secondary mt-2">
                        Already have an account? <Link to="/login" className="fw-bold text-decoration-none" style={{ color: branding.primary }}>Sign in</Link>
                    </p>
                </div>

                <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center p-0 position-relative">
                    <img src={puzzleHero} alt="Hero" className="w-100 h-100 object-fit-cover position-absolute top-0 start-0" />
                    
                    <div className="w-100 h-100 position-absolute" style={{ backgroundColor: branding.primary, opacity: '0.7', zIndex: 1 }}></div>
                    
                    <div 
                        className="text-center p-5 position-relative" 
                        style={{ 
                            zIndex: 2, 
                            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                            backdropFilter: 'blur(4px)', 
                            borderRadius: '15px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            margin: '20px'
                        }}
                    >
                        <h1 className="display-5 fw-bold mb-3" style={{ color: branding.accent }}>Item Hunters</h1>
                        <p className="fs-5 fw-light text-white">Join the community in keeping our campus organized and helpful.</p>
                        <hr className="mx-auto" style={{ width: '50px', borderColor: branding.accent, borderWeight: '3px' }} />
                        <p className="small mt-4 text-white opacity-75">New Era University • Lost & Found System</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;