import Breadcrumb from "../components/Breadcrumb";
import CertificateOne from "../components/CertificateOne";
import EventForm from "../components/CreateEvent";
import FooterOne from "../components/FooterOne";
import FooterTwo from "../components/FooterTwo";
import HeaderOne from "../components/HeaderOne";
import Animation from "../helper/Animation";
import Preloader from "../helper/Preloader";

const CreateEventsPage = () => {
  return (
    <>
      {/* Preloader */}
      <Preloader />

      {/* Animation */}
      <Animation />

      {/* HeaderTwo */}
      <HeaderOne />

      {/* Breadcrumb */}
      <Breadcrumb title={"Create Event"} />

      {/* EventsAllOne */}
      <EventForm />

      {/* CertificateOne */}
      {/* <CertificateOne /> */}

      {/* FooterOne */}
      <FooterTwo />
    </>
  );
};

export default CreateEventsPage;
