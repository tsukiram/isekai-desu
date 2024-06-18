import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useFormKoleksi } from './formValidation';

function GenreOption() {
  const { genreSelected, setGenreSelected } = useFormKoleksi();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/categories/')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error("Expected array but received:", data);
        }
      })
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  const handleSelectChange = (event) => {
    setGenreSelected(event.target.value);
  };

  return (
    <Form>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label className='mb-1 fw-bolder'>Genre Novel</Form.Label>
        <Form.Select aria-label="Default select example" value={genreSelected} onChange={handleSelectChange}>
          <option key='blankChoice' hidden value="" />
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </Form.Select>
      </Form.Group>
    </Form>
  );
}

export default GenreOption;
