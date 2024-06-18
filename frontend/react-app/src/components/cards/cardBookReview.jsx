import React from "react";

function CardBookReview() {
  return (
    <div className="card-book__review d-flex gap-2">
      <div className="card-review__stars d-flex align-items-center">
        <img src="/images/star-fill.png" alt="*" style={{ width: "1.1rem" }}/>
        <img src="/images/star-fill.png" alt="*" style={{ width: "1.1rem" }}/>
        <img src="/images/star-fill.png" alt="*" style={{ width: "1.1rem" }}/>
        <img src="/images/star-fill.png" alt="*" style={{ width: "1.1rem" }}/>
        <img src="/images/star-empty.png" alt="*" style={{ width: "1.1rem" }}/>
      </div>
      <div className="card-review__count">
        <p className="mb-0"><strong>4.5</strong>(5)</p>
      </div>
    </div>
  );
}

export default CardBookReview;
