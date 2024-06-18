import React from "react";

function SearchSelection({ onSearch }) {
  return (
    <div className="search-selection">
      <p className="text-secondary">Coba cari judul dari novel yang ingin kamu baca</p>
      <input
        type="text"
        placeholder="Cari Novel"
        className="search-selection with-icon"
        onChange={(event) => onSearch(event.target.value)}
      />
    </div>
  );
}

export default SearchSelection;
