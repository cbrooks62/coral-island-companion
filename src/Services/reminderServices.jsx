export const getAllReminders = () => {
  return fetch(`http://localhost:8088/reminders`).then((res) => res.json());
};

//fetch to handle the completed/current
export const updateReminder = (reminder) => {
    return fetch (`http://localhost:8088/reminders/${reminder.id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reminder)
    })
}

//fetch to handle the deleted reminder
export const deleteReminder = (reminderId) => {
    return fetch (`http://localhost:8088/reminders/${reminder.id}`, {
        method: "DELETE",
    })
}