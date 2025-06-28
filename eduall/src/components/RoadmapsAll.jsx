import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RoadmapsAll = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const res = await fetch(
          "https://inspirehub-backend-itne.onrender.com/api/roadmaps"
        );
        const data = await res.json();
        setRoadmaps(data);
      } catch (err) {
        console.error("Error fetching roadmaps:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmaps();
  }, []);


  if (loading) return <p className="text-center mt-5">Loading Roadmaps...</p>;

  return (
    <section className="course-list-view py-120 bg-white">
      <div className="container">
        <div className="flex-between gap-16 flex-wrap mb-40">
          <span className="text-neutral-500">
            Showing {roadmaps.length} Results
          </span>
        </div>

        <div className="row gy-4">
          {roadmaps.map((roadmap) => (
            <div className="col-xl-4 col-sm-6" key={roadmap._id}>
              <div className="scale-hover-item bg-main-25 rounded-16 p-12 h-100 border border-neutral-30">
                <div className="course-item__thumb rounded-12 overflow-hidden position-relative">
                  <Link
                    to={`/roadmap/${roadmap._id}`}
                    className="w-100 h-100"
                    tabIndex={0}
                  >
                    <img
                      src={
                        roadmap.thumbnail || "/images/thumbs/createRoadmap.png"
                      }
                      alt="Roadmap Thumbnail"
                      className="scale-hover-item__img rounded-12 cover-img transition-2"
                    />
                  </Link>
                </div>

                <div className="pt-32 pb-24 px-16 position-relative">
                  <h4 className="mb-16">
                    <Link
                      to={`/roadmap/${roadmap._id}`}
                      className="link text-line-2"
                      tabIndex={0}
                    >
                      {roadmap.title}
                    </Link>
                  </h4>

                  <div className="flex-align gap-8 mb-2">
                    <i className="ph-bold ph-compass" />
                    <p className="text-neutral-500 text-lg">
                      Domain: {roadmap.domain}
                    </p>
                  </div>

                  <div className="flex-align gap-8 mb-2">
                    <i className="ph-bold ph-fire-simple" />
                    <p className="text-neutral-500 text-lg">
                      Difficulty: {roadmap.difficulty}
                    </p>
                  </div>

                  <div className="flex-align gap-8 mb-2">
                    <i className="ph-bold ph-clock" />
                    <p className="text-neutral-500 text-lg">
                      Duration: {roadmap.estimatedDurationWeeks} weeks
                    </p>
                  </div>

                  <div className="flex-between gap-8 pt-24 border-top border-neutral-50 mt-28 border-dashed border-0">
                    <Link
                      to={`/roadmap/${roadmap._id}`}
                      className="flex-align gap-8 text-main-600 hover-text-decoration-underline transition-1 fw-semibold"
                      tabIndex={0}
                    >
                      View Details <i className="ph ph-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* You can add pagination here if needed */}
      </div>
    </section>
  );
};

export default RoadmapsAll;