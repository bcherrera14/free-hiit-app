import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as ExploreIcon } from "../assets/compass-regular.svg";
import { ReactComponent as RunIcon } from "../assets/person-running-solid.svg";
import { ReactComponent as ProfileIcon } from "../assets/user-solid.svg";
import { ReactComponent as AddIcon } from "../assets/circle-plus-solid.svg";

function Navbar({ admin }) {
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatchRoute = (route) => {
    if (route === location.pathname || location.pathname.includes(route)) {
      return true;
    }
  };

  return (
    <footer className="navbar">
      <nav className="navbarNav">
        <ul className="navbarListItems">
          <li className="navbarListItem" onClick={() => navigate("/explore")}>
            <ExploreIcon
              fill={pathMatchRoute("/explore") ? "#606060" : "#D9D9D9"}
              width="30px"
              height="30px"
            />
            <p
              className={
                pathMatchRoute("/explore")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Eplore
            </p>
          </li>
          <li className="navbarListItem" onClick={() => navigate("/workout")}>
            <RunIcon
              fill={pathMatchRoute("/workout") ? "#606060" : "#D9D9D9"}
              width="30px"
              height="30px"
            />
            <p
              className={
                pathMatchRoute("/workout")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Workout
            </p>
          </li>
          {admin && (
            <li
              className="navbarListItem"
              onClick={() => navigate("/new-workout")}
            >
              <AddIcon
                fill={pathMatchRoute("/new-workout") ? "#606060" : "#D9D9D9"}
                width="30px"
                height="30px"
              />
              <p
                className={
                  pathMatchRoute("/new-workout")
                    ? "navbarListItemNameActive"
                    : "navbarListItemName"
                }
              >
                Create
              </p>
            </li>
          )}
          <li className="navbarListItem" onClick={() => navigate("/profile")}>
            <ProfileIcon
              fill={pathMatchRoute("/profile") ? "#606060" : "#D9D9D9"}
              width="30px"
              height="30px"
            />
            <p
              className={
                pathMatchRoute("/profile")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Profile
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Navbar;
