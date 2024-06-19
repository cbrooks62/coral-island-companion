//Purpose: ReminderList.jsx is to display all Reminders on page, be able to filter through reminders with search bar, create new reminders, have the ability to 'complete' reminder
import "./Reminder.css";
import { useEffect, useState } from "react";
import { getAllReminders } from "../../Services/reminderServices.jsx";
import { Reminder } from "./Reminder.jsx";
import { Link } from "react-router-dom";
import { RemindersFilter } from "./RemindersFilter.jsx";

export const ReminderList = ({currentUser}) => {
  const [allReminders, setAllReminders] = useState([]);
  const [userReminders, setUserReminders] = useState([]);
  const [filteredReminders, setFilteredReminders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showOpenOnly, setShowOpenOnly] = useState(false);

  const getAndSetAllReminders = async () => {
    getAllReminders().then((reminderArray) => {
      setAllReminders(reminderArray);
    });
  };
  //useEffect to get all reminders from the reminders array in database
  useEffect(() => {
    getAndSetAllReminders();
  }, []);

  //useEffect to filter reminder by current user, each user should only see their personal reminders
  useEffect(() => {
    const foundReminders = allReminders.filter(
      (reminder) => reminder.userId === currentUser.id
    );
    setUserReminders(foundReminders);
  }, [allReminders]);

  //filter for searching reminders on DOM 
  useEffect(() => {
    const foundReminders = allReminders.filter((reminder) =>
      reminder.synopsis.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredReminders(foundReminders);
  }, [searchTerm, allReminders]);

  // filter to be able to select and display Current or Completed Reminders
  useEffect(() => {
    if (showOpenOnly) {
      const openReminders = allReminders.filter(
        (reminder) => reminder.dueDate === ""
      );
      setFilteredReminders(openReminders);
    } else {
      setFilteredReminders(allReminders);
    }
  }, [showOpenOnly, allReminders]);

//jsx for all reminders to be displayed on DOM

  return (
    <div className="reminder-container">
      <header className="header-reminders">Reminders</header>
      <RemindersFilter
        allReminders={allReminders}    
        setShowOpenOnly={setShowOpenOnly}
        setSearchTerm={setSearchTerm}
        currentUser={currentUser}
      />
      <article className="reminders">
        {filteredReminders.map((singleReminder) => {
          return (
            <Reminder
              singleReminder={singleReminder}
              currentUser={currentUser}
              getAndSetAllReminders={getAndSetAllReminders}
              key={singleReminder.id}
            />
          );
        })}
      </article>
      <Link to="/CreateReminder">
        <button className="button-new-reminder">Create New Reminder</button>
      </Link>
      <div className="reminder-list">
      {userReminders.map((singleReminder) => {
        return (
          <Reminder className="single-reminder"
            key={singleReminder.id}
            singleReminder={singleReminder}
            getAndSetAllReminders={getAndSetAllReminders}
          />
        );
      })}
      </div>
    </div>
  );
};
