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
    <Card
      className="single-reminder-card"
      body
      color="warning"
      style={{
        width: "18rem",
      }}
    >
      <CardBody>
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
        <Button className="button-complete" onClick={handleClickComplete}>
          Complete
        </Button>
        <Button className="button-delete" onClick={handleDelete}>
          Delete
        </Button>
        <div>
           <Link to={`/EditReminder/${singleReminder.id}`}><Button className="button-edit">Edit</Button></Link> 
        </div>
      </CardBody>
    </Card>
  );
};
