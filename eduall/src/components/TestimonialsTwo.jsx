import { useRef } from "react";
import Slider from "react-slick";

const TestimonialsTwo = () => {
  const sliderRef = useRef(null);
  const settings = {
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    speed: 900,
    dots: false,
    pauseOnHover: true,
    arrows: false,
    draggable: true,
    infinite: true,

    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };
  return (
    <section className="testimonials-two py-120 position-relative z-1">
      <div className="container">
        <div className="section-heading text-center">
          <div className="flex-align d-inline-flex gap-8 mb-16 wow bounceInDown">
            <span className="text-main-600 text-2xl d-flex">
              <i className="ph-bold ph-book" />
            </span>
            <h5 className="text-main-600 mb-0">
              Testimonials from Happy Learners
            </h5>
          </div>
          <h2 className="mb-24 wow bounceIn">What Our Students Say</h2>
          <p className=" wow bounceInUp">
            Our students' success stories speak volumes. Here are just a few
            testimonials from our satisfied learners
          </p>
        </div>
        <Slider
          ref={sliderRef}
          {...settings}
          className="testimonials-two-slider"
        >
          <div
            className="testimonials-two-item bg-main-25 rounded-12 p-32"
            data-aos="fade-up"
            data-aos-duration={400}
          >
            <ul className="flex-align gap-8 mb-16">
              <li className="text-warning-600 text-xl d-flex">
                <i className="ph-fill ph-star" />
              </li>
              <li className="text-warning-600 text-xl d-flex">
                <i className="ph-fill ph-star" />
              </li>
              <li className="text-warning-600 text-xl d-flex">
                <i className="ph-fill ph-star" />
              </li>
              <li className="text-warning-600 text-xl d-flex">
                <i className="ph-fill ph-star" />
              </li>
              <li className="text-warning-600 text-xl d-flex">
                <i className="ph-fill ph-star-half" />
              </li>
            </ul>
            <p className="text-neutral-700 text-xl">
              "I was struggling to visualize my long-term goals, but your
              roadmap website provided the perfect framework. It's incredibly
              user-friendly and has truly empowered my planning process."
            </p>
            <div className="flex-between gap-24 flex-wrap pt-28 mt-28 border-top border-neutral-50 mt-28 border-dashed border-0">
              <div className="flex-align gap-24 ">
                <img
                  src="assets/images/thumbs/user-1.jpg"
                  alt=""
                  className="w-60 h-60 object-fit-cover rounded-circle"
                />
                <div className="">
                  <h5 className="mb-8 fw-medium">Sachin</h5>
                  <span className="text-neutral-700">Graphic Designer</span>
                </div>
              </div>
              <span className="quate text-48 d-flex opacity-25">
                <img src="assets/images/icons/quote-icon.jpg" alt="" />
              </span>
            </div>
          </div>
          <div
            className="testimonials-two-item bg-main-25 rounded-12 p-32"
            data-aos="fade-up"
            data-aos-duration={600}
          >
            <ul className="flex-align gap-8 mb-16">
              <li className="text-warning-600 text-xl d-flex">
                <i className="ph-fill ph-star" />
              </li>
              <li className="text-warning-600 text-xl d-flex">
                <i className="ph-fill ph-star" />
              </li>
              <li className="text-warning-600 text-xl d-flex">
                <i className="ph-fill ph-star" />
              </li>
              <li className="text-warning-600 text-xl d-flex">
                <i className="ph-fill ph-star" />
              </li>
              <li className="text-warning-600 text-xl d-flex">
                <i className="ph-fill ph-star-half" />
              </li>
            </ul>
            <p className="text-neutral-700 text-xl">
              "Finally, a tool that makes strategic planning simple and
              engaging! Your roadmap website breaks down big objectives into
              manageable tasks, making success feel achievable every step of the
              way."
            </p>
            <div className="flex-between gap-24 flex-wrap pt-28 mt-28 border-top border-neutral-50 mt-28 border-dashed border-0">
              <div className="flex-align gap-24 ">
                <img
                  src="assets/images/thumbs/user-2.jpg"
                  alt=""
                  className="w-60 h-60 object-fit-cover rounded-circle"
                />
                <div className="">
                  <h5 className="mb-8 fw-medium">Smriti</h5>
                  <span className="text-neutral-700">UI/UX Designer</span>
                </div>
              </div>
              <span className="quate text-48 d-flex opacity-25">
                <img src="assets/images/icons/quote-icon.png" alt="" />
              </span>
            </div>
          </div>
          <div
            className="testimonials-two-item bg-main-25 rounded-12 p-32"
            data-aos="fade-up"
            data-aos-duration={600}
          >
            <ul className="flex-align gap-8 mb-16">
              <li className="text-warning-600 text-xl d-flex">
                <i className="ph-fill ph-star" />
              </li>
              <li className="text-warning-600 text-xl d-flex">
                <i className="ph-fill ph-star" />
              </li>
              <li className="text-warning-600 text-xl d-flex">
                <i className="ph-fill ph-star" />
              </li>
              <li className="text-warning-600 text-xl d-flex">
                <i className="ph-fill ph-star" />
              </li>
              <li className="text-warning-600 text-xl d-flex">
                <i className="ph-fill ph-star-half" />
              </li>
            </ul>
            <p className="text-neutral-700 text-xl">
              "Your roadmap website is an absolute game-changer! It beautifully
              simplifies complex journeys into clear, actionable steps. A truly
              invaluable resource for anyone looking to navigate their goals
              with confidence."
            </p>
            <div className="flex-between gap-24 flex-wrap pt-28 mt-28 border-top border-neutral-50 mt-28 border-dashed border-0">
              <div className="flex-align gap-24 ">
                <img
                  src="assets/images/thumbs/user-3.jpg"
                  alt=""
                  className="w-60 h-60 object-fit-cover rounded-circle"
                />
                <div className="">
                  <h5 className="mb-8 fw-medium">Hardik</h5>
                  <span className="text-neutral-700">Front End Developer</span>
                </div>
              </div>
              <span className="quate text-48 d-flex opacity-25">
                <img src="assets/images/icons/quote-icon.png" alt="" />
              </span>
            </div>
          </div>
        </Slider>
        <div className="flex-center gap-16 mt-40">
          <button
            type="button"
            id="testimonials-two-prev"
            onClick={() => sliderRef.current.slickPrev()}
            className=" slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1 w-48 h-48"
          >
            <i className="ph ph-caret-left" />
          </button>
          <button
            type="button"
            id="testimonials-two-next"
            onClick={() => sliderRef.current.slickNext()}
            className=" slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1 w-48 h-48"
          >
            <i className="ph ph-caret-right" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsTwo;
