//Purpose: Created the navbar that will be displayed on every page, and set appropriate routes for the corresponding buttons.

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import "./Navbar.css";
import { useState } from "react";

export const CompanionNavbar = () => {
  return (
    <div>
      <Navbar className="navbar" fixed="top">
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
          <NavItem></NavItem>
          <NavItem>
            <NavLink href="/">Reminders</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/Calendar">Calendar</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/Chat">Chat</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/EditProfile">Profile</NavLink>
          </NavItem>
        </Nav>
        <NavItem>
          <NavLink href="/Login">Logout</NavLink>
        </NavItem>
      </Navbar>
    </div>
  );
};
