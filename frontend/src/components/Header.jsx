import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { X, ArrowLeft, Building2 } from "lucide-react"; // ✅ replaced MapPin with Building2

const cities = [
  { name: "Kota" },
  { name: "Delhi" },
  { name: "Mumbai" },
  { name: "Jaipur" },
  { name: "Bangalore" },
  { name: "Hyderabad" },
];

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState(
    () => localStorage.getItem("selectedCity") || "Mumbai"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // ✅ Handle city selection
  const handleCityClick = (city) => {
    setSelectedCity(city);
    localStorage.setItem("selectedCity", city);
    setShowModal(false);
    navigate(`/${city}/home`);
  };

  // ✅ Filter cities based on search term
  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <header className="hero-header">
      <div className="container d-flex justify-content-between align-items-center flex-wrap">
        {/* 🔹 Left Side: Back Button + Title */}
        <div className="d-flex align-items-center">
          {window.history.length > 1 && (
            <button
              onClick={() => navigate(-1)}
              className="btn d-flex align-items-center"
              style={{
                background: "transparent",
                border: "none",
                padding: "0",
                marginRight: "1rem",
                cursor: "pointer",
              }}
            >
              <ArrowLeft size={28} color="#333" />
            </button>
          )}
          <div className="title">Dormigo</div>
        </div>

        {/* 🔹 Right Side: City Selector + Auth */}
        <div className="d-flex gap-4 align-items-center">
          <div
            className="d-flex align-items-center city-select px-2 py-1 rounded"
            style={{
              cursor: "pointer",
              transition: "transform 0.2s ease",
            }}
            onClick={() => setShowModal(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <Building2 size={18} color="var(--accent)" className="me-1" />
            <span className="fw-semibold">{selectedCity}</span>
          </div>

          {user ? (
            <>
              <Link className="my-bookings" to="/mybookings">
                My Bookings
              </Link>

              <div className="dropdown">
                <button
                  className="btn btn-success dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  👋 {user.name}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={logout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link className="my-bookings" to="/mybookings">
                My Bookings
              </Link>
              <Link className="login-signup" to="/login">
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      {/* 🔹 Modal Popup for City Selection */}
      {showModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.6)", zIndex: 1050 }}
        >
          <div
            className="bg-white rounded-4 p-4 shadow-lg"
            style={{ width: "90%", maxWidth: "700px" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold">Choose Your City</h4>
              <X
                size={24}
                style={{ cursor: "pointer" }}
                onClick={() => setShowModal(false)}
              />
            </div>

            <input
              type="text"
              className="form-control form-control-lg mb-4"
              placeholder="🔍 Search for your city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="row g-4">
              {filteredCities.length > 0 ? (
                filteredCities.map((city, i) => (
                  <div
                    key={i}
                    className="col-4 col-md-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleCityClick(city.name)}
                  >
                    <div
                      className={`d-flex flex-column align-items-center city-item p-3 rounded-3 ${
                        selectedCity === city.name ? "active-city" : ""
                      }`}
                    >
                      <Building2
                        size={30}
                        color="var(--accent)"
                        className="mb-2"
                      />
                      <span className="fw-semibold">{city.name}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted">No cities found</p>
              )}
            </div>

            <div className="mt-4 text-center">
              <button
                className="btn btn-link fw-semibold"
                onClick={() => setSearchTerm("")}
              >
                View All Cities
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;





