// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import $ from "jquery";
// import "select2/dist/css/select2.min.css";
// import "select2/dist/js/select2.full.min.js";
// import "select2";
// import { useAuth } from "../authContext";

// const HeaderOne = () => {
//   let { pathname } = useLocation();
//   const navigate = useNavigate();
//   const { isAuthenticated, logout, user } = useAuth();
//   const [scroll, setScroll] = useState(false);
//   const [isMenuActive, setIsMenuActive] = useState(false);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       import("select2").then(() => {
//         const selectElement = $(".js-example-basic-single");
//         if (selectElement.length > 0) {
//           selectElement.select2(); // Initialize Select2
//         }
//       });
//     }

//     window.onscroll = () => {
//       if (window.pageYOffset < 150) {
//         setScroll(false);
//       } else if (window.pageYOffset > 150) {
//         setScroll(true);
//       }
//       return () => (window.onscroll = null);
//     };
//   }, []);

//   const toggleMenu = () => {
//     setIsMenuActive(!isMenuActive);
//     if (!isMenuActive) {
//       document.body.classList.add("scroll-hide-sm");
//     } else {
//       document.body.classList.remove("scroll-hide-sm");
//     }
//   };

//   const closeMenu = () => {
//     setIsMenuActive(false);
//     document.body.classList.remove("scroll-hide-sm");
//   };

//   const [activeSubmenu, setActiveSubmenu] = useState(null);
//   const [windowWidth, setWindowWidth] = useState(
//     typeof window !== "undefined" ? window.innerWidth : 0
//   );

//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleSubmenuClick = (index) => {
//     if (windowWidth < 992) {
//       setActiveSubmenu((prevIndex) => (prevIndex === index ? null : index));
//     }
//   };

//   // Profile tab logic
//   const handleProfileClick = () => {
//     if (isAuthenticated) {
//       navigate("/profile");
//     } else {
//       navigate("/sign-in");
//     }
//   };

//   // Header right user icon logic
//   const handleUserIconClick = () => {
//     if (isAuthenticated) {
//       logout();
//       navigate("/");
//     } else {
//       navigate("/sign-in");
//     }
//   };

//   const handleProtectedMenuClick = (to) => {
//     if (
//       !isAuthenticated &&
//       ["/roadmaps", "/instructor", "/events"].includes(to)
//     ) {
//       navigate("/sign-in");
//     } else {
//       navigate(to);
//     }
//   };

//   const menuItems = [
//     { to: "/", label: "Home" },
//     { to: "/about", label: "About" },
//     { to: "/roadmaps", label: "Roadmaps" },
//     { to: "/events", label: "Live Events" },
//     { to: "/instructor", label: "Instructors" },
//     { to: "/contact", label: "Contact" },
//   ];

//   return (
//     <>
//       <div className={`side-overlay ${isMenuActive ? "show" : ""}`}></div>
//       <header className={`header ${scroll ? "fixed-header" : ""}`}>
//         <div className="container container--xl">
//           <nav className="header-inner flex-between gap-8">
//             <div className="header-content-wrapper flex-align flex-grow-1">
//               {/* Logo Start */}
//               <div className="logo">
//                 <Link to="/" className="link">
//                   <img src="/assets/images/logo/logoo.png" alt="Logo" />
//                 </Link>
//               </div>
//               {/* Menu Start  */}
//               <div className="header-menu d-lg-block d-none">
//                 <ul className="nav-menu flex-align">
//                   {menuItems.map((item, index) =>
//                     item.links ? (
//                       <li
//                         key={`menu-item-${index}`}
//                         className="nav-menu__item has-submenu"
//                       >
//                         <span to="#" className="nav-menu__link">
//                           {item.label}
//                         </span>
//                         <ul className={`nav-submenu scroll-sm`}>
//                           {item.links.map((link, linkIndex) => (
//                             <li
//                               key={`submenu-item-${linkIndex}`}
//                               className={`nav-submenu__item ${
//                                 pathname === link.to && "activePage"
//                               }`}
//                             >
//                               <a
//                                 href={link.to}
//                                 className="nav-submenu__link hover-bg-neutral-30"
//                               >
//                                 {link.label}
//                               </a>
//                             </li>
//                           ))}
//                         </ul>
//                       </li>
//                     ) : (
//                       <li
//                         key={`menu-contact-${index}`}
//                         className={`nav-menu__item ${
//                           pathname === item.to && "activePage"
//                         }`}
//                       >
//                         {["/roadmaps", "/instructor", "/events"].includes(
//                           item.to
//                         ) ? (
//                           <button
//                             className="nav-menu__link"
//                             style={{
//                               background: "none",
//                               border: "none",
//                               padding: 0,
//                               cursor: "pointer",
//                             }}
//                             onClick={() => handleProtectedMenuClick(item.to)}
//                           >
//                             {item.label}
//                           </button>
//                         ) : (
//                           <a href={item.to} className="nav-menu__link">
//                             {item.label}
//                           </a>
//                         )}
//                       </li>
//                     )
//                   )}
//                 </ul>
//               </div>
//               {/* Menu End  */}
//             </div>
//             {/* Header Right start */}
//             <div className="header-right flex-align">
//               {isAuthenticated && (
//                 <>
//                   {user?.role === "Instructor" ? (
//                     // ✅ Show plus icon for Instructors
//                     <button
//                       onClick={() => navigate("/create-content")} // or desired path
//                       className="info-action w-52 h-52 bg-main-25 hover-bg-main-600 border border-neutral-30 rounded-circle flex-center text-2xl text-neutral-500 hover-text-white hover-border-main-600"
//                       style={{ marginRight: 8 }}
//                       title="Create Roadmap"
//                     >
//                       <i className="ph ph-plus" />
//                     </button>
//                   ) : (
//                     // ✅ Show wishlist icon for non-Instructors
//                     <button
//                       className="info-action w-52 h-52 bg-main-25 hover-bg-main-600 border border-neutral-30 rounded-circle flex-center text-2xl text-neutral-500 hover-text-white hover-border-main-600"
//                       style={{ marginRight: 8 }}
//                       title="Wishlist"
//                       onClick={() => navigate("/wishlist")}
//                     >
//                       <i className="ph ph-heart" />
//                     </button>
//                   )}
//                   <button
//                     onClick={handleProfileClick}
//                     className="info-action w-52 h-52 bg-main-25 hover-bg-main-600 border border-neutral-30 rounded-circle flex-center text-2xl text-neutral-500 hover-text-white hover-border-main-600"
//                     style={{ marginRight: 8 }}
//                     title="Profile"
//                   >
//                     <i className="ph ph-user-circle" />
//                   </button>
//                 </>
//               )}
//               <button
//                 onClick={handleUserIconClick}
//                 className="info-action w-52 h-52 bg-main-25 hover-bg-main-600 border border-neutral-30 rounded-circle flex-center text-2xl text-neutral-500 hover-text-white hover-border-main-600"
//                 style={{ marginRight: 8 }}
//                 title={isAuthenticated ? "Sign Out" : "Sign In"}
//               >
//                 <i
//                   className={`ph ${
//                     isAuthenticated ? "ph-sign-out" : "ph-user-circle"
//                   }`}
//                 />
//               </button>
//               <button
//                 type="button"
//                 className="toggle-mobileMenu d-lg-none text-neutral-200 flex-center"
//                 onClick={toggleMenu}
//               >
//                 <i className="ph ph-list" />
//               </button>
//             </div>
//             {/* Header Right End  */}
//           </nav>
//         </div>
//       </header>

//       <div
//         className={`mobile-menu scroll-sm d-lg-none d-block ${
//           isMenuActive ? "active" : ""
//         }`}
//       >
//         <button type="button" className="close-button" onClick={closeMenu}>
//           <i className="ph ph-x" />{" "}
//         </button>
//         <div className="mobile-menu__inner">
//           <Link to="/" className="mobile-menu__logo">
//             <img src="/assets/images/logo/logoo.png" alt="Logo" />
//           </Link>
//           <div className="mobile-menu__menu">
//             <ul className="nav-menu flex-align nav-menu--mobile">
//               {menuItems.map((item, index) =>
//                 item.links ? (
//                   <li
//                     key={`menu-item-${index}`}
//                     className={`nav-menu__item has-submenu ${
//                       activeSubmenu === index ? "activePage" : ""
//                     }`}
//                     onClick={() => handleSubmenuClick(index)}
//                   >
//                     <span className="nav-menu__link">{item.label}</span>
//                     <ul className={`nav-submenu scroll-sm`}>
//                       {item.links.map((link, linkIndex) => (
//                         <li key={linkIndex} className="nav-submenu__item">
//                           <Link
//                             to={link.to}
//                             className="nav-submenu__link hover-bg-neutral-30"
//                           >
//                             {link.label}
//                           </Link>
//                         </li>
//                       ))}
//                     </ul>
//                   </li>
//                 ) : (
//                   <li
//                     className={`nav-menu__item ${
//                       pathname === item.to && "activePage"
//                     }`}
//                     key={index}
//                   >
//                     {["/roadmaps", "/instructor", "/events"].includes(
//                       item.to
//                     ) ? (
//                       <button
//                         className="nav-menu__link"
//                         style={{
//                           background: "none",
//                           border: "none",
//                           padding: 0,
//                           cursor: "pointer",
//                         }}
//                         onClick={() => {
//                           handleProtectedMenuClick(item.to);
//                           closeMenu();
//                         }}
//                       >
//                         {item.label}
//                       </button>
//                     ) : (
//                       <Link to={item.to} className="nav-menu__link">
//                         {item.label}
//                       </Link>
//                     )}
//                   </li>
//                 )
//               )}
//             </ul>
//             <div className="d-sm-none d-block mt-24">
//               <div className="header-select mobile border border-neutral-30 bg-main-25 rounded-pill position-relative">
//                 <span className="select-icon position-absolute top-50 translate-middle-y inset-inline-start-0 z-1 ms-lg-4 ms-12 text-xl pointer-event-none d-flex">
//                   <i className="ph-bold ph-squares-four" />
//                 </span>
//                 <select
//                   className="js-example-basic-single border-0"
//                   name="state"
//                 >
//                   <option value={"Categories"}>Categories</option>
//                   <option value={"Design"}>Design</option>
//                   <option value={"Development"}>Development</option>
//                   <option value={"Architecture"}>Architecture</option>
//                   <option value={"Life Style"}>Life Style</option>
//                   <option value={"Data Science"}>Data Science</option>
//                   <option value={"Marketing"}>Marketing</option>
//                   <option value={"Music"}>Music</option>
//                   <option value={"Typography"}>Typography</option>
//                   <option value={"Finance"}>Finance</option>
//                   <option value={"Motivation"}>Motivation</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HeaderOne;

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import $ from "jquery";
import "select2/dist/css/select2.min.css";
import "select2/dist/js/select2.full.min.js";
import "select2";
import { useAuth } from "../authContext";

const HeaderOne = () => {
  let { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const [scroll, setScroll] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("select2").then(() => {
        const selectElement = $(".js-example-basic-single");
        if (selectElement.length > 0) {
          selectElement.select2();
        }
      });
    }

    window.onscroll = () => {
      if (window.pageYOffset < 150) {
        setScroll(false);
      } else if (window.pageYOffset > 150) {
        setScroll(true);
      }
      return () => (window.onscroll = null);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
    if (!isMenuActive) {
      document.body.classList.add("scroll-hide-sm");
    } else {
      document.body.classList.remove("scroll-hide-sm");
    }
  };

  const closeMenu = () => {
    setIsMenuActive(false);
    document.body.classList.remove("scroll-hide-sm");
  };

  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmenuClick = (index) => {
    if (windowWidth < 992) {
      setActiveSubmenu((prevIndex) => (prevIndex === index ? null : index));
    }
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      navigate("/sign-in");
    }
  };

  const handleUserIconClick = () => {
    if (isAuthenticated) {
      logout();
      navigate("/");
    } else {
      navigate("/sign-in");
    }
  };

  const handleProtectedMenuClick = (to) => {
    if (
      !isAuthenticated &&
      ["/roadmaps", "/instructor", "/events"].includes(to)
    ) {
      navigate("/sign-in");
    } else {
      navigate(to);
    }
    closeMenu(); // Close menu after navigation
  };

  const menuItems = [
    { to: "/", label: "Home", icon: "ph-house" },
    { to: "/about", label: "About", icon: "ph-info" },
    { to: "/roadmaps", label: "Roadmaps", icon: "ph-map-trifold" },
    { to: "/events", label: "Live Events", icon: "ph-calendar" },
    { to: "/instructor", label: "Instructors", icon: "ph-chalkboard-teacher" },
    { to: "/contact", label: "Contact", icon: "ph-envelope" },
  ];

  return (
    <>
      {/* Enhanced Mobile Menu Styles */}
      <style>
        {`
          /* Mobile Menu Improvements */
          @media (max-width: 991px) {
            .mobile-menu {
              background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
              box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
              border-radius: 0 0 24px 24px;
              overflow: hidden;
            }

            .mobile-menu__inner {
              padding: 1.5rem;
            }

            .mobile-menu__logo {
              display: flex;
              justify-content: center;
              margin-bottom: 2rem;
              padding-bottom: 1.5rem;
              border-bottom: 2px solid #e9ecef;
            }

            .mobile-menu__logo img {
              max-height: 45px;
              width: auto;
            }

            .nav-menu--mobile {
              flex-direction: column;
              gap: 0;
              width: 100%;
            }

            .nav-menu--mobile .nav-menu__item {
              width: 100%;
              margin: 0;
              border-bottom: 1px solid #f1f3f4;
            }

            .nav-menu--mobile .nav-menu__item:last-child {
              border-bottom: none;
            }

            .nav-menu--mobile .nav-menu__link {
              display: flex;
              align-items: center;
              gap: 12px;
              padding: 16px 20px;
              font-size: 16px;
              font-weight: 500;
              color: #2c3e50;
              text-decoration: none;
              transition: all 0.3s ease;
              border-radius: 12px;
              margin: 4px 0;
              position: relative;
              background: none;
              border: none;
              width: 100%;
              text-align: left;
              cursor: pointer;
            }

            .nav-menu--mobile .nav-menu__link:hover,
            .nav-menu--mobile .nav-menu__link:focus {
              background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
              color: white;
              transform: translateX(4px);
              box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
            }

            .nav-menu--mobile .nav-menu__item.activePage .nav-menu__link {
              background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
              color: white;
              box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
            }

            .nav-menu--mobile .nav-menu__link::before {
              content: '';
              display: inline-block;
              width: 20px;
              height: 20px;
              background-size: contain;
              flex-shrink: 0;
            }

            /* Icon styles for each menu item */
            .nav-menu--mobile .nav-menu__item:nth-child(1) .nav-menu__link::before {
              content: '🏠';
              font-size: 18px;
            }

            .nav-menu--mobile .nav-menu__item:nth-child(2) .nav-menu__link::before {
              content: 'ℹ️';
              font-size: 18px;
            }

            .nav-menu--mobile .nav-menu__item:nth-child(3) .nav-menu__link::before {
              content: '🗺️';
              font-size: 18px;
            }

            .nav-menu--mobile .nav-menu__item:nth-child(4) .nav-menu__link::before {
              content: '📅';
              font-size: 18px;
            }

            .nav-menu--mobile .nav-menu__item:nth-child(5) .nav-menu__link::before {
              content: '👨‍🏫';
              font-size: 18px;
            }

            .nav-menu--mobile .nav-menu__item:nth-child(6) .nav-menu__link::before {
              content: '📞';
              font-size: 18px;
            }

            /* Close button styling */
            .close-button {
              position: absolute;
              top: 20px;
              right: 20px;
              width: 40px;
              height: 40px;
              border: none;
              background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
              color: white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 18px;
              cursor: pointer;
              transition: all 0.3s ease;
              box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
            }

            .close-button:hover {
              transform: scale(1.1);
              box-shadow: 0 6px 20px rgba(220, 53, 69, 0.4);
            }

            /* Enhanced mobile menu animation */
            .mobile-menu {
              transform: translateX(-100%);
              transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .mobile-menu.active {
              transform: translateX(0);
            }

            /* Side overlay enhancement */
            .side-overlay {
              background: rgba(0, 0, 0, 0.5);
              backdrop-filter: blur(4px);
              transition: all 0.3s ease;
            }

            /* Categories dropdown in mobile */
            .header-select.mobile {
              margin-top: 1.5rem;
              padding-top: 1.5rem;
              border-top: 2px solid #e9ecef;
            }

            .header-select.mobile select {
              background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
              border: 2px solid #dee2e6;
              border-radius: 12px;
              padding: 12px 16px 12px 45px;
              font-size: 14px;
              font-weight: 500;
              color: #495057;
              transition: all 0.3s ease;
            }

            .header-select.mobile select:focus {
              border-color: #007bff;
              box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
              outline: none;
            }

            /* Authentication status indicator */
            .mobile-menu__auth-status {
              background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
              border: 2px solid #2196f3;
              border-radius: 12px;
              padding: 12px 16px;
              margin: 1rem 0;
              text-align: center;
              font-weight: 600;
              color: #1976d2;
              font-size: 14px;
            }

            /* Responsive improvements for very small screens */
            @media (max-width: 480px) {
              .mobile-menu__inner {
                padding: 1rem;
              }

              .nav-menu--mobile .nav-menu__link {
                padding: 14px 16px;
                font-size: 15px;
              }

              .mobile-menu__logo {
                margin-bottom: 1.5rem;
                padding-bottom: 1rem;
              }

              .close-button {
                top: 15px;
                right: 15px;
                width: 35px;
                height: 35px;
                font-size: 16px;
              }
            }
          }

          /* Ensure proper mobile menu positioning */
          @media (max-width: 991px) {
            .mobile-menu {
              position: fixed;
              top: 0;
              left: 0;
              width: 320px;
              max-width: 85vw;
              height: 100vh;
              z-index: 9999;
              overflow-y: auto;
            }
          }
        `}
      </style>

      <div className={`side-overlay ${isMenuActive ? "show" : ""}`}></div>
      <header className={`header ${scroll ? "fixed-header" : ""}`}>
        <div className="container container--xl">
          <nav className="header-inner flex-between gap-8">
            <div className="header-content-wrapper flex-align flex-grow-1">
              {/* Logo Start */}
              <div className="logo">
                <Link to="/" className="link">
                  <img src="/assets/images/logo/logoo.png" alt="Logo" />
                </Link>
              </div>
              {/* Menu Start  */}
              <div className="header-menu d-lg-block d-none">
                <ul className="nav-menu flex-align">
                  {menuItems.map((item, index) =>
                    item.links ? (
                      <li
                        key={`menu-item-${index}`}
                        className="nav-menu__item has-submenu"
                      >
                        <span to="#" className="nav-menu__link">
                          {item.label}
                        </span>
                        <ul className={`nav-submenu scroll-sm`}>
                          {item.links.map((link, linkIndex) => (
                            <li
                              key={`submenu-item-${linkIndex}`}
                              className={`nav-submenu__item ${
                                pathname === link.to && "activePage"
                              }`}
                            >
                              <a
                                href={link.to}
                                className="nav-submenu__link hover-bg-neutral-30"
                              >
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ) : (
                      <li
                        key={`menu-contact-${index}`}
                        className={`nav-menu__item ${
                          pathname === item.to && "activePage"
                        }`}
                      >
                        {["/roadmaps", "/instructor", "/events"].includes(
                          item.to
                        ) ? (
                          <button
                            className="nav-menu__link"
                            style={{
                              background: "none",
                              border: "none",
                              padding: 0,
                              cursor: "pointer",
                            }}
                            onClick={() => handleProtectedMenuClick(item.to)}
                          >
                            {item.label}
                          </button>
                        ) : (
                          <a href={item.to} className="nav-menu__link">
                            {item.label}
                          </a>
                        )}
                      </li>
                    )
                  )}
                </ul>
              </div>
              {/* Menu End  */}
            </div>
            {/* Header Right start */}
            <div className="header-right flex-align">
              {isAuthenticated && (
                <>
                  {user?.role === "Instructor" ? (
                    <button
                      onClick={() => navigate("/create-content")}
                      className="info-action w-52 h-52 bg-main-25 hover-bg-main-600 border border-neutral-30 rounded-circle flex-center text-2xl text-neutral-500 hover-text-white hover-border-main-600"
                      style={{ marginRight: 8 }}
                      title="Create Roadmap"
                    >
                      <i className="ph ph-plus" />
                    </button>
                  ) : (
                    <button
                      className="info-action w-52 h-52 bg-main-25 hover-bg-main-600 border border-neutral-30 rounded-circle flex-center text-2xl text-neutral-500 hover-text-white hover-border-main-600"
                      style={{ marginRight: 8 }}
                      title="Wishlist"
                      onClick={() => navigate("/wishlist")}
                    >
                      <i className="ph ph-heart" />
                    </button>
                  )}
                  <button
                    onClick={handleProfileClick}
                    className="info-action w-52 h-52 bg-main-25 hover-bg-main-600 border border-neutral-30 rounded-circle flex-center text-2xl text-neutral-500 hover-text-white hover-border-main-600"
                    style={{ marginRight: 8 }}
                    title="Profile"
                  >
                    <i className="ph ph-user-circle" />
                  </button>
                </>
              )}
              <button
                onClick={handleUserIconClick}
                className="info-action w-52 h-52 bg-main-25 hover-bg-main-600 border border-neutral-30 rounded-circle flex-center text-2xl text-neutral-500 hover-text-white hover-border-main-600"
                style={{ marginRight: 8 }}
                title={isAuthenticated ? "Sign Out" : "Sign In"}
              >
                <i
                  className={`ph ${
                    isAuthenticated ? "ph-sign-out" : "ph-user-circle"
                  }`}
                />
              </button>
              <button
                type="button"
                className="toggle-mobileMenu d-lg-none text-neutral-200 flex-center"
                onClick={toggleMenu}
              >
                <i className="ph ph-list" />
              </button>
            </div>
            {/* Header Right End  */}
          </nav>
        </div>
      </header>

      <div
        className={`mobile-menu scroll-sm d-lg-none d-block ${
          isMenuActive ? "active" : ""
        }`}
      >
        <button type="button" className="close-button" onClick={closeMenu}>
          <i className="ph ph-x" />
        </button>
        <div className="mobile-menu__inner">
          <Link to="/" className="mobile-menu__logo" onClick={closeMenu}>
            <img src="/assets/images/logo/logoo.png" alt="Logo" />
          </Link>

          {/* Authentication Status */}
          {isAuthenticated ? (
            <div className="mobile-menu__auth-status">
              👋 Welcome, {user?.name || "User"}!
            </div>
          ) : (
            <div className="mobile-menu__auth-status">
              🔐 Please sign in to access all features
            </div>
          )}

          <div className="mobile-menu__menu">
            <ul className="nav-menu flex-align nav-menu--mobile">
              {menuItems.map((item, index) =>
                item.links ? (
                  <li
                    key={`menu-item-${index}`}
                    className={`nav-menu__item has-submenu ${
                      activeSubmenu === index ? "activePage" : ""
                    }`}
                    onClick={() => handleSubmenuClick(index)}
                  >
                    <span className="nav-menu__link">{item.label}</span>
                    <ul className={`nav-submenu scroll-sm`}>
                      {item.links.map((link, linkIndex) => (
                        <li key={linkIndex} className="nav-submenu__item">
                          <Link
                            to={link.to}
                            className="nav-submenu__link hover-bg-neutral-30"
                            onClick={closeMenu}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li
                    className={`nav-menu__item ${
                      pathname === item.to && "activePage"
                    }`}
                    key={index}
                  >
                    {["/roadmaps", "/instructor", "/events"].includes(
                      item.to
                    ) ? (
                      <button
                        className="nav-menu__link"
                        onClick={() => handleProtectedMenuClick(item.to)}
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        to={item.to}
                        className="nav-menu__link"
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                )
              )}
            </ul>

            <div className="d-sm-none d-block mt-24">
              <div className="header-select mobile border border-neutral-30 bg-main-25 rounded-pill position-relative">
                <span className="select-icon position-absolute top-50 translate-middle-y inset-inline-start-0 z-1 ms-lg-4 ms-12 text-xl pointer-event-none d-flex">
                  <i className="ph-bold ph-squares-four" />
                </span>
                <select
                  className="js-example-basic-single border-0"
                  name="state"
                >
                  <option value={"Categories"}>Categories</option>
                  <option value={"Design"}>Design</option>
                  <option value={"Development"}>Development</option>
                  <option value={"Architecture"}>Architecture</option>
                  <option value={"Life Style"}>Life Style</option>
                  <option value={"Data Science"}>Data Science</option>
                  <option value={"Marketing"}>Marketing</option>
                  <option value={"Music"}>Music</option>
                  <option value={"Typography"}>Typography</option>
                  <option value={"Finance"}>Finance</option>
                  <option value={"Motivation"}>Motivation</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderOne;
