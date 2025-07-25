import AboutOne from "../components/AboutOne";
import BrandTwo from "../components/BrandTwo";
import Breadcrumb from "../components/Breadcrumb";
import CertificateOne from "../components/CertificateOne";
import ChooseUsOne from "../components/ChooseUsOne";
import CounterOne from "../components/CounterOne";
import FooterOne from "../components/FooterOne";
import HeaderOne from "../components/HeaderOne";
import InstructorOne from "../components/InstructorOne";
import TestimonialsOne from "../components/TestimonialsOne";
import Animation from "../helper/Animation";
import Preloader from "../helper/Preloader";
import FooterTwo from "../components/FooterTwo";
import AboutTwo from "../components/AboutTwo";
const AboutPage = () => {
  return (
    <>
      {/* Preloader */}
      <Preloader />

      {/* Animation */}
      <Animation />

      {/* HeaderOne */}
      <HeaderOne />

      {/* Breadcrumb */}
      <Breadcrumb title={"About Us"} />

      {/* AboutOne */}
      <AboutTwo />

      {/* InstructorOne */}
      <InstructorOne />

      {/* ChooseUsOne */}
      <ChooseUsOne />

      {/* CounterOne */}
      <CounterOne />

      {/* TestimonialsOne */}
      <TestimonialsOne />

      {/* BrandTwo */}
      <BrandTwo />

      {/* CertificateOne */}
      {/* <CertificateOne /> */}

      {/* FooterOne */}
      <FooterTwo />
    </>
  );
};

export default AboutPage;
