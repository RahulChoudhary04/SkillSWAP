import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import UserCard from '../components/UserCard';

const Home = () => {
  const { searchUsers } = useData();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [availability, setAvailability] = useState('all');
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  useEffect(() => {
    const filteredUsers = searchUsers(searchQuery, availability);
    setUsers(filteredUsers);
    setCurrentPage(1);
  }, [searchQuery, availability, searchUsers]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search happens automatically via useEffect
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <h1>Find Skills & Collaborate</h1>
      
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search by name, skills, or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        
        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className="select"
        >
          <option value="all">All Availability</option>
          <option value="weekends">Weekends</option>
          <option value="evenings">Evenings</option>
          <option value="weekdays">Weekdays</option>
          <option value="flexible">Flexible</option>
        </select>
        
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {!user && (
        <div className="info-message" style={{ 
          backgroundColor: '#2a2a2a', 
          padding: '15px', 
          borderRadius: '10px', 
          marginBottom: '20px',
          border: '1px solid #007bff',
          color: '#aaa'
        }}>
          <p>
            <strong>Note:</strong> Only public profiles are visible. 
            You need to <strong>login</strong> to make skill swap requests.
          </p>
        </div>
      )}

      {currentUsers.length === 0 ? (
        <div className="empty-state">
          <h3>No users found</h3>
          <p>Try adjusting your search criteria or check back later.</p>
        </div>
      ) : (
        <>
          <div className="users-grid">
            {currentUsers.map((userItem) => (
              <UserCard key={userItem.id} user={userItem} />
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

export default Home;