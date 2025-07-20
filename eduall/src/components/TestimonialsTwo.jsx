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
              {/* Testimonials from Happy Learners */}
              Voices from Our InspireHub Learners
            </h5>
          </div>
          <h2 className="mb-24 wow bounceIn">What Our Learners Are Saying</h2>
          <p className=" wow bounceInUp">
            Stories from our thriving community of learners who are growing
            through shared experiences and knowledge.
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
              "Exploring InspireHub has been a game-changer for me. The posts
              shared by instructors are insightful and practical I’ve picked up
              skills that actually matter in real-world projects. Definitely a
              space I keep coming back to"
            </p>
            <div className="flex-between gap-24 flex-wrap pt-28 mt-28 border-top border-neutral-50 mt-28 border-dashed border-0">
              <div className="flex-align gap-24 ">
                <img
                  src="assets/images/thumbs/men.png"
                  alt=""
                  className="w-60 h-60 object-fit-cover rounded-circle"
                />
                <div className="">
                  <h5 className="mb-8 fw-medium">Sachin</h5>
                  <span className="text-neutral-700">Graphic Designer</span>
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
              "I wasn’t sure what to expect at first, but InspireHub changed how
              I see learning. The freedom to explore topics at my own pace,and
              connect with experienced learners, makes it an amazing platform!"
            </p>
            <div className="flex-between gap-24 flex-wrap pt-28 mt-28 border-top border-neutral-50 mt-28 border-dashed border-0">
              <div className="flex-align gap-24 ">
                <img
                  // src='assets/images/thumbs/testi-img2.png'
                  src="assets/images/thumbs/women.png"
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
              {/* "I was at first doubtful about web based learning, yet adjusted my
              viewpoint totally. The courses are very much planned to learn at
              my own speed is important." */}
              "I was initially doubtful about online learning, but InspireHub
              completely changed my perspective. The posts are shared by
              experienced instructors, and the freedom to explore them at my own
              pace is truly empowering"
            </p>
            <div className="flex-between gap-24 flex-wrap pt-28 mt-28 border-top border-neutral-50 mt-28 border-dashed border-0">
              <div className="flex-align gap-24 ">
                <img
                  // src='assets/images/thumbs/user-two-img3.png'
                  src="assets/images/thumbs/man.png"
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
