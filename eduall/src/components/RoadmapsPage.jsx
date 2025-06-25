import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaBookmark,
  FaShare,
  FaEye,
  FaClock,
  FaCompass,
  FaFire,
} from "react-icons/fa";
import axios from "axios";

const RoadmapsPage = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    domain: "",
    difficulty: "",
    techstack: "",
  });
  const [sortBy, setSortBy] = useState("newest");

  // Available filter options
  const domains = [
    "Programming",
    "Web Design & Development",
    "Academic Skills",
    "Marketing",
    "Design (General)",
    "Technology",
    "Fashion Design",
    "Agriculture",
    "Biology & Life Sciences",
    "Data Science & Analytics",
    "Business & Entrepreneurship",
    "Mobile App Development",
    "Artificial Intelligence",
    "Cybersecurity",
  ];

  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        fetchRoadmaps();
      },
      filters.search ? 500 : 0
    );

    return () => clearTimeout(timeoutId);
  }, [filters, sortBy]);

  const fetchRoadmaps = async () => {
    try {
      setLoading(true);
      setError("");

      console.log("🔍 Fetching roadmaps with filters:", filters);

      // ✅ Check if any filters are applied
      const hasFilters =
        filters.search.trim() ||
        filters.domain.trim() ||
        filters.difficulty.trim() ||
        filters.techstack.trim();

      let url = "http://localhost:5000/api/roadmaps";

      if (hasFilters) {
        // ✅ Build query parameters
        const queryParams = new URLSearchParams();

        if (filters.search.trim()) {
          queryParams.append("search", filters.search.trim());
        }
        if (filters.domain.trim()) {
          queryParams.append("domain", filters.domain.trim());
        }
        if (filters.difficulty.trim()) {
          queryParams.append("difficulty", filters.difficulty.trim());
        }
        if (filters.techstack.trim()) {
          queryParams.append("techstack", filters.techstack.trim());
        }

        url = `http://localhost:5000/api/roadmaps/search?${queryParams.toString()}`;
      }

      console.log("🌐 Fetching from URL:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("📡 Response status:", response.status);

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // If JSON parsing fails, use the basic error message
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("✅ Received data:", data.length, "roadmaps");

      // ✅ Ensure data is an array
      const roadmapsArray = Array.isArray(data) ? data : [];

      // ✅ Sort roadmaps
      let sortedData = [...roadmapsArray];
      if (sortBy === "newest") {
        sortedData.sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
      } else if (sortBy === "oldest") {
        sortedData.sort(
          (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
        );
      } else if (sortBy === "difficulty") {
        const difficultyOrder = { Beginner: 1, Intermediate: 2, Advanced: 3 };
        sortedData.sort(
          (a, b) =>
            (difficultyOrder[a.difficulty] || 0) -
            (difficultyOrder[b.difficulty] || 0)
        );
      }

      setRoadmaps(sortedData);
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setError(err.message);
      setRoadmaps([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    console.log(`🎛️ Filter changed: ${key} = ${value}`);
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    console.log("🗑️ Clearing all filters");
    setFilters({ search: "", domain: "", difficulty: "", techstack: "" });
    setError("");
  };

  const handleLike = (roadmapId) => {
    console.log("❤️ Liked roadmap:", roadmapId);
  };

  // const handleBookmark = (roadmapId) => {
  //   console.log("🔖 Bookmarked roadmap:", roadmapId);
  // };

  const handleBookmark = async (roadmap) => {
    const userId = localStorage.getItem("userEmail");
    console.log("🧪 Retrieved userId from localStorage:", userId);

    if (!userId) {
      alert("Please login to bookmark this roadmap.");
      return;
    }

    const payload = {
      userId,
      roadmap: {
        _id: roadmap._id,
        title: roadmap.title,
        description: roadmap.description,
        thumbnail: roadmap.thumbnail,
      },
    };

    console.log("📦 Payload being sent:", payload);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/wishlist/add",
        payload
      );
      if (response.status === 200) {
        console.log("✅ Added to wishlist:", response.data);
        alert("Roadmap added to wishlist!");
      }
    } catch (error) {
      console.error("❌ Error adding to wishlist:", error);
      alert("Failed to bookmark. Try again.");
    }
  };

  const handleShare = (roadmap) => {
    const shareUrl = `${window.location.origin}/roadmap/${roadmap._id}`;
    if (navigator.share) {
      navigator.share({
        title: roadmap.title,
        text: roadmap.description,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <section className="py-120">
        <div className="container">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "400px" }}
          >
            <div className="text-center">
              <div className="spinner-border text-primary mb-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-neutral-500">Loading amazing roadmaps...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-120">
        <div className="container">
          <div className="alert alert-danger text-center">
            <h4>⚠️ Error Loading Roadmaps</h4>
            <p className="mb-3">{error}</p>
            <div className="d-flex gap-2 justify-content-center mb-3">
              <button className="btn btn-primary" onClick={fetchRoadmaps}>
                🔄 Try Again
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={clearFilters}
              >
                🗑️ Clear Filters
              </button>
            </div>
            <small className="text-muted d-block">
              <strong>Debug Info:</strong>
              <br />
              • Check if backend server is running on port 5000
              <br />• Current filters: {JSON.stringify(filters)}
              <br />• Try clearing filters and reload the page
            </small>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-120 bg-neutral-0">
      <div className="container">
        {/* Page Header */}
        <div className="text-center mb-64">
          <h2 className="mb-24">🗺️ Explore Learning Roadmaps</h2>
          <p className="text-neutral-500 fs-5">
            Discover structured learning paths crafted by industry experts
          </p>
        </div>

        {/* Filters & Search */}
        <div className="row mb-40">
          <div className="col-12">
            <div className="bg-white rounded-16 p-32 box-shadow-md">
              <div className="row g-3">
                {/* Search */}
                <div className="col-lg-3 col-md-6">
                  <input
                    type="text"
                    className="form-control bg-neutral-25 border-0"
                    placeholder="🔍 Search roadmaps..."
                    value={filters.search}
                    onChange={(e) =>
                      handleFilterChange("search", e.target.value)
                    }
                  />
                </div>

                {/* Domain Filter */}
                <div className="col-lg-3 col-md-6">
                  <select
                    className="form-select bg-neutral-25 border-0"
                    value={filters.domain}
                    onChange={(e) =>
                      handleFilterChange("domain", e.target.value)
                    }
                  >
                    <option value="">🌐 All Domains</option>
                    {domains.map((domain) => (
                      <option key={domain} value={domain}>
                        {domain}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div className="col-lg-2 col-md-6">
                  <select
                    className="form-select bg-neutral-25 border-0"
                    value={filters.difficulty}
                    onChange={(e) =>
                      handleFilterChange("difficulty", e.target.value)
                    }
                  >
                    <option value="">📊 All Levels</option>
                    {difficulties.map((diff) => (
                      <option key={diff} value={diff}>
                        {diff}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <div className="col-lg-2 col-md-6">
                  <select
                    className="form-select bg-neutral-25 border-0"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="newest">🆕 Newest First</option>
                    <option value="oldest">⏰ Oldest First</option>
                    <option value="difficulty">📈 By Difficulty</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <div className="col-lg-2 col-md-6">
                  <button
                    className="btn btn-outline-secondary w-100"
                    onClick={clearFilters}
                  >
                    🗑️ Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="d-flex justify-content-between align-items-center mb-32">
          <span className="text-neutral-500">
            📚 Showing <strong>{roadmaps.length}</strong> roadmap
            {roadmaps.length !== 1 ? "s" : ""}
          </span>
          {(filters.search || filters.domain || filters.difficulty) && (
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={clearFilters}
            >
              Clear All Filters
            </button>
          )}
        </div>

        {/* Roadmaps Grid */}
        {roadmaps.length === 0 ? (
          <div className="text-center py-80">
            <div className="mb-32">
              <i
                className="ph-light ph-map-trifold"
                style={{ fontSize: "4rem", color: "#ccc" }}
              ></i>
            </div>
            <h4 className="text-neutral-500 mb-16">No roadmaps found</h4>
            <p className="text-neutral-400 mb-16">
              {filters.search || filters.domain || filters.difficulty
                ? "Try adjusting your filters or search terms"
                : "No roadmaps available at the moment"}
            </p>
            {(filters.search || filters.domain || filters.difficulty) && (
              <button className="btn btn-primary" onClick={clearFilters}>
                Show All Roadmaps
              </button>
            )}
          </div>
        ) : (
          <div className="row g-4">
            {roadmaps.map((roadmap) => (
              <div key={roadmap._id} className="col-xl-4 col-lg-6 col-md-6">
                <div className="roadmap-card bg-white rounded-16 overflow-hidden box-shadow-md position-relative">
                  {/* Thumbnail */}
                  <div className="roadmap-card__thumb position-relative">
                    <img
                      src={
                        roadmap.thumbnail ||
                        "/assets/images/thumbs/raodmapsDefault.jpg  "
                      }
                      alt={roadmap.title}
                      className="w-100"
                      style={{ height: "200px", objectFit: "cover" }}
                      onError={(e) => {
                        e.target.src =
                          "/assets/images/thumbs/raodmapsDefault.jpg  ";
                      }}
                    />

                    {/* Difficulty Badge */}
                    <span
                      className={`position-absolute top-3 end-3 badge fw-medium text-white px-3 py-2 ${
                        roadmap.difficulty === "Beginner"
                          ? "bg-success"
                          : roadmap.difficulty === "Intermediate"
                          ? "bg-warning"
                          : "bg-danger"
                      }`}
                    >
                      {roadmap.difficulty}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-24">
                    {/* Title */}
                    <h5 className="mb-16 line-break-title">
                      <Link
                        to={`/roadmap/${roadmap._id}`}
                        className="text-decoration-none text-dark hover-text-primary transition-1"
                      >
                        {roadmap.title.length > 25
                          ? `${roadmap.title.substring(0, 20)}...`
                          : roadmap.title}
                      </Link>
                    </h5>

                    {/* Description */}
                    <p
                      className="text-neutral-500 text-sm mb-20"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {roadmap.description}
                    </p>

                    {/* Meta Information */}
                    <div className="roadmap-meta mb-20">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <FaCompass className="text-info" size={14} />
                        <span className="text-sm text-neutral-600">
                          {roadmap.domain}
                        </span>
                      </div>

                      <div className="d-flex align-items-center gap-2 mb-2">
                        <FaClock className="text-warning" size={14} />
                        <span className="text-sm text-neutral-600">
                          {roadmap.duration} weeks
                        </span>
                      </div>

                      <div className="d-flex align-items-center gap-2">
                        <FaFire className="text-danger" size={14} />
                        <span className="text-sm text-neutral-600">
                          {roadmap.steps?.length || 0} steps
                        </span>
                      </div>
                    </div>
                    <div className="position-absolute top-50 translate-middle-y end-0 d-flex gap-2">
                      <button
                        className="btn btn-sm btn-light rounded-circle p-2 opacity-75 hover-opacity-100"
                        onClick={() => handleLike(roadmap._id)}
                        title="Like"
                      >
                        <FaHeart className="text-danger" size={20} />
                      </button>

                      <button
                        className="btn btn-sm btn-light rounded-circle p-2 opacity-75 hover-opacity-100"
                        onClick={() => handleBookmark(roadmap)}
                        title="Bookmark"
                      >
                        <FaBookmark className="text-primary" size={20} />
                      </button>

                      <button
                        className="btn btn-sm btn-light rounded-circle p-2 opacity-75 hover-opacity-100"
                        onClick={() => handleShare(roadmap)}
                        title="Share"
                      >
                        <FaShare className="text-success" size={20} />
                      </button>
                    </div>

                    {/* Tech Stack Tags */}
                    {roadmap.techstack && roadmap.techstack.length > 0 && (
                      <div className="mb-20">
                        <div className="d-flex flex-wrap gap-1">
                          {roadmap.techstack.slice(0, 3).map((tech, idx) => (
                            <span
                              key={idx}
                              className="badge bg-light text-dark px-2 py-1"
                              style={{ fontSize: "10px" }}
                            >
                              {tech}
                            </span>
                          ))}
                          {roadmap.techstack.length > 3 && (
                            <span
                              className="badge bg-primary text-white px-2 py-1"
                              style={{ fontSize: "10px" }}
                            >
                              +{roadmap.techstack.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Instructor Info */}
                    <div className="border-top pt-20">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={
                              roadmap.createdBy?.profilePicture ||
                              "/assets/images/users/user-img1.png"
                            }
                            alt={roadmap.createdBy?.name || "Instructor"}
                            className="rounded-circle"
                            style={{
                              width: "32px",
                              height: "32px",
                              objectFit: "cover",
                            }}
                            onError={(e) => {
                              e.target.src =
                                "/assets/images/users/user-img1.png";
                            }}
                          />
                          <div>
                            <p className="mb-0 text-sm fw-medium text-neutral-700">
                              {roadmap.createdBy?.name || "Anonymous"}
                            </p>
                            {roadmap.createdBy?.instructorProfile
                              ?.experienceYears && (
                              <p
                                className="mb-0"
                                style={{ fontSize: "11px", color: "#666" }}
                              >
                                {
                                  roadmap.createdBy.instructorProfile
                                    .experienceYears
                                }{" "}
                                years exp.
                              </p>
                            )}
                          </div>
                        </div>

                        <Link
                          to={`/roadmap/${roadmap._id}`}
                          className="btn btn-primary btn-sm px-3 py-2"
                        >
                          <FaEye size={18} className="me-1" />
                          &nbsp; View
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .roadmap-card {
          transition: all 0.3s ease;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .roadmap-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }

        .hover-text-primary:hover {
          color: var(--bs-primary) !important;
        }

        .opacity-75 {
          opacity: 0.75;
        }

        .hover-opacity-100:hover {
          opacity: 1 !important;
        }
        .line-break-title {
          word-wrap: break-word; /* Break long words */
          word-break: break-word; /* Ensure words break at the end of a line */
          overflow-wrap: break-word; /* Break long words as needed */
          display: block; /* Ensure the text spans the width and wraps */
          white-space: normal; /* Allow text to wrap */
        }
      `}</style>
    </section>
  );
};

export default RoadmapsPage;
