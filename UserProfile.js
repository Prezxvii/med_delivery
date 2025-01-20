import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserProfile() {
  const [profile, setProfile] = useState(null); // Initialize as null to handle loading state
  const [loading, setLoading] = useState(true); // Manage loading state
  const [error, setError] = useState(null); // Manage error state

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5001/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (err) {
        setError('Error fetching profile');
        console.error('Profile fetch error:', err); // Log the full error
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfile(); // Fetch the profile on component mount
  }, []); // Empty dependency array to run once on mount

  if (loading) {
    return <div>Loading profile...</div>; // Display loading message
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>User Profile</h1>
      {profile ? (
        <>
          <p style={styles.info}>Email: {profile.email}</p>
          <p style={styles.info}>Role: {profile.role}</p>
          <p style={styles.info}>Joined: {new Date(profile.createdAt).toLocaleDateString()}</p>
        </>
      ) : (
        <p>No profile data available</p> // In case there's no profile data
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  header: {
    fontSize: '36px',
    fontWeight: 'bold',
  },
  info: {
    fontSize: '18px',
    margin: '10px 0',
  },
};

export default UserProfile;


