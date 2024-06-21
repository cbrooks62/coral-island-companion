//Purpose: Created the navbar that will be displayed on every page, and set appropriate routes for the corresponding buttons.

import { Navbar, NavbarBrand, Nav, NavLink, Card } from "reactstrap";
import "./Navbar.css";
import { useState } from "react";

export const CompanionNavbar = ({ currentUser }) => {
  return (
    <div>
      <Navbar className="navbar-CIC" fixed="top" color="warning">
        <NavbarBrand>
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
        </NavbarBrand>
        <Nav>
          <div>
            <NavLink href="/">Reminders</NavLink>
          </div>
          <div>
            <NavLink href="/Calendar">Calendar</NavLink>
          </div>
          <div>
            <NavLink href="/Characters">Characters</NavLink>
          </div>
          <div>
            <NavLink href="/EditProfile">Profile</NavLink>
          </div>
        </Nav>
        <Card className="logout-link">
          <div className="navbar-username"> Hi {currentUser.userName}!</div>
          <NavLink href="/Login" className="logout-link"> Logout</NavLink>
        </Card>
      </Navbar>
    </div>
  );
};
