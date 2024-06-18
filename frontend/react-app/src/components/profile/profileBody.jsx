import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import ProfileUploadIMG from './profileUploadIMG';

const ProfileBody = ({ user, onUpdate }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [profilePicture, setProfilePicture] = useState(user.image);
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleProfilePictureChange = (file) => {
    setProfilePicture(URL.createObjectURL(file));
    setFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = { username, email };
    if (file) {
      updatedData.image = file;
    }
    onUpdate(updatedData);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    window.location.reload();
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
            onChange={handleEmailChange}
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
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Profil telah diperbarui!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Informasi profil Anda telah berhasil diperbarui.</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseModal}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileBody;
