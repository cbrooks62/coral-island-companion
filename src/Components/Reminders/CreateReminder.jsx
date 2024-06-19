import { useState } from "react";
import "./Reminder.css";
import { useNavigate } from "react-router";
import { createReminder } from "../../Services/reminderServices.jsx";
import { Button, Input, Form } from "reactstrap";

export const CreateReminder = ({ currentUser }) => {
  const [myReminder, setMyReminder] = useState({
    title: "",
    dueDate: "",
    character: "",
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
      character: myReminder.character,
      synopsis: myReminder.synopsis,
      completed: !myReminder.completed,
    };
    createReminder(newReminder).then(() => {
      navigate("/");
    });
  };

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
            reminderCopy.reminder = e.target.value
            setMyReminder(reminderCopy)
          }}
        />
      </div>
      <div>
        <Input
          type="text"
          text="text"
          placeholder="Season and Day"
          onChange={(e) => {
            const reminderCopy = { ...myReminder };
            reminderCopy.reminder = e.target.value
            setMyReminder(reminderCopy)
          }}
        />
      </div>
      <div>
        <Input
          type="text"
          text="text"
          placeholder="Character"
          onChange={(e) => {
            const reminderCopy = { ...myReminder };
            reminderCopy.reminder = e.target.value
            setMyReminder(reminderCopy)
          }}
        />
      </div>
      <div>
        <Input
          type="text"
          text="text"
          placeholder="Synopsis"
          onChange={(e) => {
            const reminderCopy = { ...myReminder };
            reminderCopy.reminder = e.target.value
            setMyReminder(reminderCopy)
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
