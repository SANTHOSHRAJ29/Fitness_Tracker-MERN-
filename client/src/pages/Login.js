import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Auth from "../utils/auth";
import Header from "../components/Header";

export default function Login() {
  // Customizable dummy credentials
  const DUMMY_CREDENTIALS = {
    username: "admin",
    password: "test123"
  };

  const [formState, setFormState] = useState({ email: "", password: "" });
  const [showAlert, setShowAlert] = useState(false);

  const loggedIn = Auth.loggedIn();

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form (dummy check)
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Dummy credential check (no backend call)
    if (
      formState.email.trim().toLowerCase() === DUMMY_CREDENTIALS.username &&
      formState.password === DUMMY_CREDENTIALS.password
    ) {
      // Simulate successful login with dummy token
      Auth.login("dummy_jwt_token");
      console.log("Dummy login successful");
    } else {
      console.error("Invalid credentials");
      setShowAlert(true);
      return;
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  // If the user is logged in, redirect to the home page
  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="signup d-flex flex-column align-items-center justify-content-center text-center">
      <Header />
      <form onSubmit={handleFormSubmit} className="signup-form d-flex flex-column">
        {/* --------------------username-------------------- */}
        <label htmlFor="email">Username</label>
        <input
          className="form-input"
          value={formState.email}
          placeholder="admin"
          name="email"
          type="text"
          onChange={handleChange}
        />

        {/* -------------------- password-------------------- */}
        <label htmlFor="password">Password</label>
        <input
          className="form-input"
          value={formState.password}
          placeholder="test123"
          name="password"
          type="password"
          onChange={handleChange}
        />

        {/* --------------------login btn-------------------- */}
        <div className="btn-div">
          <button 
            disabled={!(formState.email && formState.password)}
            className="signup-btn mx-auto my-auto"
            type="submit"
          >
            Login
          </button>
        </div>
        {/* --------------------signup link-------------------- */}
        <p className="link-btn">
          New to FitTrack?{' '}
          <Link to="/signup">Create one</Link>
        </p>
        {showAlert && (
          <div className="err-message">
            Login failed. Use username: admin, password: test123
          </div>
        )}
      </form>
    </div>
  );
}
