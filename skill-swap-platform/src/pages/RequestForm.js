import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useNavigate, useParams } from 'react-router-dom';

const RequestForm = () => {
  const { user } = useAuth();
  const { createRequest, getUserById } = useData();
  const navigate = useNavigate();
  const { userId } = useParams();
  const [targetUser, setTargetUser] = useState(null);
  const [formData, setFormData] = useState({
    skillOffered: '',
    skillWanted: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (userId) {
      const foundUser = getUserById(userId);
      if (foundUser) {
        setTargetUser(foundUser);
      } else {
        setError('User not found');
      }
    }
  }, [user, userId, getUserById, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.skillOffered || !formData.skillWanted) {
      setError('Please select both skills for the swap.');
      setLoading(false);
      return;
    }

    if (!formData.message.trim()) {
      setError('Please include a message with your request.');
      setLoading(false);
      return;
    }

    try {
      const requestData = {
        fromUserId: user.id,
        toUserId: targetUser.id,
        skillOffered: formData.skillOffered,
        skillWanted: formData.skillWanted,
        message: formData.message.trim()
      };

      createRequest(requestData);
      navigate('/requests', { 
        state: { message: 'Request sent successfully!' } 
      });
    } catch (err) {
      setError('Failed to send request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '?';
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  if (error && !targetUser) {
    return (
      <div className="container">
        <div className="error-message" style={{ textAlign: 'center', marginTop: '50px' }}>
          {error}
        </div>
      </div>
    );
  }

  if (!targetUser) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="request-form-container" style={{ display: 'flex', gap: '30px', maxWidth: '1000px', margin: '0 auto' }}>
        {/* Request Form */}
        <div className="form-container" style={{ flex: '1', margin: '0' }}>
          <h2>Send Skill Swap Request</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="skillOffered">Choose one of your offered skills</label>
              <select
                id="skillOffered"
                name="skillOffered"
                value={formData.skillOffered}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">Select a skill you offer</option>
                {user.skillsOffered?.map((skill, index) => (
                  <option key={index} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="skillWanted">Choose one of their wanted skills</label>
              <select
                id="skillWanted"
                name="skillWanted"
                value={formData.skillWanted}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">Select a skill they want</option>
                {targetUser.skillsWanted?.map((skill, index) => (
                  <option key={index} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Introduce yourself and explain how you'd like to collaborate..."
                rows="6"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Sending...' : 'Submit Request'}
            </button>
          </form>
        </div>

        {/* User Profile Preview */}
        <div className="user-profile-preview" style={{ flex: '1' }}>
          <div className="user-card">
            <div className="user-card-header">
              <div className="user-info">
                <div className="profile-pic">
                  {getInitials(targetUser.name)}
                </div>
                <div className="user-details">
                  <h3>{targetUser.name}</h3>
                  <p>{targetUser.location}</p>
                </div>
              </div>
            </div>
            
            <div className="skills-section">
              <div className="skills-column">
                <h4>Skills Offered</h4>
                <div className="skills-list">
                  {targetUser.skillsOffered?.map((skill, index) => (
                    <span key={index} className="skill-tag skill-offered">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="skills-column">
                <h4>Skills Wanted</h4>
                <div className="skills-list">
                  {targetUser.skillsWanted?.map((skill, index) => (
                    <span key={index} className="skill-tag skill-wanted">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rating-feedback-section">
              <h4>Rating and Feedback</h4>
              <div className="rating">
                <span className="rating-stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} style={{ color: i < Math.floor(targetUser.rating) ? '#ffc107' : '#666' }}>
                      {i < Math.floor(targetUser.rating) ? '★' : '☆'}
                    </span>
                  ))}
                </span>
                <span className="rating-text">
                  {targetUser.rating.toFixed(1)}/5 ({targetUser.reviewCount} reviews)
                </span>
              </div>
              
              <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#333', borderRadius: '8px' }}>
                <p style={{ color: '#aaa', fontSize: '14px', margin: 0 }}>
                  This is where feedback and reviews would be displayed in a full implementation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;