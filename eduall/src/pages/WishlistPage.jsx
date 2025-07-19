import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import FooterOne from "../components/FooterOne";
import HeaderOne from "../components/HeaderOne";
import Animation from "../helper/Animation";
import Preloader from "../helper/Preloader";
import axios from "axios";
import FooterTwo from "../components/FooterTwo";
import {
  FaEye,
  FaTrash,
  FaRegBookmark,
  FaClock,
  FaLevelUpAlt,
} from "react-icons/fa";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const userId = localStorage.getItem("userEmail");
      if (!userId) {
        alert("Please login to view wishlist");
        return;
      }

      try {
        const res = await axios.post("http://localhost:5000/api/wishlist/get", {
          userId,
        });

        if (res.data.wishlist) {
          setWishlist(res.data.wishlist);
        } else {
          setWishlist([]);
        }
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemove = async (roadmapId) => {
    const userId = localStorage.getItem("userEmail");
    if (!userId) return;

    try {
      await axios.post("http://localhost:5000/api/wishlist/remove", {
        userId,
        roadmapId,
      });
      setWishlist((prev) => prev.filter((r) => r._id !== roadmapId));
    } catch (error) {
      console.error("Remove error:", error);
    }
  };

  return (
    <>
      <Preloader />
      <Animation />
      <HeaderOne />
      <Breadcrumb title="My Wishlist" />

      <div className="wishlist-container">
        {wishlist.length === 0 ? (
          <div className="empty-wishlist text-center py-5">
            <div className="empty-icon mb-4">
              <FaRegBookmark className="text-muted" size={48} />
            </div>
            <h3 className="empty-title mb-2">Your Wishlist is Empty</h3>
            <p className="empty-text text-muted mb-4">
              Save your favorite roadmaps to view them here
            </p>
            <Link to="/roadmaps" className="btn btn-primary btn-lg px-4">
              Explore Roadmaps
            </Link>
          </div>
        ) : (
          <div className="wishlist-grid py-5">
            <div className="row g-4">
              {wishlist.map((roadmap) => (
                <div key={roadmap._id} className="col-lg-4 col-md-6">
                  <div className="wishlist-card">
                    <div className="card-image-container">
                      <img
                        src={roadmap.thumbnail || "/images/default-roadmap.jpg"}
                        alt={roadmap.title}
                        className="card-image"
                        onError={(e) => {
                          e.target.src = "/images/default-roadmap.jpg";
                        }}
                      />
                      <span className="card-badge">Saved</span>
                    </div>

                    <div className="card-content">
                      <h3 className="card-title">{roadmap.title}</h3>
                      <p className="card-description">
                        {roadmap.description || "No description available"}
                      </p>

                      <div className="card-footer">
                        <div className="card-meta">
                          <span className="meta-item">
                            <FaClock className="me-1" /> 2 weeks
                          </span>
                          <span className="meta-item">
                            <FaLevelUpAlt className="me-1" /> Intermediate
                          </span>
                        </div>

                        <div className="card-actions">
                          <Link
                            to={`/roadmap/${roadmap._id}`}
                            className="btn-action btn-view"
                            title="View Details"
                          >
                            <FaEye />
                            <span className="action-tooltip">View</span>
                          </Link>
                          <button
                            className="btn-action btn-remove"
                            onClick={() => handleRemove(roadmap._id)}
                            title="Remove from Wishlist"
                          >
                            <FaTrash />
                            <span className="action-tooltip">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <FooterTwo />

      {/* Custom Styles */}
      <style jsx>{`
        .wishlist-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .empty-wishlist {
          padding: 4rem 2rem;
          background: #f8f9fa;
          border-radius: 16px;
          max-width: 500px;
          margin: 2rem auto;
        }

        .empty-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #343a40;
        }

        .wishlist-grid {
          padding: 0 20px;
        }

        .wishlist-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          display: flex;
          flex-direction: column;
          height: 100%;
          position: relative;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .wishlist-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }

        .card-image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .wishlist-card:hover .card-image {
          transform: scale(1.05);
        }

        .card-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: #4e44ce;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 600;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .card-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: #212529;
          line-height: 1.4;
          word-break: break-word;
        }

        .card-description {
          color: #6c757d;
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 1.5rem;
          flex-grow: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
        }

        .card-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.8rem;
          color: #6c757d;
        }

        .meta-item {
          display: flex;
          align-items: center;
        }

        .card-actions {
          display: flex;
          gap: 0.5rem;
        }

        .btn-action {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          color: white;
        }

        .btn-view {
          background: #4e44ce;
        }

        .btn-remove {
          background: #ff4757;
        }

        .btn-action:hover {
          transform: scale(1.1);
        }

        .action-tooltip {
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.7rem;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .btn-action:hover .action-tooltip {
          opacity: 1;
          visibility: visible;
          top: -38px;
        }

        @media (max-width: 768px) {
          .wishlist-grid .col-md-6 {
            max-width: 100%;
            flex: 0 0 100%;
          }

          .card-meta {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default WishlistPage;
