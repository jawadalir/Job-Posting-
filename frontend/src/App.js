import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';
import JobList from './components/JobList';
import JobForm from './components/JobForm';
import JobDetail from './components/JobDetail';
import EditJob from './components/EditJob';
import MyJobs from './components/MyJobs';
import './styles/App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

// Route that redirects to login if not authenticated
const AuthRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/jobs" /> : children;
};

function App() {
  const isLoginPage = window.location.pathname === '/login';
  const isRegisterPage = window.location.pathname === '/register';

  return (
    <Router>
      {!isLoginPage && !isRegisterPage && <Navigation />}
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
        <Route path="/register" element={<AuthRoute><Register /></AuthRoute>} />

        {/* Job Routes */}
        <Route path="/jobs" element={<ProtectedRoute><JobList /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Protected Routes */}
        <Route
          path="/post-job"
          element={
            <ProtectedRoute>
              <JobForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-jobs"
          element={
            <ProtectedRoute>
              <MyJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:id"
          element={<JobDetail />}
        />
        <Route
          path="/edit-job/:id"
          element={
            <ProtectedRoute>
              <EditJob />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
