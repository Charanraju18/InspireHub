// import React, { useState, useEffect } from "react";
// import {
//   LikeOutlined,
//   LikeFilled,
//   CommentOutlined,
// } from "@ant-design/icons";
// import { FaShareAlt } from "react-icons/fa"; // FontAwesome Share Icon
// import axios from "axios";

// const CourseListView = () => {
//   const [postList, setPostList] = useState([]);

//   // Fetch posts from the backend
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/posts");
//         const postsWithLikes = response.data.map((post) => ({
//           ...post,
//           isLiked: false, // Default state
//         }));
//         setPostList(postsWithLikes);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };
//     fetchPosts();
//   }, []);

//   const handleLike = async (id) => {
//     try {
//       const post = postList.find((p) => p._id === id);

//       if (!post) return;

//       const updatedPost = {
//         ...post,
//         isLiked: !post.isLiked,
//         likes: post.isLiked ? post.likes - 1 : post.likes + 1,
//       };

//       // Optimistically update the frontend state
//       setPostList((prevPosts) =>
//         prevPosts.map((p) => (p._id === id ? updatedPost : p))
//       );

//       // Update the backend
//       await axios.put(`http://localhost:5000/api/posts/${id}`, {
//         likes: updatedPost.likes,
//       });
//     } catch (error) {
//       console.error("Error updating likes:", error);

//       // Revert state if the API call fails
//       setPostList((prevPosts) =>
//         prevPosts.map((p) =>
//           p._id === id
//             ? { ...p, isLiked: !p.isLiked, likes: p.likes + (p.isLiked ? -1 : 1) }
//             : p
//         )
//       );
//     }
//   };

//   const handleShare = (post) => {
//     if (navigator.share) {
//       navigator
//         .share({
//           title: post.title,
//           text: post.description,
//           url: window.location.href, // Replace with the actual URL of your post
//         })
//         .then(() => console.log("Content shared successfully"))
//         .catch((error) => console.error("Error sharing content:", error));
//     } else {
//       alert("Sharing is not supported in your browser.");
//     }
//   };

//   const handleFollow = (id) => {
//     alert(`You are now following the user with ID: ${id}`);
//   };

//   return (
//     <section className="course-grid-view py-120">
//       <div
//         className="container"
//         style={{
//           backgroundColor: "#F9F9F9", // Container background
//           padding: "20px",
//           borderRadius: "16px",
//           maxWidth: "1200px",
//           margin: "0 auto",
//         }}
//       >
//         <div className="row gy-4">
//           {postList.map((post) => (
//             <div className="w-100 mb-4" key={post._id}>
//               <div
//                 className="post-card rounded-16 p-12 shadow-md"
//                 style={{
//                   backgroundColor: "#F9F9F9",
//                   width: "900px",
//                   margin: "20px auto",
//                   padding: "24px",
//                   // border: "2px solid black",
//                   borderRadius: "16px",
//                   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                   transition: "transform 0.3s, box-shadow 0.3s",
//                   cursor: "pointer",
//                 }}
//               >
//                 {/* Instructor Information */}
//                 <div className="flex-between mb-16">
//                   <div className="flex-align gap-12">
//                     <img
//                       src={post.profilePicture || "default-image.jpg"}
//                       alt="Instructor"
//                       style={{
//                         width: "48px",
//                         height: "48px",
//                         borderRadius: "50%",
//                       }}
//                     />
//                     <div>
//                       <h5
//                         style={{
//                           fontWeight: "bold",
//                           marginBottom: "4px",
//                         }}
//                       >
//                         {post.name}
//                       </h5>
//                       <p
//                         style={{
//                           fontWeight: "normal",
//                           color: "#888888",
//                         }}
//                       >
//                         {post.role}
//                       </p>
//                     </div>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => handleFollow(post._id)}
//                     style={{
//                       padding: "8px 16px",
//                       backgroundColor: "#0661B7",
//                       color: "#fff",
//                       borderRadius: "8px",
//                       border: "none",
//                       cursor: "pointer",
//                       fontSize: "14px",
//                       fontWeight: "bold",
//                       transition: "background-color 0.3s",
//                     }}
//                     onMouseEnter={(e) =>
//                       (e.target.style.backgroundColor = "#004A93")
//                     }
//                     onMouseLeave={(e) =>
//                       (e.target.style.backgroundColor = "#0661B7")
//                     }
//                   >
//                     Follow
//                   </button>
//                 </div>

//                 {/* Post Content */}
//                 <div className="post-content mb-16">
//                   <img
//                     src={post.profilePicture || "default-image.jpg"}
//                     alt="Post Thumbnail"
//                     style={{
//                       borderRadius: "12px",
//                       marginBottom: "16px",
//                       width: "100%",
//                       height: "auto",
//                       maxHeight: "400px",
//                       objectFit: "cover",
//                     }}
//                   />
//                   <h4
//                     style={{
//                       fontSize: "18px",
//                       fontWeight: "bold",
//                       marginBottom: "12px",
//                     }}
//                   >
//                     {post.title}
//                   </h4>
//                   <p
//                     style={{
//                       fontSize: "14px",
//                       color: "#555",
//                       lineHeight: "1.6",
//                     }}
//                   >
//                     {post.description}
//                   </p>
//                 </div>

//                 {/* Post Footer */}
//                 <div className="post-footer flex-between mt-12">
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "16px",
//                     }}
//                   >
//                     {/* Like Button */}
//                     <button
//                       type="button"
//                       onClick={() => handleLike(post._id)}
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "8px",
//                         background: "none",
//                         border: "none",
//                         cursor: "pointer",
//                         color: post.isLiked ? "#007BFF" : "#888",
//                         transition: "color 0.3s",
//                       }}
//                       onMouseEnter={(e) => (e.target.style.color = "#007BFF")}
//                       onMouseLeave={(e) =>
//                         (e.target.style.color = post.isLiked ? "#007BFF" : "#888")
//                       }
//                     >
//                       {post.isLiked ? (
//                         <LikeFilled style={{ fontSize: "25px" }} />
//                       ) : (
//                         <LikeOutlined style={{ fontSize: "25px" }} />
//                       )}
//                       <span>{post.likes}</span>
//                     </button>

//                     {/* Comment and Share Icons */}
//                     <CommentOutlined
//                       style={{
//                         fontSize: "25px",
//                         cursor: "pointer",
//                         color: "#888",
//                         transition: "color 0.3s",
//                       }}
//                       onMouseEnter={(e) => (e.target.style.color = "007BFF")}
//                       onMouseLeave={(e) => (e.target.style.color = "#888")}
//                     />
//                     <FaShareAlt
//                       style={{
//                         fontSize: "25px",
//                         cursor: "pointer",
//                         color: "#888",
//                         transition: "color 0.3s",
//                       }}
//                       onMouseEnter={(e) => (e.target.style.color = "007BFF")}
//                       onMouseLeave={(e) => (e.target.style.color = "#888")}
//                       onClick={() => handleShare(post)}
//                     />
//                   </div>

//                   <p
//                     style={{
//                       fontSize: "12px",
//                       color: "#777",
//                     }}
//                   >
//                     {new Date(post.createdAt).toLocaleDateString()}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CourseListView;




import React, { useState, useEffect } from "react";
import {
  LikeOutlined,
  LikeFilled,
  CommentOutlined,
} from "@ant-design/icons";
import { FaShareAlt, FaBookmark } from "react-icons/fa"; // Added Bookmark Icon
import axios from "axios";

const CourseListView = () => {
  const [postList, setPostList] = useState([]);

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/roadmaps");
        const postsWithDefaults = response.data.map((post) => ({
          ...post,
          isLiked: false, // Default state
          isSaved: false, // Default state for saving
          name: "John Doe", // Constant name
          role: "Instructor", // Constant role
        }));
        setPostList(postsWithDefaults);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleLike = async (id) => {
    try {
      const post = postList.find((p) => p._id === id);

      if (!post) return;

      const updatedPost = {
        ...post,
        isLiked: !post.isLiked,
        likes: post.isLiked ? post.likes - 1 : post.likes + 1,
      };

      // Optimistically update the frontend state
      setPostList((prevPosts) =>
        prevPosts.map((p) => (p._id === id ? updatedPost : p))
      );

      // Update the backend
      await axios.put(`http://localhost:5000/api/posts/${id}`, {
        likes: updatedPost.likes,
      });
    } catch (error) {
      console.error("Error updating likes:", error);

      // Revert state if the API call fails
      setPostList((prevPosts) =>
        prevPosts.map((p) =>
          p._id === id
            ? { ...p, isLiked: !p.isLiked, likes: p.likes + (p.isLiked ? -1 : 1) }
            : p
        )
      );
    }
  };

  const handleShare = (post) => {
    if (navigator.share) {
      navigator
        .share({
          title: post.title,
          text: post.description,
          url: window.location.href,
        })
        .then(() => console.log("Content shared successfully"))
        .catch((error) => console.error("Error sharing content:", error));
    } else {
      alert("Sharing is not supported in your browser.");
    }
  };

  const handleFollow = (id) => {
    alert(`You are now following the user with ID: ${id}`);
  };

  const handleSavePost = (id) => {
    setPostList((prevPosts) =>
      prevPosts.map((post) =>
        post._id === id ? { ...post, isSaved: !post.isSaved } : post
      )
    );
  };

  return (
    <section className="course-grid-view py-120">
      <div
        className="container"
        style={{
          backgroundColor: "#F9F9F9",
          padding: "20px",
          borderRadius: "16px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div className="row gy-4">
          {postList.map((post) => (
            <div className="w-100 mb-4" key={post._id}>
              <div
                className="post-card rounded-16 p-12 shadow-md"
                style={{
                  backgroundColor: "#F9F9F9",
                  width: "900px",
                  margin: "20px auto",
                  padding: "24px",
                  borderRadius: "16px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "pointer",
                }}
              >
                {/* Instructor Information */}
                <div className="flex-between mb-16">
                  <div className="flex-align gap-12">
                    <img
                      src={post.profilePicture || "default-image.jpg"}
                      alt="Instructor"
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                      }}
                    />
                    <div>
                      <h5
                        style={{
                          fontWeight: "bold",
                          marginBottom: "4px",
                        }}
                      >
                        {post.name}
                      </h5>
                      <p
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
                      backgroundColor: "#0661B7",
                      color: "#fff",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "bold",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#004A93")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#0661B7")
                    }
                  >
                    Follow
                  </button>
                </div>

                {/* Post Content */}
                <div className="post-content mb-16">
                  <img
                    src={post.thumbnail || "default-thumbnail.jpg"}
                    alt="Post Thumbnail"
                    style={{
                      borderRadius: "12px",
                      marginBottom: "16px",
                      width: "100%",
                      height: "auto",
                      maxHeight: "400px",
                      objectFit: "cover",
                    }}
                  />
                  <h4
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      marginBottom: "12px",
                    }}
                  >
                    {post.title}
                  </h4>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#555",
                      lineHeight: "1.6",
                    }}
                  >
                    {post.description}
                  </p>

                  {/* Tags */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                      marginTop: "8px",
                    }}
                  >
                    {post.tags?.map((tag, index) => (
                      <span
                        key={index}
                        style={{
                          backgroundColor: "#E6F7FF",
                          color: "#007BFF",
                          padding: "4px 8px",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Post Footer */}
                <div className="post-footer flex-between mt-12">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    {/* Like Button */}
                    <button
                      type="button"
                      onClick={() => handleLike(post._id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: post.isLiked ? "#007BFF" : "#888",
                        transition: "color 0.3s",
                      }}
                      onMouseEnter={(e) => (e.target.style.color = "#007BFF")}
                      onMouseLeave={(e) =>
                        (e.target.style.color = post.isLiked ? "#007BFF" : "#888")
                      }
                    >
                      {post.isLiked ? (
                        <LikeFilled style={{ fontSize: "25px" }} />
                      ) : (
                        <LikeOutlined style={{ fontSize: "25px" }} />
                      )}
                      <span>{post.likes}</span>
                    </button>

                    {/* Comment and Share Icons */}
                    <CommentOutlined
                      style={{
                        fontSize: "25px",
                        cursor: "pointer",
                        color: "#888",
                        transition: "color 0.3s",
                      }}
                      onMouseEnter={(e) => (e.target.style.color = "#007BFF")}
                      onMouseLeave={(e) => (e.target.style.color = "#888")}
                    />
                    <FaShareAlt
                      style={{
                        fontSize: "25px",
                        cursor: "pointer",
                        color: "#888",
                        transition: "color 0.3s",
                      }}
                      onMouseEnter={(e) => (e.target.style.color = "#007BFF")}
                      onMouseLeave={(e) => (e.target.style.color = "#888")}
                      onClick={() => handleShare(post)}
                    />
                  </div>

                  {/* Save Button */}
                  <FaBookmark
                    style={{
                      fontSize: "25px",
                      cursor: "pointer",
                      color: post.isSaved ? "#FFD700" : "#888",
                      transition: "color 0.3s",
                    }}
                    onClick={() => handleSavePost(post._id)}
                  />

                  <p
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseListView;