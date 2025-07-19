import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUpInner = () => {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    email: "",
    password: "",
    profilePicture: "",
    phoneNumber: "",
    location: "",
    bio: "",
    socialLinks: {
      linkedin: "",
      github: "",
      twitter: "",
      portfolio: "",
      youtube: "",
    },
    role: "",
    // Instructor fields
    experienceYears: "",
    currentlyWorkingAt: "",
    currentRole: "",
    previousCompanies: "",
    instructedDomains: "",
    techStack: "",
    // Learner fields
    currentEducation: "",
    yearOfStudy: "",
    interestedDomains: "",
    skillLevel: "",
    learningGoal: "",
    preferredLearningMode: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("socialLinks.")) {
      setForm({
        ...form,
        socialLinks: {
          ...form.socialLinks,
          [name.split(".")[1]]: value,
        },
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleRoleChange = (e) => {
    setForm({ ...form, role: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhoneNumber = (phone) => {
    return /^\d{10}$/.test(phone.replace(/\D/g, ""));
  };

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(
      password
    );
  };

  const handleSendOtp = async () => {
    setOtpError("");
    if (!validateEmail(form.email)) {
      setOtpError("Please enter a valid email address.");
      return;
    }
    setOtpLoading(true);
    try {
      const res = await fetch(
        "https://inspirehub-backend-itne.onrender.com/api/auth/otp-send",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.email }),
        }
      );
      if (res.ok) {
        setOtpSent(true);
        setOtpError("");
      } else {
        setOtpError("Failed to send OTP. Try again.");
      }
    } catch (err) {
      setOtpError("Network error. Try again.");
    }
    setOtpLoading(false);
  };

  const handleVerifyOtp = async () => {
    setOtpError("");
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      setOtpError("Enter the 6-digit OTP.");
      return;
    }
    setOtpLoading(true);
    try {
      const res = await fetch(
        "https://inspirehub-backend-itne.onrender.com/api/auth/otp-verify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.email, otp: enteredOtp }),
        }
      );
      if (res.ok) {
        setOtpVerified(true);
        setOtpError("");
      } else {
        const data = await res.json();
        setOtpError(data.error || "Invalid OTP.");
      }
    } catch (err) {
      setOtpError("Network error. Try again.");
    }
    setOtpLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!otpVerified) {
      setError("Please verify your email with OTP before signing up.");
      return;
    }

    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!form.gender) {
      setError("Gender is required.");
      return;
    }
    if (!validateEmail(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(form.password)) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
      );
      return;
    }
    if (!validatePhoneNumber(form.phoneNumber)) {
      setError("Please enter a valid phone number (10 digits).");
      return;
    }
    if (!form.location.trim()) {
      setError("Location is required.");
      return;
    }
    if (!form.role) {
      setError("Role is required.");
      return;
    }

    // Prepare payload
    const payload = {
      name: form.name,
      gender: form.gender,
      email: form.email,
      password: form.password,
      profilePicture: form.profilePicture,
      phoneNumber: form.phoneNumber.trim(),
      location: form.location.trim(),
      bio: form.bio,
      socialLinks: form.socialLinks,
      role: form.role,
    };
    if (form.role === "Instructor") {
      payload.instructorProfile = {
        experienceYears: form.experienceYears,
        currentlyWorkingAt: form.currentlyWorkingAt,
        currentRole: form.currentRole,
        previousCompanies: form.previousCompanies
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        instructedDomains: form.instructedDomains
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        techStack: form.techStack
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };
    } else if (form.role === "Learner") {
      payload.learnerProfile = {
        currentEducation: form.currentEducation,
        yearOfStudy: form.yearOfStudy,
        interestedDomains: form.interestedDomains
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        skillLevel: form.skillLevel,
        learningGoal: form.learningGoal,
        preferredLearningMode: form.preferredLearningMode,
      };
    }
    try {
      const res = await fetch(
        "https://inspirehub-backend-itne.onrender.com/api/auth/full-signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (res.ok) {
        navigate("/sign-in");
      } else {
        const data = await res.json();
        setError(data.msg || "Signup failed.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  const handleConfirmPass = (e) => {
    if (e.target.value !== form.password) {
      setError("Passwords do not match.");
    }
  };

  const handleOtpChange = (e, idx) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);

    // Move to next box if value entered
    if (value && idx < 5) {
      document.getElementById(`otp-box-${idx + 1}`)?.focus();
    }
  };

  // Add this new function to handle keydown events
  const handleKeyDown = (e, idx) => {
    // Handle backspace
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];

      if (newOtp[idx] !== "") {
        // Clear current box
        newOtp[idx] = "";
        setOtp(newOtp);
      } else if (idx > 0) {
        // Move to previous box and clear it
        newOtp[idx - 1] = "";
        setOtp(newOtp);
        document.getElementById(`otp-box-${idx - 1}`)?.focus();
      }
    }
  };

  return (
    <section className="py-120">
      <div className="container">
        <div className="border border-neutral-30 rounded-12 bg-main-25 p-24 bg-main-25">
          <form onSubmit={handleSubmit}>
            <h3 className="mb-24">Sign Up</h3>
            {/* Personal Info */}
            <div className="border border-neutral-30 rounded-12 bg-white p-24">
              <h5 className="mb-0">Personal Information</h5>
              <span className="d-block border border-main-50 my-24 border-dashed" />
              <div className="row gy-4">
                <div className="col-sm-6">
                  <label
                    htmlFor="name"
                    className="text-neutral-700 text-lg fw-medium mb-12"
                  >
                    Full Name <span className="text-danger-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="common-input bg-main-25 rounded-pill border-transparent focus-border-main-600"
                    id="name"
                    name="name"
                    placeholder="Enter Your Name..."
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-sm-6">
                  <label className="text-neutral-700 text-lg fw-medium mb-12">
                    Gender <span className="text-danger-600">*</span>
                  </label>
                  <select
                    className="common-input bg-main-25 rounded-pill border-transparent focus-border-main-600 form-select py-14"
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="col-sm-6">
                  <label
                    htmlFor="bio"
                    className="text-neutral-700 text-lg fw-medium mb-12"
                  >
                    Bio
                  </label>
                  <textarea
                    className="common-input bg-main-25 rounded-24 border-transparent focus-border-main-600"
                    id="bio"
                    name="bio"
                    placeholder="Tell us about yourself..."
                    value={form.bio}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-sm-6">
                  <label
                    htmlFor="profilePicture"
                    className="text-neutral-700 text-lg fw-medium mb-12"
                  >
                    Profile Picture
                  </label>
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      id="profilePicture"
                      name="profilePicture"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                    <label
                      htmlFor="profilePicture"
                      className="btn btn-main"
                      style={{
                        color: "#fff",
                        marginBottom: 0,
                        cursor: "pointer",
                      }}
                    >
                      Choose File
                    </label>
                    {form.profilePicture && (
                      <img
                        src={form.profilePicture}
                        alt="Preview"
                        style={{
                          maxWidth: 80,
                          maxHeight: 80,
                          borderRadius: "50%",
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Email and OTP Section */}
                <div className="col-sm-6">
                  <label
                    htmlFor="email"
                    className="text-neutral-700 text-lg fw-medium mb-12"
                  >
                    Email <span className="text-danger-600">*</span>
                  </label>
                  <div className="position-relative">
                    <input
                      type="email"
                      className="common-input bg-main-25 rounded-pill border-transparent focus-border-main-600 pe-100"
                      id="email"
                      name="email"
                      placeholder="Enter Your Email..."
                      value={form.email}
                      onChange={handleChange}
                      required
                      disabled={otpVerified}
                      style={{ paddingRight: 110 }}
                    />
                    <button
                      type="button"
                      className={`btn btn-main position-absolute top-50 translate-middle-y end-0 me-2 py-1 px-3 ${
                        otpVerified ? "btn-success" : ""
                      }`}
                      style={{
                        right: 0,
                        height: 36,
                        fontSize: 14,
                        minWidth: 80,
                      }}
                      onClick={handleSendOtp}
                      disabled={otpLoading || otpVerified}
                    >
                      {otpLoading
                        ? "Sending..."
                        : otpVerified
                        ? "Verified"
                        : "Verify"}
                    </button>
                  </div>
                </div>

                {/* OTP Verification Section - Responsive positioning */}
                <div className="col-sm-6 d-none d-md-block">
                  {/* Desktop: Show beside email (above 768px) */}
                  {otpSent && !otpVerified && (
                    <div className="mt-3 w-100">
                      <label className="text-neutral-700 text-lg fw-medium mb-12 d-block">
                        Email Verification
                      </label>
                      <div className="mb-3 text-center fw-medium text-sm text-neutral-600">
                        Enter the 6-digit OTP
                      </div>

                      {/* OTP Input Container */}
                      <div className="d-flex justify-content-center align-items-center mb-3">
                        <div className="d-flex gap-2 flex-nowrap">
                          {otp.map((digit, idx) => (
                            <input
                              key={idx}
                              id={`otp-box-desktop-${idx}`}
                              type="text"
                              maxLength={1}
                              value={digit}
                              onChange={(e) => handleOtpChange(e, idx)}
                              onKeyDown={(e) => handleKeyDown(e, idx)}
                              style={{
                                width: "45px",
                                height: "45px",
                                fontSize: "18px",
                                fontWeight: "600",
                                textAlign: "center",
                                border: "2px solid #e0e0e0",
                                borderRadius: "8px",
                                backgroundColor: "#f8f9fa",
                                color: "#333",
                                outline: "none",
                                transition: "all 0.3s ease",
                              }}
                              onFocus={(e) => {
                                e.target.style.borderColor = "#007bff";
                                e.target.style.backgroundColor = "#fff";
                                e.target.style.boxShadow =
                                  "0 0 0 2px rgba(0, 123, 255, 0.1)";
                                e.target.style.transform = "scale(1.05)";
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor = "#e0e0e0";
                                e.target.style.backgroundColor = "#f8f9fa";
                                e.target.style.boxShadow = "none";
                                e.target.style.transform = "scale(1)";
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Submit OTP Button - Compact for desktop */}
                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn btn-sm"
                          onClick={handleVerifyOtp}
                          disabled={otpLoading}
                          style={{
                            background: otpLoading
                              ? "linear-gradient(135deg, #6c757d 0%, #5a6268 100%)"
                              : "linear-gradient(135deg, #007bff 0%, #0056b3 100%)",
                            color: "#fff",
                            border: "none",
                            borderRadius: "20px",
                            padding: "8px 20px",
                            fontSize: "14px",
                            fontWeight: "600",
                            transition: "all 0.3s ease",
                            cursor: otpLoading ? "not-allowed" : "pointer",
                            minWidth: "120px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "6px",
                          }}
                        >
                          {otpLoading && (
                            <div
                              style={{
                                width: "12px",
                                height: "12px",
                                border: "2px solid transparent",
                                borderTop: "2px solid #fff",
                                borderRadius: "50%",
                                animation: "spin 1s linear infinite",
                              }}
                            />
                          )}
                          {otpLoading ? "Verifying..." : "Submit OTP"}
                        </button>
                      </div>
                    </div>
                  )}

                  {otpVerified && (
                    <div className="mt-3">
                      <div
                        className="text-success fw-semibold text-center p-2 rounded-8"
                        style={{
                          background:
                            "linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)",
                          border: "1px solid #c3e6cb",
                          fontSize: "14px",
                        }}
                      >
                        <i
                          className="ph-bold ph-check-circle me-1"
                          style={{ fontSize: "16px" }}
                        ></i>
                        Email verified!
                      </div>
                    </div>
                  )}

                  {!otpSent && !otpVerified && (
                    <div className="mt-3">
                      <div className="text-muted text-center small">
                        Click "Verify" to receive OTP
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile OTP Section - Full width below email (below 768px) */}
                <div className="col-sm-12 d-md-none">
                  {otpSent && !otpVerified && (
                    <div className="mt-3 w-100">
                      <label className="text-neutral-700 text-lg fw-medium mb-12 d-block">
                        Email Verification
                      </label>
                      <div className="mb-3 text-center fw-medium text-sm text-neutral-600">
                        Enter the 6-digit OTP sent to your email
                      </div>

                      {/* OTP Input Container */}
                      <div className="d-flex justify-content-center align-items-center mb-4">
                        <div
                          className="d-flex gap-2 flex-nowrap"
                          style={{
                            overflowX: "auto",
                            padding: "8px",
                            justifyContent: "center",
                            minWidth: "fit-content",
                          }}
                        >
                          {otp.map((digit, idx) => (
                            <input
                              key={idx}
                              id={`otp-box-mobile-${idx}`}
                              type="text"
                              maxLength={1}
                              value={digit}
                              onChange={(e) => handleOtpChange(e, idx)}
                              onKeyDown={(e) => handleKeyDown(e, idx)}
                              style={{
                                width: "45px",
                                height: "45px",
                                fontSize: "16px",
                                fontWeight: "600",
                                textAlign: "center",
                                border: "2px solid #e0e0e0",
                                borderRadius: "12px",
                                backgroundColor: "#f8f9fa",
                                color: "#333",
                                outline: "none",
                                transition: "all 0.3s ease",
                                flexShrink: 0,
                              }}
                              onFocus={(e) => {
                                e.target.style.borderColor = "#007bff";
                                e.target.style.backgroundColor = "#fff";
                                e.target.style.boxShadow =
                                  "0 0 0 3px rgba(0, 123, 255, 0.1)";
                                e.target.style.transform = "scale(1.05)";
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor = "#e0e0e0";
                                e.target.style.backgroundColor = "#f8f9fa";
                                e.target.style.boxShadow = "none";
                                e.target.style.transform = "scale(1)";
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Submit OTP Button */}
                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn position-relative"
                          onClick={handleVerifyOtp}
                          disabled={otpLoading}
                          style={{
                            background: otpLoading
                              ? "linear-gradient(135deg, #6c757d 0%, #5a6268 100%)"
                              : "linear-gradient(135deg, #007bff 0%, #0056b3 100%)",
                            color: "#fff",
                            border: "none",
                            borderRadius: "25px",
                            padding: "12px 32px",
                            fontSize: "16px",
                            fontWeight: "600",
                            letterSpacing: "0.5px",
                            boxShadow: otpLoading
                              ? "0 4px 15px rgba(108, 117, 125, 0.3)"
                              : "0 4px 15px rgba(0, 123, 255, 0.3)",
                            transition: "all 0.3s ease",
                            cursor: otpLoading ? "not-allowed" : "pointer",
                            minWidth: "160px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                          }}
                          onMouseEnter={(e) => {
                            if (!otpLoading) {
                              e.target.style.transform = "translateY(-2px)";
                              e.target.style.boxShadow =
                                "0 6px 20px rgba(0, 123, 255, 0.4)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!otpLoading) {
                              e.target.style.transform = "translateY(0)";
                              e.target.style.boxShadow =
                                "0 4px 15px rgba(0, 123, 255, 0.3)";
                            }
                          }}
                        >
                          {otpLoading && (
                            <div
                              style={{
                                width: "16px",
                                height: "16px",
                                border: "2px solid transparent",
                                borderTop: "2px solid #fff",
                                borderRadius: "50%",
                                animation: "spin 1s linear infinite",
                              }}
                            />
                          )}
                          {otpLoading ? "Verifying..." : "Submit OTP"}
                        </button>
                      </div>
                    </div>
                  )}

                  {otpVerified && (
                    <div className="mt-3">
                      <div
                        className="text-success fw-semibold text-center p-3 rounded-12"
                        style={{
                          background:
                            "linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)",
                          border: "1px solid #c3e6cb",
                        }}
                      >
                        <i
                          className="ph-bold ph-check-circle me-2"
                          style={{ fontSize: "18px" }}
                        ></i>
                        Email verified successfully!
                      </div>
                    </div>
                  )}

                  {!otpSent && !otpVerified && (
                    <div className="mt-3">
                      <div className="text-muted text-center small">
                        Click "Verify" to receive OTP
                      </div>
                    </div>
                  )}
                </div>

                {/* Error Message */}
                {otpError && (
                  <div className="col-sm-12">
                    <div
                      className="text-danger mt-2 text-center small fw-medium"
                      style={{
                        background: "#fff5f5",
                        border: "1px solid #fed7d7",
                        borderRadius: "8px",
                        padding: "8px 12px",
                      }}
                    >
                      {otpError}
                    </div>
                  </div>
                )}

                {/* Add CSS animation for spinner */}
                <style jsx>{`
                  @keyframes spin {
                    0% {
                      transform: rotate(0deg);
                    }
                    100% {
                      transform: rotate(360deg);
                    }
                  }
                `}</style>

                <div className="col-sm-6">
                  <label
                    htmlFor="password"
                    className="text-neutral-700 text-lg fw-medium mb-12"
                  >
                    Password <span className="text-danger-600">*</span>
                  </label>
                  <div className="position-relative">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      className="common-input bg-main-25 rounded-pill border-transparent focus-border-main-600 pe-44"
                      id="password"
                      name="password"
                      placeholder="Enter Your Password..."
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                    <span
                      className={`toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y ph-bold ${
                        passwordVisible ? "ph-eye" : "ph-eye-closed"
                      }`}
                      onClick={togglePasswordVisibility}
                    ></span>
                  </div>
                </div>
                <div className="col-sm-6">
                  <label
                    htmlFor="confirm-password"
                    className="text-neutral-700 text-lg fw-medium mb-12"
                  >
                    confirm password <span className="text-danger-600">*</span>
                  </label>
                  <div className="position-relative">
                    <input
                      type={passwordVisible ? "text" : "confirm-password"}
                      className="common-input bg-main-25 rounded-pill border-transparent focus-border-main-600 pe-44"
                      id="confirm-password"
                      name="confirm-password"
                      placeholder="Enter Your Password..."
                      onChange={(e) => handleConfirmPass(e)}
                      required
                    />
                    <span
                      className={`toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y ph-bold ${
                        passwordVisible ? "ph-eye" : "ph-eye-closed"
                      }`}
                      onClick={togglePasswordVisibility}
                    ></span>
                  </div>
                </div>
                <div className="col-sm-6">
                  <label
                    htmlFor="phoneNumber"
                    className="text-neutral-700 text-lg fw-medium mb-12"
                  >
                    Phone Number <span className="text-danger-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="common-input bg-main-25 rounded-pill border-transparent focus-border-main-600"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Enter Your Phone Number..."
                    value={form.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-sm-6">
                  <label
                    htmlFor="location"
                    className="text-neutral-700 text-lg fw-medium mb-12"
                  >
                    Location <span className="text-danger-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="common-input bg-main-25 rounded-pill border-transparent focus-border-main-600"
                    id="location"
                    name="location"
                    placeholder="Enter Your Location..."
                    value={form.location}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* Social Links */}
                <div className="col-sm-12">
                  <label className="text-neutral-700 text-lg fw-medium mb-12">
                    Social Links
                  </label>
                  <div className="row gy-2">
                    <div className="col-sm-4">
                      <input
                        type="text"
                        className="common-input bg-main-25 rounded-pill border-transparent focus-border-main-600"
                        name="socialLinks.linkedin"
                        placeholder="LinkedIn"
                        value={form.socialLinks.linkedin}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        className="common-input bg-main-25 rounded-pill border-transparent focus-border-main-600"
                        name="socialLinks.github"
                        placeholder="GitHub"
                        value={form.socialLinks.github}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        className="common-input bg-main-25 rounded-pill border-transparent focus-border-main-600"
                        name="socialLinks.twitter"
                        placeholder="Twitter"
                        value={form.socialLinks.twitter}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        className="common-input bg-main-25 rounded-pill border-transparent focus-border-main-600"
                        name="socialLinks.portfolio"
                        placeholder="Portfolio"
                        value={form.socialLinks.portfolio}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        className="common-input bg-main-25 rounded-pill border-transparent focus-border-main-600"
                        name="socialLinks.youtube"
                        placeholder="YouTube"
                        value={form.socialLinks.youtube}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                {/* Role Dropdown */}
                <div className="col-sm-6">
                  <label
                    htmlFor="role"
                    className="text-neutral-700 text-lg fw-medium mb-12"
                  >
                    Role <span className="text-danger-600">*</span>
                  </label>
                  <select
                    className="common-input bg-main-25 rounded-pill border-transparent focus-border-main-600 form-select py-14"
                    id="role"
                    name="role"
                    value={form.role}
                    onChange={handleRoleChange}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="Instructor">Instructor</option>
                    <option value="Learner">Learner</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Instructor Fields */}
            {form.role === "Instructor" && (
              <div className="border border-neutral-30 rounded-12 bg-white p-24 mt-24">
                <h5 className="mb-0">Instructor Profile</h5>
                <span className="d-block border border-main-50 my-24 border-dashed" />
                <div className="row gy-4">
                  <div className="col-sm-4">
                    <label className="text-neutral-700 text-lg fw-medium mb-12">
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      className="common-input bg-main-25 rounded-pill border-transparent focus-border-main-600"
                      name="experienceYears"
                      placeholder="e.g. 5"
                      value={form.experienceYears}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-4">
                    <label className="text-neutral-700 text-lg fw-medium mb-12">
                      Currently Working At
                    </label>
                    <input
                      type="text"
                      className="common-input bg-main-25 rounded-pill border-transparent focus-border-main-600"
                      name="currentlyWorkingAt"
                      placeholder="Company/Institute"
                      value={form.currentlyWorkingAt}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-4">
                    <label className="text-neutral-700 text-lg fw-medium mb-12">
                      Current Role
                    </label>
                    <input
                      type="text"
                      className="common-input bg-main-25 rounded-pill border-transparent focus-border-main-600"
                      name="currentRole"
                      placeholder="e.g. Senior Instructor"
                      value={form.currentRole}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label className="text-neutral-700 text-lg fw-medium mb-12">
                      Previous Companies (comma separated)
                    </label>
                    <input
                      type="text"
                      className="common-input bg-main-25 rounded-pill border-transparent focus-border-main-600"
                      name="previousCompanies"
                      placeholder="e.g. Google, Microsoft"
                      value={form.previousCompanies}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label className="text-neutral-700 text-lg fw-medium mb-12">
                      Instructed Domains (comma separated)
                    </label>
                    <input
                      type="text"
                      className="common-input bg-main-25 rounded-pill border-transparent focus-border-main-600"
                      name="instructedDomains"
                      placeholder="e.g. Web Dev, AI"
                      value={form.instructedDomains}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-12">
                    <label className="text-neutral-700 text-lg fw-medium mb-12">
                      Tech Stack (comma separated)
                    </label>
                    <input
                      type="text"
                      className="common-input bg-main-25 rounded-pill border-transparent focus-border-main-600"
                      name="techStack"
                      placeholder="e.g. React, Node.js, Python"
                      value={form.techStack}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            )}
            {/* Learner Fields */}
            {form.role === "Learner" && (
              <div className="border border-neutral-30 rounded-12 bg-white p-24 mt-24">
                <h5 className="mb-0">Learner Profile</h5>
                <span className="d-block border border-main-50 my-24 border-dashed" />
                <div className="row gy-4">
                  <div className="col-sm-4">
                    <label className="text-neutral-700 text-lg fw-medium mb-12">
                      Current Education
                    </label>
                    <input
                      type="text"
                      className="common-input bg-main-25 rounded-pill border-transparent focus-border-main-600"
                      name="currentEducation"
                      placeholder="e.g. BSc Computer Science"
                      value={form.currentEducation}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-4">
                    <label className="text-neutral-700 text-lg fw-medium mb-12">
                      Year of Study
                    </label>
                    <input
                      type="text"
                      className="common-input bg-main-25 rounded-pill border-transparent focus-border-main-600"
                      name="yearOfStudy"
                      placeholder="e.g. 2nd Year"
                      value={form.yearOfStudy}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-4">
                    <label className="text-neutral-700 text-lg fw-medium mb-12">
                      Interested Domains (comma separated)
                    </label>
                    <input
                      type="text"
                      className="common-input bg-main-25 rounded-pill border-transparent focus-border-main-600"
                      name="interestedDomains"
                      placeholder="e.g. Data Science, ML"
                      value={form.interestedDomains}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-4">
                    <label className="text-neutral-700 text-lg fw-medium mb-12">
                      Skill Level
                    </label>
                    <select
                      className="common-input bg-main-25 rounded-pill border-transparent focus-border-main-600 form-select py-14"
                      name="skillLevel"
                      value={form.skillLevel}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <div className="col-sm-4">
                    <label className="text-neutral-700 text-lg fw-medium mb-12">
                      Learning Goal
                    </label>
                    <input
                      type="text"
                      className="common-input bg-main-25 rounded-pill border-transparent focus-border-main-600"
                      name="learningGoal"
                      placeholder="e.g. Become a developer"
                      value={form.learningGoal}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-4">
                    <label className="text-neutral-700 text-lg fw-medium mb-12">
                      Preferred Learning Mode
                    </label>
                    <select
                      className="common-input bg-main-25 rounded-pill border-transparent focus-border-main-600 form-select py-14"
                      name="preferredLearningMode"
                      value={form.preferredLearningMode}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="Video">Video</option>
                      <option value="Article">Article</option>
                      <option value="Project-Based">Project-Based</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            {error && <div className="text-danger mb-2">{error}</div>}
            <div className="col-sm-12 mt-24">
              <button
                type="submit"
                className="btn btn-main rounded-pill flex-center gap-8"
              >
                Sign Up
                <i className="ph-bold ph-arrow-up-right d-flex text-lg" />
              </button>
            </div>
            <div className="col-sm-12">
              <p className="text-neutral-500 mt-8">
                Have an account?{" "}
                <Link
                  to="/sign-in"
                  className="fw-semibold text-main-600 hover-text-decoration-underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUpInner;
