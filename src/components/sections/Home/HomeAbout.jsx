import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonBlue from "../../elements/ButtonBlue/ButtonBlue";
import AboutImg from "../../../images/about.jpg";
import "./HomeAbout.css";

export default function About() {
  const navigate = useNavigate();

  return (
    <section id="home-about" className="about-container">
      <div className="about-content-wrapper">
        <div className="about-text">
          <h4>NZ Veterinary Locum Network is a collective organization</h4>
          <p>For locums and clinics to find each other in a single platform.</p>
          <ButtonBlue
            onClick={() => navigate("/about")}
            name="Learn More"
            size="sml"
          />
        </div>
        <div className="about-image-container">
          <img
            src={AboutImg}
            className="about-image"
            alt="Vet with a dog smiling"
          />
        </div>
      </div>
    </section>
  );
}
