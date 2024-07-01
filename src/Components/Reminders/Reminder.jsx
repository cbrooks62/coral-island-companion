{
  /* PURPOSE: Single Reminder Card displayed on the DOM*/
}
import { useState } from "react";
import {
  deleteReminder,
  updateReminder,
} from "../../Services/reminderServices.jsx";
import { EditCurrentReminder } from "./EditCurrentReminder.jsx";
import { Modal } from "reactstrap";

export const Reminder = ({
  currentUser,
  singleReminder,
  getAndSetAllReminders,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleClickComplete = () => {
    const completedReminder = {
      id: singleReminder.id,
      userId: singleReminder.userId,
      npcId: singleReminder.npcId,
      title: singleReminder.title,
      synopsis: singleReminder.synopsis,
      dueDate: singleReminder.dueDate,
      completed: !singleReminder.completed,
    };
    updateReminder(completedReminder);
    getAndSetAllReminders();
  };

  const handleDelete = () => {
    deleteReminder(singleReminder.id).then(() => {
      getAndSetAllReminders();
    });
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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
          {singleReminder.completed ? (
            ""
          ) : (
            <div className="button-circle">
              <button className="button-complete" onClick={handleClickComplete}>
                Complete
              </button>
            </div>
          )}
          <button className="button-delete" onClick={handleDelete}>
            Delete
          </button>
         {singleReminder.completed ? (
          ""
         ) : ( 
          <button onClick={openModal} className="button-edit">
            Edit
          </button>
        )}
          <Modal
            className="edit-modal-container"
            isOpen={showModal}
            onRequestClose={closeModal}
          >
            <EditCurrentReminder
              singleReminder={singleReminder}
              closeModal={closeModal}
              getAndSetAllReminders={getAndSetAllReminders}
              currentUser={currentUser}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};
