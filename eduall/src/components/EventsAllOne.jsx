// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Preloader from "../helper/Preloader";
// // import img from "../assets/images/thumbs/event-detail-img1.png";

// const getImageUrl = (image) => {
//   if (!image) return "/assets/images/thumbs/event-detail-img1.png"; // fallback

//   // If image path starts with /uploads or something that needs backend prefix
//   if (image.startsWith("/uploads")) {
//     return `http://localhost:5000${image}`;
//   }

//   // Otherwise, assume it's a frontend relative path, use as is
//   return image;
// };

// const EventsAllOne = () => {
//   const navigate = useNavigate();

//   const [now, setNow] = useState(new Date());
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [events, setEvents] = useState([]); // <-- use this for fetched data
//   const [filteredEvents, setFilteredEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const interval = setInterval(() => setNow(new Date()), 1000);
//     return () => clearInterval(interval);
//   }, []);
//   // Fetch events from backend on mount
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch("http://localhost:5000/api/events");
//         if (!res.ok) throw new Error("Failed to fetch events");
//         const data = await res.json();

//         const parsedData = data.map((event) => {
//           const startTime = new Date(event.schedule.startTime);
//           const endTime = new Date(event.schedule.endTime);
//           const instructor = event.schedule.instructor || "Unknown Instructor";
//           const location = event.schedule.location || "Online";
//           return {
//             ...event,
//             id: event._id,
//             startTime,
//             endTime,
//             instructor,
//             location,
//           };
//         });

//         setEvents(parsedData);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   const isLive = (event) => now >= event.startTime && now <= event.endTime;
//   const isUpcoming = (event) => now < event.startTime;
//   const isExpired = (event) => now > event.endTime;

//   const handleSearch = () => {
//     const filtered = events.filter((event) => {
//       // <-- use `events` here instead of static array
//       const titleMatch = event.title
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase().trim());

//       const statusMatch =
//         statusFilter === "All" ||
//         (statusFilter === "Live" && isLive(event)) ||
//         (statusFilter === "Upcoming" && isUpcoming(event)) ||
//         (statusFilter === "Ended" && isExpired(event));

//       return titleMatch && statusMatch;
//     });

//     setFilteredEvents(filtered);
//   };

//   useEffect(() => {
//     handleSearch();
//   }, [searchTerm, statusFilter, now, events]); // add events here so filter updates on data fetch

//   // ...rest of your component rendering code stays the same, but use filteredEvents

//   return (
//     <div className="container px-4">
//       <div className="d-flex flex-wrap gap-10 align-items-center mb-4 m-5">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Search by title..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={{ maxWidth: "250px" }}
//         />
//         <select
//           className="form-select"
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           style={{ maxWidth: "160px" }}
//         >
//           <option value="All">All</option>
//           <option value="Live">Live Now</option>
//           <option value="Upcoming">Upcoming</option>
//           <option value="Ended">Ended</option>
//         </select>
//       </div>

//       <div className="d-flex justify-content-start flex-wrap gap-5 pb-10">
//         {loading ? (
//           <Preloader />
//         ) : error ? (
//           <div className="text-center my-5 text-danger">{error}</div>
//         ) : filteredEvents.length === 0 ? (
//           <p className="text-center w-100 text-muted">No events found.</p>
//         ) : (
//           [...filteredEvents]
//             .sort((a, b) => a.startTime - b.startTime)
//             .map((event) => {
//               const live = isLive(event);
//               const upcoming = isUpcoming(event);
//               const expired = isExpired(event);

//               return (
//                 // <Link to={`/event-details/${event.id}`}>
//                 <div
//                   key={event.id}
//                   className="col-sm-6 pt-6 pb-8 m-10"
//                   style={{ flex: "0 0 30%", maxWidth: "30%" }}
//                   onClick={() => {
//                     if (event.id) {
//                       navigate(`/event-details/${event.id}`, {
//                         state: { event },
//                       });
//                     } else {
//                       console.warn("Event ID missing", event);
//                     }
//                   }}
//                   role="button"
//                 >
//                   <div className="scale-hover-item bg-light rounded-16 p-12 h-100 border">
//                     <div className="rounded-12 overflow-hidden position-relative">
//                       <img
//                         src={getImageUrl(event.schedule?.image)}
//                         alt="Event"
//                         className="rounded-12 w-100"
//                       />

//                       <div
//                         className="position-absolute inset-block-start-0 inset-inline-start-0 mt-12 ms-12 px-2 py-1 rounded-4"
//                         style={{
//                           minWidth: "40px",
//                           backgroundColor: "#E6F0FF",
//                           color: "#003366",
//                           textAlign: "center",
//                         }}
//                       >
//                         <div
//                           className="fw-bold lh-3"
//                           style={{ fontSize: "14px" }}
//                         >
//                           {event.startTime
//                             .getDate()
//                             .toString()
//                             .padStart(2, "0")}
//                         </div>
//                         <div
//                           className="text-uppercase"
//                           style={{ fontSize: "12px" }}
//                         >
//                           {event.startTime.toLocaleString("default", {
//                             month: "short",
//                           })}
//                         </div>
//                       </div>

//                       <div
//                         className={`position-absolute inset-block-start-0 inset-inline-end-0 mt-20 me-20 px-12 py-8 rounded-8 text-white text-sm fw-medium ${
//                           live
//                             ? "bg-success"
//                             : expired
//                             ? "bg-danger"
//                             : "bg-warning text-dark"
//                         }`}
//                       >
//                         {live ? "LIVE NOW" : expired ? "Ended" : "Upcoming"}
//                       </div>
//                     </div>

//                     <div className="pt-3">
//                       <h5 className="mb-1">{event.title}</h5>
//                       <p className="text-muted mb-1">
//                         Instructor: {event.instructor}
//                       </p>
//                       <p className="text-muted mb-1">
//                         Time: {event.startTime.toLocaleTimeString()} -{" "}
//                         {event.endTime.toLocaleTimeString()}
//                       </p>
//                       <p className="text-muted mb-2">
//                         Location: {event.location}
//                       </p>

//                       {live ? (
//                         <a
//                           href={event.joinLink}
//                           className="btn btn-primary w-100"
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           onClick={(e) => e.stopPropagation()}
//                         >
//                           Join Now
//                         </a>
//                       ) : upcoming ? (
//                         <div
//                           className="btn btn-secondary w-100"
//                           style={{
//                             pointerEvents: "auto",
//                             cursor: "not-allowed",
//                             opacity: 0.6,
//                           }}
//                           onClick={(e) => e.stopPropagation()}
//                         >
//                           Starts at {event.startTime.toLocaleTimeString()}
//                         </div>
//                       ) : (
//                         <div
//                           className="btn btn-secondary w-100"
//                           style={{
//                             pointerEvents: "auto",
//                             cursor: "not-allowed",
//                             opacity: 0.6,
//                           }}
//                           onClick={(e) => e.stopPropagation()}
//                         >
//                           Event Ended
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 // </Link>
//               );
//             })
//         )}
//       </div>
//     </div>
//   );
// };

// export default EventsAllOne;

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Helper to resolve image URL
const getImageUrl = (image) => {
  if (!image) return "/assets/images/thumbs/event-detail-img1.png";
  if (image.startsWith("/uploads")) return `http://localhost:5000${image}`;
  return image;
};

const EventsAllOne = () => {
  const navigate = useNavigate();

  const [now, setNow] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch events on mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/events");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();

        const parsedData = data.map((event) => {
          const startTime = new Date(event.schedule.startTime);
          const endTime = new Date(event.schedule.endTime);
          const instructor = event.schedule.instructor || "Unknown Instructor";
          const location = event.schedule.location || "Online";
          return {
            ...event,
            id: event._id,
            startTime,
            endTime,
            instructor,
            location,
          };
        });

        setEvents(parsedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const isLive = (event) => now >= event.startTime && now <= event.endTime;
  const isUpcoming = (event) => now < event.startTime;
  const isExpired = (event) => now > event.endTime;

  const handleSearch = () => {
    const filtered = events.filter((event) => {
      const titleMatch = event.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim());

      const statusMatch =
        statusFilter === "All" ||
        (statusFilter === "Live" && isLive(event)) ||
        (statusFilter === "Upcoming" && isUpcoming(event)) ||
        (statusFilter === "Ended" && isExpired(event));

      return titleMatch && statusMatch;
    });

    setFilteredEvents(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm, statusFilter, now, events]);

  if (loading) return <div className="text-center py-5">Loading events...</div>;
  if (error) return <div className="text-center text-danger py-5">{error}</div>;

  return (
    <section className="course-list-view py-120 bg-white">
      <div className="container">
        {/* Header */}
        <div className="flex-between gap-16 flex-wrap mb-40">
          <span className="text-neutral-500">
            Showing {filteredEvents.length} of {events.length} Results
          </span>

          <div className="flex-align gap-16">
            <input
              type="text"
              placeholder="Search event"
              className="form-control rounded-pill px-16 py-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-select ps-20 pe-28 py-8 fw-medium rounded-pill bg-main-25 border border-neutral-30 text-neutral-700"
            >
              <option value="All">All</option>
              <option value="Live">Live</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Ended">Ended</option>
            </select>
          </div>
        </div>

        {/* Cards */}
        <div className="row gy-4">
          {filteredEvents.map((event) => {
            const date = new Date(event.startTime);
            const day = date.getDate().toString().padStart(2, "0");
            const month = date
              .toLocaleString("default", { month: "short" })
              .toUpperCase();
            const time = date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });
            const status = isLive(event)
              ? "Live"
              : isUpcoming(event)
              ? "Upcoming"
              : "Ended";
            const statusColor =
              status === "Live"
                ? "bg-danger"
                : status === "Upcoming"
                ? "bg-warning"
                : "bg-neutral-500";

            return (
              <div key={event.id} className="col-xl-4 col-sm-6">
                <div className="scale-hover-item bg-main-25 rounded-16 p-12 h-100 border border-neutral-30">
                  <div className="course-item__thumb rounded-12 overflow-hidden position-relative">
                    <Link
                      to={`/event-details/${event.id}`}
                      className="w-100 h-100"
                    >
                      <img
                        src={getImageUrl(event.schedule?.image)}
                        alt="Event"
                        className="scale-hover-item__img rounded-12 cover-img transition-2"
                      />
                    </Link>
                    <div className="position-absolute inset-inline-end-0 inset-block-end-0 me-12 mb-12 py-6 px-12 rounded-6 bg-main-two-600 text-white fw-small">
                      <h4 className="mb-0 text-white fw-small">{day}</h4>
                      {month}
                    </div>
                    <div className="bg-success-600 rounded-8 px-24 py-12 text-white position-absolute inset-block-start-0 inset-inline-start-0 mt-20 ms-20 z-1">
                      {time}
                    </div>
                    <div
                      className={`position-absolute top-0 end-0 mt-20 me-20 rounded-pill px-16 py-4 text-white fw-semibold ${statusColor}`}
                    >
                      {status}
                    </div>
                  </div>

                  <div className="pt-32 pb-24 px-16 position-relative">
                    <h4 className="mb-28">
                      <Link
                        to={`/event-details/${event.id}`}
                        className="link text-line-2"
                      >
                        {event.title}
                      </Link>
                    </h4>

                    <div className="flex-align gap-8">
                      <span className="text-neutral-500 text-2xl d-flex">
                        <i className="ph-bold ph-map-pin-line" />
                      </span>
                      <p className="text-neutral-500 text-lg">
                        {event.location}
                      </p>
                    </div>

                    <div className="flex-between gap-8 pt-24 border-top border-neutral-50 mt-28 border-dashed border-0">
                      <h4 className="text-main-two-600 mb-0">
                        ₹{event.price || "Free"}
                      </h4>
                      <Link
                        to={`/event-details/${event.id}`}
                        className="flex-align gap-8 text-main-600 hover-text-decoration-underline transition-1 fw-semibold"
                      >
                        {status === "Ended" ? "View" : "Register Now"}
                        <i className="ph ph-arrow-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EventsAllOne;
