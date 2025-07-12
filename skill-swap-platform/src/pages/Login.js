import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    location: '',
    skillsOffered: [],
    skillsWanted: [],
    availability: 'weekends'
  });
  const [newSkillOffered, setNewSkillOffered] = useState('');
  const [newSkillWanted, setNewSkillWanted] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addSkillOffered = () => {
    if (newSkillOffered.trim() && !formData.skillsOffered.includes(newSkillOffered.trim())) {
      setFormData({
        ...formData,
        skillsOffered: [...formData.skillsOffered, newSkillOffered.trim()]
      });
      setNewSkillOffered('');
    }
  };

  const addSkillWanted = () => {
    if (newSkillWanted.trim() && !formData.skillsWanted.includes(newSkillWanted.trim())) {
      setFormData({
        ...formData,
        skillsWanted: [...formData.skillsWanted, newSkillWanted.trim()]
      });
      setNewSkillWanted('');
    }
  };

  const removeSkillOffered = (skill) => {
    setFormData({
      ...formData,
      skillsOffered: formData.skillsOffered.filter(s => s !== skill)
    });
  };

  const removeSkillWanted = (skill) => {
    setFormData({
      ...formData,
      skillsWanted: formData.skillsWanted.filter(s => s !== skill)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegistering) {
        if (!formData.name || !formData.location) {
          setError('Name and location are required for registration.');
          setLoading(false);
          return;
        }
        
        const result = register(formData);
        if (result.success) {
          navigate('/');
        } else {
          setError(result.error);
        }
      } else {
        const result = login(formData.email, formData.password);
        if (result.success) {
          navigate('/');
        } else {
          setError(result.error);
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e, addFunction) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addFunction();
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>{isRegistering ? 'Join Skill Swap Platform' : 'Login to Skill Swap Platform'}</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          {isRegistering && (
            <>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., San Francisco, CA"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="availability">Availability</label>
                <select
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="weekends">Weekends</option>
                  <option value="evenings">Evenings</option>
                  <option value="weekdays">Weekdays</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
              
              <div className="skills-editing">
                <div className="skills-editing-section">
                  <h4>Skills You Offer</h4>
                  <div className="skills-input-group">
                    <input
                      type="text"
                      value={newSkillOffered}
                      onChange={(e) => setNewSkillOffered(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, addSkillOffered)}
                      className="form-input"
                      placeholder="Add a skill you can teach"
                    />
                    <button type="button" onClick={addSkillOffered} className="btn btn-secondary">
                      Add
                    </button>
                  </div>
                  <div className="skills-display">
                    {formData.skillsOffered.map((skill, index) => (
                      <div key={index} className="skill-tag-editable skill-offered">
                        {skill}
                        <button type="button" onClick={() => removeSkillOffered(skill)}>
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="skills-editing-section">
                  <h4>Skills You Want</h4>
                  <div className="skills-input-group">
                    <input
                      type="text"
                      value={newSkillWanted}
                      onChange={(e) => setNewSkillWanted(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, addSkillWanted)}
                      className="form-input"
                      placeholder="Add a skill you want to learn"
                    />
                    <button type="button" onClick={addSkillWanted} className="btn btn-secondary">
                      Add
                    </button>
                  </div>
                  <div className="skills-display">
                    {formData.skillsWanted.map((skill, index) => (
                      <div key={index} className="skill-tag-editable skill-wanted">
                        {skill}
                        <button type="button" onClick={() => removeSkillWanted(skill)}>
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
          
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Please wait...' : (isRegistering ? 'Register' : 'Login')}
          </button>
        </form>
        
        <div className="forgot-password">
          <p>
            {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="btn btn-outline"
              style={{ padding: '4px 8px', fontSize: '12px' }}
            >
              {isRegistering ? 'Login' : 'Register'}
            </button>
          </p>
          
          {!isRegistering && (
            <p>
              <span style={{ color: '#aaa' }}>
                Demo: marc@demo.com / password123
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;