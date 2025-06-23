// pages/WishlistPage.jsx
import React, { useEffect, useState } from "react";
import WishlistOne from "../components/WishlistOne";
import axios from "axios";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const email = localStorage.getItem("userEmail");
      if (!email) return;

      try {
        const res = await axios.post("http://localhost:5000/api/wishlist/get", {
          userId: email,
        });

        if (res.status === 200) {
          setWishlist(res.data.wishlist);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemove = async (roadmapId) => {
    const email = localStorage.getItem("userEmail");
    if (!email) return;

    try {
      await axios.post("http://localhost:5000/api/wishlist/remove", {
        userId: email,
        roadmapId,
      });
      setWishlist((prev) => prev.filter((r) => r._id !== roadmapId));
    } catch (error) {
      console.error("Remove error:", error);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">📌 My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No roadmaps in wishlist.</p>
      ) : (
        <div className="row g-4">
          {wishlist.map((roadmap) => (
            <div key={roadmap._id} className="col-lg-4 col-md-6">
              <WishlistOne roadmap={roadmap} onRemove={handleRemove} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
