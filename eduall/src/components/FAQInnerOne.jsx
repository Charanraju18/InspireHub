import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import axios from "axios";

const FAQInnerOne = () => {
  const sliderRef = useRef(null);

  const [comments, setComments] = useState([]);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,      
  autoplaySpeed: 2000, 
  pauseOnHover: false, 
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/contact");
        setComments(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Failed to fetch comments", error);
      }
    };
    fetchComments();
  }, []);

  return (
    <section className="faq-page py-120">
      <div className="container">
        <div className="section-heading text-center">
          <div className="flex-align d-inline-flex gap-8 mb-16 wow bounceInDown">
            <span className="text-main-600 text-2xl d-flex">
              <i className="ph-bold ph-book" />
            </span>
            <h5 className="text-main-600 mb-0">Voices from Our InspireHub Learners</h5>
          </div>
          <h2 className="mb-24 wow bounceIn">What Our Learners Are Saying</h2>
          <p className=" wow bounceInUp">
            Stories from our thriving community of learners who are growing through shared experiences and knowledge.
          </p>
        </div>
        <Slider ref={sliderRef} {...settings} className="testimonials-two-slider">
          {comments.map((comment, index) => (
  <div
    key={index}
    className="testimonials-two-item bg-main-25 rounded-12 p-32"
    data-aos="fade-up"
    data-aos-duration={400 + index * 200}
  >
    <p className="text-neutral-700 text-xl">{comment.message}</p>
    <div className="flex-between gap-24 flex-wrap pt-28 mt-28 border-top border-neutral-50 mt-28 border-dashed border-0">
      <div className="flex-align gap-24">
        <img
          src={comment.userId?.profilePicture || "assets/images/thumbs/default-profile.png"}
          alt={comment.name || "User"}
          className="w-60 h-60 object-fit-cover rounded-circle"
        />
        <div>
          <h5 className="mb-8 fw-medium">{comment.userId?.name || "Anonymous"}</h5>
          <span className="text-neutral-700">{comment.userId?.role || "Learner"}</span>

        </div>
      </div>
      <span className="quate text-48 d-flex opacity-25">
        <img src="assets/images/icons/quote-icon.jpg" alt="Quote" />
      </span>
    </div>
  </div>
))}

        </Slider>
        <div className="flex-center gap-16 mt-40">
          <button
            type="button"
            id="testimonials-two-prev"
            onClick={() => sliderRef.current.slickPrev()}
            className="slick-arrow flex-center rounded-circle"
          >
            <i className="ph ph-caret-left" />
          </button>
          <button
            type="button"
            id="testimonials-two-next"
            onClick={() => sliderRef.current.slickNext()}
            className="slick-arrow flex-center rounded-circle"
          >
            <i className="ph ph-caret-right" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQInnerOne;
