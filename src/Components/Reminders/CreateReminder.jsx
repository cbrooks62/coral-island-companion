import { useEffect, useState } from "react";
import "./Reminder.css";
import { useNavigate } from "react-router";
import { createReminder } from "../../Services/reminderServices.jsx";
import {
  Button,
  Input,
  Form,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { getAllNpcs } from "../../Services/npcServices.jsx";

export const CreateReminder = ({ currentUser }) => {
  const [npcs, setNpcs] = useState([]);
  const [npcId, setNpcId] = useState();
  const [selectedNpcName, setSelectedNpcName] = useState();

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
      npcId: npcId,
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

  return (
    <Form>
      <h2 className="new-reminder-header">Create New Reminder</h2>
      <div>
        <Input
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
        <Input
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
      <div>
        <UncontrolledDropdown group>
          <DropdownToggle caret color="light">
            NPC
          </DropdownToggle>
          <DropdownMenu>
            {npcs.map((singleNpc) => {
              return (
                <DropdownItem
                  value={singleNpc.id}
                  onClick={(e) => setNpcId(e.target.value)}
                >
                  {singleNpc.character}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
      <div>
        <Input
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
        <Button color="dark" onClick={handleSaveNewReminder}>
          Submit
        </Button>
      </fieldset>
    </Form>
  );
};
