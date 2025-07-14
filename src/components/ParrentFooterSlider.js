import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { FooterSlider } from "./FooterSlider";
import footerGridOne from "../img/footerGridOne.webp";
import footerGridTwo from "../img/footerGridTwo.webp";
import footerGridThree from "../img/footerGridThree.webp";
import footerGridFour from "../img/footerGridFour.webp";
import footerGridFive from "../img/footerGridFive.webp";
import footerGridSix from "../img/footerGridSix.webp";

const images = [
  {
    id: 1,
    subId: 1,
    img: footerGridOne,
  },
  {
    id: 2,
    subId: 2,
    img: footerGridTwo,
  },
  {
    id: 3,
    subId: 3,
    img: footerGridThree,
  },
  {
    id: 4,
    subId: 4,
    img: footerGridFour,
  },
  {
    id: 5,
    subId: 5,
    img: footerGridFive,
  },
  {
    id: 6,
    subId: 6,
    img: footerGridSix,
  },
  {
    id: 1,
    subId: 7,
    img: footerGridOne,
  },
];

export const ParrentFooterSlider = () => {
  const [isActiveSlider, setIsActiveSlider] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnim, setIsAnim] = useState();
  const [slideWidth, setSlideWidth] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [sliderTranslate, setSliderTranslate] = useState(0);
  const [isClickDisabled, setIsClickDisabled] = useState(false);
  const [scaleCount, setScaleCount] = useState(0);
  const [wrapperSize, setWrapperSize] = useState({
    height: window.innerHeight,
    width: window.offsetWidth,
  });
  const [isDrag, setIsDrag] = useState(false);
  const sliderWidthRef = useRef(null);
  const slideRef = useRef(null);
  const initialMousePos = useRef({ x: 0 });

  const countSlides = useMemo(() => {
    return images.length;
  }, []);

  const handleOpenSlider = (id) => {
    new Promise(() => {
      setIsAnim(false);
    })
      .then(setActiveSlide(id))
      .then(
        setTimeout(() => {
          setIsAnim(true);
        }, 100)
      )
      .then(setIsActiveSlider(true));
  };

  const handleCloseSlider = () => {
    setIsActiveSlider(false);
    setScaleCount(0);
  };

  const handleDisabled = () => {
    setIsClickDisabled(true);
    setTimeout(() => {
      setIsClickDisabled(false);
    }, 700);
  };

  const handleNext = () => {
    setScaleCount(0);
    handleDisabled();
    if (activeSlide < countSlides - 1) {
      setActiveSlide((prev) => prev + 1);
    } else {
      setIsAnim(false);
      setActiveSlide(0);
      setTimeout(() => {
        setIsAnim(true);
        setActiveSlide(1);
      }, 50);
    }
  };

  const handlePrev = () => {
    setScaleCount(0);
    handleDisabled();
    if (activeSlide >= 1) {
      setActiveSlide((prev) => prev - 1);
    } else {
      setIsAnim(false);
      setActiveSlide(countSlides - 1);
      setTimeout(() => {
        setIsAnim(true);
        setActiveSlide(countSlides - 2);
      }, 50);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setSliderTranslate(slideWidth * activeSlide);
      setWrapperSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
      setSlideWidth(slideRef.current?.offsetWidth);
      if (sliderWidthRef.current) {
        setSliderWidth(sliderWidthRef.current.offsetWidth * images.length);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeSlide, slideWidth, sliderWidth, isDrag]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    if (scaleCount === 0) {
      setIsDrag(true);
      initialMousePos.current = { x: e.clientX };
    }
  };

  const handleMouseUp = useCallback(
    (e) => {
      setIsDrag(false);
      if (!isDrag) return;
      const dx = e.clientX - initialMousePos.current.x;
      if (dx < 0) {
        setActiveSlide((prev) => {
          if (prev <= countSlides - 2) {
            return prev + 1;
          } else {
            setIsAnim(false);
            setActiveSlide(0);
            setTimeout(() => {
              setIsAnim(true);
              setActiveSlide(1);
            }, 50);
          }
        });
      } else if (dx > 0) {
        setActiveSlide((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            setIsAnim(false);
            setActiveSlide(countSlides - 1);
            setTimeout(() => {
              setIsAnim(true);
              setActiveSlide(countSlides - 2);
            }, 50);
          }
        });
      } else return;
    },
    [isDrag, countSlides]
  );

  useEffect(() => {
    if (isDrag) {
      document.body.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.body.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDrag, handleMouseUp]);

  const handleScaleMore = () => {
    setScaleCount((prev) => {
      if (prev < 3) {
        return prev + 1;
      } else return prev;
    });
  };
  const handleScaleLess = () => {
    setScaleCount((prev) => {
      if (prev > 0) {
        return prev - 1;
      } else return prev;
    });
  };
  return (
    <>
      <div className="footer__flex__element">
        <div className="footer__flex__element__title">Instagram</div>
        <div className="what__we__do__flex__line"></div>
        <div className="footer__flex__element__grid">
          {images
            .filter((el) => el.subId <= el.id)
            .map((el) => (
              <img
                onClick={() => {
                  handleOpenSlider(el.id - 1);
                }}
                key={el.id}
                src={el.img}
                alt=""
                className="footer__flex__element"
              />
            ))}
        </div>
      </div>
      {isActiveSlider && (
        <div className="parrent__footer__slider">
          <div className="footer__slider__buttons">
            <button
              className={`footer__slider__top__button slider__more__size ${
                scaleCount !== 3 ? "active" : "inActive"
              }`}
              onClick={handleScaleMore}
            ></button>
            <button
              className={`footer__slider__top__button slider__less__size ${
                scaleCount !== 0 ? "active" : "inActive"
              }`}
              onClick={handleScaleLess}
            ></button>
            <button
              className="footer__slider__top__button  slider__close"
              onClick={handleCloseSlider}
            ></button>
          </div>
          <button
            onClick={handlePrev}
            disabled={isClickDisabled}
            className="footer__left footer__arrow"
          >
            <svg
              fill="#fff"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30px"
              height="30px"
              viewBox="0 0 284.929 284.929"
              style={{ enableBackground: "new 0 0 284.929 284.929" }}
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
          <div
            ref={slideRef}
            className="footer__slider__overflow"
            style={{
              transform:
                " translate3d(0px, 0px, 0px) scale3d(" +
                (1 + scaleCount) +
                "," +
                (1 + scaleCount) +
                "," +
                "1" +
                ")",
            }}
          >
            <div
              className="footer__slider"
              onMouseDown={handleMouseDown}
              ref={sliderWidthRef}
              style={{
                position: "relative",
                transform: "translateX(-" + sliderTranslate + "px)",
                transition: isAnim && !isDrag ? "all .5s" : "none",
              }}
            >
              {images.map((el) => (
                <FooterSlider
                  key={el.subId}
                  img={el.img}
                  activeSlide={activeSlide}
                  scaleCount={scaleCount}
                  wrapperSize={wrapperSize}
                />
              ))}
            </div>
          </div>
          <button
            onClick={handleNext}
            disabled={isClickDisabled}
            className="footer__right footer__arrow"
          >
            <svg
              fill="#fff"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30px"
              height="30px"
              viewBox="0 0 284.929 284.929"
              style={{ enableBackground: "new 0 0 284.929 284.929" }}
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
      )}
    </>
  );
};
