import React, { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import FooterOne from "../components/FooterOne";
import HeaderOne from "../components/HeaderOne";
import Animation from "../helper/Animation";
import Preloader from "../helper/Preloader";
import axios from "axios";

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
        const res = await axios.post(
          "https://inspirehub-backend-itne.onrender.com/api/wishlist/get",
          {
            userId,
          }
        );

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
      await axios.post(
        "https://inspirehub-backend-itne.onrender.com/api/wishlist/remove",
        {
          userId,
          roadmapId,
        }
      );
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

      <div className="container py-5">
        {wishlist.length === 0 ? (
          <p>No roadmaps in wishlist.</p>
        ) : (
          <div className="row g-4">
            {wishlist.map((roadmap) => (
              <div key={roadmap._id} className="col-lg-4 col-md-6">
                <div className="wishlist-card bg-white rounded-16 overflow-hidden box-shadow-md position-relative h-100 d-flex flex-column">
                  <img
                    src={roadmap.thumbnail}
                    alt={roadmap.title}
                    className="w-100"
                    style={{ height: "200px", objectFit: "cover" }}
                  />

                  <div className="p-3 d-flex flex-column flex-grow-1">
                    <h5 className="mb-2 line-break-title">{roadmap.title}</h5>
                    <p className="text-muted flex-grow-1">{roadmap.description}</p>

                    <div className="d-flex justify-content-end gap-3 mt-3">
                      <Link
                        to={`/roadmap/${roadmap._id}`}
                        className="btn btn-primary btn-icon"
                        title="View"
                      >
                        <FaEye />
                      </Link>
                      <button
                        className="btn btn-danger btn-icon"
                        onClick={() => handleRemove(roadmap._id)}
                        title="Remove"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <FooterOne />

      {/* Custom Styles */}
      <style jsx>{`
        .wishlist-card {
          transition: all 0.3s ease;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .wishlist-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }

        .btn-icon {
          width: 38px;
          height: 38px;
          padding: 0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          transition: transform 0.2s ease-in-out;
        }

        .btn-icon:hover {
          transform: scale(1.1);
        }

        .line-break-title {
          word-break: break-word;
          white-space: normal;
        }

        .text-muted {
          font-size: 14px;
        }
      `}</style>
    </>
  );
};

export default WishlistPage;
