import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./App.jsx";

export default function Nav() {
  let { authenticated, loggedInUser, removeCookie } = useContext(AppContext);

  function seedDB() {
    fetch("/api/createAdmin", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        if (resp.success === false) {
          alert("An error occurred");
        } else {
          alert("DB Seeded!");
        }
      })
      .catch((err) => {
        alert("An error occurred", err);
      });
  }

  function testTeacherAPI() {
    fetch("/api/courses", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        if (resp.success === false) {
          alert("An error occurred");
        } else {
          alert("The call to courses was successful!");
        }
      })
      .catch((err) => {
        alert("An error occurred", err);
      });
  }

  function deleteCookie() {
    console.log("ASdasd");
    removeCookie("token");
    alert(
      "Deleting cookie - in Chrome dev tools, right click on cookie and click refresh to see it removed)"
    );
  }
  return (
    <>
      <header>
        {authenticated ? (
          <>
            <div>
              <Link to="">Home</Link> | <Link to="dashboard">Dashboard</Link>
            </div>
            <div>
              {loggedInUser.username} | <Link to="signout">Logout</Link>
            </div>
          </>
        ) : (
          <>
            <div>
              <Link to="">Home</Link>
            </div>
            <div>
              <Link to="signup">Register</Link> |{" "}
              <Link to="signin">Log in</Link>
            </div>
          </>
        )}
      </header>

      <Outlet />

      <footer>
        <h6 className="link" style={{ color: "blue" }} onClick={seedDB}>
          Reseed the DB with an account username: admin, password: asdf (and
          some other accounts)
        </h6>
        <h6 className="link" style={{ color: "blue" }} onClick={deleteCookie}>
          Delete Session Cookie
        </h6>
        {/* *** The following link, when clicked requsts an api on the backend.  But it's currently
                not protected.  How do you protect on the backend so only accounts with the teacher role can access it? */}
        <h6 className="link" style={{ color: "blue" }} onClick={testTeacherAPI}>
          Test Teacher API
        </h6>
      </footer>
    </>
  );
}
