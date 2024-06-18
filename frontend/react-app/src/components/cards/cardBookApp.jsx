import React, { useState, useEffect } from "react";
import axios from 'axios';
import CardBookList from "./cardBookList";
import CardBookTab from "./cardBookTab";

function CardBookApp({ recommendCards, cards, handleTabChange, activeTab }) {
  const [categories, setCategories] = useState(["all"]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://tsukirama.pythonanywhere.com/api/categories/");
      const categories = response.data.map(cat => cat.name.toLowerCase());
      setCategories(["all", ...categories]);
    } catch (error) {
      console.error("There was an error fetching the categories!", error);
    }
  };

  return (
    <div className="card-list d-flex flex-column gap-4">
      <div className="card-list__genre d-flex flex-column gap-2">
        <h5 className="fw-bold fs-6">Novel Berdasarkan Genre</h5>
        <CardBookTab handleTabChange={handleTabChange} activeTab={activeTab} categories={categories} />
        <CardBookList cards={cards} />
      </div>
      <div className="card-list__rekomendasi d-flex flex-column gap-2">
        <h5 className="fw-bold fs-6">Rekomendasi Buku</h5>
        <CardBookList cards={recommendCards} />
      </div>
    </div>
  );
}

export default CardBookApp;
