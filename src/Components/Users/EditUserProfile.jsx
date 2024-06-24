import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getUserById, updateUserProfile } from "../../Services/userServices.jsx";
import { Button, Form, Input } from "reactstrap";

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
      navigate("/ReminderList");
    });
  };

  return (
    <div>
      <Form>
        <h2>Edit Profile</h2>
        <fieldset>
          <div>
            <Input
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
            <Input
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
          <Button color="dark" onClick={handleSaveEditUserProfile}>
            Save
          </Button>
        </fieldset>
      </Form>
    </div>
  );
};
