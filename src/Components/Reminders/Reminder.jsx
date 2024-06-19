{/* PURPOSE: Single Reminder Card displayed on the DOM*/}
  
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { deleteReminder, updateReminder } from "../../Services/reminderServices.jsx";

export const Reminder = ({ singleReminder, getAndSetReminders }) => {
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
    getAndSetReminders();
  };

  const handleDelete = () => {
    deleteReminder(singleReminder.id).then(() => {
      getAndSetReminders();
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
      {/* <img
    alt="Sample"
    src="https://picsum.photos/300/200"
  /> */}
      <CardBody>
        <CardTitle className="reminder-title">
          {singleReminder.title}
        </CardTitle>
        <CardSubtitle className="reminder-due-date">
          Due Date: {singleReminder.dueDate}
        </CardSubtitle>
        <CardSubtitle className="reminder-npc">
          NPC: {singleReminder.npc.character}
        </CardSubtitle>
        <CardText className="reminder-synopsis">
          {singleReminder.synopsis}
        </CardText>
        <Button className="button-current" onClick={handleClickComplete}>
          Current
        </Button>
        <Button className="button-delete" onClick={handleDelete}>
          Delete
        </Button>
      </CardBody>
    </Card>
  );
};
