import Breadcrumb from "../components/Breadcrumb";
import CertificateOne from "../components/CertificateOne";
import FooterOne from "../components/FooterOne";
import HeaderOne from "../components/HeaderOne";
import Animation from "../helper/Animation";
import Preloader from "../helper/Preloader";
import RoadmapsAll from "../components/RoadmapsAll";

const RoadmapsPage = () => {
  return (
    <>
      {/* Preloader */}
      <Preloader />

      {/* Animation */}
      <Animation />

      {/* HeaderTwo */}
      <HeaderOne />

      {/* Breadcrumb */}
      <Breadcrumb title={"Roadmaps"} />

      {/* RoadmapsAll */}
      <RoadmapsAll />

      {/* CertificateOne */}
      <CertificateOne />

      {/* FooterOne */}
      <FooterOne />
    </>
  );
};

export default RoadmapsPage;
