import React from 'react';
import Form from 'react-bootstrap/Form';
import { useFormKoleksi } from './formValidation';

function FormContent() {
  const { kontenBuku, setKontenBuku } = useFormKoleksi();

  const handleContentChange = (e) => {
    if (e.target.value.length <= 50000) {
      setKontenBuku(e.target.value);
    }
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="kontenInput">
        <Form.Label className='fw-bolder'>Isi Cerita</Form.Label>
        <Form.Control
          as="textarea"
          rows={10}
          className='fw-light fst-italic'
          placeholder="Silahkan tulis isi cerita kamu!"
          value={kontenBuku}
          onChange={handleContentChange}
          maxLength={50000}
        />
        <div className="character-count fw-light text-end">
          {kontenBuku.length}/50000
        </div>
      </Form.Group>
    </Form>
  );
}

export default FormContent;
