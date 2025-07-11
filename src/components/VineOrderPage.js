import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { BuyContext } from "./BuyModal";
import { useLocation } from "react-router-dom";

export const VineOrderPage = () => {
  const [vine, setVine] = useState({});
  const [value, setValue] = useState(1);
  const { vineName } = useParams();
  const { handleOrderFromShop, handleLinkOpen, allVine } =
    useContext(BuyContext);
  const { pathname } = useLocation();

  useEffect(() => {
    handleLinkOpen();
  }, [handleLinkOpen]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const decodedVineName = decodeURIComponent(vineName);
    if (allVine) {
      setVine(allVine.find((item) => item.name === decodedVineName));
    }
  }, [vineName, allVine]);

  const handleInput = (event) => {
    let inputValue = event.target.value;
    if (inputValue <= 1) {
      inputValue = 1;
    } else if (inputValue >= 1000) {
      inputValue = 1000;
    }
    setValue(inputValue);
  };
  return (
    <div className="shop__page">
      <Link to="/shop" className="link">
        <div className="shop__page__title">Store homepage</div>
      </Link>
      <div className="vine__order__page__flex">
        <div className="vine__order__page__flex__element">
          <div className="vine__order__page__flex__element__slider">
            <button className="page__slider__button left__button">
              <svg
                width="14"
                height="26"
                viewBox="0 0 14 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 2L1.5 13L12.5 24"
                  stroke="#464C5C"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  strokeLinecap="square"
                ></path>
              </svg>
            </button>
            <img
              className="vine__order__page__flex__element__img"
              src={vine.img}
              alt=""
            />
            <button className="page__slider__button right__button">
              <svg
                className="right__arrow"
                width="14"
                height="26"
                viewBox="0 0 14 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 2L1.5 13L12.5 24"
                  stroke="#464C5C"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  strokeLinecap="square"
                ></path>
              </svg>
            </button>
          </div>
          <button className="vine__order__page__flex__element__button">
            <img src={vine.img} alt="" />
          </button>
        </div>
        <div className="vine__order__page__flex__element">
          <div className="vine__isStock__text">{vine.inStock}</div>
          <div className="page__vine__name">{vine.name}</div>
          <div className="page__vine__product__code">
            Product code {vine.productCode}
          </div>
          <div className="page__vine__price">{vine.price},00 USD</div>
          <div className="page__vine__line"></div>
          <div className="page__vine__order">
            <input
              onChange={(e) => {
                handleInput(e);
              }}
              className="vines__order__element__input page__input"
              type="number"
              value={value}
            />
            <button
              onClick={() => {
                handleOrderFromShop(vine, value);
              }}
              className="page__vine__order__button"
            >
              Add to cart
            </button>
          </div>
          <div className="description">DESCRIPTION</div>
          <div className="description__line"></div>
          <div className="description__text">{vine.description}</div>
        </div>
      </div>
    </div>
  );
};
