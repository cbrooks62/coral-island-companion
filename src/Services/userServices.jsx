//Purpose: All fetch services related to login.jsx and database.json. This includes: receiving data, creating data, and editing data.

//fetch in RegisterUserProfile.jsx used to not allow duplicate emails within users
export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
    res.json()
  );
};

//fetch to register a new user used in RegisterUserProfile.jsx
export const createUser = (user) => {
  return fetch("http://localhost:8088/users?_expand=npc", {
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

//fetch to edit user profile used in EditUserProfile.jsx
export const updateUserProfile = (userObj) => {
  return fetch(`http://localhost:8088/users/${userObj.id}?_expand=npc`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObj),
  });
};

//fetch to get users by id used in EditUserProfile.jsx and Navbar.jsx
export const getUserById = (userId) => {
   return fetch(`http://localhost:8088/users/${userId}?_expand=npc`)
  .then((res) => res.json()
  );
};

//fetch to handle the deleted user profile
export const deleteProfile = (userId) => {
  return fetch(`http://localhost:8088/users/${userId}?_expand=npc`, {
    method: "DELETE",
  });
};