//Purpose: Handles user registration functionality for the  app.

import "./Users.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, getUserByEmail } from "../../Services/userServices.jsx";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { getAllNpcs } from "../../Services/npcServices.jsx";

export const Register = (props) => {
  const [user, setUser] = useState({
    id: "",
    npcId: "",
    character: "",
    email: "",
    userName: "",
  });

  const [npcs, setNpcs] = useState([]);

  let navigate = useNavigate();

  const registerNewUser = () => {
    const newUser = {
      ...user,
    };

    createUser(newUser).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "companion_user",
          JSON.stringify({
            id: createdUser.id,
          })
        );

        navigate("/");
      }
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists");
      } else {
        // Good email, create user.
        registerNewUser();
      }
    });
  };

  const updateUser = (e) => {
    const copy = { ...user };
    copy[e.target.id] = e.target.value;
    setUser(copy);
  };

  //useEffect to get all NPCs from database
  useEffect(() => {
    getAllNpcs().then((data) => setNpcs(data));
  }, []);

  return (
    <div className="auth-container">
      <form className="auth-form-register" onSubmit={handleRegister}>
        <h1 className="header-register">Welcome!</h1>
        <fieldset className="auth-fieldset">
          <div className="input-login">
            <input
              onChange={updateUser}
              type="text"
              id="userName"
              className="auth-form-input"
              placeholder="Username"
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
        <fieldset>
          <div>
            <UncontrolledDropdown group>
              <DropdownToggle caret color="light">
                {user.character}
              </DropdownToggle>
              <DropdownMenu>
                {npcs.map((singleNpc) => {
                  {
                    console.log(typeof singleNpc.id);
                  }
                  return (
                    <DropdownItem
                      key={singleNpc.id}
                      value={singleNpc.id}
                      onClick={(e) => {
                        const profileCopy = { ...user };
                        profileCopy.npcId = singleNpc.id;
                        profileCopy.character = singleNpc.character;
                        setUser(profileCopy);
                      }}
                    >
                      <img className="dropdown-img" src={singleNpc.urlImg} />
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <div className="input-button">
            <button type="submit" className="auth-button">
              Register
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};
