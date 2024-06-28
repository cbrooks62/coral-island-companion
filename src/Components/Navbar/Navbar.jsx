//Purpose: Created the navbar that will be displayed on every page, and set appropriate routes for the corresponding buttons.

import { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { getUserById } from "../../Services/userServices.jsx";


export const CompanionNavbar = ({ currentUser }) => {
  const [npc, setNpc] = useState([])

  //useEffect to get all NPCs from database
  useEffect(() => {
    getUserById(currentUser).then((data) => setNpc(data));
  }, []);

  return (
    <div className="nav-container">
      <ul className="navbar-CIC">
        <li>
          <img
            alt="logo"
            src="src/assets/Images/Navbar-Icon.png"
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
          <li className="navbar-username">
            {" "}
            Hi {currentUser.userName}!
            <a>
             <img
            alt="profile-character"
            src={npc?.npc?.urlImg} 
            style={{
              height: 50,
              width: 50,
            }}
          />
            </a>
          </li>
          <Link to="/Login" className="logout-link">
            {" "}
            Logout
          </Link>
        </div>
      </ul>
    </div>
  );
};
