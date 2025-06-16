import { useNavigate } from "react-router-dom";

const CreateContent = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      title: "Create Roadmap",
      description: "Design and share a structured roadmap for learners.",
      image: "/assets/images/thumbs/blog-img1.png", // Replace with your actual image path
      redirect: "/create-roadmap",
    },
    {
      title: "Create Live Event",
      description: "Host a live session for students to join and learn.",
      image: "/assets/images/thumbs/blog-img1.png", // Replace with your actual image path
      redirect: "/create-event",
    },
  ];

  return (
    <div className="container py-12">
      <div className="row justify-content-center gap-8">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="col-sm-6 pt-6 pb-8 m-10"
            style={{ flex: "0 0 30%", maxWidth: "30%", cursor: "pointer" }}
            onClick={() => navigate(card.redirect)}
            role="button"
          >
            <div className="scale-hover-item bg-light rounded-16 p-12 h-100 border">
              <div className="rounded-12 overflow-hidden position-relative">
                <img
                  src={card.image}
                  alt={card.title}
                  className="rounded-12 w-100"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              </div>

              <div className="pt-3">
                <h5 className="mb-2">{card.title}</h5>
                <p className="text-muted">{card.description}</p>
                <div className="btn btn-primary w-100 mt-3">Start</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateContent;
