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

export default function ClinicList() {
  const [clinics, setClinics] = useState({
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
                ? "https://nz-locum-backend-3a82ed85ab97.herokuapp.com/clinics/all"
                : `https://nz-locum-backend-3a82ed85ab97.herokuapp.com/clinics/search/city/${city.endpoint}`;

            const response = await axios.get(endpoint);
            return { id: city.id, data: response.data };
          })
        );

        const newClinics = results.reduce((acc, { id, data }) => {
          acc[id] = data;
          return acc;
        }, {});

        setClinics(newClinics);
      } catch (err) {
        setError("Error retrieving data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const ClinicCard = ({ clinic }) => (
    <div className="clinic-card">
      <div className="card-img-container">
        <img
          src={clinic.imageKey}
          className="card-img"
          alt={clinic.business_name}
        />
      </div>
      <div className="card-body">
        <h3 className="card-title">{clinic.business_name}</h3>
        <p className="card-text">
          {clinic.address}, {clinic.city}
        </p>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            <b>Email: </b>
            {clinic.email}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Phone: </b>
            {clinic.phone}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Address: </b>
            {clinic.address}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Hours: </b>
            {clinic.hours}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Specialities: </b>
            {clinic.specialities}
          </ListGroup.Item>
        </ListGroup>
        <div className="card-actions">
          <a href={`mailto:${clinic.email}`}>
            <ButtonBlue name="Email" size="sml" />
          </a>
          <a href={`tel:${clinic.phone}`}>
            <ButtonBlueOutlined name="Call Me" size="sml" />
          </a>
        </div>
      </div>
    </div>
  );

  const CityTabContent = ({ cityId }) => {
    const cityClinics = clinics[cityId];

    if (loading)
      return (
        <div className="loading-container">
          <Loading />
        </div>
      );

    return cityClinics.length > 0 ? (
      <div className="clinics-grid">
        {cityClinics.map((clinic) => (
          <ClinicCard key={clinic._id} clinic={clinic} />
        ))}
        {error && (
          <Alert key="danger" variant="danger">
            {error.toString()}
          </Alert>
        )}
      </div>
    ) : (
      <div className="no-clinics-message">
        <Alert variant="info">No clinic registered in this area</Alert>
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
