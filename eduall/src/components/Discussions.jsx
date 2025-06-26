import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Reviews = () => {
  const { id } = useParams();
  const [roadmap, setRoadmap] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [replyVisible, setReplyVisible] = useState({});
  const [replies, setReplies] = useState({});
  const [reviewText, setReviewText] = useState("");

  const defaultProfile =
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/roadmaps/${id}`);
        setRoadmap(res.data);
      } catch (error) {
        console.error("Error fetching roadmap:", error);
      }
    };

    const fetchReviews = async () => {
  try {
    console.log("Fetching reviews for ID:", id); // Debugging

    const res = await axios.get(`http://localhost:5000/api/reviews/${id}`, {
      withCredentials: true,
    });

    if (Array.isArray(res.data) && res.data.length > 0) {
      setReviews(res.data);

      const initialReplies = {};
      res.data.forEach((review, i) => {
        initialReplies[i] = { temp: "", list: review.replies || [] };
      });

      setReplies(initialReplies);
    } else {
      console.log("No reviews found.");
      setReplies({});
    }
  } catch (error) {
    console.error("Error fetching reviews:", error.response?.data || error.message);
  }
};


    fetchRoadmap();
    fetchReviews();
  }, [id]);

  const toggleReply = (index) => {
    setReplyVisible((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleReplyChange = (index, value) => {
    setReplies((prev) => ({
      ...prev,
      [index]: { ...prev[index], temp: value },
    }));
  };

  const handleReplySubmit = async (index, reviewId) => {
    const token = localStorage.getItem("token");
    const text = replies[index]?.temp?.trim();
    if (!text) return;
    try {
      const res = await axios.post(
        `http://localhost:5000/api/reviews/reply/${reviewId}`,
        { text },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReplies((prev) => ({
        ...prev,
        [index]: {
          temp: "",
          list: [...(prev[index]?.list || []), res.data],
        },
      }));
      setReplyVisible((prev) => ({ ...prev, [index]: false }));
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    const token = localStorage.getItem("token");
    console.log("Submitting review for ID:", id);
    try {
      const res = await axios.post(
        `http://localhost:5000/api/reviews/${id}`,
        { text: reviewText },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReviews((prev) => [res.data, ...prev]);
      setReplies((prev) => ({ 0: { temp: "", list: [] }, ...prev }));
      setReviewText("");
    } catch (error) {
      console.error("Error submitting review:", error);
      if (error.response && error.response.status === 401) {
        alert("You need to log in to submit a review.");
      }
    }
  };

  if (!roadmap) {
    return (
      <section className="course-details-outer">
        <div className="container">
          <div className="outer-box">
            <div className="inner-box">
              <p>Loading course details...</p>
            </div>
          </div>
        </div>
        <style>{styles}</style>
      </section>
    );
  }

  return (
    <section className="course-details-outer">
      <div className="container">
        <div className="outer-box">
          <div className="inner-box">
            <div className="row gy-4">
              <div className="col-xl-8 mx-auto">
                <div className="review-section">
                  <h4>Discussions</h4>

                  {reviews.map((review, index) => (
                    <div key={review._id} className="review-box">
                      <div className="review-content">
                        <img
                          src={
                            review.user?.profilePicture
                              ? review.user.profilePicture
                              : defaultProfile
                          }
                          alt={review.user?.name || "User"}
                          className="review-avatar"
                        />
                        <div>
                          <h6 className="review-author">
                            {review.user?.name || "Unknown User"}
                          </h6>
                          <p>{review.text}</p>
                        </div>
                      </div>

                      <div className="reply-block">
                        {(replies[index]?.list || []).map((r, i) => (
                          <div key={i} className="reply-display">
                            <img
                              src={
                                r.user?.profilePicture
                                  ? r.user.profilePicture
                                  : defaultProfile
                              }
                              alt={r.user?.name || "User"}
                              className="reply-avatar"
                            />
                            <div>
                              <h6 className="reply-name">
                                {r.user?.name || "Unknown User"}
                              </h6>
                              <p className="reply-text">{r.text}</p>
                            </div>
                          </div>
                        ))}

                        <div className="reply-section">
                          <button
                            className="reply-btn"
                            onClick={() => toggleReply(index)}
                          >
                            {replyVisible[index] ? "Cancel" : "Reply"}
                          </button>

                          {replyVisible[index] && (
                            <div className="reply-input-group">
                              <input
                                type="text"
                                placeholder="Write a reply..."
                                value={replies[index]?.temp || ""}
                                onChange={(e) =>
                                  handleReplyChange(index, e.target.value)
                                }
                              />
                              <button
                                className="submit-reply-btn"
                                onClick={() =>
                                  handleReplySubmit(index, review._id)
                                }
                              >
                                Submit
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <form className="review-form" onSubmit={handleReviewSubmit}>
                  <h5>Write a Review</h5>
                  <textarea
                    placeholder="Write your review..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  />
                  <button type="submit">Submit Review</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{styles}</style>
    </section>
  );
};

const styles = `
.course-details-outer {
  padding: 60px 0;
  marign: 50px;
}
.container {
  width: 100%;
  max-width: 1140px;
  margin: auto;
  padding: 0 16px;
}
.outer-box {
  background-color: #F3F9FF;
  padding: 40px;
  border-radius: 20px;
}
.inner-box {
  background-color: #ffffff;
  padding: 40px 50px;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}
.review-section {
  margin-top: 30px;
}
.review-box {
  background-color: #f9f9f9;
  padding: 16px 20px;
  border-radius: 12px;
  margin-bottom: 24px;
  border-left: 5px solid #007bff;
}
.review-content {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}
.review-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}
.review-author {
  margin-bottom: 4px;
  font-size: 16px;
  font-weight: 600;
}
.reply-block {
  margin-left: 60px;
  margin-top: 10px;
  padding-left: 12px;
  border-left: 2px dashed #ccc;
}
.reply-display {
  display: flex;
  gap: 12px;
  margin-top: 14px;
  align-items: flex-start;
}
.reply-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
.reply-name {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
}
.reply-text {
  background-color: #eef2f8;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 15px;
}
.reply-section {
  margin-top: 12px;
}
.reply-btn {
  margin-top: 8px;
  margin-left: 8px;
  background: none;
  border: none;
  color: #007bff;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
}
.reply-input-group {
  display: flex;
  gap: 8px;
  margin-top: 10px;
  flex-wrap: wrap;
}
.reply-input-group input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.submit-reply-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
}
.submit-reply-btn:hover {
  background-color: #0056b3;
}
.review-form {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.review-form textarea {
  resize: vertical;
  height: 100px;
  padding: 12px 16px;
  border: 1px solid #ccc;
  border-radius: 12px;
  font-size: 16px;
}
.review-form button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s ease;
}
.review-form button:hover {
  background-color: #0056b3;
}

/* ------------------- RESPONSIVE ------------------- */
@media (max-width: 768px) {
  .inner-box {
    padding: 24px;
  }
  .review-content {
    flex-direction: column;
    align-items: flex-start;
  }
  .review-avatar {
    width: 50px;
    height: 50px;
  }
  .reply-display {
    flex-direction: column;
  }
  .reply-avatar {
    width: 36px;
    height: 36px;
  }
  .reply-btn {
    margin-left: 0;
  }
}
@media (max-width: 480px) {
  .reply-input-group {
    flex-direction: column;
  }
  .reply-input-group input,
  .submit-reply-btn {
    width: 100%;
  }
}
`;
export default Reviews;