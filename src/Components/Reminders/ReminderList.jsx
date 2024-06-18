import "./Reminder.css";
import { useEffect, useState } from "react";
import { getAllReminders } from "../../Services/reminderServices.jsx";
import { Button } from "reactstrap";
import { Reminder } from "./Reminder.jsx";
import { Link } from "react-router-dom";

export const ReminderList = ({currentUser}) => {
  const [allReminders, setAllReminders] = useState([]);
  const [userReminders, setUserReminders] = useState([]);

  const getAndSetAllReminders = async () => {
    getAllReminders().then((reminderArray) => {
      setAllReminders(reminderArray);
    });
  };
  useEffect(() => {
    getAndSetAllReminders();
  }, []);

  useEffect(() => {
    const foundReminders = allReminders.filter(
      (reminder) => reminder.userId === currentUser.id
    );
    setUserReminders(foundReminders);
  }, [allReminders]);

  return (
    <div className="reminder-container">
      <header className="header-reminders">Reminders</header>
      <Link to="/CreateReminder">
        <Button>Create New Reminder</Button>
      </Link>
      {userReminders.map((singleReminder) => {
        return (
          <Reminder
            key={singleReminder.id}
            singleReminder={singleReminder}
            getAndSetAllReminders={getAndSetAllReminders}
          />
        );
      })}
    </div>
  );
};
