import React from 'react';
import { Form, FormControl } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <Form className="mb-4">
      <FormControl
        type="search"
        placeholder="Cari novel favorit..."
        className="me-2"
        aria-label="Search"
        onChange={handleSearch}
      />
    </Form>
  );
};

export default SearchBar;
