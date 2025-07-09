import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { BuyContext } from "./BuyModal";
import { useLocation } from "react-router-dom";

export const VineOrderPage = () => {
  const [vine, setVine] = useState({});
  const [value, setValue] = useState(1);
  const { vineName } = useParams();
  const { handleAddCountVine, handleOrderFromShop, handleLinkOpen, allVine } =
    useContext(BuyContext);
  const { pathname } = useLocation();

  useEffect(() => {
    handleLinkOpen();
  }, [handleLinkOpen]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setVine(allVine.find((item) => item.name === vineName));
  }, [vineName, allVine]);

  const handleInput = (event) => {
    let inputValue = event.target.value;
    if (inputValue <= 1) {
      inputValue = 1;
    } else if (inputValue >= 1000) {
      inputValue = 1000;
    }
    setValue(inputValue);
    handleAddCountVine(vine, value); ///
  };

  return (
    <div className="shop__page">
      <div className="shop__page__title">Store homepage</div>
      <div className="vine__order__page__flex">
        <div className="vine__order__page__flex__element">
          <div>
            <img
              className="vine__order__page__flex__element__img"
              src={vine.img}
              alt=""
            />
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
