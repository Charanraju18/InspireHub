// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const VisualRoadmapSteps = ({ steps }) => {
//   const roadmapContainerRef = useRef(null);
//   // Initialize with a default width, will be updated by useEffect
//   const [containerDimensions, setContainerDimensions] = useState({ width: 1000, height: 400 });

//   useEffect(() => {
//     const roadline = document.querySelector(".roadline");
//     const roadmapSteps = document.querySelectorAll(".roadmap-step");

//     if (steps.length > 0) {
//       if (roadline) {
//         roadline.style.animation = "slideInRoadline 3s ease-out forwards";
//       }

//       roadmapSteps.forEach((step, index) => {
//         setTimeout(() => {
//           step.classList.add("animated");
//         }, index * 400);
//       });
//     }

//     // Function to update container dimensions
//     const updateContainerDimensions = () => {
//       if (roadmapContainerRef.current) {
//         setContainerDimensions({
//           width: roadmapContainerRef.current.offsetWidth,
//           height: roadmapContainerRef.current.offsetHeight,
//         });
//       }
//     };

//     // Set initial dimensions and add resize listener
//     updateContainerDimensions();
//     window.addEventListener("resize", updateContainerDimensions);

//     // Cleanup listener on component unmount
//     return () => window.removeEventListener("resize", updateContainerDimensions);
//   }, [steps]); // Re-run if steps change to adjust dimensions if height changes

//   // Roadline properties from CSS (centralized for calculation)
//   const roadlineAngleDegrees = -23;
//   const roadlineAngleRadians = roadlineAngleDegrees * (Math.PI / 180);
//   const roadlineHeightPx = 40;
//   const roadlineInitialTopPercent = 85; // This is the 'top' CSS property
//   const roadlineTranslateYPercent = -50; // This is the translateY of the roadline itself

//   // Desired gap between the bottom of the step circle and the roadline
//   const desiredGapPx = 5; // Aiming for exactly 5px gap

//   // Constants for step circle dimensions
//   const stepCircleHeightPx = 50;

//   // Calculate dynamic height for the container based on steps, ensuring min height
//   const containerHeightStyle = `${Math.max(400, 200 + steps.length * 80)}px`;

//   return (
//     <div
//       ref={roadmapContainerRef} // Assign ref to the container
//       className="roadmap-container"
//       style={{
//         position: "relative",
//         width: "100%",
//         maxWidth: "1000px",
//         height: containerHeightStyle, // Use dynamic height
//         margin: "2rem auto",
//         background: "blue",
//         borderRadius: "12px",
//         boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//         padding: "20px",
//         overflow: "hidden", // Still hide overflow if any
//       }}
//     >
//       <style>
//         {`
//           @keyframes slideInRoadline {
//             0% { width: 0; opacity: 0; }
//             100% { width: 100%; opacity: 1; }
//           }

//           @keyframes fadeInStep {
//             0% { opacity: 0; transform: translateY(30px); }
//             100% { opacity: 1; transform: translateY(0); }
//           }

//           .roadmap-step.animated {
//             animation: fadeInStep 1.5s ease-out forwards;
//           }

//           /* Default styles for step elements */
//           .step-circle {
//             width: ${stepCircleHeightPx}px; /* Use constant */
//             height: ${stepCircleHeightPx}px; /* Use constant */
//             border-radius: 50%;
//             background-color: #007bff;
//             color: #fff;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             font-size: 18px;
//             font-weight: bold;
//             margin-bottom: 10px;
//             box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//           }

//           .step-bubble {
//             background: #fff;
//             border-radius: 8px;
//             padding: 10px 15px;
//             box-shadow: "0 4px 6px rgba(0, 0, 0, 0.1)";
//             text-align: center;
//             font-size: 14px;
//             max-width: 200px;
//             word-wrap: break-word;
//             overflow: hidden;
//           }

//           /* Roadline styling - fixed to the container */
//           .roadline {
//             position: absolute;
//             top: ${roadlineInitialTopPercent}%;
//             left: 0;
//             width: 100%;
//             height: ${roadlineHeightPx}px;
//             background: linear-gradient(to right, #3b3b3b, #1c1c1c);
//             box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
//             transform: translateY(${roadlineTranslateYPercent}%) rotate(${roadlineAngleDegrees}deg);
//             transform-origin: left center;
//             z-index: 1;
//           }

//           .lane-divider {
//             position: absolute;
//             top: 50%;
//             left: 0;
//             width: 100%;
//             height: 4px;
//             background: repeating-linear-gradient(to right, transparent, transparent 15px, white 15px, white 30px);
//             transform: translateY(-50%);
//           }

//           /* Media queries for responsiveness */
//           @media (min-width: 768px) {
//             .roadmap-step {
//                 position: absolute;
//                 display: flex;
//                 flex-direction: column;
//                 align-items: center;
//                 transform: translate(-50%, 0); /* Center based on its own width */
//                 z-index: 10;
//                 opacity: 0;
//             }
//           }

//           @media (max-width: 767px) {
//             .roadmap-container {
//               max-width: 100%;
//               height: auto;
//               min-height: auto;
//               padding: 10px;
//               display: flex;
//               flex-direction: column;
//               align-items: center;
//               overflow: visible;
//             }

//             .roadline {
//               display: none;
//             }

//             .roadmap-step {
//               position: relative !important;
//               top: unset !important;
//               left: unset !important;
//               transform: translateX(0) !important;
//               margin-bottom: 40px;
//               opacity: 1 !important;
//               padding-left: 0;
//             }
//             .roadmap-step:last-child {
//                 margin-bottom: 0;
//             }

//             .step-bubble {
//               max-width: 90%;
//               font-size: 12px;
//               padding: 8px;
//             }

//             .step-circle {
//               width: 40px;
//               height: 40px;
//               font-size: 16px;
//             }
//           }
//         `}
//       </style>

//       <div className="roadline">
//         <div className="lane-divider"></div>
//       </div>

//       {steps.map((step, index) => {
//         // Calculate horizontal position for the step (center of step)
//         const horizontalSpreadFactor = 100 / (steps.length + 1);
//         const leftPositionPercentage = (index + 0.5) * horizontalSpreadFactor;
//         const leftPosition = `${leftPositionPercentage}%`;

//         // Calculate the X position in pixels relative to the container's *content area*
//         // account for padding of 20px on each side.
//         const effectiveContainerWidth = containerDimensions.width - 40; // 20px left + 20px right padding
//         const stepXCenterPx = (leftPositionPercentage / 100) * effectiveContainerWidth + 20; // Add left padding back

//         // Calculate the Y position of the roadline's top edge at this X
//         // Y_roadline_top_edge_at_X = (Roadline's 'top' CSS in px) + (offset from rotation)
//         const roadlineAbsoluteTopPx = (roadlineInitialTopPercent / 100) * containerDimensions.height;
//         const roadlineTranslateYPx = (roadlineHeightPx * roadlineTranslateYPercent) / 100;

//         // Visual Y of the roadline's pivot point (left center) relative to container's top
//         const roadlinePivotY = roadlineAbsoluteTopPx + roadlineTranslateYPx;

//         // Y displacement due to rotation at stepXCenterPx
//         // Note: tan() returns positive for angles in Q1/Q3, negative for Q2/Q4.
//         // Our angle is -23deg (Q4), so tan will be negative, meaning Y decreases as X increases.
//         // The roadline is descending from left to right.
//         const yOffsetDueToRotation = stepXCenterPx * Math.tan(roadlineAngleRadians);

//         // The Y coordinate of the roadline's *center line* at this step's X
//         const roadlineCenterYAtStepX = roadlinePivotY + yOffsetDueToRotation;

//         // We want the *bottom of the step circle* to be `desiredGapPx` above the roadline's center line.
//         // So, target Y for the bottom of the step circle is `roadlineCenterYAtStepX - desiredGapPx`.
//         const targetStepCircleBottomY = roadlineCenterYAtStepX - desiredGapPx;

//         // The 'top' CSS property positions the *top* of the element.
//         // So, step's top = (target Y for bottom of circle) - (height of step circle)
//         const topPositionPx = targetStepCircleBottomY - stepCircleHeightPx;

//         // Convert calculated pixel topPosition back to percentage for CSS
//         const topPosition = `${(topPositionPx / containerDimensions.height) * 100}%`;

//         return (
//           <div
//             key={step._id}
//             className="roadmap-step"
//             style={{
//               top: topPosition,
//               left: leftPosition,
//             }}
//           >
//             <div className="step-circle">{index + 1}</div>
//             <div className="step-bubble">
//               <strong>{step.title}</strong>
//               <p>{step.description}</p>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// const RoadmapDetails = () => {
//   const { id } = useParams();
//   const [roadmap, setRoadmap] = React.useState(null);
//   const [loading, setLoading] = React.useState(true);

//   useEffect(() => {
//     const fetchRoadmap = async () => {
//       try {
//         const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/roadmaps/${id}`);
//         setRoadmap(res.data);
//       } catch (error) {
//         console.error("Failed to fetch roadmap", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRoadmap();
//   }, [id]);

//   if (loading) return <p className="text-center mt-5">Loading roadmap...</p>;
//   if (!roadmap)
//     return <p className="text-center mt-5 text-danger">Roadmap not found</p>;

//   return (
//     <div className="container py-5">
//       <div className="mt-4 steps-container">
//         <h4
//           style={{ textAlign: "center", marginBottom: "", color: "#333" }}
//         >
//           Steps
//         </h4>
//         <VisualRoadmapSteps steps={roadmap.steps} />
//       </div>
//     </div>
//   );
// };

// export default RoadmapDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VisualRoadmapSteps = ({ steps }) => {
  return (
    <div className="roadmap-wrapper">
      <style>
        {`
          .roadmap-wrapper {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1rem;
          }

          .roadmap-timeline {
            position: relative;
            padding: 2rem 0;
          }

          /* Timeline line */
          .timeline-line {
            position: absolute;
            left: 50%;
            top: 0;
            bottom: 0;
            width: 4px;
            background: linear-gradient(to bottom, #007bff, #28a745);
            transform: translateX(-50%);
            border-radius: 2px;
            opacity: 0;
            animation: drawLine 2s ease-out 0.5s forwards;
          }

          @keyframes drawLine {
            to {
              opacity: 1;
              height: 100%;
            }
          }

          /* Step container */
          .roadmap-step {
            position: relative;
            margin-bottom: 4rem;
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInStep 0.8s ease-out forwards;
          }

          .roadmap-step:nth-child(odd) {
            animation-delay: 0.2s;
          }

          .roadmap-step:nth-child(even) {
            animation-delay: 0.4s;
          }

          @keyframes fadeInStep {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Step content layout */
          .step-content {
            display: flex;
            align-items: center;
            gap: 2rem;
          }

          .roadmap-step:nth-child(even) .step-content {
            flex-direction: row-reverse;
          }

          /* Step circle */
          .step-circle {
            position: relative;
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #007bff, #0056b3);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.5rem;
            font-weight: 700;
            box-shadow: 0 8px 25px rgba(0, 123, 255, 0.3);
            border: 4px solid #fff;
            z-index: 10;
            flex-shrink: 0;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .step-circle:hover {
            transform: scale(1.1);
            box-shadow: 0 12px 35px rgba(0, 123, 255, 0.4);
          }

          /* Step card */
          .step-card {
            flex: 1;
            background: #fff;
            border-radius: 16px;
            padding: 2rem;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            border: 1px solid #e9ecef;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            position: relative;
            overflow: hidden;
          }

          .step-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #007bff, #28a745);
          }

          .step-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          }

          .step-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 1rem;
            line-height: 1.3;
          }

          .step-description {
            color: #6c757d;
            line-height: 1.6;
            font-size: 1rem;
            margin: 0;
          }

          /* Connector line between circle and card */
          .step-connector {
            width: 60px;
            height: 2px;
            background: #dee2e6;
            position: relative;
            flex-shrink: 0;
          }

          .step-connector::after {
            content: '';
            position: absolute;
            top: -4px;
            right: -8px;
            width: 0;
            height: 0;
            border-left: 8px solid #dee2e6;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
          }

          .roadmap-step:nth-child(even) .step-connector::after {
            right: auto;
            left: -8px;
            border-left: none;
            border-right: 8px solid #dee2e6;
          }

          /* Mobile Responsive - Major Improvements */
          @media (max-width: 768px) {
            .roadmap-wrapper {
              padding: 1rem 0.75rem;
            }

            .roadmap-timeline {
              padding: 1rem 0;
            }

            /* Mobile timeline - left side */
            .timeline-line {
              left: 30px;
              transform: none;
              width: 3px;
              background: linear-gradient(to bottom, #007bff, #28a745);
            }

            .roadmap-step {
              margin-bottom: 2rem;
              padding-left: 0;
            }

            .roadmap-step:last-child {
              margin-bottom: 1rem;
            }

            /* Mobile layout - all steps left aligned */
            .step-content {
              flex-direction: row !important;
              gap: 1rem;
              align-items: flex-start;
              padding-left: 0;
            }

            .roadmap-step:nth-child(even) .step-content {
              flex-direction: row !important;
            }

            .step-circle {
              width: 60px;
              height: 60px;
              font-size: 1.25rem;
              font-weight: 700;
              margin-left: 0;
              flex-shrink: 0;
              box-shadow: 0 6px 20px rgba(0, 123, 255, 0.25);
              border: 3px solid #fff;
            }

            .step-connector {
              display: none;
            }

            .step-card {
              padding: 1.25rem;
              margin-left: 0;
              border-radius: 12px;
              box-shadow: 0 6px 25px rgba(0, 0, 0, 0.08);
              background: #fff;
            }

            .step-card::before {
              height: 3px;
            }

            .step-title {
              font-size: 1.15rem;
              font-weight: 600;
              margin-bottom: 0.75rem;
              line-height: 1.4;
            }

            .step-description {
              font-size: 0.9rem;
              line-height: 1.5;
              color: #5a6c7d;
            }
          }

          /* Small mobile devices */
          @media (max-width: 480px) {
            .roadmap-wrapper {
              padding: 0.75rem 0.5rem;
            }

            .timeline-line {
              left: 25px;
              width: 2px;
            }

            .step-content {
              gap: 0.75rem;
            }

            .step-circle {
              width: 50px;
              height: 50px;
              font-size: 1.1rem;
              border: 2px solid #fff;
            }

            .step-card {
              padding: 1rem;
              border-radius: 10px;
            }

            .step-title {
              font-size: 1rem;
              font-weight: 600;
              margin-bottom: 0.5rem;
            }

            .step-description {
              font-size: 0.85rem;
              line-height: 1.4;
            }
          }

          /* Extra small devices */
          @media (max-width: 360px) {
            .roadmap-wrapper {
              padding: 0.5rem 0.25rem;
            }

            .timeline-line {
              left: 20px;
            }

            .step-content {
              gap: 0.5rem;
            }

            .step-circle {
              width: 45px;
              height: 45px;
              font-size: 1rem;
            }

            .step-card {
              padding: 0.875rem;
            }

            .step-title {
              font-size: 0.95rem;
            }

            .step-description {
              font-size: 0.8rem;
            }
          }

          /* Loading state */
          .roadmap-loading {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 400px;
            flex-direction: column;
            gap: 1rem;
          }

          .loading-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #007bff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          /* Empty state */
          .roadmap-empty {
            text-align: center;
            padding: 3rem 1rem;
            color: #6c757d;
          }

          .empty-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
            opacity: 0.5;
          }

          /* Mobile empty state */
          @media (max-width: 768px) {
            .roadmap-empty {
              padding: 2rem 1rem;
            }

            .empty-icon {
              font-size: 2.5rem;
            }

            .roadmap-empty h3 {
              font-size: 1.25rem;
            }

            .roadmap-empty p {
              font-size: 0.9rem;
            }
          }

          /* Disable animations on mobile for better performance */
          @media (max-width: 768px) and (prefers-reduced-motion: no-preference) {
            .step-circle {
              animation: none;
            }
          }
        `}
      </style>

      <div className="roadmap-timeline">
        <div className="timeline-line"></div>

        {steps && steps.length > 0 ? (
          steps.map((step, index) => (
            <div key={step._id || index} className="roadmap-step">
              <div className="step-content">
                <div className="step-circle">{index + 1}</div>
                <div className="step-connector"></div>
                <div className="step-card">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="roadmap-empty">
            <div className="empty-icon">🗺️</div>
            <h3>No Steps Available</h3>
            <p>This roadmap doesn't have any steps defined yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const RoadmapDetails = () => {
  const { id } = useParams();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/roadmaps/${id}`);
        setRoadmap(res.data);
      } catch (error) {
        console.error("Failed to fetch roadmap", error);
        setError("Failed to load roadmap. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRoadmap();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="roadmap-loading">
          <div className="loading-spinner"></div>
          <p>Loading roadmap...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Error</h4>
            <p>{error}</p>
            <button
              className="btn btn-outline-danger"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="alert alert-warning" role="alert">
            <h4 className="alert-heading">Not Found</h4>
            <p>The requested roadmap could not be found.</p>
            <a href="/roadmaps" className="btn btn-outline-warning">
              Browse All Roadmaps
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container-fluid py-5"
      style={{
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Header Section - Mobile Responsive */}
      <div className="container">
        <div className="text-center mb-4 mb-md-5">
          <h1
            className="fw-bold text-dark mb-3"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              lineHeight: "1.2",
            }}
          >
            {roadmap.title}
          </h1>
          {roadmap.description && (
            <p
              className="text-muted mx-auto"
              style={{
                fontSize: "clamp(0.9rem, 2.5vw, 1.25rem)",
                maxWidth: "800px",
                lineHeight: "1.5",
              }}
            >
              {roadmap.description}
            </p>
          )}
          <div className="d-flex justify-content-center align-items-center gap-2 gap-md-3 mt-3 mt-md-4 flex-wrap">
            <span
              className="badge bg-primary px-3 py-2"
              style={{ fontSize: "clamp(0.75rem, 2vw, 1rem)" }}
            >
              {roadmap.steps?.length || 0} Steps
            </span>
            <span
              className="badge bg-success px-3 py-2"
              style={{ fontSize: "clamp(0.75rem, 2vw, 1rem)" }}
            >
              {roadmap.difficulty || "Beginner"} Level
            </span>
          </div>
        </div>
      </div>

      {/* Roadmap Steps */}
      <div className="steps-container">
        <VisualRoadmapSteps steps={roadmap.steps || []} />
      </div>
    </div>
  );
};

export default RoadmapDetails;
