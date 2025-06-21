const InfoSectionOne = () => {
  return (
    <section className="info py-40 bg-main-600">
      <div className="container">
        <div className="row gy-4">
          <div
            className="col-xl-3 col-sm-6"
            data-aos="fade-up"
            data-aos-duration={200}
          >
            <div className="info-item animation-item flex-align gap-20">
              <span className="w-60 h-60 flex-center bg-white text-main-600 text-28 rounded-circle flex-shrink-0">
                <i className="animate__heartBeat ph-bold ph-video-camera" />
              </span>
              <div className='flex-grow-1'>
                <h5 className='mb-8 text-white fw-medium'>
                  {/* 50,000 online courses */}
                  Live Online Sessions
                </h5>
                <span className='text-sm text-white'>
                  {/* Enjoy a variety of fresh topics */}
                  Real-Time Learning from Real Tech Pros.
                </span>
              </div>
            </div>
          </div>
          <div
            className="col-xl-3 col-sm-6"
            data-aos="fade-up"
            data-aos-duration={400}
          >
            <div className="info-item animation-item flex-align gap-20">
              <span className="w-60 h-60 flex-center bg-white text-main-600 text-28 rounded-circle flex-shrink-0">
                <i className="animate__heartBeat ph-bold ph-users" />
              </span>
              <div className="flex-grow-1">
                <h5 className="mb-8 text-white fw-medium">
                  Expert instruction
                </h5>
                <span className="text-sm text-white">
                  Find the right instructor for you
                </span>
              </div>
            </div>
          </div>
          <div
            className="col-xl-3 col-sm-6"
            data-aos="fade-up"
            data-aos-duration={600}
          >
            <div className="info-item animation-item flex-align gap-20">
              <span className="w-60 h-60 flex-center bg-white text-main-600 text-28 rounded-circle flex-shrink-0">
                <i className="animate__heartBeat ph-bold ph-clock" />
              </span>
              <div className='flex-grow-1'>
                <h5 className='mb-8 text-white fw-medium'>
                  {/* Life time access */}
                  Learn at Your Own Pace
                  </h5>
                <span className='text-sm text-white'>
                  {/* Learn on your schedule */}
                  Flexible sessions that fit your schedule{" "}
                </span>
              </div>
            </div>
          </div>
          <div
            className="col-xl-3 col-sm-6"
            data-aos="fade-up"
            data-aos-duration={800}
          >
            <div className="info-item animation-item flex-align gap-20">
              <span className="w-60 h-60 flex-center bg-white text-main-600 text-28 rounded-circle flex-shrink-0">
                <i className="animate__heartBeat ph-bold ph-heart" />
              </span>
              <div className='flex-grow-1'>
                <h5 className='mb-8 text-white fw-medium'>
                  {/* Get Certificate */}
                  Certified by Experience
                  </h5>
                <span className='text-sm text-white'>
                  {/* When Courses Complete */}
                   Certificates guided by real-world mentors.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSectionOne;
