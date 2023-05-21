import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import Spinner from './components/Spinner';
import { useSelector } from 'react-redux';
import BarberForm from './pages/BarberForm';

function App() {
  const { loading } = useSelector(state => state.loader)
  return (
    <div>
      {loading && <Spinner />}
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/apply-doctor' element={<ProtectedRoute><BarberForm /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
