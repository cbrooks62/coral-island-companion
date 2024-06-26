import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
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
  // const [npcId, setNpcId] = useState({ character: myProfile.character });

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

 
  return (
    <div>
      <header className="profile-header"></header>
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
        </fieldset>
      </div>
    </div>
  );
};
