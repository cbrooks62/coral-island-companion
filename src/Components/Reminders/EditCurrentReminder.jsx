//PURPOSE: To Edit a current Reminder, it will pop-up in a modal inside of the ReminderList module
import { useEffect, useState } from "react";
import {
  getReminderById,
  updateReminder,
} from "../../Services/reminderServices.jsx";
import { getAllNpcs } from "../../Services/npcServices.jsx";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

export const EditCurrentReminder = ({
  currentUser,
  singleReminder,
  closeModal,
  getAndSetAllReminders,
}) => {
  const [npcId, setNpcId] = useState({ npcId: singleReminder.npcId, character: singleReminder.npc.character });
  const [myReminder, setMyReminder] = useState({
  
    userId: currentUser.id,
    npcId: npcId.character,
    title: singleReminder.title,
    synopsis: singleReminder.synopsis,
    dueDate: singleReminder.dueDate,
    completed: singleReminder.completed,
  });
  const [npcs, setNpcs] = useState([]);
  

  useEffect(() => {
    getReminderById(singleReminder.id).then((reminderObj) => {
      setMyReminder(reminderObj);
    });
  }, []);
  

  //useEffect to get all NPCs from database
  useEffect(() => {
    getAllNpcs().then((data) => setNpcs(data));
  }, []);

const handleSaveEdit = (e) => {
    e.preventDefault()
    const reminderData = { ...myReminder }
    reminderData.id = myReminder.id
    updateReminder(reminderData)
    .then(() => closeModal())
    .then(getAndSetAllReminders)
}

  //Conditional to render the correct state of the character on dropdown. If the npcId state has a character (mean it returns true), change the name displayed to that.
  let toggleNpc = myReminder?.npc?.character;
  if (npcId.character) {
    toggleNpc = npcId.character;
  }

  //jsx to edit a current reminder from Reminder.jsx
  return (
    <div className="reminder-edit-container">
      <header className="edit-reminder-header">
        <img src="src/Images/Headers/Edit-Reminder-header.png" />
      </header>
      <div className="edit-reminder-card">
            <h2 className="edit-reminder-title">Edit Current Reminder</h2>
        <fieldset>
          <div>
            <input
              className="title-text-field"
              type="text"
              text="text"
              defaultValue={myReminder.title}
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
            <input
              className="title-text-field"
              type="text"
              text="text"

              defaultValue={myReminder.dueDate}
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
              <DropdownMenu className="npc-dropdown-scroll">
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
              defaultValue={myReminder.synopsis}
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
              handleSaveEdit(e);
            }}
          >
            Save
          </button>
          <button className="button-edit" onClick={() => closeModal()}>
            Cancel
          </button>
        </fieldset>
      </div>
    </div>
  );
};
