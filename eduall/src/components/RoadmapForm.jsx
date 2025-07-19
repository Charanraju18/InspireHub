import React, { useState } from "react";
import { useAuth } from "../authContext";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

// Available domain options
const DOMAIN_OPTIONS = [
  "Programming",
  "Web Design & Development",
  "Academic Skills",
  "Marketing",
  "Design (General)",
  "Technology",
  "Fashion Design",
  "Agriculture",
  "Biology & Life Sciences",
  "Data Science & Analytics",
  "Business & Entrepreneurship",
  "Mobile App Development",
  "Artificial Intelligence",
  "Cybersecurity",
  "Video Production & Editing",
  "Health & Nutrition",
  "Finance & Investing",
  "Photography",
  "Language & Communication",
  "Environmental Science",
];

// Tech stack per domain
const TECH_STACK_OPTIONS = {
  Programming: [
    "C", "C++", "Python", "Java", "JavaScript", "Rust", "Go", "C#",
    "Ruby", "Kotlin", "Algorithms", "Data Structures",
    "Git & GitHub", "Debugging Techniques", "Object-Oriented Programming", "Functional Programming"
  ],
  "Web Design & Development": [
    "HTML", "CSS", "JavaScript", "Tailwind CSS", "React.js",
    "Vue.js", "Angular", "Bootstrap", "UI/UX Basics", "Figma/Adobe XD",
    "Responsive Design", "Web Accessibility", "SEO Basics", "Web Animations", "Design Systems"
  ],
  "Academic Skills": [
    "Time Management", "Research Methods", "Academic Writing", "Note-Taking Systems",
    "Critical Thinking", "Exam Strategies", "Study Tools (Notion, Anki)",
    "Referencing (APA, MLA)", "Presentation Skills", "Online Learning Platforms"
  ],
   Marketing: [
    "Digital Marketing", "SEO", "SEM (Search Engine Marketing)", "Social Media Strategy",
    "Content Marketing", "Email Marketing", "Google Ads", "Facebook & Instagram Ads",
    "Analytics Tools (Google Analytics)", "Influencer Marketing", "Copywriting",
    "Funnel Building", "Affiliate Marketing"
  ],
  "Design (General)": [
    "Graphic Design", "Typography", "Color Theory", "Adobe Photoshop",
    "Adobe Illustrator", "Canva", "UI/UX Design", "Motion Graphics",
    "Logo Design", "Print Design", "Brand Identity", "Portfolio Creation"
  ],
  Technology: [
    "Artificial Intelligence", "Machine Learning", "Blockchain", "IoT (Internet of Things)",
    "Robotics", "AR/VR", "Cloud Computing", "Cybersecurity",
    "Edge Computing", "5G & Network Technologies", "Computer Vision", "Quantum Computing"
  ],
  "Fashion Design": [
    "Fashion Illustration", "Textile Science", "Sewing & Garment Construction", "Draping",
    "Fashion Marketing", "Trend Forecasting", "Fashion CAD Tools (CLO 3D)", "Pattern Making",
    "Sustainable Fashion", "Styling", "Portfolio Development"
  ],
  Agriculture: [
    "Crop Management", "Soil Science", "Organic Farming", "Precision Agriculture",
    "Agri-Tech (Sensors, Drones)", "Irrigation Systems", "Livestock Management",
    "Post-Harvest Management", "Agri-Business", "Farm Equipment", "Agri-Finance"
  ],
  "Biology & Life Sciences": [
    "Cell Biology", "Genetics", "Microbiology", "Molecular Biology",
    "Biochemistry", "Human Anatomy", "Physiology", "Immunology",
    "Ecology", "Biotechnology", "Bioinformatics", "Lab Techniques"
  ],
  "Data Science & Analytics": [
    "Excel", "SQL", "Python for Data Science", "R Programming",
    "Data Cleaning", "Data Visualization (Tableau, Power BI)", "Statistics",
    "Probability", "Machine Learning", "Pandas, NumPy", "Predictive Modeling", "Big Data Concepts"
  ],
  "Business & Entrepreneurship": [
    "Business Planning", "Lean Startup Model", "Market Research", "Product Development",
    "Business Finance", "Startup Fundraising", "Branding", "Sales Funnels",
    "Pitch Decks", "Customer Development", "Monetization Models"
  ],
  "Mobile App Development": [
    "React Native", "Flutter", "Swift (iOS)", "Kotlin (Android)",
    "UI/UX for Mobile", "Firebase Integration", "Mobile APIs",
    "App Deployment (Play Store, App Store)", "Push Notifications",
    "Mobile Security", "Cross-Platform Development"
  ],
  "Artificial Intelligence": [
    "Machine Learning", "Deep Learning", "Natural Language Processing", "Computer Vision",
    "Neural Networks", "TensorFlow", "PyTorch", "Scikit-learn",
    "Data Preprocessing", "Model Evaluation", "AI Ethics", "Reinforcement Learning"
  ],
  Cybersecurity: [
    "Network Security", "Ethical Hacking", "Penetration Testing", "Incident Response",
    "Risk Management", "Security Frameworks", "Cryptography", "Malware Analysis",
    "Digital Forensics", "Compliance Standards", "Security Tools"
  ],
  "Video Production & Editing": [
    "Video Editing Software", "Camera Techniques", "Lighting Setup", "Audio Production",
    "Post-Production Workflow", "Color Grading", "Motion Graphics", "Storyboarding",
    "Script Writing", "Video SEO"
  ],
  "Health & Nutrition": [
    "Nutrition Science", "Diet Planning", "Food Safety", "Health Assessment",
    "Supplement Knowledge", "Meal Prep", "Exercise Physiology", "Weight Management",
    "Chronic Disease Prevention", "Public Health"
  ],
  "Finance & Investing": [
    "Personal Finance", "Investment Strategies", "Stock Market Analysis", "Portfolio Management",
    "Risk Assessment", "Financial Planning", "Cryptocurrency", "Real Estate Investing",
    "Retirement Planning", "Tax Strategies"
  ],
  Photography: [
    "Camera Fundamentals", "Composition Techniques", "Lighting Techniques", "Photo Editing Software",
    "Portrait Photography", "Landscape Photography", "Product Photography", "Wedding Photography",
    "Street Photography", "Business Photography"
  ],
  "Language & Communication": [
    "Grammar & Syntax", "Vocabulary Building", "Pronunciation", "Writing Skills",
    "Reading Comprehension", "Speaking Fluency", "Cultural Context", "Business Communication",
    "Public Speaking", "Translation Skills"
  ],
  "Environmental Science": [
    "Climate Change", "Sustainability", "Environmental Policy", "Conservation Biology",
    "Pollution Control", "Renewable Energy", "Environmental Impact Assessment", "Green Technology",
    "Waste Management", "Environmental Law"
  ]
};

const RoadmapForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ Prevent multiple submissions

  const [form, setForm] = useState({
    title: "",
    domain: "",
    techstack: [],
    description: "",
    difficulty: "Beginner",
    duration: 1,
    thumbnail: null,
    prerequisites: [""],
    tags: [""],
    steps: [
      {
        title: "",
        description: "",
        resources: [{ title: "", link: "", type: "video" }],
      },
    ],
  });

  // Styles
  const inputStyle = {
    width: "100%",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "15px",
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: "120px",
    resize: "vertical",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "10px",
  };

  const submitStyle = {
    ...buttonStyle,
    backgroundColor: isSubmitting ? "#ccc" : "#28A745", // ✅ Visual feedback
    fontSize: "18px",
    padding: "15px 30px",
    cursor: isSubmitting ? "not-allowed" : "pointer", // ✅ Cursor feedback
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "20px",
  };

  const fieldContainerStyle = {
    marginBottom: "25px",
  };

  const arrayItemStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  };

  const removeButtonStyle = {
    padding: "5px 10px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    marginLeft: "10px",
  };

  const sectionStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "20px",
    position: "relative",
    backgroundColor: "#f9f9f9",
  };

  const removeTopRightStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    width: "25px",
    height: "25px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const resourceBlockStyle = {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "15px",
    marginBottom: "15px",
    position: "relative",
    backgroundColor: "#fff",
  };

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleArrayChange = (field, index, value) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm({ ...form, [field]: updated });
  };

  const addToArray = (field) => {
    setForm({ ...form, [field]: [...form[field], ""] });
  };

  const removeFromArray = (field, index) => {
    const updated = [...form[field]];
    updated.splice(index, 1);
    setForm({ ...form, [field]: updated });
  };

  const handleStepChange = (stepIndex, field, value) => {
    const updated = [...form.steps];
    updated[stepIndex][field] = value;
    setForm({ ...form, steps: updated });
  };

  const handleResourceChange = (stepIndex, resIndex, field, value) => {
    const updated = [...form.steps];
    updated[stepIndex].resources[resIndex][field] = value;
    setForm({ ...form, steps: updated });
  };

  const addStep = () => {
    setForm({
      ...form,
      steps: [
        ...form.steps,
        {
          title: "",
          description: "",
          resources: [{ title: "", link: "", type: "video" }],
        },
      ],
    });
  };

  const removeStep = (i) => {
    const updated = [...form.steps];
    updated.splice(i, 1);
    setForm({ ...form, steps: updated });
  };

  const addResource = (stepIndex) => {
    const updated = [...form.steps];
    updated[stepIndex].resources.push({ title: "", link: "", type: "video" });
    setForm({ ...form, steps: updated });
  };

  const removeResource = (stepIndex, resIndex) => {
    const updated = [...form.steps];
    updated[stepIndex].resources.splice(resIndex, 1);
    setForm({ ...form, steps: updated });
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Prevent multiple submissions
    if (isSubmitting) return;

    const userId = user?._id || user?.id;
    if (!userId) {
      alert("Please login to create a roadmap");
      navigate("/sign-in");
      return;
    }

    setIsSubmitting(true); // ✅ Disable button

    try {
      let base64Thumbnail = "";
      if (form.thumbnail) {
        base64Thumbnail = await toBase64(form.thumbnail);
      }

      const submitData = {
        createdBy: userId,
        title: form.title,
        domain: form.domain,
        techstack: form.techstack,
        description: form.description,
        difficulty: form.difficulty,
        duration: Number(form.duration),
        thumbnail: base64Thumbnail,
        prerequisites: form.prerequisites,
        tags: form.tags,
        steps: form.steps,
      };

      // ✅ Get authentication token with fallback
      const token =
        localStorage.getItem("token") || user?.token || user?.accessToken;

      const headers = {
        "Content-Type": "application/json",
      };

      // ✅ Only add auth header if token exists
      if (token && token !== "undefined" && token !== "null") {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(
        "https://inspirehub-backend-itne.onrender.com/api/roadmaps/create",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(submitData),
        }
      );

      const data = await res.json();

      // ✅ Better error handling
      if (!res.ok) {
        if (res.status === 401) {
          alert("Please login again to create a roadmap");
          navigate("/sign-in");
          return;
        }
        throw new Error(data.message || `Server error: ${res.status}`);
      }

      alert("🎉 Roadmap created successfully!");

      // ✅ Reset form
      setForm({
        title: "",
        domain: "",
        techstack: [],
        description: "",
        difficulty: "Beginner",
        duration: 1,
        thumbnail: null,
        prerequisites: [""],
        tags: [""],
        steps: [
          {
            title: "",
            description: "",
            resources: [{ title: "", link: "", type: "video" }],
          },
        ],
      });

      navigate("/profile#roadmaps-shared");
    } catch (error) {
      console.error("Error creating roadmap:", error);

      let errorMessage = "Failed to create roadmap. ";
      if (error.message.includes("token")) {
        errorMessage += "Please login again.";
        setTimeout(() => navigate("/sign-in"), 2000);
      } else if (error.message.includes("createdBy")) {
        errorMessage += "User authentication required.";
      } else {
        errorMessage += error.message;
      }

      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
      <div style={gridStyle}>
        <div>
          <label>Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            style={inputStyle}
          />
        </div>
        <div>
          <label>Domain</label>
          <select
            name="domain"
            value={form.domain}
            onChange={(e) => {
              const selected = e.target.value;
              setForm({ ...form, domain: selected, techstack: [] });
            }}
            style={inputStyle}
          >
            <option value="">-- Select Domain --</option>
            {DOMAIN_OPTIONS.map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </select>
        </div>
        {form.domain && TECH_STACK_OPTIONS[form.domain] && (
          <div style={fieldContainerStyle}>
            <label>Tech Stack</label>
            <Select
              isMulti
              name="techstack"
              options={TECH_STACK_OPTIONS[form.domain].map((item) => ({
                label: item,
                value: item,
              }))}
              value={form.techstack.map((item) => ({
                label: item,
                value: item,
              }))}
              onChange={(selected) =>
                setForm({
                  ...form,
                  techstack: selected.map((item) => item.value),
                })
              }
              styles={{
                control: (base) => ({
                  ...base,
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "2px",
                }),
              }}
            />
            <p style={{ fontSize: "12px", color: "#777" }}>
              Hold Ctrl (or Cmd) to select multiple
            </p>
          </div>
        )}
      </div>

      <div style={fieldContainerStyle}>
        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          style={textareaStyle}
        />
      </div>

      <div style={gridStyle}>
        <div>
          <label>Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, thumbnail: e.target.files[0] })}
          />
        </div>
      </div>

      <div style={gridStyle}>
        <div>
          <label>Difficulty</label>
          <select
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
            style={inputStyle}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
        <div>
          <label>Duration (in weeks)</label>
          <input
            type="number"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            placeholder="Duration (in weeks)"
            style={inputStyle}
          />
        </div>
      </div>

      {/* Prerequisites */}
      <div style={fieldContainerStyle}>
        <label>Prerequisites *</label>
        {form.prerequisites.map((item, index) => (
          <div key={index} style={arrayItemStyle}>
            <input
              value={item}
              onChange={(e) =>
                handleArrayChange("prerequisites", index, e.target.value)
              }
              placeholder="Enter prerequisite"
              style={{ ...inputStyle, marginBottom: "0", marginRight: "10px" }}
            />
            {form.prerequisites.length > 1 && (
              <button
                type="button"
                onClick={() => removeFromArray("prerequisites", index)}
                style={removeButtonStyle}
                title="Remove prerequisite"
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addToArray("prerequisites")}
          style={buttonStyle}
        >
          + Add Prerequisite
        </button>
      </div>

      {/* Tags */}
      <div style={fieldContainerStyle}>
        <label>Tags</label>
        {form.tags.map((item, index) => (
          <div key={index} style={arrayItemStyle}>
            <input
              value={item}
              onChange={(e) => handleArrayChange("tags", index, e.target.value)}
              placeholder="Enter tag"
              style={{ ...inputStyle, marginBottom: "0", marginRight: "10px" }}
            />
            {form.tags.length > 1 && (
              <button
                type="button"
                onClick={() => removeFromArray("tags", index)}
                style={removeButtonStyle}
                title="Remove tag"
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addToArray("tags")}
          style={buttonStyle}
        >
          + Add Tag
        </button>
      </div>

      {/* Steps */}
      <div style={fieldContainerStyle}>
        <h3 style={{ marginTop: "30px" }}>Steps</h3>
        {form.steps.map((step, i) => (
          <div key={i} style={sectionStyle}>
            {form.steps.length > 1 && (
              <button
                type="button"
                onClick={() => removeStep(i)}
                style={removeTopRightStyle}
                title="Remove step"
              >
                ×
              </button>
            )}

            <label>Step Title</label>
            <input
              value={step.title}
              onChange={(e) => handleStepChange(i, "title", e.target.value)}
              placeholder="Step Title"
              style={inputStyle}
            />

            <label>Step Description</label>
            <textarea
              value={step.description}
              onChange={(e) =>
                handleStepChange(i, "description", e.target.value)
              }
              placeholder="Step Description"
              style={textareaStyle}
            />

            {/* Resources */}
            <div>
              <label
                style={{
                  fontWeight: "bold",
                  display: "block",
                  marginTop: "15px",
                }}
              >
                Resources
              </label>
              {step.resources.map((res, j) => (
                <div key={j} style={resourceBlockStyle}>
                  {step.resources.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeResource(i, j)}
                      style={removeTopRightStyle}
                      title="Remove resource"
                    >
                      ×
                    </button>
                  )}

                  <div style={gridStyle}>
                    <div>
                      <label style={{ fontSize: "14px", color: "#666" }}>
                        Resource Title
                      </label>
                      <input
                        value={res.title}
                        onChange={(e) =>
                          handleResourceChange(i, j, "title", e.target.value)
                        }
                        placeholder="Resource Title"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "14px", color: "#666" }}>
                        Type
                      </label>
                      <select
                        value={res.type}
                        onChange={(e) =>
                          handleResourceChange(i, j, "type", e.target.value)
                        }
                        style={inputStyle}
                      >
                        <option value="video">video</option>
                        <option value="article">article</option>
                        <option value="book">book</option>
                        <option value="course">course</option>
                      </select>
                    </div>
                  </div>
                  <label style={{ fontSize: "14px", color: "#666" }}>
                    Resource Link
                  </label>
                  <input
                    value={res.link}
                    onChange={(e) =>
                      handleResourceChange(i, j, "link", e.target.value)
                    }
                    placeholder="Resource Link"
                    style={inputStyle}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => addResource(i)}
                style={buttonStyle}
              >
                + Add Resource
              </button>
            </div>
          </div>
        ))}
        <button type="button" onClick={addStep} style={buttonStyle}>
          + Add Step
        </button>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        style={submitStyle}
        disabled={isSubmitting}
      >
        {isSubmitting ? "🔄 Creating..." : "✅ Submit Roadmap"}
      </button>
    </div>
  );
};

export default RoadmapForm;