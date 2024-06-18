import React from "react";
import FavoriteFooter from "./favoriteFooter";
import FavoriteTitle from "./favoriteTitle";
import FavoriteTagline from "./favoriteTagline";
import FavoriteReview from "./favoriteReview";

function FavoriteBody({ author, title, description, category, imageUrl }) {
  return (
    <div className="card-body d-flex flex-column w-100">
      <div className="card-book__body d-flex flex-column">
        <FavoriteTagline category={category} />
        <FavoriteTitle title={title} description={description}/>
        {/* <div className="d-flex w-100">
          <FavoriteReview />
        </div> */}
        <div className="card-body__footer d-flex w-100 justify-content-between">
          <FavoriteFooter type="Penulis" fill={author} imageUrl={imageUrl}/>
        </div>
      </div>
    </div>
  );
}

export default FavoriteBody;
