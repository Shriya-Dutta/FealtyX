import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import { useSelector } from 'react-redux';

function App() {

  const { isAuthenticated } = useSelector((state) => state.auth);

  console.log(isAuthenticated);

  return (
    <Router>
      <Routes>

        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />

        <Route 
          path="/login" 
          element={<Login />} />

        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />

      </Routes>
    </Router>
  );
}

export default App;
