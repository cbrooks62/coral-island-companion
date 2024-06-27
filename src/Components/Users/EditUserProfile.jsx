import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  deleteProfile,
  getUserById,
  updateUserProfile,
} from "../../Services/userServices.jsx";
import { getAllNpcs } from "../../Services/npcServices.jsx";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

export const EditUserProfile = ({ currentUser }) => {
  const [myProfile, setMyProfile] = useState([]);
  const [npcs, setNpcs] = useState([]);


  useEffect(() => {
    getUserById(currentUser.id).then((userObj) => {
      setMyProfile(userObj);
    });
  }, [currentUser]);

  const navigate = useNavigate();

  const handleSaveEditUserProfile = (e) => {
    e.preventDefault();
    const editProfile = {
      id: currentUser.id,
      npcId: myProfile.npcId,
      character: myProfile.character,
      email: myProfile.email,
      userName: myProfile.userName,
    };
    updateUserProfile(editProfile).then(() => {
      navigate("/");
    });
  };

  //useEffect to get all NPCs from database
  useEffect(() => {
    getAllNpcs().then((data) => setNpcs(data));
  }, []);

  //function to handle deleting a user profile from database
  // const handleDeleteProfile = () => {
  //   deleteProfile(myProfile.id).then(() => {
  //     updateUserProfile();
  //   });
  // };
 
   //useEffect to add background.png to page
useEffect(() => {
  document.body.style.backgroundImage = `url(src/Images/background.png)`
  document.body.style.backgroundSize = '100vw 100vh'
  document.body.style.backgroundRepeat = "repeat-y"
}, [])

  return (
    <div className="profile-container">
      <header className="profile-header"><img src="src/Images/Headers/Profile-header.png"/></header>
      <div className="profile-edit-card">
        <fieldset>
          <div>
            <input
              className="username-text-field"
              type="text"
              text="text"
              placeholder={myProfile.userName}
              onChange={(e) => {
                const profileCopy = { ...myProfile };
                profileCopy.userName = e.target.value;
                setMyProfile(profileCopy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div>
            <input
              className="email-text-field"
              type="text"
              text="text"
              placeholder={myProfile.email}
              onChange={(e) => {
                const profileCopy = { ...myProfile };
                profileCopy.email = e.target.value;
                setMyProfile(profileCopy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div>
            <UncontrolledDropdown group>
              <DropdownToggle caret color="light">
                {myProfile.character}
              </DropdownToggle>
              <DropdownMenu>
                {npcs.map((singleNpc) => {
                  return (
                    <DropdownItem
                      key={singleNpc.id}
                      value={singleNpc.id}
                      onClick={(e) => {
                        const profileCopy = { ...myProfile };
                        profileCopy.npcId = singleNpc.id;
                        profileCopy.character = singleNpc.character;
                        setMyProfile(profileCopy);
                      }}
                    >
                      <img className="dropdown-img" src={singleNpc.urlImg}/>
                      
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </fieldset>
        <fieldset>
          <button
            className="button-save-profile"
            onClick={handleSaveEditUserProfile}
          >
            Save
          </button>
          {/* <button className="button-delete" onClick={handleDeleteProfile}>
            Delete
          </button> */}
        </fieldset>
      </div>
    </div>
  );
};
