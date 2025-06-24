import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";

const ExploreCourseTwo = () => {
  const [domains, setDomains] = useState(["All Categories"]);
  const [roadmaps, setRoadmaps] = useState([]);
  const [filteredRoadmaps, setFilteredRoadmaps] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("All Categories");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
const { isAuthenticated } = useAuth();

const handleRoadmapsClick = () => {
  if (isAuthenticated) {
    navigate("/roadmaps");
  } else {
    navigate("/sign-in");
  }
};

  // ✅ Domain icons mapping
  const domainIcons = {
    "All Categories": "ph-bold ph-squares-four",
    "Programming": "ph-bold ph-code",
    "Web Design & Development": "ph-bold ph-code",
    "Academic Skills": "ph-bold ph-graduation-cap",
    "Marketing": "ph-bold ph-chart-pie-slice",
    "Design (General)": "ph-bold ph-magic-wand",
    "Technology": "ph-bold ph-cpu",
    "Fashion Design": "ph-bold ph-dress",
    "Agriculture": "ph-bold ph-plant",
    "Biology & Life Sciences": "ph-bold ph-dna",
    "Data Science & Analytics": "ph-bold ph-chart-bar",
    "Business & Entrepreneurship": "ph-bold ph-briefcase",
    "Mobile App Development": "ph-bold ph-device-mobile",
    "Artificial Intelligence": "ph-bold ph-robot",
    "Cybersecurity": "ph-bold ph-shield-check",
    "Video Production & Editing": "ph-bold ph-video-camera",
    "Health & Nutrition": "ph-bold ph-heart",
    "Finance & Investing": "ph-bold ph-coins",
    "Photography": "ph-bold ph-camera",
    "Language & Communication": "ph-bold ph-chat-text",
    "Environmental Science": "ph-bold ph-tree"
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterRoadmapsByDomain();
  }, [selectedDomain, roadmaps]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");
      
      console.log("🔄 Fetching roadmaps and domains...");

      // ✅ Fetch all roadmaps first
      const roadmapsResponse = await fetch("http://localhost:5000/api/roadmaps");
      
      if (!roadmapsResponse.ok) {
        throw new Error(`Roadmaps API failed: ${roadmapsResponse.status}`);
      }
      
      const roadmapsData = await roadmapsResponse.json();
      console.log("✅ Roadmaps fetched:", roadmapsData.length);
      
      setRoadmaps(roadmapsData || []);

      // ✅ Try to fetch domains, but don't fail if it doesn't work
      try {
        const domainsResponse = await fetch("http://localhost:5000/api/roadmaps/domains");
        
        if (domainsResponse.ok) {
          const domainsData = await domainsResponse.json();
          console.log("✅ Domains fetched:", domainsData);
          
          // ✅ Ensure domainsData is an array and has content
          if (Array.isArray(domainsData) && domainsData.length > 0) {
            setDomains(["All Categories", ...domainsData]);
          } else {
            // ✅ Fallback: Extract unique domains from roadmaps
            const uniqueDomains = [...new Set(roadmapsData.map(r => r.domain).filter(d => d))];
            setDomains(["All Categories", ...uniqueDomains]);
            console.log("🔄 Used fallback domains from roadmaps:", uniqueDomains);
          }
        } else {
          throw new Error("Domains API failed");
        }
      } catch (domainError) {
        console.warn("⚠️ Domains API failed, using fallback:", domainError.message);
        // ✅ Fallback: Extract domains from roadmaps data
        const uniqueDomains = [...new Set(roadmapsData.map(r => r.domain).filter(d => d))];
        setDomains(["All Categories", ...uniqueDomains]);
      }
      
    } catch (error) {
      console.error("❌ Error fetching data:", error);
      setError(error.message);
      
      // ✅ Set fallback domains if everything fails
      setDomains([
        "All Categories", "Programming", "Web Design & Development", 
        "Academic Skills", "Marketing", "Design (General)", "Technology"
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filterRoadmapsByDomain = () => {
    console.log("🎯 Filtering by domain:", selectedDomain);
    console.log("📊 Available roadmaps:", roadmaps.length);
    
    if (selectedDomain === "All Categories") {
      const allRoadmaps = roadmaps.slice(0, 6);
      setFilteredRoadmaps(allRoadmaps);
      console.log("✅ Showing all categories:", allRoadmaps.length, "roadmaps");
    } else {
      // ✅ Exact match for domain filtering
      const filtered = roadmaps.filter(roadmap => {
        const match = roadmap.domain === selectedDomain;
        console.log(`🔍 Checking: "${roadmap.domain}" === "${selectedDomain}" = ${match}`);
        return match;
      }).slice(0, 6);
      
      setFilteredRoadmaps(filtered);
      console.log(`✅ Found ${filtered.length} roadmaps for domain: ${selectedDomain}`);
    }
  };

  const handleDomainClick = (domain) => {
    console.log("🖱️ Domain clicked:", domain);
    setSelectedDomain(domain);
  };

  // ✅ Helper functions
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-success';
      case 'Intermediate': return 'bg-warning';
      case 'Advanced': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  if (loading) {
    return (
      <section className='explore-course py-120 bg-main-25 position-relative z-1'>
        <div className='container'>
          <div className='text-center py-5'>
            <div className='spinner-border text-primary mb-3' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
            <p className='text-neutral-500'>Loading popular roadmaps...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='explore-course py-120 bg-main-25 position-relative z-1'>
      <img
        src='assets/images/shapes/shape2.png'
        alt=''
        className='shape six animation-scalation'
      />
      <div className='container'>
        <div className='section-heading text-center'>
          <div className='flex-align d-inline-flex gap-8 mb-16 wow bounceInDown'>
            <span className='text-main-600 text-2xl d-flex'>
              <i className='ph-bold ph-book' />
            </span>
            <h5 className='text-main-600 mb-0'>Popular Roadmaps</h5>
          </div>
          <h2 className='mb-24 wow bounceIn'>Pick A Roadmap To Get Started</h2>
          <p className=' wow bounceInUp'>
            Discover structured learning paths created by industry experts to accelerate your journey
          </p>
        </div>

        {error && (
          <div className='alert alert-warning text-center mb-4'>
            <p className='mb-2'>⚠️ {error}</p>
            <small>Showing available roadmaps...</small>
          </div>
        )}

        <div className='text-center'>
          <div
            className='nav-tab-wrapper bg-white p-16 mb-40 d-inline-block'
            data-aos='zoom-out'
          >
            <ul
              className='nav nav-pills common-tab edit gap-16'
              id='pills-tab'
              role='tablist'
            >
              {/* ✅ Dynamic domain tabs - limit to 6 for UI */}
              {domains.slice(0, 6).map((domain, index) => (
                <li key={domain} className='nav-item' role='presentation'>
                  <button
                    className={`nav-link rounded-pill bg-main-25 text-md fw-medium text-neutral-500 flex-center w-100 gap-8 ${
                      selectedDomain === domain ? 'active' : ''
                    }`}
                    onClick={() => handleDomainClick(domain)}
                    type='button'
                  >
                    <i className={`text-xl d-flex ${domainIcons[domain] || 'ph-bold ph-squares-four'}`} />
                    {domain.length > 12 ? domain.substring(0, 12) + "..." : domain}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ✅ Dynamic content */}
        <div className='tab-content' id='pills-tabContent'>
          <div className='tab-pane fade show active'>
            <div className='row gy-4'>
              {filteredRoadmaps.length > 0 ? (
                filteredRoadmaps.map((roadmap) => (
                  <div
                    key={roadmap._id}
                    className='col-lg-4 col-sm-6 wow fadeInUp'
                    data-aos='fade-up'
                  >
                    <div className='scale-hover-item bg-white rounded-16 p-12 h-100 border border-neutral-30 box-shadow-md hover-box-shadow-lg transition-2'>
                      <div className='course-item__thumb rounded-12 overflow-hidden position-relative mb-3'>
                        <Link to={`/roadmap/${roadmap._id}`} className='w-100 h-100 d-flex'>
                          <img
                            src={roadmap.thumbnail || 'assets/images/thumbs/roadmap-default.jpg'}
                            alt={roadmap.title}
                            className='scale-hover-item__img rounded-12 cover-img transition-2 w-100'
                            style={{ height: '220px', objectFit: 'cover' }}
                            onError={(e) => {
                              e.target.src = 'assets/images/thumbs/course-img1.png';
                            }}
                          />
                        </Link>
                        
                        {/* ✅ Difficulty badge */}
                        <span className={`position-absolute top-3 end-3 badge text-white px-2 py-1 ${getDifficultyColor(roadmap.difficulty)}`}>
                          {roadmap.difficulty}
                        </span>
                      </div>

                      <div className='pt-32 pb-24 px-16'>
                        {/* ✅ Domain tag */}
                        <div className='flex-align gap-8 mb-12'>
                          <span className='badge bg-main-100 text-main-600 px-2 py-1 text-xs'>
                            {roadmap.domain}
                          </span>
                        </div>

                        {/* ✅ Title */}
                        <h4 className='mb-16'>
                          <Link 
                            to={`/roadmap/${roadmap._id}`} 
                            className='link text-line-2 hover-text-main-600 transition-1'
                          >
                            {truncateText(roadmap.title, 50)}
                          </Link>
                        </h4>

                        {/* ✅ Description */}
                        <p className='text-neutral-500 text-sm mb-20 text-line-3'>
                          {truncateText(roadmap.description, 100)}
                        </p>

                        {/* ✅ Meta info */}
                        <div className='flex-between gap-8 mb-20'>
                          <div className='flex-align gap-8'>
                            <i className='ph-bold ph-clock text-warning' />
                            <span className='text-neutral-600 text-sm'>{roadmap.duration} weeks</span>
                          </div>
                          <div className='flex-align gap-8'>
                            <i className='ph-bold ph-fire text-danger' />
                            <span className='text-neutral-600 text-sm'>{roadmap.steps?.length || 0} steps</span>
                          </div>
                        </div>

                        {/* ✅ Instructor info */}
                        <div className='flex-between gap-8 pt-20 border-top border-neutral-50'>
                          <div className='flex-align gap-8'>
                            <img
                              src={roadmap.createdBy?.profilePicture || 'assets/images/users/user-img1.png'}
                              alt={roadmap.createdBy?.name || 'Instructor'}
                              className='rounded-circle'
                              style={{ width: '28px', height: '28px', objectFit: 'cover' }}
                              onError={(e) => {
                                e.target.src = 'assets/images/users/user-img1.png';
                              }}
                            />
                            <div>
                              <p className='mb-0 text-sm fw-medium text-neutral-700'>
                                {roadmap.createdBy?.name || 'Anonymous'}
                              </p>
                            </div>
                          </div>
                          
                          <Link
                            to={`/roadmap/${roadmap._id}`}
                            className='flex-align gap-8 text-main-600 hover-text-decoration-underline transition-1 fw-semibold text-sm'
                          >
                            View <i className='ph ph-arrow-right' />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className='col-12 text-center py-5'>
                  <div className='mb-3'>
                    <i className='ph-light ph-map-trifold text-4xl text-neutral-300'></i>
                  </div>
                  <h5 className='text-neutral-500 mb-3'>No roadmaps found for "{selectedDomain}"</h5>
                  <p className='text-neutral-400 mb-3'>Try selecting a different domain or check back later.</p>
                  <button 
                    className='btn btn-outline-primary btn-sm'
                    onClick={() => handleDomainClick("All Categories")}
                  >
                    View All Categories
                  </button>
                </div>
              )}
            </div>

            {/* ✅ See All Roadmaps Button */}
            <div className='text-center mt-64'>
              {/* <Link
                to='/roadmaps'
                className='btn btn-main rounded-pill flex-center gap-8 d-inline-flex'
              >
                See All Roadmaps
                <i className='ph-bold ph-arrow-right text-xl' />
              </Link> */}
              <button
                onClick={handleRoadmapsClick}
                className='btn btn-main rounded-pill flex-center gap-8 d-inline-flex'
              >
                See All Roadmaps
                <i className='ph-bold ph-arrow-right text-xl' />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Custom styles */}
      <style jsx>{`
        .text-line-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .text-line-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .hover-box-shadow-lg:hover {
          box-shadow: 0 1rem 3rem rgba(0,0,0,.175) !important;
          transform: translateY(-4px);
        }
        
        .transition-2 {
          transition: all 0.3s ease;
        }
        
        .hover-text-main-600:hover {
          color: var(--bs-primary) !important;
        }
      `}</style>
    </section>
  );
};

export default ExploreCourseTwo;