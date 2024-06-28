import "./Reminder.css";
import { useEffect, useState } from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import {
  getReminderById,
  updateReminder,
} from "../../Services/reminderServices.jsx";
import { getAllNpcs } from "../../Services/npcServices.jsx";
import { useNavigate, useParams } from "react-router-dom";

export const EditReminder = ({ currentUser }) => {
  const [myReminder, setMyReminder] = useState({});
  const [npcs, setNpcs] = useState([]);
  const [npcId, setNpcId] = useState({ character: myReminder.npcId });

  const { reminderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getReminderById(reminderId).then((reminderObj) => {
      setMyReminder(reminderObj);
    });
  }, []);

  //useEffect to get all NPCs from database
  useEffect(() => {
    getAllNpcs().then((data) => setNpcs(data));
  }, []);

  //useEffect to add background.png to page
  useEffect(() => {
    document.body.style.backgroundImage = `url(src/Images/background.png)`;
    document.body.style.backgroundSize = "100vw 100vh";
    document.body.style.backgroundRepeat = "repeat-y";
  }, []);

  const handleSaveEditReminder = (e) => {
    e.preventDefault();
    const editCurrentReminder = {
      id: myReminder.id,
      userId: currentUser.id,
      npcId: npcId.npcId,
      title: myReminder.title,
      synopsis: myReminder.synopsis,
      dueDate: myReminder.dueDate,
      completed: myReminder.completed,
    };
    updateReminder(editCurrentReminder).then(() => {
      navigate("/");
    });
  };

  //   /*
  // Conditional to render the correct state of the character on dropdown. If the npcId state has a character (mean it returns true), change the name displayed to that.
  // */
  let toggleNpc = myReminder?.npc?.character;
  if (npcId.character) {
    toggleNpc = npcId.character;
  }

  //jsx to edit a current reminder
  return (
    <div className="reminder-container">
      <header className="edit-reminder-header">
        <img src="src/Images/Headers/Edit-Reminder-header.png" /></header>
      <form>
        <div className="edit-reminder-card">
          <fieldset>
            <div>
              <h2>Edit Current Reminder</h2>
              <input
                className="title-text-field"
                type="text"
                text="text"
                placeholder={myReminder.title}
                onChange={(e) => {
                  const reminderCopy = { ...myReminder };
                  reminderCopy.title = e.target.value;
                  setMyReminder(reminderCopy);
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div>
              {/* implement drop downs later for Season and Day*/}
              <input
                className="title-text-field"
                type="text"
                text="text"
                placeholder={myReminder.dueDate}
                onChange={(e) => {
                  const reminderCopy = { ...myReminder };
                  reminderCopy.dueDate = e.target.value;
                  setMyReminder(reminderCopy);
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="npc-dropdown">
              <UncontrolledDropdown group>
                <DropdownToggle caret color="light">
                  {toggleNpc}
                </DropdownToggle>
                <DropdownMenu>
                  {npcs.map((singleNpc) => {
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
            <div>
              <input
                className="synopsis-text-field "
                type="text"
                text="text"
                placeholder={myReminder.synopsis}
                onChange={(e) => {
                  const reminderCopy = { ...myReminder };
                  reminderCopy.synopsis = e.target.value;
                  setMyReminder(reminderCopy);
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <button
              className="button-create-submit"
              onClick={(e) => {
                handleSaveEditReminder(e);
              }}
            >
              Save
            </button>
          </fieldset>
        </div>
      </form>
    </div>
  );
};
