import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import placeholder from "../assets/images/placeholder.jpg";

const API = "http://127.0.0.1:5000";

export default function Hospitals() {
  const { city } = useParams();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function toImgUrl(path) {
    if (!path) return placeholder;
    return path.startsWith("http") ? path : placeholder;
  }

  useEffect(() => {
    async function fetchHospitals() {
      try {
        const res = await fetch(`${API}/api/cities/${city}`);
        const data = await res.json();
        setHospitals(data.hospitals || []);
      } catch (err) {
        console.error("Error fetching hospitals:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchHospitals();
  }, [city]);

  if (loading) return <p className="text-center mt-5">Loading hospitals...</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Hospitals in {city}</h2>
      <div className="d-flex flex-wrap gap-3" style={{ justifyContent: "flex-start" }}>
        {hospitals.length > 0 ? (
          hospitals.map((hosp, i) => (
            <div
              key={i}
              className="category-card d-flex flex-column"
              style={{ width: "220px", height: "320px", overflow: "hidden" }}
            >
              <img
                src={toImgUrl(hosp.image)}
                alt={hosp.name}
                style={{
                  width: "100%",
                  height: "140px",
                  objectFit: "cover",
                  borderRadius: "12px 12px 0 0",
                }}
              />
              <div className="d-flex flex-column justify-content-between" style={{ padding: "0.5rem", flexGrow: 1 }}>
                <div>
                  <span style={{ display: "block", fontSize: "0.95rem", fontWeight: 700 }}>{hosp.name}</span>
                  <p style={{ fontSize: "0.78rem", margin: "3px 0" }}>{hosp.address}</p>
                  <p style={{ fontSize: "0.75rem", marginBottom: "5px" }}>📞 {hosp.contact}</p>
                </div>
                <button
                  className="btn btn-accent w-100"
                  style={{ background: "var(--accent)", color: "#fff", fontSize: "0.85rem", padding: "0.35rem", borderRadius: "8px", border: "none", cursor: "pointer" }}
                  onClick={() => navigate(`/book-hospital/${hosp._id}`, { state: { hospital: hosp } })}
                >
                  Contact Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hospitals found in {city}.</p>
        )}
      </div>
    </div>
  );
}
