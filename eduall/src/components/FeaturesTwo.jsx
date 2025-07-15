import { Link } from "react-router-dom";

const FeaturesTwo = () => {
  return (
    <section className="features-two half-bg py-120 position-relative overflow-hidden">
      <img
        src="assets/images/shapes/shape2.png"
        alt=""
        className="shape two animation-scalation"
      />
      <img
        src="assets/images/shapes/shape4.png"
        alt=""
        className="shape six animation-walking"
      />
      <div className="container">
        <div className="section-heading style-flex">
          <div className="section-heading__inner">
            <h2 className="mb-24 wow bounceInLeft">
              Build better growth skills, faster. Ignite Your Learning Journey
            </h2>
          </div>
          <div className="section-heading__content wow bounceInRight">
            <p className="text-line-2">
              Explore new skills, deepen existing passions, and get lost in
              creativity. What you find just might...
            </p>
            <Link
              to="/course"
              className="item-hover__text flex-align d-inline-flex gap-8 text-main-600 mt-24 hover-text-decoration-underline transition-1 fw-semibold"
            >
              Read More
              <i className="ph ph-arrow-right" />
            </Link>
          </div>
        </div>
        <div className="row gy-4">
          <div
            className="col-lg-4 col-sm-6 col-xs-6"
            data-aos="fade-up"
            data-aos-duration={200}
          >
            <div className="text-center features-item item-hover animation-item bg-white border border-neutral-30 rounded-16 transition-1 hover-bg-main-600 hover-border-main-600">
              <span className="mb-32 w-110 h-110 flex-center d-inline-flex bg-main-25 rounded-circle">
                <img
                  src="assets/images/icons/features-two-icon1.png"
                  className="animate__bounce"
                  alt=""
                />
              </span>
              <h4 className="mb-16 transition-1 item-hover__text">
                Learn the latest skills until now
              </h4>
              <p className="transition-1 item-hover__text text-line-2">
                Discover valuable insights and practical tips from industry
                professionals. Stay updated with trending skills through
                engaging posts.
              </p>
              <span className="item-hover__bg w-48 h-1 bg-neutral-500 mt-32" />
            </div>
          </div>
          <div
            className="col-lg-4 col-sm-6 col-xs-6"
            data-aos="fade-up"
            data-aos-duration={400}
          >
            <div className="text-center features-item item-hover animation-item bg-white border border-neutral-30 rounded-16 transition-1 hover-bg-main-600 hover-border-main-600">
              <span className="mb-32 w-110 h-110 flex-center d-inline-flex bg-main-25 rounded-circle">
                <img
                  src="assets/images/icons/features-two-icon2.png"
                  className="animate__bounce"
                  alt=""
                />
              </span>
              <h4 className="mb-16 transition-1 item-hover__text">
                Shape Your Career Path
              </h4>
              <p className="transition-1 item-hover__text text-line-2">
                Explore real-world experiences, advice, and techniques shared by
                experienced learners and mentors to guide your professional
                growth.
              </p>
              <span className="item-hover__bg w-48 h-1 bg-neutral-500 mt-32" />
            </div>
          </div>
          <div
            className="col-lg-4 col-sm-6 col-xs-6"
            data-aos="fade-up"
            data-aos-duration={600}
          >
            <div className="text-center features-item item-hover animation-item bg-white border border-neutral-30 rounded-16 transition-1 hover-bg-main-600 hover-border-main-600">
              <span className="mb-32 w-110 h-110 flex-center d-inline-flex bg-main-25 rounded-circle">
                <i
                  className="ph-bold ph-heart animate__bounce"
                  style={{ fontSize: "48px", color: "#ff4d4f" }}
                ></i>
              </span>
              <h4 className="mb-16 transition-1 item-hover__text">
                Learn at Your Own Pace
              </h4>
              <p className="transition-1 item-hover__text text-line-2">
                Scroll through posts that match your interests. Whether you're
                browsing or diving deep, the journey is yours to choose.
              </p>
              <span className="item-hover__bg w-48 h-1 bg-neutral-500 mt-32" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesTwo;