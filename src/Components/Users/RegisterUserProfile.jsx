//Purpose: Handles user registration functionality for the  app.

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Users.css"
import { createUser, getUserByEmail } from "../../Services/userServices.jsx"

export const Register = (props) => {
  const [user, setUser] = useState({
    email: "",
    username: ""
  })
  let navigate = useNavigate()

  const registerNewUser = () => {
    const newUser = {
      ...user
    }

    createUser(newUser).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "companion_user",
          JSON.stringify({
            id: createdUser.id
          })
        )

        navigate("/ReminderList")
      }
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists")
      } else {
        // Good email, create user.
        registerNewUser()
      }
    })
  }

  const updateUser = (evt) => {
    const copy = { ...user }
    copy[evt.target.id] = evt.target.value
    setUser(copy)
  }

  return (
    <div className="auth-container">
      <form className="auth-form-register" onSubmit={handleRegister}>
        <h1 className="header-register">Welcome!</h1>
        <fieldset className="auth-fieldset">
          <div className="input-login">
            <input
              onChange={updateUser}
              type="text"
              id="username"
              className="auth-form-input"
              placeholder="Enter your username"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <div className="input-login">
            <input
              onChange={updateUser}
              type="email"
              id="email"
              className="auth-form-input"
              placeholder="Email address"
              required
            />
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <div className="input-button">
            <button type="submit" className="auth-button">Register</button>
          </div>
        </fieldset>
      </form>
    </div>
  )
}