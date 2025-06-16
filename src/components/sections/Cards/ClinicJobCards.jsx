import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import ButtonBlue from "../../elements/ButtonBlue";
import ButtonBlueOutlined from "../../elements/ButtonBlueOutlined";
import { useNavigate } from "react-router-dom";
import { CustomContext } from "../../../context/Context";
import {
  Container,
  Box,
  Grid,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import UserModal from "../../elements/Modal";

const API_BASE_URL = "https://nz-locum-backend-3a82ed85ab97.herokuapp.com";
const CHARACTER_LIMIT = 150;
const LOCATIONS = [
  "Northland",
  "Auckland",
  "Wellington",
  "Dunedin",
  "Christchurch",
  "Queenstown",
];

const JobForm = ({
  onSubmit,
  error,
  initialValues = {},
  isEdit = false,
  onCancel,
  characterLimit = CHARACTER_LIMIT,
}) => {
  const [details, setDetails] = useState({
    job_title: "",
    location: "",
    email: "",
    specialities: "",
    descriptions: "",
    phone: "",
    ...initialValues,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = useCallback(() => {
    return (
      details.job_title &&
      details.location &&
      details.email &&
      details.specialities &&
      details.phone &&
      details.descriptions.length >= characterLimit
    );
  }, [details, characterLimit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(details);
  };

  return (
    <Container component="main">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          textAlign: "left",
        }}
      >
        <h3>{isEdit ? "Edit" : "Enter"} Job Listing Details</h3>
        {error && <Alert variant="danger">{error.toString()}</Alert>}

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="job_title"
                label="Job Title"
                value={details.job_title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="email"
                label="Email"
                type="email"
                value={details.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="phone"
                label="Phone"
                type="tel"
                value={details.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Location*</InputLabel>
                <Select
                  name="location"
                  value={details.location}
                  label="Location"
                  onChange={handleChange}
                >
                  {LOCATIONS.map((location) => (
                    <MenuItem key={location} value={location}>
                      {location}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="specialities"
                label="Specialities"
                multiline
                rows={2}
                value={details.specialities}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="descriptions"
                label="Descriptions"
                multiline
                rows={15}
                inputProps={{ minLength: characterLimit }}
                helperText={`${details.descriptions.length}/${characterLimit}`}
                value={details.descriptions}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, textTransform: "none" }}
                disabled={!isFormValid()}
              >
                {isEdit ? "Save Changes" : "Create job listing"}
              </Button>
              {isEdit && (
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ textTransform: "none" }}
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

// Job Card Component
const JobCard = React.memo(
  ({
    post,
    onEdit,
    onDelete,
    onViewDetails,
    isEditing,
    onCancelEdit,
    onSubmitEdit,
    editError,
  }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
      <div className="col-12 mt-3">
        <div className="card">
          <div className="card-horizontal">
            <div className="card-body" id="card-body">
              <h4 className="card-title">{post.job_title}</h4>
              <p className="card-text">{post.location}</p>
              <p>
                <b>Email: </b>
                {post.email}
              </p>
              <p>
                <b>Phone: </b>
                {post.phone}
              </p>
              <p>
                <b>Specialities: </b>
                {post.specialities}
              </p>
            </div>

            <div className="card-body" id="card-body">
              <p className="card-text">
                <b>Descriptions: </b>
                {post.descriptions.slice(0, 250)}...
              </p>
              <ButtonBlue
                onClick={onEdit}
                name="Edit Job Listing"
                size="sml"
                style={{ marginRight: 30, marginBottom: 10 }}
              />
              <ButtonBlueOutlined
                onClick={() => setShowDeleteModal(true)}
                name="Delete Job Listing"
                size="sml"
                style={{ marginRight: 30, marginBottom: 10 }}
              />
              <ButtonBlue
                onClick={onViewDetails}
                name="See Details"
                size="sml"
                style={{ marginRight: 30, marginBottom: 10 }}
              />

              <UserModal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                handleShow={() => setShowDeleteModal(true)}
                handleChanges={onDelete}
                nameClose="Cancel"
                nameOpen="Delete Job Listing"
                title="Delete Job Listing"
                text="Are you sure you want to delete this job listing? You can not undo this action"
              />
            </div>
          </div>

          {isEditing && (
            <JobForm
              onSubmit={onSubmitEdit}
              error={editError}
              initialValues={post}
              isEdit={true}
              onCancel={onCancelEdit}
            />
          )}
        </div>
      </div>
    );
  }
);

// Main Job List Component
export default function JobList() {
  const { userClinic, setUserClinic } = useContext(CustomContext);
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [isAddFormOpen, setAddFormOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editError, setEditError] = useState("");

  const fetchJobs = useCallback(async () => {
    try {
      const userClinic = JSON.parse(localStorage.getItem("userClinic"));
      if (userClinic) {
        setUserClinic(userClinic);
        const res = await axios.get(
          `${API_BASE_URL}/jobs/search/clinic/${userClinic._id}`
        );
        setPosts(res.data);
      }
    } catch (err) {
      setError("Error retrieving data");
    }
  }, [setUserClinic]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleDeleteJob = async (postId) => {
    try {
      await axios.delete(`${API_BASE_URL}/jobs/delete/${postId}`);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      setError("Error deleting job");
    }
  };

  const handleAddJob = async (jobData) => {
    try {
      const formData = new FormData();
      Object.entries(jobData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("clinic_id", userClinic._id);

      const res = await axios.post(`${API_BASE_URL}/jobs/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setPosts([...posts, res.data]);
      setAddFormOpen(false);
      setError("");
    } catch (error) {
      setError(error.response?.data?.msg || "Error adding job");
    }
  };

  const handleUpdateJob = async (jobData, postId) => {
    try {
      await axios.post(`${API_BASE_URL}/jobs/update/${postId}`, jobData);
      setPosts(
        posts.map((post) =>
          post._id === postId ? { ...post, ...jobData } : post
        )
      );
      setEditingIndex(null);
      setEditError("");
    } catch (error) {
      setEditError(error.response?.data?.msg || "Error updating job");
    }
  };

  const toggleEdit = (index) => {
    setEditingIndex(index === editingIndex ? null : index);
  };

  return (
    <>
      <h2>Job Listings</h2>
      <br />
      <div className="card">
        <Button
          variant="outlined"
          startIcon={<AddBoxIcon />}
          onClick={() => setAddFormOpen(!isAddFormOpen)}
          sx={{ textTransform: "none" }}
        >
          {isAddFormOpen ? "Cancel" : "Add New Job Listing"}
        </Button>
      </div>

      {isAddFormOpen && (
        <JobForm
          onSubmit={handleAddJob}
          error={error}
          onCancel={() => setAddFormOpen(false)}
        />
      )}

      {posts.map((post, index) => (
        <JobCard
          key={post._id}
          post={post}
          onEdit={() => toggleEdit(index)}
          onDelete={(e) => {
            e.preventDefault();
            handleDeleteJob(post._id);
          }}
          onViewDetails={() => navigate(`/job-search/${post._id}`)}
          isEditing={index === editingIndex}
          onCancelEdit={() => setEditingIndex(null)}
          onSubmitEdit={(data) => handleUpdateJob(data, post._id)}
          editError={editError}
        />
      ))}

      {error && (
        <Alert key="danger" variant="danger" id="cards">
          {error}
        </Alert>
      )}
    </>
  );
}
