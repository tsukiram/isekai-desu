import React from "react";
import CardBookItem from "./cardBookItem";

function CardBookList({ cards }) {
  return (
    <div className="card-book__list">
      {cards.length ? (
        cards.map((card) => (
          <CardBookItem
            key={card.id}
            id={card.id}
            image={card.cover_image_name}
            title={card.title}
            author={card.author_name}
            category={card.category_name}
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

export default CardBookList;
