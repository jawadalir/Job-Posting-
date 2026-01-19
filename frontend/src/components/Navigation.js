import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/App.css';

const Navigation = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  let userData = null;
  try {
    userData = user ? JSON.parse(user) : null;
  } catch (e) {
    userData = null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          JobBoard
        </Link>

        <div className="nav-menu">
          {token && (
            <Link to="/jobs" className="nav-link">
              Browse Jobs
            </Link>
          )}

          {token ? (
            <>
              <Link to="/post-job" className="nav-link">
                Post Job
              </Link>
              <span className="nav-user">
                Welcome, {userData?.fullName || 'User'}
              </span>
              <button onClick={handleLogout} className="btn btn-logout">
                Logout
              </button>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
