import React, { useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../css/LoginSignup.css";

export default function Signup() {
  const userNameRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const addressRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const passwordRef = useRef(null);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePhoneNumber = (phonenumber) => {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phonenumber);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    return password.length >= minLength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value.trim();
    const phonenumber = phoneNumberRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validatePhoneNumber(phonenumber)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setError("");

    const formData = {
      username: userNameRef.current.value,
      firstname: firstNameRef.current.value,
      lastname: lastNameRef.current.value,
      email,
      address: addressRef.current.value,
      phonenumber,
      password,
    };

    try {
      const response = await axios.post(
        "http://3.110.166.85:7000/auth/signup",
        formData
      );
      localStorage.setItem("jwt", response.data.jwt);
      navigate("/");
    } catch (err) {
      setError(
        err.response ? err.response.data.message : "Signup failed. Try again."
      );
    }
  };

  return (
    <div className="login-signup-page">
      <div className="signup-container">
        <h1>StockQuest</h1>
        <div className="signup-box">
          <h2>Create a New Account!</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="UserName"
            ref={userNameRef}
            required
          />
          <input
            type="text"
            placeholder="First Name"
            ref={firstNameRef}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            ref={lastNameRef}
            required
          />
          <input type="email" placeholder="Email" ref={emailRef} required />
          <input type="text" placeholder="Address" ref={addressRef} required />
          <input
            type="text"
            placeholder="Phone number"
            ref={phoneNumberRef}
            required
          />
          <input
            type="password"
            placeholder="Password"
            ref={passwordRef}
            required
          />

          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="signup-button">
            Register
          </button>
          <Link to="/" className="login-link">
            Already have an account?
          </Link>
        </form>
      </div>
    </div>
  );
}
