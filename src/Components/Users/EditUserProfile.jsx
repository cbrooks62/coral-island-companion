import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getUserById, updateUserProfile } from "../../Services/userServices.jsx";

export const EditUserProfile = ({currentUser}) => {
  const [myProfile, setMyProfile] = useState([]);

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
      email: myProfile.email,
      userName: myProfile.userName,
    };
    updateUserProfile(editProfile).then(() => {
      navigate("/");
    });
  };

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
