import React, { useState } from 'react';
import { Form, Button, Toast, ToastContainer } from 'react-bootstrap';
import ProfileUploadIMG from './profileUploadIMG'

const ProfileForm = ({ user, onUpdate }) => {
  const [username, setUsername] = useState(user.username);
  const [email] = useState(user.email);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);
  const [showToast, setShowToast] = useState(false);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleProfilePictureChange = (file) => {
    setProfilePicture(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ username, profilePicture });
    setShowToast(true);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </Form.Group>
        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            readOnly
          />
        </Form.Group>
        <Form.Group controlId="formProfilePicture" className="mt-3">
          <Form.Label>Ganti Foto Profil</Form.Label>
          <ProfileUploadIMG onFileSelect={handleProfilePictureChange} />
        </Form.Group>
        <Button variant="success" type="submit" className="mt-3">
          Update Profil
        </Button>
      </Form>
      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Notifikasi</strong>
          </Toast.Header>
          <Toast.Body>Profil telah diperbarui!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default ProfileForm;
