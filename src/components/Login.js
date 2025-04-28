import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const showPassword = () => {
    setShowPass(!showPass);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for empty fields
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    // Make API call to login
    const response = await fetch("http://localhost:5001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    const json = await response.json();

    if (json.errors) {
      // Handle validation errors from the backend
      setError(json.errors[0].msg);
    } else if (json.success) {
      // Successful login, redirect to the news page
      setError(null); // Clear any previous error
      localStorage.setItem("authToken", json.authtoken); // Store JWT token in localStorage
      navigate("/"); // Redirect to the news page (or homepage)
    } else {
      // If login fails, show error message
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <>
  
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100 overflow-hidden position-relative">
        <img className="position-absolute h-100 z-0 w-100" src="/login.avif"  alt="login"/>
        <div className="form rounded-5  text-white z-2">
          <form onSubmit={handleSubmit}>
            <h1 className="text-center mb-5 font-64   fw-bold text-white">
              Login
            </h1>
            {error && (
              <div className="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>{error}</strong>
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            )}
            <div className="mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="abc@gmail.com"
              />
            </div>
            <div className="mb-4 position-relative">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type={showPass ? "text" : "password"}
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="*********"
              />
              <img
                src={showPass ? "/eye-slash.svg" : "/eye.svg"}
                alt="eye icon"
                onClick={showPassword}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "70%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn mt-md-4 btn-form">
                Login
              </button>
            </div>
            <p className="pt-4 text-center font-20 alternative">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
