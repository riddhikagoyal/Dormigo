import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const API = import.meta.env.VITE_BACKEND_ORIGIN || "http://127.0.0.1:5000";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false); // 🔹 toggle state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";

    try {
      const res = await fetch(`${API}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isRegister ? { name, email, password } : { email, password }
        ),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      // ✅ Save token + user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      login(data.user, data.token);

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Network error");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage: 'url("/login bg .jpg")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        className="login-box text-center"
        style={{
          backgroundColor: "rgba(255,255,255,0.9)",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h1 className="mb-4">{isRegister ? "Register" : "Login"}</h1>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "#1abc9c",
              border: "none",
              fontWeight: "500",
              padding: "10px",
              borderRadius: "8px",
              color: "#fff",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = "#16a085")
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = "#1abc9c")
            }
          >
            {isRegister ? "Register" : "Login"}
          </button>

          {error && <p className="text-danger mt-2">{error}</p>}

          <p className="mt-3">
            {isRegister ? "Already have an account?" : "New user?"}{" "}
            <span
              style={{
                color: "#1abc9c",
                fontWeight: "500",
                cursor: "pointer",
              }}
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Login here" : "Register here"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

