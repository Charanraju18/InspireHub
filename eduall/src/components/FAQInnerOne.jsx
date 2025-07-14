// // import { Link } from "react-router-dom";
// // import { useRef } from "react";
// // import Slider from "react-slick";
// // import axios from "axios";
// // import { useState, useEffect } from "react";

// // const FAQInnerOne = () => {
// //   const sliderRef = useRef(null);

// //   const settings = {
// //     dots: true,
// //     infinite: true,
// //     speed: 500,
// //     slidesToShow: 2,
// //     slidesToScroll: 1,
// //   };

// //         const [comments, setComments] = useState(null);
// //         useEffect(() => {
// //           const fetchComments = async () => {
// //             try {
// //               const res = await axios.get(`http://localhost:5000/api/contact`);
// //               setComments(res.data);
// //             } catch (error) {
// //               console.error("Failed to fetch roadmap", error);
// //             } finally {
// //             }
// //           };
    
// //           fetchComments();
// //         },[]);
// //   return (
// //     <section className="faq-page py-120">
      
// //       <div className="container">
// //         <div className="section-heading text-center">
// //           <div className="flex-align d-inline-flex gap-8 mb-16 wow bounceInDown">
// //             <span className="text-main-600 text-2xl d-flex">
// //               <i className="ph-bold ph-book" />
// //             </span>
// //             <h5 className="text-main-600 mb-0">
// //               Voices from Our InspireHub Learners
// //             </h5>
// //           </div>
// //           <h2 className="mb-24 wow bounceIn">What Our Learners Are Saying</h2>
// //           <p className=" wow bounceInUp">
// //             Stories from our thriving community of learners who are growing
// //             through shared experiences and knowledge.
// //           </p>
// //         </div>
// //         <Slider
// //           ref={sliderRef}
// //           {...settings}
// //           className="testimonials-two-slider"
// //         >
// //           <div
// //             className="testimonials-two-item bg-main-25 rounded-12 p-32"
// //             data-aos="fade-up"
// //             data-aos-duration={400}
// //           >
// //             <p className="text-neutral-700 text-xl">
// //               "Exploring InspireHub has been a game-changer for me. The posts
// //               shared by instructors are insightful and practical. I’ve picked
// //               up skills that actually matter in real-world projects. Definitely
// //               a space I keep coming back to."
// //             </p>
// //             <div className="flex-between gap-24 flex-wrap pt-28 mt-28 border-top border-neutral-50 mt-28 border-dashed border-0">
// //               <div className="flex-align gap-24">
// //                 <img
// //                   src="assets/images/thumbs/men.png"
// //                   alt=""
// //                   className="w-60 h-60 object-fit-cover rounded-circle"
// //                 />
// //                 <div>
// //                   <h5 className="mb-8 fw-medium">Sachin</h5>
// //                   <span className="text-neutral-700">Graphic Designer</span>
// //                 </div>
// //               </div>
// //               <span className="quate text-48 d-flex opacity-25">
// //                 <img src="assets/images/icons/quote-icon.jpg" alt="" />
// //               </span>
// //             </div>
// //           </div>
// //           <div
// //             className="testimonials-two-item bg-main-25 rounded-12 p-32"
// //             data-aos="fade-up"
// //             data-aos-duration={600}
// //           >
// //             <p className="text-neutral-700 text-xl">
// //               "I wasn’t sure what to expect at first, but InspireHub changed
// //               how I see learning. The freedom to explore topics at my own pace
// //               and connect with experienced learners makes it an amazing
// //               platform!"
// //             </p>
// //             <div className="flex-between gap-24 flex-wrap pt-28 mt-28 border-top border-neutral-50 mt-28 border-dashed border-0">
// //               <div className="flex-align gap-24">
// //                 <img
// //                   src="assets/images/thumbs/women.png"
// //                   alt=""
// //                   className="w-60 h-60 object-fit-cover rounded-circle"
// //                 />
// //                 <div>
// //                   <h5 className="mb-8 fw-medium">Smriti</h5>
// //                   <span className="text-neutral-700">UI/UX Designer</span>
// //                 </div>
// //               </div>
// //               <span className="quate text-48 d-flex opacity-25">
// //                 <img src="assets/images/icons/quote-icon.png" alt="" />
// //               </span>
// //             </div>
// //           </div>
// //         </Slider>
// //         <div className="flex-center gap-16 mt-40">
// //           <button
// //             type="button"
// //             id="testimonials-two-prev"
// //             onClick={() => sliderRef.current.slickPrev()}
// //             className="slick-arrow flex-center rounded-circle"
// //           >
// //             <i className="ph ph-caret-left" />
// //           </button>
// //           <button
// //             type="button"
// //             id="testimonials-two-next"
// //             onClick={() => sliderRef.current.slickNext()}
// //             className="slick-arrow flex-center rounded-circle"
// //           >
// //             <i className="ph ph-caret-right" />
// //           </button>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default FAQInnerOne;



// import { useRef, useState, useEffect } from "react";
// import Slider from "react-slick";
// import axios from "axios";

// const FAQInnerOne = () => {
//   const sliderRef = useRef(null);
//   const [comments, setComments] = useState([]);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 2,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/contact");
//         setComments(res.data); // Assuming API returns an array of comments
//         console.log(comments);
//       } catch (error) {
//         console.error("Failed to fetch comments", error);
//       }
//     };

//     fetchComments();
//   }, []);

//   return (
//     <section className="faq-page py-120">
//       <div className="container">
//         <div className="section-heading text-center">
//           <div className="flex-align d-inline-flex gap-8 mb-16">
//             <span className="text-main-600 text-2xl d-flex">
//               <i className="ph-bold ph-book" />
//             </span>
//             <h5 className="text-main-600 mb-0">Voices from Our InspireHub Learners</h5>
//           </div>
//           <h2 className="mb-24">What Our Learners Are Saying</h2>
//           <p>
//             Stories from our thriving community of learners who are growing through shared experiences and knowledge.
//           </p>
//         </div>
//         <Slider ref={sliderRef} {...settings} className="testimonials-two-slider">
//           {comments.map((comment, index) => (
//             <div
//               key={index}
//               className="testimonials-two-item bg-main-25 rounded-12 p-32"
//               data-aos="fade-up"
//               data-aos-duration={400 + index * 200} // Slight delay for animation
//             >
//               <p className="text-neutral-700 text-xl">{comment.message}</p>
//               <div className="flex-between gap-24 flex-wrap pt-28 mt-28 border-top border-neutral-50 mt-28 border-dashed border-0">
//                 <div className="flex-align gap-24">
//                   <img
//                     src={ "/assets/images/users/user-img1.png"}// Replace with a dynamic image URL if available
//                     alt=""
//                     className="w-60 h-60 object-fit-cover rounded-circle"
//                   />
//                   <div>
//                     <h5 className="mb-8 fw-medium">{comment.name}</h5>
//                     <span className="text-neutral-700">{comment.email}</span>
//                   </div>
//                 </div>
//                 <span className="quate text-48 d-flex opacity-25">
//                   <img src="assets/images/icons/quote-icon.png" alt="" />
//                 </span>
//               </div>
//             </div>
//           ))}
//         </Slider>
//         <div className="flex-center gap-16 mt-40">
//           <button
//             type="button"
//             onClick={() => sliderRef.current.slickPrev()}
//             className="slick-arrow flex-center rounded-circle"
//           >
//             <i className="ph ph-caret-left" />
//           </button>
//           <button
//             type="button"
//             onClick={() => sliderRef.current.slickNext()}
//             className="slick-arrow flex-center rounded-circle"
//           >
//             <i className="ph ph-caret-right" />
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FAQInnerOne;





import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import axios from "axios";

const FAQInnerOne = () => {
  const sliderRef = useRef(null);

  const [comments, setComments] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/contact");
        setComments(res.data);
      } catch (error) {
        console.error("Failed to fetch comments", error);
      }
    };
    fetchComments();
  }, []);

  return (
    <section className="faq-page py-120">
      <div className="container">
        <div className="section-heading text-center">
          <div className="flex-align d-inline-flex gap-8 mb-16 wow bounceInDown">
            <span className="text-main-600 text-2xl d-flex">
              <i className="ph-bold ph-book" />
            </span>
            <h5 className="text-main-600 mb-0">Voices from Our InspireHub Learners</h5>
          </div>
          <h2 className="mb-24 wow bounceIn">What Our Learners Are Saying</h2>
          <p className=" wow bounceInUp">
            Stories from our thriving community of learners who are growing through shared experiences and knowledge.
          </p>
        </div>
        <Slider ref={sliderRef} {...settings} className="testimonials-two-slider">
          {comments.map((comment, index) => (
            <div
              key={index}
              className="testimonials-two-item bg-main-25 rounded-12 p-32"
              data-aos="fade-up"
              data-aos-duration={400 + index * 200}
            >
              <p className="text-neutral-700 text-xl">{comment.message}</p>
              <div className="flex-between gap-24 flex-wrap pt-28 mt-28 border-top border-neutral-50 mt-28 border-dashed border-0">
                <div className="flex-align gap-24">
                  <img
                    src={comment.user?.profilePicture || "assets/images/thumbs/default-profile.png"}
                    alt={comment.user?.name || "User"}
                    className="w-60 h-60 object-fit-cover rounded-circle"
                  />
                  <div>
                    <h5 className="mb-8 fw-medium">{comment.user?.name || "Anonymous"}</h5>
                    <span className="text-neutral-700">{comment.user?.role || "Learner"}</span>
                  </div>
                </div>
                <span className="quate text-48 d-flex opacity-25">
                  <img src="assets/images/icons/quote-icon.jpg" alt="Quote" />
                </span>
              </div>
            </div>
          ))}
        </Slider>
        <div className="flex-center gap-16 mt-40">
          <button
            type="button"
            id="testimonials-two-prev"
            onClick={() => sliderRef.current.slickPrev()}
            className="slick-arrow flex-center rounded-circle"
          >
            <i className="ph ph-caret-left" />
          </button>
          <button
            type="button"
            id="testimonials-two-next"
            onClick={() => sliderRef.current.slickNext()}
            className="slick-arrow flex-center rounded-circle"
          >
            <i className="ph ph-caret-right" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQInnerOne;
