import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonBlue from "../../elements/ButtonBlue/ButtonBlue";
import Banner from "../../../video/banner.mp4";
import "./HomeBanner.css";

export default function HomeBanner() {
  const navigate = useNavigate();

  return (
    <section className="home-banner">
      <div className="home-banner__overlay"></div>
      <video
        className="home-banner__video"
        src={Banner}
        autoPlay
        loop
        muted
        playsInline
        aria-label="Background video showing veterinary professionals at work"
      />
      <div className="home-banner__content">
        <h1 className="home-banner__title">
          Join our network to help locums find better job opportunities, better
          experiences, and better lives for our pets in Aotearoa New Zealand
        </h1>
        <ButtonBlue
          onClick={() => navigate("/job-search")}
          name="See Job Listings"
          size="sml"
          className="home-banner__button"
        />
      </div>
    </section>
  );
}
