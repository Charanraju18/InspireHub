const CertificateTwo = () => {
  return (
    <section className="certificate-two py-120 position-relative z-1 mash-bg-main mash-bg-main-two mash-reverse">
      <div className="section-heading text-center">
        <h2 className="mb-24 wow bounceIn">
          Go through specific technology domain roadmaps from the EduAll
        </h2>
        <p className=" wow bounceInUp">
          Roadmaps which one can follow to excell in a specific domain by
          following the steps specified in the roadmap.
        </p>
      </div>
      <div className="position-relative">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-6 pe-lg-5">
              <div
                className="certificate-two-item animation-item border-bottom border-neutral-50 border-dashed border-0 mb-28 pb-28"
                data-aos="fade-up"
                data-aos-duration={200}
              >
                <div className="flex-align gap-20 mb-12">
                  <span className="w-52 h-52 flex-center d-inline-flex bg-main-25 rounded-circle text-main-600 text-2xl">
                    <i className="animate__wobble ph-bold ph-medal" />
                  </span>
                  <h5 className="mb-0">Learn from Industry Experts</h5>
                </div>
                <p className="text-neutral-700 text-line-2">
                  Industry experts post the roadmaps which they followed for
                  achieveing the job.
                </p>
              </div>
              <div
                className="certificate-two-item animation-item border-bottom border-neutral-50 border-dashed border-0 mb-28 pb-28"
                data-aos="fade-up"
                data-aos-duration={400}
              >
                <div className="flex-align gap-20 mb-12">
                  <span className="w-52 h-52 flex-center d-inline-flex bg-main-25 rounded-circle text-main-600 text-2xl">
                    <i className="animate__wobble ph-bold ph-clock" />
                  </span>
                  <h5 className="mb-0">Learn Anytime, Anywhere</h5>
                </div>
                <p className="text-neutral-700 text-line-2">
                  This website is accessible 24/7 and people just need correct
                  login credentials.
                </p>
              </div>
              <div
                className="certificate-two-item animation-item border-bottom border-neutral-50 border-dashed border-0 mb-28 pb-28"
                data-aos="fade-up"
                data-aos-duration={600}
              >
                <div className="flex-align gap-20 mb-12">
                  <span className="w-52 h-52 flex-center d-inline-flex bg-main-25 rounded-circle text-main-600 text-2xl">
                    <i className="animate__wobble ph-bold ph-star" />
                  </span>
                  <h5 className="mb-0">Free To Use</h5>
                </div>
                <p className="text-neutral-700 text-line-2">
                  To use the website is accessible with 0 cost.
                </p>
              </div>
              <div
                className="certificate-two-item animation-item"
                data-aos="fade-up"
                data-aos-duration={800}
              >
                <div className="flex-align gap-20 mb-12">
                  <span className="w-52 h-52 flex-center d-inline-flex bg-main-25 rounded-circle text-main-600 text-2xl">
                    <i className="animate__wobble ph-bold ph-chart-line-up" />
                  </span>
                  <h5 className="mb-0">Domain Based Roadmaps</h5>
                </div>
                <p className="text-neutral-700 text-line-2">
                  In the website each domain has sections in which we find
                  several roadmaps.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="certificate-two__thumb">
                <img
                  src="assets/images/thumbs/roadmap2.png"
                  alt=""
                  data-tilt=""
                  data-tilt-max={10}
                  data-tilt-speed={500}
                  data-tilt-perspective={5000}
                  data-tilt-full-page-listening=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificateTwo;
