import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Initialize with mock data if no data exists
    initializeMockData();
    loadData();
  }, []);

  const initializeMockData = () => {
    const existingUsers = localStorage.getItem('skillSwapUsers');
    if (!existingUsers) {
      const mockUsers = [
        {
          id: '1',
          name: 'Marc Demo',
          email: 'marc@demo.com',
          password: 'password123',
          location: 'San Francisco, CA',
          skillsOffered: ['Java Script', 'Python'],
          skillsWanted: ['React', 'Graphic Design'],
          availability: 'weekends',
          profileVisibility: 'public',
          rating: 3.4,
          reviewCount: 12,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Michell',
          email: 'michell@demo.com',
          password: 'password123',
          location: 'New York, NY',
          skillsOffered: ['Java Script', 'Python'],
          skillsWanted: ['React', 'Graphic Design'],
          availability: 'evenings',
          profileVisibility: 'public',
          rating: 2.5,
          reviewCount: 8,
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Joe Wills',
          email: 'joe@demo.com',
          password: 'password123',
          location: 'Austin, TX',
          skillsOffered: ['Java Script', 'Python'],
          skillsWanted: ['React', 'Graphic Design'],
          availability: 'weekends',
          profileVisibility: 'public',
          rating: 4.0,
          reviewCount: 25,
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('skillSwapUsers', JSON.stringify(mockUsers));
    }

    const existingRequests = localStorage.getItem('skillSwapRequests');
    if (!existingRequests) {
      const mockRequests = [
        {
          id: '1',
          fromUserId: '1',
          toUserId: '2',
          skillOffered: 'Java Script',
          skillWanted: 'React',
          message: 'Hi! I\'d love to help you with JavaScript in exchange for learning React.',
          status: 'pending',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          fromUserId: '2',
          toUserId: '3',
          skillOffered: 'Python',
          skillWanted: 'Graphic Design',
          message: 'I can teach you Python if you can help me with graphic design.',
          status: 'rejected',
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('skillSwapRequests', JSON.stringify(mockRequests));
    }
  };

  const loadData = () => {
    const savedUsers = localStorage.getItem('skillSwapUsers');
    const savedRequests = localStorage.getItem('skillSwapRequests');
    
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
    
    if (savedRequests) {
      setRequests(JSON.parse(savedRequests));
    }
  };

  const getPublicUsers = () => {
    return users.filter(user => user.profileVisibility === 'public');
  };

  const getUserById = (id) => {
    return users.find(user => user.id === id);
  };

  const searchUsers = (query, availability) => {
    let filteredUsers = getPublicUsers();
    
    if (query) {
      const lowerQuery = query.toLowerCase();
      filteredUsers = filteredUsers.filter(user => 
        user.name.toLowerCase().includes(lowerQuery) ||
        user.skillsOffered.some(skill => skill.toLowerCase().includes(lowerQuery)) ||
        user.skillsWanted.some(skill => skill.toLowerCase().includes(lowerQuery)) ||
        user.location.toLowerCase().includes(lowerQuery)
      );
    }
    
    if (availability && availability !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.availability === availability);
    }
    
    return filteredUsers;
  };

  const createRequest = (requestData) => {
    const newRequest = {
      id: Date.now().toString(),
      ...requestData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    const updatedRequests = [...requests, newRequest];
    setRequests(updatedRequests);
    localStorage.setItem('skillSwapRequests', JSON.stringify(updatedRequests));
    
    return newRequest;
  };

  const updateRequestStatus = (requestId, status) => {
    const updatedRequests = requests.map(request => 
      request.id === requestId ? { ...request, status } : request
    );
    setRequests(updatedRequests);
    localStorage.setItem('skillSwapRequests', JSON.stringify(updatedRequests));
  };

  const getUserRequests = (userId, type = 'all') => {
    if (type === 'sent') {
      return requests.filter(request => request.fromUserId === userId);
    } else if (type === 'received') {
      return requests.filter(request => request.toUserId === userId);
    }
    return requests.filter(request => 
      request.fromUserId === userId || request.toUserId === userId
    );
  };

  const getRequestsWithUserData = (userId, type = 'all') => {
    const userRequests = getUserRequests(userId, type);
    return userRequests.map(request => {
      const otherUserId = request.fromUserId === userId ? request.toUserId : request.fromUserId;
      const otherUser = getUserById(otherUserId);
      return {
        ...request,
        otherUser,
        isSent: request.fromUserId === userId
      };
    });
  };

  const updateUser = (userId, updates) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, ...updates } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('skillSwapUsers', JSON.stringify(updatedUsers));
  };

  const value = {
    users,
    requests,
    getPublicUsers,
    getUserById,
    searchUsers,
    createRequest,
    updateRequestStatus,
    getUserRequests,
    getRequestsWithUserData,
    updateUser
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};