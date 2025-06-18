import { useEffect, useRef, useState } from "react";
import { VineSliderElement } from "./VineSliderElement";
import { Buy } from "./BuyModal";
import { vines } from "./BuyModal";

export const VineSlider = () => {
  const [numberSlide, setNumberSlide] = useState(0);
  const [isTransition, setIsTransition] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const slideRef = useRef(null);
  const sliderRef = useRef(null);
  const slideCount = Math.ceil(vines.length / 3) + 1;
  const { handleOrder, isPhone } = Buy();

  useEffect(() => {
    numberSlide === 4 ? setActiveSlide(0) : setActiveSlide(numberSlide);
    setIsTransition(true);
  }, [numberSlide]);

  const handleNext = () => {
    if (!isPhone) {
      if (numberSlide < Math.ceil(vines.length / 3 + 1)) {
        setNumberSlide((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setNumberSlide(0);
          setIsTransition(false);
        }, 0);
        setTimeout(() => {
          setNumberSlide((prev) => prev + 1);
          setActiveSlide(0);
        }, 1);
      }
    } else {
      if (numberSlide < Math.ceil(vines.length / 3 + 1)) {
        setNumberSlide((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setNumberSlide(0);
          setIsTransition(false);
        }, 0);
        setTimeout(() => {
          setNumberSlide((prev) => prev + 1);
        }, 100);
      }
    }
  };

  const handlePrev = () => {
    if (!isPhone) {
      if (numberSlide > 0) {
        setNumberSlide((prev) => prev - 1);
        if (activeSlide > 0) {
          setActiveSlide((prev) => prev - 1);
        } else {
          setActiveSlide(Math.ceil(vines.length / 3));
        }
      } else {
        setTimeout(() => {
          setIsTransition(false);
          setNumberSlide(Math.ceil(vines.length / 3 + 1));
        }, 0);
        setTimeout(() => {
          setNumberSlide((prev) => prev - 1);
        }, 1);
      }
    } else {
      if (numberSlide > 0) {
        setNumberSlide((prev) => prev - 1);
        if (activeSlide > 0) {
          setActiveSlide((prev) => prev - 1);
        } else {
          setActiveSlide(Math.ceil(vines.length / 3));
        }
      } else {
        setTimeout(() => {
          setIsTransition(false);
          setNumberSlide(Math.ceil(vines.length / 3 + 1));
        }, 0);
        setTimeout(() => {
          setNumberSlide((prev) => prev - 1);
        }, 100);
      }
    }
  };
  const handleSlide = (id) => {
    setActiveSlide(id);
    setNumberSlide(id);
  };

  const handleOrderVine = (vine) => {
    handleOrder(vine);
  };
  return (
    <>
      <div id="best__deals" className="bestDeals__slider__flex">
        <button className="arrow left" onClick={handlePrev}>
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30px"
            height="30px"
            viewBox="0 0 284.929 284.929"
          >
            <g>
              <path
                d="M282.082,76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856c-2.471,0-4.661,0.95-6.563,2.856L142.466,174.441
		L30.262,62.241c-1.903-1.906-4.093-2.856-6.567-2.856c-2.475,0-4.665,0.95-6.567,2.856L2.856,76.515C0.95,78.417,0,80.607,0,83.082
		c0,2.473,0.953,4.663,2.856,6.565l133.043,133.046c1.902,1.903,4.093,2.854,6.567,2.854s4.661-0.951,6.562-2.854L282.082,89.647
		c1.902-1.903,2.847-4.093,2.847-6.565C284.929,80.607,283.984,78.417,282.082,76.511z"
              />
            </g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
          </svg>
        </button>
        <div className="bestDeals__parrent__slider">
          <div
            ref={sliderRef}
            className={`bestDeals__slider ${
              isTransition ? "" : "noTransition"
            }`}
            style={{
              left:
                "-" + numberSlide * (slideRef.current?.offsetWidth + 40) + "px",
            }}
          >
            {vines.map((vine, index) => (
              <VineSliderElement
                key={index}
                vine={vine}
                slideRef={slideRef}
                handleOrderVine={handleOrderVine}
              />
            ))}
          </div>
        </div>
        <button className="arrow right" onClick={handleNext}>
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30px"
            height="30px"
            viewBox="0 0 284.929 284.929"
          >
            <g>
              <path
                d="M282.082,76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856c-2.471,0-4.661,0.95-6.563,2.856L142.466,174.441
		L30.262,62.241c-1.903-1.906-4.093-2.856-6.567-2.856c-2.475,0-4.665,0.95-6.567,2.856L2.856,76.515C0.95,78.417,0,80.607,0,83.082
		c0,2.473,0.953,4.663,2.856,6.565l133.043,133.046c1.902,1.903,4.093,2.854,6.567,2.854s4.661-0.951,6.562-2.854L282.082,89.647
		c1.902-1.903,2.847-4.093,2.847-6.565C284.929,80.607,283.984,78.417,282.082,76.511z"
              />
            </g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
          </svg>
        </button>
      </div>
      <div className="slide__counts">
        {Array.from(Array(slideCount).keys()).map((index) => (
          <button
            className={`slide_number ${
              activeSlide === index ? "active" : "inActive"
            }`}
            key={index}
            onClick={() => {
              handleSlide(index);
            }}
          ></button>
        ))}
      </div>
    </>
  );
};

