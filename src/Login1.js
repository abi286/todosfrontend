import React, { useState } from "react";
import "./SignupForm.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const result = await axios.post("http://localhost:5001/login", {
        email,
        password,
      });
      console.log(result.data.status, "login");
      if (result.data.status === "ok") {
        localStorage.setItem("token", result.data.data);
        navigate("/home");
      } else {
        setError(result.data.error || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during login");
    }
  };

  return (
    <div className="signup-container">
      <h2>Log In</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
      <p className="para">
        {" "}
        <Link to="/register">Don't have a account?</Link>
      </p>
    </div>
  );
}

export default Login;
