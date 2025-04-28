import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);  // New state for success message
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
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Make API call to the backend
    const response = await fetch("http://localhost:5001/api/auth/createuser", {
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
      setSuccess(null); // Clear any success message
    } else {
      // Successful signup, show success message
      setError(null); // Clear any previous error
      setSuccess("Signup successful! You can now log in.");  // Set success message
      setTimeout(() => {
        navigate("/login");  // Redirect after success
      }, 2000);  // Delay the redirect by 2 seconds
    }
  };

  return (
    <>
      <div className=" container-fluid d-flex justify-content-center align-items-center vh-100 position-relative ">
        <img className="position-absolute h-100 z-0 w-100" src="/login.avif" alt="login"/>
        <div className="form  rounded-5  text-white z-2">
          <form onSubmit={handleSubmit}>
            <h1 className="text-center mb-5 font-64 fw-bold text-white ">
              Signup
            </h1>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success" role="alert">
                {success}
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
                width={"10rem"}
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
            <div className="mb-4 position-relative">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Confirm Password
              </label>
              <input
                type={showPass ? "text" : "password"}
                className="form-control"
                id="exampleInputPassword1"
                name="confirmPassword"
                value={formData.confirmPassword}
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
              <button type="submit" className="btn btn-form mt-md-4 ">
                Signup
              </button>
            </div>
            <p className="pt-4 text-center font-20 alternative">
              Already have an <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
