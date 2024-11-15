import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../App";

import { Link, useNavigate } from "react-router-dom";

export default function Users() {
  let { authenticated, users, setUsers, roles, setRoles } =
    useContext(AppContext);
  const navigate = useNavigate();
  const [DBUpdated, setDBUpdated] = useState(false);

  useEffect(() => {
    fetch("api/users", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        if (resp.success === false) {
          navigate("/errorapi");
        } else {
          setUsers(resp);
          setDBUpdated(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
        navigate("/errorapi");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DBUpdated]);

  useEffect(() => {
    fetch("api/roles", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        if (resp.success === false) {
          navigate("/errorapi");
        } else {
          setRoles(resp);
          setDBUpdated(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
        navigate("/errorapi");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DBUpdated]);

  // The following test isn't strictly needed since the API is protected.
  if (!authenticated) {
    document.location = "/signin";
    return <></>;
  }

  const deleteMe = (param) => {
    // *** Complete the delete code here.  This should make a
    // fetch to the api/users DELETE endpoint already coded on the backend
    // If the fetch is successful, execute setDBUpdated("changed").  This
    // will trigger the  fetch('api/users' coded above, thereby refreshing the
    // list of users.  If the delete isn't successful navigate to /errorapi
    fetch(`/api/users/${param}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        if (resp.success === false) {
          navigate("/errorapi");
        } else {
          setDBUpdated(true);
        }
      })
      .catch((err) => {
        console.log(err.message);
        navigate("/errorapi");
      });
  };

  return (
    <div className="react-stuff users-component">
      <h1>Users</h1>
      <div className="table-header">
        <Link to="/admin/users/new">
          <button className="btn btn-primary">Create User</button>{" "}
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <td>_id</td>
            <td>First Name</td>
            <td>Last name</td>
            <td>Username</td>
            <td>Email</td>
            <td>Roles</td>
            <td>Edit</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {users.map((e, i) => {
            return (
              <tr key={i}>
                <td>{e._id}</td>
                <td>{e.firstName}</td>
                <td>{e.lastName}</td>
                <td>{e.username}</td>
                <td>{e.email}</td>
                <td>
                  {roles.map((r, i) => {
                    const found = e.roles.find((element) => element === r._id);
                    if (found) {
                      return r.name + ", ";
                    } else {
                      return "";
                    }
                  })}
                </td>
                {/* *** Add an onclick event to the Edit button.  The onClick should trigger a function
                                    that navigates to the following route mapped in App.js:
                                    <Route path="users/:uid/edit" element={<UserForm />}></Route>
                                     */}
                <td>
                  <button
                    className="link"
                    onClick={() => {
                      navigate(`/admin/users/${e._id}/edit`);
                    }}
                  >
                    Edit{" "}
                  </button>
                </td>
                <td>
                  <button
                    className="link"
                    onClick={() => {
                      deleteMe(e._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
