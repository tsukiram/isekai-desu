import React from 'react';
import { Image } from 'react-bootstrap';

const ProfileHead = ({ username, email, profilePicture }) => {
  return (
    <div className="d-flex align-items-center mb-4">
      <Image src={profilePicture} roundedCircle width={100} height={100} className="me-3" />
      <div>
        <h3>{username}</h3>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default ProfileHead;
