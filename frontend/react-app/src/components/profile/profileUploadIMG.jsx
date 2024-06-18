import React, { useState } from 'react';
import { Form, Image } from 'react-bootstrap';
import { FileEarmarkArrowUp } from 'react-bootstrap-icons';

const ProfileUploadIMG = ({ onFileSelect }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
      if (validExtensions.includes(selectedFile.type)) {
        setPreview(URL.createObjectURL(selectedFile));
        onFileSelect(selectedFile);
      } else {
        alert("File type not supported. Please select a file of type: JPEG, JPG, PNG.");
      }
    }
  };

  return (
    <Form>
      <div className="border rounded-2 d-flex flex-column justify-content-center align-items-center" style={{ height: 150, padding: '20px' }}>
        <div className="upload-container text-center">
          <label htmlFor="file-upload" className="cursor-pointer">
            <FileEarmarkArrowUp size={32} />
            <input
              type="file"
              id="file-upload"
              accept=".jpg, .jpeg, .png"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </label>
          {preview && <Image src={preview} alt="Profile Preview" thumbnail className="mt-2" style={{ maxHeight: '100px' }} />}
          <p className="fw-light fst-italic mt-2">*Format yang disetujui yaitu: jpg, jpeg, png</p>
        </div>
      </div>
    </Form>
  );
};

export default ProfileUploadIMG;
