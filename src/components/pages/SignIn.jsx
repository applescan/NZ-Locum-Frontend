import React from "react";
import { useNavigate } from "react-router-dom";
import ClinicLogin from "../../images/clinic-login.png";
import DoctorLogin from "../../images/doctor-login.png";
import "./SignIn.css";

export default function SignIn() {
  const navigate = useNavigate();

  return (
    <div className="about-wrapper" id="Doctor-login">
      <section className="about-title">
        <h1>Sign in to NZ Veterinary Locum Network</h1>
      </section>

      <section className="about-links">
        <div className="about-side">
          <div className="img-link">
            <img
              src={DoctorLogin}
              className="img-fluid rounded"
              alt="sign-in as a doctor"
              onClick={() => navigate(`/sign-in-doctor`)}
            />
            <h6>Sign in as vet locum</h6>
          </div>
        </div>

        <div className="about-side">
          <div className="img-link">
            <img
              src={ClinicLogin}
              className="img-fluid rounded"
              alt="sign-in as a clinic"
              onClick={() => navigate(`/sign-in-clinic`)}
            />
            <h6>Sign in as clinic</h6>
          </div>
        </div>
      </section>
    </div>
  );
}
