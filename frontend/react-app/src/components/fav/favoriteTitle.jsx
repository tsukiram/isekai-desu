import React from "react";

function FavoriteTitle({ title, description }) {
  return (
    <div className="card-book__title d-flex flex-column w-100">
      <h5 className="mb-0">{title}</h5>
      <div className="d-flex gap-1">
      <caption
          className="description mb-0"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 5,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxHeight: "calc(1.2em * 5)"
          }}
        >
          {description}
        </caption>
      </div>
    </div>
  );
}

export default FavoriteTitle;
