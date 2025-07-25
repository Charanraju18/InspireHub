import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../authContext";

const SignInInner = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     console.log("Sending login request with:", { email, password });
  //     const res = await axios.post(
  //       `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
  //       { email, password },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     console.log("📦 Login response:", res.data);

  //     if (res.data && res.data.user) {
  //       localStorage.setItem("userEmail", res.data.user.email); // ✅ Store only email
  //       localStorage.setItem("token", res.data.token);          // Optional: store token
  //       login(res.data.user, res.data.token);                   // Update auth context
  //       console.log("📦 Login success:", res.data.user.email);
  //       navigate("/");                                          // Redirect after login
  //     } else {
  //       setError("Invalid credentials or account does not exist.");
  //     }
  //   } catch (err) {
  //     console.error("❌ Login error:", err);
  //     setError(
  //       err.response?.data?.message ||
  //         "Invalid credentials or account does not exist."
  //     );
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();

      console.log("Sending login request with:", {
        email: trimmedEmail,
        password: trimmedPassword,
      });

      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
        { email: trimmedEmail, password: trimmedPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("📦 Login response:", res.data);

      if (res.data && res.data.user) {
        localStorage.setItem("userEmail", res.data.user.email);
        localStorage.setItem("token", res.data.token);
        login(res.data.user, res.data.token);
        console.log("📦 Login success:", res.data.user.email);
        navigate("/");
      } else {
        setError("Invalid credentials or account does not exist.");
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      setError(
        err.response?.data?.msg || // Use `msg` from backend error response
          "Invalid credentials or account does not exist."
      );
    }
  };

  return (
    <div
      className="account py-120 position-relative d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="row gy-4 align-items-center justify-content-center w-100">
          <div className="col-lg-6 d-flex justify-content-center">
            <div
              className="bg-main-25 border border-neutral-30 rounded-8 p-32"
              style={{ minWidth: 400, maxWidth: 800, width: "100%" }}
            >
              <div className="mb-40">
                <h3 className="mb-16 text-neutral-500">Welcome Back!</h3>
                <p className="text-neutral-500">
                  Sign in to your account and join us
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-24">
                  <label
                    htmlFor="email"
                    className="fw-medium text-lg text-neutral-500 mb-16"
                  >
                    Enter Your Email ID
                  </label>
                  <input
                    type="email"
                    className="common-input rounded-pill"
                    id="email"
                    placeholder="Enter Your Email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-16">
                  <label
                    htmlFor="password"
                    className="fw-medium text-lg text-neutral-500 mb-16"
                  >
                    Enter Your Password
                  </label>
                  <div className="position-relative">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      className="common-input rounded-pill pe-44"
                      id="password"
                      placeholder="Enter Your Password..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span
                      className={`toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y ph-bold ${
                        passwordVisible ? "ph-eye" : "ph-eye-closed"
                      }`}
                      onClick={togglePasswordVisibility}
                      role="button"
                    ></span>
                  </div>
                </div>

                {error && <div className="text-danger mb-2">{error}</div>}

                <div className="mb-16 text-end">
                  <Link
                    to="/forgot"
                    className="text-warning-600 hover-text-decoration-underline"
                  >
                    Forget password
                  </Link>
                </div>

                <div className="mb-16">
                  <p className="text-neutral-500">
                    Don't have an account?{" "}
                    <Link
                      to="/sign-up"
                      className="fw-semibold text-main-600 hover-text-decoration-underline"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>

                <div className="mt-40">
                  <button
                    type="submit"
                    className="btn btn-main rounded-pill flex-center gap-8 mt-40"
                  >
                    Sign In
                    <i className="ph-bold ph-arrow-up-right d-flex text-lg" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Uncomment below if you want to include the image section */}
          {/* <div className="col-lg-6 d-lg-block d-none">
            <div className="account-img">
              <img src="assets/images/thumbs/account-img.png" alt="Login Visual" />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SignInInner;
