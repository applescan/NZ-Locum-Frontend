import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ButtonBlue from "../elements/ButtonBlue/ButtonBlue";
import ButtonBlueOutlined from "../elements/ButtonBlueOutlined/ButtonBlueOutlined";
import Card from "react-bootstrap/Card";
import Loading from "../elements/Loading/Loading";
import "./JobDetails.css";

export default function JobDetails() {
  const [posts, setPosts] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://nz-locum-backend-3a82ed85ab97.herokuapp.com/jobs/search/id/${id}`
      )
      .then((res) => setPosts(res.data[0]))
      .catch((err) => {
        console.error(err);
        setErrorMessage("Error retrieving data");
      });
  }, [id]);

  if (!posts && !errorMessage) {
    return (
      <div className="loading-container">
        <Loading />
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="error-container">
        <h3>Error: {errorMessage}</h3>
        <ButtonBlue
          onClick={() => navigate(-1)}
          name="Go Back"
          size="med"
          style={{ marginTop: "20px" }}
        />
      </div>
    );
  }

  return (
    <div id="Doctor-login">
      {posts && (
        <section className="job-details-wrapper">
          <div>
            <h6>
              <b>Job ID:</b> {posts._id}
            </h6>
            <h1>{posts.job_title}</h1>
            <h5>{posts.location}, New Zealand</h5>

            <div className="button-group">
              <Card.Link href={`mailto:${posts.email}`}>
                <ButtonBlue name="Email Company" size="sml" />
              </Card.Link>
              <Card.Link href={`tel:${posts.phone}`}>
                <ButtonBlueOutlined name="Call Job Lister" size="sml" />
              </Card.Link>
            </div>

            <hr />
            <p>
              <b>Email:</b> {posts.email}
            </p>
            <p>
              <b>Phone:</b> {posts.phone}
            </p>
            <p>
              <b>Specialities:</b> {posts.specialities}
            </p>
            <hr />

            <h5>Job Descriptions</h5>
            <p className="job-description">{posts.descriptions}</p>

            <ButtonBlue onClick={() => navigate(-1)} name="Back" size="med" />
          </div>
        </section>
      )}
    </div>
  );
}
