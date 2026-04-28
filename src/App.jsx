import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ItemDetail from './pages/ItemDetail';
import Profile from './pages/Profile';
import AdminSecurity from './pages/AdminSecurity';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/item-detail" element={<ItemDetail />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* Isang route na lang para sa Admin Hub */}
        <Route path="/admin-panel" element={<AdminSecurity />} />
        
        {/* Catch-all: Pag mali ang URL, balik sa Login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;