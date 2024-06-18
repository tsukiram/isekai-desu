import React from 'react';
import Form from 'react-bootstrap/Form';
import { useFormKoleksi } from './formValidation';

function FormDescription() {
  const { deskripsiBuku, setDeskripsiBuku } = useFormKoleksi();

  const handleDescriptionChange = (e) => {
    if (e.target.value.length <= 2000) {
      setDeskripsiBuku(e.target.value);
    }
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="deskripsiInput">
        <Form.Label className='fw-bolder'>Deskripsi Cerita</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          className='fw-light fst-italic'
          placeholder="Silahkan tulis deskripsi cerita kamu!"
          value={deskripsiBuku}
          onChange={handleDescriptionChange}
          maxLength={2000}
        />
        <div className="character-count fw-light text-end">
          {deskripsiBuku.length}/2000
        </div>
      </Form.Group>
    </Form>
  );
}

export default FormDescription;
