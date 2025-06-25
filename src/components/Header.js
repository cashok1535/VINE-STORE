import { useEffect, useRef, useState } from "react";
import logo from "../img/logo (1).svg";
import { Buy } from "./BuyModal";

export const Header = () => {
  const [isPhone, setIsPhone] = useState(false);
  const [isVisibleHeaderNavbar, setIsVisibleHeaderNavbar] = useState(false);
  const [wrapperWidth, setWrapperWidth] = useState(null);
  const bodyRef = useRef(document.body);
  const { phone } = Buy();

  useEffect(() => {
    const handleResize = () => {
      if (bodyRef.current) {
        setWrapperWidth(bodyRef.current.offsetWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (wrapperWidth < 992) {
      setIsPhone(true);
    } else {
      setIsPhone(false);
    }
  }, [wrapperWidth]);

  useEffect(() => {
    phone(isPhone);
  }, [isPhone, phone]);

  useEffect(() => {
    document.body.style.overflow = isVisibleHeaderNavbar ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isVisibleHeaderNavbar]);

  const handleHeaderOpenNavbar = () => {
    setIsVisibleHeaderNavbar((prev) => !prev);
  };
  const handleCLickHref = () => {
    document.body.style.overflow = "auto";
  };
  return (
    <header className="header">
      <div className="header__flex">
        <img className="logo" src={logo} alt="" />
        {isPhone ? (
          <>
            <div
              onClick={handleHeaderOpenNavbar}
              className="header__right__phone"
            >
              <div className="header__right__phone__element"></div>
              <div className="header__right__phone__element"></div>
              <div className="header__right__phone__element"></div>
            </div>
            {isVisibleHeaderNavbar && (
              <div className="header__phone__navbar">
                <div className="header__phone__navbar__flex">
                  <img className="logo" src={logo} alt="" />
                  <button
                    className="navbar__button"
                    onClick={handleHeaderOpenNavbar}
                  >
                    <svg
                      fill="#fff"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="20px"
                      height="20px"
                      viewBox="0 0 612.043 612.043"
                    >
                      <g>
                        <g id="cross">
                          <g>
                            <path
                              d="M397.503,306.011l195.577-195.577c25.27-25.269,25.27-66.213,0-91.482c-25.269-25.269-66.213-25.269-91.481,0
				L306.022,214.551L110.445,18.974c-25.269-25.269-66.213-25.269-91.482,0s-25.269,66.213,0,91.482L214.54,306.033L18.963,501.61
				c-25.269,25.269-25.269,66.213,0,91.481c25.269,25.27,66.213,25.27,91.482,0l195.577-195.576l195.577,195.576
				c25.269,25.27,66.213,25.27,91.481,0c25.27-25.269,25.27-66.213,0-91.481L397.503,306.011z"
                            />
                          </g>
                        </g>
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
                <div className="header__navbar__phone__flex">
                  <ul className="header__navbar header__navbar__phone">
                    <li
                      onClick={handleCLickHref}
                      className="header__navbar__element"
                    >
                      <a href="#best__deals">Best Deals</a>
                    </li>
                    <li
                      onClick={handleCLickHref}
                      className="header__navbar__element"
                    >
                      <a href="#history__vine">History</a>
                    </li>
                    <li
                      onClick={handleCLickHref}
                      className="header__navbar__element"
                    >
                      <a href="#aboutUs">About Us</a>
                    </li>
                    <li
                      onClick={handleCLickHref}
                      className="header__navbar__element"
                    >
                      <a href="#shop__vines">Shop</a>
                    </li>
                    <li
                      onClick={handleCLickHref}
                      className="header__navbar__element"
                    >
                      <a href="#contact">Contact Us</a>
                    </li>
                  </ul>
                  <div className="social">
                    <a className="href__social" href="https://www.facebook.com">
                      <svg
                        className="social__svg"
                        fill="#bd3f00"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                      >
                        <path d="M 19.253906 2 C 15.311906 2 13 4.0821719 13 8.8261719 L 13 13 L 8 13 L 8 18 L 13 18 L 13 30 L 18 30 L 18 18 L 22 18 L 23 13 L 18 13 L 18 9.671875 C 18 7.884875 18.582766 7 20.259766 7 L 23 7 L 23 2.2050781 C 22.526 2.1410781 21.144906 2 19.253906 2 z" />
                      </svg>
                    </a>
                    <a
                      className="href__social"
                      href="https://www.instagram.com"
                    >
                      <svg
                        className="social__svg"
                        fill="#bd3f00"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 50 50"
                      >
                        <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z" />
                      </svg>
                    </a>
                    <a className="href__social" href="https://www.youtube.com">
                      <svg
                        className="social__svg"
                        fill="#bd3f00"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                      >
                        <path d="M 8 2 C 5.960938 2 4.15625 2.210938 3.058594 2.375 C 2.160156 2.507813 1.445313 3.210938 1.28125 4.113281 C 1.140625 4.902344 1 6.054688 1 7.5 C 1 8.945313 1.140625 10.097656 1.28125 10.886719 C 1.445313 11.789063 2.160156 12.488281 3.058594 12.625 C 4.160156 12.789063 5.972656 13 8 13 C 10.027344 13 11.835938 12.789063 12.9375 12.625 L 12.941406 12.625 C 13.839844 12.492188 14.554688 11.789063 14.71875 10.886719 C 14.859375 10.09375 15 8.941406 15 7.5 C 15 6.054688 14.859375 4.902344 14.714844 4.113281 C 14.554688 3.210938 13.839844 2.507813 12.941406 2.375 C 11.84375 2.210938 10.039063 2 8 2 Z M 8 3 C 9.96875 3 11.730469 3.203125 12.792969 3.363281 C 13.261719 3.433594 13.640625 3.800781 13.730469 4.289063 C 13.863281 5.027344 14 6.121094 14 7.5 C 14 8.878906 13.863281 9.972656 13.734375 10.707031 C 13.644531 11.199219 13.265625 11.566406 12.792969 11.636719 C 11.722656 11.792969 9.957031 12 8 12 C 6.042969 12 4.273438 11.792969 3.207031 11.636719 C 2.738281 11.566406 2.355469 11.199219 2.265625 10.707031 C 2.136719 9.96875 2 8.878906 2 7.5 C 2 6.117188 2.136719 5.027344 2.265625 4.289063 C 2.355469 3.800781 2.734375 3.433594 3.203125 3.367188 L 3.207031 3.367188 C 4.269531 3.207031 6.03125 3 8 3 Z M 6 5 L 6 10 L 11 7.5 Z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="header__right">
            <ul className="header__navbar">
              <li className="header__navbar__element">
                <a href="#best__deals">Best Deals</a>
              </li>
              <li className="header__navbar__element">
                <a href="#history__vine">History</a>
              </li>
              <li className="header__navbar__element">
                <a href="#aboutUs">About Us</a>
              </li>
              <li className="header__navbar__element">
                <a href="#shop__vines">Shop</a>
              </li>
              <li className="header__navbar__element">
                <a href="#contact">Contact Us</a>
              </li>
            </ul>
            <div className="social">
              <a className="href__social" href="https://www.facebook.com">
                <svg
                  className="social__svg"
                  fill="#bd3f00"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                >
                  <path d="M 19.253906 2 C 15.311906 2 13 4.0821719 13 8.8261719 L 13 13 L 8 13 L 8 18 L 13 18 L 13 30 L 18 30 L 18 18 L 22 18 L 23 13 L 18 13 L 18 9.671875 C 18 7.884875 18.582766 7 20.259766 7 L 23 7 L 23 2.2050781 C 22.526 2.1410781 21.144906 2 19.253906 2 z" />
                </svg>
              </a>
              <a className="href__social" href="https://www.instagram.com">
                <svg
                  className="social__svg"
                  fill="#bd3f00"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                >
                  <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z" />
                </svg>
              </a>
              <a className="href__social" href="https://www.youtube.com">
                <svg
                  className="social__svg"
                  fill="#bd3f00"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                >
                  <path d="M 8 2 C 5.960938 2 4.15625 2.210938 3.058594 2.375 C 2.160156 2.507813 1.445313 3.210938 1.28125 4.113281 C 1.140625 4.902344 1 6.054688 1 7.5 C 1 8.945313 1.140625 10.097656 1.28125 10.886719 C 1.445313 11.789063 2.160156 12.488281 3.058594 12.625 C 4.160156 12.789063 5.972656 13 8 13 C 10.027344 13 11.835938 12.789063 12.9375 12.625 L 12.941406 12.625 C 13.839844 12.492188 14.554688 11.789063 14.71875 10.886719 C 14.859375 10.09375 15 8.941406 15 7.5 C 15 6.054688 14.859375 4.902344 14.714844 4.113281 C 14.554688 3.210938 13.839844 2.507813 12.941406 2.375 C 11.84375 2.210938 10.039063 2 8 2 Z M 8 3 C 9.96875 3 11.730469 3.203125 12.792969 3.363281 C 13.261719 3.433594 13.640625 3.800781 13.730469 4.289063 C 13.863281 5.027344 14 6.121094 14 7.5 C 14 8.878906 13.863281 9.972656 13.734375 10.707031 C 13.644531 11.199219 13.265625 11.566406 12.792969 11.636719 C 11.722656 11.792969 9.957031 12 8 12 C 6.042969 12 4.273438 11.792969 3.207031 11.636719 C 2.738281 11.566406 2.355469 11.199219 2.265625 10.707031 C 2.136719 9.96875 2 8.878906 2 7.5 C 2 6.117188 2.136719 5.027344 2.265625 4.289063 C 2.355469 3.800781 2.734375 3.433594 3.203125 3.367188 L 3.207031 3.367188 C 4.269531 3.207031 6.03125 3 8 3 Z M 6 5 L 6 10 L 11 7.5 Z" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
