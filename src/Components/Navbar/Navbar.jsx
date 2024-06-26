//Purpose: Created the navbar that will be displayed on every page, and set appropriate routes for the corresponding buttons.


import "./Navbar.css";
import { Link } from "react-router-dom";

export const CompanionNavbar = ({ currentUser }) => {


  return (
    <div className="nav-container">
      <ul className="navbar-CIC">
        <li>
          <img
            alt="logo"
            src="src/Images/Navbar-Icon.png"
            style={{
              height: 75,
              width: 150,
              paddingRight: 5,
            }}
          />
        </li>
        <li className="navbar-pages">
          <Link to="/">Reminders</Link>
        </li>
        <li className="navbar-pages">
          <Link to="/Calendar">Calendar</Link>
        </li>
        <li className="navbar-pages">
          <Link to="/Characters">Characters</Link>
        </li>
        <li className="navbar-pages">
          <Link to="/EditProfile">Profile</Link>
        </li>
        <div className="logout-card">
          <li className="navbar-username"> Hi {currentUser.userName}!<a><img className="navbar-useImg" src={currentUser.character}/></a></li>
          
          <Link to="/Login" className="logout-link">
            {" "}
            Logout
          </Link>
        </div>
      </ul>
    </div>
  );
};
