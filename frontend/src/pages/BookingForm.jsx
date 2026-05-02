import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

// 🔗 Import your hostel images
import hostel1 from "../assets/images/hostel1.jpg";
import hostel3 from "../assets/images/hostel3.jpg";
import hostel4 from "../assets/images/hostel4.jpg";
import hostel5 from "../assets/images/hostel5.jpg";
import hostel6 from "../assets/images/hostel6.jpg";
import hostel7 from "../assets/images/hostel7.jpg";
import placeholder from "../assets/images/placeholder.jpg";

const API = "http://127.0.0.1:5000/api/bookings";

// 🔗 Same image map as Hostels.jsx
const imageMap = {
  "/images/hostel1.jpg": hostel1,
  "/images/hostel3.jpg": hostel3,
  "/images/hostel4.jpg": hostel4,
  "/images/hostel5.jpg": hostel5,
  "/images/hostel6.jpg": hostel6,
  "/images/hostel7.jpg": hostel7,
};

function toImgUrl(path) {
  if (!path) return placeholder;
  return imageMap[path] || placeholder;
}

export default function BookingForm() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const hostel = location.state?.hostel || {};

  const [formData, setFormData] = useState({
    category: "Hostel",
    itemId: id,
    hostelName: hostel.name,
    dateFrom: "",
    dateTo: "",
    name: "",
    phone: "",
    details: "",
    payment: "Cash",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to book a hostel.");
        setLoading(false);
        return;
      }

      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Booking failed");

      setShowSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.7rem 0.9rem",
    borderRadius: "10px",
    border: "1.5px solid #d1d5db",
    fontSize: "0.95rem",
    outline: "none",
    transition: "0.3s",
  };

  const inputFocusStyle = {
    borderColor: "var(--accent)",
    boxShadow: "0 0 6px rgba(0, 180, 120, 0.3)", // subtle green glow
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start", // 👈 move form up
        background: "#f8fafc",
        paddingTop: "60px", // 👈 spacing from top
        paddingBottom: "40px",
      }}
    >
      <div
        className="booking-card d-flex flex-column flex-md-row"
        style={{
          background: "#fff",
          borderRadius: "14px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
          maxWidth: "900px",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* Left preview */}
        <div
          className="preview d-flex flex-column"
          style={{
            flex: "1",
            background: "#f1f5f9",
            padding: "1.5rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={toImgUrl(hostel.image)}
            alt={hostel.name}
            style={{
              borderRadius: "10px",
              width: "100%",
              maxHeight: "250px",
              objectFit: "cover",
              marginBottom: "1rem",
            }}
          />
          <h4 style={{ marginBottom: "0.5rem" }}>{hostel.name}</h4>
          <p style={{ margin: 0, color: "#555" }}>
            {hostel.price ? `₹${hostel.price}/month` : "Price on request"}
          </p>
        </div>

        {/* Right form */}
        <div
          className="form-section"
          style={{
            flex: "1.2",
            padding: "2rem",
          }}
        >
          <h3
            className="mb-3"
            style={{
              color: "#111827",
              fontSize: "1.4rem",
              fontWeight: 700,
            }}
          >
            Complete Your Booking
          </h3>

          {error && (
            <div
              style={{
                background: "#fee2e2",
                color: "#991b1b",
                padding: "0.6rem",
                borderRadius: "8px",
                marginBottom: "1rem",
                textAlign: "center",
                fontSize: "0.9rem",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Date From */}
            <div className="mb-3">
              <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                Date From *
              </label>
              <input
                type="date"
                name="dateFrom"
                value={formData.dateFrom}
                onChange={handleChange}
                required
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
            </div>

            {/* Date To */}
            <div className="mb-3">
              <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                Date To *
              </label>
              <input
                type="date"
                name="dateTo"
                value={formData.dateTo}
                onChange={handleChange}
                required
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
            </div>

            {/* Name */}
            <div className="mb-3">
              <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                Your Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
            </div>

            {/* Phone */}
            <div className="mb-3">
              <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+91 9876543210"
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
            </div>

            {/* Payment */}
            <div className="mb-3">
              <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                Payment Method
              </label>
              <select
                name="payment"
                value={formData.payment}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              >
                <option value="Cash">Cash on Arrival</option>
              </select>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: "var(--accent)",
                color: "#fff",
                fontWeight: 600,
                padding: "0.8rem",
                fontSize: "1rem",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.background = "#099268")}
              onMouseOut={(e) => (e.target.style.background = "var(--accent)")}
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "12px",
              maxWidth: "420px",
              width: "90%",
              textAlign: "center",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ color: "#22c55e", marginBottom: "1rem" }}>
              ✅ Booking Confirmed!
            </h3>
            <p style={{ fontWeight: 600 }}>{hostel.name}</p>
            <p>
              {formData.dateFrom} → {formData.dateTo}
            </p>
            <p>{formData.payment}</p>
            <button
              style={{
                marginTop: "1rem",
                background: "var(--accent)",
                color: "#fff",
                padding: "0.6rem 1.2rem",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={() => {
                setShowSuccess(false);
                navigate("/my-bookings");
              }}
            >
              Go to My Bookings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}






