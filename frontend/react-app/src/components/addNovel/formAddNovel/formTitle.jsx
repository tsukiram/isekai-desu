import React from 'react';
import Form from 'react-bootstrap/Form';
import { useFormKoleksi } from './formValidation';

function FormTitle() {
  const { judulBuku, setJudulBuku } = useFormKoleksi();

  const handleChange = (e) => {
    setJudulBuku(e.target.value);
  };

  return (
    <Form>
      <Form.Group className="mb-2" controlId="judulBukuInput">
        <Form.Label className='mb-1 fw-bolder'>Judul Novel</Form.Label>
        <Form.Control
          className='fw-light fst-italic'
          type="text"
          placeholder="Tuliskan judul novel kamu"
          value={judulBuku}
          onChange={handleChange}
          maxLength={100}
        />
        <div className="character-count fw-light text-end">
          {judulBuku.length}/100
        </div>
      </Form.Group>
    </Form>
  );
}

export default FormTitle;
