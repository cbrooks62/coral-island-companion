import { Outlet, Route, Routes } from "react-router";
import { CompanionNavbar } from "../Components/Navbar/Navbar.jsx";
import { useEffect, useState } from "react";
import { ReminderList } from "../Components/Reminders/ReminderList.jsx";


export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const localCompanionUser = localStorage.getItem("companion_user");
        const companionUserObject = JSON.parse(localCompanionUser);
        setCurrentUser(companionUserObject);
      }, []);


  return (
   <Routes>
    <Route
        path="/"
        element={
          <>
            <CompanionNavbar />
            <Outlet />
          </>
        }
      >
        <Route path="/" element={<ReminderList currentUser={currentUser} />} />
      </Route>
   </Routes>
  )
}
