import { useState } from "react"
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "../Components/Users/Login.jsx";
import { Authorized } from "../Views/Authorized.jsx";
import { Register } from "../Components/Users/RegisterUserProfile.jsx";
import { ApplicationViews } from "../Views/ApplicationViews.jsx";

export const App = () => {

  return (
    <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route
      path="*"
      element={
        <Authorized>
          <ApplicationViews />
        </Authorized>
      }
    />
  </Routes>
  )
}

export default App
