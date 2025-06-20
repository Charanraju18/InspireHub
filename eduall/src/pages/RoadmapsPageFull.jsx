import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import FooterOne from "../components/FooterOne";
import HeaderOne from "../components/HeaderOne";
import RoadmapsPage from "../components/RoadmapsPage";
import Animation from "../helper/Animation";
import Preloader from "../helper/Preloader";

const RoadmapsPageFull = () => {
  return (
    <>
      {/* Preloader */}
      <Preloader />

      {/* Animation */}
      <Animation />

      {/* Header */}
      <HeaderOne />

      {/* Breadcrumb */}
      <Breadcrumb title={"Learning Roadmaps"} />

      {/* Main Roadmaps Content */}
      <RoadmapsPage />

      {/* Footer */}
      <FooterOne />
    </>
  );
};

export default RoadmapsPageFull;