import React from 'react';

const NovelCategory = ({ category }) => {

  const getImageUrlByCategory = (category) => {
    switch (category) {
      case 'Action':
        return '/assets/Category/Type=Action.svg'; 
      case 'Comedy':
        return '/assets/Category/Type=Comedy.svg'; 
      case 'Romance':
        return '/assets/Category/Type=Romance.svg'; 
      case 'SoL':
        return '/assets/Category/Type=SoL.svg'; 
      case 'Horror':
        return '/assets/Category/Type=Horror.svg';
      default:
        return 'not genre';
    }
  };

  return (
    <div className="card-book__tagline d-flex align-items-center justify-content-start px-2 gap-2">
      <img src={getImageUrlByCategory(category)} alt="genre" style={{ width: '6rem', height: '1.5rem' }} />
    </div>
  );
};

export default NovelCategory;
