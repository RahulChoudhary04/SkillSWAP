import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    skillsOffered: [],
    skillsWanted: [],
    availability: 'weekends',
    profileVisibility: 'public'
  });
  const [newSkillOffered, setNewSkillOffered] = useState('');
  const [newSkillWanted, setNewSkillWanted] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setFormData({
      name: user.name || '',
      location: user.location || '',
      skillsOffered: user.skillsOffered || [],
      skillsWanted: user.skillsWanted || [],
      availability: user.availability || 'weekends',
      profileVisibility: user.profileVisibility || 'public'
    });
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setHasChanges(true);
  };

  const addSkillOffered = () => {
    if (newSkillOffered.trim() && !formData.skillsOffered.includes(newSkillOffered.trim())) {
      setFormData({
        ...formData,
        skillsOffered: [...formData.skillsOffered, newSkillOffered.trim()]
      });
      setNewSkillOffered('');
      setHasChanges(true);
    }
  };

  const addSkillWanted = () => {
    if (newSkillWanted.trim() && !formData.skillsWanted.includes(newSkillWanted.trim())) {
      setFormData({
        ...formData,
        skillsWanted: [...formData.skillsWanted, newSkillWanted.trim()]
      });
      setNewSkillWanted('');
      setHasChanges(true);
    }
  };

  const removeSkillOffered = (skill) => {
    setFormData({
      ...formData,
      skillsOffered: formData.skillsOffered.filter(s => s !== skill)
    });
    setHasChanges(true);
  };

  const removeSkillWanted = (skill) => {
    setFormData({
      ...formData,
      skillsWanted: formData.skillsWanted.filter(s => s !== skill)
    });
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    
    try {
      await updateProfile(formData);
      setHasChanges(false);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    if (user) {
      setFormData({
        name: user.name || '',
        location: user.location || '',
        skillsOffered: user.skillsOffered || [],
        skillsWanted: user.skillsWanted || [],
        availability: user.availability || 'weekends',
        profileVisibility: user.profileVisibility || 'public'
      });
      setHasChanges(false);
      setMessage('Changes discarded.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleKeyPress = (e, addFunction) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addFunction();
    }
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '?';
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="profile-edit-form">
        <div className="profile-header">
          <h2>Edit Profile</h2>
          <div className="profile-actions">
            <button
              onClick={handleDiscard}
              className="btn btn-secondary"
              disabled={!hasChanges || saving}
            >
              Discard
            </button>
            <button
              onClick={handleSave}
              className="btn btn-success"
              disabled={!hasChanges || saving}
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        {message && (
          <div className={`${message.includes('Error') ? 'error-message' : 'success-message'}`}>
            {message}
          </div>
        )}

        <div className="profile-main">
          <div className="profile-left">
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

            <div className="form-group">
              <label htmlFor="profileVisibility">Profile Visibility</label>
              <select
                id="profileVisibility"
                name="profileVisibility"
                value={formData.profileVisibility}
                onChange={handleChange}
                className="form-input"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>

          <div className="profile-right">
            <div className="profile-photo">
              {getInitials(formData.name)}
            </div>
            <button className="btn btn-secondary add-photo-btn">
              Add/Edit Photo
            </button>
          </div>
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
      </div>
    </div>
  );
};

export default Profile;