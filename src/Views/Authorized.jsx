//Purpose: Module that will redirect the user to the login page if they are not currently logged in.

import { Navigate, useLocation } from "react-router-dom"

// We can access child components the same way we access props. Child components are passed to our props as a key/value pair where
// children is the key.

export const Authorized = ({ children }) => {
  let location = useLocation()

  // Check if user is logged in. If they are, render the CHILD components (in this case, the ApplicationViews component)
  if (localStorage.getItem("companion_user")) {
    return children
  }
  // If the user is NOT logged in, redirect them to the login page using the Navigate component from react-router-dom
  else {
    return <Navigate to={`/login`} state={{ from: location }} replace />
  }
}