import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clafLogo from '../assets/claf.png';
import puzzleHero from '../assets/fl.png'; 

const Login = () => {
    const navigate = useNavigate();

    const branding = {
        primary: "#003366", 
        accent: "#c5a059"
    };

    const onSignIn = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="row shadow-lg bg-white rounded-4 overflow-hidden w-100" style={{ maxWidth: '1000px', minHeight: '600px' }}>
                
                <div className="col-md-6 p-5">
                    <div className="text-center mb-5">
                        <img src={clafLogo} alt="CLAF" style={{ width: '130px' }} className="img-fluid mb-3" />
                        <h4 className="fw-bold mt-2" style={{ color: branding.primary, letterSpacing: '1px' }}>CAMPUS LOST & FOUND</h4>
                        <div className="mx-auto" style={{ width: '80px', height: '4px', backgroundColor: branding.accent, borderRadius: '2px' }}></div>
                    </div>

                    <h2 className="fw-bold mb-1" style={{ color: branding.primary }}>Welcome Back</h2>
                    <p className="text-muted mb-4 small">Find what's lost, return what's found.</p>
                    
                    <form onSubmit={onSignIn}>
                        <div className="mb-3">
                            <label className="form-label fw-bold small" style={{ color: branding.primary }}>Email address</label>
                            <input type="email" className="form-control form-control-lg bg-light border-0 fs-6 shadow-sm" placeholder="name@neu.edu.ph" required />
                        </div>
                        <div className="mb-4">
                            <label className="form-label fw-bold small" style={{ color: branding.primary }}>Password</label>
                            <input type="password" className="form-control form-control-lg bg-light border-0 fs-6 shadow-sm" placeholder="••••••••••••" required />
                        </div>

                        <div className="d-flex justify-content-between mb-4 mt-2">
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="remember" />
                                <label className="form-check-label small" htmlFor="remember">Remember me</label>
                            </div>
                            <a href="#" className="small text-decoration-none fw-bold" style={{ color: branding.accent }}>Forgot password?</a>
                        </div>

                        <button type="submit" className="btn btn-lg w-100 fw-bold mb-3 shadow text-white" style={{ backgroundColor: branding.primary }}>
                            Sign In
                        </button>
                    </form>
                    
                    <p className="text-center small text-secondary">
                        Don't have an account? <Link to="/signup" className="fw-bold text-decoration-none" style={{ color: branding.primary }}>Sign up</Link>
                    </p>
                </div>

                <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center p-0 position-relative">
                    <img 
                        src={puzzleHero} 
                        alt="Background" 
                        className="w-100 h-100 object-fit-cover position-absolute top-0 start-0" 
                    />
                    
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
                        <p className="fs-5 fw-light text-white">Efficiently connecting lost items to their rightful owners on campus.</p>
                        <hr className="mx-auto" style={{ width: '50px', borderColor: branding.accent, borderWidth: '3px' }} />
                        <p className="small mt-4 text-white opacity-75">New Era University • Lost & Found System</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;