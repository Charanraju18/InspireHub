import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RoadmapDetails = () => {
  const { id } = useParams();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/roadmaps/${id}`);
        const data = await res.json();
        setRoadmap(data);
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
      <h2 className="mb-3">{roadmap.title}</h2>
      <p>
        <strong>Domain:</strong> {roadmap.domain}
      </p>
      <p>
        <strong>Difficulty:</strong> {roadmap.difficulty}
      </p>
      <p>
        <strong>Estimated Duration:</strong> {roadmap.estimatedDurationWeeks}{" "}
        weeks
      </p>
      <p>
        <strong>Tags:</strong> {roadmap.tags.join(", ")}
      </p>

      <h4 className="mt-4">Description</h4>
      <p>{roadmap.description}</p>

      <h4 className="mt-4">Prerequisites</h4>
      <ul>
        {roadmap.prerequisites.map((pre, idx) => (
          <li key={idx}>{pre}</li>
        ))}
      </ul>

      <h4 className="mt-4">Steps</h4>
      {roadmap.steps.map((step, i) => (
        <div key={i} className="mb-4 p-3 border rounded bg-light">
          <h5>
            Step {i + 1}: {step.title}
          </h5>
          <p>{step.description}</p>
          <h6>Resources:</h6>
          <ul>
            {step.resources.map((res, j) => (
              <li key={j}>
                <strong>{res.title}</strong> ({res.type}) –{" "}
                <a href={res.link} target="_blank" rel="noopener noreferrer">
                  Link
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RoadmapDetails;
