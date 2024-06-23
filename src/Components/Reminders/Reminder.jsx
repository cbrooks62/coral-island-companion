{
  /* PURPOSE: Single Reminder Card displayed on the DOM*/
}

import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
import {
  deleteReminder,
  updateReminder,
} from "../../Services/reminderServices.jsx";
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
    <Card className="reminder-card">
      <CardBody className="single-reminder-card">
        <CardTitle className="reminder-title">{singleReminder.title}</CardTitle>
        <CardSubtitle className="reminder-due-date">
          Due Date: {singleReminder.dueDate}
        </CardSubtitle>
        <CardSubtitle className="reminder-npc">
          NPC: {singleReminder.npc.character}
        </CardSubtitle>
        <CardText className="reminder-synopsis">
          {singleReminder.synopsis}
        </CardText>
        <button className="button-complete" onClick={handleClickComplete}>
          Complete
        </button>
        <button className="button-delete" onClick={handleDelete}>
          Delete
        </button>
        <div>
           <Link to={`/EditReminder/${singleReminder.id}`}><button className="button-edit">Edit</button></Link> 
        </div>
      </CardBody>
    </Card>
  );
};
