import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import News from "./components/News";
import Navbar from "./components/Navbar";

function App() {
  const pageSize = 12;
  const [mode, setMode] = useState("light");

  return (
    <Router>
      <AppContent mode={mode} setMode={setMode} pageSize={pageSize} />
    </Router>
  );
}

function AppContent({ mode, setMode, pageSize }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authToken"));

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token); // Update the login status

    const currentPath = window.location.pathname;
    const publicRoutes = ["/login", "/signup"];

    // Redirect to home if logged in and on a public route
    if (token && publicRoutes.includes(currentPath)) {
      navigate("/");
    }
  }, [navigate]);

  const togglemode = () => {
    if (mode === "dark") {
      document.body.style.backgroundColor = "#FFFFFF";
      document.body.style.color = "black";
      setMode("light");
    } else {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
      setMode("dark");
    }
  };

  return (
    <>
      {isLoggedIn && <Navbar mode={mode} togglemode={togglemode} />}
      <Routes>
        {/* Public Routes */}
        {!isLoggedIn && <Route path="/login" element={<Login />} />}
        {!isLoggedIn && <Route path="/signup" element={<Signup />} />}

        {/* Private Routes: Only accessible if logged in */}
        <Route
          path="/"
          element={<PrivateRoute element={<News key="general" pagesize={pageSize} category="general" mode={mode} />} />}
        />
        <Route
          path="/business"
          element={<PrivateRoute element={<News key="business" pagesize={pageSize} category="business" mode={mode} />} />}
        />
        <Route
          path="/entertainment"
          element={<PrivateRoute element={<News key="entertainment" pagesize={pageSize} category="entertainment" mode={mode} />} />}
        />
        <Route
          path="/health"
          element={<PrivateRoute element={<News key="health" pagesize={pageSize} category="health" mode={mode} />} />}
        />
        <Route
          path="/science"
          element={<PrivateRoute element={<News key="science" pagesize={pageSize} category="science" mode={mode} />} />}
        />
        <Route
          path="/general"
          element={<PrivateRoute element={<News key="general" pagesize={pageSize} category="general" mode={mode} />} />}
        />
        <Route
          path="/technology"
          element={<PrivateRoute element={<News key="technology" pagesize={pageSize} category="technology" mode={mode} />} />}
        />
        <Route
          path="/sports"
          element={<PrivateRoute element={<News key="sports" pagesize={pageSize} category="sports" mode={mode} />} />}
        />
      </Routes>
      {isLoggedIn && <Footer />}
    </>
  );
}

// PrivateRoute component to protect routes
function PrivateRoute({ element }) {
  const isLoggedIn = !!localStorage.getItem("authToken");
  if (!isLoggedIn) {
    // If the user is not logged in, redirect to login page
    return <Navigate to="/login" />;
  }
  // If logged in, render the passed element (page)
  return element;
}

export default App;
