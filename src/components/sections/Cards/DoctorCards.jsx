import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import ButtonBlue from "../../elements/ButtonBlue/ButtonBlue";
import ButtonBlueOutlined from "../../elements/ButtonBlueOutlined/ButtonBlueOutlined";
import ListGroup from "react-bootstrap/ListGroup";
import Loading from "../../elements/Loading/Loading";
import "./ClinicCards.css";

const CITIES = [
  { id: "all", name: "All", endpoint: "all" },
  { id: "Northland", name: "Northland", endpoint: "north" },
  { id: "Auckland", name: "Auckland", endpoint: "auck" },
  { id: "Wellington", name: "Wellington", endpoint: "well" },
  { id: "Dunedin", name: "Dunedin", endpoint: "dun" },
  { id: "Christchurch", name: "Christchurch", endpoint: "chr" },
  { id: "Queenstown", name: "Queenstown", endpoint: "queen" },
];

export default function DoctorList() {
  const [doctors, setDoctors] = useState({
    all: [],
    Northland: [],
    Auckland: [],
    Wellington: [],
    Dunedin: [],
    Christchurch: [],
    Queenstown: [],
  });
  const [error, setError] = useState("");
  const [basicActive, setBasicActive] = useState("all");
  const [loading, setLoading] = useState(true);

  const handleBasicClick = (value) => {
    if (value === basicActive) return;
    setBasicActive(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await Promise.all(
          CITIES.map(async (city) => {
            const endpoint =
              city.id === "all"
                ? "https://nz-locum-backend-3a82ed85ab97.herokuapp.com/doctors/all"
                : `https://nz-locum-backend-3a82ed85ab97.herokuapp.com/doctors/search/city/${city.endpoint}`;

            const response = await axios.get(endpoint);
            return { id: city.id, data: response.data };
          })
        );

        const newDoctors = results.reduce((acc, { id, data }) => {
          acc[id] = data;
          return acc;
        }, {});

        setDoctors(newDoctors);
      } catch (err) {
        setError("Error retrieving data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const DoctorCard = ({ doctor }) => (
    <div className="clinic-card">
      <div className="card-img-container" style={{ aspectRatio: "1/1" }}>
        <img
          src={doctor.imageKey}
          className="card-img"
          alt={`Dr. ${doctor.first_name} ${doctor.last_name}`}
          style={{ objectPosition: "top center" }}
        />
      </div>
      <div className="card-body">
        <h3 className="card-title">
          Dr. {doctor.first_name} {doctor.last_name}
        </h3>
        <p className="card-text">{doctor.city}, New Zealand</p>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            <b>Email: </b>
            {doctor.email}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Phone: </b>
            {doctor.phone}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Specialities: </b>
            {doctor.specialities}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>License: </b>
            {doctor.license}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Availability: </b>
            {doctor.availability}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Work Requirement: </b>
            {doctor.work_requirement}
          </ListGroup.Item>
        </ListGroup>
        <div className="card-actions">
          <a href={`mailto:${doctor.email}`}>
            <ButtonBlue name="Email" size="sml" />
          </a>
          <a href={`tel:${doctor.phone}`}>
            <ButtonBlueOutlined name="Call Me" size="sml" />
          </a>
        </div>
      </div>
    </div>
  );

  const CityTabContent = ({ cityId }) => {
    const cityDoctors = doctors[cityId];

    if (loading)
      return (
        <div className="loading-container">
          <Loading />
        </div>
      );

    return cityDoctors.length > 0 ? (
      <div className="clinics-grid">
        {cityDoctors.map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))}
        {error && (
          <Alert key="danger" variant="danger">
            {error.toString()}
          </Alert>
        )}
      </div>
    ) : (
      <div className="no-clinics-message">
        <Alert variant="info">No doctors registered in this area</Alert>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Loading />
      </div>
    );
  }

  return (
    <div className="clinic-list-container">
      <div className="city-tabs">
        {CITIES.map((city) => (
          <button
            key={city.id}
            className={`city-tab ${basicActive === city.id ? "active" : ""}`}
            onClick={() => handleBasicClick(city.id)}
          >
            {city.name}
          </button>
        ))}
      </div>

      {CITIES.map((city) => (
        <div
          key={city.id}
          style={{ display: basicActive === city.id ? "block" : "none" }}
        >
          <CityTabContent cityId={city.id} />
        </div>
      ))}
    </div>
  );
}
