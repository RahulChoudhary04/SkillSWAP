import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Requests = () => {
  const { user } = useAuth();
  const { getRequestsWithUserData, updateRequestStatus } = useData();
  const navigate = useNavigate();
  const location = useLocation();
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState('');
  const requestsPerPage = 5;

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Check for success message from navigation
    if (location.state?.message) {
      setMessage(location.state.message);
      setTimeout(() => setMessage(''), 3000);
    }

    loadRequests();
  }, [user, navigate, location.state]);

  useEffect(() => {
    filterRequests();
  }, [requests, statusFilter, searchQuery]);

  const loadRequests = () => {
    if (user) {
      const allRequests = getRequestsWithUserData(user.id);
      setRequests(allRequests);
    }
  };

  const filterRequests = () => {
    let filtered = [...requests];

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(request => request.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(request => 
        request.otherUser?.name.toLowerCase().includes(query) ||
        request.skillOffered.toLowerCase().includes(query) ||
        request.skillWanted.toLowerCase().includes(query)
      );
    }

    setFilteredRequests(filtered);
    setCurrentPage(1);
  };

  const handleStatusUpdate = (requestId, newStatus) => {
    updateRequestStatus(requestId, newStatus);
    loadRequests();
    setMessage(`Request ${newStatus} successfully!`);
    setTimeout(() => setMessage(''), 3000);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '?';
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'status-badge status-pending';
      case 'accepted':
        return 'status-badge status-accepted';
      case 'rejected':
        return 'status-badge status-rejected';
      default:
        return 'status-badge';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);
  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

  return (
    <div className="container">
      <div className="requests-header">
        <h1>Skill Swap Requests</h1>
        
        {message && (
          <div className="success-message" style={{ marginBottom: '20px' }}>
            {message}
          </div>
        )}
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search requests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
          
          <button className="btn btn-primary">Search</button>
        </div>
      </div>

      {currentRequests.length === 0 ? (
        <div className="empty-state">
          <h3>No requests found</h3>
          <p>
            {requests.length === 0 
              ? "You haven't sent or received any skill swap requests yet." 
              : "No requests match your current filters."}
          </p>
        </div>
      ) : (
        <>
          <div className="requests-list">
            {currentRequests.map((request) => (
              <div key={request.id} className="request-card">
                <div className="request-header">
                  <div className="user-info">
                    <div className="profile-pic">
                      {getInitials(request.otherUser?.name)}
                    </div>
                    <div className="user-details">
                      <h3>{request.otherUser?.name}</h3>
                      <p style={{ color: '#aaa', fontSize: '14px' }}>
                        {request.isSent ? 'Request sent to' : 'Request received from'} • {formatDate(request.createdAt)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="request-status-actions">
                    <div className={getStatusBadgeClass(request.status)}>
                      {request.status}
                    </div>
                    
                    {!request.isSent && request.status === 'pending' && (
                      <div className="request-actions">
                        <button
                          onClick={() => handleStatusUpdate(request.id, 'accepted')}
                          className="btn btn-success"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(request.id, 'rejected')}
                          className="btn btn-danger"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="request-details">
                  <div className="skills-exchange">
                    <div className="skill-item">
                      <h4>Skills Offered</h4>
                      <span className="skill-tag skill-offered">
                        {request.skillOffered}
                      </span>
                    </div>
                    <div className="exchange-arrow" style={{ 
                      padding: '0 20px', 
                      color: '#666',
                      fontSize: '20px',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      ⇄
                    </div>
                    <div className="skill-item">
                      <h4>Skills Wanted</h4>
                      <span className="skill-tag skill-wanted">
                        {request.skillWanted}
                      </span>
                    </div>
                  </div>
                  
                  {request.message && (
                    <div className="request-message" style={{
                      marginTop: '15px',
                      padding: '15px',
                      backgroundColor: '#333',
                      borderRadius: '8px',
                      borderLeft: '4px solid #007bff'
                    }}>
                      <h4 style={{ marginBottom: '10px', color: '#aaa' }}>Message:</h4>
                      <p style={{ margin: 0, lineHeight: '1.5' }}>{request.message}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn btn-secondary"
              >
                ←
              </button>
              
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {index + 1}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="btn btn-secondary"
              >
                →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Requests;