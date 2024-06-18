import React from "react";
import { Link } from "react-router-dom";
import FavoriteBody from "./favoriteBody";

function FavoriteItem({ id, author, title, category, image, description, imageUrl }) {
  return (
    <Link
      className="card-book col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 justify-content-center align-items-center"
      to={`/detailNovel/${id}`}
      style={{ textDecoration: "none", color: "black", width: "18rem" }}
    >
      <div className="card-book__img d-flex justify-content-center">
        <img
          src={image}
          className="card-img-top"
          alt="card"
          style={{ width: "6.75rem" }}
        />
      </div>
      <div className="card-book__body d-flex flex-column w-100">
        <FavoriteBody
          author={author}
          title={title}
          category={category}
          description={description}
          imageUrl={imageUrl}
        />
      </div>
    </Link>
  );
}

export default FavoriteItem;
