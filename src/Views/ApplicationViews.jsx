import { Outlet, Route, Routes } from "react-router";
import { CompanionNavbar } from "../Components/Navbar/Navbar.jsx";
import { useEffect, useState } from "react";
import { ReminderList } from "../Components/Reminders/ReminderList.jsx";
import { CreateReminder } from "../Components/Reminders/CreateReminder.jsx";

import { EditUserProfile } from "../Components/Users/EditUserProfile.jsx";
import { Calendar } from "../Components/Calendar/Calendar.jsx"
import { NpcList } from "../Components/NPCs/NpcList.jsx";
// import { EditCurrentReminder } from "../Components/Reminders/EditCurrentReminder.jsx";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localCompanionUser = localStorage.getItem("companion_user");
    const companionUserObject = JSON.parse(localCompanionUser)
    setCurrentUser(companionUserObject);
  }, []);

  console.log(currentUser)
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <CompanionNavbar  currentUser={currentUser} />
            <Outlet />
          </>
        }
      >
        <Route
          path="/"
          element={<ReminderList currentUser={currentUser} />}
          index
        />
        <Route
          path="/CreateReminder"
          element={<CreateReminder currentUser={currentUser} />}
        />
        {/* <Route 
        path=":reminderId/EditCurrentReminder/"
        element={<EditCurrentReminder currentUser={currentUser} />}
        /> */}
        <Route
          path="/Calendar"
          element={<Calendar currentUser={currentUser} />}
        />
        <Route
          path="/Characters"
          element={<NpcList currentUser={currentUser} />}
        />
        <Route
          path="/EditProfile"
          element={<EditUserProfile currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
