import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getUserById, updateUserProfile } from "../../Services/userServices.jsx";
import { getAllNpcs } from "../../Services/npcServices.jsx";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";

export const EditUserProfile = ({currentUser}) => {
  const [myProfile, setMyProfile] = useState([]);
  const [npcs, setNpcs] = useState([])
  const [npcId, setNpcId] = useState({ character: myProfile.npcId });

    useEffect(() => {
    getUserById(currentUser.id).then((userObj) => {
      setMyProfile(userObj);
    });
  }, [currentUser.id]);

  const navigate = useNavigate();

  const handleSaveEditUserProfile = (e) => {
    e.preventDefault();
    const editProfile = {
      userId: myProfile.userId,
      npcId: myProfile.npcId,
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

/*
Conditional to render the correct state of the character on dropdown. If the npcId state has a character (mean it returns true), change the name displayed to that.
*/
let toggleNpc = myProfile?.npc?.character;
if (npcId.character) {
  toggleNpc = npcId.character;
}

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
                {toggleNpc}
              </DropdownToggle>
              <DropdownMenu>
                {npcs.map((singleNpc) => {
                  {console.log(typeof singleNpc.id)}
                  return (
                    <DropdownItem
                      key={singleNpc.id}
                      value={singleNpc.id}
                      onClick={(e) =>
                        setNpcId({
                          npcId: e.target.value,
                          character: singleNpc.character,
                        })
                      }
                    >
                      {singleNpc.character}
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
          onClick={handleSaveEditUserProfile}>
            Save
          </button>
        </fieldset>
      </div>
    </div>
  );
};
