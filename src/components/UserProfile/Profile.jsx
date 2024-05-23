import React from 'react';
import UserProfile from './User';
import UserOrders from './UserOrders';

const Profile = () => {
  return (
    <div className="container mx-auto p-4 mb-7">
      <UserProfile />
      <UserOrders />
    </div>
  );
};

export default Profile;
