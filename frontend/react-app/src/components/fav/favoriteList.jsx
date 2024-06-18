import React from "react";
import FavoriteItem from "./favoriteItem";

function FavoriteList({ cards }) {
  return (
    <div className="card-book__list">
      {cards.length ? (
        cards.map((card) => (
          <FavoriteItem
            key={card.id}
            id={card.id}
            image={card.cover_image_name}
            title={card.title}
            author={card.author}
            category={card.category}
            description={card.description}
            imageUrl={card.profile_image}
          />
        ))
      ) : (
        <p>Novel Tidak Tersedia</p>
      )}
    </div>
  );
}

export default FavoriteList;
