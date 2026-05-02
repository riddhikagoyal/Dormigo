import React, { useEffect, useState } from "react";
import { Calendar, Phone, User, CreditCard, CheckCircle, Clock } from "lucide-react";

const API = "http://localhost:5000/api/bookings";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBookings() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in to view bookings.");
          setLoading(false);
          return;
        }

        const res = await fetch(API, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.msg || "Failed to fetch bookings");
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-5" style={{ color: "var(--text-600)" }}>
        Loading your bookings...
      </p>
    );

  return (
    <div className="container mt-5">
      {/* 🔹 Professional Page Title */}
      <div className="text-center mb-5">
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "var(--text-800)",
          }}
        >
          My Bookings
        </h2>
        <p style={{ color: "var(--text-500)" }}>
          Manage and review all your bookings in one place
        </p>
      </div>

      {/* 🔹 Error */}
      {error && (
        <p
          className="text-danger text-center"
          style={{ fontWeight: "500", marginTop: "1rem" }}
        >
          {error}
        </p>
      )}

      {/* 🔹 No Bookings */}
      {bookings.length === 0 ? (
        <p
          className="text-center"
          style={{ color: "var(--text-500)", fontSize: "1rem" }}
        >
          No bookings found.
        </p>
      ) : (
        <div className="list-group shadow-sm">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="list-group-item mb-3 p-4 rounded-4"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.01)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 14px rgba(0,0,0,0.08)";
              }}
            >
              {/* 🔹 Top Row */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 style={{ fontWeight: "600", color: "var(--accent)" }}>
                  {b.category}
                </h5>
                <span
                  className={`badge px-3 py-2 rounded-pill ${
                    b.status === "Pending" ? "bg-warning text-dark" : "bg-success"
                  }`}
                  style={{ fontSize: "0.8rem" }}
                >
                  {b.status}
                </span>
              </div>

              {/* 🔹 Details */}
              <div className="row text-muted" style={{ fontSize: "0.9rem" }}>
                <div className="col-md-6 mb-2">
                  <Calendar size={16} className="me-2 text-accent" />
                  <strong>From:</strong>{" "}
                  {new Date(b.dateFrom).toLocaleDateString()}
                </div>
                <div className="col-md-6 mb-2">
                  <Calendar size={16} className="me-2 text-accent" />
                  <strong>To:</strong> {new Date(b.dateTo).toLocaleDateString()}
                </div>
                <div className="col-md-6 mb-2">
                  <User size={16} className="me-2 text-accent" />
                  <strong>Name:</strong> {b.name}
                </div>
                <div className="col-md-6 mb-2">
                  <Phone size={16} className="me-2 text-accent" />
                  <strong>Phone:</strong> {b.phone}
                </div>
                <div className="col-md-6">
                  <CreditCard size={16} className="me-2 text-accent" />
                  <strong>Payment:</strong>{" "}
                  <span
                    className={`badge ${
                      b.payment === "Paid"
                        ? "bg-success"
                        : "bg-secondary"
                    }`}
                  >
                    {b.payment}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

