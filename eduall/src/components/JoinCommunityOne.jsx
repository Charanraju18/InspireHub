import { useState } from "react";
import axios from "axios";
const JoinCommunityOne = () => {
  const [email, setEmail] = useState("");
  const [fname, setName] = useState("");
  const [pos, setJobPos] = useState("Front End Developer");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const CollectInfo = async (event) => {
    event.preventDefault();

    const payload = {
      name: fname,
      email: email,
      role: pos,
    };

    if (!fname || !email || !pos) {
      setMessage("All fields are required.");
      setMessageType("error");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/mailSender`,
        payload
      );

      if (response.status === 200 || response.status === 201) {
        setMessage("✅ You have successfully joined the community!");
        setMessageType("success");
      } else {
        setMessage("❌ Submission failed. Try again later.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Submission error:", error.response?.data || error.message);
      setMessage("❌ An error occurred while submitting the form.");
      setMessageType("error");
    }
  };

  return (
    <section className="join-community">
      <div className="container container--lg">
        <div className="bg-main-25 rounded-20 py-120 px-8">
          <div className="container">
            <div className="row gy-4 align-items-center">
              <div className="col-lg-6">
                <div className="join-community__content">
                  <div className="mb-40">
                    <h2 className="mb-24 wow bounceIn">
                      Join the InspireHub Community: Start Now
                    </h2>
                    <p className="text-neutral-500 text-line-2 wow bounceInUp">
                      Ready to explore insightful content and connect with
                      fellow learners? Sign up now and start discovering — all
                      at your own pace.
                    </p>
                  </div>
                  <form action="#">
                    <div
                      className="mb-24 position-relative"
                      data-aos="fade-up-left"
                      data-aos-duration={400}
                    >
                      <input
                        type="text"
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                        className="bg-white text-black border border-transparent focus-border-main-600 h-48 rounded-pill px-16 ps-60 outline-0 w-100"
                        placeholder="Enter Name..."
                      />
                      <span className="bg-white text-neutral-200 text-2xl flex-center w-48 h-48 rounded-circle border border-main-25 border-4 position-absolute inset-inline-start-0 top-50 translate-middle-y">
                        <i className="ph-bold ph-user-circle" />
                      </span>
                    </div>
                    <div
                      className="mb-24 position-relative"
                      data-aos="fade-up-left"
                      data-aos-duration={600}
                    >
                      <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white text-black border border-transparent focus-border-main-600 h-48 rounded-pill px-16 ps-60 outline-0 w-100"
                        placeholder="Enter Email"
                      />
                      <span className="bg-white text-neutral-200 text-2xl flex-center w-48 h-48 rounded-circle border border-main-25 border-4 position-absolute inset-inline-start-0 top-50 translate-middle-y">
                        <i className="ph-bold ph-envelope-open" />
                      </span>
                    </div>
                    <div
                      className="mb-24 position-relative"
                      data-aos="fade-up-left"
                      data-aos-duration={800}
                    >
                      <select
                        id="job-position"
                        onChange={(e) => setJobPos(e.target.value)}
                        className="bg-white text-black border border-transparent focus-border-main-600 h-48 rounded-pill px-16 ps-60 outline-0 w-100 text-neutral-300"
                      >
                        <option value="Front End Developer">
                          Front End Developer
                        </option>
                        <option value="Back End Developer">
                          Back End Developer
                        </option>
                        <option value="UX/UI Designer">UX/UI Designer</option>
                      </select>
                      <span className="bg-white text-neutral-200 text-2xl flex-center w-48 h-48 rounded-circle border border-main-25 border-4 position-absolute inset-inline-start-0 top-50 translate-middle-y">
                        <i className="ph-bold ph-book" />
                      </span>
                    </div>
                    <div
                      className="mt-40 position-relative"
                      data-aos="fade-up-left"
                      data-aos-duration={1000}
                    >
                      <button
                        type="submit"
                        onClick={CollectInfo}
                        className="btn btn-main rounded-pill flex-align d-inline-flex gap-8"
                      >
                        Join Now
                        <i className="ph-bold ph-arrow-up-right d-flex text-lg" />
                      </button>
                    </div>
                    {message && (
                      <div className="mt-16 ps-2">
                        <p
                          className={`fw-medium ${
                            messageType === "success"
                              ? "text-main-600"
                              : "text-red-500"
                          }`}
                        >
                          {message}
                        </p>
                      </div>
                    )}
                  </form>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="join-community__thumb text-end position-relative">
                  <img
                    // src='assets/images/thumbs/join-community-img.png'
                    src="assets/images/thumbs/joinCommunity.png"
                    alt=""
                    className="wow bounceIn"
                    data-tilt=""
                    data-tilt-max={12}
                    data-tilt-speed={500}
                    data-tilt-perspective={5000}
                    data-tilt-full-page-listening=""
                  />
                  <div className="offer-message style-two px-24 py-12 rounded-12 bg-white fw-medium flex-align d-inline-flex gap-16 box-shadow-lg animation-upDown">
                    <span className="banner-box__icon flex-shrink-0 w-48 h-48 bg-purple-400 text-white text-2xl flex-center rounded-circle">
                      <i className="ph-bold ph-users" />
                    </span>
                    <div className="text-start">
                      <h6 className="mb-4">56K</h6>
                      <span className="">All Students</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunityOne;
