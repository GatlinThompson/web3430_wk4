import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./App.jsx";

export default function DashCards() {
  let { hasRole } = useContext(AppContext);
  return (
    <>
      <h1>Dashboard</h1>
      <p>What would you like to do?</p>
      <div className="dashboard-cards">
        {hasRole("admin") ? (
          <Link to="/admin/users">
            <div className="card custom-card">
              <div className="card-body">
                <h5 className="card-title">Admin Tools</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Manage Users and Roles
                </h6>
              </div>
            </div>
          </Link>
        ) : (
          <></>
        )}

        {hasRole("teacher") ? (
          <Link to="/teacher">
            <div className="card custom-card">
              <div className="card-body">
                <h5 className="card-title">Teacher Tools</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  A stub for tools with teacher role
                </h6>
              </div>
            </div>
          </Link>
        ) : (
          <></>
        )}

        {/* *** Add a student card here that will only display when an account with the student
                role is logged in */}
        {hasRole("student") ? (
          <Link to="/student">
            <div className="card custom-card">
              <div className="card-body">
                <h5 className="card-title">Student Tools</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  A stub for tools with student role
                </h6>
              </div>
            </div>
          </Link>
        ) : (
          <></>
        )}
        <Link to="/other">
          <div className="card custom-card">
            <div className="card-body">
              <h5 className="card-title">Other Tools</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                These can be assigned to other roles
              </h6>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
