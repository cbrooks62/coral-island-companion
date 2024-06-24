{
  /* PURPOSE: Single Reminder Card displayed on the DOM*/
}
import {deleteReminder,updateReminder,} from "../../Services/reminderServices.jsx";
import { Link } from "react-router-dom";

export const Reminder = ({ singleReminder, getAndSetAllReminders }) => {
  const handleClickComplete = async () => {
    const completedReminder = {
      id: singleReminder.id,
      userId: singleReminder.userId,
      npcId: singleReminder.npcId,
      title: singleReminder.title,
      synopsis: singleReminder.synopsis,
      dueDate: singleReminder.dueDate,
      completed: !singleReminder.completed,
    };
    await updateReminder(completedReminder);
    getAndSetAllReminders();
  };

  const handleDelete = () => {
    deleteReminder(singleReminder.id).then(() => {
      getAndSetAllReminders();
    });
  };

  return (
    <div className="reminder-card">
      <div className="single-reminder-card">
        <div className="reminder-title">{singleReminder.title}</div>
        <div className="reminder-due-date">
          Due Date: {singleReminder.dueDate}
        </div>
        <div className="reminder-npc">NPC: {singleReminder.npc.character}</div>
        <div className="reminder-synopsis">{singleReminder.synopsis}</div>
        <div className="reminder-buttons">
          <div className="button-circle">
            <button className="button-complete" onClick={handleClickComplete}>
              Complete
            </button>
          </div>
          <button className="button-delete" onClick={handleDelete}>
            Delete
          </button>
          <Link to={`/EditReminder/${singleReminder.id}`}>
            <button className="button-edit">Edit</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
