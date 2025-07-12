import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '?';
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          Skill Swap Platform
        </Link>
        
        <div className="nav-buttons">
          {user ? (
            <>
              <Link to="/profile" className="btn btn-secondary">
                Profile
              </Link>
              <Link to="/requests" className="btn btn-secondary">
                Requests
              </Link>
              <div className="user-avatar">
                {getInitials(user.name)}
              </div>
              <button onClick={handleLogout} className="btn btn-outline">
                Logout
              </button>
            </>
          ) : (
            <>
              {location.pathname !== '/login' && (
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
              )}
              {location.pathname === '/login' && (
                <Link to="/" className="btn btn-secondary">
                  Home
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;