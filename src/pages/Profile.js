// src/pages/Profile.tsx
import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
const Profile = () => {
    const { user, fetchUserData, loading, error } = useAuth();
    useEffect(() => {
        if (!user) {
            fetchUserData().catch((err) => {
                console.error('Failed to fetch user data:', err);
            });
        }
    }, [user, fetchUserData]);
    if (loading && !user) {
        return React.createElement("div", null, "Loading profile...");
    }
    if (error && !user) {
        return React.createElement("div", null,
            "Error loading profile: ",
            error);
    }
    if (!user) {
        return React.createElement("div", null, "No user data.");
    }
    return (React.createElement("div", null,
        React.createElement("h1", null, "Profile"),
        React.createElement("p", null, user.name),
        React.createElement("p", null, user.email)));
};
export default Profile;
