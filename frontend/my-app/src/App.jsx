import React, { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Admin from "./Admin.jsx";
import { useCookies } from "react-cookie";
import DashCards from "./DashCards.jsx";
import ErrorAPI from "./ErrorAPI.jsx";
import Nav from "./Nav.jsx";
import Users from "./Admin/Users.jsx";
import UserForm from "./Admin/UserForm.jsx";

import SignInForm from "./Auth/SignInForm.jsx";
import SignOut from "./Auth/SignOut.jsx";

export const AppContext = createContext();

export default function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  // authenticated helps to determine what elements like "Log Out" or "Dashboard" to show in Nav.js
  let [authenticated, setAuthenticated] = useState(cookies.token !== undefined);
  // this contains the logged in user's profile info (like firstname, lastname and their roles/role names)
  let [loggedInUser, setLoggedInUser] = useState([]);
  // users is the list of all users in the DB
  let [users, setUsers] = useState([]);
  // roles is the list of all available roles in the DB (not the logged in user's roles which are in loggedInUser)
  let [roles, setRoles] = useState([]);

  // *** Uncomment the below function.  The function is run in the Dashcards component to determine
  // what cards to display based on the roles of the logged in user
  function hasRole(role) {
    let roleFound = false;
    if (loggedInUser.roles) {
      loggedInUser.roles.forEach((element) => {
        if (element.name === role) {
          roleFound = true;
        }
      });
    }

    return roleFound;
  }

  return (
    <AppContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        loggedInUser,
        setLoggedInUser,
        setCookie,
        removeCookie,
        users,
        setUsers,
        roles,
        setRoles,
        hasRole,
      }}
    >
      <div className="react-stuff">
        <Router>
          <Routes>
            <Route path="/" element={<Nav />}>
              <Route
                index
                element={
                  <main style={{ padding: "1rem" }}>
                    <h2>My App</h2>
                  </main>
                }
              />
              <Route path="signin" element={<SignInForm />}></Route>
              <Route path="signout" element={<SignOut />}></Route>
              <Route path="errorapi" element={<ErrorAPI />}></Route>
              <Route path="dashboard" element={<DashCards />}></Route>
              <Route path="/admin" element={<Admin />}>
                <Route path="users" element={<Users />}></Route>
                <Route path="users/new" element={<UserForm />}></Route>
                <Route path="users/:uid/edit" element={<UserForm />}></Route>
              </Route>
            </Route>
          </Routes>
        </Router>
      </div>
    </AppContext.Provider>
  );
}
