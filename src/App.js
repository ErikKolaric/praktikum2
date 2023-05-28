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
import Admin from './pages/Admin';
import BookAppointment from './pages/BookAppointment';

function App() {
  const { loading } = useSelector(state => state.loader)
  return (
    <div>
      {loading && <Spinner />}
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<ProtectedRoute><Login /></ProtectedRoute>} />
          <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/book-appointment/:id' element={<ProtectedRoute><BookAppointment /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/apply-barber' element={<ProtectedRoute><BarberForm /></ProtectedRoute>} />
          <Route path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
