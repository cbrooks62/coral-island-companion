//Purpose: Created the navbar that will be displayed on every page, and set appropriate routes for the corresponding buttons.

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Card,
} from "reactstrap";
import "./Navbar.css";
import { useState } from "react";

export const CompanionNavbar = ({currentUser}) => {
  return (
    <div>
      <Navbar className="navbar-CIC" fixed="top">
        <NavbarBrand>
          <img
            alt="coral island companion logo"
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
            <NavLink href="/Chat">Chat</NavLink>
          </div>
          <div>
            <NavLink href="/EditProfile">Profile</NavLink>
          </div>
        </Nav>
        <Card>
        <div> Hi {currentUser.userName}!</div>
          <NavLink href="/Login"> Logout</NavLink>
        </Card>
      </Navbar>
    </div>
  );
};
