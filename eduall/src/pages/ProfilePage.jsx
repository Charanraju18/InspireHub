import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import HeaderOne from "../components/HeaderOne";
import Preloader from "../helper/Preloader";
import axios from "axios";
import { useAuth } from "../authContext";
import InstructorDetails from "../components/InstructorDetails";
import FooterTwo from "../components/FooterTwo";
import { FaEdit } from "react-icons/fa";

const ProfileEditForm = ({ user, learnerProfile, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({ ...user });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Only allow editing of certain fields
  const editableFields = [
    "name",
    "gender",
    "location",
    "bio",
    "profilePicture",
  ];

  // For learners, allow editing interestedDomains, skillLevel, currentEducation, yearOfStudy
  const learnerFields = learnerProfile
    ? [
      "skillLevel",
      "currentEducation",
      "yearOfStudy",
      "interestedDomains",
    ]
    : [];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle array fields (like interestedDomains)
  const handleArrayChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value.split(",").map((v) => v.trim()) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      let token = localStorage.getItem("token");
      const updateData = { ...formData };
      // Remove non-editable fields
      delete updateData._id;
      delete updateData.email;
      delete updateData.phoneNumber;
      delete updateData.role;
      // For learners, merge learnerProfile fields
      if (learnerProfile) {
        updateData.learnerProfile = {
          ...learnerProfile,
          skillLevel: formData.skillLevel,
          currentEducation: formData.currentEducation,
          yearOfStudy: formData.yearOfStudy,
          interestedDomains: formData.interestedDomains,
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
          minWidth: 350,
          boxShadow: "0 4px 32px rgba(0,0,0,0.15)",
          textAlign: "left",
        }}
      >
        <h4 className="mb-3">Edit Profile</h4>
        {editableFields.map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label" style={{ fontWeight: 500 }}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type="text"
              className="form-control"
              name={field}
              value={formData[field] || ""}
              onChange={handleChange}
              disabled={submitting}
            />
          </div>
        ))}
        {learnerFields.map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label" style={{ fontWeight: 500 }}>
              {field === "interestedDomains"
                ? "Interested Domains (comma separated)"
                : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            {field === "interestedDomains" ? (
              <input
                type="text"
                className="form-control"
                name={field}
                value={
                  Array.isArray(formData[field])
                    ? formData[field].join(", ")
                    : formData[field] || ""
                }
                onChange={(e) => handleArrayChange(field, e.target.value)}
                disabled={submitting}
              />
            ) : (
              <input
                type="text"
                className="form-control"
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
                disabled={submitting}
              />
            )}
          </div>
        ))}
        {error && <div className="text-danger mb-2">{error}</div>}
        <div className="d-flex justify-content-end gap-2 mt-4">
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

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError("");
      try {
        let token = localStorage.getItem("token");
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
    fetchProfile();
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
          {/* <HeaderOne />
          <Breadcrumb title={"Profile"} /> */}
          <InstructorDetails instructor={user} hideGetInTouch={true} />
          <FooterTwo />
        </>
      ) : user.role === "Learner" && learnerProfile ? (
        <>
          {/* <HeaderOne />
          <Breadcrumb title={"Profile"} /> */}
          <section className="instructor-details py-120 position-relative z-1">
            <div className="container">
              <div className="row gy-4">
                {/* Left Card (profile summary) */}
                <div className="col-lg-4">
                  <div className="border border-neutral-30 rounded-12 bg-white p-8 mb-24">
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
                      {/* <h4 className="mb-12 mt-24">{user.name}</h4> */}
                      <div className="d-flex justify-content-center align-items-center gap-12 mb-12 flex-wrap">
                        {/* <span className="text-neutral-500 text-md">
                        Role: <span className="text-main-600 fw-medium">{user.role}</span>
                      </span> */}
                        <span className="w-4 h-4 bg-main-600 rounded-circle" />
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
                    <div className="d-flex align-items-center gap-12 my-16 flex-wrap" style={{ position: "relative" }}>
                      <h2
                        className="mb-0"
                        style={{ fontWeight: 600, fontSize: "2rem" }}
                      >
                        {user.name}
                      </h2>
                      <button
                        className="btn btn-outline-primary btn-sm"
                        style={{ position: "absolute", right: 0, top: 0 }}
                        onClick={() => setShowEdit(true)}
                        title="Edit Profile"
                      >
                        <FaEdit /> Edit
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
                                {event.schedule.image ? (
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
                                    {new Date(event.schedule.startTime).toLocaleString("en-IN", {
                                      dateStyle: "short",
                                      timeStyle: "short",
                                    }) || "No start time available."}
                                  </div>
                                  <div>
                                    <strong>🕓 End:</strong>{" "}
                                    {new Date(event.schedule.endTime).toLocaleString("en-IN", {
                                      dateStyle: "short",
                                      timeStyle: "short",
                                    }) || "No end time available."}
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



