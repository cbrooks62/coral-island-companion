//Purpose: Handles user registration functionality for the  app.

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Users.css"
import { createUser, getUserByEmail } from "../../Services/userServices.jsx"
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap"
import { getAllNpcs } from "../../Services/npcServices.jsx"

export const Register = (props) => {
  const [user, setUser] = useState({
    id: "",
    npcId: "",
    character: "",
    email: "",
    username: "",
  })
  const [npcs, setNpcs] = useState([])
  const [npcId, setNpcId] = useState({ character: user.npcId });

  let navigate = useNavigate()

  const registerNewUser = () => {
    const newUser = {
      ...user
    }

    createUser(newUser).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "companion_user",
          JSON.stringify({
            id: createdUser.id
          })
        )

        navigate("/")
      }
    })
  }


  const handleRegister = (e) => {
    e.preventDefault()
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists")
      } else {
        // Good email, create user.
        registerNewUser()
      }
    })
  }

  const updateUser = (evt) => {
    const copy = { ...user }
    copy[evt.target.id] = evt.target.value
    setUser(copy)
  }

   //useEffect to get all NPCs from database
   useEffect(() => {
    getAllNpcs().then((data) => setNpcs(data));
  }, []);

/*
Conditional to render the correct state of the character on dropdown. If the npcId state has a character (mean it returns true), change the name displayed to that.
*/
let toggleNpc = user?.npc?.urlImg;
if (npcId.urlImg) {
  toggleNpc = npcId.urlImg;
}

  return (
    <div className="auth-container">
      <form className="auth-form-register" onSubmit={handleRegister}>
        <h1 className="header-register">Welcome!</h1>
        <fieldset className="auth-fieldset">
          <div className="input-login">
            <input
              onChange={updateUser}
              type="text"
              id="username"
              className="auth-form-input"
              placeholder="Enter your username"
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
                {toggleNpc}
              </DropdownToggle>
              <DropdownMenu>
                {npcs.map((singleNpc) => {
                  {console.log(typeof singleNpc.id)}
                  return (
                    <DropdownItem
                      key={singleNpc.id}
                      value={singleNpc.id}
                      
              //         onChange={updateUser}
              // type="email"
              // id="email"
              // className="auth-form-input"
              // placeholder="Email address"
              // required
                      onClick={(e) => {
                        const profileCopy = { ...updateUser };
                        profileCopy.npcId = singleNpc.id;
                        profileCopy.character = singleNpc.character;
                        setUser(profileCopy);
                      }}
                    >
                      <img 
                      className="dropdown-img"
                      src={singleNpc.urlImg}/>
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <div className="input-button">
            <button type="submit" className="auth-button">Register</button>
          </div>
        </fieldset>
      </form>
    </div>
  )
}