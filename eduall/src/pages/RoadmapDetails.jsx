import Breadcrumb from "../components/Breadcrumb";
import CertificateOne from "../components/CertificateOne";
import RoadmapDetailsOne from "../components/RoadmapDetailsOne";
import FooterOne from "../components/FooterOne";
import HeaderOne from "../components/HeaderOne";
import Animation from "../helper/Animation";
import Preloader from "../helper/Preloader";
import FooterTwo from "../components/FooterTwo";

const RoadmapDetailsPage = () => {
  return (
    <>
      {/* Preloader */}
      <Preloader />

      {/* Animation */}
      <Animation />

      {/* HeaderTwo */}
      <HeaderOne />

      {/* Breadcrumb */}
      <Breadcrumb title={"Roadmap Details"} />

      {/* EventDetailsOne */}
      <RoadmapDetailsOne />

      {/* CertificateOne */}
      {/* <CertificateOne /> */}

      {/* FooterOne */}
      <FooterTwo />
    </>
  );
};

export default RoadmapDetailsPage;
