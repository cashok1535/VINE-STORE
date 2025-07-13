import footerGridOne from "../img/footerGridOne.webp";
import footerGridTwo from "../img/footerGridTwo.webp";
import footerGridThree from "../img/footerGridThree.webp";
import footerGridFour from "../img/footerGridFour.webp";
import footerGridFive from "../img/footerGridFive.webp";
import footerGridSix from "../img/footerGridSix.webp";
import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { FooterSlider } from "./FooterSlider";
import { HashLink as Link } from "react-router-hash-link";
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

export const Footer = () => {
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
    <footer id="footer" className="footer">
      <div className="footer__flex">
        <div className="footer__flex__element">
          <div className="footer__flex__element__title">Contact Us</div>
          <div className="what__we__do__flex__line"></div>
          <a href="malito:caliwines@email.com" className="footer__link">
            caliwines@email.com
          </a>
          <a href="tel:+1 (234) 567 89 00" className="footer__link">
            +1 (234) 567 89 00
          </a>
          <div className="footer__link">1111 White Ln, St Helena, CA 94574</div>
          <div className="footer__flex__element__socials">
            <a className="footer__link__social" href="https://x.com">
              <svg viewBox="0 0 32 32" height="30px" width="30px">
                <path
                  d="M0,0 L32,0 L32,32 L0,32 L0,0 Z M23.5445333,10.2885333 C23.0796444,10.5863111 22.0122666,11.0190222 21.4858666,11.0190222 L21.4858666,11.0199111 C20.8848,10.392 20.0385777,10 19.1000888,10 C17.2773333,10 15.7992889,11.4780444 15.7992889,13.3000888 C15.7992889,13.5532445 15.8286222,13.8001778 15.8828444,14.0369778 L15.8823111,14.0369778 C13.4097777,13.9720888 10.7056,12.7328 9.07768889,10.6117333 C8.0768,12.3441778 8.94293333,14.2709334 10.0787556,14.9729778 C9.68995555,15.0023111 8.97422222,14.9281778 8.63733333,14.5994666 C8.61475555,15.7493334 9.16764444,17.2728889 11.1836444,17.8256 C10.7953778,18.0344889 10.1080889,17.9745778 9.80924444,17.9301333 C9.91413329,18.9008 11.2734222,20.1697778 12.7598222,20.1697778 C12.2300445,20.7825777 10.2368,21.8940444 8,21.5404445 C9.51911111,22.4647111 11.2896,22.9999999 13.1635555,22.9999999 C18.4888889,22.9999999 22.6245334,18.6840889 22.4019555,13.3598222 C22.4010666,13.3539556 22.4010666,13.3480889 22.4005334,13.3416889 C22.4010666,13.328 22.4019555,13.3143111 22.4019555,13.3000888 C22.4019555,13.2835556 22.4005334,13.2679111 22.4,13.2519111 C22.8847999,12.9203555 23.5352888,12.3338667 24,11.5619556 C23.7304889,11.7104 22.9219555,12.0076445 22.1696,12.0814222 C22.6524444,11.8208 23.3678222,10.9672889 23.5445333,10.2885333 Z"
                  fillRule="evenodd"
                  id="part1"
                />
                <path
                  d="M1,1 L1,31 L31,31 L31,1 L1,1 Z M0,0 L32,0 L32,32 L0,32 L0,0 Z"
                  id="part2"
                />
                <path
                  id="part3"
                  d="M23.5445333,10.2885333 C23.0796444,10.5863111 22.0122666,11.0190222 21.4858666,11.0190222 L21.4858666,11.0199111 C20.8848,10.392 20.0385777,10 19.1000888,10 C17.2773333,10 15.7992889,11.4780444 15.7992889,13.3000888 C15.7992889,13.5532445 15.8286222,13.8001778 15.8828444,14.0369778 L15.8823111,14.0369778 C13.4097777,13.9720888 10.7056,12.7328 9.07768889,10.6117333 C8.0768,12.3441778 8.94293333,14.2709334 10.0787556,14.9729778 C9.68995555,15.0023111 8.97422222,14.9281778 8.63733333,14.5994666 C8.61475555,15.7493334 9.16764444,17.2728889 11.1836444,17.8256 C10.7953778,18.0344889 10.1080889,17.9745778 9.80924444,17.9301333 C9.91413329,18.9008 11.2734222,20.1697778 12.7598222,20.1697778 C12.2300445,20.7825777 10.2368,21.8940444 8,21.5404445 C9.51911111,22.4647111 11.2896,22.9999999 13.1635555,22.9999999 C18.4888889,22.9999999 22.6245334,18.6840889 22.4019555,13.3598222 C22.4010666,13.3539556 22.4010666,13.3480889 22.4005334,13.3416889 C22.4010666,13.328 22.4019555,13.3143111 22.4019555,13.3000888 C22.4019555,13.2835556 22.4005334,13.2679111 22.4,13.2519111 C22.8847999,12.9203555 23.5352888,12.3338667 24,11.5619556 C23.7304889,11.7104 22.9219555,12.0076445 22.1696,12.0814222 C22.6524444,11.8208 23.3678222,10.9672889 23.5445333,10.2885333"
                />
              </svg>
            </a>
            <a className="footer__link__social" href="https://www.youtube.com">
              <svg height="30px" width="30px" viewBox="0 0 32 32">
                <path
                  id="part1"
                  d="M0,0 L32,0 L32,32 L0,32 L0,0 Z M24.8319297,11.4874563 C24.6803369,10.1603684 24.3639692,9.77357894 24.1398754,9.59352174 C23.7839619,9.31343284 23.1380446,9.21340113 22.2746246,9.15338207 C20.8905163,9.06001905 18.537532,9 16,9 C13.455877,9 11.1094837,9.05335028 9.72537529,9.15338207 C8.86195533,9.21340113 8.21603808,9.31343284 7.8601245,9.59352174 C7.63603076,9.77357894 7.32625412,10.1603684 7.1680703,11.4874563 C6.94397657,13.4013973 6.94397657,17.7627818 7.1680703,19.6767227 C7.32625412,21.0038107 7.63603076,21.3906002 7.8601245,21.5706573 C8.21603808,21.8507463 8.86195533,21.950778 9.72537529,22.0107971 C11.1094837,22.1041601 13.455877,22.164179 16,22.164179 C18.544123,22.164179 20.8905163,22.1041601 22.2746246,22.0107971 C23.1380446,21.950778 23.7839619,21.8507463 24.1398754,21.5706573 C24.3639692,21.3972689 24.6737458,21.0038107 24.8319297,19.6767227 C25.0560234,17.7627818 25.0560234,13.4013973 24.8319297,11.4874563 Z M13.8249725,18.4429978 L13.8249725,12.7145125 L19.2559502,15.5754208 L13.8249725,18.4429978 Z"
                  fillRule="evenodd"
                />
                <path
                  d="M1,1 L1,31 L31,31 L31,1 L1,1 Z M0,0 L32,0 L32,32 L0,32 L0,0 Z"
                  id="part2"
                />
                <path
                  id="part3"
                  d="M24.8319297,11.4874563 C24.6803369,10.1603684 24.3639692,9.77357894 24.1398754,9.59352174 C23.7839619,9.31343284 23.1380446,9.21340113 22.2746246,9.15338207 C20.8905163,9.06001905 18.537532,9 16,9 C13.455877,9 11.1094837,9.05335028 9.72537529,9.15338207 C8.86195533,9.21340113 8.21603808,9.31343284 7.8601245,9.59352174 C7.63603076,9.77357894 7.32625412,10.1603684 7.1680703,11.4874563 C6.94397657,13.4013973 6.94397657,17.7627818 7.1680703,19.6767227 C7.32625412,21.0038107 7.63603076,21.3906002 7.8601245,21.5706573 C8.21603808,21.8507463 8.86195533,21.950778 9.72537529,22.0107971 C11.1094837,22.1041601 13.455877,22.164179 16,22.164179 C18.544123,22.164179 20.8905163,22.1041601 22.2746246,22.0107971 C23.1380446,21.950778 23.7839619,21.8507463 24.1398754,21.5706573 C24.3639692,21.3972689 24.6737458,21.0038107 24.8319297,19.6767227 C25.0560234,17.7627818 25.0560234,13.4013973 24.8319297,11.4874563 Z M13.8249725,18.4429978 L13.8249725,12.7145125 L19.2559502,15.5754208 L13.8249725,18.4429978 Z"
                />
              </svg>
            </a>
            <a className="footer__link__social" href="https://www.facebook.com">
              <svg height="30px" width="30px" viewBox="0 0 32 32">
                <path
                  id="part1"
                  d="M32 0H0V32H32V0ZM16.9133 25H13.6383V16.0044H12V13.1936H13.6383V10.9374H13.6443C13.7014 8.9864 14.3604 7.129 17.5674 7.0126V7H19.6171V9.8108H17.9447C17.3379 9.8108 16.9133 10.5002 16.9133 11.1568V13.1936H19.8561L19.3702 16.0044H16.9133V25Z"
                  fillRule="evenodd"
                />
                <path
                  d="M1,1 L1,31 L31,31 L31,1 L1,1 Z M0,0 L32,0 L32,32 L0,32 L0,0 Z"
                  id="part2"
                />
                <path
                  id="part3"
                  d="M13.6383 25H16.9133V16.0044H19.3702L19.8561 13.1936H16.9133V11.1568C16.9133 10.5002 17.3379 9.8108 17.9447 9.8108H19.6171V7H17.5674V7.0126C14.3604 7.129 13.7014 8.9864 13.6443 10.9374H13.6383V13.1936H12V16.0044H13.6383V25Z"
                />
              </svg>
            </a>
            <a
              className="footer__link__social"
              href="https://www.instagram.com"
            >
              <svg height="30px" width="30px" viewBox="0 0 32 32">
                <g>
                  <path d="M0,0 L32,0 L32,32 L0,32 L0,0 Z M12.7045454,8 C10.1221593,8 8,10.1193185 8,12.7045454 L8,19.2954545 C8,21.8778407 10.1193185,24 12.7045454,24 L19.2954545,24 C21.8778407,24 24,21.8806822 24,19.2954545 L24,12.7045454 C24,10.1221593 21.8806822,8 19.2954545,8 L12.7045454,8 Z M12.7045454,9.45454545 L19.2954545,9.45454545 C21.0937498,9.45454545 22.5454545,10.9062502 22.5454545,12.7045454 L22.5454545,19.2954545 C22.5454545,21.0937498 21.0937498,22.5454545 19.2954545,22.5454545 L12.7045454,22.5454545 C10.9062502,22.5454545 9.45454545,21.0937498 9.45454545,19.2954545 L9.45454545,12.7045454 C9.45454545,10.9062502 10.9062502,9.45454545 12.7045454,9.45454545 Z M20.2954545,11.0454545 C19.9289774,11.0454545 19.6363636,11.3380684 19.6363636,11.7045454 C19.6363636,12.0710225 19.9289774,12.3636364 20.2954545,12.3636364 C20.6619316,12.3636364 20.9545454,12.0710225 20.9545454,11.7045454 C20.9545454,11.3380684 20.6619316,11.0454545 20.2954545,11.0454545 Z M16,11.6363636 C13.599432,11.6363636 11.6363636,13.599432 11.6363636,16 C11.6363636,18.400568 13.599432,20.3636364 16,20.3636364 C18.400568,20.3636364 20.3636364,18.400568 20.3636364,16 C20.3636364,13.599432 18.400568,11.6363636 16,11.6363636 Z M16,13.0909091 C17.6164771,13.0909091 18.9090909,14.3835229 18.9090909,16 C18.9090909,17.6164771 17.6164771,18.9090909 16,18.9090909 C14.3835229,18.9090909 13.0909091,17.6164771 13.0909091,16 C13.0909091,14.3835229 14.3835229,13.0909091 16,13.0909091 Z" />
                  <path
                    id="part1"
                    d="M0,0 L32,0 L32,32 L0,32 L0,0 Z M12.7045454,8 C10.1221593,8 8,10.1193185 8,12.7045454 L8,19.2954545 C8,21.8778407 10.1193185,24 12.7045454,24 L19.2954545,24 C21.8778407,24 24,21.8806822 24,19.2954545 L24,12.7045454 C24,10.1221593 21.8806822,8 19.2954545,8 L12.7045454,8 Z M12.7045454,9.45454545 L19.2954545,9.45454545 C21.0937498,9.45454545 22.5454545,10.9062502 22.5454545,12.7045454 L22.5454545,19.2954545 C22.5454545,21.0937498 21.0937498,22.5454545 19.2954545,22.5454545 L12.7045454,22.5454545 C10.9062502,22.5454545 9.45454545,21.0937498 9.45454545,19.2954545 L9.45454545,12.7045454 C9.45454545,10.9062502 10.9062502,9.45454545 12.7045454,9.45454545 Z M20.2954545,11.0454545 C19.9289774,11.0454545 19.6363636,11.3380684 19.6363636,11.7045454 C19.6363636,12.0710225 19.9289774,12.3636364 20.2954545,12.3636364 C20.6619316,12.3636364 20.9545454,12.0710225 20.9545454,11.7045454 C20.9545454,11.3380684 20.6619316,11.0454545 20.2954545,11.0454545 Z M16,11.6363636 C13.599432,11.6363636 11.6363636,13.599432 11.6363636,16 C11.6363636,18.400568 13.599432,20.3636364 16,20.3636364 C18.400568,20.3636364 20.3636364,18.400568 20.3636364,16 C20.3636364,13.599432 18.400568,11.6363636 16,11.6363636 Z M16,13.0909091 C17.6164771,13.0909091 18.9090909,14.3835229 18.9090909,16 C18.9090909,17.6164771 17.6164771,18.9090909 16,18.9090909 C14.3835229,18.9090909 13.0909091,17.6164771 13.0909091,16 C13.0909091,14.3835229 14.3835229,13.0909091 16,13.0909091 Z"
                  />
                </g>
                <path
                  id="part2"
                  d="M1,1 L1,31 L31,31 L31,1 L1,1 Z M0,0 L32,0 L32,32 L0,32 L0,0 Z"
                />
                <g>
                  <path
                    id="part3"
                    d="M12.7045454,8 C10.1221593,8 8,10.1193185 8,12.7045454 L8,19.2954545 C8,21.8778407 10.1193185,24 12.7045454,24 L19.2954545,24 C21.8778407,24 24,21.8806822 24,19.2954545 L24,12.7045454 C24,10.1221593 21.8806822,8 19.2954545,8 L12.7045454,8 Z M12.7045454,9.45454545 L19.2954545,9.45454545 C21.0937498,9.45454545 22.5454545,10.9062502 22.5454545,12.7045454 L22.5454545,19.2954545 C22.5454545,21.0937498 21.0937498,22.5454545 19.2954545,22.5454545 L12.7045454,22.5454545 C10.9062502,22.5454545 9.45454545,21.0937498 9.45454545,19.2954545 L9.45454545,12.7045454 C9.45454545,10.9062502 10.9062502,9.45454545 12.7045454,9.45454545 Z M20.2954545,11.0454545 C19.9289774,11.0454545 19.6363636,11.3380684 19.6363636,11.7045454 C19.6363636,12.0710225 19.9289774,12.3636364 20.2954545,12.3636364 C20.6619316,12.3636364 20.9545454,12.0710225 20.9545454,11.7045454 C20.9545454,11.3380684 20.6619316,11.0454545 20.2954545,11.0454545 Z M16,11.6363636 C13.599432,11.6363636 11.6363636,13.599432 11.6363636,16 C11.6363636,18.400568 13.599432,20.3636364 16,20.3636364 C18.400568,20.3636364 20.3636364,18.400568 20.3636364,16 C20.3636364,13.599432 18.400568,11.6363636 16,11.6363636 Z M16,13.0909091 C17.6164771,13.0909091 18.9090909,14.3835229 18.9090909,16 C18.9090909,17.6164771 17.6164771,18.9090909 16,18.9090909 C14.3835229,18.9090909 13.0909091,17.6164771 13.0909091,16 C13.0909091,14.3835229 14.3835229,13.0909091 16,13.0909091 Z"
                  />
                  <path
                    style={{
                      fill: "url(#si677fc1a570badd434621802d522f77295f474bc496bbf32239f243c117364259033838415f63f-e970-4cc2-b5f8-fdd37c2bbf6fhover)",
                    }}
                    d="M12.7045454,8 C10.1221593,8 8,10.1193185 8,12.7045454 L8,19.2954545 C8,21.8778407 10.1193185,24 12.7045454,24 L19.2954545,24 C21.8778407,24 24,21.8806822 24,19.2954545 L24,12.7045454 C24,10.1221593 21.8806822,8 19.2954545,8 L12.7045454,8 Z M12.7045454,9.45454545 L19.2954545,9.45454545 C21.0937498,9.45454545 22.5454545,10.9062502 22.5454545,12.7045454 L22.5454545,19.2954545 C22.5454545,21.0937498 21.0937498,22.5454545 19.2954545,22.5454545 L12.7045454,22.5454545 C10.9062502,22.5454545 9.45454545,21.0937498 9.45454545,19.2954545 L9.45454545,12.7045454 C9.45454545,10.9062502 10.9062502,9.45454545 12.7045454,9.45454545 Z M20.2954545,11.0454545 C19.9289774,11.0454545 19.6363636,11.3380684 19.6363636,11.7045454 C19.6363636,12.0710225 19.9289774,12.3636364 20.2954545,12.3636364 C20.6619316,12.3636364 20.9545454,12.0710225 20.9545454,11.7045454 C20.9545454,11.3380684 20.6619316,11.0454545 20.2954545,11.0454545 Z M16,11.6363636 C13.599432,11.6363636 11.6363636,13.599432 11.6363636,16 C11.6363636,18.400568 13.599432,20.3636364 16,20.3636364 C18.400568,20.3636364 20.3636364,18.400568 20.3636364,16 C20.3636364,13.599432 18.400568,11.6363636 16,11.6363636 Z M16,13.0909091 C17.6164771,13.0909091 18.9090909,14.3835229 18.9090909,16 C18.9090909,17.6164771 17.6164771,18.9090909 16,18.9090909 C14.3835229,18.9090909 13.0909091,17.6164771 13.0909091,16 C13.0909091,14.3835229 14.3835229,13.0909091 16,13.0909091 Z"
                  />
                </g>
              </svg>
            </a>
          </div>
        </div>
        <div className="footer__flex__element">
          <div className="footer__flex__element__title">Information</div>
          <div className="what__we__do__flex__line"></div>
          <Link className="footer__link" to="/#history__vine">
            History
          </Link>
          <Link className="footer__link" to="/#aboutUs">
            About Us
          </Link>
          <Link className="footer__link" to="/#awards">
            Awards
          </Link>
          <Link className="footer__link" to="/#FAQ">
            FAQ
          </Link>
        </div>
        <div className="footer__flex__element">
          <div className="footer__flex__element__title">Shop</div>
          <div className="what__we__do__flex__line"></div>
          <Link className="footer__link" to="/#best__deals">
            Best Deals
          </Link>
          <Link className="footer__link" to="/#shop__vines">
            All Wines
          </Link>
          <Link className="footer__link" to="/">
            Delivery Information
          </Link>
          <Link className="footer__link" to="/">
            Terms & Conditions
          </Link>
        </div>
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
      <div className="footer__bottom">
        <div className="footer__bottom__flex">
          <div className="fotter__bottom__flex__element">© Created by</div>
          <div className="fotter__bottom__flex__element">
            All rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};
