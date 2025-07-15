import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VisualRoadmapSteps = ({ steps }) => {
  const roadmapContainerRef = useRef(null);
  // Initialize with a default width, will be updated by useEffect
  const [containerDimensions, setContainerDimensions] = useState({ width: 1000, height: 400 });

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

    // Function to update container dimensions
    const updateContainerDimensions = () => {
      if (roadmapContainerRef.current) {
        setContainerDimensions({
          width: roadmapContainerRef.current.offsetWidth,
          height: roadmapContainerRef.current.offsetHeight,
        });
      }
    };

    // Set initial dimensions and add resize listener
    updateContainerDimensions();
    window.addEventListener("resize", updateContainerDimensions);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", updateContainerDimensions);
  }, [steps]); // Re-run if steps change to adjust dimensions if height changes

  // Roadline properties from CSS (centralized for calculation)
  const roadlineAngleDegrees = -23;
  const roadlineAngleRadians = roadlineAngleDegrees * (Math.PI / 180);
  const roadlineHeightPx = 40;
  const roadlineInitialTopPercent = 85; // This is the 'top' CSS property
  const roadlineTranslateYPercent = -50; // This is the translateY of the roadline itself

  // Desired gap between the bottom of the step circle and the roadline
  const desiredGapPx = 5; // Aiming for exactly 5px gap

  // Constants for step circle dimensions
  const stepCircleHeightPx = 50;

  // Calculate dynamic height for the container based on steps, ensuring min height
  const containerHeightStyle = `${Math.max(400, 200 + steps.length * 80)}px`;

  return (
    <div
      ref={roadmapContainerRef} // Assign ref to the container
      className="roadmap-container"
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "1000px",
        height: containerHeightStyle, // Use dynamic height
        margin: "2rem auto",
        background: "blue",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        overflow: "hidden", // Still hide overflow if any
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

          /* Default styles for step elements */
          .step-circle {
            width: ${stepCircleHeightPx}px; /* Use constant */
            height: ${stepCircleHeightPx}px; /* Use constant */
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
          }

          .step-bubble {
            background: #fff;
            border-radius: 8px;
            padding: 10px 15px;
            box-shadow: "0 4px 6px rgba(0, 0, 0, 0.1)";
            text-align: center;
            font-size: 14px;
            max-width: 200px;
            word-wrap: break-word;
            overflow: hidden;
          }

          /* Roadline styling - fixed to the container */
          .roadline {
            position: absolute;
            top: ${roadlineInitialTopPercent}%;
            left: 0;
            width: 100%;
            height: ${roadlineHeightPx}px;
            background: linear-gradient(to right, #3b3b3b, #1c1c1c);
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

          /* Media queries for responsiveness */
          @media (min-width: 768px) {
            .roadmap-step {
                position: absolute;
                display: flex;
                flex-direction: column;
                align-items: center;
                transform: translate(-50%, 0); /* Center based on its own width */
                z-index: 10;
                opacity: 0;
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
            }
            .roadmap-step:last-child {
                margin-bottom: 0;
            }

            .step-bubble {
              max-width: 90%;
              font-size: 12px;
              padding: 8px;
            }

            .step-circle {
              width: 40px;
              height: 40px;
              font-size: 16px;
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
          >
            <div className="step-circle">{index + 1}</div>
            <div className="step-bubble">
              <strong>{step.title}</strong>
              <p>{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const RoadmapDetails = () => {
  const { id } = useParams();
  const [roadmap, setRoadmap] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const res = await axios.get(
          `https://inspirehub-backend-itne.onrender.com/api/roadmaps/${id}`
        );
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
      <div className="mt-4 steps-container">
        <h4
          style={{ textAlign: "center", marginBottom: "", color: "#333" }}
        >
          Steps
        </h4>
        <VisualRoadmapSteps steps={roadmap.steps} />
      </div>
    </div>
  );
};

export default RoadmapDetails;