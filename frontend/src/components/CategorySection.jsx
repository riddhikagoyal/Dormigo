import React from "react";
import CategoryCard from "./CategoryCard";

const CategorySection = ({ title, desc, icon, label, link, reverse }) => {
  return (
    <div
      className={`row category-section align-items-center py-5 ${
        reverse ? "flex-md-row-reverse bg-light-alt" : ""
      }`}
    >
      {/* Left side: Card */}
      <div className="col-md-5 d-flex justify-content-center mb-4 mb-md-0">
        <CategoryCard icon={icon} label={label} link={link} />
      </div>

      {/* Right side: Text */}
      <div className="col-md-7 ps-md-5">
        <h2 className="fw-bold mb-3" style={{ fontSize: "1.8rem" }}>
          {title}
        </h2>
        <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "var(--text-600)" }}>
          {desc}
        </p>
      </div>
    </div>
  );
};

export default CategorySection;

