import React from "react";
import AboutImg from "../../../images/about-this-project.jpg";
import "./OurStory.css";

export default function OurStory() {
  return (
    <>
      <section className="ourstory-wrapper container flexSpaceCenter">
        <div className="ourstory-left flexCenter">
          <div>
            <h3>About This Project</h3>
            <hr />
            <p>
              In order to market themselves and look for jobs, there hasn't been
              a website created exclusively for veterinary locums in New
              Zealand. This project intends to develop a platform where
              veterinary locums can create profiles and introduce themselves and
              companies can post job vacancies for locums.
              <br />
              <br />
              We resolve the current communication issue by facilitating direct
              communication between veterinarian offices and locum tenens.
            </p>
            <br />
          </div>
        </div>

        <div className="ourstory-right">
          <img
            src={AboutImg}
            className="img-fluid rounded"
            alt="new zealand nature"
          />
        </div>
      </section>

      <section className="ourstory-wrapper2 container flexSpaceCenter">
        <div className="ourstory-content">
          <h4>Why is this problem valuable to address?</h4>
          <p>
            There is still no infrastructure that enables veterinary locums to
            openly promote themselves outside of a recruitment agency, making it
            very difficult for locums and clinics to connect without third-party
            intervention (recruitment agency). If new veterinary locums don't
            already have personal relationships with clinics, finding one can be
            very challenging. They have no platform to view and identify the
            clinics that require them. Currently, a Facebook group is the only
            location locums may access information. My aim is to have all
            doctors' information in a beautiful, understandable style so that
            they don't have to wade through several Facebook postings to figure
            out which locum is reliable and reachable for a clinic.
          </p>
          <br />
          <h4>Goals</h4>
          <p>
            With this project, I intend to make it easier for veterinary clinics
            and locums to organize employment on their own without the use of a
            recruitment firm by centralizing lists of available jobs and
            veterinary locums. The NZ Veterinary Locum Network will be the only
            platform to keep track of veterinary locum's profiles that are
            visible to the public online, filling a specialized need for a
            distinct sector on the website rather than specialized Facebook
            groups.
          </p>
        </div>
      </section>
    </>
  );
}
