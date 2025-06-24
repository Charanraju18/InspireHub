import React, { useState, useEffect } from "react";
import { useAuth } from "../authContext";

const InstructorDetails = ({ instructor, hideGetInTouch = false }) => {
  const { user } = useAuth();
  const [followersCount, setFollowersCount] = useState(147);
  const [followingCount, setFollowingCount] = useState(52);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [roadmaps, setRoadmaps] = useState([]);
  const [editingRoadmap, setEditingRoadmap] = useState(null);
  
  const [newStep, setNewStep] = useState({
    title: "",
    description: "",
    resources: [{ title: "", link: "", type: "video" }]
  });

  useEffect(() => {
    if (user && instructor) {
      setIsOwnProfile(user._id === instructor._id || user.id === instructor._id);
      setRoadmaps(instructor.instructorProfile?.content?.roadmapsShared || []);
    }
  }, [user, instructor]);

  // Delete roadmap
  const handleDeleteRoadmap = async (roadmapId) => {
    if (!window.confirm("Are you sure you want to delete this roadmap?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/roadmaps/${roadmapId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setRoadmaps(roadmaps.filter(r => r._id !== roadmapId));
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
      const response = await fetch(`http://localhost:5000/api/roadmaps/${roadmapId}/add-step`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ step: newStep }),
      });

      if (response.ok) {
        const updatedRoadmap = await response.json();
        setRoadmaps(roadmaps.map(r => r._id === roadmapId ? updatedRoadmap.roadmap : r));
        setEditingRoadmap(null);
        setNewStep({
          title: "",
          description: "",
          resources: [{ title: "", link: "", type: "video" }]
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
      resources: [...newStep.resources, { title: "", link: "", type: "video" }]
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

  return (
    <section className="instructor-details py-120 position-relative z-1">
      <div className="container">
        <div className="row gy-4">
          {/* Left Card (profile summary) */}
          <div className="col-lg-4">
            <div className="border border-neutral-30 rounded-12 bg-white p-8 mb-24">
              <div className="border border-neutral-30 rounded-12 bg-main-25 p-32 bg-main-25 text-center">
                <div className="p-16 border border-neutral-50 rounded-circle aspect-ratio-1 max-w-150 max-h-150 mx-auto position-relative">
                  <img
                    src={instructor.profilePicture}
                    alt={instructor.name || ""}
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
                <h4 className="mb-12 mt-24">{instructor.name}</h4>
                <div className="d-flex justify-content-center align-items-center gap-12 mb-12 flex-wrap">
                  <span className="text-neutral-500 text-md">
                    Role: <span className="text-main-600 fw-medium">{instructor.role}</span>
                  </span>
                  <span className="w-4 h-4 bg-main-600 rounded-circle" />
                  <span className="text-neutral-500 text-md">
                    Gender: <span className="text-main-600 fw-medium">{instructor.gender}</span>
                  </span>
                </div>
                <ul className="social-list flex-center gap-16 mt-20">
                  {Object.entries(instructor.socialLinks || {}).map(
                    ([key, val]) =>
                      val ? (
                        <li key={key} className="social-list__item">
                          <a
                            href={val}
                            className="text-main-600 text-xl hover-text-white w-40 h-40 rounded-circle border border-main-600 hover-bg-main-600 flex-center"
                          >
                            <i className={`ph-bold ph-${key}-logo`} />
                          </a>
                        </li>
                      ) : null
                  )}
                </ul>
              </div>
              {!hideGetInTouch && !isOwnProfile && (
                <div className="text-center mt-24">
                  <button className="btn btn-main rounded-pill w-100">
                    Get in Touch
                  </button>
                </div>
              )}
            </div>
            <div className="border border-neutral-30 rounded-12 bg-white p-32 mb-24">
              <h4 className="mb-24">Contact</h4>
              <div className="d-flex align-items-center gap-16 mb-16">
                <span className="w-40 h-40 flex-center rounded-circle bg-main-25 text-main-600 text-xl flex-shrink-0">
                  <i className="ph-bold ph-phone" />
                </span>
                <a
                  href={`tel:${instructor.mobile}`}
                  className="text-neutral-700 hover-text-main-600"
                >
                  {instructor.mobile}
                </a>
              </div>
              <div className="d-flex align-items-center gap-16 mb-16">
                <span className="w-40 h-40 flex-center rounded-circle bg-main-25 text-main-600 text-xl flex-shrink-0">
                  <i className="ph-bold ph-envelope" />
                </span>
                <a
                  href={`mailto:${instructor.email}`}
                  className="text-neutral-700 hover-text-main-600"
                >
                  {instructor.email}
                </a>
              </div>
              <div className="d-flex align-items-center gap-16">
                <span className="w-40 h-40 flex-center rounded-circle bg-main-25 text-main-600 text-xl flex-shrink-0">
                  <i className="ph-bold ph-map-pin" />
                </span>
                <span className="text-neutral-700">
                  {instructor.city}, {instructor.state}, {instructor.country}
                </span>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="col-lg-8">
            <div className="border border-neutral-30 rounded-12 bg-white p-32">
              {/* Stats */}
              <div className="d-flex align-items-center gap-16 flex-wrap mb-32">
                <div className="d-flex align-items-center gap-8">
                  <span className="text-neutral-700 text-2xl d-flex">
                    <i className="ph-bold ph-briefcase" />
                  </span>
                  <span className="text-neutral-700 text-md fw-medium">
                    {instructor.instructorProfile?.experienceYears
                      ? `${instructor.instructorProfile.experienceYears} Years`
                      : "N/A"}
                  </span>
                </div>
                <span
                  className="vr bg-neutral-200 mx-2"
                  style={{ width: 2, height: 24, display: "inline-block" }}
                ></span>
                <div className="d-flex align-items-center gap-8">
                  <span className="text-neutral-700 text-2xl d-flex">
                    <i className="ph-bold ph-users" />
                  </span>
                  <span className="text-neutral-700 text-md fw-medium">
                    {followersCount} Followers
                  </span>
                </div>
                {isOwnProfile && (
                  <>
                    <span
                      className="vr bg-neutral-200 mx-2"
                      style={{ width: 2, height: 24, display: "inline-block" }}
                    ></span>
                    <div className="d-flex align-items-center gap-8">
                      <span className="text-neutral-700 text-2xl d-flex">
                        <i className="ph-bold ph-user-plus" />
                      </span>
                      <span className="text-neutral-700 text-md fw-medium">
                        {followingCount} Following
                      </span>
                    </div>
                  </>
                )}
                <span
                  className="vr bg-neutral-200 mx-2"
                  style={{ width: 2, height: 24, display: "inline-block" }}
                ></span>
                <div className="d-flex align-items-center gap-4">
                  <span className="text-2xl fw-medium text-warning-600 d-flex">
                    <i className="ph-fill ph-star" />
                  </span>
                  <span className="text-md text-neutral-700 fw-semibold">
                    {instructor.instructorProfile?.reviews &&
                      instructor.instructorProfile.reviews.length > 0
                      ? (
                        instructor.instructorProfile.reviews.reduce(
                          (acc, r) =>
                            acc +
                            (typeof r.rating === "number" ? r.rating : 0),
                          0
                        ) / instructor.instructorProfile.reviews.length
                      ).toFixed(1)
                      : 0}
                    <span className="text-neutral-100 fw-normal">
                      ({instructor.instructorProfile?.reviews?.length || "0"})
                    </span>
                  </span>
                </div>
              </div>
              
              <span className="d-block border border-neutral-30 my-40 border-dashed" />
              <h4 className="mb-24">About</h4>
              <p className="text-neutral-500">
                {instructor.bio ||
                  "Offer brief biographies or profiles of each instructor. These may include details about their careers, achievements, and interests."}
              </p>
              
              <span className="d-block border border-neutral-30 my-40 border-dashed" />
              <h4 className="mb-24">Instructed Domains</h4>
              <div className="d-flex flex-wrap gap-8 mb-32">
                {instructor.instructorProfile?.instructedDomains?.length > 0 ? (
                  instructor.instructorProfile.instructedDomains.map(
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
              <h4 className="mb-24">Tech Stack</h4>
              <div className="d-flex flex-wrap gap-8 mb-32">
                {instructor.instructorProfile?.techStack?.length > 0 ? (
                  instructor.instructorProfile.techStack.map((tech, idx) => (
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
              
              <span className="d-block border border-neutral-30 my-40 border-dashed" />
              <h4 className="mb-24">Awards</h4>
              <div className="d-flex flex-wrap gap-8 mb-32">
                {instructor.instructorProfile?.awards?.length > 0 ? (
                  instructor.instructorProfile.awards.map((award, idx) => (
                    <span
                      key={idx}
                      className="badge bg-warning-100 text-warning-700 border border-warning-200 fw-normal mb-4"
                    >
                      {award}
                    </span>
                  ))
                ) : (
                  <span className="text-neutral-400">N/A</span>
                )}
              </div>
              <span className="d-block border border-neutral-30 my-40 border-dashed" />
            </div>
          </div>
        </div>

        {/* Roadmaps Shared Section */}
        <div className="row mt-5">
          <div className="col-12">
            <span className="d-block border border-neutral-30 my-40 border-dashed" />
            <h4 className="mb-24" id="roadmaps-shared">Roadmaps Shared</h4>
            <div className="row gy-4 mb-32">
              {roadmaps.length > 0 ? (
                roadmaps.map((roadmap, idx) => (
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
                            onClick={() => setEditingRoadmap(roadmap._id)}
                            style={{
                              ...buttonStyle,
                              backgroundColor: "#28a745",
                              color: "white",
                              fontSize: "12px",
                              padding: "6px 12px"
                            }}
                          >
                            <i className="ph-bold ph-plus" /> Add Step
                          </button>
                          <button
                            onClick={() => handleDeleteRoadmap(roadmap._id)}
                            style={{
                              ...buttonStyle,
                              backgroundColor: "#dc3545",
                              color: "white",
                              fontSize: "12px",
                              padding: "6px 12px"
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
                            onChange={(e) => setNewStep({...newStep, title: e.target.value})}
                            style={inputStyle}
                          />
                          
                          <textarea
                            placeholder="Step Description"
                            value={newStep.description}
                            onChange={(e) => setNewStep({...newStep, description: e.target.value})}
                            style={textareaStyle}
                          />

                          <div className="mb-3">
                            <label className="fw-bold d-block mb-2">Resources</label>
                            {newStep.resources.map((resource, resIdx) => (
                              <div key={resIdx} className="border p-2 mb-2 rounded bg-white">
                                <div className="row g-2 mb-2">
                                  <div className="col-md-6">
                                    <input
                                      type="text"
                                      placeholder="Resource Title"
                                      value={resource.title}
                                      onChange={(e) => updateResourceInNewStep(resIdx, 'title', e.target.value)}
                                      style={inputStyle}
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <select
                                      value={resource.type}
                                      onChange={(e) => updateResourceInNewStep(resIdx, 'type', e.target.value)}
                                      style={inputStyle}
                                    >
                                      <option value="video">Video</option>
                                      <option value="article">Article</option>
                                      <option value="book">Book</option>
                                      <option value="course">Course</option>
                                    </select>
                                  </div>
                                </div>
                                <input
                                  type="url"
                                  placeholder="Resource Link"
                                  value={resource.link}
                                  onChange={(e) => updateResourceInNewStep(resIdx, 'link', e.target.value)}
                                  style={inputStyle}
                                />
                                {newStep.resources.length > 1 && (
                                  <button
                                    onClick={() => removeResourceFromNewStep(resIdx)}
                                    style={{
                                      ...buttonStyle,
                                      backgroundColor: "#dc3545",
                                      color: "white",
                                      fontSize: "12px",
                                      padding: "4px 8px"
                                    }}
                                  >
                                    Remove Resource
                                  </button>
                                )}
                              </div>
                            ))}
                            <button
                              onClick={addResourceToNewStep}
                              style={{
                                ...buttonStyle,
                                backgroundColor: "#6c757d",
                                color: "white",
                                fontSize: "12px",
                                padding: "6px 12px"
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
                                color: "white"
                              }}
                            >
                              Save Step
                            </button>
                            <button
                              onClick={() => setEditingRoadmap(null)}
                              style={{
                                ...buttonStyle,
                                backgroundColor: "#6c757d",
                                color: "white"
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
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

            <span className="d-block border border-neutral-30 my-40 border-dashed" />
            <h4 className="mb-24">Live Events Hosted</h4>
            <div className="row gy-4">
              {instructor.instructorProfile?.content?.liveEventsHosted?.length > 0 ? (
                instructor.instructorProfile.content.liveEventsHosted.map(
                  (event, idx) => (
                    <div className="col-lg-6 col-md-12 col-12" key={idx}>
                      <div className="course-item bg-white rounded-16 p-12 h-100 box-shadow-md d-flex flex-column flex-md-row align-items-md-center gap-24">
                        <div
                          className="course-item__thumb rounded-12 overflow-hidden position-relative mb-3 mb-md-0"
                          style={{ minWidth: 220, maxWidth: 320 }}
                        >
                          {event.image ? (
                            <img
                              src={event.image}
                              alt={event.title}
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
                          <h5 className="mb-2">{event.title}</h5>
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
  );
};

export default InstructorDetails;




// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useAuth } from "../authContext";
// import { useRef } from "react";

// function toLocalDateTimeInputValue(isoString) {
//   if (!isoString) return "";
//   const date = new Date(isoString);
//   const tzOffset = date.getTimezoneOffset() * 60000; // Convert offset to milliseconds
//   return new Date(date - tzOffset).toISOString().slice(0, 16);
// }

// const InstructorDetails = ({
//   instructor: propInstructor,
//   hideGetInTouch = false,
// }) => {
//   const { id } = useParams();
//   const { user: currentUser, isAuthenticated } = useAuth();
//   const [instructor, setInstructor] = useState(propInstructor || null);
//   const [loading, setLoading] = useState(!propInstructor);
//   const [error, setError] = useState(null);

//   const [isFollowing, setIsFollowing] = useState(false);
//   const [followersCount, setFollowersCount] = useState(0);
//   const [followingCount, setFollowingCount] = useState(0);
//   const [followLoading, setFollowLoading] = useState(false);
//   const [showUnfollowModal, setShowUnfollowModal] = useState(false);

//   const [showOptions, setShowOptions] = useState(false);
//   const [liveEvents, setLiveEvents] = useState([]);
//   const [editableEvent, setEditableEvent] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   const dropdownRef = useRef(null);

//   const fetchInstructorDetails = async (instructorId) => {
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/auth/instructors/${instructorId}`
//       );
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.msg || "Failed to fetch instructor");

//       setInstructor(data);

//       // Fetch followers only if authenticated and instructor is loaded
//       if (data?._id && isAuthenticated) {
//         fetchFollowers(data._id); // 👈 pass id directly
//       }
//     } catch (err) {
//       setError(err.message);
//       console.error("Error fetching instructor:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowOptions(null);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     if (!propInstructor && id) {
//       fetchInstructorDetails(id);
//     }
//   }, [id, propInstructor, isAuthenticated]);

//   useEffect(() => {
//     const fetchFollowStatus = async () => {
//       const instructorId = instructor?._id || id;
//       if (!instructorId) return;
//       const token = localStorage.getItem("token");
//       try {
//         const res = await fetch(
//           `http://localhost:5000/api/follow-instructors/check-follow/${instructorId}`,
//           {
//             headers: token ? { Authorization: `Bearer ${token}` } : {},
//             credentials: "include",
//           }
//         );
//         const data = await res.json();
//         if (res.ok) setIsFollowing(data.data?.isFollowing);
//       } catch (err) {
//         console.error("Error checking follow status:", err);
//       }
//     };
//     if (isAuthenticated && instructor?._id) {
//       fetchFollowStatus();
//     }
//   }, [instructor?._id, isAuthenticated]);

//   const fetchFollowers = async () => {
//     const instructorId = instructor?._id || id;
//     if (!instructorId) return;
//     const token = localStorage.getItem("token");
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/follow-instructors/followers/${instructorId}`,
//         {
//           headers: token ? { Authorization: `Bearer ${token}` } : {},
//           credentials: "include",
//         }
//       );
//       const data = await res.json();
//       console.log("Followers API response:", data);
//       if (res.ok && data.data) setFollowersCount(data.data.followersCount);
//     } catch (err) {
//       console.error("Error fetching followers:", err);
//     }
//   };

//   useEffect(() => {
//     if (isAuthenticated && instructor?._id) {
//       fetchFollowers();
//     }
//   }, [instructor?._id, isFollowing, isAuthenticated]);

//   useEffect(() => {
//     const fetchFollowing = async () => {
//       const token = localStorage.getItem("token");
//       try {
//         const res = await fetch(
//           `http://localhost:5000/api/follow-instructors/following`,
//           {
//             headers: token ? { Authorization: `Bearer ${token}` } : {},
//             credentials: "include",
//           }
//         );
//         const data = await res.json();
//         if (res.ok && data.data) setFollowingCount(data.data.followingCount);
//       } catch (err) {
//         console.error("Error fetching following count:", err);
//       }
//     };
//     if (isAuthenticated) fetchFollowing();
//   }, [isFollowing, isAuthenticated]);

//   const handleFollow = async () => {
//     const instructorId = instructor?._id || id;
//     if (!instructorId) return;

//     setFollowLoading(true);
//     const token = localStorage.getItem("token");

//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/follow-instructors/follow/${instructorId}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           credentials: "include",
//           body: JSON.stringify({}), // Required even if empty
//         }
//       );

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Follow failed");

//       setIsFollowing(true);
//       setFollowersCount((prev) => prev + 1);
//       fetchFollowers();
//     } catch (err) {
//       console.error("Error in follow:", err);
//     } finally {
//       setFollowLoading(false);
//     }
//   };

//   const handleUnfollow = async () => {
//     const instructorId = instructor?._id || id;
//     if (!instructorId) return;
//     setFollowLoading(true);
//     const token = localStorage.getItem("token");
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/follow-instructors/unfollow/${instructorId}`,
//         {
//           method: "DELETE",
//           headers: token ? { Authorization: `Bearer ${token}` } : {},
//           credentials: "include",
//         }
//       );
//       if (res.ok) {
//         setIsFollowing(false);
//         setFollowersCount((prev) => (prev > 0 ? prev - 1 : 0));
//         fetchFollowers();
//       }
//     } catch (err) {
//       console.error("Error in unfollow:", err);
//     } finally {
//       setFollowLoading(false);
//     }
//   };

//   // Function to delete a live event
//   const handleDelete = async (eventId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/events/${eventId}`,
//         {
//           method: "DELETE",
//         }
//       );

//       if (response.ok) {
//         alert("Event deleted successfully!");

//         // ✅ Re-fetch updated instructor data from backend
//         const instructorId = propInstructor?._id || id;
//         fetchInstructorDetails(instructorId);
//       } else {
//         alert("Failed to delete the event.");
//       }
//     } catch (error) {
//       console.error("Error deleting event:", error);
//       alert("An error occurred while deleting the event.");
//     }
//   };

//   // Function to fetch event data and load it into an editable form
//   const handleUpdate = async (eventId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/events/${eventId}`
//       );
//       if (response.ok) {
//         const eventData = await response.json();
//         setEditableEvent(eventData); // Pre-fill form with fetched data
//         setShowForm(true);
//       } else {
//         alert("Failed to fetch event data.");
//       }
//     } catch (error) {
//       console.error("Error fetching event data:", error);
//       alert("An error occurred while fetching event data.");
//     }
//   };

//   if (loading) return <div className="text-center my-5">Loading...</div>;
//   if (error) return <div className="text-center my-5 text-danger">{error}</div>;
//   if (!instructor)
//     return (
//       <div className="text-center my-5 text-danger">No instructor found.</div>
//     );

//   const isOwnProfile = currentUser && instructor?._id === currentUser._id;

//   return (
//     <section className="instructor-details py-120 position-relative z-1">
//       {/* Custom Unfollow Confirmation Modal */}
//       {showUnfollowModal && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100vw",
//             height: "100vh",
//             background: "rgba(0,0,0,0.4)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 9999,
//           }}
//         >
//           <div
//             style={{
//               background: "#fff",
//               borderRadius: 12,
//               padding: 32,
//               minWidth: 320,
//               boxShadow: "0 4px 32px rgba(0,0,0,0.15)",
//               textAlign: "center",
//             }}
//           >
//             <h5 style={{ marginBottom: 16 }}>Unfollow Instructor?</h5>
//             <p style={{ marginBottom: 24 }}>
//               Are you sure you want to unfollow this instructor?
//             </p>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 gap: 16,
//               }}
//             >
//               <button
//                 className="btn btn-danger"
//                 onClick={() => {
//                   setShowUnfollowModal(false);
//                   handleUnfollow();
//                 }}
//                 style={{ minWidth: 80 }}
//               >
//                 Unfollow
//               </button>
//               <button
//                 className="btn btn-secondary"
//                 onClick={() => setShowUnfollowModal(false)}
//                 style={{ minWidth: 80 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       <div className="container">
//         <div className="row gy-4">
//           <div className="col-lg-4">
//             <div className="border border-neutral-30 rounded-12 bg-white p-8 mb-24">
//               <div className="border border-neutral-30 rounded-12 bg-main-25 p-32 bg-main-25 text-center">
//                 <div className="p-16 border border-neutral-50 rounded-circle aspect-ratio-1 max-w-150 max-h-150 mx-auto position-relative">
//                   <img
//                     src={
//                       instructor.profilePicture ||
//                       "assets/images/thumbs/instructor-details-thumb.png"
//                     }
//                     alt={instructor.name || ""}
//                     className="rounded-circle bg-dark-yellow aspect-ratio-1 cover-img"
//                     style={{ width: 120, height: 120, objectFit: "cover" }}
//                   />
//                   <span className="w-32 h-32 bg-success-600 rounded-circle border border-white border-3 flex-center text-white position-absolute bottom-0 end-0">
//                     <i className="ph-bold ph-check" />
//                   </span>
//                 </div>
//                 <div className="d-flex justify-content-center align-items-center gap-12 mb-12 flex-wrap">
//                   <span className="text-neutral-500 text-md">
//                     Gender:{" "}
//                     <span className="text-main-600 fw-medium">
//                       {instructor.gender}
//                     </span>
//                   </span>
//                 </div>
//                 <ul className="social-list flex-center gap-16 mt-20">
//                   {Object.entries(instructor.socialLinks || {}).map(
//                     ([key, val]) =>
//                       val ? (
//                         <li className="social-list__item" key={key}>
//                           <a
//                             href={val}
//                             className="text-black text-xl hover-text-white w-40 h-40 rounded-circle border border-black hover-bg-black flex-center"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                           >
//                             <i
//                               className={
//                                 key === "linkedin"
//                                   ? "ph-bold ph-linkedin-logo"
//                                   : key === "github"
//                                   ? "ph-bold ph-github-logo"
//                                   : key === "twitter"
//                                   ? "ph-bold ph-twitter-logo"
//                                   : key === "portfolio"
//                                   ? "ph-bold ph-globe"
//                                   : key === "youtube"
//                                   ? "ph-bold ph-youtube-logo"
//                                   : key === "instagram"
//                                   ? "ph-bold ph-instagram-logo"
//                                   : "ph-bold ph-globe"
//                               }
//                             />
//                           </a>
//                         </li>
//                       ) : null
//                   )}
//                 </ul>
//                 <span className="d-block border border-neutral-30 my-20 border-dashed" />
//                 <div className="d-flex flex-column gap-16 align-items-center">
//                   <div className="flex-align gap-8">
//                     <i className="ph ph-phone text-black" />
//                     <span className="text-neutral-700">
//                       {instructor.phoneNumber || "N/A"}
//                     </span>
//                   </div>
//                   <div className="flex-align gap-8">
//                     <i className="ph ph-envelope text-black" />
//                     <a
//                       href={`mailto:${instructor.email}`}
//                       className="text-neutral-700 hover-text-black"
//                     >
//                       {instructor.email}
//                     </a>
//                   </div>
//                   <div className="flex-align gap-8">
//                     <i className="ph ph-map-pin text-black" />
//                     <span className="text-neutral-700">
//                       {instructor.location || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {!hideGetInTouch && (
//               <div className="border border-neutral-30 rounded-12 bg-white p-8">
//                 <div className="border border-neutral-30 rounded-12 bg-main-25 p-32 bg-main-25">
//                   <h5 className="mb-20 text-center">Get in Touch</h5>
//                   <form
//                     onSubmit={(e) => {
//                       e.preventDefault();
//                     }}
//                   >
//                     <div className="mb-16">
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Your Name"
//                         required
//                       />
//                     </div>
//                     <div className="mb-16">
//                       <input
//                         type="email"
//                         className="form-control"
//                         placeholder="Your Email"
//                         required
//                       />
//                     </div>
//                     <div className="mb-16">
//                       <textarea
//                         className="form-control"
//                         placeholder="Your Message"
//                         rows="3"
//                         required
//                       ></textarea>
//                     </div>
//                     <button type="submit" className="btn btn-black w-100">
//                       Send Message
//                     </button>
//                   </form>
//                 </div>
//               </div>
//             )}
//           </div>
//           <div className="col-lg-8">
//             <div className="ps-lg-5">
//               <h5 className="text-black mb-0">Instructor</h5>
//               <div className="d-flex justify-content-between align-items-center my-16 flex-wrap">
//                 <h2
//                   className="mb-0"
//                   style={{ fontWeight: 600, fontSize: "2rem" }}
//                 >
//                   {instructor.name}
//                 </h2>
//                 <span>
//                   {!hideGetInTouch &&
//                     !isOwnProfile &&
//                     isAuthenticated &&
//                     (isFollowing ? (
//                       <button
//                         type="button"
//                         onClick={() => setShowUnfollowModal(true)}
//                         className="btn w-125 text-white"
//                         style={{ backgroundColor: "black" }}
//                         disabled={followLoading}
//                       >
//                         ✔ Following
//                       </button>
//                     ) : (
//                       <button
//                         type="button"
//                         onClick={handleFollow}
//                         className="btn w-125 text-white"
//                         style={{ backgroundColor: "black" }}
//                         disabled={followLoading}
//                       >
//                         + Follow
//                       </button>
//                     ))}
//                 </span>
//               </div>
//               <div className="mb-16 text-neutral-700 fw-medium text-md">
//                 {instructor.instructorProfile?.currentRole || "N/A"}
//               </div>
//               <div className="d-flex align-items-center gap-24 mb-32 flex-wrap">
//                 <div className="d-flex align-items-center gap-8">
//                   <span className="text-neutral-700 text-2xl d-flex">
//                     <i className="ph-bold ph-briefcase" />
//                   </span>
//                   <span className="text-neutral-700 text-md fw-medium">
//                     {instructor.instructorProfile?.currentlyWorkingAt || "N/A"}
//                   </span>
//                 </div>
//                 <span
//                   className="vr bg-neutral-200 mx-2"
//                   style={{ width: 2, height: 24, display: "inline-block" }}
//                 ></span>
//                 <div className="d-flex align-items-center gap-8">
//                   <span className="text-neutral-700 text-2xl d-flex">
//                     <i className="ph-bold ph-watch" />
//                   </span>
//                   <span className="text-neutral-700 text-md fw-medium">
//                     {instructor.instructorProfile?.experienceYears
//                       ? `${instructor.instructorProfile.experienceYears} Years`
//                       : "N/A"}
//                   </span>
//                 </div>
//                 <span
//                   className="vr bg-neutral-200 mx-2"
//                   style={{ width: 2, height: 24, display: "inline-block" }}
//                 ></span>
//                 {/* Followers */}
//                 <div className="d-flex align-items-center gap-8">
//                   <span className="text-neutral-700 text-2xl d-flex">
//                     <i className="ph-bold ph-users" />
//                   </span>
//                   <span className="text-neutral-700 text-md fw-medium">
//                     {followersCount} Followers
//                   </span>
//                 </div>
//                 {isOwnProfile && (
//                   <>
//                     <span
//                       className="vr bg-neutral-200 mx-2"
//                       style={{ width: 2, height: 24, display: "inline-block" }}
//                     ></span>
//                     <div className="d-flex align-items-center gap-8">
//                       <span className="text-neutral-700 text-2xl d-flex">
//                         <i className="ph-bold ph-user-plus" />
//                       </span>
//                       <span className="text-neutral-700 text-md fw-medium">
//                         {followingCount} Following
//                       </span>
//                     </div>
//                   </>
//                 )}
//                 <span
//                   className="vr bg-neutral-200 mx-2"
//                   style={{ width: 2, height: 24, display: "inline-block" }}
//                 ></span>
//                 <div className="d-flex align-items-center gap-4">
//                   <span className="text-2xl fw-medium text-warning-600 d-flex">
//                     <i className="ph-fill ph-star" />
//                   </span>
//                   <span className="text-md text-neutral-700 fw-semibold">
//                     {instructor.instructorProfile?.reviews &&
//                     instructor.instructorProfile.reviews.length > 0
//                       ? (
//                           instructor.instructorProfile.reviews.reduce(
//                             (acc, r) =>
//                               acc +
//                               (typeof r.rating === "number" ? r.rating : 0),
//                             0
//                           ) / instructor.instructorProfile.reviews.length
//                         ).toFixed(1)
//                       : 0}
//                     <span className="text-neutral-100 fw-normal">
//                       ({instructor.instructorProfile?.reviews?.length || "0"})
//                     </span>
//                   </span>
//                 </div>
//               </div>
//               <span className="d-block border border-neutral-30 my-40 border-dashed" />
//               <h4 className="mb-24">About</h4>
//               <p className="text-neutral-500">
//                 {instructor.bio ||
//                   "Offer brief biographies or profiles of each instructor. These may include details about their careers, achievements, and interests."}
//               </p>
//               <span className="d-block border border-neutral-30 my-40 border-dashed" />
//               <h4 className="mb-24">Instructed Domains</h4>
//               <div className="d-flex flex-wrap gap-8 mb-32">
//                 {instructor.instructorProfile?.instructedDomains?.length > 0 ? (
//                   instructor.instructorProfile.instructedDomains.map(
//                     (domain, idx) => (
//                       <span
//                         key={idx}
//                         className="badge bg-main-25 text-main-600 border border-main-600 fw-normal mb-4"
//                       >
//                         {domain}
//                       </span>
//                     )
//                   )
//                 ) : (
//                   <span className="text-neutral-400">N/A</span>
//                 )}
//               </div>
//               <span className="d-block border border-neutral-30 my-40 border-dashed" />
//               <h4 className="mb-24">Tech Stack</h4>
//               <div className="d-flex flex-wrap gap-8 mb-32">
//                 {instructor.instructorProfile?.techStack?.length > 0 ? (
//                   instructor.instructorProfile.techStack.map((tech, idx) => (
//                     <span
//                       key={idx}
//                       className="badge bg-success-100 text-success-700 border border-success-200 fw-normal mb-4"
//                     >
//                       {tech}
//                     </span>
//                   ))
//                 ) : (
//                   <span className="text-neutral-400">N/A</span>
//                 )}
//               </div>
//               <span className="d-block border border-neutral-30 my-40 border-dashed" />
//               <h4 className="mb-24">Awards</h4>
//               <div className="d-flex flex-wrap gap-8 mb-32">
//                 {instructor.instructorProfile?.awards?.length > 0 ? (
//                   instructor.instructorProfile.awards.map((award, idx) => (
//                     <span
//                       key={idx}
//                       className="badge bg-warning-100 text-warning-700 border border-warning-200 fw-normal mb-4"
//                     >
//                       {award}
//                     </span>
//                   ))
//                 ) : (
//                   <span className="text-neutral-400">N/A</span>
//                 )}
//               </div>
//               <span className="d-block border border-neutral-30 my-40 border-dashed" />
//             </div>
//           </div>
//         </div>
//         <div className="row mt-5">
//           <div className="col-12">
//             <span className="d-block border border-neutral-30 my-40 border-dashed" />
//             <h4 className="mb-24">Roadmaps Shared</h4>
//             <div className="row gy-4 mb-32">
//               {instructor.instructorProfile?.content?.roadmapsShared?.length >
//               0 ? (
//                 instructor.instructorProfile.content.roadmapsShared.map(
//                   (roadmap, idx) => (
//                     <div className="col-lg-4 col-md-6 col-12" key={idx}>
//                       <div className="course-item bg-info-100 rounded-16 p-24 h-100 box-shadow-md d-flex align-items-center gap-16">
//                         <span className="text-info-700 text-2xl d-flex">
//                           <i className="ph-bold ph-map-trifold" />
//                         </span>
//                         <span className="fw-semibold text-info-700 fs-5">
//                           {roadmap.title || "Untitled Roadmap"}
//                         </span>
//                       </div>
//                     </div>
//                   )
//                 )
//               ) : (
//                 <div className="col-12">
//                   <div className="course-item bg-light rounded-16 p-24 h-100 box-shadow-md d-flex align-items-center justify-content-center">
//                     <span className="fw-semibold text-secondary fs-5">
//                       No roadmaps shared by this instructor.
//                     </span>
//                   </div>
//                 </div>
//               )}
//             </div>
//             <span className="d-block border border-neutral-30 my-40 border-dashed" />
//             <h4 className="mb-24">Live Events Hosted</h4>
//             {showForm && editableEvent && (
//               <div className="mt-5 p-4 border rounded bg-light">
//                 <h5>Edit Event: {editableEvent.title}</h5>
//                 <form
//                   onSubmit={async (e) => {
//                     e.preventDefault();
//                     try {
//                       const res = await fetch(
//                         `http://localhost:5000/api/events/${editableEvent._id}`,
//                         {
//                           method: "PUT",
//                           headers: {
//                             "Content-Type": "application/json",
//                           },
//                           body: JSON.stringify(editableEvent),
//                         }
//                       );
//                       const data = await res.json();
//                       if (res.ok) {
//                         alert("Event updated successfully.");
//                         setShowForm(false);
//                         const instructorId = propInstructor?._id || id;
//                         fetchInstructorDetails(instructorId);
//                       } else {
//                         alert(data.message || "Update failed.");
//                       }
//                     } catch (err) {
//                       console.error("Update error:", err);
//                       alert("An error occurred during update.");
//                     }
//                   }}
//                 >
//                   <div className="mb-3">
//                     <label>Title</label>
//                     <input
//                       className="form-control"
//                       value={editableEvent.title || ""}
//                       onChange={(e) =>
//                         setEditableEvent({
//                           ...editableEvent,
//                           title: e.target.value,
//                         })
//                       }
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label>Start Time</label>
//                     <input
//                       type="datetime-local"
//                       className="form-control"
//                       value={
//                         editableEvent.schedule?.startTime
//                           ? toLocalDateTimeInputValue(
//                               editableEvent.schedule.startTime
//                             )
//                           : ""
//                       }
//                       onChange={(e) =>
//                         setEditableEvent({
//                           ...editableEvent,
//                           schedule: {
//                             ...editableEvent.schedule,
//                             startTime: new Date(e.target.value).toISOString(),
//                           },
//                         })
//                       }
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label>End Time</label>
//                     <input
//                       type="datetime-local"
//                       className="form-control"
//                       value={
//                         editableEvent.schedule?.endTime
//                           ? toLocalDateTimeInputValue(
//                               editableEvent.schedule.endTime
//                             )
//                           : ""
//                       }
//                       onChange={(e) =>
//                         setEditableEvent({
//                           ...editableEvent,
//                           schedule: {
//                             ...editableEvent.schedule,
//                             endTime: new Date(e.target.value).toISOString(),
//                           },
//                         })
//                       }
//                     />
//                   </div>

//                   <button type="submit" className="btn btn-primary">
//                     Save Changes
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-secondary ms-3"
//                     onClick={() => setShowForm(false)}
//                   >
//                     Cancel
//                   </button>
//                 </form>
//               </div>
//             )}

//             <div className="row gy-4">
//               {instructor.instructorProfile?.content?.liveEventsHosted?.length >
//               0 ? (
//                 instructor.instructorProfile.content.liveEventsHosted.map(
//                   (event, idx) => (
//                     <div className="col-lg-6 col-md-12 col-12" key={idx}>
//                       <div className="position-relative">
//                         <button
//                           className="btn btn-light p-2 rounded-circle"
//                           style={{
//                             border: "none",
//                             cursor: "pointer",
//                             position: "absolute",
//                             top: 8,
//                             right: 8,
//                             zIndex: 1050, // Ensure the button stays above other elements
//                           }}
//                           onClick={() =>
//                             setShowOptions((prev) =>
//                               prev === idx ? null : idx
//                             )
//                           }
//                         >
//                           <i
//                             className="ph-bold ph-dots-three-vertical"
//                             style={{ color: "black", fontSize: "24px" }} // Adjust the font size as needed
//                           />
//                         </button>
//                         {showOptions === idx && (
//                           <div
//                             ref={dropdownRef}
//                             className="position-absolute bg-white border rounded-12 shadow-sm"
//                             style={{
//                               top: "40px",
//                               right: 0,
//                               zIndex: 1000,
//                               minWidth: 150,
//                               padding: "8px 8px",
//                               boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                             }}
//                           >
//                             <button
//                               className="dropdown-item text-start px-3 py-2"
//                               style={{
//                                 fontSize: "18px",
//                                 color: "#333",
//                                 backgroundColor: "transparent",
//                                 border: "none",
//                                 cursor: "pointer",
//                                 transition: "background-color 0.2s ease",
//                               }}
//                               onClick={() => handleUpdate(event._id)} // Pass event ID to update handler
//                               onMouseEnter={(e) =>
//                                 (e.target.style.backgroundColor = "#F3F9FF")
//                               }
//                               onMouseLeave={(e) =>
//                                 (e.target.style.backgroundColor = "transparent")
//                               }
//                             >
//                               Update
//                             </button>
//                             <button
//                               className="dropdown-item text-start px-3 py-2 text-danger"
//                               style={{
//                                 fontSize: "18px",
//                                 color: "#dc3545",
//                                 backgroundColor: "transparent",
//                                 border: "none",
//                                 cursor: "pointer",
//                                 transition: "background-color 0.2s ease",
//                               }}
//                               onClick={() => {
//                                 const confirmDelete = window.confirm(
//                                   "Are you sure you want to delete this event?"
//                                 );
//                                 if (confirmDelete) {
//                                   handleDelete(event._id);
//                                 }
//                               }} // Pass event ID to delete handler
//                               onMouseEnter={(e) =>
//                                 (e.target.style.backgroundColor = "#F3F9FF")
//                               }
//                               onMouseLeave={(e) =>
//                                 (e.target.style.backgroundColor = "transparent")
//                               }
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                       <div className="course-item bg-white rounded-16 p-12 h-100 box-shadow-md d-flex flex-column flex-md-row align-items-md-center gap-24">
//                         <div
//                           className="course-item__thumb rounded-12 overflow-hidden position-relative mb-3 mb-md-0"
//                           style={{ minWidth: 220, maxWidth: 320 }}
//                         >
//                           {event.schedule.image ? (
//                             <img
//                               src={event.schedule.image}
//                               alt={event.title || "Event"}
//                               className="course-item__img rounded-12 cover-img transition-2 w-100"
//                               style={{ height: 180, objectFit: "cover" }}
//                             />
//                           ) : (
//                             <div
//                               className="bg-main-25 rounded-12 d-flex align-items-center justify-content-center"
//                               style={{ height: 180 }}
//                             >
//                               <i className="ph-bold ph-calendar text-4xl text-main-600" />
//                             </div>
//                           )}
//                         </div>
//                         <div className="course-item__content flex-grow-1">
//                           <h5 className="mb-5">
//                             {event.title || "Untitled Event"}
//                           </h5>
//                           <div className="mb-2 text-neutral-700">
//                             <div className="mb-5">
//                               <strong>🕒 Start:</strong>{" "}
//                               {new Date(
//                                 event.schedule.startTime
//                               ).toLocaleString("en-IN", {
//                                 dateStyle: "short",
//                                 timeStyle: "short",
//                               }) || "No start time available."}
//                             </div>
//                             <div>
//                               <strong>🕓 End:</strong>{" "}
//                               {new Date(event.schedule.endTime).toLocaleString(
//                                 "en-IN",
//                                 {
//                                   dateStyle: "short",
//                                   timeStyle: "short",
//                                 }
//                               ) || "No end time available."}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )
//                 )
//               ) : (
//                 <div className="col-12">
//                   <div className="course-item bg-light rounded-16 p-24 h-100 box-shadow-md d-flex align-items-center justify-content-center">
//                     <span className="fw-semibold text-secondary fs-5">
//                       No live events hosted by this instructor.
//                     </span>
//                   </div>
//                 </div>
//               )}
//             </div>
//             <span className="d-block border border-neutral-30 my-40 border-dashed" />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default InstructorDetails;
