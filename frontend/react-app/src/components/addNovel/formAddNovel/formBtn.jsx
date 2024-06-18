import axios from 'axios';
import { useFormKoleksi } from './formValidation';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ModalKoleksi from "./formModal";

function FormBtn() {
  const { isFormValid, judulBuku, genreSelected, deskripsiBuku, kontenBuku, file } = useFormKoleksi();
  const [showModalKoleksi, setShowModalKoleksi] = useState(false);
  const [showError, setShowError] = useState(false);
  const [newPostId, setNewPostId] = useState(null);

  const handleModalInputClick = async () => {
    console.log("Button clicked");
    console.log("isFormValid:", isFormValid);
    console.log("judulBuku:", judulBuku);
    console.log("genreSelected:", genreSelected);
    console.log("deskripsiBuku:", deskripsiBuku);
    console.log("kontenBuku:", kontenBuku);
    console.log("file:", file);

    if (isFormValid) {
      try {
        const formData = new FormData();
        formData.append('title', judulBuku);
        formData.append('description', deskripsiBuku);
        formData.append('category', genreSelected);
        formData.append('content', kontenBuku);
        formData.append('cover_image', file);

        const token = localStorage.getItem('token');
        console.log("token:", token);

        const response = await axios.post('http://localhost:8000/api/post/create/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Token ${token}`, // Make sure to use 'Token' instead of 'Bearer'
          },
        });

        console.log('Post created successfully:', response.data);
        setNewPostId(response.data.id); // Save the new post's ID
        setShowModalKoleksi(true);
        setShowError(false);
      } catch (error) {
        console.error('Error creating post:', error);
        setShowError(true);
      }
    } else {
      setShowError(true);
    }
  };

  const handleClose = () => {
    setShowModalKoleksi(false);
  };

  useEffect(() => {
    let timer;
    if (showError) {
      timer = setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showError]);

  return (
    <div className="d-grid gap-2 mb-5">
      <Button
        className='fw-bolder'
        variant="success"
        size="md"
        onClick={handleModalInputClick}
      >
        Kirim
      </Button>
      {showError && !isFormValid && (
        <div
          className='fw-light fst-italic'
          style={{ color: 'black', marginTop: '1px' }}>
          *Ada bagian yang belum lengkap nih 🤔
        </div>
      )}
      <ModalKoleksi
        show={showModalKoleksi}
        onHide={handleClose}
        postId={newPostId} // Pass the new post's ID to the modal
      />
    </div>
  );
}

export default FormBtn;
