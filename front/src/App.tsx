import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>

      <Route path='/' element={localStorage.getItem('token') ? <Navigate to='/dashboard' /> : <Navigate to='/login' />} />

        <Route path='/login' element={<Login />} />
        {localStorage.getItem('token') ? (
          <Route path='/dashboard' element={<Dashboard />} />
        ) : (
          <Route path='*' element={<Navigate to='/login' />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;