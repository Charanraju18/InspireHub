import Breadcrumb from "../components/Breadcrumb";
import CertificateOne from "../components/CertificateOne";
import EventDetailsOne from "../components/EventDetailsOne";
import FooterOne from "../components/FooterOne";
import FooterTwo from "../components/FooterTwo";
import HeaderOne from "../components/HeaderOne";
import Animation from "../helper/Animation";
import Preloader from "../helper/Preloader";

const EventDetailsPage = () => {
  return (
    <>
      {/* Preloader */}
      <Preloader />

      {/* Animation */}
      <Animation />

      {/* HeaderTwo */}
      <HeaderOne />

      {/* Breadcrumb */}
      <Breadcrumb title={"Event Details"} />

      {/* EventDetailsOne */}
      <EventDetailsOne />

      {/* CertificateOne */}
      {/* <CertificateOne /> */}

      {/* FooterOne */}
      <FooterTwo />
    </>
  );
};

export default EventDetailsPage;
