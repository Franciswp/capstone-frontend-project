// src/pages/Profile.tsx
import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

const Profile: React.FC = () => {
  const { user, fetchUserData, loading, error } = useAuth();

  useEffect(() => {
    if (!user) {
      fetchUserData().catch((err) => {
        console.error('Failed to fetch user data:', err);
      });
    }
  }, [user, fetchUserData]);

  if (loading && !user) {
    return <div>Loading profile...</div>;
  }

  if (error && !user) {
    return <div>Error loading profile: {error}</div>;
  }

  if (!user) {
    return <div>No user data.</div>;
  }

  return (
      <div>
        <h1>Profile</h1>
        <p>{user.name}</p>
        <p>{user.email}</p>
        {/* other fields */}
      </div>
  );
};

export default Profile;