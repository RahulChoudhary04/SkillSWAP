import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserCard = ({ user, onRequest }) => {
  const { user: currentUser } = useAuth();

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '?';
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    
    if (hasHalfStar) {
      stars.push('☆');
    }
    
    while (stars.length < 5) {
      stars.push('☆');
    }
    
    return stars.join('');
  };

  const handleRequest = (e) => {
    e.preventDefault();
    if (onRequest) {
      onRequest(user);
    }
  };

  return (
    <div className="user-card">
      <div className="user-card-header">
        <div className="user-info">
          <div className="profile-pic">
            {getInitials(user.name)}
          </div>
          <div className="user-details">
            <h3>{user.name}</h3>
            <p>{user.location}</p>
          </div>
        </div>
        
        {currentUser && currentUser.id !== user.id && (
          <Link 
            to={`/request/${user.id}`}
            className="btn btn-primary"
            onClick={handleRequest}
          >
            Request
          </Link>
        )}
      </div>
      
      <div className="skills-section">
        <div className="skills-column">
          <h4>Skills Offered</h4>
          <div className="skills-list">
            {user.skillsOffered?.map((skill, index) => (
              <span key={index} className="skill-tag skill-offered">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div className="skills-column">
          <h4>Skills Wanted</h4>
          <div className="skills-list">
            {user.skillsWanted?.map((skill, index) => (
              <span key={index} className="skill-tag skill-wanted">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="rating">
        <span className="rating-stars">{renderStars(user.rating)}</span>
        <span className="rating-text">
          {user.rating.toFixed(1)}/5 ({user.reviewCount} reviews)
        </span>
      </div>
    </div>
  );
};

export default UserCard;