import Breadcrumb from "../components/Breadcrumb";
import CertificateOne from "../components/CertificateOne";
import ContactInner from "../components/ContactInner";
import FAQInnerOne from "../components/FAQInnerOne";
import FooterOne from "../components/FooterOne";
import FooterTwo from "../components/FooterTwo";
import HeaderOne from "../components/HeaderOne";
import Animation from "../helper/Animation";
import Preloader from "../helper/Preloader";

const ContactPage = () => {
  return (
    <>
      {/* Preloader */}
      <Preloader />

      {/* Animation */}
      <Animation />

      {/* HeaderTwo */}
      <HeaderOne />

      {/* Breadcrumb */}
      <Breadcrumb title={"Contact"} />

      {/* FAQS */}
      <FAQInnerOne />

      {/* ContactInner */}
      <ContactInner />

      {/* CertificateOne */}
      {/* <CertificateOne /> */}

      {/* FooterOne */}
      <FooterTwo />
    </>
  );
};

export default ContactPage;
