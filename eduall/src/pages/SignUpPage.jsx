import Breadcrumb from "../components/Breadcrumb";
import FooterOne from "../components/FooterOne";
import HeaderOne from "../components/HeaderOne";
import SignUpInner from "../components/SignUpInner";
import Animation from "../helper/Animation";
import Preloader from "../helper/Preloader";
import FooterTwo from "../components/FooterTwo";
const SignUpPage = () => {
  return (
    <>
      {/* Preloader */}
      <Preloader />

      {/* Animation */}
      <Animation />

      {/* HeaderTwo */}
      <HeaderOne />

      {/* Breadcrumb */}
      <Breadcrumb title={"Sign Up"} />

      {/* SignUpInner */}
      <SignUpInner />

      {/* FooterOne */}
      <FooterTwo />
    </>
  );
};

export default SignUpPage;
