import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import SignupForm from './SignupForm';
import Login from './Login1';
import HomeTodo from './HomeTodo';
import Navbar from './Navbar';
import ProtectedRoute from './ProtectedRoute';
import './App.css';

const ConditionalNavbar = React.memo(() => {
  const location = useLocation();
  if (location.pathname === '/home') {
    return <Navbar />;
  }
  return null;
});

const UnprotectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (token) {
    return <Navigate to="/home" />;
  }
  return children;
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <ConditionalNavbar />
        <Routes>
          <Route path="/register" element={
            <UnprotectedRoute>
              <SignupForm />
            </UnprotectedRoute>
          } />
          <Route path="/login" element={
            <UnprotectedRoute>
              <Login />
            </UnprotectedRoute>
          } />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/home" element={
            <ProtectedRoute>
              <HomeTodo />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default React.memo(App);
