import React from "react";
import CardBookFooter from "./cardBookFooter";
import CardBookTitle from "./cardBookTitle";
import CardBookTagline from "./cardBookTagline";
import CardBookReview from "./cardBookReview";

function CardBookBody({ author, title, description, category, imageUrl }) {
  return (
    <div className="card-body d-flex flex-column w-100">
      <div className="card-book__body d-flex flex-column">
        <CardBookTagline category={category} />
        <CardBookTitle title={title} description={description}/>
        {/* <div className="d-flex w-100">
          <CardBookReview />
        </div> */}
        <div className="card-body__footer d-flex w-100 justify-content-between">
          <CardBookFooter type="Penulis" fill={author} imageUrl={imageUrl}/>
        </div>
      </div>
    </div>
  );
}

export default CardBookBody;
