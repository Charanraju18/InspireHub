// import React, { useState } from "react";
// import { useAuth } from "../authContext";
// import { useNavigate } from "react-router-dom";
// import Select from "react-select";

// // Available domain options
// const DOMAIN_OPTIONS = [
//   "Programming",
//   "Web Design & Development",
//   "Academic Skills",
//   "Marketing",
//   "Design (General)",
//   "Technology",
//   "Fashion Design",
//   "Agriculture",
//   "Biology & Life Sciences",
//   "Data Science & Analytics",
//   "Business & Entrepreneurship",
//   "Mobile App Development",
//   "Artificial Intelligence",
//   "Cybersecurity",
//   "Video Production & Editing",
//   "Health & Nutrition",
//   "Finance & Investing",
//   "Photography",
//   "Language & Communication",
//   "Environmental Science",
// ];

// // Tech stack per domain
// const TECH_STACK_OPTIONS = {
//   Programming: [
//     "C", "C++", "Python", "Java", "JavaScript", "Rust", "Go", "C#",
//     "Ruby", "Kotlin", "Algorithms", "Data Structures",
//     "Git & GitHub", "Debugging Techniques", "Object-Oriented Programming", "Functional Programming"
//   ],
//   "Web Design & Development": [
//     "HTML", "CSS", "JavaScript", "Tailwind CSS", "React.js",
//     "Vue.js", "Angular", "Bootstrap", "UI/UX Basics", "Figma/Adobe XD",
//     "Responsive Design", "Web Accessibility", "SEO Basics", "Web Animations", "Design Systems"
//   ],
//   "Academic Skills": [
//     "Time Management", "Research Methods", "Academic Writing", "Note-Taking Systems",
//     "Critical Thinking", "Exam Strategies", "Study Tools (Notion, Anki)",
//     "Referencing (APA, MLA)", "Presentation Skills", "Online Learning Platforms"
//   ],
//    Marketing: [
//     "Digital Marketing", "SEO", "SEM (Search Engine Marketing)", "Social Media Strategy",
//     "Content Marketing", "Email Marketing", "Google Ads", "Facebook & Instagram Ads",
//     "Analytics Tools (Google Analytics)", "Influencer Marketing", "Copywriting",
//     "Funnel Building", "Affiliate Marketing"
//   ],
//   "Design (General)": [
//     "Graphic Design", "Typography", "Color Theory", "Adobe Photoshop",
//     "Adobe Illustrator", "Canva", "UI/UX Design", "Motion Graphics",
//     "Logo Design", "Print Design", "Brand Identity", "Portfolio Creation"
//   ],
//   Technology: [
//     "Artificial Intelligence", "Machine Learning", "Blockchain", "IoT (Internet of Things)",
//     "Robotics", "AR/VR", "Cloud Computing", "Cybersecurity",
//     "Edge Computing", "5G & Network Technologies", "Computer Vision", "Quantum Computing"
//   ],
//   "Fashion Design": [
//     "Fashion Illustration", "Textile Science", "Sewing & Garment Construction", "Draping",
//     "Fashion Marketing", "Trend Forecasting", "Fashion CAD Tools (CLO 3D)", "Pattern Making",
//     "Sustainable Fashion", "Styling", "Portfolio Development"
//   ],
//   Agriculture: [
//     "Crop Management", "Soil Science", "Organic Farming", "Precision Agriculture",
//     "Agri-Tech (Sensors, Drones)", "Irrigation Systems", "Livestock Management",
//     "Post-Harvest Management", "Agri-Business", "Farm Equipment", "Agri-Finance"
//   ],
//   "Biology & Life Sciences": [
//     "Cell Biology", "Genetics", "Microbiology", "Molecular Biology",
//     "Biochemistry", "Human Anatomy", "Physiology", "Immunology",
//     "Ecology", "Biotechnology", "Bioinformatics", "Lab Techniques"
//   ],
//   "Data Science & Analytics": [
//     "Excel", "SQL", "Python for Data Science", "R Programming",
//     "Data Cleaning", "Data Visualization (Tableau, Power BI)", "Statistics",
//     "Probability", "Machine Learning", "Pandas, NumPy", "Predictive Modeling", "Big Data Concepts"
//   ],
//   "Business & Entrepreneurship": [
//     "Business Planning", "Lean Startup Model", "Market Research", "Product Development",
//     "Business Finance", "Startup Fundraising", "Branding", "Sales Funnels",
//     "Pitch Decks", "Customer Development", "Monetization Models"
//   ],
//   "Mobile App Development": [
//     "React Native", "Flutter", "Swift (iOS)", "Kotlin (Android)",
//     "UI/UX for Mobile", "Firebase Integration", "Mobile APIs",
//     "App Deployment (Play Store, App Store)", "Push Notifications",
//     "Mobile Security", "Cross-Platform Development"
//   ],
//   "Artificial Intelligence": [
//     "Machine Learning", "Deep Learning", "Natural Language Processing", "Computer Vision",
//     "Neural Networks", "TensorFlow", "PyTorch", "Scikit-learn",
//     "Data Preprocessing", "Model Evaluation", "AI Ethics", "Reinforcement Learning"
//   ],
//   Cybersecurity: [
//     "Network Security", "Ethical Hacking", "Penetration Testing", "Incident Response",
//     "Risk Management", "Security Frameworks", "Cryptography", "Malware Analysis",
//     "Digital Forensics", "Compliance Standards", "Security Tools"
//   ],
//   "Video Production & Editing": [
//     "Video Editing Software", "Camera Techniques", "Lighting Setup", "Audio Production",
//     "Post-Production Workflow", "Color Grading", "Motion Graphics", "Storyboarding",
//     "Script Writing", "Video SEO"
//   ],
//   "Health & Nutrition": [
//     "Nutrition Science", "Diet Planning", "Food Safety", "Health Assessment",
//     "Supplement Knowledge", "Meal Prep", "Exercise Physiology", "Weight Management",
//     "Chronic Disease Prevention", "Public Health"
//   ],
//   "Finance & Investing": [
//     "Personal Finance", "Investment Strategies", "Stock Market Analysis", "Portfolio Management",
//     "Risk Assessment", "Financial Planning", "Cryptocurrency", "Real Estate Investing",
//     "Retirement Planning", "Tax Strategies"
//   ],
//   Photography: [
//     "Camera Fundamentals", "Composition Techniques", "Lighting Techniques", "Photo Editing Software",
//     "Portrait Photography", "Landscape Photography", "Product Photography", "Wedding Photography",
//     "Street Photography", "Business Photography"
//   ],
//   "Language & Communication": [
//     "Grammar & Syntax", "Vocabulary Building", "Pronunciation", "Writing Skills",
//     "Reading Comprehension", "Speaking Fluency", "Cultural Context", "Business Communication",
//     "Public Speaking", "Translation Skills"
//   ],
//   "Environmental Science": [
//     "Climate Change", "Sustainability", "Environmental Policy", "Conservation Biology",
//     "Pollution Control", "Renewable Energy", "Environmental Impact Assessment", "Green Technology",
//     "Waste Management", "Environmental Law"
//   ]
// };

// const RoadmapForm = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [isSubmitting, setIsSubmitting] = useState(false); // ✅ Prevent multiple submissions

//   const [form, setForm] = useState({
//     title: "",
//     domain: "",
//     techstack: [],
//     description: "",
//     difficulty: "Beginner",
//     duration: 1,
//     thumbnail: null,
//     prerequisites: [""],
//     tags: [""],
//     steps: [
//       {
//         title: "",
//         description: "",
//         resources: [{ title: "", link: "", type: "video" }],
//       },
//     ],
//   });

//   // Styles
//   const inputStyle = {
//     width: "100%",
//     padding: "12px",
//     border: "1px solid #ccc",
//     borderRadius: "5px",
//     marginBottom: "15px",
//   };

//   const textareaStyle = {
//     ...inputStyle,
//     minHeight: "120px",
//     resize: "vertical",
//   };

//   const buttonStyle = {
//     padding: "10px 20px",
//     backgroundColor: "#007BFF",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     marginBottom: "10px",
//   };

//   const submitStyle = {
//     ...buttonStyle,
//     backgroundColor: isSubmitting ? "#ccc" : "#28A745", // ✅ Visual feedback
//     fontSize: "18px",
//     padding: "15px 30px",
//     cursor: isSubmitting ? "not-allowed" : "pointer", // ✅ Cursor feedback
//   };

//   const gridStyle = {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: "20px",
//     marginBottom: "20px",
//   };

//   const fieldContainerStyle = {
//     marginBottom: "25px",
//   };

//   const arrayItemStyle = {
//     display: "flex",
//     alignItems: "center",
//     marginBottom: "10px",
//   };

//   const removeButtonStyle = {
//     padding: "5px 10px",
//     backgroundColor: "#dc3545",
//     color: "white",
//     border: "none",
//     borderRadius: "3px",
//     cursor: "pointer",
//     marginLeft: "10px",
//   };

//   const sectionStyle = {
//     border: "1px solid #ddd",
//     borderRadius: "8px",
//     padding: "20px",
//     marginBottom: "20px",
//     position: "relative",
//     backgroundColor: "#f9f9f9",
//   };

//   const removeTopRightStyle = {
//     position: "absolute",
//     top: "10px",
//     right: "10px",
//     width: "25px",
//     height: "25px",
//     backgroundColor: "#dc3545",
//     color: "white",
//     border: "none",
//     borderRadius: "50%",
//     cursor: "pointer",
//     fontSize: "14px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   };

//   const resourceBlockStyle = {
//     border: "1px solid #ccc",
//     borderRadius: "5px",
//     padding: "15px",
//     marginBottom: "15px",
//     position: "relative",
//     backgroundColor: "#fff",
//   };

//   // Form handlers
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleArrayChange = (field, index, value) => {
//     const updated = [...form[field]];
//     updated[index] = value;
//     setForm({ ...form, [field]: updated });
//   };

//   const addToArray = (field) => {
//     setForm({ ...form, [field]: [...form[field], ""] });
//   };

//   const removeFromArray = (field, index) => {
//     const updated = [...form[field]];
//     updated.splice(index, 1);
//     setForm({ ...form, [field]: updated });
//   };

//   const handleStepChange = (stepIndex, field, value) => {
//     const updated = [...form.steps];
//     updated[stepIndex][field] = value;
//     setForm({ ...form, steps: updated });
//   };

//   const handleResourceChange = (stepIndex, resIndex, field, value) => {
//     const updated = [...form.steps];
//     updated[stepIndex].resources[resIndex][field] = value;
//     setForm({ ...form, steps: updated });
//   };

//   const addStep = () => {
//     setForm({
//       ...form,
//       steps: [
//         ...form.steps,
//         {
//           title: "",
//           description: "",
//           resources: [{ title: "", link: "", type: "video" }],
//         },
//       ],
//     });
//   };

//   const removeStep = (i) => {
//     const updated = [...form.steps];
//     updated.splice(i, 1);
//     setForm({ ...form, steps: updated });
//   };

//   const addResource = (stepIndex) => {
//     const updated = [...form.steps];
//     updated[stepIndex].resources.push({ title: "", link: "", type: "video" });
//     setForm({ ...form, steps: updated });
//   };

//   const removeResource = (stepIndex, resIndex) => {
//     const updated = [...form.steps];
//     updated[stepIndex].resources.splice(resIndex, 1);
//     setForm({ ...form, steps: updated });
//   };

//   const toBase64 = (file) =>
//     new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = (err) => reject(err);
//     });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // ✅ Prevent multiple submissions
//     if (isSubmitting) return;
    
//     const userId = user?._id || user?.id;
//     if (!userId) {
//       alert("Please login to create a roadmap");
//       navigate("/sign-in");
//       return;
//     }

//     setIsSubmitting(true); // ✅ Disable button

//     try {
//       let base64Thumbnail = "";
//       if (form.thumbnail) {
//         base64Thumbnail = await toBase64(form.thumbnail);
//       }

//       const submitData = {
//         createdBy: userId,
//         title: form.title,
//         domain: form.domain,
//         techstack: form.techstack,
//         description: form.description,
//         difficulty: form.difficulty,
//         duration: Number(form.duration),
//         thumbnail: base64Thumbnail,
//         prerequisites: form.prerequisites,
//         tags: form.tags,
//         steps: form.steps,
//       };

//       // ✅ Get authentication token with fallback
//       const token = localStorage.getItem("token") || user?.token || user?.accessToken;
      
//       const headers = {
//         "Content-Type": "application/json",
//       };

//       // ✅ Only add auth header if token exists
//       if (token && token !== "undefined" && token !== "null") {
//         headers["Authorization"] = `Bearer ${token}`;
//       }
      
//       const res = await fetch("http://localhost:5000/api/roadmaps/create", {
//         method: "POST",
//         headers: headers,
//         body: JSON.stringify(submitData),
//       });

//       const data = await res.json();
      
//       // ✅ Better error handling
//       if (!res.ok) {
//         if (res.status === 401) {
//           alert("Please login again to create a roadmap");
//           navigate("/sign-in");
//           return;
//         }
//         throw new Error(data.message || `Server error: ${res.status}`);
//       }
      
//       alert("🎉 Roadmap created successfully!");
      
//       // ✅ Reset form
//       setForm({
//         title: "",
//         domain: "",
//         techstack: [],
//         description: "",
//         difficulty: "Beginner",
//         duration: 1,
//         thumbnail: null,
//         prerequisites: [""],
//         tags: [""],
//         steps: [
//           {
//             title: "",
//             description: "",
//             resources: [{ title: "", link: "", type: "video" }],
//           },
//         ],
//       });

//       navigate("/profile#roadmaps-shared");
      
//     } catch (error) {
//       console.error("Error creating roadmap:", error);
      
//       let errorMessage = "Failed to create roadmap. ";
//       if (error.message.includes("token")) {
//         errorMessage += "Please login again.";
//         setTimeout(() => navigate("/sign-in"), 2000);
//       } else if (error.message.includes("createdBy")) {
//         errorMessage += "User authentication required.";
//       } else {
//         errorMessage += error.message;
//       }
      
//       alert(errorMessage);
//     } finally {
//       setIsSubmitting(false); 
//     }
//   };

//   return (
//     <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
//       <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
//         Create a New Roadmap
//       </h2>

//       <div style={gridStyle}>
//         <div>
//           <label>Title</label>
//           <input
//             name="title"
//             value={form.title}
//             onChange={handleChange}
//             placeholder="Title"
//             style={inputStyle}
//           />
//         </div>
//         <div>
//           <label>Domain</label>
//           <select
//             name="domain"
//             value={form.domain}
//             onChange={(e) => {
//               const selected = e.target.value;
//               setForm({ ...form, domain: selected, techstack: [] });
//             }}
//             style={inputStyle}
//           >
//             <option value="">-- Select Domain --</option>
//             {DOMAIN_OPTIONS.map((domain) => (
//               <option key={domain} value={domain}>
//                 {domain}
//               </option>
//             ))}
//           </select>
//         </div>
//         {form.domain && TECH_STACK_OPTIONS[form.domain] && (
//           <div style={fieldContainerStyle}>
//             <label>Tech Stack</label>
//             <Select
//               isMulti
//               name="techstack"
//               options={TECH_STACK_OPTIONS[form.domain].map((item) => ({
//                 label: item,
//                 value: item,
//               }))}
//               value={form.techstack.map((item) => ({ label: item, value: item }))}
//               onChange={(selected) =>
//                 setForm({
//                   ...form,
//                   techstack: selected.map((item) => item.value),
//                 })
//               }
//               styles={{
//                 control: (base) => ({
//                   ...base,
//                   border: "1px solid #ccc",
//                   borderRadius: "5px",
//                   padding: "2px",
//                 }),
//               }}
//             />
//             <p style={{ fontSize: "12px", color: "#777" }}>
//               Hold Ctrl (or Cmd) to select multiple
//             </p>
//           </div>
//         )}
//       </div>

//       <div style={fieldContainerStyle}>
//         <label>Description</label>
//         <textarea
//           name="description"
//           value={form.description}
//           onChange={handleChange}
//           placeholder="Description"
//           style={textareaStyle}
//         />
//       </div>

//       <div style={gridStyle}>
//         <div>
//           <label>Thumbnail Image</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setForm({ ...form, thumbnail: e.target.files[0] })}
//           />
//         </div>
//       </div>

//       <div style={gridStyle}>
//         <div>
//           <label>Difficulty</label>
//           <select
//             name="difficulty"
//             value={form.difficulty}
//             onChange={handleChange}
//             style={inputStyle}
//           >
//             <option>Beginner</option>
//             <option>Intermediate</option>
//             <option>Advanced</option>
//           </select>
//         </div>
//         <div>
//           <label>Duration (in weeks)</label>
//           <input
//             type="number"
//             name="duration"
//             value={form.duration}
//             onChange={handleChange}
//             placeholder="Duration (in weeks)"
//             style={inputStyle}
//           />
//         </div>
//       </div>

//       {/* Prerequisites */}
//       <div style={fieldContainerStyle}>
//         <label>Prerequisites *</label>
//         {form.prerequisites.map((item, index) => (
//           <div key={index} style={arrayItemStyle}>
//             <input
//               value={item}
//               onChange={(e) =>
//                 handleArrayChange("prerequisites", index, e.target.value)
//               }
//               placeholder="Enter prerequisite"
//               style={{ ...inputStyle, marginBottom: "0", marginRight: "10px" }}
//             />
//             {form.prerequisites.length > 1 && (
//               <button
//                 type="button"
//                 onClick={() => removeFromArray("prerequisites", index)}
//                 style={removeButtonStyle}
//                 title="Remove prerequisite"
//               >
//                 ×
//               </button>
//             )}
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={() => addToArray("prerequisites")}
//           style={buttonStyle}
//         >
//           + Add Prerequisite
//         </button>
//       </div>

//       {/* Tags */}
//       <div style={fieldContainerStyle}>
//         <label>Tags</label>
//         {form.tags.map((item, index) => (
//           <div key={index} style={arrayItemStyle}>
//             <input
//               value={item}
//               onChange={(e) => handleArrayChange("tags", index, e.target.value)}
//               placeholder="Enter tag"
//               style={{ ...inputStyle, marginBottom: "0", marginRight: "10px" }}
//             />
//             {form.tags.length > 1 && (
//               <button
//                 type="button"
//                 onClick={() => removeFromArray("tags", index)}
//                 style={removeButtonStyle}
//                 title="Remove tag"
//               >
//                 ×
//               </button>
//             )}
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={() => addToArray("tags")}
//           style={buttonStyle}
//         >
//           + Add Tag
//         </button>
//       </div>

//       {/* Steps */}
//       <div style={fieldContainerStyle}>
//         <h3 style={{ marginTop: "30px" }}>Steps</h3>
//         {form.steps.map((step, i) => (
//           <div key={i} style={sectionStyle}>
//             {form.steps.length > 1 && (
//               <button
//                 type="button"
//                 onClick={() => removeStep(i)}
//                 style={removeTopRightStyle}
//                 title="Remove step"
//               >
//                 ×
//               </button>
//             )}

//             <label>Step Title</label>
//             <input
//               value={step.title}
//               onChange={(e) => handleStepChange(i, "title", e.target.value)}
//               placeholder="Step Title"
//               style={inputStyle}
//             />

//             <label>Step Description</label>
//             <textarea
//               value={step.description}
//               onChange={(e) =>
//                 handleStepChange(i, "description", e.target.value)
//               }
//               placeholder="Step Description"
//               style={textareaStyle}
//             />

//             {/* Resources */}
//             <div>
//               <label
//                 style={{
//                   fontWeight: "bold",
//                   display: "block",
//                   marginTop: "15px",
//                 }}
//               >
//                 Resources
//               </label>
//               {step.resources.map((res, j) => (
//                 <div key={j} style={resourceBlockStyle}>
//                   {step.resources.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeResource(i, j)}
//                       style={removeTopRightStyle}
//                       title="Remove resource"
//                     >
//                       ×
//                     </button>
//                   )}

//                   <div style={gridStyle}>
//                     <div>
//                       <label style={{ fontSize: "14px", color: "#666" }}>
//                         Resource Title
//                       </label>
//                       <input
//                         value={res.title}
//                         onChange={(e) =>
//                           handleResourceChange(i, j, "title", e.target.value)
//                         }
//                         placeholder="Resource Title"
//                         style={inputStyle}
//                       />
//                     </div>
//                     <div>
//                       <label style={{ fontSize: "14px", color: "#666" }}>
//                         Type
//                       </label>
//                       <select
//                         value={res.type}
//                         onChange={(e) =>
//                           handleResourceChange(i, j, "type", e.target.value)
//                         }
//                         style={inputStyle}
//                       >
//                         <option value="video">video</option>
//                         <option value="article">article</option>
//                         <option value="book">book</option>
//                         <option value="course">course</option>
//                       </select>
//                     </div>
//                   </div>
//                   <label style={{ fontSize: "14px", color: "#666" }}>
//                     Resource Link
//                   </label>
//                   <input
//                     value={res.link}
//                     onChange={(e) =>
//                       handleResourceChange(i, j, "link", e.target.value)
//                     }
//                     placeholder="Resource Link"
//                     style={inputStyle}
//                   />
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={() => addResource(i)}
//                 style={buttonStyle}
//               >
//                 + Add Resource
//               </button>
//             </div>
//           </div>
//         ))}
//         <button type="button" onClick={addStep} style={buttonStyle}>
//           + Add Step
//         </button>
//       </div>

//       <button 
//         type="button" 
//         onClick={handleSubmit} 
//         style={submitStyle}
//         disabled={isSubmitting} 
//       >
//         {isSubmitting ? "🔄 Creating..." : "✅ Submit Roadmap"}
//       </button>
//     </div>
//   );
// };

// export default RoadmapForm;


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

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const RoadmapDetails = () => {
//   const { id } = useParams();
//   const [roadmap, setRoadmap] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRoadmap = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/roadmaps/${id}`);
//         const data = await res.json();
//         setRoadmap(data);
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
//       <h2 className="mb-3">{roadmap.title}</h2>
//       <p>
//         <strong>Domain:</strong> {roadmap.domain}
//       </p>
//       <p>
//         <strong>Difficulty:</strong> {roadmap.difficulty}
//       </p>
//       <p>
//         <strong>Estimated Duration:</strong> {roadmap.estimatedDurationWeeks}{" "}
//         weeks
//       </p>
//       <p>
//         <strong>Tags:</strong> {roadmap.tags.join(", ")}
//       </p>

//       <h4 className="mt-4">Description</h4>
//       <p>{roadmap.description}</p>

//       <h4 className="mt-4">Prerequisites</h4>
//       <ul>
//         {roadmap.prerequisites.map((pre, idx) => (
//           <li key={idx}>{pre}</li>
//         ))}
//       </ul>

//       <h4 className="mt-4">Steps</h4>
//       {roadmap.steps.map((step, i) => (
//         <div key={i} className="mb-4 p-3 border rounded bg-light">
//           <h5>
//             Step {i + 1}: {step.title}
//           </h5>
//           <p>{step.description}</p>
//           <h6>Resources:</h6>
//           <ul>
//             {step.resources.map((res, j) => (
//               <li key={j}>
//                 <strong>{res.title}</strong> ({res.type}) –{" "}
//                 <a href={res.link} target="_blank" rel="noopener noreferrer">
//                   Link
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default RoadmapDetails;



import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VisualRoadmapSteps = ({ steps }) => {
  const roadmapContainerRef = useRef(null);
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
  const roadlineInitialTopPercent = 85;
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
        background: "#f9f9f9",
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
        `}
      </style>

      <div className="roadline" style={{
          position: "absolute",
          top: `${roadlineInitialTopPercent-10}%`,
          left: "0",
          width: "100%",
          height: `${roadlineHeightPx}px`,
          background: "linear-gradient(to right, #3b3b3b, #1c1c1c)",
          transform: `translateY(${roadlineTranslateYPercent}%) rotate(${roadlineAngleDegrees}deg)`,
          transformOrigin: "left center",
          zIndex: 1,
        }}>
        <div className="lane-divider" style={{
          position: "absolute",
          top: "50%",
          left: "0",
          width: "100%",
          height: "4px",
          background: "repeating-linear-gradient(to right, transparent, transparent 15px, white 15px, white 30px)",
        }}></div>
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
              position: "absolute",
              top: topPosition,
              left: leftPosition,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="step-circle" style={{
              width: `${stepCircleHeightPx}px`,
              height: `${stepCircleHeightPx}px`,
              borderRadius: "50%",
              backgroundColor: "#007bff",
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "18px",
              fontWeight: "bold",
              zIndex: 10,
            }}>{index + 1}</div>
            <div className="step-bubble" style={{
              background: "#fff",
              borderRadius: "8px",
              padding: "10px 15px",
              textAlign: "center",
              fontSize: "14px",
              maxWidth: "200px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              zIndex: "10"
            }}>
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
      <h2 className="mb-3">{roadmap.title}</h2>
      <p><strong>Domain:</strong> {roadmap.domain}</p>
      <p><strong>Difficulty:</strong> {roadmap.difficulty}</p>
      <p><strong>Estimated Duration:</strong> {roadmap.estimatedDurationWeeks} weeks</p>
      <p><strong>Tags:</strong> {roadmap.tags.join(", ")}</p>

      <h4 className="mt-4">Description</h4>
      <p>{roadmap.description}</p>

      <h4 className="mt-4">Prerequisites</h4>
      <ul>
        {roadmap.prerequisites.map((pre, idx) => <li key={idx}>{pre}</li>)}
      </ul>

      <div className="mt-4 steps-container">
        <h4 style={{ textAlign: "center", color: "#333" }}>Steps</h4>
        <VisualRoadmapSteps steps={roadmap.steps} />
      </div>
    </div>
  );
};

export default RoadmapDetails;
  