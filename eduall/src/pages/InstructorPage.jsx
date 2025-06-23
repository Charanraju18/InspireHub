import Breadcrumb from "../components/Breadcrumb";
import CertificateOne from "../components/CertificateOne";
import FooterOne from "../components/FooterOne";
import FooterTwo from "../components/FooterTwo";
import HeaderOne from "../components/HeaderOne";
import InstructorAll from "../components/InstructorAll";
import Animation from "../helper/Animation";
import Preloader from "../helper/Preloader";

const InstructorPage = () => {
  return (
    <>
      {/* Preloader */}
      <Preloader />

      {/* Animation */}
      <Animation />

      {/* HeaderOne */}
      <HeaderOne />

      {/* Breadcrumb */}
      <Breadcrumb title={"Instructors"} />

      {/* InstructorAll */}
      <InstructorAll />

      {/* CertificateOne */}
      {/* <CertificateOne /> */}

      {/* FooterOne */}
      <FooterTwo />
    </>
  );
};

export default InstructorPage;
