import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import DashboardPage from './pages/DashboardPage';
import SignupLogin from './pages/SignupLoginPage';

const App = () => {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignupLogin />} />
          <Route path="/login" element={<SignupLogin />} />
          <Route path="/signup" element={<SignupLogin />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
