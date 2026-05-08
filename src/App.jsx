import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ItemDetail from './pages/ItemDetail';
import Profile from './pages/Profile';
import AdminSecurity from './pages/AdminSecurity';


const AdminRoute = ({ children }) => {
  
  const userData = localStorage.getItem('user');
  
  let user = null;
  try {
    
    user = userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    user = null;
  }

 
  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected/General Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/item-detail" element={<ItemDetail />} />
        <Route path="/profile" element={<Profile />} />
        
        {}
        <Route 
          path="/admin-panel" 
          element={
            <AdminRoute>
              <AdminSecurity />
            </AdminRoute>
          } 
        />
        
        {}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;