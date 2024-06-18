import React from 'react';

function CardBookFooter({ type, fill, imageUrl }) {
  return (
    <div className="card-book__footer d-flex align-items-center">
      <img src={imageUrl} alt="author" style={{ width: "2rem", height: "2rem", borderRadius: "50%" }}/>
      <p className="mb-0">{type}: {fill}</p>
    </div>
  );
}

export default CardBookFooter;
