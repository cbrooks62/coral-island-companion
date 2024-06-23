//Purpose: Created the navbar that will be displayed on every page, and set appropriate routes for the corresponding buttons.

import { Navbar, NavbarBrand, Nav, NavLink, Card } from "reactstrap";
import "./Navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export const CompanionNavbar = ({ currentUser }) => {
  return (
  <div className="nav-container">
      <ul className="navbar-CIC">
        <li>
          <img
            alt="logo"
            src="./src/Images/CI-icon.png"
            style={{
              height: 50,
              width: 55,
              paddingRight: 5,
            }}
          />
          Coral Island Companion
        </li>
     
          <li>
            <Link href="/">Reminders</Link>
          </li>
          <li>
            <Link href="/Calendar">Calendar</Link>
          </li>
          <li>
            <Link href="/Characters">Characters</Link>
          </li>
          <li>
            <Link href="/EditProfile">Profile</Link>
          </li>
        <Card className="logout-link">
          <li className="navbar-username"> Hi {currentUser.userName}!</li>
          <Link href="/Login" className="logout-link"> Logout</Link>
        </Card>
      </ul>
      </div>
  );
};
