import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import { Link, useNavigate } from 'react-router-dom';

function FormModal(props) {
  const navigate = useNavigate();

  const handleViewPost = () => {
    props.onHide();
    navigate(`/detailNovel/${props.postId}`); // Navigate to the newly created post's detail page
  };

  const centeredStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-body-vcenter"
      backdrop="static"
      centered>
      <Modal.Body style={centeredStyle}>
        <Image src="/images/PopUpForm Koleksi.svg" style={{ marginBottom: '20px', maxWidth: '100%' }} />
        <p className='fw-normal mt-2'>
          Selamat, Novel kamu berhasil dipublikasi!
        </p>
        <Button
          className='btn btn-success mt-3'
          style={{ width: '300px' }}
          onClick={handleViewPost}>
          Lihat Novelmu
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default FormModal;
