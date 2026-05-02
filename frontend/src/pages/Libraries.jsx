import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import placeholder from "../assets/images/placeholder.jpg";

const API = "http://127.0.0.1:5000";

export default function Libraries() {
  const { city } = useParams();
  const [libraries, setLibraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function toImgUrl(path) {
    if (!path) return placeholder;
    return path.startsWith("http") ? path : placeholder;
  }

  useEffect(() => {
    async function fetchLibraries() {
      try {
        const res = await fetch(`${API}/api/cities/${city}`);
        const data = await res.json();
        setLibraries(data.libraries || []);
      } catch (err) {
        console.error("Error fetching libraries:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLibraries();
  }, [city]);

  if (loading) return <p className="text-center mt-5">Loading libraries...</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Libraries in {city}</h2>
      <div className="d-flex flex-wrap gap-3" style={{ justifyContent: "flex-start" }}>
        {libraries.length > 0 ? (
          libraries.map((lib, i) => (
            <div
              key={i}
              className="category-card d-flex flex-column"
              style={{ width: "220px", height: "320px", overflow: "hidden" }}
            >
              <img
                src={toImgUrl(lib.image)}
                alt={lib.name}
                style={{
                  width: "100%",
                  height: "140px",
                  objectFit: "cover",
                  borderRadius: "12px 12px 0 0",
                }}
              />
              <div className="d-flex flex-column justify-content-between" style={{ padding: "0.5rem", flexGrow: 1 }}>
                <div>
                  <span style={{ display: "block", fontSize: "0.95rem", fontWeight: 700 }}>{lib.name}</span>
                  <p style={{ fontSize: "0.78rem", margin: "3px 0" }}>{lib.address}</p>
                  <p style={{ fontSize: "0.75rem", marginBottom: "5px" }}>📞 {lib.contact}</p>
                </div>
                <button
                  className="btn btn-accent w-100"
                  style={{ background: "var(--accent)", color: "#fff", fontSize: "0.85rem", padding: "0.35rem", borderRadius: "8px", border: "none", cursor: "pointer" }}
                  onClick={() => navigate(`/book-library/${lib._id}`, { state: { library: lib } })}
                >
                  Visit Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No libraries found in {city}.</p>
        )}
      </div>
    </div>
  );
}
