import React from "react";
import { useNavigate } from "react-router-dom";
import Clinic from "../../images/clinic.png";
import Doctor from "../../images/doctor.png";
import "./SignUp.css";

export default function SignUp() {
  const navigate = useNavigate();

  return (
    <div className="signup-wrapper">
      <section className="signup-title">
        <h1>Register and join NZ Veterinary Locum Network</h1>
      </section>

      <section className="signup-links">
        <div className="signup-side">
          <div className="img-link">
            <img
              src={Doctor}
              className="img-fluid rounded"
              alt="sign-up as a doctor"
              onClick={() => navigate(`/sign-up-doctor`)}
            />
            <h6>Join as a vet locum</h6>
          </div>
        </div>

        <div className="signup-side">
          <div className="img-link">
            <img
              src={Clinic}
              className="img-fluid rounded"
              alt="sign-up as a clinic"
              onClick={() => navigate(`/sign-up-clinic`)}
            />
            <h6>Join as a clinic</h6>
          </div>
        </div>
      </section>
    </div>
  );
}
