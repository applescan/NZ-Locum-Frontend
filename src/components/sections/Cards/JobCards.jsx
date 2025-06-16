import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import ButtonBlue from "../../elements/ButtonBlue";
import { useNavigate } from "react-router-dom";
import Loading from "../../elements/Loading";
import "./JobCardStyles.css";
import "./ClinicCards.css";

const REGIONS = [
  { id: "all", name: "All", endpoint: "all" },
  { id: "Northland", name: "Northland", endpoint: "north" },
  { id: "Auckland", name: "Auckland", endpoint: "auck" },
  { id: "Wellington", name: "Wellington", endpoint: "well" },
  { id: "Dunedin", name: "Dunedin", endpoint: "dun" },
  { id: "Christchurch", name: "Christchurch", endpoint: "chri" },
  { id: "Queenstown", name: "Queenstown", endpoint: "queen" },
];

const API_BASE_URL = "https://nz-locum-backend-3a82ed85ab97.herokuapp.com/jobs";

const JobCard = ({ job, navigate }) => {
  return (
    <div className="col-12 mt-3">
      <div className="card">
        <div className="card-horizontal">
          <div className="card-body" id="card-body">
            <h4 className="card-title">{job.job_title}</h4>
            <p className="card-text">{job.location}, New Zealand</p>
            <p>
              <b>Email: </b>
              {job.email}
            </p>
            <p>
              <b>Phone: </b>
              {job.phone}
            </p>
            <p>
              <b>Specialities: </b>
              {job.specialities}
            </p>
          </div>

          <div className="card-body" id="card-body">
            <p className="card-text">
              <b>Job ID: </b> {job._id}
              <br />
              <br />
              <b>Descriptions: </b>
              {job.descriptions.slice(0, 250)}...
            </p>
            <ButtonBlue
              onClick={() => navigate(job._id)}
              name="See Details"
              size="med"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const RegionTabContent = ({ jobs, error, navigate }) => {
  if (error) {
    return (
      <Alert key="danger" variant="danger" id="cards">
        {error.toString()}
      </Alert>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className="no-clinics-message">
        <Alert variant="info">No job listing in this area</Alert>
      </div>
    );
  }

  return (
    <div className="g-4" id="cards">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} navigate={navigate} />
      ))}
    </div>
  );
};

export default function JobList() {
  const [jobsData, setJobsData] = useState({
    all: [],
    Northland: [],
    Auckland: [],
    Wellington: [],
    Dunedin: [],
    Christchurch: [],
    Queenstown: [],
  });
  const [activeTab, setActiveTab] = useState("all");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleTabClick = (tabId) => {
    if (tabId !== activeTab) {
      setActiveTab(tabId);
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const requests = REGIONS.map((region) =>
          axios.get(
            `${API_BASE_URL}/${
              region.endpoint === "all" ? "all" : `search/${region.endpoint}`
            }`
          )
        );

        const responses = await Promise.all(requests);

        const newJobsData = {};
        REGIONS.forEach((region, index) => {
          newJobsData[region.id] = responses[index].data;
        });

        setJobsData(newJobsData);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error retrieving data");
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <Loading />
      </div>
    );
  }

  return (
    <div className="clinic-list-container">
      <div className="city-tabs">
        {REGIONS.map((region) => (
          <button
            key={region.id}
            className={`city-tab ${activeTab === region.id ? "active" : ""}`}
            onClick={() => handleTabClick(region.id)}
          >
            {region.name}
          </button>
        ))}
      </div>

      {REGIONS.map((region) => (
        <div
          key={region.id}
          style={{ display: activeTab === region.id ? "block" : "none" }}
        >
          <RegionTabContent
            jobs={jobsData[region.id]}
            error={error}
            navigate={navigate}
          />
        </div>
      ))}
    </div>
  );
}
