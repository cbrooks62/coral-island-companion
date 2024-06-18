// Purpose: Handles login functionality for the application.
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Users.css";
import { getUserByEmail } from "../../Services/userServices.jsx";

export const Login = () => {
  const [email, set] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const foundUsers = await getUserByEmail(email);
      if (foundUsers.length === 1) {
          const user = foundUsers[0];
          localStorage.setItem(
              "nutshell_user",
              JSON.stringify({
                  id: user.id,
              })
          );

          navigate("/");
      } else {
          window.alert("Invalid login");
      }
  };

  return (
    <div id="root" className="auth-container">
      <section className="login-card">
        <form className="auth-form" onSubmit={handleLogin}>
          <h1 className="header-login">Login</h1>
          <fieldset className="auth-fieldset">
            <div className="input-login">
              <input
                type="email"
                value={email}
                className="auth-form-input"
                onChange={(evt) => set(evt.target.value)}
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
