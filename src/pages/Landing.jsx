import React from "react";
import { Link, useNavigate } from "react-router-dom";
import landing from "../assets/landing.jpg";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="pageContainer container">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-lg-6 col-9 align-items-center">
          <img src={landing} alt="trainer" className="landingImage img-fluid" />
        </div>
        <div className="col d-flex flex-column align-items-center">
          <header>
            <p className="pageHeader">Free Daily High Intensity Workouts</p>
          </header>
          <p className="text-center">
            Enjoy new workouts released daily. Workouts are programmed with
            typical gym equipment.
          </p>
          <div>
            <button
              className="btn btn-light btn-lg me-3 fw-bold"
              onClick={() => navigate("/sign-up")}
            >
              Sign Up
            </button>
            <button
              className="btn btn-light btn-lg fw-bold"
              onClick={() => navigate("/sign-in")}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
