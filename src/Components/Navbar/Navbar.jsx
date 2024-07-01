//Purpose: Created the navbar that will be displayed on every page, and set appropriate routes for the corresponding buttons.

import { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { getAllUsers, getUserById } from "../../Services/userServices.jsx";

export const CompanionNavbar = ({currentUser, setCurrentUser}) => {
  const [npc, setNpc] = useState([]);
  // const [loggedInUser, setLoggedInUser] = useState({});
  const userId = currentUser.id

  // useEffect to get all NPCs from database
  useEffect(() => { 
    if (!currentUser) {
      const localCompanionUser = localStorage.getItem("companion_user");
      const companionUserObject = JSON.parse(localCompanionUser)
      setCurrentUser(companionUserObject)
    } try{ 

    getUserById(userId).then((data) => setNpc(data));
  } catch (err) {console.log(err)}
  }, []);

  // Add a filter to get the username by currentUser.id

  return (
    <div className="nav-container">
      <ul className="navbar-CIC">
        <li>
          <img
            alt="logo"
            src="/src/Images/Navbar-Icon.png"
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
            Hi {npc?.userName}!
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
