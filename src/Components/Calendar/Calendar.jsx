import "./Calendar.css";
import { SlArrowLeftCircle, SlArrowRightCircle } from "react-icons/sl";
import { useEffect, useState } from "react";

// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";

export const Calendar = () => {
  const images = [
    "src/Images/Calendar/Spring.png",
    "src/Images/Calendar/Summer.png",
    "src/Images/Calendar/Fall.png",
    "src/Images/Calendar/Winter.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // useEffect to add CIC-background.png to Calendar.jsx
  useEffect(() => {
    document.body.style.backgroundImage = `url(src/Images/CIC-background.png)`;
    document.body.style.backgroundSize = "100vw 100vh";
    document.body.style.backgroundAttachment = "fixed";
  }, []);

  return (
    <div className="calendar-container">
      <header className="calendar-header">
        <img src="src/Images/Headers/Calendar-header1.png" />
      </header>

      <div>
        <button className="calendar-button" onClick={goToPrevious}><SlArrowLeftCircle /></button>

        <img
          className="calendar-images"
          src={images[currentIndex]}
          alt="image-carousel"
        />
        <button className="calendar-button" onClick={goToNext}><SlArrowRightCircle /></button>
      </div>
    </div>
  );
};
