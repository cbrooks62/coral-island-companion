import "./Reminder.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  Input,
  UncontrolledDropdown,
} from "reactstrap";
import {
  getReminderById,
  updateReminder,
} from "../../Services/reminderServices.jsx";
import { getAllNpcs } from "../../Services/npcServices.jsx";

export const EditReminder = ({ currentUser }) => {
  const [myReminder, setMyReminder] = useState({});
  const [npcs, setNpcs] = useState([]);
  const [npcId, setNpcId] = useState({ character: myReminder.npcId });

  const { reminderId } = useParams();

  useEffect(() => {
    getReminderById(reminderId).then((reminderObj) => {
      setMyReminder(reminderObj);
    });
  }, [reminderId]);

  const navigate = useNavigate();

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
      navigate("/ReminderList");
    });
  };

  //useEffect to get all NPCs from database
  useEffect(() => {
    getAllNpcs().then((data) => setNpcs(data));
  }, []);

/*
Conditional to render the correct state of the character on dropdown. If the npcId state has a character (mean it returns true), change the name displayed to that.
*/
  let toggleNpc = myReminder?.npc?.character;
  if (npcId.character) {
    toggleNpc = npcId.character;
  }

  //jsx to edit a current reminder
  return (
    <div className="reminder-container">
      <form>
       <header className="edit-reminder-header"></header>
        <fieldset>
          <div>
            <input
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
          <div>
            <input
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
          <button color="dark" onClick={handleSaveEditReminder}>
            Save
          </button>
        </fieldset>
      </form>
    </div>
  );
};
