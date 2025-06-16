import React from "react";
import { useNavigate } from "react-router-dom";
import Clinic from "../../../images/clinic.png";
import Doctor from "../../../images/doctor.png";
import "./SignUp.css";

export default function SignUp() {
  const navigate = useNavigate();

  return (
    <section className="registration-section">
      <div className="registration-title">
        <h3>Register and join NZ Veterinary Locum Network</h3>
      </div>

      <div className="registration-options">
        <div
          className="registration-option"
          onClick={() => navigate("/sign-up-doctor")}
        >
          <img
            src={Doctor}
            className="registration-image"
            alt="Veterinarian signing up"
          />
          <h4>Join as a vet locum</h4>
        </div>

        <div
          className="registration-option"
          onClick={() => navigate("/sign-up-clinic")}
        >
          <img
            src={Clinic}
            className="registration-image"
            alt="Clinic signing up"
          />
          <h4>Join as a clinic</h4>
        </div>
      </div>
    </section>
  );
}
