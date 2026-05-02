import React from "react";

const CategoryCard = ({ icon, label, link }) => {
  return (
    <div
      className="category-card shadow-sm"
      onClick={() => (window.location.href = link)}
      style={{ width: "280px", height: "180px" }}
    >
      <i className={`bi ${icon}`} style={{ fontSize: "42px", marginBottom: "12px" }}></i>
      <span style={{ fontSize: "18px", fontWeight: "600" }}>{label}</span>
    </div>
  );
};

export default CategoryCard;

