import { useEffect, useState } from "react";
import "./Reminder.css";
import { useNavigate } from "react-router";
import { createReminder } from "../../Services/reminderServices.jsx";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { getAllNpcs } from "../../Services/npcServices.jsx";

export const CreateReminder = ({ currentUser }) => {
  const [npcs, setNpcs] = useState([]);
  const [npcId, setNpcId] = useState({ character: "NPC" });

  const [myReminder, setMyReminder] = useState({
    title: "",
    dueDate: "",
    npcId: "",
    synopsis: "",
    completed: false,
  });

  const navigate = useNavigate();

  const handleSaveNewReminder = (e) => {
    e.preventDefault();
    const newReminder = {
      userId: currentUser.id,
      title: myReminder.title,
      dueDate: myReminder.dueDate,
      npcId: npcId.npcId,
      synopsis: myReminder.synopsis,
      completed: myReminder.completed,
    };
    createReminder(newReminder).then(() => {
      navigate("/");
    });
  };

  useEffect(() => {
    getAllNpcs().then((data) => setNpcs(data));
  }, []);

  //jsx to display form to create new reminder
  return (
    <div className="reminder-container">
      <h2 className="new-reminder-header"></h2>
    <form className="create-reminder-card">
      <div>
        <input
        className="title-text-field"
          type="text"
          text="text"
          placeholder="Title"
          onChange={(e) => {
            const reminderCopy = { ...myReminder };
            reminderCopy.title = e.target.value;
            setMyReminder(reminderCopy);
          }}
        />
      </div>
      <div>
        {/* implement drop downs later for Season and Day*/}
        <input
        className="title-text-field"
          type="text"
          text="text"
          placeholder="Season and Day"
          onChange={(e) => {
            const reminderCopy = { ...myReminder };
            reminderCopy.dueDate = e.target.value;
            setMyReminder(reminderCopy);
          }}
        />
      </div>
      <div className="npc-dropdown">
        <UncontrolledDropdown group>
          <DropdownToggle caret color="light">
            {npcId.character}
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
      <div>
        <textarea
         className="synopsis-text-field"
          type="text"
          text="text"
          placeholder="Synopsis"
          onChange={(e) => {
            const reminderCopy = { ...myReminder };
            reminderCopy.synopsis = e.target.value;
            setMyReminder(reminderCopy);
          }}
        />
      </div>
      <fieldset>
        <button className="button-create-submit" onClick={handleSaveNewReminder}>
          Submit
        </button>
      </fieldset>
    </form>
    </div>
  );
};
