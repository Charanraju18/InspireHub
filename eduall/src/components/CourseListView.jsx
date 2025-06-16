// import React, { useState, useEffect } from "react";
// import { LikeOutlined, LikeFilled } from "@ant-design/icons";
// import { CommentOutlined, ShareAltOutlined } from "@ant-design/icons";
// import axios from "axios";

// const CourseListView = () => {
//   const [postList, setPostList] = useState([]);

//   // Fetch posts from backend
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/posts");
//         setPostList(response.data);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };
//     fetchPosts();
//   }, []);

//   const handleLike = async (id) => {
//     try {
//       const post = postList.find((p) => p._id === id);
//       const updatedPost = {
//         ...post,
//         likes: post.isLiked ? post.likes - 1 : post.likes + 1,
//         isLiked: !post.isLiked,
//       };

//       // Update backend
//       await axios.put(`http://localhost:5000/api/posts/${id}`, {
//         likes: updatedPost.likes,
//       });

//       // Update local state
//       setPostList((prevPosts) =>
//         prevPosts.map((p) => (p._id === id ? updatedPost : p))
//       );
//     } catch (error) {
//       console.error("Error updating likes:", error);
//     }
//   };

//   const handleFollow = (id) => {
//     alert(`You are now following the user with ID: ${id}`);
//   };

//   const handleComment = (id) => {
//     alert(`Comment on post ID: ${id}`);
//   };

//   const handleShare = (id) => {
//     alert(`Shared post ID: ${id}`);
//   };

//   return (
//     <section className="course-grid-view py-120">
//       <div className="container">
//         <div className="row gy-4">
//           {postList.map((post) => (
//             <div className="w-100 mb-4" key={post._id}>
//               <div
//                 className="post-card rounded-16 p-12 shadow-md border border-neutral-30"
//                 style={{
//                   backgroundColor: "#F3F9FF",
//                   width: "900px",
//                   margin: "0 auto",
//                   padding: "24px",
//                 }}
//               >
//                 {/* Instructor Information */}
//                 <div className="flex-between mb-16">
//                   <div className="flex-align gap-12">
//                     <img
//                       src={post.profilePicture}
//                       alt="Instructor"
//                       className="w-48 h-48 object-fit-cover rounded-circle"
//                       style={{
//                         width: "48px",
//                         height: "48px",
//                         borderRadius: "50%",
//                       }}
//                     />
//                     <div>
//                       <h5
//                         className="text-md font-semibold"
//                         style={{
//                           fontWeight: "bold",
//                           marginBottom: "4px",
//                         }}
//                       >
//                         {post.name}
//                       </h5>
//                       <p
//                         className="text-sm text-neutral-600"
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
//                     }}
//                   >
//                     Follow
//                   </button>
//                 </div>

//                 {/* Post Content */}
//                 <div className="post-content mb-16">
//                   <img
//                     src={post.profilePicture || "default-image.jpg"}
//                     alt="Post Thumbnail"
//                     className="w-full rounded-12 mb-12"
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
//                     className="text-lg font-semibold mb-8"
//                     style={{
//                       fontSize: "18px",
//                       fontWeight: "bold",
//                       marginBottom: "12px",
//                     }}
//                   >
//                     {post.title}
//                   </h4>
//                   <p
//                     className="text-sm text-neutral-700"
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
//                   <div>
//                     <button
//                       type="button"
//                       className="flex-align gap-4 text-main-600 text-lg"
//                       onClick={() => handleLike(post._id)}
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "8px",
//                         color: post.isLiked ? "#007BFF" : "#888",
//                         fontSize: "16px",
//                         background: "none",
//                         border: "none",
//                         cursor: "pointer",
//                       }}
//                     >
//                       {post.isLiked ? (
//                         <LikeFilled style={{ fontSize: "20px" }} />
//                       ) : (
//                         <LikeOutlined style={{ fontSize: "20px" }} />
//                       )}
//                       {post.likes} Likes
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => handleComment(post._id)}
//                       style={{
//                         marginLeft: "16px",
//                         color: "#888",
//                         background: "none",
//                         border: "none",
//                         cursor: "pointer",
//                         fontSize: "16px",
//                       }}
//                     >
//                       <CommentOutlined /> Comment
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => handleShare(post._id)}
//                       style={{
//                         marginLeft: "16px",
//                         color: "#888",
//                         background: "none",
//                         border: "none",
//                         cursor: "pointer",
//                         fontSize: "16px",
//                       }}
//                     >
//                       <ShareAltOutlined /> Share
//                     </button>
//                   </div>
//                   <div>
//                     <p
//                       className="text-sm text-neutral-500"
//                       style={{
//                         fontSize: "12px",
//                         color: "#777",
//                       }}
//                     >
//                       {new Date(post.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
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
  ShareAltOutlined,
} from "@ant-design/icons";
import axios from "axios";

const CourseListView = () => {
  const [postList, setPostList] = useState([]);

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        const postsWithLikes = response.data.map((post) => ({
          ...post,
          isLiked: false, // Default state
        }));
        setPostList(postsWithLikes);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleLike = async (id) => {
    try {
      // Find the post to update
      const post = postList.find((p) => p._id === id);
      const updatedPost = {
        ...post,
        likes: post.isLiked ? post.likes - 1 : post.likes + 1,
        isLiked: !post.isLiked,
      };

      // Update the backend
      await axios.put(`http://localhost:5000/api/posts/${id}`, {
        likes: updatedPost.likes,
      });

      // Update the frontend state
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
                      src={post.profilePicture || "default-image.jpg"}
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
                      backgroundColor: "#0661B7",
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
                      height: "auto",
                      maxHeight: "400px",
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
                      }}
                    >
                      {post.isLiked ? (
                        <LikeFilled style={{ fontSize: "20px" }} />
                      ) : (
                        <LikeOutlined style={{ fontSize: "20px" }} />
                      )}
                      <span>{post.likes}</span>
                    </button>

                    {/* Comment and Share Icons */}
                    <CommentOutlined
                      style={{
                        fontSize: "20px",
                        cursor: "pointer",
                        color: "#888",
                      }}
                    />
                    <ShareAltOutlined
                      style={{
                        fontSize: "20px",
                        cursor: "pointer",
                        color: "#888",
                      }}
                    />
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

export default CourseListView;

