import React, { useState, useEffect } from "react";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import axios from "axios";

const CourseGridView = () => {
  const [postList, setPostList] = useState([]);

  // Fetch posts from backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/posts`
        );
        setPostList(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleLike = async (id) => {
    try {
      const post = postList.find((p) => p._id === id);
      const updatedPost = {
        ...post,
        likes: post.isLiked ? post.likes - 1 : post.likes + 1,
        isLiked: !post.isLiked,
      };

      // Update backend
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/posts/${id}`, {
        likes: updatedPost.likes,
      });

      // Update local state
      setPostList((prevPosts) =>
        prevPosts.map((p) => (p._id === id ? updatedPost : p))
      );
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleFollow = (id) => {
    alert(`You are now following the user with ID: ${id}`);
  };

  return (
    <section className="course-grid-view py-120">
      <div className="container">
        <div className="row gy-4">
          {postList.map((post) => (
            <div className="w-100 mb-4" key={post._id}>
              <div
                className="post-card rounded-16 p-12 shadow-md border border-neutral-30"
                style={{
                  backgroundColor: "#F3F9FF",
                  width: "900px",
                  margin: "0 auto",
                  padding: "24px",
                }}
              >
                {/* Instructor Information */}
                <div className="flex-between mb-16">
                  <div className="flex-align gap-12">
                    <img
                      src={post.profilePicture}
                      alt="Instructor"
                      className="w-48 h-48 object-fit-cover rounded-circle"
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                      }}
                    />
                    <div>
                      <h5
                        className="text-md font-semibold"
                        style={{
                          fontWeight: "bold",
                          marginBottom: "4px",
                        }}
                      >
                        {post.name}
                      </h5>
                      <p
                        className="text-sm text-neutral-600"
                        style={{
                          fontWeight: "normal",
                          color: "#888888",
                        }}
                      >
                        {post.role}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleFollow(post._id)}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#0661B7", // Updated color
                      color: "#fff",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    Follow
                  </button>
                </div>

                {/* Post Content */}
                <div className="post-content mb-16">
                  <img
                    src={post.profilePicture || "default-image.jpg"}
                    alt="Post Thumbnail"
                    className="w-full rounded-12 mb-12"
                    style={{
                      borderRadius: "12px",
                      marginBottom: "16px",
                      width: "100%",
                      height: "auto", // Dynamic height
                      maxHeight: "400px", // Optional
                      objectFit: "cover",
                    }}
                  />
                  <h4
                    className="text-lg font-semibold mb-8"
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      marginBottom: "12px",
                    }}
                  >
                    {post.title}
                  </h4>
                  <p
                    className="text-sm text-neutral-700"
                    style={{
                      fontSize: "14px",
                      color: "#555",
                      lineHeight: "1.6",
                    }}
                  >
                    {post.description}
                  </p>
                </div>

                {/* Post Footer */}
                <div className="post-footer flex-between mt-12">
                  <div>
                    <button
                      type="button"
                      className="flex-align gap-4 text-main-600 text-lg"
                      onClick={() => handleLike(post._id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        color: post.isLiked ? "#007BFF" : "#888",
                        fontSize: "16px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {post.isLiked ? (
                        <LikeFilled style={{ fontSize: "20px" }} />
                      ) : (
                        <LikeOutlined style={{ fontSize: "20px" }} />
                      )}
                      {post.likes} Likes
                    </button>
                  </div>
                  <div>
                    <p
                      className="text-sm text-neutral-500"
                      style={{
                        fontSize: "12px",
                        color: "#777",
                      }}
                    >
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseGridView;




