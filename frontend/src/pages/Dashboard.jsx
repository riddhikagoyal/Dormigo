import React from "react";
import heroImage from "../assets/image.png";

export default function Dashboard() {
  return (
    <div>
      {/* 🔹 Hero Section */}
      <section>
        <div
          className="w-100 position-relative"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "65vh",
            borderRadius: "0 0 24px 24px",
          }}
        >
          {/* Gradient overlay (to soften the image text) */}
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))",
              borderRadius: "0 0 24px 24px",
            }}
          />
        </div>
      </section>

      {/* 🔹 Tagline Section */}
      <section className="container text-center py-5">
        <h1
          className="fw-bold"
          style={{
            fontSize: "2.3rem",
            maxWidth: "700px",
            margin: "0 auto",
            lineHeight: "1.4",
          }}
        >
          Sync yourself at home
        </h1>
        <p
          style={{
            fontSize: "1rem",
            maxWidth: "650px",
            margin: "1rem auto 0",
            opacity: 0.85,
          }}
        >
          Find your perfect stay — curated for students and professionals
        </p>
      </section>

      {/* 🔹 Recommended Section */}
      <section className="container text-center py-5">
        <h3 className="fw-semibold mb-3">Recommended for You</h3>
        <p className="text-muted mb-4">
          Explore hostels, PGs, and stays in your city
        </p>

        {/* Placeholder Cards */}
        <div className="row justify-content-center g-4">
          {[1, 2, 3].map((i) => (
            <div className="col-10 col-sm-6 col-md-4" key={i}>
              <div
                className="p-4 rounded-4 shadow-sm h-100"
                style={{ background: "var(--card)" }}
              >
                <div
                  className="bg-light rounded-3 mb-3"
                  style={{ height: "150px" }}
                />
                <h6 className="fw-bold">Hostel {i}</h6>
                <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                  Sample description for Hostel {i}
                </p>
                <button
                  className="btn w-100"
                  style={{
                    background: "var(--accent)",
                    color: "#fff",
                    fontSize: "0.9rem",
                    borderRadius: "8px",
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


















