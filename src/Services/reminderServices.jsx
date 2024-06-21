export const getAllReminders = () => {
  return fetch(`http://localhost:8088/reminders?_expand=npc`)
  .then((res) => res.json()
  );
};

//fetch to handle the completed/current
export const updateReminder = (reminder) => {
  return fetch(`http://localhost:8088/reminders/${reminder.id}?_expand=npc`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reminder),
  });
};

//fetch to handle the deleted reminder
export const deleteReminder = (reminderId) => {
  return fetch(`http://localhost:8088/reminders/${reminderId}?_expand=npc`, {
    method: "DELETE",
  });
};

//fetch to handle create new reminder
export const createReminder = (reminders) => {
  return fetch(`http://localhost:8088/reminders?_expand=npc`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reminders),
  });
};

export const getReminderById = (reminderId) => {
  return fetch(`http://localhost:8088/reminders/${reminderId}?_expand=npc`)
  .then((res) => res.json());
};
