import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = ({ show, handleClose, handleConfirm, novelTitle }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Konfirmasi</Modal.Title>
            </Modal.Header>
            <Modal.Body>Apakah kamu ingin menghapus {novelTitle} dari favorit?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Tidak
                </Button>
                <Button variant="danger" onClick={handleConfirm}>
                    Iya
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmModal;
