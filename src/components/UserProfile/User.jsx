import React, { useEffect, useState } from 'react';
import axios from 'axios';

const User = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userEmail = sessionStorage.getItem('userEmail');
        
        const response = await axios.get('http://localhost:5000/user', {
          params: { email: userEmail },
        });
        setUser(response.data);
      } catch (error) {
        setError('Error fetching user profile');
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4 bg-gray-100">
      <h2 className="text-lg font-semibold mb-4">User Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default User;
