// components/WishlistOne.jsx
import React from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const WishlistOne = ({ roadmap, onRemove }) => {
  return (
    <div className="card h-100 shadow-sm">
      <img
        src={roadmap.thumbnail}
        alt={roadmap.title}
        className="card-img-top"
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{roadmap.title}</h5>
        <p className="card-text">{roadmap.description}</p>
        <Link to={`/roadmap/${roadmap._id}`} className="btn btn-sm btn-primary">
          <FaEye /> View
        </Link>
        <button
          className="btn btn-sm btn-danger ms-2"
          onClick={() => onRemove(roadmap._id)}
        >
          <FaTrash /> Remove
        </button>
      </div>
    </div>
  );
};

export default WishlistOne;
