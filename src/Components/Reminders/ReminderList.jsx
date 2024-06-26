//Purpose: ReminderList.jsx is to display all Reminders on page, be able to filter through reminders with search bar, create new reminders, have the ability to 'complete' reminder
import "./Reminder.css";
import { useEffect, useState } from "react";
import { getAllReminders } from "../../Services/reminderServices.jsx";
import { Reminder } from "./Reminder.jsx";
import { Link } from "react-router-dom";
import { RemindersFilter } from "./RemindersFilter.jsx";

export const ReminderList = ({ currentUser }) => {
  const [allReminders, setAllReminders] = useState([]);
  const [filteredReminders, setFilteredReminders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showOpenOnly, setShowOpenOnly] = useState(true);

  const getAndSetAllReminders = async () => {
    getAllReminders().then((reminderArray) => {
      const foundReminders = reminderArray.filter(
        (reminder) => reminder.userId === currentUser.id
      );
      setAllReminders(foundReminders);
    });
  };

//useEffect to add background.png to page
useEffect(() => {
  document.body.style.backgroundImage = `url(src/Images/background.png)`
  document.body.style.backgroundSize = '100vw 100vh'
  document.body.style.backgroundAttachment = "fixed"
}, [])

  //useEffect to get all reminders from the reminders array in database
  useEffect(() => {
    getAndSetAllReminders();
  }, [currentUser]);

  //filter for searching reminders on DOM
  useEffect(() => {
    const foundReminders = allReminders.filter((reminder) =>
      reminder.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredReminders(foundReminders);
  }, [searchTerm, allReminders]);

  // filter to be able to select and display Current or Completed Reminders
  useEffect(() => {
    if (showOpenOnly) {
      const openReminders = allReminders.filter(
        (reminder) => !reminder.completed
      );
      setFilteredReminders(openReminders);
    } else {
      const closedReminders = allReminders.filter(
        (reminder) => reminder.completed
      );
      setFilteredReminders(closedReminders);
    }
  }, [showOpenOnly, allReminders]);
  console.log(currentUser.id, currentUser.npc, currentUser.userName, currentUser.email)
  //jsx for all reminders to be displayed on DOM
  return (
    <div className="reminder-container">
      <header className="header-reminders">
        <img src="src/Images/Headers/Reminder-header.png" />
      </header>
      <RemindersFilter
        allReminders={allReminders}
        setShowOpenOnly={setShowOpenOnly}
        setSearchTerm={setSearchTerm}
        currentUser={currentUser}
      />
      <Link to="/CreateReminder">
        <button className="button-new-reminder">Create New Reminder</button>
      </Link>
      <article className="reminders">
        {filteredReminders.map((singleReminder) => {
          return (
            <Reminder
              className="single-reminder"
              singleReminder={singleReminder}
              currentUser={currentUser}
              getAndSetAllReminders={getAndSetAllReminders}
              key={singleReminder.id}
            />
          );
        })}
      </article>
    </div>
  );
};
