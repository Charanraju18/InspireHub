import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import HeaderOne from "../components/HeaderOne";
import Preloader from "../helper/Preloader";
import axios from "axios";
import { useAuth } from "../authContext";
import InstructorDetails from "../components/InstructorDetails";
import FooterTwo from "../components/FooterTwo";
import { FaEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useRef } from "react";

function toLocalDateTimeInputValue(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  const tzOffset = date.getTimezoneOffset() * 60000;
  return new Date(date - tzOffset).toISOString().slice(0, 16);
}

const allEditableFields = [
  "name",
  "gender",
  "location",
  "bio",
  "profilePicture",
  "socialLinks",
  "role",
  "experienceYears",
  "currentlyWorkingAt",
  "currentRole",
  "previousCompanies",
  "instructedDomains",
  "techStack",
  "currentEducation",
  "yearOfStudy",
  "interestedDomains",
  "skillLevel",
  "learningGoal",
  "preferredLearningMode",
];

const getInitialFormData = (user, learnerProfile) => {
  const base = { ...user };
  base.socialLinks = user.socialLinks || {
    linkedin: "",
    github: "",
    twitter: "",
    portfolio: "",
    youtube: "",
  };
  if (user.role === "Instructor" && user.instructorProfile) {
    Object.assign(base, user.instructorProfile);
    base.previousCompanies = Array.isArray(
      user.instructorProfile.previousCompanies
    )
      ? user.instructorProfile.previousCompanies.join(", ")
      : user.instructorProfile.previousCompanies || "";
    base.instructedDomains = Array.isArray(
      user.instructorProfile.instructedDomains
    )
      ? user.instructorProfile.instructedDomains.join(", ")
      : user.instructorProfile.instructedDomains || "";
    base.techStack = Array.isArray(user.instructorProfile.techStack)
      ? user.instructorProfile.techStack.join(", ")
      : user.instructorProfile.techStack || "";
  }
  if (user.role === "Learner" && (learnerProfile || user.learnerProfile)) {
    const lp = learnerProfile || user.learnerProfile;
    base.currentEducation = lp.currentEducation || "";
    base.yearOfStudy = lp.yearOfStudy || "";
    base.interestedDomains = Array.isArray(lp.interestedDomains)
      ? lp.interestedDomains.join(", ")
      : lp.interestedDomains || "";
    base.skillLevel = lp.skillLevel || "";
    base.learningGoal = lp.learningGoal || "";
    base.preferredLearningMode = lp.preferredLearningMode || "";
  }
  delete base.email;
  delete base.phoneNumber;
  return base;
};

const ProfileEditForm = ({ user, learnerProfile, onClose, onUpdate }) => {
  const [formData, setFormData] = useState(
    getInitialFormData(user, learnerProfile)
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("socialLinks.")) {
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [name.split(".")[1]]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new window.FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      let token = localStorage.getItem("token");
      const updateData = { ...formData };
      delete updateData._id;
      delete updateData.email;
      delete updateData.phoneNumber;
      if (user.role === "Instructor") {
        updateData.instructorProfile = {
          experienceYears: formData.experienceYears,
          currentlyWorkingAt: formData.currentlyWorkingAt,
          currentRole: formData.currentRole,
          previousCompanies: formData.previousCompanies
            ? formData.previousCompanies
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : [],
          instructedDomains: formData.instructedDomains
            ? formData.instructedDomains
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : [],
          techStack: formData.techStack
            ? formData.techStack
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : [],
        };
      }
      if (user.role === "Learner") {
        updateData.learnerProfile = {
          currentEducation: formData.currentEducation,
          yearOfStudy: formData.yearOfStudy,
          interestedDomains: formData.interestedDomains
            ? formData.interestedDomains
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : [],
          skillLevel: formData.skillLevel,
          learningGoal: formData.learningGoal,
          preferredLearningMode: formData.preferredLearningMode,
        };
      }
      const res = await axios.put(
        "http://localhost:5000/api/auth/update-profile",
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onUpdate(res.data);
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.msg || err.response?.data?.error || "Update failed."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 32,
          minWidth: 520,
          maxWidth: 1000,
          width: "100%",
          minHeight: 0,
          boxShadow: "0 4px 32px rgba(0,0,0,0.15)",
          textAlign: "left",
        }}
      >
        <h4 className="mb-32">Edit Profile</h4>
        <div className="container-fluid">
          <div className="row gy-3 gx-4">
            {/* Name */}
            <div className="col-md-4 col-sm-6">
              <label className="form-label fw-medium">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                disabled={submitting}
              />
            </div>
            {/* Gender */}
            <div className="col-md-4 col-sm-6">
              <label className="form-label fw-medium">Gender</label>
              <select
                className="form-control"
                name="gender"
                value={formData.gender || ""}
                onChange={handleChange}
                disabled={submitting}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {/* Location */}
            <div className="col-md-4 col-sm-6">
              <label className="form-label fw-medium">Location</label>
              <input
                type="text"
                className="form-control"
                name="location"
                value={formData.location || ""}
                onChange={handleChange}
                disabled={submitting}
              />
            </div>
            {/* Bio */}
            <div className="col-md-8 col-sm-12 mt-2">
              <label className="form-label fw-medium">Bio</label>
              <textarea
                className="form-control"
                name="bio"
                value={formData.bio || ""}
                onChange={handleChange}
                disabled={submitting}
                rows={2}
              />
            </div>
            {/* Profile Picture */}
            <div className="col-md-4 col-sm-6 mt-2">
              <label className="form-label fw-medium">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                name="profilePicture"
                onChange={handleFileChange}
                disabled={submitting}
              />
              {formData.profilePicture && (
                <img
                  src={formData.profilePicture}
                  alt="Preview"
                  style={{
                    maxWidth: 80,
                    maxHeight: 80,
                    marginTop: 8,
                    borderRadius: "50%",
                  }}
                />
              )}
            </div>
            {/* Social Links */}
            <div className="col-12 mt-2 mb-5">
              <label className="form-label fw-medium">Social Links</label>
              <div className="row gy-2 gx-2">
                <div className="col-md-2 col-sm-4">
                  <input
                    type="text"
                    className="form-control mb-2"
                    name="socialLinks.linkedin"
                    placeholder="LinkedIn"
                    value={formData.socialLinks.linkedin || ""}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                </div>
                <div className="col-md-2 col-sm-4">
                  <input
                    type="text"
                    className="form-control mb-2"
                    name="socialLinks.github"
                    placeholder="GitHub"
                    value={formData.socialLinks.github || ""}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                </div>
                <div className="col-md-2 col-sm-4">
                  <input
                    type="text"
                    className="form-control mb-2"
                    name="socialLinks.twitter"
                    placeholder="Twitter"
                    value={formData.socialLinks.twitter || ""}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                </div>
                <div className="col-md-3 col-sm-6">
                  <input
                    type="text"
                    className="form-control mb-2"
                    name="socialLinks.portfolio"
                    placeholder="Portfolio"
                    value={formData.socialLinks.portfolio || ""}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                </div>
                <div className="col-md-3 col-sm-6">
                  <input
                    type="text"
                    className="form-control mb-2"
                    name="socialLinks.youtube"
                    placeholder="YouTube"
                    value={formData.socialLinks.youtube || ""}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                </div>
              </div>
            </div>
            {/* Instructor Fields */}
            {formData.role === "Instructor" && (
              <>
                <div className="col-12 mt-4 mb-2">
                  <h5>Learner Profile</h5>
                </div>
                <div className="col-md-2 col-sm-4">
                  <label className="form-label fw-medium">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="experienceYears"
                    value={formData.experienceYears || ""}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                </div>
                <div className="col-md-3 col-sm-6">
                  <label className="form-label fw-medium">
                    Currently Working At
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="currentlyWorkingAt"
                    value={formData.currentlyWorkingAt || ""}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                </div>
                <div className="col-md-3 col-sm-6">
                  <label className="form-label fw-medium">Current Role</label>
                  <input
                    type="text"
                    className="form-control"
                    name="currentRole"
                    value={formData.currentRole || ""}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                </div>
                <div className="col-md-4 col-sm-12">
                  <label className="form-label fw-medium">
                    Previous Companies
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="previousCompanies"
                    value={formData.previousCompanies || ""}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                </div>
                <div className="col-md-6 col-sm-12">
                  <label className="form-label fw-medium">
                    Instructed Domains
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="instructedDomains"
                    value={formData.instructedDomains || ""}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                </div>
                <div className="col-md-6 col-sm-12">
                  <label className="form-label fw-medium">Tech Stack</label>
                  <input
                    type="text"
                    className="form-control"
                    name="techStack"
                    value={formData.techStack || ""}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                </div>
              </>
            )}
            {/* Learner Fields */}
            {formData.role === "Learner" && (
              <>
                <div className="col-12 mt-4 mb-4">
                  <h5>Learner Profile</h5>
                </div>
                <div className="col-md-3 col-sm-6">
                  <label className="form-label fw-medium">
                    Current Education
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="currentEducation"
                    value={formData.currentEducation || ""}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                </div>
                <div className="col-md-3 col-sm-6">
                  <label className="form-label fw-medium">Year of Study</label>
                  <input
                    type="text"
                    className="form-control"
                    name="yearOfStudy"
                    value={formData.yearOfStudy || ""}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                </div>
                <div className="col-md-3 col-sm-6">
                  <label className="form-label fw-medium">
                    Preferred Learning Mode
                  </label>
                  <select
                    className="form-control"
                    name="preferredLearningMode"
                    value={formData.preferredLearningMode || ""}
                    onChange={handleChange}
                    disabled={submitting}
                  >
                    <option value="">Select</option>
                    <option value="Video">Video</option>
                    <option value="Article">Article</option>
                    <option value="Project-Based">Project-Based</option>
                  </select>
                </div>
                <div className="col-md-3 col-sm-6">
                  <label className="form-label fw-medium">Skill Level</label>
                  <select
                    className="form-control"
                    name="skillLevel"
                    value={formData.skillLevel || ""}
                    onChange={handleChange}
                    disabled={submitting}
                  >
                    <option value="">Select</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div className="col-md-6 col-sm-12 mt-2">
                  <label className="form-label fw-medium">Learning Goal</label>
                  <input
                    type="text"
                    className="form-control"
                    name="learningGoal"
                    value={formData.learningGoal || ""}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                </div>
                <div className="col-md-6 col-sm-12 mt-2">
                  <label className="form-label fw-medium">
                    Interested Domains{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="interestedDomains"
                    value={formData.interestedDomains || ""}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                </div>
              </>
            )}
            {error && <div className="text-danger mb-2">{error}</div>}
            {/* Action Buttons */}
            <div className="col-12 d-flex justify-content-end gap-2 mt-5 pt-4">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-success"
                disabled={submitting}
              >
                {submitting ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

const ProfilePage = () => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(null);
  const [learnerProfile, setLearnerProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  // for editing live events
  const { id } = useParams();
  const { user: currentUser, isAuthenticated } = useAuth();
  const [instructor, setInstructor] = useState(authUser || null);

  const [showOptions, setShowOptions] = useState(false);
  const [editableEvent, setEditableEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const dropdownRef = useRef(null);

  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [roadmaps, setRoadmaps] = useState([]);
  const [editingRoadmap, setEditingRoadmap] = useState(null);

  const [newStep, setNewStep] = useState({
    title: "",
    description: "",
    resources: [{ title: "", link: "", type: "video" }],
  });

  useEffect(() => {
    if (user && instructor) {
      setIsOwnProfile(
        user._id === instructor._id || user.id === instructor._id
      );
      setRoadmaps(instructor.instructorProfile?.content?.roadmapsShared || []);
    }
  }, [user, instructor]);

  // Delete roadmap
  const handleDeleteRoadmap = async (roadmapId) => {
    if (!window.confirm("Are you sure you want to delete this roadmap?"))
      return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/roadmaps/${roadmapId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setRoadmaps(roadmaps.filter((r) => r._id !== roadmapId));
        alert("Roadmap deleted successfully!");
      } else {
        alert("Failed to delete roadmap");
      }
    } catch (error) {
      console.error("Error deleting roadmap:", error);
      alert("Error deleting roadmap");
    }
  };

  // Add new step to existing roadmap
  const handleAddStep = async (roadmapId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/roadmaps/${roadmapId}/add-step`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ step: newStep }),
        }
      );

      if (response.ok) {
        const updatedRoadmap = await response.json();
        setRoadmaps(
          roadmaps.map((r) =>
            r._id === roadmapId ? updatedRoadmap.roadmap : r
          )
        );
        setEditingRoadmap(null);
        setNewStep({
          title: "",
          description: "",
          resources: [{ title: "", link: "", type: "video" }],
        });
        alert("Step added successfully!");
      } else {
        alert("Failed to add step");
      }
    } catch (error) {
      console.error("Error adding step:", error);
      alert("Error adding step");
    }
  };

  // Add resource to new step
  const addResourceToNewStep = () => {
    setNewStep({
      ...newStep,
      resources: [...newStep.resources, { title: "", link: "", type: "video" }],
    });
  };

  // Remove resource from new step
  const removeResourceFromNewStep = (index) => {
    const updatedResources = newStep.resources.filter((_, i) => i !== index);
    setNewStep({ ...newStep, resources: updatedResources });
  };

  // Update resource in new step
  const updateResourceInNewStep = (index, field, value) => {
    const updatedResources = [...newStep.resources];
    updatedResources[index][field] = value;
    setNewStep({ ...newStep, resources: updatedResources });
  };

  const inputStyle = {
    width: "100%",
    padding: "8px 12px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    marginBottom: "10px",
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: "80px",
    resize: "vertical",
  };

  const buttonStyle = {
    padding: "8px 16px",
    margin: "4px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  };

  // if mouse click outside, closes the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOptions(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchInstructorDetails = async (instructorId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/instructors/${instructorId}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Failed to fetch instructor");

      setInstructor(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching instructor:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEvent = async (eventId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/events/${eventId}`
      );
      if (response.ok) {
        const eventData = await response.json();
        setEditableEvent(eventData);
        setShowForm(true);
      } else {
        alert("Failed to fetch event data.");
      }
    } catch (error) {
      console.error("Error fetching event data:", error);
      alert("An error occurred while fetching event data.");
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/events/${eventId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Event deleted successfully!");

        const instructorId = authUser?._id || id;
        fetchInstructorDetails(instructorId);
      } else {
        alert("Failed to delete the event.");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("An error occurred while deleting the event.");
    }
  };

  // Refactored fetchProfile so it can be called after update
  const fetchProfile = async (tokenOverride) => {
    setLoading(true);
    setError("");
    try {
      let token = tokenOverride || localStorage.getItem("token");
      if (
        (!token || token === "undefined" || token === "null") &&
        authUser &&
        (authUser.token || authUser.accessToken)
      ) {
        token = authUser.token || authUser.accessToken;
        if (token) localStorage.setItem("token", token);
      }
      if (!token || token === "undefined" || token === "null") {
        setError("No authentication token found. Please sign in again.");
        setLoading(false);
        return;
      }
      const res = await axios.get("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      if (res.data.role === "Learner") {
        const learnerRes = await axios.get(
          "http://localhost:5000/api/auth/learner-content",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLearnerProfile(learnerRes.data);
      } else {
        setLearnerProfile(null);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to load profile. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (updatedUser) => {
    // Instead of just setUser, re-fetch the profile for fresh/populated data
    await fetchProfile();
    setShowEdit(false);
  };

  useEffect(() => {
    console.log("ProfilePage useEffect", { authUser });
    let isMounted = true;
    const fetchData = async () => {
      try {
        await fetchProfile();
      } catch (error) {
        if (isMounted) {
          setError("Failed to load profile. Please try again.");
        }
      }
    };
    if (authUser) {
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [authUser]);

  return (
    <>
      <HeaderOne />
      <Breadcrumb title={"Profile"} />
      {showEdit && (
        <ProfileEditForm
          user={user}
          learnerProfile={user.role === "Learner" ? learnerProfile : null}
          onClose={() => setShowEdit(false)}
          onUpdate={handleUpdate}
        />
      )}
      {loading ? (
        <>
          <div className="text-center py-5">
            <Preloader />
            <div>Loading profile...</div>
          </div>
          <FooterTwo />
        </>
      ) : error ? (
        <>
          <div className="text-center py-5 text-danger">{error}</div>
          <FooterTwo />
        </>
      ) : !user ? (
        <>
          <div className="text-center py-5">No profile data found.</div>
          <FooterTwo />
        </>
      ) : user.role === "Instructor" ? (
        <>
          <section className="instructor-details py-120 position-relative z-1">
            <div className="container">
              <div className="row gy-4">
                {/* Left Card (profile summary) */}
                <div className="col-lg-4">
                  <div className="border border-neutral-30 rounded-12 bg-white p-8 mb-24 position-relative">
                    <div className="border border-neutral-30 rounded-12 bg-main-25 p-32 bg-main-25 text-center">
                      <div className="p-16 border border-neutral-50 rounded-circle aspect-ratio-1 max-w-150 max-h-150 mx-auto position-relative">
                        <img
                          src={user.profilePicture}
                          alt={user.name || ""}
                          className="rounded-circle bg-dark-yellow aspect-ratio-1 cover-img"
                          style={{
                            width: 120,
                            height: 120,
                            objectFit: "cover",
                          }}
                        />
                        <span className="w-32 h-32 bg-success-600 rounded-circle border border-white border-3 flex-center text-white position-absolute bottom-0 end-0">
                          <i className="ph-bold ph-check" />
                        </span>
                      </div>
                      <div className="d-flex justify-content-center align-items-center gap-12 mb-12 flex-wrap">
                        <span className="text-neutral-500 text-md">
                          Gender:{" "}
                          <span className="text-main-600 fw-medium">
                            {user.gender}
                          </span>
                        </span>
                      </div>
                      <ul className="social-list flex-center gap-16 mt-20">
                        {Object.entries(user.socialLinks || {}).map(
                          ([key, val]) =>
                            val ? (
                              <li className="social-list__item" key={key}>
                                <a
                                  href={val}
                                  className="text-main-600 text-xl hover-text-white w-40 h-40 rounded-circle border border-main-600 hover-bg-main-600 flex-center"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <i
                                    className={
                                      key === "linkedin"
                                        ? "ph-bold ph-linkedin-logo"
                                        : key === "github"
                                        ? "ph-bold ph-github-logo"
                                        : key === "twitter"
                                        ? "ph-bold ph-twitter-logo"
                                        : key === "portfolio"
                                        ? "ph-bold ph-globe"
                                        : key === "youtube"
                                        ? "ph-bold ph-youtube-logo"
                                        : key === "instagram"
                                        ? "ph-bold ph-instagram-logo"
                                        : "ph-bold ph-globe"
                                    }
                                  />
                                </a>
                              </li>
                            ) : null
                        )}
                      </ul>
                      <span className="d-block border border-neutral-30 my-20 border-dashed" />
                      <div className="d-flex flex-column gap-16 align-items-center">
                        <div className="flex-align gap-8">
                          <i className="ph ph-phone text-primary" />
                          <span className="text-neutral-700">
                            {user.phoneNumber || "N/A"}
                          </span>
                        </div>
                        <div className="flex-align gap-8">
                          <i className="ph ph-envelope text-success-600" />
                          <a
                            href={`mailto:${user.email}`}
                            className="text-neutral-700 hover-text-main-600"
                          >
                            {user.email}
                          </a>
                        </div>
                        <div className="flex-align gap-8">
                          <i className="ph ph-map-pin text-warning" />
                          <span className="text-neutral-700">
                            {user.location || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="ps-lg-5">
                    <h5 className="text-main-600 mb-0">Instructor</h5>
                    <div className="d-flex align-items-center gap-3 my-3 flex-wrap justify-content-between">
                      <h2
                        className="mb-0"
                        style={{
                          fontWeight: 600,
                          fontSize: "2rem",
                          marginRight: 16,
                        }}
                      >
                        {user?.name || "No Name"}
                      </h2>
                      <button
                        onClick={() => setShowEdit(true)}
                        title="Edit Profile"
                        type="button"
                      >
                        <FaEdit style={{ marginRight: 4 }} /> Edit
                      </button>
                    </div>
                    <div className="text-neutral-500 mb-10 mt-5">
                      <span className="text-md">
                        {user.instructorProfile?.currentRole || "N/A"}
                      </span>
                    </div>

                    <div className="d-flex align-items-center gap-24 mb-32 flex-wrap">
                      <div className="d-flex align-items-center gap-8">
                        <span className="text-neutral-700 text-2xl d-flex">
                          <i className="ph-bold ph-briefcase" />
                        </span>
                        <span className="text-neutral-700 text-md fw-medium">
                          {user.instructorProfile?.currentlyWorkingAt || "N/A"}
                        </span>
                      </div>
                      <span
                        className="vr bg-neutral-200 mx-2"
                        style={{
                          width: 2,
                          height: 24,
                          display: "inline-block",
                        }}
                      ></span>
                      <div className="d-flex align-items-center gap-8">
                        <span className="text-neutral-700 text-2xl d-flex">
                          <i className="ph-bold ph-watch" />
                        </span>
                        <span className="text-neutral-700 text-md fw-medium">
                          {user.instructorProfile?.experienceYears
                            ? `${user.instructorProfile.experienceYears} Years`
                            : "N/A"}
                        </span>
                      </div>
                      <span
                        className="vr bg-neutral-200 mx-2"
                        style={{
                          width: 2,
                          height: 24,
                          display: "inline-block",
                        }}
                      ></span>
                      <div className="d-flex align-items-center gap-8">
                        <span className="text-neutral-700 text-2xl d-flex">
                          <i className="ph-bold ph-users" />
                        </span>
                        <span className="text-neutral-700 text-md fw-medium">
                          {user.instructorProfile?.followers
                            ? user.instructorProfile.followers.length
                            : 0}{" "}
                          Followers
                        </span>
                      </div>
                      <span
                        className="vr bg-neutral-200 mx-2"
                        style={{
                          width: 2,
                          height: 24,
                          display: "inline-block",
                        }}
                      ></span>
                      <div className="d-flex align-items-center gap-8">
                        <span className="text-neutral-700 text-2xl d-flex">
                          <i className="ph-bold ph-user-plus" />
                        </span>
                        <span className="text-neutral-700 text-md fw-medium">
                          {user.instructorProfile?.followingInstructors
                            ? user.instructorProfile.followingInstructors.length
                            : 0}{" "}
                          Following
                        </span>
                      </div>
                      <span
                        className="vr bg-neutral-200 mx-2"
                        style={{
                          width: 2,
                          height: 24,
                          display: "inline-block",
                        }}
                      ></span>
                      <div className="d-flex align-items-center gap-8">
                        <span className="text-warning-700 text-2xl d-flex">
                          <i className="ph-fill ph-star" />
                        </span>
                        <span className="text-md text-warning-700 fw-semibold">
                          {user.instructorProfile?.reviews &&
                          user.instructorProfile.reviews.length > 0
                            ? (
                                user.instructorProfile.reviews.reduce(
                                  (acc, r) =>
                                    acc +
                                    (typeof r.rating === "number"
                                      ? r.rating
                                      : 0),
                                  0
                                ) / user.instructorProfile.reviews.length
                              ).toFixed(1)
                            : 0}
                          <span className="text-neutral-400 fw-normal">
                            {" "}
                            ({user.instructorProfile?.reviews?.length || 0})
                          </span>
                        </span>
                      </div>
                    </div>
                    <span className="d-block border border-neutral-30 my-40 border-dashed" />
                    {/* About Section */}
                    <h4 className="mb-24">About</h4>
                    <p className="text-neutral-500">
                      {user.bio ||
                        "Share a short bio, your teaching interests, and experience."}
                    </p>
                    <span className="d-block border border-neutral-30 my-40 border-dashed" />
                    {/* Instructed Domains Section */}
                    <h4 className="mb-24">Instructed Domains</h4>
                    <div className="d-flex flex-wrap gap-8 mb-32">
                      {user.instructorProfile?.instructedDomains?.length > 0 ? (
                        user.instructorProfile.instructedDomains.map(
                          (domain, idx) => (
                            <span
                              key={idx}
                              className="badge bg-main-25 text-main-600 border border-main-600 fw-normal mb-4"
                            >
                              {domain}
                            </span>
                          )
                        )
                      ) : (
                        <span className="text-neutral-400">N/A</span>
                      )}
                    </div>
                    <span className="d-block border border-neutral-30 my-40 border-dashed" />
                    {/* Tech Stack Section */}
                    <h4 className="mb-24">Tech Stack</h4>
                    <div className="d-flex flex-wrap gap-8 mb-32">
                      {user.instructorProfile?.techStack?.length > 0 ? (
                        user.instructorProfile.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="badge bg-success-100 text-success-700 border border-success-200 fw-normal mb-4"
                          >
                            {tech}
                          </span>
                        ))
                      ) : (
                        <span className="text-neutral-400">N/A</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* Roadmaps Shared and Live Events Hosted - full width */}
              <div className="row mt-5">
                <div className="col-12">
                  <span className="d-block border border-neutral-30 my-40 border-dashed" />
                  <h4 className="mb-24">Roadmaps Shared</h4>
                  <div className="row gy-4 mb-32">
                    {user.instructorProfile?.content?.roadmapsShared?.length >
                    0 ? (
                      user.instructorProfile.content.roadmapsShared.map(
                        (roadmap, idx) => (
                          <div className="col-lg-4 col-md-6 col-12" key={idx}>
                            <div className="course-item bg-info-100 rounded-16 p-24 h-100 box-shadow-md position-relative">
                              <div className="d-flex align-items-center gap-16">
                                <span className="text-info-700 text-2xl d-flex">
                                  <i className="ph-bold ph-map-trifold" />
                                </span>
                                <span className="fw-semibold text-info-700 fs-6">
                                  {roadmap.title || "Untitled Roadmap"}
                                </span>
                              </div>

                              {/* Management buttons for own profile */}
                              {isOwnProfile && (
                                <div className="mt-3 d-flex gap-2 flex-wrap">
                                  <button
                                    onClick={() =>
                                      setEditingRoadmap(roadmap._id)
                                    }
                                    style={{
                                      ...buttonStyle,
                                      backgroundColor: "#28a745",
                                      color: "white",
                                      fontSize: "12px",
                                      padding: "6px 12px",
                                    }}
                                  >
                                    <i className="ph-bold ph-plus" /> Add Step
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteRoadmap(roadmap._id)
                                    }
                                    style={{
                                      ...buttonStyle,
                                      backgroundColor: "#dc3545",
                                      color: "white",
                                      fontSize: "12px",
                                      padding: "6px 12px",
                                    }}
                                  >
                                    <i className="ph-bold ph-trash" /> Delete
                                  </button>
                                </div>
                              )}

                              {/* Add Step Form */}
                              {editingRoadmap === roadmap._id && (
                                <div className="mt-3 p-3 bg-light rounded">
                                  <h6 className="mb-3">Add New Step</h6>

                                  <input
                                    type="text"
                                    placeholder="Step Title"
                                    value={newStep.title}
                                    onChange={(e) =>
                                      setNewStep({
                                        ...newStep,
                                        title: e.target.value,
                                      })
                                    }
                                    style={inputStyle}
                                  />

                                  <textarea
                                    placeholder="Step Description"
                                    value={newStep.description}
                                    onChange={(e) =>
                                      setNewStep({
                                        ...newStep,
                                        description: e.target.value,
                                      })
                                    }
                                    style={textareaStyle}
                                  />

                                  <div className="mb-3">
                                    <label className="fw-bold d-block mb-2">
                                      Resources
                                    </label>
                                    {newStep.resources.map(
                                      (resource, resIdx) => (
                                        <div
                                          key={resIdx}
                                          className="border p-2 mb-2 rounded bg-white"
                                        >
                                          <div className="row g-2 mb-2">
                                            <div className="col-md-6">
                                              <input
                                                type="text"
                                                placeholder="Resource Title"
                                                value={resource.title}
                                                onChange={(e) =>
                                                  updateResourceInNewStep(
                                                    resIdx,
                                                    "title",
                                                    e.target.value
                                                  )
                                                }
                                                style={inputStyle}
                                              />
                                            </div>
                                            <div className="col-md-6">
                                              <select
                                                value={resource.type}
                                                onChange={(e) =>
                                                  updateResourceInNewStep(
                                                    resIdx,
                                                    "type",
                                                    e.target.value
                                                  )
                                                }
                                                style={inputStyle}
                                              >
                                                <option value="video">
                                                  Video
                                                </option>
                                                <option value="article">
                                                  Article
                                                </option>
                                                <option value="book">
                                                  Book
                                                </option>
                                                <option value="course">
                                                  Course
                                                </option>
                                              </select>
                                            </div>
                                          </div>
                                          <input
                                            type="url"
                                            placeholder="Resource Link"
                                            value={resource.link}
                                            onChange={(e) =>
                                              updateResourceInNewStep(
                                                resIdx,
                                                "link",
                                                e.target.value
                                              )
                                            }
                                            style={inputStyle}
                                          />
                                          {newStep.resources.length > 1 && (
                                            <button
                                              onClick={() =>
                                                removeResourceFromNewStep(
                                                  resIdx
                                                )
                                              }
                                              style={{
                                                ...buttonStyle,
                                                backgroundColor: "#dc3545",
                                                color: "white",
                                                fontSize: "12px",
                                                padding: "4px 8px",
                                              }}
                                            >
                                              Remove Resource
                                            </button>
                                          )}
                                        </div>
                                      )
                                    )}
                                    <button
                                      onClick={addResourceToNewStep}
                                      style={{
                                        ...buttonStyle,
                                        backgroundColor: "#6c757d",
                                        color: "white",
                                        fontSize: "12px",
                                        padding: "6px 12px",
                                      }}
                                    >
                                      + Add Resource
                                    </button>
                                  </div>

                                  <div className="d-flex gap-2">
                                    <button
                                      onClick={() => handleAddStep(roadmap._id)}
                                      style={{
                                        ...buttonStyle,
                                        backgroundColor: "#28a745",
                                        color: "white",
                                      }}
                                    >
                                      Save Step
                                    </button>
                                    <button
                                      onClick={() => setEditingRoadmap(null)}
                                      style={{
                                        ...buttonStyle,
                                        backgroundColor: "#6c757d",
                                        color: "white",
                                      }}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      )
                    ) : (
                      <div className="col-12">
                        <div className="course-item bg-light rounded-16 p-24 h-100 box-shadow-md d-flex align-items-center justify-content-center">
                          <span className="fw-semibold text-secondary fs-5">
                            No roadmaps shared by this instructor.
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <h4 className="mb-24">Live Events Hosted</h4>
                  {showForm && editableEvent && (
                    <div className="mt-5 p-4 border rounded bg-light">
                      <h5>Edit Event: {editableEvent.title}</h5>
                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          try {
                            const res = await fetch(
                              `http://localhost:5000/api/events/${editableEvent._id}`,
                              {
                                method: "PUT",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify(editableEvent),
                              }
                            );
                            const data = await res.json();
                            if (res.ok) {
                              alert("Event updated successfully.");
                              setShowForm(false);
                              const instructorId = authUser?._id || id;
                              fetchInstructorDetails(instructorId);
                            } else {
                              alert(data.message || "Update failed.");
                            }
                          } catch (err) {
                            console.error("Update error:", err);
                            alert("An error occurred during update.");
                          }
                        }}
                      >
                        <div className="mb-3">
                          <label>Title</label>
                          <input
                            className="form-control"
                            value={editableEvent.title || ""}
                            onChange={(e) =>
                              setEditableEvent({
                                ...editableEvent,
                                title: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="mb-3">
                          <label>Start Time</label>
                          <input
                            type="datetime-local"
                            className="form-control"
                            value={
                              editableEvent.schedule?.startTime
                                ? toLocalDateTimeInputValue(
                                    editableEvent.schedule.startTime
                                  )
                                : ""
                            }
                            onChange={(e) =>
                              setEditableEvent({
                                ...editableEvent,
                                schedule: {
                                  ...editableEvent.schedule,
                                  startTime: new Date(
                                    e.target.value
                                  ).toISOString(),
                                },
                              })
                            }
                          />
                        </div>

                        <div className="mb-3">
                          <label>End Time</label>
                          <input
                            type="datetime-local"
                            className="form-control"
                            value={
                              editableEvent.schedule?.endTime
                                ? toLocalDateTimeInputValue(
                                    editableEvent.schedule.endTime
                                  )
                                : ""
                            }
                            onChange={(e) =>
                              setEditableEvent({
                                ...editableEvent,
                                schedule: {
                                  ...editableEvent.schedule,
                                  endTime: new Date(
                                    e.target.value
                                  ).toISOString(),
                                },
                              })
                            }
                          />
                        </div>

                        <button type="submit" className="btn btn-primary">
                          Save Changes
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary ms-3"
                          onClick={() => setShowForm(false)}
                        >
                          Cancel
                        </button>
                      </form>
                    </div>
                  )}
                  <div className="row gy-4 mb-32">
                    {user.instructorProfile?.content?.liveEventsHosted?.length >
                    0 ? (
                      user.instructorProfile.content.liveEventsHosted.map(
                        (event, idx) => (
                          <div className="col-lg-6 col-md-12 col-12" key={idx}>
                            <div className="position-relative">
                              <button
                                className="btn btn-light p-2 rounded-circle"
                                style={{
                                  border: "none",
                                  cursor: "pointer",
                                  position: "absolute",
                                  top: 8,
                                  right: 8,
                                  zIndex: 1050, // Ensure the button stays above other elements
                                }}
                                onClick={() =>
                                  setShowOptions((prev) =>
                                    prev === idx ? null : idx
                                  )
                                }
                              >
                                <i
                                  className="ph-bold ph-dots-three-vertical"
                                  style={{ color: "black", fontSize: "24px" }} // Adjust the font size as needed
                                />
                              </button>
                              {showOptions === idx && (
                                <div
                                  ref={dropdownRef}
                                  className="position-absolute bg-white border rounded-12 shadow-sm"
                                  style={{
                                    top: "40px",
                                    right: 0,
                                    zIndex: 1000,
                                    minWidth: 150,
                                    padding: "8px 8px",
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                  }}
                                >
                                  <button
                                    className="dropdown-item text-start px-3 py-2"
                                    style={{
                                      fontSize: "18px",
                                      color: "#333",
                                      backgroundColor: "transparent",
                                      border: "none",
                                      cursor: "pointer",
                                      transition: "background-color 0.2s ease",
                                    }}
                                    onClick={() => handleUpdateEvent(event._id)} // Pass event ID to update handler
                                    onMouseEnter={(e) =>
                                      (e.target.style.backgroundColor =
                                        "#F3F9FF")
                                    }
                                    onMouseLeave={(e) =>
                                      (e.target.style.backgroundColor =
                                        "transparent")
                                    }
                                  >
                                    Update
                                  </button>
                                  <button
                                    className="dropdown-item text-start px-3 py-2 text-danger"
                                    style={{
                                      fontSize: "18px",
                                      color: "#dc3545",
                                      backgroundColor: "transparent",
                                      border: "none",
                                      cursor: "pointer",
                                      transition: "background-color 0.2s ease",
                                    }}
                                    onClick={() => {
                                      const confirmDelete = window.confirm(
                                        "Are you sure you want to delete this event?"
                                      );
                                      if (confirmDelete) {
                                        handleDeleteEvent(event._id);
                                      }
                                    }} // Pass event ID to delete handler
                                    onMouseEnter={(e) =>
                                      (e.target.style.backgroundColor =
                                        "#F3F9FF")
                                    }
                                    onMouseLeave={(e) =>
                                      (e.target.style.backgroundColor =
                                        "transparent")
                                    }
                                  >
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>

                            <div className="course-item bg-white rounded-16 p-12 h-100 box-shadow-md d-flex flex-column flex-md-row align-items-md-center gap-24">
                              <div
                                className="course-item__thumb rounded-12 overflow-hidden position-relative mb-3 mb-md-0"
                                style={{ minWidth: 220, maxWidth: 320 }}
                              >
                                {event.schedule && event.schedule.image ? (
                                  <img
                                    src={event.schedule.image}
                                    alt={event.title || "Event"}
                                    className="course-item__img rounded-12 cover-img transition-2 w-100"
                                    style={{ height: 180, objectFit: "cover" }}
                                  />
                                ) : (
                                  <div
                                    className="bg-main-25 rounded-12 d-flex align-items-center justify-content-center"
                                    style={{ height: 180 }}
                                  >
                                    <i className="ph-bold ph-calendar text-4xl text-main-600" />
                                  </div>
                                )}
                              </div>
                              <div className="course-item__content flex-grow-1">
                                <h5 className="mb-5">
                                  {event.title || "Untitled Event"}
                                </h5>
                                <div className="mb-2 text-neutral-700">
                                  <div className="mb-5">
                                    <strong>🕒 Start:</strong>{" "}
                                    {event.schedule && event.schedule.startTime
                                      ? new Date(
                                          event.schedule.startTime
                                        ).toLocaleString("en-IN", {
                                          dateStyle: "short",
                                          timeStyle: "short",
                                        })
                                      : "No start time available."}
                                  </div>
                                  <div>
                                    <strong>🕓 End:</strong>{" "}
                                    {event.schedule && event.schedule.endTime
                                      ? new Date(
                                          event.schedule.endTime
                                        ).toLocaleString("en-IN", {
                                          dateStyle: "short",
                                          timeStyle: "short",
                                        })
                                      : "No end time available."}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )
                    ) : (
                      <div className="col-12">
                        <div className="course-item bg-light rounded-16 p-24 h-100 box-shadow-md d-flex align-items-center justify-content-center">
                          <span className="fw-semibold text-secondary fs-5">
                            No live events hosted by this instructor.
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <FooterTwo />
        </>
      ) : user.role === "Learner" && learnerProfile ? (
        <>
          <section className="instructor-details py-120 position-relative z-1">
            <div className="container">
              <div className="row gy-4">
                {/* Left Card (profile summary) */}
                <div className="col-lg-4">
                  <div className="border border-neutral-30 rounded-12 bg-white p-8 mb-24 position-relative">
                    <div className="border border-neutral-30 rounded-12 bg-main-25 p-32 bg-main-25 text-center">
                      <div className="p-16 border border-neutral-50 rounded-circle aspect-ratio-1 max-w-150 max-h-150 mx-auto position-relative">
                        <img
                          src={user.profilePicture}
                          alt={user.name || ""}
                          className="rounded-circle bg-dark-yellow aspect-ratio-1 cover-img"
                          style={{
                            width: 120,
                            height: 120,
                            objectFit: "cover",
                          }}
                        />
                        <span className="w-32 h-32 bg-success-600 rounded-circle border border-white border-3 flex-center text-white position-absolute bottom-0 end-0">
                          <i className="ph-bold ph-check" />
                        </span>
                      </div>
                      <div className="d-flex justify-content-center align-items-center gap-12 mb-12 flex-wrap">
                        <span className="text-neutral-500 text-md">
                          Gender:{" "}
                          <span className="text-main-600 fw-medium">
                            {user.gender}
                          </span>
                        </span>
                      </div>
                      <ul className="social-list flex-center gap-16 mt-20">
                        {Object.entries(user.socialLinks || {}).map(
                          ([key, val]) =>
                            val ? (
                              <li className="social-list__item" key={key}>
                                <a
                                  href={val}
                                  className="text-main-600 text-xl hover-text-white w-40 h-40 rounded-circle border border-main-600 hover-bg-main-600 flex-center"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <i
                                    className={
                                      key === "linkedin"
                                        ? "ph-bold ph-linkedin-logo"
                                        : key === "github"
                                        ? "ph-bold ph-github-logo"
                                        : key === "twitter"
                                        ? "ph-bold ph-twitter-logo"
                                        : key === "portfolio"
                                        ? "ph-bold ph-globe"
                                        : key === "youtube"
                                        ? "ph-bold ph-youtube-logo"
                                        : key === "instagram"
                                        ? "ph-bold ph-instagram-logo"
                                        : "ph-bold ph-globe"
                                    }
                                  />
                                </a>
                              </li>
                            ) : null
                        )}
                      </ul>
                      <span className="d-block border border-neutral-30 my-20 border-dashed" />
                      <div className="d-flex flex-column gap-16 align-items-center">
                        <div className="flex-align gap-8">
                          <i className="ph ph-phone text-primary" />
                          <span className="text-neutral-700">
                            {user.phoneNumber || "N/A"}
                          </span>
                        </div>
                        <div className="flex-align gap-8">
                          <i className="ph ph-envelope text-success-600" />
                          <a
                            href={`mailto:${user.email}`}
                            className="text-neutral-700 hover-text-main-600"
                          >
                            {user.email}
                          </a>
                        </div>
                        <div className="flex-align gap-8">
                          <i className="ph ph-map-pin text-warning" />
                          <span className="text-neutral-700">
                            {user.location || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right Info Section (details) */}
                <div className="col-lg-8">
                  <div className="ps-lg-5">
                    <h5 className="text-main-600 mb-0">Learner</h5>
                    <div className="d-flex align-items-center gap-3 my-3 flex-wrap justify-content-between">
                      <h2
                        className="mb-0"
                        style={{
                          fontWeight: 600,
                          fontSize: "2rem",
                          marginRight: 16,
                        }}
                      >
                        {user?.name || "No Name"}
                      </h2>
                      <button
                        onClick={() => setShowEdit(true)}
                        title="Edit Profile"
                        type="button"
                      >
                        <FaEdit style={{ marginRight: 4 }} /> Edit
                      </button>
                    </div>
                    <div className="mb-16 text-neutral-700 fw-medium text-md">
                      {learnerProfile.skillLevel || "N/A"}
                    </div>
                    <div className="d-flex align-items-center gap-24 mb-32 flex-wrap">
                      <div className="d-flex align-items-center gap-8">
                        <span className="text-neutral-700 text-2xl d-flex">
                          <i className="ph-bold ph-graduation-cap" />
                        </span>
                        <span className="text-neutral-700 text-md fw-medium">
                          {learnerProfile.currentEducation || "N/A"}
                        </span>
                      </div>
                      <span
                        className="vr bg-neutral-200 mx-2"
                        style={{
                          width: 2,
                          height: 24,
                          display: "inline-block",
                        }}
                      ></span>
                      <div className="d-flex align-items-center gap-8">
                        <span className="text-neutral-700 text-2xl d-flex">
                          <i className="ph-bold ph-calendar-blank" />
                        </span>
                        <span className="text-neutral-700 text-md fw-medium">
                          {learnerProfile.yearOfStudy || "N/A"}
                        </span>
                      </div>
                      <span
                        className="vr bg-neutral-200 mx-2"
                        style={{
                          width: 2,
                          height: 24,
                          display: "inline-block",
                        }}
                      ></span>
                      <div className="d-flex align-items-center gap-8">
                        <span className="text-neutral-700 text-2xl d-flex">
                          <i className="ph-bold ph-users" />
                        </span>
                        <span className="text-neutral-700 text-md fw-medium">
                          {learnerProfile.followingInstructors?.length || 0}{" "}
                          Following
                        </span>
                      </div>
                    </div>
                    <span className="d-block border border-neutral-30 my-40 border-dashed" />
                    {/* About Section */}
                    <h4 className="mb-24">About</h4>
                    <p className="text-neutral-500">
                      {user.bio ||
                        "Share a short bio, your learning interests, and goals."}
                    </p>
                    <span className="d-block border border-neutral-30 my-40 border-dashed" />
                    {/* Interested Domains Section */}
                    <h4 className="mb-24">Interested Domains</h4>
                    <div className="d-flex flex-wrap gap-8 mb-32">
                      {learnerProfile.interestedDomains?.length > 0 ? (
                        learnerProfile.interestedDomains.map((domain, idx) => (
                          <span
                            key={idx}
                            className="badge bg-main-25 text-main-600 border border-main-600 fw-normal mb-4"
                          >
                            {domain}
                          </span>
                        ))
                      ) : (
                        <span className="text-neutral-400">N/A</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>{" "}
              {/* end row gy-4 (profile+contact+right details) */}
            </div>{" "}
            <div className="container">
              <div className="row mt-5">
                <div className="col-12">
                  <span className="d-block border border-neutral-30 my-40 border-dashed" />
                  <h4 className="mb-24">Following Content</h4>
                  <div className="row gy-4 mb-32">
                    {/* Roadmaps */}
                    {learnerProfile.followingContent?.roadmaps?.length > 0 ? (
                      learnerProfile.followingContent.roadmaps.map(
                        (roadmap, idx) => (
                          <div className="col-md-4 col-12" key={idx}>
                            <div className="course-item bg-info-100 rounded-16 p-24 h-100 box-shadow-md d-flex align-items-center gap-16">
                              <span className="text-info-700 text-2xl d-flex">
                                <i className="ph-bold ph-map-trifold" />
                              </span>
                              <span className="fw-semibold text-info-700 fs-5">
                                {roadmap.title || roadmap._id || roadmap}
                              </span>
                            </div>
                          </div>
                        )
                      )
                    ) : (
                      <div className="col-12">
                        <div className="course-item bg-light rounded-16 p-24 h-100 box-shadow-md d-flex align-items-center justify-content-center">
                          <span className="fw-semibold text-secondary fs-5">
                            No following roadmaps.
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <h5 className="mb-16 mt-4">Registered Live Events</h5>
                  <div className="row gy-4 mb-32">
                    {/* Registered Events */}
                    {learnerProfile.followingContent?.registeredEvents?.length >
                    0 ? (
                      learnerProfile.followingContent.registeredEvents.map(
                        (event, idx) => (
                          <div className="col-lg-6 col-md-12 col-12" key={idx}>
                            <div className="course-item bg-white rounded-16 p-12 h-100 box-shadow-md d-flex flex-column flex-md-row align-items-md-center gap-24">
                              <div
                                className="course-item__thumb rounded-12 overflow-hidden position-relative mb-3 mb-md-0"
                                style={{ minWidth: 220, maxWidth: 320 }}
                              >
                                {event.schedule && event.schedule.image ? (
                                  <img
                                    src={event.schedule.image}
                                    alt={event.title || "Event"}
                                    className="course-item__img rounded-12 cover-img transition-2 w-70"
                                    style={{ height: 120, objectFit: "cover" }}
                                  />
                                ) : (
                                  <div
                                    className="bg-main-25 rounded-12 d-flex align-items-center justify-content-center"
                                    style={{ height: 180 }}
                                  >
                                    <i className="ph-bold ph-calendar text-4xl text-main-600" />
                                  </div>
                                )}
                              </div>
                              <div className="course-item__content flex-grow-1">
                                <h5 className="mb-5">
                                  {event.title || "Untitled Event"}
                                </h5>
                                <div className="mb-2 text-neutral-700">
                                  <div className="mb-5">
                                    <strong>🕒 Start:</strong>{" "}
                                    {event.schedule && event.schedule.startTime
                                      ? new Date(
                                          event.schedule.startTime
                                        ).toLocaleString("en-IN", {
                                          dateStyle: "short",
                                          timeStyle: "short",
                                        })
                                      : "No start time available."}
                                  </div>
                                  <div>
                                    <strong>🕓 End:</strong>{" "}
                                    {event.schedule && event.schedule.endTime
                                      ? new Date(
                                          event.schedule.endTime
                                        ).toLocaleString("en-IN", {
                                          dateStyle: "short",
                                          timeStyle: "short",
                                        })
                                      : "No end time available."}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )
                    ) : (
                      <div className="col-12">
                        <div className="course-item bg-light rounded-16 p-24 h-100 box-shadow-md d-flex align-items-center justify-content-center">
                          <span className="fw-semibold text-secondary fs-5">
                            No registered events.
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="d-block border border-neutral-30 my-40 border-dashed" />
                  <h4 className="mb-24">Completed Content</h4>
                  <div className="row gy-4 mb-32">
                    {/* Roadmaps */}
                    {learnerProfile.completedContent?.roadmaps?.length > 0 ? (
                      learnerProfile.completedContent.roadmaps.map(
                        (roadmap, idx) => (
                          <div className="col-md-4 col-12" key={idx}>
                            <div className="course-item bg-info-100 rounded-16 p-24 h-100 box-shadow-md d-flex align-items-center gap-16">
                              <span className="text-info-700 text-2xl d-flex">
                                <i className="ph-bold ph-map-trifold" />
                              </span>
                              <span className="fw-semibold text-info-700 fs-5">
                                {roadmap.title || roadmap._id || roadmap}
                              </span>
                            </div>
                          </div>
                        )
                      )
                    ) : (
                      <div className="col-12">
                        <div className="course-item bg-light rounded-16 p-24 h-100 box-shadow-md d-flex align-items-center justify-content-center">
                          <span className="fw-semibold text-secondary fs-5">
                            No completed roadmaps.
                          </span>
                        </div>
                      </div>
                    )}
                    {/* Completed Live Events */}
                    {learnerProfile.completedContent?.liveEvents?.length > 0 ? (
                      learnerProfile.completedContent.liveEvents.map(
                        (event, idx) => (
                          <div className="col-md-6 col-12" key={"event-" + idx}>
                            <div className="course-item bg-warning-100 rounded-16 p-24 h-100 box-shadow-md d-flex flex-column flex-md-row align-items-md-center gap-24">
                              <div
                                className="course-item__thumb rounded-12 overflow-hidden position-relative mb-3 mb-md-0"
                                style={{ minWidth: 120, maxWidth: 180 }}
                              >
                                {event.image ? (
                                  <img
                                    src={event.image}
                                    alt={event.title}
                                    className="course-item__img rounded-12 cover-img transition-2 w-100"
                                    style={{ height: 100, objectFit: "cover" }}
                                  />
                                ) : (
                                  <div
                                    className="bg-main-25 rounded-12 d-flex align-items-center justify-content-center"
                                    style={{ height: 100 }}
                                  >
                                    <i className="ph-bold ph-calendar text-2xl text-main-600" />
                                  </div>
                                )}
                              </div>
                              <div className="course-item__content flex-grow-1">
                                <h5 className="mb-2">
                                  {event.title || "Untitled Event"}
                                </h5>
                                {event.date && (
                                  <div className="mb-2 text-neutral-700 fw-medium text-md">
                                    {event.date}
                                  </div>
                                )}
                                {event.description && (
                                  <div className="mb-2 text-neutral-500">
                                    {event.description}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      )
                    ) : (
                      <div className="col-12">
                        <div className="course-item bg-light rounded-16 p-24 h-100 box-shadow-md d-flex align-items-center justify-content-center">
                          <span className="fw-semibold text-secondary fs-5">
                            No completed live events.
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <FooterTwo />
        </>
      ) : (
        <>
          <div className="text-center py-5">No profile data found.</div>
          <FooterTwo />
        </>
      )}
    </>
  );
};

export default ProfilePage;