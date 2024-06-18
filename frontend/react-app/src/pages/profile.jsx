// src/pages/profile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileHead from '../components/profile/profileHead';
import ProfileBody from '../components/profile/profileBody';
import NavigationBar from '../components/homepage/navigationBar';
import { Container, Spinner, Alert } from 'react-bootstrap';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('https://tsukirama.pythonanywhere.com/api/users/profile/', {
            headers: { Authorization: `Token ${token}` }
          });
          setUser(response.data);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Failed to fetch user profile', error);
        setError('Failed to fetch user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdate = async (updatedData) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const formData = new FormData();
        formData.append('username', updatedData.username);
        formData.append('email', updatedData.email);
        if (updatedData.image) {
          formData.append('image', updatedData.image);
        }

        const response = await axios.put('https://tsukirama.pythonanywhere.com/api/users/profile/update/', formData, {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        setUser(response.data);  // Update state with new profile data
      }
    } catch (error) {
      console.error('Failed to update user profile', error);
      setError('Failed to update user profile');
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container fluid>
      <NavigationBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Container className="mt-4">
        {user && (
          <>
            <ProfileHead
              username={user.username}
              email={user.email}
              profilePicture={user.image}
            />
            <ProfileBody user={user} onUpdate={handleUpdate} />
          </>
        )}
      </Container>
    </Container>
  );
};

export default ProfilePage;
