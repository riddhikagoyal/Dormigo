import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import hostel1 from "../assets/images/hostel1.jpg";
import hostel3 from "../assets/images/hostel3.jpg";
import hostel4 from "../assets/images/hostel4.jpg";
import hostel5 from "../assets/images/hostel5.jpg";
import hostel6 from "../assets/images/hostel6.jpg";
import hostel7 from "../assets/images/hostel7.jpg";
import placeholder from "../assets/images/placeholder.jpg";

const imageMap = {
  "/images/hostel1.jpg": hostel1,
  "/images/hostel3.jpg": hostel3,
  "/images/hostel4.jpg": hostel4,
  "/images/hostel5.jpg": hostel5,
  "/images/hostel6.jpg": hostel6,
  "/images/hostel7.jpg": hostel7,

};

const API = "http://127.0.0.1:5000";

export default function Hostels() {
  const { city } = useParams();
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function toImgUrl(path) {
    if (!path) return placeholder;
    return imageMap[path] || placeholder;
  }

  useEffect(() => {
    async function fetchHostels() {
      try {
        const res = await fetch(`${API}/api/cities/${city}`);
        const data = await res.json();
        setHostels(data.hostels || []);
      } catch (err) {
        console.error("Error fetching hostels:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchHostels();
  }, [city]);

  // 🔎 Filter hostels based on search
  const filteredHostels = hostels.filter(
    (h) =>
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.address.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="text-center mt-5">Loading hostels...</p>;

  return (
    <div className="container mt-4">
      {/* Page title */}
      <div className="text-center mb-3">
        <input
          type="text"
          placeholder="Search hostels by name or location..."
          className="form-control mx-auto"
          style={{
            maxWidth: "400px",
            borderRadius: "8px",
            padding: "0.5rem 0.75rem",
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Hostel Grid */}
      <div className="row g-4">
        {filteredHostels.length > 0 ? (
          filteredHostels.map((h, i) => (
            <div key={i} className="col-12 col-sm-6 col-md-4">
              <div
                className="card h-100 shadow-sm border-0 rounded-3"
                style={{ transition: "all 0.3s ease" }}
              >
                <img
                  src={toImgUrl(h.image)}
                  alt={h.name}
                  className="card-img-top"
                  style={{
                    height: "160px",
                    objectFit: "cover",
                    borderRadius: "12px 12px 0 0",
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h6 className="fw-bold">{h.name}</h6>
                  <p className="text-muted mb-1" style={{ fontSize: "0.85rem" }}>
                    📍 {h.address}
                  </p>
                  <p className="fw-semibold mb-1" style={{ color: "var(--accent)" }}>
                    {h.price}
                  </p>
                  <p className="text-muted" style={{ fontSize: "0.85rem" }}>
                    📞 {h.contact}
                  </p>
                  <div className="mt-auto">
                    <button
                      className="btn w-100"
                      style={{
                        background: "var(--accent)",
                        color: "#fff",
                        borderRadius: "8px",
                      }}
                      onClick={() =>
                        navigate(`/book-hostel/${h._id}`, { state: { hostel: h } })
                      }
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-4">
            No hostels match your search in {city}.
          </p>
        )}
      </div>
    </div>
  );
}




