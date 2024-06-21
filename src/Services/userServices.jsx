//Purpose: All fetch services related to login.jsx and database.json. This includes: receiving data, creating data, and editing data.

export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
    res.json()
  );
};

export const createUser = (user) => {
  return fetch("http://localhost:8088/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

export const getAllUsers = () => {
  return fetch(`http://localhost:8088/users`).then((res) => res.json());
};

//fetch to edit user profile
export const updateUserProfile = (user) => {
  return fetch(`http://localhost:8088/users`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

//fetch to get users by id
export const getUserById = (userId) => {
  return fetch(`http://localhost:8088/users/${userId}`)
  .then((res) => res.json()
  );
};
