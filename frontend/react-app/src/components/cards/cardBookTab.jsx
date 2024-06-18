import React from "react";

function CardBookTab({ handleTabChange, activeTab, categories }) {
  return (
    <nav>
      <div className="nav nav-underline mb-4" id="nav-tab" role="tablist">
        {categories.map((category) => (
          <button
            key={category}
            className={`nav-link ${activeTab === category ? "active" : ""} custom-link`}
            onClick={() => handleTabChange(category)}
            id={`${category}-tab`}
            data-bs-toggle="tab"
            data-bs-target={`#${category}`}
            type="button"
            role="tab"
            aria-controls={category}
            aria-selected={activeTab === category}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default CardBookTab;
