// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// // This component handles the visual roadmap steps and their precise alignment with the roadline.
// const VisualRoadmapSteps = ({ steps }) => {
//   const roadmapContainerRef = useRef(null);
//   const [containerDimensions, setContainerDimensions] = useState({ width: 1000, height: 400 });
//   const [hoveredStepId, setHoveredStepId] = useState(null); // State to track which step is hovered

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

//     const updateContainerDimensions = () => {
//       if (roadmapContainerRef.current) {
//         setContainerDimensions({
//           width: roadmapContainerRef.current.offsetWidth,
//           height: roadmapContainerRef.current.offsetHeight,
//         });
//       }
//     };

//     updateContainerDimensions();
//     window.addEventListener("resize", updateContainerDimensions);

//     return () => window.removeEventListener("resize", updateContainerDimensions);
//   }, [steps]);

//   const roadlineAngleDegrees = -23;
//   const roadlineAngleRadians = roadlineAngleDegrees * (Math.PI / 180);
//   const roadlineHeightPx = 40;
//   const roadlineInitialTopPercent = 65;
//   const roadlineTranslateYPercent = -50;
//   const desiredGapPx = 5;
//   const stepCircleHeightPx = 50;
//   const containerHeightStyle = `${Math.max(400, 200 + steps.length * 80)}px`;

//   return (
//     <div
//       ref={roadmapContainerRef}
//       className="roadmap-container"
//       style={{
//         position: "relative",
//         width: "100%",
//         maxWidth: "1000px",
//         height: containerHeightStyle,
//         margin: "2rem auto",
//         background: "#F3F9FF", // Deep blue background
//         borderRadius: "12px",
//         boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//         padding: "20px",
//         overflow: "hidden",
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

//           .roadmap-step {
//             cursor: pointer; /* Indicate interactivity */
//             position: relative; /* Essential for positioning the tooltip relative to the step */
//           }

//           .step-circle {
//             width: ${stepCircleHeightPx}px;
//             height: ${stepCircleHeightPx}px;
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
//             z-index: 20; /* Ensure circle is above tooltip when rendered */
//           }

//           .step-bubble {
//             background: #fff;
//             border-radius: 8px;
//             padding: 10px 15px;
//             box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//             text-align: center;
//             font-size: 14px;
//             max-width: 200px;
//             word-wrap: break-word;
//             overflow: hidden;
//             color: #333;
//             z-index: 20; /* Ensure bubble is above tooltip when rendered */
//           }

//           .roadline {
//             position: absolute;
//             top: ${roadlineInitialTopPercent}%;
//             left: 0;
//             width: 100%;
//             height: ${roadlineHeightPx}px;
//             background: linear-gradient(to right, #3b3b3b, #1c1c1c); /* Darker gradient for black road */
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

//           .step-tooltip {
//             position: absolute;
//             background: rgba(0, 0, 0, 0.8);
//             color: white;
//             padding: 10px;
//             border-radius: 5px;
//             font-size: 12px;
//             z-index: 999; /* Increased z-index to ensure it appears on top */
//             width: auto; /* Allow content to dictate width */
//             max-width: 400px; /* Increased max-width for longer descriptions */
//             word-wrap: break-word; /* Ensure long words break */
//             pointer-events: none; /* Allows clicks to pass through to elements behind it */
//             opacity: 0; /* Start hidden */
//             transition: opacity 0.2s ease-in-out; /* Smooth fade in/out */
//           }

//           .roadmap-step:hover .step-tooltip {
//             opacity: 1; /* Show on hover */
//           }

//           @media (min-width: 768px) {
//             .roadmap-step {
//                 position: absolute;
//                 display: flex;
//                 flex-direction: column;
//                 align-items: center;
//                 transform: translate(-50%, 0);
//                 z-index: 10;
//                 opacity: 0; /* Controlled by animation */
//             }

//             /* Positioning for desktop tooltip */
//             .step-tooltip {
//               transform: translateX(-50%); /* Center horizontally relative to step */
//               top: 100%; /* Position below the step */
//               left: 50%;
//               margin-top: 10px; /* Gap between step and tooltip */
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
//               overflow: visible; /* Allow content to overflow if needed */
//             }

//             .roadline {
//               display: none; /* Hide roadline on small screens */
//             }

//             .roadmap-step {
//               position: relative !important; /* Override absolute positioning */
//               top: unset !important;
//               left: unset !important;
//               transform: translateX(0) !important;
//               margin-bottom: 40px;
//               opacity: 1 !important; /* Always visible on small screens */
//               padding-left: 0;
//               align-items: center; /* Center content horizontally */
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

//             /* Positioning for mobile tooltip - appears below the step */
//             .step-tooltip {
//               position: relative; /* Position relative to the step */
//               background: rgba(0, 0, 0, 0.8);
//               color: white;
//               padding: 8px;
//               border-radius: 5px;
//               font-size: 10px;
//               margin-top: 5px; /* Gap between bubble and tooltip */
//               width: 90%; /* Take up most of the width */
//               max-width: 90%;
//               transform: none; /* Reset desktop transform */
//               left: auto;
//               right: auto;
//               text-align: left;
//             }
//           }
//         `}
//       </style>

//       <div className="roadline">
//         <div className="lane-divider"></div>
//       </div>

//       {steps.map((step, index) => {
//         const horizontalSpreadFactor = 100 / (steps.length + 1);
//         const leftPositionPercentage = (index + 0.5) * horizontalSpreadFactor;
//         const leftPosition = `${leftPositionPercentage}%`;

//         // Calculate the effective width of the container excluding padding
//         const effectiveContainerWidth = containerDimensions.width - 40;
//         // Calculate the x-center position of the step in pixels relative to the container's inner content area
//         const stepXCenterPx = (leftPositionPercentage / 100) * effectiveContainerWidth + 20;

//         // Calculate the absolute top position of the roadline's origin (left center) in pixels
//         const roadlineAbsoluteTopPx = (roadlineInitialTopPercent / 100) * containerDimensions.height;
//         // Adjust for the roadline's translateY transformation to find its actual pivot point
//         const roadlineTranslateYPx = (roadlineHeightPx * roadlineTranslateYPercent) / 100;
//         const roadlinePivotY = roadlineAbsoluteTopPx + roadlineTranslateYPx;

//         // Calculate the y-offset due to the roadline's rotation at the step's x-position
//         const yOffsetDueToRotation = stepXCenterPx * Math.tan(roadlineAngleRadians);
//         // Calculate the y-coordinate of the roadline's center at the step's x-position
//         const roadlineCenterYAtStepX = roadlinePivotY + yOffsetDueToRotation;

//         // Calculate the target bottom y-coordinate for the step circle to be desiredGapPx above the roadline
//         const targetStepCircleBottomY = roadlineCenterYAtStepX - desiredGapPx;
//         // Calculate the top position of the step in pixels, considering the circle's height
//         const topPositionPx = targetStepCircleBottomY - stepCircleHeightPx;
//         // Convert the top position back to percentage relative to the container's height
//         const topPosition = `${(topPositionPx / containerDimensions.height) * 100}%`;

//         // Truncate description for display in the bubble
//         const shortDescription =
//           step.description.length > 50
//             ? `${step.description.substring(0, 50)}...`
//             : step.description;

//         return (
//           <div
//             key={step._id}
//             className="roadmap-step"
//             style={{
//               top: topPosition,
//               left: leftPosition,
//             }}
//             onMouseEnter={() => setHoveredStepId(step._id)} // Set hovered step ID on mouse enter
//             onMouseLeave={() => setHoveredStepId(null)} // Clear hovered step ID on mouse leave
//           >
//             <div className="step-circle">{index + 1}</div>
//             <div className="step-bubble">
//               <strong>{step.title}</strong>
//               <p>{shortDescription}</p>
//             </div>
//             {/* Conditional rendering of the full description tooltip */}
//             {hoveredStepId === step._id && (
//               <div className="step-tooltip">
//                 <strong>{step.title}</strong>
//                 <p>{step.description}</p>
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// const RoadmapDetails = () => {
//   const { id } = useParams();
//   const [roadmap, setRoadmap] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRoadmap = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/roadmaps/${id}`);
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
//       {/* Top Section - User Profile, Bookmark Icon */}
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
//         {/* User Profile */}
//         <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
//                <img
//                             src={roadmap.createdBy?.profilePicture || "/assets/images/users/user-img1.png"}
//                             alt={roadmap.createdBy?.name || "Instructor"}
//                             className="rounded-circle"
//                             style={{ width: "75px", height: "75px", objectFit: "cover" }}
//                             onError={(e) => {
//                               e.target.src = "/assets/images/users/user-img1.png";
//                             }}
//                           />
//           <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
// <p className="mb-0 text-sm fw-medium text-neutral-700" style={{ fontSize: "25px", color: "#666" , fontWeight: "400"}}>
//                               {roadmap.createdBy?.name || "Anonymous"}
//                             </p>
//             <p className="mb-0" style={{ fontSize: "18px", color: "#666" }}>
//                               {roadmap.createdBy.instructorProfile.experienceYears} years exp.
//                             </p>
//           </div>
//         </div>

//         {/* Bookmark Icon */}
//         <div style={{ fontSize: "30px", color: "#007bff" }}>
//           {/* A simple placeholder for a bookmark icon. In a real app, you'd use an SVG or font icon library */}
//           &#9829; {/* Heart icon as a placeholder */}
//           <span style={{ fontSize: "14px", verticalAlign: "top", marginLeft: "5px" }}>Bookmark icon</span>
//         </div>
//       </div>

//       {/* Title */}
//       <div style={{ borderBottom: "1px solid #333", paddingBottom: "10px", marginBottom: "20px" }}>
//         <h2 className="mb-0" style={{ color: "#333" }}>{roadmap.title}</h2>
//       </div>

//       {/* Description */}
//       <div style={{padding: "15px", marginBottom: "30px", minHeight: "100px", background: "#f8f8f8" }}>
//         {/* <h4 style={{ color: "#555", marginBottom: "10px" }}>Description</h4> */}
//         <p>{roadmap.description}</p>
//       </div>

//       {/* Left Column (Domain, Difficulty etc.) and Right Column (Steps Animation) */}
//       <div style={{ display: "flex", gap: "30px", flexDirection: "row" }}>
//         {/* Left Column */}
//        <div
//   style={{
//     flex: 1,
//     border: "2px solid #dedede",
//     padding: "20px",
//     borderRadius: "12px",
//     background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
//     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//     transition: "transform 0.3s ease, box-shadow 0.3s ease",
//     animation: "fadeIn 1s ease-out",
//   }}
//   onMouseEnter={(e) => {
//     e.currentTarget.style.transform = "scale(1.02)";
//     e.currentTarget.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.2)";
//   }}
//   onMouseLeave={(e) => {
//     e.currentTarget.style.transform = "scale(1)";
//     e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
//   }}
// >
//   <style>
//     {`
//       @keyframes fadeIn {
//         0% { opacity: 0; transform: translateY(10px); }
//         100% { opacity: 1; transform: translateY(0); }
//       }
//     `}
//   </style>

//   {/* Domain */}
//   <div
//     style={{
//       marginBottom: "20px",
//       borderBottom: "2px solid #eaeaea",
//       paddingBottom: "12px",
//     }}
//   >
//     <h5 style={{ color: "#007bff", marginBottom: "8px", fontWeight: "600" }}>
//       Domain:
//     </h5>
//     <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
//       {roadmap.domain}
//     </p>
//   </div>

//   {/* Difficulty */}
//   <div
//     style={{
//       marginBottom: "20px",
//       borderBottom: "2px solid #eaeaea",
//       paddingBottom: "12px",
//     }}
//   >
//     <h5 style={{ color: "#007bff", marginBottom: "8px", fontWeight: "600" }}>
//       Difficulty:
//     </h5>
//     <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
//       {roadmap.difficulty}
//     </p>
//   </div>

//   {/* Estimated Duration */}
//   <div
//     style={{
//       marginBottom: "20px",
//       borderBottom: "2px solid #eaeaea",
//       paddingBottom: "12px",
//     }}
//   >
//     <h5 style={{ color: "#007bff", marginBottom: "8px", fontWeight: "600" }}>
//       Estimated Duration:
//     </h5>
//     <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
//       {roadmap.estimatedDurationWeeks} weeks
//     </p>
//   </div>

//   {/* Prerequisites */}
//   <div
//     style={{
//       marginBottom: "20px",
//       borderBottom: "2px solid #eaeaea",
//       paddingBottom: "12px",
//     }}
//   >
//     <h5 style={{ color: "#007bff", marginBottom: "8px", fontWeight: "600" }}>
//       Prerequisites:
//     </h5>
//     <ul style={{ listStyleType: "none", paddingLeft: "0", margin: 0 }}>
//       {roadmap.prerequisites.map((pre, idx) => (
//         <li
//           key={idx}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "8px",
//             marginBottom: "8px",
//             fontSize: "14px",
//             color: "#555",
//           }}
//         >
//           <span
//             style={{
//               width: "8px",
//               height: "8px",
//               borderRadius: "50%",
//               backgroundColor: "#007bff",
//             }}
//           ></span>
//           {pre}
//         </li>
//       ))}
//     </ul>
//   </div>

//   {/* Resources */}
//   <div>
//     <h5 style={{ color: "#007bff", marginBottom: "8px", fontWeight: "600" }}>
//       Resources:
//     </h5>
//     <ul style={{ listStyleType: "none", paddingLeft: "0", margin: 0 }}>
//       {roadmap.tags.map((resource, idx) => (
//         <li
//           key={idx}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "8px",
//             marginBottom: "8px",
//             fontSize: "14px",
//             color: "#555",
//           }}
//         >
//           <span
//             style={{
//               width: "8px",
//               height: "8px",
//               borderRadius: "50%",
//               backgroundColor: "#28a745",
//             }}
//           ></span>
//           {resource}
//         </li>
//       ))}
//     </ul>
//   </div>
// </div>


//         {/* Right Column - Steps Animation (Visual Roadmap Steps Component) */}
//         <div style={{ flex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
//           <h4 style={{ textAlign: "center", marginBottom: "1rem", color: "#333" }}>Pathway</h4> {/* */}
//           <VisualRoadmapSteps steps={roadmap.steps} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RoadmapDetails;




import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// This component handles the visual roadmap steps and their precise alignment with the roadline.
const VisualRoadmapSteps = ({ steps }) => {
  const roadmapContainerRef = useRef(null);
  const [containerDimensions, setContainerDimensions] = useState({ width: 1000, height: 400 });
  const [hoveredStepId, setHoveredStepId] = useState(null); // State to track which step is hovered

  useEffect(() => {
    const roadline = document.querySelector(".roadline");
    const roadmapSteps = document.querySelectorAll(".roadmap-step");

    if (steps.length > 0) {
      if (roadline) {
        roadline.style.animation = "slideInRoadline 3s ease-out forwards";
      }

      roadmapSteps.forEach((step, index) => {
        setTimeout(() => {
          step.classList.add("animated");
        }, index * 400);
      });
    }

    const updateContainerDimensions = () => {
      if (roadmapContainerRef.current) {
        setContainerDimensions({
          width: roadmapContainerRef.current.offsetWidth,
          height: roadmapContainerRef.current.offsetHeight,
        });
      }
    };

    updateContainerDimensions();
    window.addEventListener("resize", updateContainerDimensions);

    return () => window.removeEventListener("resize", updateContainerDimensions);
  }, [steps]);

  const roadlineAngleDegrees = -23;
  const roadlineAngleRadians = roadlineAngleDegrees * (Math.PI / 180);
  const roadlineHeightPx = 40;
  const roadlineInitialTopPercent = 65;
  const roadlineTranslateYPercent = -50;
  const desiredGapPx = 5;
  const stepCircleHeightPx = 50;
  const containerHeightStyle = `${Math.max(400, 200 + steps.length * 80)}px`;

  return (
    <div
      ref={roadmapContainerRef}
      className="roadmap-container"
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "1000px",
        height: containerHeightStyle,
        margin: "2rem auto",
        background: "#F3F9FF", // Deep blue background
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        overflow: "hidden",
      }}
    >
      <style>
        {`
          @keyframes slideInRoadline {
            0% { width: 0; opacity: 0; }
            100% { width: 100%; opacity: 1; }
          }

          @keyframes fadeInStep {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          .roadmap-step.animated {
            animation: fadeInStep 1.5s ease-out forwards;
          }

          .roadmap-step {
            cursor: pointer; /* Indicate interactivity */
            position: relative;
          }

          .step-circle {
            width: ${stepCircleHeightPx}px;
            height: ${stepCircleHeightPx}px;
            border-radius: 50%;
            background-color: #007bff;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 20;
          }

          .step-bubble {
            background: #fff;
            border-radius: 8px;
            padding: 10px 15px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
            font-size: 14px;
            max-width: 200px;
            word-wrap: break-word;
            overflow: hidden; /* Hide overflow initially */
            color: #333;
            z-index: 20;
            max-height: 70px; /* Adjust this initial height as needed to show truncated text */
            transition: max-height 0.3s ease-in-out, background 0.3s ease-in-out;
            position: relative; /* For text truncation ellipsis */
          }

          .step-bubble p {
            white-space: normal; /* Allow text to wrap */
            overflow: hidden;
            text-overflow: ellipsis; /* For truncating text */
            display: -webkit-box;
            -webkit-line-clamp: 2; /* Show 2 lines by default, adjust as needed */
            -webkit-box-orient: vertical;
          }

          .roadmap-step:hover .step-bubble {
            max-height: 300px; /* Or a sufficiently large value to show full content */
            background: #e6f2ff; /* Light blue background on hover */
            text-align: left; /* Adjust text alignment if desired for full text */
          }

          .roadmap-step:hover .step-bubble p {
            -webkit-line-clamp: unset; /* Remove line clamping on hover */
            text-overflow: unset; /* Remove ellipsis on hover */
          }


          .roadline {
            position: absolute;
            top: ${roadlineInitialTopPercent}%;
            left: 0;
            width: 100%;
            height: ${roadlineHeightPx}px;
            background: linear-gradient(to right, #3b3b3b, #1c1c1c); /* Darker gradient for black road */
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
            transform: translateY(${roadlineTranslateYPercent}%) rotate(${roadlineAngleDegrees}deg);
            transform-origin: left center;
            z-index: 1;
          }

          .lane-divider {
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            height: 4px;
            background: repeating-linear-gradient(to right, transparent, transparent 15px, white 15px, white 30px);
            transform: translateY(-50%);
          }

          /* Removed .step-tooltip styles as it's no longer a separate div */

          @media (min-width: 768px) {
            .roadmap-step {
                position: absolute;
                display: flex;
                flex-direction: column;
                align-items: center;
                transform: translate(-50%, 0);
                z-index: 10;
                opacity: 0; /* Controlled by animation */
            }
          }

          @media (max-width: 767px) {
            .roadmap-container {
              max-width: 100%;
              height: auto;
              min-height: auto;
              padding: 10px;
              display: flex;
              flex-direction: column;
              align-items: center;
              overflow: visible;
            }

            .roadline {
              display: none;
            }

            .roadmap-step {
              position: relative !important;
              top: unset !important;
              left: unset !important;
              transform: translateX(0) !important;
              margin-bottom: 40px;
              opacity: 1 !important;
              padding-left: 0;
              align-items: center;
            }
            .roadmap-step:last-child {
                margin-bottom: 0;
            }

            .step-bubble {
              max-width: 90%;
              font-size: 12px;
              padding: 8px;
              text-align: center; /* Keep centered on mobile by default */
              max-height: 70px; /* Keep initial max-height for mobile */
            }

            .step-circle {
              width: 40px;
              height: 40px;
              font-size: 16px;
            }

            /* No specific mobile tooltip positioning needed if using existing bubble */
            .roadmap-step:hover .step-bubble {
              max-height: 300px; /* Allow expansion on hover for mobile too */
              text-align: left; /* Adjust text alignment if desired for full text on mobile */
            }
          }
        `}
      </style>

      <div className="roadline">
        <div className="lane-divider"></div>
      </div>

      {steps.map((step, index) => {
        const horizontalSpreadFactor = 100 / (steps.length + 1);
        const leftPositionPercentage = (index + 0.5) * horizontalSpreadFactor;
        const leftPosition = `${leftPositionPercentage}%`;

        const effectiveContainerWidth = containerDimensions.width - 40;
        const stepXCenterPx = (leftPositionPercentage / 100) * effectiveContainerWidth + 20;

        const roadlineAbsoluteTopPx = (roadlineInitialTopPercent / 100) * containerDimensions.height;
        const roadlineTranslateYPx = (roadlineHeightPx * roadlineTranslateYPercent) / 100;
        const roadlinePivotY = roadlineAbsoluteTopPx + roadlineTranslateYPx;

        const yOffsetDueToRotation = stepXCenterPx * Math.tan(roadlineAngleRadians);
        const roadlineCenterYAtStepX = roadlinePivotY + yOffsetDueToRotation;

        const targetStepCircleBottomY = roadlineCenterYAtStepX - desiredGapPx;
        const topPositionPx = targetStepCircleBottomY - stepCircleHeightPx;
        const topPosition = `${(topPositionPx / containerDimensions.height) * 100}%`;

        return (
          <div
            key={step._id}
            className="roadmap-step"
            style={{
              top: topPosition,
              left: leftPosition,
            }}
            onMouseEnter={() => setHoveredStepId(step._id)}
            onMouseLeave={() => setHoveredStepId(null)}
          >
            <div className="step-circle">{index + 1}</div>
            <div
              className={`step-bubble ${hoveredStepId === step._id ? "hovered" : ""}`}
            >
              <strong>{step.title}</strong>
              <p>{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ... (RoadmapDetails component remains the same as it uses VisualRoadmapSteps)
const RoadmapDetails = () => {
    const { id } = useParams();
    const [roadmap, setRoadmap] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchRoadmap = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/roadmaps/${id}`);
          setRoadmap(res.data);
        } catch (error) {
          console.error("Failed to fetch roadmap", error);
        } finally {
          setLoading(false);
        }
      };

      fetchRoadmap();
    }, [id]);

    if (loading) return <p className="text-center mt-5">Loading roadmap...</p>;
    if (!roadmap)
      return <p className="text-center mt-5 text-danger">Roadmap not found</p>;

    return (
      <div className="container py-5">
        {/* Top Section - User Profile, Bookmark Icon */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
          {/* User Profile */}
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                       <img
                                  src={roadmap.createdBy?.profilePicture || "/assets/images/users/user-img1.png"}
                                  alt={roadmap.createdBy?.name || "Instructor"}
                                  className="rounded-circle"
                                  style={{ width: "75px", height: "75px", objectFit: "cover" }}
                                  onError={(e) => {
                                    e.target.src = "/assets/images/users/user-img1.png";
                                  }}
                                />
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
<p className="mb-0 text-sm fw-medium text-neutral-700" style={{ fontSize: "25px", color: "#666" , fontWeight: "400"}}>
                                    {roadmap.createdBy?.name || "Anonymous"}
                                  </p>
              <p className="mb-0" style={{ fontSize: "18px", color: "#666" }}>
                                    {roadmap.createdBy.instructorProfile.experienceYears} years exp.
                                  </p>
            </div>
          </div>

          {/* Bookmark Icon */}
          <div style={{ fontSize: "30px", color: "#007bff" }}>
            {/* A simple placeholder for a bookmark icon. In a real app, you'd use an SVG or font icon library */}
            &#9829; {/* Heart icon as a placeholder */}
            <span style={{ fontSize: "14px", verticalAlign: "top", marginLeft: "5px" }}>Bookmark icon</span>
          </div>
        </div>

        {/* Title */}
        <div style={{ borderBottom: "1px solid #333", paddingBottom: "10px", marginBottom: "20px" }}>
          <h2 className="mb-0" style={{ color: "#333" }}>{roadmap.title}</h2>
        </div>

        {/* Description */}
        <div style={{padding: "15px", marginBottom: "30px", minHeight: "100px", background: "#f8f8f8" }}>
          {/* <h4 style={{ color: "#555", marginBottom: "10px" }}>Description</h4> */}
          <p>{roadmap.description}</p>
        </div>

        {/* Left Column (Domain, Difficulty etc.) and Right Column (Steps Animation) */}
        <div style={{ display: "flex", gap: "30px", flexDirection: "row" }}>
          {/* Left Column */}
         <div
    style={{
      flex: 1,
      border: "2px solid #dedede",
      padding: "20px",
      borderRadius: "12px",
      background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      animation: "fadeIn 1s ease-out",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.02)";
      e.currentTarget.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.2)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
    }}
  >
    <style>
      {`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}
    </style>

    {/* Domain */}
    <div
      style={{
        marginBottom: "20px",
        borderBottom: "2px solid #eaeaea",
        paddingBottom: "12px",
      }}
    >
      <h5 style={{ color: "#007bff", marginBottom: "8px", fontWeight: "600" }}>
        Domain:
      </h5>
      <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
        {roadmap.domain}
      </p>
    </div>

    {/* Difficulty */}
    <div
      style={{
        marginBottom: "20px",
        borderBottom: "2px solid #eaeaea",
        paddingBottom: "12px",
      }}
    >
      <h5 style={{ color: "#007bff", marginBottom: "8px", fontWeight: "600" }}>
        Difficulty:
      </h5>
      <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
        {roadmap.difficulty}
      </p>
    </div>

    {/* Estimated Duration */}
    <div
      style={{
        marginBottom: "20px",
        borderBottom: "2px solid #eaeaea",
        paddingBottom: "12px",
      }}
    >
      <h5 style={{ color: "#007bff", marginBottom: "8px", fontWeight: "600" }}>
        Estimated Duration:
      </h5>
      <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
        {roadmap.estimatedDurationWeeks} weeks
      </p>
    </div>

    {/* Prerequisites */}
    <div
      style={{
        marginBottom: "20px",
        borderBottom: "2px solid #eaeaea",
        paddingBottom: "12px",
      }}
    >
      <h5 style={{ color: "#007bff", marginBottom: "8px", fontWeight: "600" }}>
        Prerequisites:
      </h5>
      <ul style={{ listStyleType: "none", paddingLeft: "0", margin: 0 }}>
        {roadmap.prerequisites.map((pre, idx) => (
          <li
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
              fontSize: "14px",
              color: "#555",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#007bff",
              }}
            ></span>
            {pre}
          </li>
        ))}
      </ul>
    </div>

    {/* Resources */}
    <div>
      <h5 style={{ color: "#007bff", marginBottom: "8px", fontWeight: "600" }}>
        Resources:
      </h5>
      <ul style={{ listStyleType: "none", paddingLeft: "0", margin: 0 }}>
        {roadmap.tags.map((resource, idx) => (
          <li
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
              fontSize: "14px",
              color: "#555",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#28a745",
              }}
            ></span>
            {resource}
          </li>
        ))}
      </ul>
    </div>
  </div>


          {/* Right Column - Steps Animation (Visual Roadmap Steps Component) */}
          <div style={{ flex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h4 style={{ textAlign: "center", marginBottom: "1rem", color: "#333" }}>Pathway</h4> {/* */}
            <VisualRoadmapSteps steps={roadmap.steps} />
          </div>
        </div>
      </div>
    );
  };

export default RoadmapDetails;