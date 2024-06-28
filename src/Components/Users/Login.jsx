// Purpose: Handles login functionality for the application.

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Users.css";
import { getUserByEmail } from "../../Services/userServices.jsx";

export const Login = ({currentUser}) => {
  const location = useLocation();
  const path = location.pathname
  const [email, set] = useState("");
  const navigate = useNavigate();

  //useEffect to add CICLogin.png to page
  useEffect(() => {
      document.body.style.backgroundImage = `url(src/Images/CICLogin.png)`
      document.body.style.backgroundSize = '100vw 100vh'
  }, [])


  const handleLogin = async (e) => {
    e.preventDefault();

    const foundUsers = await getUserByEmail(email);
      if (foundUsers.length === 1) {
          const user = foundUsers[0];
          localStorage.setItem(
              "companion_user",
              JSON.stringify({
                  id: user.id,
                  userName: user.userName,
                  email: user.email
              })
          );
          navigate("/");
          
      } else {
          window.alert("Invalid login");
      }
  };
  return (
    <div className="auth-container">
      <section className="login-card">
        <form className="auth-form" onSubmit={handleLogin}>
          <h1 className="header-login">Login</h1>
          <fieldset className="auth-fieldset">
            <div className="input-login">
              <input
                type="email"
                value={email}
                className="auth-form-input"
                onChange={(e) => set(e.target.value)}
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset className="auth-fieldset">
            <div className="input-button">
              <button type="submit" className="auth-button">
                Sign in
              </button>
            </div>
          </fieldset>
        </form>
      </section>
      <section className="register-link">
        <Link to="/register">New User?</Link>
      </section>
    </div>
  );
};
